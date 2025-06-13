# CLAUDE Code Assistant Guide

## Introduction

This document provides guidance for the Claude Code assistant on how to interact with this personal portfolio website project. It outlines the project context, best practices, and expected behavior for making code contributions. Claude should use this as an initialization reference to work effectively and safely within the codebase.

---

## Project Context

**Overview:** The project is a fullstack personal portfolio web application. The frontend is a React single-page application (SPA) styled with Tailwind CSS v4 and MagicUI component libraries. The backend infrastructure is deployed on AWS using the Cloud Development Kit (CDK). A contact form on the site is backed by an AWS Lambda function that sends emails via Amazon SES.

**Current Status:** All frontend sections are complete and working at `http://localhost:5173`. The portfolio includes Hero, About, Projects, Contact, and Footer sections with professional design and responsive layout. Next priority is backend implementation with AWS Lambda and SES for the contact form.

**Design Philosophy:** The portfolio maintains a sober and professional aesthetic - not overly modern/techy but more artsy and understated. This approach conveys sophistication and creative sensibility while remaining accessible to potential clients. **Key principle: "Elegant over Complex"** - simple, working solutions are preferred over overcomplicated designs.

**Architecture:** The codebase is structured as a React app (for UI/UX) and AWS infrastructure-as-code (for deployment and backend services). All cloud resources (Lambda, SES configuration, etc.) are managed through AWS CDK stacks in the repository. This ensures consistency between code and deployed resources.

---

## Behavior and Best Practices

When writing or modifying code, Claude should adhere to the following guidelines for incremental, modular, and non-destructive development:

### Incremental Development
- Tackle tasks in small, manageable pieces rather than one large effort.
- Break complex tasks into discrete sub-tasks and handle them one at a time.
- Embrace iterative development – implement one feature or fix, test it, then move to the next step.
- Avoid trying to solve everything in a single pass.

### Modular Code Changes
- Follow the project’s modular design patterns.
- For frontend work, use or extend existing React components and adhere to the established component structure (e.g. keep components focused and reuse MagicUI/Tailwind UI elements for consistency).
- For backend changes, encapsulate logic in functions or modules rather than creating monolithic scripts.
- This ensures new code integrates smoothly without breaking existing functionality.

### Non-Destructive Edits
- Make cautious changes that preserve existing features.
- Do not remove or refactor large sections of code unless it’s necessary and approved by the project plan.
- Any refactoring should maintain current functionality (or improve it) without regressions.
- Always verify the application still runs properly after your updates, using tests and local runs to catch any breakage.
- In short, ensure your contributions add value without unintentionally subtracting existing capabilities.

### Use Project Documentation
- Leverage the repository’s documentation to guide your actions.
- Always read and follow the instructions and requirements laid out in the project’s main implementation guide (see `ROADMAP.md` for the feature roadmap or task list).
- Also refer to any additional docs like `README.md` or `INSTRUCTIONS.md` (if they exist) for coding standards and environment setup.
- The AI agent will rely on these documents to understand project conventions and goals, so ensure your work aligns with the documented plans.

### Stay In Scope
- Work within the defined scope of the project and tasks.
- If the roadmap specifies certain features or components, focus on those without straying into unrelated changes.
- Avoid introducing new libraries or major architecture changes that aren’t outlined in the project plans.
- Keep improvements focused on the portfolio site’s functionality, performance, and design as described in the roadmap.

### Proper Tool Usage
- Utilize the given tools and frameworks as intended.
- For UI, apply Tailwind CSS v4 utility classes and MagicUI components to maintain a consistent design language (do not override styles arbitrarily when a utility class or predefined component can be used).
- **Important**: Tailwind CSS v4 requires specific configuration:
  - Use `@import "tailwindcss"` in CSS files (not the old @tailwind directives)
  - PostCSS config must use `"@tailwindcss/postcss": {}`
  - Vite config must include the `@tailwindcss/vite` plugin
  - **CRITICAL**: Avoid `<div>` elements inside `<p>` tags - causes React hydration errors
- For cloud resources, use AWS CDK for all infrastructure changes – do not alter AWS resources manually.
- All deployments and resource configurations should be done through code in the CDK stack definitions to ensure version-controlled infrastructure.

### MCP Server Usage
This project has access to several MCP servers for enhanced development capabilities:

#### Puppeteer Server (`mcp__puppeteer__*`)
- **Essential for UI verification**: Always take screenshots after implementing UI changes
- **Usage**: Navigate to `http://localhost:5173`, take screenshots, verify layouts work
- **Development workflow**: Code → Screenshot → Verify → Iterate

