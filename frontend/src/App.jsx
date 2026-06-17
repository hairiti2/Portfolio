import { useState, useEffect } from 'react'
import ProjectCard from './components/ProjectCard';
import { Routes, Route, useLocation } from 'react-router-dom';
import './assets/style/App.css'
import ProjectDetailsWrapper from './components/ProjectDetailsWrapper';
import Header from './components/Header';
import Home from './components/Home';
import SideBar from './components/SideBar';
import CompetencePage from './components/CompetencePage';

function App() {
  const location = useLocation();
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [checkedSkills, setCheckedSkills] = useState({});

  function toggleSkill(skill) {
    setCheckedSkills(prev => ({ ...prev, [skill]: !prev[skill] }));
  }

  const YEARS = ["BUT1", "BUT2"];
  const TYPES = ["Projet académique", "Projet personnel", "Expérience professionnelle"];
  const COMPETENCES = ["Réaliser", "Optimiser", "Administrer", "Gérer", "Conduire", "Collaborer"];

  const activeKeys = Object.keys(checkedSkills).filter(k => checkedSkills[k]);
  const activeYears = activeKeys.filter(k => YEARS.includes(k));
  const activeTypes = activeKeys.filter(k => TYPES.includes(k));
  const activeCompetences = activeKeys.filter(k => COMPETENCES.includes(k));
  const activeSkills = activeKeys.filter(k => !YEARS.includes(k) && !TYPES.includes(k) && !COMPETENCES.includes(k));

  useEffect(() => {
    const { preselectSkill, preselectCompetence, preselectPeriods } = location.state ?? {};
    if (!preselectSkill && !preselectCompetence && !preselectPeriods?.length) return;
    const next = {};
    if (preselectSkill) next[preselectSkill] = true;
    else if (preselectCompetence) next[preselectCompetence] = true;
    (preselectPeriods ?? []).forEach(p => { next[p] = true; });
    setCheckedSkills(next);
  }, [location.state]);

  const filteredProjects = projects.filter(p => {
    const skillMatch = activeSkills.length === 0 || activeSkills.some(s =>
      (p.languages || []).some(l => l.toLowerCase() === s.toLowerCase()) ||
      (p.frameworks || []).some(f => f.toLowerCase() === s.toLowerCase()) ||
      (p.tools || []).some(t => t.toLowerCase() === s.toLowerCase())
    );
    const yearMatch = activeYears.length === 0 || activeYears.includes(p.period?.label);
    const typeMatch = activeTypes.length === 0 || activeTypes.some(t => (p.type || []).includes(t));
    const competenceMatch = activeCompetences.length === 0 || activeCompetences.some(comp => {
      const digit = (COMPETENCES.indexOf(comp) + 1).toString();
      return (p.apprentissages || []).some(ac => ac[3] === digit);
    });
    return skillMatch && yearMatch && typeMatch && competenceMatch;
  });

  useEffect(() => {
    fetch("https://sachapitalot.dev/api/projects")
      .then(res => res.json())
      .then(dataProj => setProjects(dataProj))
      .catch(err => console.log("Erreur:", err));

    fetch("https://sachapitalot.dev/api/skills")
      .then(res => res.json())
      .then(dataSkill => setSkills(dataSkill))
      .catch(err=>console.log("Erreur", err));
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={
          <div className="container">
            <Home />
          </div>
        }/>
        <Route path="/project/" element={
          <main className="container">
            <div className="pageContent">
              <h1>Mes projets et expériences professionnelles</h1>
              <div className="projectPage">
                <SideBar skills={skills} checked={checkedSkills} onToggle={toggleSkill} />
                <div className="projectGrid">
                  {filteredProjects.map(p => <ProjectCard key={p.id} project={p} />)}
                </div>
              </div>
            </div>
          </main>
        }/>
        <Route path="/project/:id" element={
          <main className="container">
            <ProjectDetailsWrapper projects={projects}/>
          </main>
        }/>
        <Route path="/skills" element={
          <main className="container">
            <CompetencePage projects={projects} />
          </main>
        }/>
      </Routes>
    </>
  )
}

export default App
