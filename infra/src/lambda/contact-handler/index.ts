import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { z } from 'zod';

// Zod schema for enhanced validation and sanitization
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .transform((str) => str.trim()), // Remove whitespace, no regex restriction
  email: z
    .string()
    .email('Invalid email format')
    .max(254, 'Email must not exceed 254 characters')
    .transform((str) => str.toLowerCase().trim()), // Normalize email
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must not exceed 5000 characters')
    .transform((str) => sanitizeMessage(str.trim())), // Sanitize message content
});

type ContactFormData = z.infer<typeof contactFormSchema>;

// Enhanced message sanitization function
function sanitizeMessage(message: string): string {
  // Remove HTML tags
  const htmlTagsRemoved = message.replace(/<[^>]*>/g, '');

  // Remove script-like content
  const scriptRemoved = htmlTagsRemoved.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    '',
  );

  // Remove dangerous protocol handlers (but keep regular URLs)
  const suspiciousRemoved = scriptRemoved
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/about:/gi, '')
    .replace(/chrome:/gi, '');

  // Normalize excessive whitespace
  const normalizedWhitespace = suspiciousRemoved.replace(/\s+/g, ' ').trim();

  return normalizedWhitespace;
}

// Spam detection patterns - focused on obvious spam content
const SPAM_PATTERNS = [
  /buy now/gi,
  /click here for/gi,
  /free money/gi,
  /make \$\d+/gi,
  /viagra/gi,
  /cialis/gi,
  /casino/gi,
  /online pharmacy/gi,
  /weight loss/gi,
  /lottery winner/gi,
  /prince of nigeria/gi,
  /urgent business proposal/gi,
];

function detectSpam(message: string): boolean {
  return SPAM_PATTERNS.some((pattern) => pattern.test(message));
}

const sesClient = new SESClient({ region: process.env.AWS_REGION || 'eu-west-3' });

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Contact form submission received:', JSON.stringify(event, null, 2));

  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'CORS preflight successful' }),
    };
  }

  try {
    // Parse request body
    if (!event.body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Request body is required' }),
      };
    }

    let rawBody;
    try {
      rawBody = JSON.parse(event.body);
    } catch (parseError) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid JSON format' }),
      };
    }

    // Validate and sanitize input using Zod
    let validatedData: ContactFormData;
    try {
      validatedData = contactFormSchema.parse(rawBody);
    } catch (zodError) {
      if (zodError instanceof z.ZodError) {
        const errorMessages = zodError.errors.map((err) => `${err.path.join('.')}: ${err.message}`);
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            error: 'Validation failed',
            details: errorMessages.join(', '),
          }),
        };
      }
      throw zodError;
    }

    const { name, email, message } = validatedData;

    // Spam detection
    if (detectSpam(message) || detectSpam(name)) {
      console.log('Spam detected in submission:', { name, email });
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message content is not allowed' }),
      };
    }

    // Environment variables validation
    const senderEmail = process.env.SENDER_EMAIL;
    const receiverEmail = process.env.RECEIVER_EMAIL;

    if (!senderEmail || !receiverEmail) {
      console.error('Missing required environment variables: SENDER_EMAIL or RECEIVER_EMAIL');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Server configuration error',
          success: false,
        }),
      };
    }

    // Prepare email parameters
    const emailParams = {
      Source: senderEmail,
      Destination: {
        ToAddresses: [receiverEmail],
      },
      ReplyToAddresses: [email], // Allow replying directly to the sender
      Message: {
        Subject: {
          Data: `Portfolio Contact: Message from ${name}`,
        },
        Body: {
          Text: {
            Data: `New contact form submission:

Name: ${name}
Email: ${email}
Message:
${message}

---
This message was sent via the portfolio contact form.
You can reply directly to this email to respond to ${name}.`,
          },
          Html: {
            Data: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Message:</strong></p>
              <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #007bff; margin: 10px 0;">
                ${message.replace(/\n/g, '<br>')}
              </div>
              <hr>
              <p style="color: #666; font-size: 12px;">
                This message was sent via the portfolio contact form.<br>
                You can reply directly to this email to respond to ${name}.
              </p>
            `,
          },
        },
      },
    };

    // Send email via SES
    const command = new SendEmailCommand(emailParams);
    await sesClient.send(command);

    console.log('Email sent successfully to:', receiverEmail);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Message sent successfully',
        success: true,
      }),
    };
  } catch (error) {
    console.error('Error processing contact form:', error);

    // Handle Zod validation errors specifically
    if (error instanceof z.ZodError) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Invalid input data',
          success: false,
        }),
      };
    }

    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Invalid request format',
          success: false,
        }),
      };
    }

    // Handle specific AWS SES errors
    if (error instanceof Error) {
      if (error.name === 'MessageRejected') {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            error: 'Email was rejected. Please check your email configuration.',
            success: false,
          }),
        };
      }

      if (error.name === 'SendingPausedException') {
        return {
          statusCode: 503,
          headers,
          body: JSON.stringify({
            error: 'Email service temporarily unavailable. Please try again later.',
            success: false,
          }),
        };
      }
    }

    // Don't expose internal error details to client
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error. Please try again later.',
        success: false,
      }),
    };
  }
};
