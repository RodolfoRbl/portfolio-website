"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { animationOptions, type AnimationId } from "@/data/portfolio";

const AnimationCanvas = dynamic(
  () => import("@/components/hero-animation-canvas").then((module) => module.AnimationCanvas),
  { ssr: false, loading: () => null },
);

export function HeroAnimationSelector() {
  const [selected, setSelected] = useState<AnimationId>("mesh");
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const section = document.querySelector(".hero-visual");
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

  const active = animationOptions.find((option) => option.id === selected)!;

  return (
    <div className="hero-visual animation-visual">
      <div className="animation-wash" aria-hidden="true" />
      <AnimationCanvas type={selected} visible={visible} reducedMotion={reducedMotion} />
      <div className="animation-caption" aria-live="polite">
        <span className="animation-live-dot" />
        <span>{active.label}</span>
      </div>
      <div className="animation-picker" role="group" aria-label="Choose the hero animation">
        {animationOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            className={selected === option.id ? "is-active" : ""}
            aria-pressed={selected === option.id}
            aria-label={`${option.number}: ${option.label}. ${option.detail}`}
            title={option.detail}
            onClick={() => setSelected(option.id)}
          >
            <span>{option.number}</span>
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
