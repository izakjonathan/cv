"use client";

import { useEffect, useRef, useState } from "react";
import Nav from "../components/Nav";
import ProjectRow from "../components/ProjectRow";
import { projects } from "../data/projects";

export default function Home() {
  const [splashLeaving, setSplashLeaving] = useState(false);
  const [splashGone, setSplashGone] = useState(false);
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
      targetPortraitY = scrollY * (isMobile ? -0.055 : -0.045);
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
    const finishSplash = () => { setSplashLeaving(true); window.setTimeout(() => setSplashGone(true), 620); };
    const waitForPage = async () => {
      const minimumTime = new Promise((resolve) => window.setTimeout(resolve, 650));
      const imageLoads = Array.from(document.images).map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => { img.addEventListener("load", resolve, { once: true }); img.addEventListener("error", resolve, { once: true }); });
      });
      await Promise.all([minimumTime, ...imageLoads]);
      if (document.readyState === "complete") finishSplash(); else window.addEventListener("load", finishSplash, { once: true });
    };

    setViewport(); updateTargets(); animate(); waitForPage();
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
      {!splashGone && <div className={splashLeaving ? "splash is-leaving" : "splash"}><div className="splash-name">IZAK<br />HYLLESTED</div></div>}
      <div className="page-bg" aria-hidden="true" />
      <div className="portrait-layer" aria-hidden="true"><img ref={portraitRef} src="/profile.jpg" alt="" className="portrait" /></div>
      <Nav />
      <main className="main">
        <section className="hero">
          <div className="hero-meta"><span className="blend-text">00 / CV</span><span className="blend-text">Copenhagen</span></div>
          <div className="hero-title-wrap"><h1 className="hero-title blend-text">Operations<br />Leader &<br />Systems<br />Builder</h1></div>
          <div className="hero-grid">
            <div><div className="label blend-text">WHO</div><p className="blend-text">Izak Hyllested</p></div>
            <div><div className="label blend-text">WHAT</div><p className="blend-text">Operations<br />Reporting<br />Systems</p></div>
            <div><div className="label blend-text">WHERE</div><p className="blend-text">Copenhagen</p></div>
            <div><div className="label blend-text">FOCUS</div><p className="blend-text">Hospitality<br />Management<br />Data</p></div>
          </div>
        </section>

        <section className="portrait-section">
          <div className="portrait-spacer" />
          <div className="portrait-caption"><span className="blend-text">Portrait / Profile</span><span className="blend-text">Operations + Systems</span></div>
        </section>

        <section className="about-strip" id="about">
          <p className="blend-text">Drifts- og systemorienteret professionel med erfaring inden for ledelse af multi-site hospitality- og baroperationer i København. Erfaring med operationel koordinering, vagtplanlægning, procesoptimering, økonomisk overblik samt datadrevne ledelses- og rapportsystemer.</p>
          <a href="/Izak-Hyllested-CV.pdf" className="blend-text">Download CV →</a>
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
