"use client";
// src/app/page.tsx
import dynamic from "next/dynamic";
import NavBar from "@/components/ui/NavBar";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

// Hero uses R3F Canvas — must be client-only, no SSR
const Hero = dynamic(() => import("@/components/sections/Hero"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "100vh",
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#0066ff",
        fontSize: "0.8rem",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        fontFamily: "var(--font-sans)",
      }}
    >
      Loading...
    </div>
  ),
});

export default function Home() {
  // Smooth scrolling now comes from <SmoothScroll> in src/app/layout.tsx.
  return (
    <main>
      <NavBar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}