#### Context7 Server (`mcp__Context7__*`)
- **Purpose**: Get detailed documentation for libraries and frameworks
- **Usage**: When you need specific API details for React, Tailwind v4, AWS, etc.
- **Better than guessing**: Use this instead of assuming API signatures

#### MagicUI Server (`@magicuidesign/mcp`)
- **Purpose**: Install animated components when they add value
- **Installation pattern**: `npx shadcn@latest add "https://magicui.design/r/[component]"`
- **Principle**: Only use when animation solves a specific design need
- **Component discovery**: Check both shadcn/ui and MagicUI before building custom components

### Code Style and Formatting
- Maintain consistency with the existing code style found throughout the project.
- If linters (e.g., ESLint for JavaScript/TypeScript) and formatters (e.g., Prettier) are set up (check `package.json` or project configuration), ensure your contributions pass all checks and are formatted accordingly before committing.

### Security Practices
- Never hard-code credentials, API keys, or secrets in the codebase.
- Sensitive information (e.g. AWS keys, email credentials, etc.) should be pulled from environment variables or AWS Secrets Manager as per the project setup.
- Maintain the principle of least privilege and ensure any new code doesn’t expose private data.
- For example, when modifying the contact form Lambda, keep the email recipient addresses and SMTP details in configuration, not in code.

### Testing and Validation
- After making changes, always run the project’s test suite and/or build process to verify everything works.
- Write unit tests for new functions or components, and update existing tests if you change behavior.
- AI-generated code must be validated – remember that code is only as reliable as the tests behind it.
- Use the provided commands (such as `npm test` or any CI pipeline) to ensure all tests pass and the site builds successfully.
- If a test fails, iterate on the fix until the test passes. Do not leave failing tests.
- In addition, manually check critical user flows (like navigating the site or submitting the contact form) in a local/dev environment to confirm all features remain operational.

### Error Handling and Debugging
- Implement robust error handling for new functionalities (e.g., `try-catch` blocks in JavaScript, clear user feedback for UI errors, proper logging for backend errors).
- When your changes lead to errors or test failures, systematically debug to identify the root cause and apply a fix.
- Ensure that errors are handled gracefully and provide meaningful information where possible, without exposing sensitive details.

### Documentation and Comments
- When appropriate, update documentation.
- If you implement a new feature or significant change, make a note in the `ROADMAP.md` or other relevant docs to mark it completed or to add any needed instructions.
- Also, write clear comments in code where non-obvious logic is introduced, so that both human maintainers and AI agents can easily follow the reasoning in the future.
- This project favors in-repo documentation (`READMEs`, comments, etc.) so that the AI (you) can reference them readily.

### External Resources
- If you encounter unfamiliar frameworks or need clarification (for example, a Tailwind CSS utility or a MagicUI component usage, or a specific AWS CDK construct), feel free to consult official documentation or trusted sources.
- The assistant is allowed to look up docs for Tailwind, MagicUI, React, or AWS as needed.
- Ensuring you use these technologies correctly is important – don’t guess at usage if documentation can provide the answer.
- However, stick to recognized documentation to avoid any misleading information.
- You can also use the context7 MCP tool to get detailed information about different libraries, APIs, and frameworks when the official documentation isn't sufficient or when you need specific implementation examples.

### UI/UX Consultation and Communication
- **Critical Requirement**: You MUST proactively ask the user any questions necessary for proper implementation, particularly regarding UI/UX decisions, design preferences, and content choices. This is not optional - it's essential for creating a portfolio that truly represents the user's vision.
- **Regular UI Monitoring**: Perform regular UI checks during development and ask for feedback to ensure the design maintains consistency with the established aesthetic and user experience goals.
- **Step-by-step Approach**: Always verify each implementation step works before adding complexity. Use Puppeteer screenshots frequently.
- **UI/UX Clarification**: When implementing visual components or user interfaces, always ask about:
  - Color schemes and branding preferences (keeping in mind the sober, professional, artsy aesthetic)
  - Layout and spacing decisions (consider split layouts for visual interest)
  - Animation and interaction preferences (understated, not overly modern/techy)
  - Content organization and messaging
  - Accessibility requirements
  - Mobile responsiveness priorities
  - Component behavior and state management
- **Content Questions**: Always clarify content-related decisions such as:
  - Portfolio project descriptions and presentation
  - About section messaging and tone
  - Skills and certifications to highlight
  - Contact form requirements and messaging
