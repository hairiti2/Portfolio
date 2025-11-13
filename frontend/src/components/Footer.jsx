import { Link } from "react-router-dom";

export default function Footer(){
    return(
        <footer>
            <div className='link'>
                <Link to={`/`}>Home</Link>
                <Link to={``}>Projects</Link>
                <Link to={``}>Skills</Link>
                <Link to={``}>Contact</Link> 
            </div>
        </footer>
    );
}