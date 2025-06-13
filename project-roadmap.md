# Fullstack Portfolio Website Implementation Guide

This guide provides a comprehensive, step-by-step roadmap to build a personal portfolio website for a freelance fullstack React/Node/AWS developer. It is structured for sequential execution, with each section focusing on a stage of the project.

The site will be a single-page application (SPA) built with React and styled with Tailwind CSS and Magic UI components (based on shadcn/ui). The backend will use AWS Lambda (Node.js) with API Gateway and Amazon SES for handling the contact form, all managed via AWS CDK (Infrastructure as Code). Finally, the site will be deployed to AWS S3 (static hosting) with CloudFront and Route 53 for domain and SSL. Throughout the guide, we emphasize best practices for project structure, reusability, SEO, and accessibility.

---

## 🎯 Project Goals & Objectives

- Showcase fullstack development skills, particularly with React, Node.js, and AWS serverless technologies.
- Create a professional online presence to attract freelance opportunities.
- Build a reusable and maintainable codebase for future updates.
- Achieve a high Lighthouse score (e.g., 90+) for performance, accessibility, and SEO.
- Secure X number of client inquiries through the contact form within Y months post-launch.

---

## 🎨 Design Philosophy & Approach

**Visual Style**: The portfolio should maintain a sober and professional aesthetic - not overly modern/techy but more artsy and understated. This approach will convey sophistication and creative sensibility while remaining accessible to potential clients.

**Layout Strategy**: Consider implementing a split layout design to create visual interest and effective content organization while maintaining the understated elegance.

**UI Monitoring**: Regular UI checks should be performed throughout development to ensure the design maintains consistency with the established aesthetic and user experience goals.

---

## 🗺️ Timeline & Milestones (Estimated)

- **Phase 1: Frontend Development** (Est. X weeks)
  - Milestone 1: Project Setup & Core UI Components (Est. Y days)
  - Milestone 2: All Portfolio Sections Implemented (Est. Z days)
  - Milestone 3: SEO, Accessibility, and Initial Testing (Est. W days)
- **Phase 2: Backend Implementation** (Est. X weeks)
  - Milestone 1: CDK Setup and Lambda Function for Contact Form (Est. Y days)
  - Milestone 2: API Gateway and SES Integration (Est. Z days)
- **Phase 3: Deployment & Testing** (Est. X weeks)
  - Milestone 1: Frontend Deployment to S3/CloudFront (Est. Y days)
  - Milestone 2: End-to-End Testing and Go-Live (Est. Z days)

---

## 🚧 Risk Assessment & Mitigation

- **Risk:** Complexity in integrating or customizing Magic UI components.
  - **Mitigation:** Allocate specific R&D time. Identify simpler fallback component options if needed.
- **Risk:** AWS SES setup issues (domain verification, sending limits, spam filters).
  - **Mitigation:** Begin SES domain verification early. Test email sending thoroughly. Implement DKIM/SPF records.
- **Risk:** Underestimation of time for AWS CDK development and IaC debugging.
  - **Mitigation:** Break down CDK tasks. Leverage official AWS documentation and examples. Start with simpler constructs.
- **Risk:** Scope creep with additional features or design changes.
  - **Mitigation:** Adhere strictly to the defined sections for V1. Log new ideas for "Future Enhancements."

---

## 🖥️ Frontend Development (React SPA with Tailwind & Magic UI)

### Project Setup and Initialization

1.  **Initialize React Project**  
   Create a new React project (preferably with Vite for speed or Create React App). For example, using Vite:

   ```bash
   npm create vite@latest my-portfolio -- --template react-ts
   cd my-portfolio
   npm install
   ```

   This sets up a React app in TypeScript. Ensure the development environment (Node.js, npm/Yarn) is ready.

2.  **Install Tailwind CSS**  
   Add Tailwind CSS to the project. Install Tailwind and its peer dependencies, then generate the config files:

   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

   Configure `tailwind.config.js` with content paths (e.g., `./src/**/*.{js,jsx,ts,tsx}`) and set the mode (JIT by default).  
   In the main CSS (e.g., `index.css` or `App.css`), import Tailwind’s base, components, and utilities:

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

   Verify Tailwind is working by testing a utility class on a component.

