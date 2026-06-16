import { Link } from 'react-router-dom';

export default function Header(){
    return(
        <header>
            <Link to="/" className="headerName">Sacha Pitalot</Link>
            <div className='link'>
                <Link to={`/`}>Home</Link>
                <Link to={`/project`}>Projets</Link>
                <Link to={`/skills`}>Compétences</Link>
            </div>
        </header>
    ) ;
}