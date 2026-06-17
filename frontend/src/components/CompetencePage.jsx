import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AC_LABELS from '../data/acLabels';

const COMPETENCES = [
  { id: 1, name: "Réaliser",    desc: "Développer une application informatique" },
  { id: 2, name: "Optimiser",   desc: "Algorithmique et structures de données" },
  { id: 3, name: "Administrer", desc: "Systèmes informatiques communicants" },
  { id: 4, name: "Gérer",       desc: "Données de l'information" },
  { id: 5, name: "Conduire",    desc: "Conduire un projet" },
  { id: 6, name: "Collaborer",  desc: "Travailler en équipe informatique" },
];

const PERIODS = [
  { key: 'BUT1',  label: 'BUT1',       sub: 'Sept 2024 – Juill 2025' },
  { key: 'BUT2',  label: 'BUT2',       sub: 'Sept 2025 – Mars 2026'  },
  { key: 'Stage', label: 'Stage SNCF', sub: 'Avr 2026 – Juill 2026'  },
];

function matchPeriod(p, key) {
  if (key === 'BUT1')  return p.period?.label === 'BUT1';
  if (key === 'Stage') return (p.type || []).includes('Expérience professionnelle');
  if (key === 'BUT2')  return p.period?.label === 'BUT2' && !(p.type || []).includes('Expérience professionnelle');
  return false;
}

function countBy(list, field, value) {
  return list.filter(p => (p[field] || []).includes(value)).length;
}

// Nombre total d'ACs par compétence dans le référentiel (niv 1+2+3)
const TOTAL_ACS = { 1: 11, 2: 10, 3: 7, 4: 7, 5: 7, 6: 8 };

const COMP_COLORS = {
  1: '#6366f1',
  2: '#a855f7',
  3: '#f97316',
  4: '#10b981',
  5: '#eab308',
  6: '#ec4899',
};

// Niveaux manuels (%) pour chaque techno
const SKILL_PCT = {
  // Langages
  'Python':          70,
  'JavaScript':      72,
  'SQL':             72,
  'PHP':             50,
  'HTML/CSS':        60,
  'Java':            60,
  'DAX':             60,
  'Kotlin':          28,
  'C':               40,
  'M (PowerQuery)':  22,
  // Frameworks
  'PySpark':         70,
  'Node.js':         60,
  'React':           40,
  'Symfony':         25,
  'PyGame':          20,
  'Firebase':        30,
  'Swing':           33,
  // Outils
  'Databricks':      70,
  'PowerBI':         70,
  'Git':             80,
  'Docker':          33,
  'Raspberry Pi OS': 18,
};

function LevelBar({ pct, colorVar }) {
  return (
    <div className="levelBar">
      <div
        className="levelBarFill"
        style={{ width: `${pct}%`, background: colorVar }}
      />
    </div>
  );
}