3.  **Integrate shadcn/ui and Magic UI**  
   Set up the Magic UI component library (built on shadcn/ui). Magic UI provides 150+ animated React components with Tailwind CSS and Framer Motion.

   - Install required dependencies (e.g., Radix UI, Lucide icons, Tailwind CSS forms):

     ```bash
     npm install @radix-ui/react-avatar @radix-ui/react-dialog lucide-react @tailwindcss/typography @tailwindcss/forms
     ```

   - Initialize shadcn/ui (if a CLI is provided) or manually add the base component styles.
   - Ensure the Tailwind config includes shadcn presets or styles as instructed by its documentation.
   - Import or add a few Magic UI components to verify the setup.

4.  **Set Up Project Structure**  
   Organize the frontend code for scalability:

   - Create a `src/components` directory for reusable UI components (buttons, forms, modals, etc.).
   - Create a `src/sections` (or `src/pages` if using a multi-page approach) directory for high-level sections of the one-page portfolio (Hero, About, Projects, etc.).
   - Maintain a clear file naming convention (e.g., `Hero.tsx`, `About.tsx`). Use PascalCase for component files and folders.
   - Set up a central data file or constants (e.g., `src/data/projects.js`) to store content like project details, skills, etc.
   - Plan for a single-page scrollable application: use React Router only if you plan to have separate routes.

5.  **Version Control Strategy**
    - Initialize a Git repository.
    - Adopt a branching strategy (e.g., `main`, `develop`, `feature/your-feature-name`).
    - Use clear and consistent commit messages.
6.  **Environment Configuration**
    - Plan for using `.env` files to manage environment-specific variables (e.g., API endpoints for development vs. production).

---

### 🎨 Build Reusable UI Components (Design System)

1. **Create Theme and Common Styles**  
   Define a consistent color scheme and font pairing in Tailwind’s config.  
   If a dark mode toggle is planned, configure Tailwind’s `darkMode`.

2. **Header & Navigation Component**  
   Build a responsive header with navigation links:

   - Include your name or logo on the left, and a nav menu on the right with links to sections: “About”, “Projects”, “Certifications”, “Contact”, etc.
   - Use a hamburger menu for mobile devices.
   - The nav links should scroll to the respective sections (use anchor links with `href="#section-id"`).

3. **Button Component**  
   Create a styled Button component (using Tailwind classes for consistent styling).  
   Magic UI likely provides fancy button variants.

4. **Card/Panel Component**  
   Create a Card component to display things like project previews or certification info.

5. **Section Container Component**  
   Consider a generic Section wrapper component that applies consistent padding, max-width, and background styling.

---

### 🏷️ Implementing Portfolio Sections

Now implement each content section of the portfolio. Each section will be a full-width horizontal block on the page.

#### Hero Section

- Include your name and a short tagline or job title.
- Optionally include a professional photo or avatar.
- Add a call-to-action button such as “Download Resume” or “View Projects.”
- Use an eye-catching design (background gradient, illustration, etc.).
- Ensure the hero section is responsive.

#### About & Skills Section

- Write a brief bio or introduction.
- List out technical skills, grouped by category.
- Use Magic UI components for interactive skill bars or icon lists.
- Use semantic markup for accessibility and SEO.

#### Projects Section

- Showcase your notable projects with brief descriptions.
- Decide on a layout: grid of project cards or vertical list.
- Each project card could include:
  - Project title
  - Screenshot or image (with alt text)
  - Short description
  - Links to the project demo and source code
- Create a reusable ProjectCard component.

#### Certifications Section

- List professional certifications or awards.
- Include certificate name, issuing organization, and date.
- Use images for logos with alt text or use text if no images.

#### Contact Section

- Provide a contact form with inputs for Name, Email, and Message.
- Use proper form elements and labels for accessibility.
- Implement client-side validation.
- Style the form with Tailwind or Magic UI.
- On submit, send an API request to your backend.
- Provide user feedback on submission.

#### Resume Integration

- **Downloadable PDF:** Add a prominent button labeled “Download Resume” that links to your resume PDF file.
- **Readable Content on Page:** Incorporate your work experience, education, and skills as text on the site for SEO and accessibility.

---

### 🧪 Frontend Testing Strategy

- **Unit Tests:**
  - Implement unit tests for critical utility functions and complex component logic (e.g., form validation, data transformation) using a framework like Jest and React Testing Library.
