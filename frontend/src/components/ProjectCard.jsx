import ProjectDetails from './ProjectDetails';
import { useState } from 'react';

export default function ProjectCard({ project }){
    const [showDetail, setShowDetail] = useState(false);

    function toggleDetails(e){
        e.preventDefault();
        setShowDetail(!showDetail);
    }

    return(
        <div className={`card ${showDetail ? 'card-expanded' : ''}`}>
            <div className="cardSummary">
                <h2>{project.title}</h2>
                {project.period && (
                    <span className="period">
                        {project.period.start} - {project.period.end} ({project.period.label})
                    </span>
                )}
                <p>{project.description}</p>
                <div className="tags">
                    {(project.languages || []).map(l => (
                        <span key={l} className="tag tag-language">{l}</span>
                    ))}
                    {(project.frameworks || []).map(f => (
                        <span key={f} className="tag tag-framework">{f}</span>
                    ))}
                </div>
                {project.link && (
                    <a href={project.link} target="_blank" rel="noreferrer" className="projectLink">
                        Voir le projet
                    </a>
                )}
                <button onClick={toggleDetails}>
                    {showDetail ? "Masquer les détails" : "Voir les détails"}
                </button>
            </div>
            {showDetail && (
                <div className="projectDetails">
                    <ProjectDetails project={project} />
                </div>
            )}
        </div>
    );
}
