export interface CV {
  title: string;
  subtitle: string;
  categories: Category[];
}

export interface Category {
  title: string;
  entries: CategoryEntry[];
}

export interface CategoryEntry {
  title: string;
  content: CategoryEntryContent;
}

export interface CategoryEntryContent {
  title?: string;
  __html: string[];
}

export interface CV_gen {
  id:          number;
  version:     number;
  state:       string;
  language:    string;
  title:       string;
  firstname:   string;
  lastname:    string;
  position:    string;
  address:     string;
  birthdate:   string; // Date;
  nationality: string;
  hobbies:     null;
  mobile:      string;
  email:       string;
  homepage:    null; // string;
  github:      null; // string;
  linkedin:    string;
  twitter:     null;
  quote:       null;
  experience:  Experience[];
  projects:    Project[];
  education:   Education[];
  skills:      Skill[];
  talks:       Talk[];
  trainings:   Training[];
  picture:     string;
  languages:   string[];
  default?:    CV_gen;
}

export interface Education {
  institution: string;
  degree:      string;
  location:    string;
  time:        string;
  description: any[];
}

export interface Experience {
  company:     string;
  position:    string; // Position;
  description: any[];
  location:    string;
  time:        string;
}

export enum Position {
  FullStackSoftwareEngineer = "Full Stack Software Engineer",
  FullStackSoftwareEntwickler = "Full Stack Software Entwickler",
  Informatikstudent = "Informatikstudent",
}

export interface Project {
  role:         string; // Position;
  customer:     string;
  location:     string;
  time:         string;
  description:  string[];
  technologies: string[];
}

export interface Skill {
  name:     string;
  skillset: string[];
}

export interface Talk {
  time:        string;
  event:       string;
  location:    string;
  description: string[];
}

export interface Training {
  date: string;
  name: string;
}