- **Component Tests:**
  - Test individual components in isolation to ensure they render and behave correctly with different props.
- **Integration Tests:**
  - Test interactions between components (e.g., navigation, form submission flow before API call).
- **End-to-End (E2E) Tests (Optional for V1, consider for future):**
  - Use a tool like Cypress or Playwright to simulate user flows across the application.
- **Cross-Browser & Cross-Device Testing:**
  - Manually test on major browsers (Chrome, Firefox, Safari, Edge) and various device sizes (desktop, tablet, mobile). Use browser developer tools for emulation.

---

### 🛡️ Frontend Security Considerations

- **Content Security Policy (CSP):**
  - Implement CSP headers (via meta tags in `index.html` or server headers if applicable later) to mitigate XSS and other injection attacks.
- **Cross-Site Scripting (XSS) Prevention:**
  - Ensure React's default XSS protection is leveraged by not dangerously setting inner HTML with unsanitized user content.
- **Dependency Management:**
  - Regularly audit npm packages for known vulnerabilities (`npm audit`) and update them.

---

### 🔍 SEO and Accessibility Enhancements

#### SEO Meta Tags

- Add important meta tags in the HTML `<head>` (edit `index.html` in `public/`):

  ```html
  <title>[Your Name] – Fullstack Developer Portfolio</title>
  <meta name="description" content="Portfolio of [Name], a freelance fullstack developer proficient in React, Node.js, and AWS. Showcasing projects, skills, and contact information.">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta property="og:title" content="[Your Name] Portfolio" />
  <meta property="og:description" content="Freelance fullstack React/Node/AWS developer." />
  <meta property="og:image" content="https://yourdomain.com/preview.png" />
  <meta property="og:url" content="https://yourdomain.com" />
  <meta property="og:type" content="website" />
  ```

- Use relevant keywords in your content.

#### Accessibility Best Practices

- Use semantic HTML for structure.
- Provide descriptive alt attributes for all images.
- Ensure every form field has a `<label>` or `aria-label`.
- Test keyboard navigation.
- Use ARIA roles or attributes only if needed.
- Verify responsive and mobile-friendly design.

#### Performance & Optimization

- Optimize images (use modern formats like WebP).
- Use code-splitting or lazy loading for heavy components.
- Set up a favicon and manifest if desired.
- Test the site on Lighthouse for performance, best practices, SEO, and accessibility.

---

## 🗂️ Backend Implementation (Serverless Contact Form Email)

Create a serverless function to handle the contact form submission and send an email via AWS SES. The infrastructure will be defined using AWS CDK.

### AWS CDK Project Setup

1.  **Set Up CDK Application**

   ```bash
   mkdir infra && cd infra
   cdk init app --language typescript
   ```

2.  **Install CDK Dependencies**

   ```bash
   npm install @aws-cdk/aws-s3 @aws-cdk/aws-s3-deployment @aws-cdk/aws-cloudfront @aws-cdk/aws-route53 @aws-cdk/aws-certificatemanager @aws-cdk/aws-lambda @aws-cdk/aws-apigateway @aws-cdk/aws-ses
   ```

