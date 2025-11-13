export default function SkillCard( {skill} ){

    let skills = skill.skills.split(",") ;

    return(
    <div className="skillCard">
        <h2>{skill.category}</h2>
        <div className="listSkill">
            <ul>
                {skills.map((skill, index)=><li key={index}>{skill}</li>)}
            </ul>
        </div>
    </div>);
}