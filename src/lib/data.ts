// src/lib/data.ts
//
// Project data now lives in src/lib/works.ts; nav links are defined in the
// masthead itself. What remains here is consumed by the v1 Skills and
// Contact sections.
import type { Skill } from "@/types";

export const skills: Skill[] = [
  // Frontend & Web
  { name: "JavaScript / React", category: "Frontend & Web", level: 85, label: "Advanced" },
  { name: "HTML / CSS", category: "Frontend & Web", level: 90, label: "Advanced" },
  { name: "Next.js / Node.js", category: "Frontend & Web", level: 55, label: "Learning" },
  { name: "Three.js / Animations", category: "Frontend & Web", level: 50, label: "Learning" },
  
  // Software Engineering
  { name: "Java", category: "Software Engineering", level: 80, label: "Advanced" },
  { name: "Python", category: "Software Engineering", level: 75, label: "Intermediate" },
  { name: "SQL / Databases", category: "Software Engineering", level: 70, label: "Intermediate" },
  { name: "C / Data Structures", category: "Software Engineering", level: 75, label: "Intermediate" },
  
  // Tools & Design
  { name: "Git / GitHub", category: "Tools & Design", level: 85, label: "Advanced" },
  { name: "DaVinci Resolve", category: "Tools & Design", level: 70, label: "Intermediate" },
  { name: "UI Design (Figma)", category: "Tools & Design", level: 60, label: "Learning" },
];

export const socialLinks = {
  github: "https://github.com/tanishj2006",
  linkedin: "https://www.linkedin.com/in/tanish-jain-7b37032bb/",
};
