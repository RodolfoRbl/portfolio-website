import { assetPath } from "@/lib/assets";

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.5 6.5h17v11h-17z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle className="icon-dot" cx="17.6" cy="6.7" r="0.8" />
    </svg>
  );
}

export function SocialLinks({ labeled = false }: { labeled?: boolean }) {
  return (
    <div
      className={labeled ? "social-links contact-social-links" : "social-links hero-social-links"}
    >
      <a
        className={labeled ? "button button-primary" : "button button-primary"}
        href="mailto:rodolforoblesramos@gmail.com"
        aria-label={labeled ? undefined : "Email Rodolfo"}
      >
        <span className="button-icon" aria-hidden="true">
          <EmailIcon />
        </span>
        {labeled ? "Email me" : null}
      </a>
      <a
        className="button button-outline"
        href="https://www.linkedin.com/in/robles-rodolfo"
        target="_blank"
        rel="noreferrer"
        aria-label={labeled ? undefined : "Rodolfo on LinkedIn"}
      >
        <span className="button-icon brand-icon" aria-hidden="true">
          <img className="linkedin-logo-icon" src={assetPath("/logos/linkedin.svg")} alt="" />
        </span>
        {labeled ? "LinkedIn" : null}
      </a>
      <a
        className="button button-outline"
        href="https://github.com/RodolfoRbl"
        target="_blank"
        rel="noreferrer"
        aria-label={labeled ? undefined : "Rodolfo on GitHub"}
      >
        <span className="button-icon brand-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.08c-3.1.67-3.76-1.31-3.76-1.31-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.59 1.21 3.22.92.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.12-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.12 2.96.71.78 1.14 1.78 1.14 3 0 4.29-2.61 5.24-5.1 5.52.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
          </svg>
        </span>
        {labeled ? "GitHub" : null}
      </a>
      <a
        className="button button-outline"
        href="https://www.instagram.com/rodolfo_robless/"
        target="_blank"
        rel="noreferrer"
        aria-label={labeled ? undefined : "Rodolfo on Instagram"}
      >
        <span className="button-icon brand-icon" aria-hidden="true">
          <InstagramIcon />
        </span>
        {labeled ? "Instagram" : null}
      </a>
    </div>
  );
}
