# 🚀 TJ. — High-Performance 3D Portfolio

A modern, responsive, and visually immersive developer portfolio built with **Next.js**, **Three.js**, and **GSAP**. This project focuses on high-end digital experiences, featuring interactive 3D elements and fluid motion.

[Live Demo](https://tanishj2006.vercel.app) | [LinkedIn](https://www.linkedin.com/in/tanish-jain-7b37032bb)

---

## ✨ Features

- **Interactive 3D Hero:** Custom shader-based 3D sphere built with React Three Fiber (R3F) and Three.js.
- **Bento Grid Projects:** Clean, organized showcase of full-stack applications with dynamic hover effects.
- **Fluid Motion:** Smooth scrolling powered by **Lenis** and complex entry animations handled by **GSAP**.
- **Modern Tech Stack:** 100% Responsive design across all devices (Mobile-first approach).
- **Glassmorphic UI:** A dark-themed, sleek aesthetic with custom-built CSS-Module and React components.

---

## ⚡ Performance Architecture
- **Frustum Culling:** Global `IntersectionObserver` logic natively pauses the 3D WebGL renderer when scrolled out of view to preserve battery life and memory.
- **Render Scales:** Integrated `@react-three/postprocessing` with `<EffectComposer resolutionScale={0.5} />` for buttery-smooth 60FPS volumetric Bloom.
- **Next.js 15 Hydration:** Utilizing the newest App Router server-side caching mechanics for instantaneous first-paint loads.

---

## 🛠️ Tech Stack

### Frontend & Core
- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **3D Library:** [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) / [Three.js](https://threejs.org/)
- **Styling:** CSS Modules & [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [GSAP](https://greensock.com/gsap/) & [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scroll:** [Lenis](https://github.com/darkroomengineering/lenis)

### Languages & Engineering
- **Languages:** TypeScript, JavaScript (ES6+), Java, Python, C
- **Database:** SQL

---

## 📂 Project Architecture

```text
my-portfolio/
├── public/                # Static assets and typography configurations
├── src/
│   ├── app/               # Next.js 15 App Router standard layer (layout, page)
│   ├── components/        # Modular React components
│   │   ├── canvas/        # React Three Fiber elements (HeroScene, Particles)
│   │   ├── sections/      # Primary UI layouts (Hero, About, Projects, Contact)
│   │   └── ui/            # Core interface objects (NavBar, BentoCards)
│   ├── hooks/             # Custom React lifecycle hooks (useLenis, Parallax)
│   ├── lib/               # Static dataset arrays and GSAP animation config
│   └── types/             # Global TypeScript interfaces and bindings
└── next.config.ts         # Core framework architecture config
```

---

## 🚀 Getting Started

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/tanishj2006/my-portfolio.git
   cd my-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Open the application:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.
   
---

## 👤 About Me

I am a 2nd-year B.Tech student based in Mumbai, India. I treat coding as both an engineering challenge and a creative outlet, focusing on building scalable systems with beautiful user interfaces. Checkout my platform Cozytte—dedicated to circular fashion!

---

## 📄 License

This project is open-source and available under the MIT License.

---

Crafted with 🤍 by Tanish Jain
