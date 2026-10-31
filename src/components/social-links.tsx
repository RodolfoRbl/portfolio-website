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
