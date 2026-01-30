export default function ProjectDetails({ project }){

    let skills =  project.skills.split(",") ;

    return(
        <div className="Details">
                <div className="blockDetail">
                    <h3>Contexte</h3> 
                    {project.context}
                </div>
                <div className="blockDetail">
                    <h3>Compétences travaillées</h3>
                    <ul>
                        {skills.map((skill, index)=><li key={index}>{skill}</li>)}
                    </ul>
                    
                </div>
                <div className="projectImg"></div>
        </div>
    ) ;
}