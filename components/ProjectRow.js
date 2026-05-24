export default function ProjectRow({ project, index }) {
  return (
    <article className="project-row cv-row">
      <span className="project-number blend-text">{String(index + 1).padStart(2, "0")}</span>
      <div className="project-main">
        <h2 className="blend-text">{project.title}</h2>
        <p className="blend-text">{project.description}</p>
        {project.details?.length ? (
          <ul className="cv-details">
            {project.details.map((item) => (
              <li className="blend-text" key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
      </div>
      <div className="project-side">
        <span className="blend-text">{project.category}</span>
        <span className="blend-text">{project.year}</span>
      </div>
    </article>
  );
}
