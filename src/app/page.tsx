// src/app/page.tsx
//
// Server component: every section below declares its own "use client", so the
// page shell itself ships no JavaScript and the Act I headline is present in
// the server-rendered HTML.

import NavBar from "@/components/ui/NavBar";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        {/* Act I */}
        <Hero />
        {/* Act II */}
        <Manifesto />
        {/* Acts III+ still on v1 — rebuilt in later phases. */}
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
