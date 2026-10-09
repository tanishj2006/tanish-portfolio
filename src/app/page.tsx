// src/app/page.tsx
//
// Server component. Hero, Works and Outro declare their own "use client";
// Stack is fully static apart from its status widget. The page shell itself
// ships no JavaScript.

import NavBar from "@/components/ui/NavBar";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Works from "@/components/sections/Works";
import Stack from "@/components/sections/Stack";
import Outro from "@/components/sections/Outro";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />      {/* Act I   — The Entry     */}
        <Manifesto /> {/* Act II  — The Shift     */}
        <Works />     {/* Act III — Selected Works */}
        <Stack />     {/* Act IV  — Technical DNA */}
        <Outro />     {/* Act V   — The Close     */}
      </main>
    </>
  );
}
