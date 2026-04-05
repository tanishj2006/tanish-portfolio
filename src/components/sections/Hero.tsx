"use client";
// src/components/sections/Hero.tsx
import { useRef, Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { motion } from "framer-motion";
import HeroScene from "@/components/canvas/HeroScene";
import ParticleField from "@/components/canvas/ParticleField";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { globalLenis } from "@/hooks/useLenis";
import styles from "./Hero.module.css";

export default function Hero() {
  const mouseRef = useMouseParallax();
  const heroRef = useRef<HTMLDivElement>(null);
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [inView, setInView] = useState(true);

  // 1. Loading Manager
  useEffect(() => {
    THREE.DefaultLoadingManager.onLoad = () => {
      setIsLoaded(true);
    };
    // Fallback safeguard if scene finishes compiling instantaneously without triggering manager
    const timeout = setTimeout(() => setIsLoaded(true), 800);
    return () => clearTimeout(timeout);
  }, []);

  // 2. Frustum Culling / In-View Check
  useEffect(() => {
    if (!heroRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  // 3. Handlers for buttons
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    if (globalLenis) {
      globalLenis.scrollTo(target, { duration: 1.2 });
    } else {
      // Fallback
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section ref={heroRef} className={styles.hero} id="hero" style={{ backgroundColor: "#000000" }}>
      {/* 3D Canvas */}
      <div 
        className={styles.canvas}
        style={{ 
          opacity: isLoaded ? 1 : 0, 
          transition: "opacity 1.5s ease-in-out", 
          pointerEvents: "none", 
          zIndex: 0 
        }}
      >
        <Canvas
          frameloop={inView ? "always" : "demand"}
          camera={{ position: [0, 0, 5], fov: 60 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          dpr={[1, 1.5]}
        >
          <Suspense fallback={null}>
            <ParticleField />
            <HeroScene mouseRef={mouseRef} />
            
            {/* Optimized Post-Processing */}
            <EffectComposer multisampling={0}>
              <Bloom
                intensity={1.5}
                luminanceThreshold={0.1}
                luminanceSmoothing={0.9}
                resolutionScale={0.5}
              />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>

      {/* Text overlay */}
      <div className={styles.content}>
        <motion.div 
          className={styles.badge}
          animate={{ opacity: [0.85, 1, 0.85], scale: [0.99, 1.02, 0.99] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className={styles.dot} />
          Available for internships & freelance
        </motion.div>
{/*    into scalable code. */}
        <h1 className={styles.headline}>
          <span className={styles.line1}>Turning</span>
          <span className={styles.line2}>
            ambitious <span className={styles.accent}>ideas</span>
          </span>
          <span className={styles.line3}>into scalable</span>
          <span className={styles.line4}>code</span>
        </h1>

        <p className={styles.subtext}>
          B.Tech student and full-stack developer based in Mumbai.
Currently building Cozytte, a circular fashion platform, and focused on creating high-performance web apps.
        </p>

        <div className={styles.ctas}>
          <a 
            href="#projects" 
            className={styles.primaryCta}
            onClick={(e) => handleScrollTo(e, "#projects")}
          >
            View Work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a 
            href="#contact" 
            className={styles.secondaryCta}
            onClick={(e) => handleScrollTo(e, "#contact")}
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollLine} />
        <span className={styles.scrollText}>Scroll to explore</span>
      </div>
    </section>
  );
}
