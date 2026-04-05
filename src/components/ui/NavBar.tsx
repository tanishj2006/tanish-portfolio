"use client";
// src/components/ui/NavBar.tsx
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { navLinks, socialLinks } from "@/lib/data";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav ref={navRef} className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.logo}>
        <span className={styles.logoText}>TJ.</span>
        <span className={styles.logoSub}>Tanish</span>
      </div>

      <ul className={styles.links}>
        {navLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className={styles.link}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <a
        href={socialLinks.github}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.cta}
      >
        GitHub ↗
      </a>
    </nav>
  );
}