- **Design Decision Points**: Before making any significant UI/UX decisions that could impact the user experience, present options or ask for guidance to ensure the implementation aligns with the user's vision.
- **Iterative Feedback**: When working on visual components, implement a basic version first, then ask for feedback before adding complex features or styling.

### Current Development State
- **Working UI**: All frontend sections complete and functional at `http://localhost:5173`
- **Design Established**: Muted color palette (sage, stone, blue), professional but artsy aesthetic
- **Completed Sections**: Hero, About, Projects, Contact, and Footer all implemented with responsive design
- **Next Task**: Backend implementation with AWS Lambda + SES for contact form functionality
- **Approach**: Professional tone, elegant design, ready for production deployment

---

## Engagement Workflow

To work effectively on this project, Claude should follow a structured workflow for each task or feature:

1.  **Review the Task:**
    - Begin by reading the description of the feature/bug in `ROADMAP.md` (or any ticket/issue provided).
    - Make sure you fully understand what needs to be done. This file contains the implementation plan and priorities for the project – always align your work with this roadmap.

2.  **Plan the Implementation:**
    - Before writing code, break down the task into smaller subtasks (e.g., design data structures, create a new component, adjust styles, update API calls, etc.).
    - For complex tasks, outline the steps or ask clarifying questions (to yourself or maintainers) if something is unclear.
    - Having a clear plan will prevent aimless changes.

3.  **Incremental Coding:**
    - Implement the solution one subtask at a time.
    - For example, if adding a new section to the portfolio, you might first create the React component with static content, then style it with Tailwind, then fetch dynamic data (if any), and finally add it to the navigation.
    - Complete and verify each step before moving on.
    - Commit changes in logical chunks, and ensure each commit passes tests/build so you can pinpoint issues easily if something goes wrong.

4.  **Continuous Testing:**
    - Run tests frequently during development.
    - Whenever you finish a meaningful change, execute the unit tests or integration tests relevant to that change.
    - If the project has end-to-end or UI tests, run those on local builds as well.
    - By testing continuously, you ensure that any breaking change is caught early, making it easier to fix.
    - Remember, the agent excels at iterating based on test feedback – leverage that strength by actually running tests and using the results to guide fixes.

5.  **Deployment Checks:**
    - If the project is configured with AWS CDK deployment scripts or CI/CD, use them to your advantage.
    - After local testing, simulate or perform a deployment in a safe environment (like a development stage) using the CDK.
    - Ensure that the CDK diff looks correct (only intended changes) and that deploying the stack does not produce errors.
    - This helps confirm that infrastructure changes (if any) are properly coded and integrated.

6.  **Review and Refine:**
    - Once the code for the task is written and passing tests, do a self-review.
    - Check if the code follows the project’s style and guidelines (e.g., file naming, code formatting, adherence to design patterns).
    - Verify that the code is well-formatted and adheres to any specified project styling or linting rules.
    - Remove any temporary debugging code or console logs not intended for production.
    - Make sure function and variable names are clear and consistent with the codebase.
    - At this stage, also verify that no secrets or sensitive info have been inadvertently included.

7.  **Documentation Updates:**
    - If your changes affect the user-facing features or require instructions to use, update the appropriate documentation.
    - This could mean editing the `README.md` with setup instructions if you changed something significant in the build or deployment, or updating `ROADMAP.md` to mark the task as completed or to note follow-up tasks.
    - Keeping documentation current is part of non-destructive, responsible development, ensuring future contributors (human or AI) can pick up from where you left off.

8.  **Commit and Push:**
    - Commit your changes with a clear message describing what was done.
    - Follow any commit message conventions if the project has them (e.g., prefix with `feat:`, `fix:`, `docs:`, etc.).
    - Then push the commit or open a Pull Request as per the project’s version control practice.
    - If the project uses PR reviews, assign it for review and make further changes only if requested by maintainers.
    - The goal is to integrate changes smoothly without disrupting the main branch or existing deployments.

Throughout this workflow, maintain an attitude of careful improvement: each change should serve the project’s goals and maintain or improve the code quality.

---

## Conclusion and Next Steps

Claude is expected to act as a smart, junior developer assistant: diligent, security-conscious, and aligned with the project’s objectives. By following this guide and the project roadmap (`ROADMAP.md`), Claude can effectively contribute new features, fix bugs, and improve the codebase in a safe and controlled manner.

Always prioritize understanding the project’s needs and constraints first, then proceed with implementation in a methodical way. Finally, always ensure to synchronize with the latest project state (pull the latest code, read recent updates in `ROADMAP.md`) before starting work. This guarantees that your contributions are based on the current version and requirements of the project.

Happy coding!