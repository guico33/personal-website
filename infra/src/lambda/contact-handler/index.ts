import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
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

    const body: ContactFormData = JSON.parse(event.body);
    const { name, email, message } = body;

    // Input validation
    if (!name || !name.trim()) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Name is required' }),
      };
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Valid email is required' }),
      };
    }

    if (!message || !message.trim()) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message is required' }),
      };
    }

    // Additional security: limit message length
    if (message.length > 5000) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message too long (max 5000 characters)' }),
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
