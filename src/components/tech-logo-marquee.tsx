import {
  siApacheairflow,
  siApachespark,
  siGit,
  siGithubactions,
  siGooglebigquery,
  siGooglecloud,
  siJavascript,
  siNumpy,
  siPandas,
  siPostgresql,
  siPython,
  siScikitlearn,
  siTensorflow,
  siTerraform,
} from "simple-icons";

const technologies = [
  { name: "Python", icon: siPython },
  { name: "Apache Spark", icon: siApachespark },
  { name: "Google Cloud", icon: siGooglecloud },
  { name: "BigQuery", icon: siGooglebigquery },
  { name: "PostgreSQL", icon: siPostgresql },
  { name: "TensorFlow", icon: siTensorflow },
  { name: "scikit-learn", icon: siScikitlearn },
  { name: "NumPy", icon: siNumpy },
  { name: "Pandas", icon: siPandas },
  { name: "Apache Airflow", icon: siApacheairflow },
  { name: "JavaScript", icon: siJavascript },
  { name: "Terraform", icon: siTerraform },
  { name: "GitHub Actions", icon: siGithubactions },
  { name: "Git", icon: siGit },
];

function TechnologyGroup({ decorative = false }: { decorative?: boolean }) {
  return (
    <div className="technology-marquee-group" aria-hidden={decorative || undefined}>
      {technologies.map(({ name, icon }) => (
        <span
          className="technology-marquee-item"
          key={name}
          role={decorative ? undefined : "img"}
          aria-label={decorative ? undefined : name}
          tabIndex={decorative ? -1 : 0}
          title={name}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d={icon.path} />
          </svg>
          <span className="technology-marquee-label" aria-hidden="true">
            {name}
          </span>
        </span>
      ))}
    </div>
  );
}

export function TechLogoMarquee() {
  return (
    <div className="technology-marquee-wrap reveal">
      <p className="technology-marquee-heading">A few tools from my day-to-day work</p>
      <div className="technology-marquee" role="group" aria-label="Selected technology logos">
        <div className="technology-marquee-track">
          <TechnologyGroup />
          <TechnologyGroup decorative />
        </div>
      </div>
    </div>
  );
}

