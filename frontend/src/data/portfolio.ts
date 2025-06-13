// Import logos
import inkstreamLogo from '../assets/inkstream-logo.png';
import sgiLogo from '../assets/sgi-logo.png';
import renewLogo from '../assets/renew-logo.png';
import stashawayLogo from '../assets/stashaway-logo.png';

export const heroSkills = ['TypeScript', 'React/Next.js', 'Node.js', 'AWS'];

export const personalInfo = {
  name: 'Guillaume Cauchet',
  title: 'Fullstack Software Engineer',
  location: 'Based in France, open to relocate',
  email: 'guillaume.cauchet@gmail.com',
  phone: '+33 6 69 04 05 77',
  whatsapp: '+65 8425 4617',
  linkedin: 'linkedin.com/in/guillaume-cauchet',
  github: 'github.com/guico33',
  currentProject: 'app.inkstream.cloud',
  bio: 'Fullstack software engineer with 6 years of experience in TypeScript/JavaScript, specializing in building scalable frontend architectures and high-performance web applications. Passionate about delivering impactful solutions that enhance UX, business value, and efficiency.',
};

export const skills = {
  languages: ['JavaScript', 'TypeScript'],
  frontend: ['React', 'Next.js'],
  backend: ['Node.js', 'Express.js', 'NestJS'],
  databases: ['MongoDB', 'DynamoDB', 'SQL (Postgres)'],
  cloud: ['AWS', 'AWS Solutions Architect Associate (2025)'],
  apis: ['REST', 'GraphQL', 'WebSockets'],
  testing: ['Jest', 'React Testing Library'],
  cicd: ['GitLab CI/CD', 'GitHub Actions', 'Docker'],
  tools: ['Jira', 'Figma', 'Notion'],
};

export const languages = [
  {
    name: 'English',
    level: 'Fluent',
  },
  {
    name: 'French',
    level: 'Fluent',
  },
  { name: 'Japanese', level: 'Conversational' },
];

export const interests = [
  'Hiking',
  'Running',
  'Fitness',
  'Travelling',
  'Cinema',
  'Photography',
  'Tabletop games',
];

export const experience = [
  {
    company: 'Palo IT',
    location: 'Singapore',
    role: 'Software Engineer',
    period: 'October 2022 – April 2024',
    description: 'Global tech consultancy serving both private and public sector clients',
    projects: [
      {
        name: 'SGInnovate',
        period: 'Jan 2023 – May 2024',
        description:
          "Collaborated within a 10-developer team to rebuild SGInnovate's event management and job board platform from the ground up.",
        achievements: [
          'Acted as the key frontend stakeholder, designing and scaling the application from initial prototypes to dozens of screens and hundreds of reusable components',
          'Implemented the solution using a Typescript/React/Next.js monorepo with a NestJS backend, ensuring a robust and maintainable architecture',
        ],
      },
      {
        name: 'Renew UltraLink',
        period: 'Nov 2022 – Dec 2022',
        description:
          'Led frontend development for a web application used in operating theatres to distinguish cancerous tissues from video feeds.',
        achievements: [
          'Transformed the project from a prototype into a production-ready solution by integrating live streaming via websockets and interactive data visualizations using SVG',
          'Delivered a project using a modern stack (Typescript, React, and Next.js) tailored for high-stakes clinical environments, and implemented a comprehensive suite of unit tests to ensure robust, maintainable code',
        ],
      },
    ],
  },
  {
    company: 'StashAway',
    location: 'Singapore',
    role: 'Fullstack Developer',
    period: 'August 2018 – June 2022',
    description: 'Leading robo-advisory/digital investment platform in Singapore and Asia',
    achievements: [
      "Contributed to product-centric teams using the MERN stack, enabling technical enhancements that supported StashAway's growth from a startup to a mid-sized company operating across 5 Asian countries",
      'Served as the main maintainer of a large-scale React web application, ensuring high performance, scalability, and a seamless user experience',
      'Developed and maintained multiple Node/Express projects, including an API gateway (supporting both REST and GraphQL) and an authentication service, bolstering platform stability and security',
    ],
  },
];

export const education = {
  institution: "Ecole internationale des Sciences du Traitement de l'Information (EISTI/CY Tech)",
  degree: "Master's degree in Computer Science",
  period: 'September 2013 – October 2017',
};

export const projects = [
  {
    name: 'Inkstream',
    description:
      'Currently building app.inkstream.cloud - a cloud-based Ai-powered document processing platform',
    status: 'In Development',
    technologies: ['TypeScript', 'React', 'Next.js', 'AWS'],
    link: 'https://app.inkstream.cloud',
  },
  {
    name: 'SGInnovate',
    description:
      "Event management and job board platform rebuilt from the ground up for Singapore's innovation hub",
    technologies: ['TypeScript', 'React', 'Next.js', 'NestJS'],
    achievements: [
      'Scaled from prototypes to dozens of screens',
      'Hundreds of reusable components',
      'Monorepo architecture',
    ],
  },
  {
    name: 'Renew UltraLink',
    description:
      'Web application for operating theatres to distinguish healthy tissues from video feeds',
    technologies: ['TypeScript', 'React', 'Next.js', 'WebSockets', 'SVG'],
    achievements: [
      'Live streaming integration',
      'Interactive data visualizations',
      'Production-ready clinical solution',
    ],
  },
  {
    name: 'StashAway',
    description: 'Large-scale React web application for leading robo-advisory platform in Asia',
    technologies: ['React', 'Node.js', 'Express', 'GraphQL', 'REST'],
    achievements: [
      'Main maintainer',
      'High performance & scalability',
      '5 Asian countries deployment',
    ],
  },
];

// Project display data with logos and metadata
export const projectsData = [
  {
    name: 'Inkstream',
    logo: inkstreamLogo,
    status: 'In Development' as const,
    link: 'https://app.inkstream.cloud',
    color: 'primary' as const,
  },
  {
    name: 'SGInnovate',
    logo: sgiLogo,
    status: 'Completed' as const,
    color: 'accent' as const,
  },
  {
    name: 'Renew UltraLink',
    logo: renewLogo,
    status: 'Completed' as const,
    color: 'secondary' as const,
  },
  {
    name: 'StashAway',
    logo: stashawayLogo,
    status: 'Completed' as const,
    color: 'muted' as const,
  },
];
