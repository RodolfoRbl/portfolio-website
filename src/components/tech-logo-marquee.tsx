"use client";

import { useEffect, useRef } from "react";
import type { PointerEvent } from "react";
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
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef<{ pointerId: number; startX: number; scrollLeft: number } | null>(null);
  const paused = useRef(false);
  const hovering = useRef(false);
  const offset = useRef(0);

  useEffect(() => {
    const element = viewport.current;
    const movingTrack = track.current;
    if (!element || !movingTrack) return;

    let visible = false;
    let frame = 0;
    let previousTime = 0;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(element);

    const animate = (time: number) => {
      const loopWidth = movingTrack.children[0]?.getBoundingClientRect().width ?? 0;
      if (visible && !paused.current && !drag.current && loopWidth > 0) {
        if (previousTime) offset.current += ((time - previousTime) * 18) / 1000;
        if (offset.current >= loopWidth) offset.current -= loopWidth;
        movingTrack.style.transform = `translate3d(${-offset.current}px, 0, 0)`;
      }
      previousTime = time;
      frame = window.requestAnimationFrame(animate);
    };
    frame = window.requestAnimationFrame(animate);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, []);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const element = event.currentTarget;
    drag.current = { pointerId: event.pointerId, startX: event.clientX, scrollLeft: offset.current };
    paused.current = true;
    element.setPointerCapture(event.pointerId);
    element.classList.add("is-dragging");
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (drag.current?.pointerId !== event.pointerId) return;
    event.preventDefault();
    const movingTrack = track.current;
    const loopWidth = movingTrack?.children[0]?.getBoundingClientRect().width ?? 0;
    if (!movingTrack || loopWidth <= 0) return;
    offset.current = drag.current.scrollLeft - (event.clientX - drag.current.startX);
    offset.current = ((offset.current % loopWidth) + loopWidth) % loopWidth;
    movingTrack.style.transform = `translate3d(${-offset.current}px, 0, 0)`;
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (drag.current?.pointerId !== event.pointerId) return;
    drag.current = null;
    paused.current = hovering.current;
    event.currentTarget.classList.remove("is-dragging");
  };

  return (
    <div className="technology-marquee-wrap reveal">
      <div
        className="technology-marquee"
        ref={viewport}
        role="group"
        aria-label="Selected technology logos. Drag or swipe to explore."
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") {
            hovering.current = true;
            paused.current = true;
          }
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") {
            hovering.current = false;
            paused.current = Boolean(drag.current);
          }
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div className="technology-marquee-track" ref={track}>
          <TechnologyGroup />
          <TechnologyGroup decorative />
        </div>
      </div>
    </div>
  );
}
