import Image from "next/image";
import { SocialLinks } from "@/components/social-links";
import { assetPath } from "@/lib/assets";

export function HeroSection() {
  return (
    <section className="hero hero-showcase hero--neuron" id="home">
      <div className="hero-scene" aria-hidden="true">
        <picture className="hero-scene-art">
          <source
            media="(max-width: 700px)"
            srcSet={assetPath("/images/hero-dendrite-mobile.png")}
          />
          <Image
            src={assetPath("/images/hero-dendrite-desktop.png")}
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-art-image"
          />
        </picture>
        <div className="hero-scene-glow" />
      </div>

      <div className="hero-copy hero-copy--showcase">
        <p className="eyebrow">
          <span className="status-dot" /> AI ENGINEER <i>·</i> DATA SCIENTIST
        </p>
        <h1>
          Rodolfo <span>Robles</span>
        </h1>
        <p className="hero-role">
          AI Engineer <i>·</i> Data Scientist <i>·</i> Data Engineer
        </p>
        <p className="hero-intro">
          I started in actuarial and payroll roles, moved through reinsurance and banking, and now
          build AI and data platforms at Ford. My work brings machine learning, data engineering,
          cloud, and optimization together. I enjoy using data and AI to make complex systems easier
          to understand and decisions easier to make.
        </p>
        <div className="hero-actions">
          <a className="button button-primary hero-cta" href="#contact">
            Let’s Connect!
          </a>
        </div>
        <p className="location-note">
          <span>Born in Mexico City · 1997</span>
          <span>Open to international opportunities</span>
        </p>
        <SocialLinks />
      </div>

      <div className="hero-bottom-fade" aria-hidden="true" />

      <a className="scroll-cue" href="#journey">
        <span /> Scroll to explore
      </a>
    </section>
  );
}
