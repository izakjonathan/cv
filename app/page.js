"use client";

import { useEffect, useRef } from "react";
import Nav from "../components/Nav";
import ProjectRow from "../components/ProjectRow";
import { projects } from "../data/projects";

export default function Home() {
  const portraitRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    let running = true;
    let raf = null;
    let loop = null;
    let targetPortraitY = 0;
    let currentPortraitY = 0;

    const setViewport = () => {
      const height = window.visualViewport?.height || window.innerHeight;
      root.style.setProperty("--app-height", `${height}px`);
    };

    const updateTargets = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const isMobile = window.innerWidth <= 800;
      targetPortraitY = scrollY * (isMobile ? -0.015 : -0.025);
      raf = null;
    };

    const animate = () => {
      if (!running) return;
      currentPortraitY += (targetPortraitY - currentPortraitY) * 0.065;
      if (portraitRef.current) portraitRef.current.style.transform = `translate3d(0, ${currentPortraitY.toFixed(2)}px, 0)`;
      loop = requestAnimationFrame(animate);
    };

    const handleScroll = () => { if (!raf) raf = requestAnimationFrame(updateTargets); };
    const handlePointer = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      root.style.setProperty("--mx", x.toFixed(3));
      root.style.setProperty("--my", y.toFixed(3));
    };

    setViewport();
    updateTargets();
    animate();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });
    window.addEventListener("resize", setViewport, { passive: true });
    window.addEventListener("orientationchange", setViewport, { passive: true });
    window.addEventListener("pointermove", handlePointer, { passive: true });
    window.visualViewport?.addEventListener("resize", setViewport, { passive: true });
    window.visualViewport?.addEventListener("scroll", setViewport, { passive: true });
    return () => {
      running = false;
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
      window.removeEventListener("resize", setViewport);
      window.removeEventListener("orientationchange", setViewport);
      window.removeEventListener("pointermove", handlePointer);
      window.visualViewport?.removeEventListener("resize", setViewport);
      window.visualViewport?.removeEventListener("scroll", setViewport);
      if (raf) cancelAnimationFrame(raf);
      if (loop) cancelAnimationFrame(loop);
    };
  }, []);

  return (
    <>
      <div className="page-bg" aria-hidden="true" />
      <Nav />
      <main className="main">
        <section className="cv-hero" id="about">
          <div className="hero-meta cv-hero-meta"><span className="blend-text">00 / CV</span><span className="blend-text">Copenhagen</span></div>
          <div className="cv-hero-stack">
            <div className="cv-hero-image-wrap" aria-hidden="true">
              <img ref={portraitRef} src="/profile.jpg" alt="" className="cv-hero-image" />
            </div>
            <div className="cv-hero-copy">
              <h1 className="cv-name blend-text">Izak<br />Hyllested</h1>
              <p className="cv-intro blend-text">Drifts- og systemorienteret professionel med erfaring inden for ledelse af multi-site hospitality- og baroperationer i København. Erfaring med operationel koordinering, vagtplanlægning, procesoptimering, økonomisk overblik samt datadrevne ledelses- og rapportsystemer.</p>
              <div className="cv-actions">
                <a href="/Izak-Hyllested-CV.pdf" className="blend-text">Download CV →</a>
                <a href="mailto:izakhyllested@icloud.com" className="blend-text">Contact →</a>
              </div>
            </div>
          </div>
        </section>

        <section className="profile-copy">
          <p className="blend-text">Erfaren i at skabe forbindelse mellem strategisk ledelse og den daglige drift på tværs af flere venues, med stærke kompetencer inden for teamledelse, stakeholder-kommunikation, operationel problemløsning og tværgående koordinering mellem drift, administration og venue management.</p>
          <p className="blend-text">Har en stærk analytisk og systemorienteret tilgang med erfaring i udvikling af interne rapporteringsstrukturer, operationelle monitoreringssystemer, workflow-optimering og digitale ledelsesværktøjer, der understøtter effektivitet, transparens og databaseret beslutningstagning.</p>
        </section>

        <section className="projects-section">
          <div className="section-top"><span className="blend-text">01 / WORK EXPERIENCE</span><span className="blend-text">Selected roles</span></div>
          <div className="project-list">{projects.map((project, index) => <ProjectRow key={project.title} project={project} index={index} />)}</div>
        </section>

        <section className="capabilities-section">
          <div className="section-top"><span className="blend-text">02 / CAPABILITIES</span><span className="blend-text">Operational profile</span></div>
          <div className="capability-grid">
            {["Multi-site operations", "Workforce planning", "Performance management", "Reporting systems", "Process optimisation", "Financial overview", "Supplier coordination", "Inventory workflows", "Team leadership", "Stakeholder communication", "Digital management tools", "Hospitality operations"].map((skill) => <span className="blend-text" key={skill}>{skill}</span>)}
          </div>
        </section>
      </main>
    </>
  );
}
