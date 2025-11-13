import { useState } from 'react'
import ProjectCard from './components/ProjectCard'; 
import { Routes, Route } from 'react-router-dom';
import './assets/style/App.css'
import { useEffect } from 'react';
import ProjectDetailsWrapper from './components/ProjectDetailsWrapper';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import SkillCard from './components/SkillCard';

function App() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch("/api/projects")
      .then(res => res.json())
      .then(dataProj => setProjects(dataProj))
      .catch(err => console.log("Erreur:", err));

    fetch("/api/skills")
      .then(res => res.json())
      .then(dataSkill => setSkills(dataSkill))
      .catch(err=>console.log("Erreur", err));
  }, []);

  return (
    <>
        <Routes>
          <Route path="/" element = {
            <main className='container'>
              <Header/>
              <Home/>
              <Footer/>
            </main>
          }/>
          <Route path="/project/" element={
            <main className="container">
              {<Header />}
              <h1>Mes Projets</h1>
              <section>
                {projects.map(p => <ProjectCard key={p.id} project={p} />)}
              </section>
              {<Footer/>}
            </main>
          }/>
          <Route path="/project/:id" element={
            <main className='container'>
              {<Header/>}
              <ProjectDetailsWrapper projects={projects}/>
              {<Footer/>}
            </main>
            }/>
            <Route path='/skills' element={
              <main className='container'>
                <Header/>
                <h1>Mes Compétences</h1>
                {skills.map((s, key) => <SkillCard key={key} skill = {s}/>)}
                <Footer/>
              </main>
            }/>
        </Routes>

    </>
  )
}

export default App
