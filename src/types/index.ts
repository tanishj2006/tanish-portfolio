// src/types/index.ts
export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  featured: boolean;
  accentColor: string;
  gridSpan: "double" | "single";
}

export interface Skill {
  name: string;
  category: string;
  level: number;
  label?: string;
}

export interface NavLink {
  label: string;
  href: string;
}
