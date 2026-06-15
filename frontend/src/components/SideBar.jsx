const COMPETENCES = [
  { key: "Réaliser",     desc: "Développer une solution informatique" },
  { key: "Optimiser",    desc: "Algorithmique et structures de données" },
  { key: "Administrer",  desc: "Infrastructure et systèmes" },
  { key: "Gérer",        desc: "Données et bases de données" },
  { key: "Conduire",     desc: "Gestion de projet" },
  { key: "Collaborer",   desc: "Travail en équipe" },
];

export default function SideBar({ skills, checked, onToggle }) {
  return (
    <div className="sideBar">
      <div className="sideBarContent">
        <h2>Filtres</h2>
        <div className="filter">

          <div className="filterCategory">
            <h4>Compétences BUT</h4>
            <ul>
              {COMPETENCES.map(({ key }) => (
                <li key={key}>
                  <label>
                    <input
                      type="checkbox"
                      checked={!!checked[key]}
                      onChange={() => onToggle(key)}
                    />
                    {key}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {skills.map(category => (
            <div key={category.category} className="filterCategory">
              <h4>{category.category}</h4>
              <ul>
                {category.skills.map(skill => (
                  <li key={skill}>
                    <label>
                      <input
                        type="checkbox"
                        checked={!!checked[skill]}
                        onChange={() => onToggle(skill)}
                      />
                      {skill}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="filterCategory">
            <h4>Année</h4>
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
          </div>

          <div className="filterCategory">
            <h4>Type de projet</h4>
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
          </div>

        </div>
      </div>
    </div>
  );
}