3.  **Define Infrastructure Stack**

   - **S3 Bucket for Website:**

     ```typescript
     const siteBucket = new s3.Bucket(this, 'PortfolioSiteBucket', {
       websiteIndexDocument: 'index.html',
       publicReadAccess: false,
       blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL
     });
     ```

   - **CloudFront Distribution:**

     ```typescript
     const domainName = "yourname.com";
     const cert = new acm.Certificate(this, 'SiteCert', {
       domainName,
       validation: acm.CertificateValidation.fromDns(hostedZone)
     });
     const distribution = new cloudfront.CloudFrontWebDistribution(this, 'SiteDistribution', {
       originConfigs: [{
         s3OriginSource: { s3BucketSource: siteBucket },
         behaviors: [{ isDefaultBehavior: true }]
       }],
       aliasConfiguration: {
         acmCertRef: cert.certificateArn,
         names: [ domainName ],
         sslMethod: SSLMethod.SNI,
         securityPolicy: SecurityPolicyProtocol.TLS_V1_2_2021
       }
     });
     ```

   - **Route 53 DNS:**

     ```typescript
     new route53.ARecord(this, 'SiteAliasRecord', {
       zone: hostedZone,
       target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
       recordName: domainName
     });
     ```

   - **Lambda Function (ContactFormHandler):**

     ```typescript
     const contactFunction = new lambda.Function(this, 'ContactFormFunction', {
       runtime: lambda.Runtime.NODEJS_18_X,
       handler: 'index.handler',
       code: lambda.Code.fromAsset('lambda/contact-handler'),
       environment: { 
         RECEIVER_EMAIL: 'your.email@domain.com',
       }
     });
     ```

   - **Lambda Code (Send Email via SES):**

     ```javascript
     const AWS = require('aws-sdk');
     const SES = new AWS.SES();
     exports.handler = async function(event) {
       try {
         const body = JSON.parse(event.body);
         const { name, email, message } = body;
         // Backend validation
         if (!name || !name.trim() || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message || !message.trim()) {
           return { statusCode: 400, body: JSON.stringify({ error: 'Invalid input. Please fill all fields correctly.' }) };
         }
         const params = {
           Source: process.env.RECEIVER_EMAIL,
           ReplyToAddresses: [email],
           Destination: { ToAddresses: [process.env.RECEIVER_EMAIL] },
           Message: {
             Subject: { Data: `Portfolio Contact Form: Message from ${name}` },
             Body: {
               Text: { Data: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}` }
             }
           }
         };
         await SES.sendEmail(params).promise();
         return { statusCode: 200, body: 'Message sent' };
       } catch (err) {
         console.error('Error sending email:', err);
         return { statusCode: 500, body: 'Internal Server Error' };
       }
     };
     ```

   - **Grant SES Permissions to Lambda:**

     ```typescript
     contactFunction.addToRolePolicy(new iam.PolicyStatement({
       actions: ['ses:SendEmail', 'ses:SendRawEmail'],
       resources: ['*']
     }));
     ```

   - **API Gateway Setup:**

     ```typescript
     const api = new apigateway.RestApi(this, 'ContactFormApi', {
       restApiName: 'ContactForm Service',
       description: 'Endpoint for contact form submissions.'
     });
     const postResource = api.root.addResource('contact');
     postResource.addMethod('POST', new apigateway.LambdaIntegration(contactFunction), {
       methodResponses: [
         { statusCode: '200' },
         { statusCode: '400' }, // For validation errors
         { statusCode: '500' }  // For server errors
       ]
     });
     ```

   - **Environment Configuration:**  
     - Verify SES email addresses.
     - Set AWS region accordingly.

4.  **Deploy Infrastructure via CDK**

   ```bash
   cdk deploy
   ```

### 🛡️ Backend Security Considerations

- **Input Validation & Sanitization:**
  - Implement robust input validation and sanitization within the Lambda function (as shown in the example update) to protect against injection attacks and ensure data integrity, even with client-side validation.
- **IAM Least Privilege:**
  - Ensure the Lambda execution role has only the necessary permissions (e.g., `ses:SendEmail` restricted to specific identities if possible, rather than `*`). The current `resources: ['*']` for SES is broad; refine if possible.
- **API Gateway Throttling & Quotas:**
  - Configure throttling and burst limits on the API Gateway endpoint to prevent abuse and ensure availability.
- **Error Handling & Logging:**
  - Implement comprehensive error handling and log relevant information to CloudWatch for monitoring and debugging, avoiding logging of sensitive data.
- **Dependency Security:**
  - Regularly check and update backend dependencies (e.g., `aws-sdk`) for vulnerabilities.

### 🧪 Backend Testing Strategy

- **Local Lambda Testing:**
  - Test the Lambda function locally using `sam local invoke` or similar tools with mock event payloads.
- **Unit Tests:**
  - Write unit tests for the Lambda handler logic, mocking AWS services.
- **Integration Tests:**
  - After deployment, test the API Gateway endpoint with actual HTTP requests to ensure it integrates correctly with the Lambda function and SES.
  - Monitor CloudWatch logs for successful execution and error details.

---

## 🔗 Connect Frontend to Backend

1. **Configure Frontend to Call API**

   ```javascript
   fetch('https://your-api-id.execute-api.us-east-1.amazonaws.com/prod/contact', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ name, email, message })
   })
     .then(res => {
       // Check if the response is ok (status in the range 200-299)
       if (res.ok) {
         return res.json();
       }
       // If not ok, parse the error json if possible, or throw an error
       return res.json().then(errorData => {
         throw new Error(errorData.error || `Request failed with status ${res.status}`);
       });
     })
     .then(data => {
       // Assuming success if we reach here and data might contain a success message
       setStatus("SUCCESS");
       console.log('Success:', data);
     })
     .catch((err) => {
       setStatus("ERROR");
       console.error('Error:', err.message);
     });
   ```

2.  **Test the Contact Form End-to-End**  
   - Run the frontend and submit the form.
   - Monitor Lambda logs in CloudWatch.
   - Verify that you receive the email via SES.

---

## 🚀 Deployment (Hosting Frontend on AWS S3 + CloudFront)

1.  **Build the React App for Production**

   ```bash
   npm run build
   ```

2.  **Upload Build Files to S3**

   ```bash
   aws s3 sync dist/ s3://<your-bucket-name>/ --delete
   ```

   Or, using CDK deployment:

   ```typescript
   new s3deploy.BucketDeployment(this, 'DeployWebsite', {
     sources: [s3deploy.Source.asset('../my-portfolio/dist')],
     destinationBucket: siteBucket,
     distribution,
     distributionPaths: ['/*']
   });
   ```

3.  **Verify S3 Content and CloudFront Distribution**  
   - Go to the CloudFront URL or your domain.
   - Test navigating the site and using the contact form.

4.  **Route53 Domain Setup**  
   - Create or update DNS records to point your domain to the CloudFront distribution.

5.  **Final Production Testing**  
   - Test the live site on desktop and mobile.
   - Check all links and meta tags.
6.  **CI/CD Pipeline (Consider for initial setup or early enhancement)**
    - Set up a basic CI/CD pipeline (e.g., using GitHub Actions, AWS CodePipeline) to automate:
      - Frontend: Linting, testing, building, and deploying to S3.
      - Backend: Linting, testing, and deploying CDK stack updates.

---

## 🛠️ Available MCP Servers & Tools

This project has access to several MCP (Model Context Protocol) servers that provide additional capabilities:

### Puppeteer Server
- **Purpose**: Browser automation for UI testing and verification
- **Usage**: Take screenshots, interact with the live site, verify layouts
- **Command**: Available automatically via `mcp__puppeteer__*` tools
- **Note**: Essential for checking UI implementations work correctly

### Context7 Server  
- **Purpose**: Library documentation and API reference lookup
- **Usage**: Get detailed documentation for React, Tailwind, AWS, etc.
- **Command**: Available via `mcp__Context7__*` tools
- **Example**: Use to understand Tailwind v4 configuration when needed

### MagicUI Server
- **Purpose**: Install and use MagicUI animated components
- **Usage**: Add sophisticated UI components when relevant to design
- **Installation Example**: `npx shadcn@latest add "https://magicui.design/r/marquee"`
- **Command**: Available via `@magicuidesign/mcp` MCP server
- **Note**: Use sparingly - only when animations add value, not complexity

### Development Best Practices with MCP
- **UI Verification**: Always use Puppeteer to screenshot and verify implementations
- **Documentation**: Use Context7 for unfamiliar APIs rather than guessing
- **Component Discovery**: Check shadcn/ui and MagicUI for relevant components before building custom ones
  - Visit https://ui.shadcn.com/docs/components for shadcn components
  - Check MagicUI registry via MCP server for animated components
  - Consider timeline components, skill displays, project cards, etc.
- **Component Selection**: Only add MagicUI components when they solve specific design needs
- **Step-by-step**: Verify each step works before adding complexity

---

## 🌟 Future Enhancements (Optional Tasks)

Prioritize based on impact, effort, and evolving project goals.

- Dark Mode Toggle
- Testimonials Section
- Blog Integration
- Project Detail Pages
- Performance Upgrades (CI/CD, tests, monitoring)
- Analytics
- Design Refinement

---

---

## 📈 Current Implementation Status

### ✅ COMPLETED TASKS
- **Frontend Project Setup**: React + Vite + TypeScript configuration
- **Tailwind CSS v4 Configuration**: Fully working and configured
  - ✅ Fixed PostCSS configuration to use @tailwindcss/postcss
  - ✅ Added @tailwindcss/vite plugin to Vite configuration  
  - ✅ Updated CSS imports to use @import "tailwindcss"
  - ✅ Resolved all utility class issues and HTML nesting errors
  - ✅ Added muted/pastel color palette (sage, stone, blue variants)
- **shadcn/ui Setup**: Complete with components.json and all dependencies
- **MagicUI Integration**: Available via MCP server for component installation
- **Project Structure**: Well-organized component and section architecture
- **Base UI Components**: Button, Card, Badge, Avatar, Tooltip, and more
- **Hero Section**: ✅ **COMPLETE AND WORKING**
  - Simple, elegant design with professional aesthetic
  - Muted color palette (sage/stone tones)
  - Clean typography hierarchy
  - Professional photo with subtle accents
  - Natural bottom navigation (non-corporate)
  - Resume download functionality
  - Working at `http://localhost:5173`
