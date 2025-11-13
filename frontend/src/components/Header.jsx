import { Link } from 'react-router-dom';

export default function Header(){
    return(
        <header>
            <div className='link'>
                <Link to={`/`}>Home</Link>
                <Link to={`/project`}>Projects</Link>
                <Link to={`/skills`}>Skills</Link>
                <Link to={``}>Contact</Link> 
            </div>
            
        </header>
    ) ;
}