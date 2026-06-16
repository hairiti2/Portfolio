import AC_LABELS from '../data/acLabels';

export default function ProjectDetails({ project }) {
  const skills = project.skills || [];
  const apprentissages = project.apprentissages || [];

  return (
    <div className="Details">
      {project.image && (
        <img
          src={project.image}
          alt={project.title}
          className="detailImage"
          onError={e => { e.currentTarget.style.display = 'none'; }}
        />
      )}
      <div className="blockDetail">
        <h3>Contexte</h3>
        {project.context}
      </div>
      <div className="blockDetail">
        <h3>Compétences travaillées</h3>
        <ul>
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
      {apprentissages.length > 0 && (
        <div className="blockDetail">
          <h3>Apprentissages critiques</h3>
          <div className="acTags">
            {apprentissages.map(ac => (
              <span
                key={ac}
                className={`tag-ac tag-ac--comp${ac[3]}`}
                title={AC_LABELS[ac] ? `${ac} – ${AC_LABELS[ac]}` : ac}
              >
                {ac}
              </span>
            ))}
          </div>
        </div>
      )}
      {project.bilan && (
        <div className="blockDetail blockDetail--bilan">
          <h3>Bilan &amp; réflexion</h3>
          <p>{project.bilan}</p>
        </div>
      )}
    </div>
  );
}
