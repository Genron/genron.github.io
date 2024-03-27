export interface CV {
  id:          number;
  version:     number;
  state:       string;
  language:    string;
  title:       string;
  firstname:   string;
  lastname:    string;
  position:    string;
  address:     string;
  birthdate:   Date;
  nationality: string;
  hobbies:     null;
  mobile:      string;
  email:       string;
  homepage:    string;
  github:      string;
  linkedin:    string;
  twitter:     string;
  quote:       string;
  experience:  Experience[];
  projects:    Project[];
  education:   Education[];
  skills:      Skill[];
  talks:       Talk[];
  trainings:   Training[];
  picture:     string;
  languages:   string[];
  default?:    CV;
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
  position:    Position;
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
  role:         Position;
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
