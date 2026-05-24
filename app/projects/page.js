import Nav from "../../components/Nav";
import ProjectRow from "../../components/ProjectRow";
import { projects } from "../../data/projects";

export default function ProjectsPage() {
  return (
    <>
      <div className="page-bg" aria-hidden="true" />
      <Nav />
      <main className="main">
        <section className="projects-page">
          <div className="hero-meta"><span className="blend-text">01 / CV ARCHIVE</span><span className="blend-text">Work Experience</span></div>
          <h1 className="archive-title blend-text">Experience</h1>
          <div className="project-list">{projects.map((project, index) => <ProjectRow key={project.title} project={project} index={index} />)}</div>
        </section>
      </main>
    </>
  );
}
