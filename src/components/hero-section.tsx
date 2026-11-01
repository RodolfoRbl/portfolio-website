"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { SocialLinks } from "@/components/social-links";

const NeuralNetworkCanvas = dynamic(
  () => import("@/components/hero-animation-canvas").then((module) => module.NeuralNetworkCanvas),
  { ssr: false, loading: () => null },
);

export function HeroSection() {
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const section = document.querySelector(".hero-showcase");
    const visibility = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (section) visibility.observe(section);
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(motion.matches);
    updateMotion();
    motion.addEventListener("change", updateMotion);
    return () => {
      visibility.disconnect();
      motion.removeEventListener("change", updateMotion);
    };
  }, []);

  return (
    <section className="hero hero-showcase hero--neuron" id="home">
      <div className="hero-scene" aria-hidden="true">
        <div className="hero-scene-glow" />
        <NeuralNetworkCanvas visible={visible} reducedMotion={reducedMotion} />
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
          I enjoy using data and AI to make complex systems easier to understand and decisions
          easier to make.
        </p>
        <div className="hero-actions">
          <a className="button button-primary hero-cta" href="#contact">
            Let’s Connect!
          </a>
        </div>
        <p className="location-note">
          <span>Born in Mexico City</span>
          <span>Open to international opportunities</span>
        </p>
        <SocialLinks />
      </div>

      <a className="scroll-cue" href="#journey">
        <span /> Scroll to explore
      </a>
    </section>
  );
}
