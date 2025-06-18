// Common types for portfolio data structures

export interface ProjectData {
  name: string;
  logo: string;
  status: 'In Development' | 'Completed';
  link?: string;
  color: 'primary' | 'accent' | 'secondary' | 'muted';
}

export interface Project {
  name: string;
  description: string;
  status?: 'In Development' | 'Completed';
  technologies: string[];
  achievements?: string[];
  link?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  achievements?: string[];
  projects?: Array<{
    name: string;
    description: string;
    period: string;
    achievements?: string[];
  }>;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  whatsapp: string;
  linkedin: string;
  github: string;
  currentProject: string;
  bio: string;
}

export interface Skills {
  languages: string[];
  frontend: string[];
  backend: string[];
  databases: string[];
  cloud: string[];
  apis: string[];
  testing: string[];
  cicd: string[];
  tools: string[];
}

export interface Language {
  name: string;
  level: string;
}

// Array of project display data
export type ProjectDataArray = ProjectData[];
