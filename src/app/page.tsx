import { SiteHeader } from "@/components/site-header";
import { SiteEffects } from "@/components/site-effects";
import { HeroSection } from "@/components/hero-section";
import { AchievementGrid } from "@/components/achievement-grid";
import { SectionKicker } from "@/components/section-kicker";
import { SocialLinks } from "@/components/social-links";
import { TechLogoMarquee } from "@/components/tech-logo-marquee";
import { career, projects, expertise, education } from "@/data/portfolio";
import { assetPath } from "@/lib/assets";

export default function HomePage() {
  return (
    <>
      <SiteEffects />
      <SiteHeader />
      <main>
        <HeroSection />

        <section className="journey-section section-wrap" id="journey">
          <div className="section-heading reveal">
            <div>
              <SectionKicker icon="career">Career</SectionKicker>
              <h2>My Career So Far</h2>
            </div>
            <p>From actuarial foundations to AI-powered data platforms.</p>
          </div>
          <div className="timeline">
            {career.map((job) => (
              <article className="timeline-item reveal" key={`${job.company}-${job.date}`}>
                <div className="timeline-date">{job.date}</div>
                <div className="timeline-marker" />
                <div className="timeline-content">
                  <div className="role-heading">
                    <div className="role-title-line">
                      <h3>{job.title}</h3>
                      {job.logo && (
                        <span className={`company-logo ${job.logoClass ?? ""}`}>
                          <img
                            src={assetPath(job.logo)}
                            alt={`${job.company} logo`}
                            loading="lazy"
                          />
                        </span>
                      )}
                    </div>
                    <span className="company-name">{job.company}</span>
                  </div>
                  <p className="role-impact">{job.impact}</p>
                  <details>
                    <summary>Role highlights</summary>
                    <ul>
                      {job.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  </details>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="impact-section" id="impact">
          <div className="section-wrap">
            <div className="section-heading impact-heading reveal">
              <div>
                <SectionKicker icon="achievements">Achievements</SectionKicker>
                <h2>A few results I helped deliver.</h2>
              </div>
              <div className="impact-visual" aria-hidden="true">
                <svg viewBox="0 0 190 92">
                  <path
                    className="impact-link"
                    d="M17 61 53 25l38 34 39-42 43 30M17 61l58 17 55-19 43-12M53 25l22 53M91 59l39-42M130 17l4 45"
                  />
                  <circle className="impact-node" cx="17" cy="61" r="4" />
                  <circle className="impact-node" cx="53" cy="25" r="4" />
                  <circle className="impact-node" cx="91" cy="59" r="4" />
                  <circle className="impact-node" cx="130" cy="17" r="4" />
                  <circle className="impact-node" cx="134" cy="62" r="4" />
                  <circle className="impact-node" cx="173" cy="47" r="4" />
                  <path className="impact-flow" d="M17 61 53 25l38 34 39-42 43 30" />
                </svg>
              </div>
            </div>
            <AchievementGrid />
          </div>
        </section>

        <section className="projects-section" id="projects">
          <div className="section-wrap">
            <div className="section-heading projects-heading reveal">
              <div>
                <SectionKicker icon="projects">Projects</SectionKicker>
                <h2>Engineering Intelligence at Scale</h2>
              </div>
            </div>
            <div className="projects-grid">
              {projects.map((project) => (
                <article className={`project-card ${project.tone} reveal`} key={project.number}>
                  <div className="project-top">
                    <span className="project-number">{project.number}</span>
                    <span className="project-category">{project.type}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-outcome">
                    <strong>{project.result}</strong>
                    <span>{project.resultDetail}</span>
                  </div>
                  <ul className="project-tags">
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="expertise-section" id="expertise">
          <div className="section-wrap expertise-inner">
            <div className="section-heading toolkit-heading reveal">
              <div>
                <SectionKicker icon="expertise">Expertise</SectionKicker>
                <h2>My AI and Data Toolkit</h2>
              </div>
            </div>
            <div className="skill-groups reveal">
              {expertise.map((area) => (
                <div
                  className={`skill-category ${area.tone}`}
                  key={area.title}
                  tabIndex={0}
                  role="group"
                  aria-label={area.title}
                >
                  <div className="skill-summary">
                    <span className="skill-heading">
                      <strong>{area.title}</strong>
                    </span>
                  </div>
                  <div className="skill-panel">
                    <ul className="skill-tags">
                      {area.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <TechLogoMarquee />
          </div>
        </section>

        <section className="education-section section-wrap" id="education">
          <div className="section-heading reveal">
            <div>
              <SectionKicker icon="education">Education</SectionKicker>
              <h2>Academic</h2>
            </div>
          </div>
          <div className="education-grid">
            {education.map((item) => (
              <article className="education-card credential-card reveal" key={item.title}>
                <div className={`credential-brand ${item.logoClass ?? ""}`}>
                  {item.logo ? (
                    <img src={assetPath(item.logo)} alt="" loading="lazy" />
                  ) : (
                    <>
                      <strong>{item.brand}</strong>
                      <small>{item.brand === "IBM" ? "DATA SCIENCE" : "ENGLISH"}</small>
                    </>
                  )}
                </div>
                <div className="credential-copy">
                  <span className="card-type">{item.organization}</span>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="section-wrap contact-content">
            <h2 className="reveal">
              Let’s <span>Connect!</span>
            </h2>
            <p className="reveal">
              Have a data or AI challenge in mind? I’d be glad to hear about it.
            </p>
            <div className="contact-actions reveal">
              <SocialLinks labeled />
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer section-wrap">
        <a className="brand" href="#home">
          RODOLFO
        </a>
        <span>© 2026 Rodolfo Robles</span>
        <a href="#home">Back to top</a>
      </footer>
    </>
  );
}

