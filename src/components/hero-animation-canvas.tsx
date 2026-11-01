"use client";

import { useEffect, useRef } from "react";

type NeuralCanvasProps = { visible: boolean; reducedMotion: boolean };
type Node = { x: number; y: number; phase: number; depth: number };
type Edge = readonly [number, number, number];

function seededRandom(initialSeed: number) {
  let seed = initialSeed;
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

export function NeuralNetworkCanvas({ visible, reducedMotion }: NeuralCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !host || !context) return;

    const random = seededRandom(137);
    const nodes: Node[] = Array.from({ length: 38 }, () => ({
      x: 0.045 + random() * 0.91,
      y: 0.07 + random() * 0.86,
      phase: random() * Math.PI * 2,
      depth: 0.48 + random() * 0.52,
    }));
    const edgeKeys = new Set<string>();
    nodes.forEach((a, index) => {
      nodes
        .map((b, neighbor) => ({ neighbor, distance: Math.hypot(a.x - b.x, a.y - b.y) }))
        .filter((candidate) => candidate.neighbor !== index)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3)
        .forEach(({ neighbor, distance }) => {
          if (distance < 0.34) edgeKeys.add(`${Math.min(index, neighbor)}:${Math.max(index, neighbor)}`);
        });
    });
    const edges: Edge[] = [...edgeKeys].map((key) => {
      const [from, to] = key.split(":").map(Number);
      return [from, to, random() * Math.PI * 2];
    });

    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let elapsed = 0;
    let frame = 0;
    let previous = 0;
    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;
    let active = visible;
    let disposed = false;

    const draw = (timeMs: number) => {
      if (!width || !height) return;
      const time = timeMs / 1000;
      const areaLeft = width * 0.47;
      const areaWidth = width * 0.53;
      const cx = areaLeft + areaWidth * 0.5;
      const cy = height * 0.51;
      const unit = Math.min(areaWidth, height) * 0.96;
      context.clearRect(0, 0, width, height);

      if (!reducedMotion) {
        pointerX += (targetX - pointerX) * 0.035;
        pointerY += (targetY - pointerY) * 0.035;
      }

      const points = nodes.map((node) => ({
        x: areaLeft + node.x * areaWidth + Math.sin(time * 0.38 + node.phase) * 11 + pointerX * 7 * node.depth,
        y: node.y * height + Math.cos(time * 0.31 + node.phase) * 6 + pointerY * 5 * node.depth,
        radius: 1.5 + node.depth * 1.8,
      }));

      const haze = context.createRadialGradient(cx, cy, 8, cx, cy, unit * 0.49);
      haze.addColorStop(0, "rgba(42,154,166,.12)");
      haze.addColorStop(0.48, "rgba(30,108,152,.06)");
      haze.addColorStop(1, "rgba(7,10,16,0)");
      context.fillStyle = haze;
      context.fillRect(areaLeft, 0, areaWidth, height);

      edges.forEach(([from, to, bendPhase], index) => {
        const a = points[from];
        const b = points[to];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const length = Math.hypot(dx, dy) || 1;
        const bend = Math.sin(time * 0.34 + bendPhase) * Math.min(28, length * 0.26);
        const qx = (a.x + b.x) * 0.5 - (dy / length) * bend;
        const qy = (a.y + b.y) * 0.5 + (dx / length) * bend;
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.quadraticCurveTo(qx, qy, b.x, b.y);
        context.strokeStyle = `rgba(91,205,199,${0.055 + nodes[from].depth * 0.075})`;
        context.lineWidth = 0.58;
        context.stroke();

        const phase = (time * 0.12 + index * 0.067) % 1;
        const progress = phase < 0.5 ? phase * 2 : (1 - phase) * 2;
        const inverse = 1 - progress;
        const x = inverse * inverse * a.x + 2 * inverse * progress * qx + progress * progress * b.x;
        const y = inverse * inverse * a.y + 2 * inverse * progress * qy + progress * progress * b.y;
        context.beginPath();
        context.arc(x, y, 1, 0, Math.PI * 2);
        context.fillStyle = "rgba(169,255,237,.76)";
        context.shadowColor = "#56dacc";
        context.shadowBlur = 6;
        context.fill();
        context.shadowBlur = 0;
      });

      points.forEach((point, index) => {
        const activation = 0.5 + 0.5 * Math.sin(time * (0.55 + (index % 4) * 0.09) + nodes[index].phase);
        context.beginPath();
        context.arc(point.x, point.y, point.radius + activation * 1.1, 0, Math.PI * 2);
        context.fillStyle = `rgba(111,231,216,${0.36 + activation * 0.5})`;
        context.shadowColor = index % 3 === 0 ? "#8cdaff" : "#59d5cb";
        context.shadowBlur = 4 + activation * 9;
        context.fill();
        context.shadowBlur = 0;
      });

      const orbits = [
        { angle: time * 0.065, rx: unit * 0.42, ry: unit * 0.18, color: "rgba(91,221,207,.47)", phase: 0.4 },
        { angle: time * 0.065 + 0.785, rx: unit * 0.43, ry: unit * 0.155, color: "rgba(95,178,232,.39)", phase: 2.3 },
        { angle: time * 0.065 + 1.571, rx: unit * 0.42, ry: unit * 0.14, color: "rgba(151,232,221,.34)", phase: 4.5 },
        { angle: time * 0.065 + 2.356, rx: unit * 0.46, ry: unit * 0.12, color: "rgba(93,167,219,.3)", phase: 5.2 },
      ];
      orbits.forEach((orbit, index) => {
        context.save();
        context.translate(cx, cy);
        context.rotate(orbit.angle);
        context.beginPath();
        context.ellipse(0, 0, orbit.rx, orbit.ry, 0, 0, Math.PI * 2);
        context.strokeStyle = orbit.color;
        context.lineWidth = 1.05;
        context.stroke();
        const angle = time * (index === 1 ? -0.34 : 0.28) + orbit.phase;
        const x = Math.cos(angle) * orbit.rx;
        const y = Math.sin(angle) * orbit.ry;
        const glow = context.createRadialGradient(x, y, 0, x, y, 15);
        glow.addColorStop(0, index === 1 ? "rgba(160,225,255,.95)" : "rgba(159,255,233,.98)");
        glow.addColorStop(1, "rgba(91,213,202,0)");
        context.fillStyle = glow;
        context.beginPath();
        context.arc(x, y, 15, 0, Math.PI * 2);
        context.fill();
        context.beginPath();
        context.arc(x, y, 3.1, 0, Math.PI * 2);
        context.fillStyle = "#c5fff2";
        context.shadowColor = "#61d9ce";
        context.shadowBlur = 12;
        context.fill();
        context.shadowBlur = 0;
        context.restore();
      });

      const radiusX = Math.min(areaWidth * 0.115, 76);
      const radiusY = Math.min(height * 0.105, 54);
      const shell = radiusY * 0.58;
      const top = cy - shell;
      const bottom = cy + shell;
      const body = context.createLinearGradient(cx - radiusX, cy, cx + radiusX, cy);
      body.addColorStop(0, "rgba(10,24,35,.97)");
      body.addColorStop(0.5, "rgba(17,42,54,.98)");
      body.addColorStop(1, "rgba(8,20,30,.97)");
      context.beginPath();
      context.moveTo(cx - radiusX, top);
      context.lineTo(cx - radiusX, bottom);
      context.ellipse(cx, bottom, radiusX, radiusY * 0.32, 0, Math.PI, 0, true);
      context.lineTo(cx + radiusX, top);
      context.closePath();
      context.fillStyle = body;
      context.fill();
      context.beginPath();
      context.moveTo(cx - radiusX, top);
      context.lineTo(cx - radiusX, bottom);
      context.moveTo(cx + radiusX, top);
      context.lineTo(cx + radiusX, bottom);
      context.strokeStyle = "rgba(113,229,218,.8)";
      context.lineWidth = 1.1;
      context.stroke();
      const ringRadiusY = radiusY * 0.32 * (1 + 0.012 * Math.sin(time * 0.72));
      [top, cy, bottom].forEach((y, index) => {
        context.beginPath();
        context.ellipse(cx, y, radiusX, ringRadiusY, 0, 0, Math.PI * 2);
        context.strokeStyle = index === 1 ? "rgba(153,238,226,.9)" : "rgba(98,209,205,.72)";
        context.lineWidth = index === 1 ? 1.1 : 1;
        context.stroke();
      });
      context.fillStyle = "rgba(194,242,239,.88)";
      context.font = "9px DM Mono, monospace";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText("DATA", cx, cy + 1);
    };

    const resize = () => {
      const bounds = host.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      draw(elapsed);
    };
    const loop = (now: number) => {
      frame = 0;
      if (disposed || !active || document.hidden) return;
      if (now - previous < 32) {
        frame = requestAnimationFrame(loop);
        return;
      }
      previous = now;
      elapsed = now;
      draw(now);
      if (!reducedMotion) frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!frame && active && !document.hidden && !reducedMotion) frame = requestAnimationFrame(loop);
    };
    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
      if (active) start();
      else if (frame) cancelAnimationFrame(frame);
      if (!active) frame = 0;
    });
    observer.observe(host);
    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotion || event.pointerType !== "mouse") return;
      const bounds = host.getBoundingClientRect();
      targetX = (event.clientX - bounds.left) / bounds.width - 0.5;
      targetY = (event.clientY - bounds.top) / bounds.height - 0.5;
    };
    const onPointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };
    const onVisibilityChange = () => {
      if (document.hidden && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else start();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    host.addEventListener("pointermove", onPointerMove);
    host.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);
    resize();
    if (reducedMotion) draw(0);
    else start();

    return () => {
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [reducedMotion, visible]);

  return <canvas ref={canvasRef} aria-hidden="true" />;
}
