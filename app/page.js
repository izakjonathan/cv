"use client";
import { useEffect, useRef } from "react";
import Nav from "../components/Nav";
import ProjectRow from "../components/ProjectRow";
import { projects } from "../data/projects";

export default function Home() {
 const portraitRef=useRef(null);
 useEffect(()=>{let r=true,l;let t=0,c=0;const upd=()=>{t=(window.scrollY||0)*-0.045};const anim=()=>{if(!r)return;c+=(t-c)*0.065;if(portraitRef.current)portraitRef.current.style.transform=`translate3d(0, ${c.toFixed(2)}px, 0)`;l=requestAnimationFrame(anim)};upd();anim();window.addEventListener("scroll",upd,{passive:true});return()=>{r=false;cancelAnimationFrame(l)}},[]);
 return (<><div className="page-bg"/><div className="portrait-layer"><img ref={portraitRef} src="/profile.jpg" className="portrait"/></div><Nav/>
 <main className="main">
 <section className="about-strip" id="about">
 <p className="blend-text">IZAK HYLLESTED<br/><br/>Drifts- og systemorienteret professionel med erfaring inden for ledelse af multi-site hospitality- og baroperationer i København. Erfaring med operationel koordinering, vagtplanlægning, procesoptimering, økonomisk overblik samt datadrevne ledelses- og rapportsystemer.</p>
 <a href="/Izak-Hyllested-CV.pdf" className="blend-text">Download CV →</a>
 </section>
 <section className="portrait-section"><div className="portrait-spacer" /></section>
 <section className="projects-section"><div className="section-top"><span className="blend-text">01 / WORK EXPERIENCE</span><span className="blend-text">Selected roles</span></div><div className="project-list">{projects.map((project,index)=><ProjectRow key={project.title} project={project} index={index}/> )}</div></section>
 </main></>);
}
