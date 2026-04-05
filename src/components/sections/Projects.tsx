"use client";
// src/components/sections/Projects.tsx
import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import BentoCard from "@/components/ui/BentoCard";
import { projects } from "@/lib/data";
import styles from "./Projects.module.css";

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        }
      );

      // Bento cards stagger
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll("[class*='card']");
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className={styles.projects}>
      <div className={styles.container}>
        <div ref={titleRef} className={styles.titleBlock}>
          <span className={styles.eyebrow}>Selected Work</span>
          <h2 className={styles.headline}>
            Projects that <span className={styles.accent}>ship.</span>
          </h2>
          <p className={styles.sub}>
            A collection of things I&apos;ve built — from full-stack apps to
            interactive experiences.
          </p>
        </div>

        {/* Bento Grid */}
        <div ref={gridRef} className={styles.grid}>
          {projects.map((project) => (
            <BentoCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