export default function CompetencePage({ projects }) {
  const navigate = useNavigate();
  const [checked, setChecked] = useState({});

  const toggle = key => setChecked(prev => ({ ...prev, [key]: !prev[key] }));

  const PERIOD_TO_PROJECT = { BUT1: 'BUT1', BUT2: 'BUT2', Stage: 'Expérience professionnelle' };

  const goToProjects = (extra = {}) => {
    const periods = Object.keys(checked)
      .filter(k => checked[k])
      .map(k => PERIOD_TO_PROJECT[k])
      .filter(Boolean);
    navigate('/project', { state: { ...extra, preselectPeriods: periods } });
  };

  const activeFilters = Object.keys(checked).filter(k => checked[k]);
  const byPeriod = activeFilters.length === 0
    ? projects
    : projects.filter(p => activeFilters.some(k => matchPeriod(p, k)));

  const competenceData = COMPETENCES.map(comp => {
    const digit = comp.id.toString();
    const related = byPeriod.filter(p => (p.apprentissages || []).some(ac => ac[3] === digit));
    const acs = [...new Set(related.flatMap(p => (p.apprentissages || []).filter(ac => ac[3] === digit)))].sort();
    const levels = [...new Set(acs.map(ac => parseInt(ac[2])))];
    const maxLevel = levels.length > 0 ? Math.max(...levels) : 0;
    return { ...comp, related, acs, levels, maxLevel };
  });

  // Total de projets utilisant chaque skill sur l'ensemble des périodes
  const allLangCount = Object.fromEntries(
    [...new Set(projects.flatMap(p => p.languages || []))].map(l => [l, countBy(projects, 'languages', l)])
  );
  const allFwCount = Object.fromEntries(
    [...new Set(projects.flatMap(p => p.frameworks || []))].map(f => [f, countBy(projects, 'frameworks', f)])
  );
  const allToolCount = Object.fromEntries(
    [...new Set(projects.flatMap(p => p.tools || []))].map(t => [t, countBy(projects, 'tools', t)])
  );

  const skillPct = (count, name, allCount) =>
    count > 0 ? Math.round((count / Math.max(allCount[name] || 1, 1)) * (SKILL_PCT[name] ?? 25)) : 0;

  const sortByPct = (a, b) => (SKILL_PCT[b.name] ?? 25) - (SKILL_PCT[a.name] ?? 25);

  const langList = [...new Set(projects.flatMap(p => p.languages || []))]
    .map(l => ({ name: l, count: countBy(byPeriod, 'languages', l) }))
    .sort(sortByPct);

  const fwList = [...new Set(projects.flatMap(p => p.frameworks || []))]
    .map(f => ({ name: f, count: countBy(byPeriod, 'frameworks', f) }))
    .sort(sortByPct);

  const toolList = [...new Set(projects.flatMap(p => p.tools || []))]
    .map(t => ({ name: t, count: countBy(byPeriod, 'tools', t) }))
    .sort(sortByPct);

  return (
    <div className="pageContent">
      <h1>Mes compétences</h1>
      <div className="projectPage">

        {/* ── Sidebar ── */}
        <div className="sideBar">
          <div className="sideBarContent">
            <h2>Filtres</h2>
            <div className="filter">
              <div className="filterCategory">
                <h4>Période</h4>
                <ul>
                  {PERIODS.map(({ key, label, sub }) => (
                    <li key={key}>
                      <label>
                        <input
                          type="checkbox"
                          checked={!!checked[key]}
                          onChange={() => toggle(key)}
                        />
                        <span>
                          {label}
                          <span className="filterSub">{sub}</span>
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ── Contenu principal ── */}
        <div className="competenceMain">

          {/* Compétences BUT */}
          <section className="compSection">
            <h2 className="compSectionTitle">Compétences BUT</h2>
            <div className="competenceGrid">
              {competenceData.map(comp => {
                const color = COMP_COLORS[comp.id];
                return (
                  <div
                    key={comp.id}
                    className="skillCard"
                    onClick={() => goToProjects({ preselectCompetence: comp.name })}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => e.key === 'Enter' && goToProjects({ preselectCompetence: comp.name })}
                  >
                    <div className="competenceHeader">
                      <div className="competenceHeaderTitle">
                        <div>
                          <h3>{comp.name}</h3>
                          <p className="competenceDesc">{comp.desc}</p>
                        </div>
                      </div>
                    </div>
                    <LevelBar pct={Math.min(Math.round((comp.acs.length / TOTAL_ACS[comp.id]) * 100), 95)} colorVar={color} />
                    {comp.acs.length > 0 ? (
                      <div className="acTags">
                        {comp.acs.map(ac => (
                          <span
                            key={ac}
                            className={`tag-ac tag-ac--comp${ac[3]}`}
                            title={AC_LABELS[ac] ? `${ac} – ${AC_LABELS[ac]}` : ac}
                          >
                            {ac}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="competenceEmpty">Aucun apprentissage sur cette période.</p>
                    )}
                    {comp.related.length > 0 && (
                      <span className="competenceProjectsLabel">
                        {comp.related.length} projet{comp.related.length > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Langages */}
          <section className="compSection">
            <h2 className="compSectionTitle">Langages</h2>
            <div className="competenceGrid">
              {langList.map(({ name, count }) => (
                <div
                  key={name}
                  className="skillCard"
                  onClick={() => goToProjects({ preselectSkill: name })}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && goToProjects({ preselectSkill: name })}
                >
                  <div className="competenceHeader">
                    <h3>{name}</h3>
                    <span className="levelLabel" style={{ color: '#7c3aed' }}>
                      {count > 0 ? `${count} projet${count > 1 ? 's' : ''}` : '—'}
                    </span>
                  </div>
                  <LevelBar pct={skillPct(count, name, allLangCount)} colorVar="#7c3aed" />
                </div>
              ))}
            </div>
          </section>

          {/* Frameworks */}
          <section className="compSection">
            <h2 className="compSectionTitle">Frameworks &amp; bibliothèques</h2>
            <div className="competenceGrid">
              {fwList.map(({ name, count }) => (
                <div
                  key={name}
                  className="skillCard"
                  onClick={() => goToProjects({ preselectSkill: name })}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && goToProjects({ preselectSkill: name })}
                >
                  <div className="competenceHeader">
                    <h3>{name}</h3>
                    <span className="levelLabel" style={{ color: '#10b981' }}>
                      {count > 0 ? `${count} projet${count > 1 ? 's' : ''}` : '—'}
                    </span>
                  </div>
                  <LevelBar pct={skillPct(count, name, allFwCount)} colorVar="#10b981" />
                </div>
              ))}
            </div>
          </section>

          {/* Logiciels */}
          <section className="compSection">
            <h2 className="compSectionTitle">Logiciels &amp; outils</h2>
            <div className="competenceGrid">
              {toolList.map(({ name, count }) => (
                <div
                  key={name}
                  className="skillCard"
                  onClick={() => goToProjects({ preselectSkill: name })}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && goToProjects({ preselectSkill: name })}
                >
                  <div className="competenceHeader">
                    <h3>{name}</h3>
                    <span className="levelLabel" style={{ color: '#f97316' }}>
                      {count > 0 ? `${count} projet${count > 1 ? 's' : ''}` : '—'}
                    </span>
                  </div>
                  <LevelBar pct={skillPct(count, name, allToolCount)} colorVar="#f97316" />
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
