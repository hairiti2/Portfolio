import { Link } from 'react-router-dom';

export default function ProjectCard({ project }){
    return(
        <div className="card">
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <Link to={`/project/${project.id}`}>Voir les détails</Link>
        </div>
    ) ;
}