- **About Section**: ✅ **COMPLETE AND WORKING**
  - Professional timeline with vertical layout
  - Subtle skills integration within experience context
  - Company logos and project achievements
  - Mobile responsive design
- **Projects Section**: ✅ **COMPLETE AND WORKING**
  - Card-based layout with company branding
  - Outcomes-focused content (vs experience-focused)
  - Live project links and status badges
  - Consistent tech stack styling
- **Contact Section**: ✅ **COMPLETE AND WORKING**
  - Split layout with contact info and form
  - React Hook Form + Zod validation
  - Professional contact details and social links
  - Thank you message flow
- **Resume Integration**: ✅ **COMPLETE AND WORKING**
  - Download button in Hero section
  - Direct PDF download from assets
- **Footer Section**: ✅ **COMPLETE AND WORKING**
  - Professional 3-column layout with branding
  - Navigation links and social connections
  - Copyright and availability status
  - Technology stack attribution
  - Mobile responsive design
  - Distinct background color (orange-50) from Contact section
- **Layout & Alignment Optimization**: ✅ **COMPLETE AND WORKING**
  - Fixed navigation links in Hero section (#work → #projects)
  - Standardized button hover effects with consistent cursor behavior
  - Aligned contact form cards at bottom using flexbox layout
  - Standardized section spacing (py-24) across all sections
  - Refined typography hierarchy with consistent margins and colors
  - Optimized container and grid alignment with lg: breakpoints
  - Tested responsive behavior across desktop and mobile viewports
  - Verified all layout improvements with comprehensive screenshots

### ⏳ CURRENT PRIORITY
- **Backend Implementation**: AWS Lambda + SES for contact form
- **AWS CDK Setup**: Infrastructure as code
- **S3 + CloudFront Deployment**: Production hosting

### 📋 PENDING TASKS
- **Navigation Header**: Sticky navigation with smooth scrolling (optional)
- **Certifications Section**: Display professional certifications (optional)
- **Backend Implementation**: AWS Lambda + SES for contact form
- **AWS CDK Setup**: Infrastructure as code
- **S3 + CloudFront Deployment**: Production hosting
- **Route53 DNS**: Domain configuration
- **SEO & Accessibility**: Meta tags and optimization
- **Testing Strategy**: Unit, integration, and E2E tests

---

## 🎓 Implementation Lessons Learned

### Tailwind CSS v4 Configuration
- **Key Issue**: v4 requires different configuration than v3
- **Solution**: Use `@import "tailwindcss"` instead of `@tailwind` directives
- **Required**: `@tailwindcss/postcss` and `@tailwindcss/vite` packages
- **Important**: Avoid `<div>` inside `<p>` tags - causes hydration errors

### Design Philosophy Established
- **"Elegant over Complex"**: Simple, working solutions beat overcomplicated ones
- **Step-by-step Verification**: Always test each change with Puppeteer screenshots
- **Professional but Artsy**: Muted colors (sage, stone, blue), understated design
- **Natural Navigation**: Avoid corporate-style headers/sidebars

### Development Server
- **URL**: `http://localhost:5173` (Vite default)
- **Status**: All frontend sections complete and functional
- **Next**: Backend implementation with AWS Lambda + SES for contact form

---

By following this roadmap, you will implement a modern, responsive portfolio that showcases your skills and projects, demonstrating your fullstack abilities with React, AWS serverless backend, and infrastructure-as-code deployment.

Good luck with your portfolio development!