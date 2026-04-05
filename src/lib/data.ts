// src/lib/data.ts
import type { Project, Skill, NavLink } from "@/types";

export const projects: Project[] = [
  {
    id: "forkify",
    title: "Forkify",
    description:
      "A full-featured recipe web app with real-time search, bookmarking, and dynamic ingredient scaling. Built using modern JavaScript and integrated with a live API to deliver thousands of recipes instantly.",
    tech: ["JavaScript", "API Integration", "MVC Architecture", "Parcel"],
    github: "https://github.com/tanishj2006/forkify",
    live: "https://forkify-recipes-tanish.netlify.app/",
    featured: true,
    accentColor: "#0066FF",
    gridSpan: "double",
  },
  {
    id: "omnifood",
    title: "Omnifood",
    description:
      "A modern, responsive landing page for an AI-powered food subscription service. Focused on clean UI, accessibility, and performance using advanced CSS (Flexbox & Grid).",
    tech: ["HTML5", "CSS3", "Responsive Design"],
    github: "https://github.com/tanishj2006/Omnifood",
    live: "https://omnifood-is-yourfood.netlify.app/",
    featured: false,
    accentColor: "#F59E0B",
    gridSpan: "single",
  },
  {
    id: "fitness-tracker",
    title: "Fitness Tracker",
    description:
      "A desktop fitness tracking application to monitor workouts and macros, powered by Java Swing and an embedded SQL database for persistent data storage.",
    tech: ["Java", "Java Swing", "Apache Derby", "SQL"],
    github: "https://github.com/tanishj2006/Fitness-Tracker",
    featured: true,
    accentColor: "#00AAFF",
    gridSpan: "double",
  },
  {
    id: "bankist",
    title: "Bankist",
    description:
      "A minimalist banking interface demonstrating advanced JavaScript concepts like DOM manipulation, event handling, and smooth UI interactions.",
    tech: ["JavaScript", "DOM Elements", "CSS3"],
    github: "https://github.com/tanishj2006/Bankist",
    live: "https://tanishj2006.github.io/Bankist/",
    featured: false,
    accentColor: "#10B981",
    gridSpan: "single",
  },
  {
    id: "mapty",
    title: "Mapty",
    description:
      "A geolocation-based workout tracker that logs running and cycling sessions on an interactive map using the Leaflet API. Stores and visualizes workouts with location-based data for better tracking.",
    tech: ["JavaScript", "Leaflet API", "Geolocation API", "OOP"],
    github: "https://github.com/tanishj2006/mapty",
    live: "https://tanishj2006.github.io/mapty/",
    featured: false,
    accentColor: "#059669",
    gridSpan: "single",
  },
  {
    id: "expense-tracker",
    title: "Expense Tracker",
    description:
      "A Python-based financial management tool for tracking income, expenses, and generating structured reports for better budgeting.",
    tech: ["Python", "CLI", "Data Visualization"],
    github: "https://github.com/tanishj2006/Expense-Tracker",
    featured: false,
    accentColor: "#7C3AED",
    gridSpan: "single",
  },
  {
    id: "skillswap",
    title: "SkillSwap",
    description:
      "A full-stack platform enabling users to exchange skills, connect with peers, and learn collaboratively. Designed with scalability and real-world usability in mind. Features include user authentication, profile management, and real-time interactions.",
    tech: ["Web Platform", "Community", "Full-Stack"],
    github: "https://github.com/pearljain0503/SkillSwap",
    featured: false,
    accentColor: "#DC2626",
    gridSpan: "single",
  },
];

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

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks = {
  github: "https://github.com/tanishj2006",
  linkedin: "https://www.linkedin.com/in/tanish-jain-7b37032bb/",
};
