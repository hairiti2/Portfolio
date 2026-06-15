const AC_LABELS = {
  /* ── Réaliser ── */
  "AC11.01": "Implémenter des conceptions simples",
  "AC11.02": "Élaborer des conceptions simples",
  "AC11.03": "Faire des essais et évaluer leurs résultats en regard des spécifications",
  "AC11.04": "Développer des interfaces utilisateurs",
  "AC21.01": "Élaborer et implémenter les spécifications fonctionnelles et non fonctionnelles à partir des exigences",
  "AC21.02": "Appliquer des principes d'accessibilité et d'ergonomie",
  "AC21.03": "Adopter de bonnes pratiques de conception et de programmation",
  "AC21.04": "Vérifier et valider la qualité de l'application par les tests",
  "AC31.01": "Choisir et implémenter les architectures adaptées",
  "AC31.02": "Faire évoluer une application existante",
  "AC31.03": "Intégrer des solutions dans un environnement de production",
  /* ── Optimiser ── */
  "AC12.01": "Analyser un problème avec des méthodes et outils mathématiques appropriés",
  "AC12.02": "Comparer des algorithmes pour des problèmes classiques",
  "AC12.03": "Formaliser et mettre en œuvre des outils mathématiques pour l'informatique",
  "AC22.01": "Choisir des structures de données complexes adaptées au problème",
  "AC22.02": "Utiliser des techniques algorithmiques adaptées pour des problèmes complexes",
  "AC22.03": "Comprendre les enjeux et moyens de sécurisation des données et du code",
  "AC22.04": "Évaluer l'impact environnemental et sociétal des solutions proposées",
  "AC32.01": "Anticiper les résultats de diverses métriques (temps, mémoire, montée en charge)",
  "AC32.02": "Profiler, analyser et justifier le comportement d'un code existant",
  "AC32.03": "Choisir et utiliser des bibliothèques et méthodes dédiées au domaine",
  /* ── Administrer ── */
  "AC13.01": "Identifier les différents composants d'un système numérique",
  "AC13.02": "Utiliser les fonctionnalités de base d'un système multi-utilisateurs",
  "AC13.03": "Installer et configurer un système d'exploitation et des outils de développement",
  "AC23.01": "Concevoir et développer des applications communicantes",
  "AC23.02": "Utiliser des serveurs et des services réseaux virtualisés",
  "AC23.03": "Sécuriser les services et données d'un système",
  /* ── Gérer ── */
  "AC14.01": "Mettre à jour et interroger une base de données relationnelle",
  "AC14.02": "Visualiser des données",
  "AC14.03": "Concevoir une base de données relationnelle à partir d'un cahier des charges",
  "AC24.01": "Optimiser les modèles de données de l'entreprise",
  "AC24.02": "Assurer la confidentialité des données (intégrité et sécurité)",
  "AC24.03": "Organiser la restitution de données à travers la programmation et la visualisation",
  "AC24.04": "Manipuler des données hétérogènes",
  /* ── Conduire ── */
  "AC15.01": "Identifier les besoins métiers des clients et des utilisateurs",
  "AC15.02": "Identifier les critères de faisabilité d'un projet informatique",
  "AC15.03": "Définir et mettre en œuvre une démarche de suivi de projet",
  "AC25.01": "Identifier et décrire les processus d'une organisation",
  "AC25.02": "Formaliser les besoins du client et de l'utilisateur",
  "AC25.03": "Identifier les critères de faisabilité d'un projet informatique",
  "AC25.04": "Définir et mettre en œuvre une démarche de suivi de projet",
  /* ── Collaborer ── */
  "AC16.01": "Appréhender l'écosystème numérique",
  "AC16.02": "Découvrir les aptitudes requises selon les différents secteurs informatiques",
  "AC16.03": "Identifier les modalités d'accompagnement du changement pour assurer la prise en main d'un nouvel outil",
  "AC16.04": "Appréhender et construire une démarche de veille informatique",
  "AC26.01": "Communiquer efficacement avec les acteurs d'un projet",
  "AC26.02": "Identifier les rôles et les responsabilités au sein d'une équipe pluridisciplinaire",
  "AC26.03": "Organiser et partager une veille technologique et informationnelle",
  "AC26.04": "Développer son identité professionnelle",
};

export default function ProjectDetails({ project }) {
  const skills = project.skills || [];
  const apprentissages = project.apprentissages || [];

  return (
    <div className="Details">
      <div className="blockDetail">
        <h3>Contexte</h3>
        {project.context}
      </div>
      <div className="blockDetail">
        <h3>Compétences travaillées</h3>
        <ul>
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
      {apprentissages.length > 0 && (
        <div className="blockDetail">
          <h3>Apprentissages critiques</h3>
          <div className="acTags">
            {apprentissages.map(ac => (
              <span
                key={ac}
                className={`tag-ac tag-ac--comp${ac[3]}`}
                title={AC_LABELS[ac] ? `${ac} – ${AC_LABELS[ac]}` : ac}
              >
                {ac}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
