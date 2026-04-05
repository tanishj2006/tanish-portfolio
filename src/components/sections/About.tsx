"use client";
// src/components/sections/About.tsx
import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import styles from "./About.module.css";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Headline reveal
      gsap.fromTo(
        headlineRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 85%",
          },
        }
      );

      // Bio reveal
      gsap.fromTo(
        bioRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bioRef.current,
            start: "top 85%",
          },
          delay: 0.15,
        }
      );

      // Stats stagger
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Image block
      gsap.fromTo(
        imageBlockRef.current,
        { scale: 0.92, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: imageBlockRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className={styles.about}>
      <div className={styles.container}>
        {/* Left: Text */}
        <div className={styles.textCol}>
          <span className={styles.eyebrow}>About Me</span>
          <h2 ref={headlineRef} className={styles.headline}>
            Turning logic<br />
            into <span className={styles.accent}>fluid interfaces.</span>
          </h2>
          <p ref={bioRef} className={styles.bio}>
            I’m a 2nd-year B.Tech student who treats coding as both an engineering challenge and a creative outlet. Based in Mumbai, I spend my time building projects that balance complex back-end logic with seamless front-end motion. Right now, my primary focus is Cozytte—a platform dedicated to circular fashion.
          </p>

          {/* Stats */}
          <div ref={statsRef} className={styles.stats}>
            {[
              { value: "7+", label: "Projects Built" },
              { value: "4+", label: "Languages" },
              { value: "∞", label: "Curiosity" },
            ].map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Decorative block */}
        <div ref={imageBlockRef} className={styles.imageCol}>
          <div className={styles.imageCard}>
            <div className={styles.gradientOrb} />
            <div className={styles.codeBlock}>
              <span className={styles.codeComment}>// My stack</span>
              <span><span className={styles.codeKeyword}>const</span> <span className={styles.codeVar}>stack</span> = {"{"}</span>
              <span className={styles.codeIndent}>web: <span className={styles.codeStr}>[&apos;HTML&apos;, &apos;CSS&apos;, &apos;JavaScript&apos;, &apos;React&apos;]</span>,</span>
              <span className={styles.codeIndent}>backend: <span className={styles.codeStr}>[&apos;Node.js&apos;, &apos;Java&apos;, &apos;Python&apos;, &apos;SQL&apos;]</span>,</span>
              <span className={styles.codeIndent}>exploring: <span className={styles.codeStr}>[&apos;Three.js&apos;, &apos;Shader Math&apos;, &apos;Next.js&apos;]</span>,</span>
              <span className={styles.codeIndent}>passion: <span className={styles.codeStr}>&apos;Full-stack + Sustainable Tech&apos;</span>,</span>
              <span className={styles.codeIndent}>location: <span className={styles.codeStr}>&apos;Mumbai, India&apos;</span></span>
              <span>{"}"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
