import { Link } from "react-router-dom";

export default function Home(){
   return( <div className="presentation">
        <h1>Sacha Pitalot</h1>
        <p>Développeur web et logiciel</p>
        <Link to={'/project'}>Découvrir mes projets</Link>
    </div>);
}