import { useState } from 'react';

const COMPETENCES = [
  { key: "Réaliser",     desc: "Développer une solution informatique" },
  { key: "Optimiser",    desc: "Algorithmique et structures de données" },
  { key: "Administrer",  desc: "Infrastructure et systèmes" },
  { key: "Gérer",        desc: "Données et bases de données" },
  { key: "Conduire",     desc: "Gestion de projet" },
  { key: "Collaborer",   desc: "Travail en équipe" },
];

function FilterSection({ title, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="filterCategory">
      <button className="filterCategoryToggle" onClick={() => setOpen(o => !o)}>
        <h4>{title}</h4>
        <span className={`filterChevron ${open ? 'filterChevron--open' : ''}`}>›</span>
      </button>
      {open && children}
    </div>
  );
}

export default function SideBar({ skills, checked, onToggle }) {
  return (
    <div className="sideBar">
      <div className="sideBarContent">
        <h2>Filtres</h2>
        <div className="filter">

          <FilterSection title="Compétences BUT" defaultOpen={true}>
            <ul>
              {COMPETENCES.map(({ key }) => (
                <li key={key}>
                  <label>
                    <input type="checkbox" checked={!!checked[key]} onChange={() => onToggle(key)} />
                    {key}
                  </label>
                </li>
              ))}
            </ul>
          </FilterSection>

          {skills.map(category => (
            <FilterSection key={category.category} title={category.category} defaultOpen={false}>
              <ul>
                {category.skills.map(skill => (
                  <li key={skill}>
                    <label>
                      <input type="checkbox" checked={!!checked[skill]} onChange={() => onToggle(skill)} />
                      {skill}
                    </label>
                  </li>
                ))}
              </ul>
            </FilterSection>
          ))}

          <FilterSection title="Année" defaultOpen={true}>
            <ul>
              <li>
                <label>
                  <input type="checkbox" checked={!!checked["BUT1"]} onChange={() => onToggle("BUT1")} />
                  2024 - 2025 (BUT1)
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" checked={!!checked["BUT2"]} onChange={() => onToggle("BUT2")} />
                  2025 - 2026 (BUT2)
                </label>
              </li>
            </ul>
          </FilterSection>

          <FilterSection title="Type de projet" defaultOpen={true}>
            <ul>
              {["Projet académique", "Projet personnel", "Expérience professionnelle"].map(t => (
                <li key={t}>
                  <label>
                    <input type="checkbox" checked={!!checked[t]} onChange={() => onToggle(t)} />
                    {t}
                  </label>
                </li>
              ))}
            </ul>
          </FilterSection>

        </div>
      </div>
    </div>
  );
}
