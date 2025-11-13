import { useParams } from 'react-router-dom';
import ProjectDetails from './ProjectDetails';
export default function ProjectDetailsWrapper({ projects }){
    const {id} = useParams() ;
    const project = projects.find(p => p.id.toString()===id);

    if(!project) return <p>Projet introuvable</p>

    return <ProjectDetails project={project}/>;
}