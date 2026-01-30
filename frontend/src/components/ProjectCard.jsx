import { Link } from 'react-router-dom';
import ProjectDetails from './ProjectDetails';
import { useState } from 'react';


export default function ProjectCard({ project }){
    const [showDetail, setShowDetail] = useState(false);  

    function toggleDetails(e){
        e.preventDefault();
        setShowDetail(!showDetail);
    }

    return(
        <div className="card">
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <button onClick={toggleDetails}>{showDetail ? "Masquer les détails" : "Voir les détails"}</button>
            {showDetail &&(<div className="projectDetails"> <ProjectDetails project={project} /></div>)}
        </div>
    ) ;
}

