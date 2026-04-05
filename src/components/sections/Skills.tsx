"use client";
// src/components/sections/Skills.tsx
import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { skills } from "@/lib/data";
import styles from "./Skills.module.css";

const categories = Array.from(new Set(skills.map((s) => s.category)));

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Section title
      gsap.fromTo(
        ".skillsTitle",
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: "power4.out",
          scrollTrigger: { trigger: ".skillsTitle", start: "top 85%" },
        }
      );

      // Skill bars fill on scroll
      barRefs.current.forEach((bar) => {
        if (!bar) return;
        const level = bar.dataset.level ?? "0";
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${level}%`,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bar,
              start: "top 90%",
            },
          }
        );
      });

      // Skill items stagger
      gsap.fromTo(
        ".skillItem",
        { x: -20, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.08,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  let barIndex = 0;

  return (
    <section ref={sectionRef} id="skills" className={styles.skills}>
      <div className={styles.container}>
        <div className={`skillsTitle ${styles.titleBlock}`}>
          <span className={styles.eyebrow}>Expertise</span>
          <h2 className={styles.headline}>
            My <span className={styles.accent}>tech stack.</span>
          </h2>
        </div>

        <div className={styles.categoriesGrid}>
          {categories.map((category) => {
            const catSkills = skills.filter((s) => s.category === category);
            return (
              <div key={category} className={styles.categoryBlock}>
                <h3 className={styles.categoryTitle}>{category}</h3>
                <div className={styles.skillList}>
                  {catSkills.map((skill) => {
                    const idx = barIndex++;
                    return (
                      <div key={skill.name} className={`skillItem ${styles.skillItem}`}>
                        <div className={styles.skillHeader}>
                          <span className={styles.skillName}>{skill.name}</span>
                          <span className={styles.skillLevel}>{skill.label || `${skill.level}%`}</span>
                        </div>
                        <div className={styles.barTrack}>
                          <div
                            ref={(el) => { barRefs.current[idx] = el; }}
                            className={styles.barFill}
                            data-level={skill.level}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
