"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { AnimationId } from "@/data/portfolio";

type Point = { x: number; y: number; z: number; phase: number };
type Edge = readonly [number, number];

function randomGenerator(initialSeed: number) {
  let seed = initialSeed;
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

function createPoints(type: AnimationId): Point[] {
  const random = randomGenerator(
    type === "nodes" ? 71 : type === "brain" ? 137 : type === "mesh" ? 211 : 313,
  );

  if (type === "waves") {
    const rows = 11;
    const columns = 30;
    return Array.from({ length: rows * columns }, (_, index) => {
      const row = Math.floor(index / columns);
      const column = index % columns;
      return {
        x: -1.6 + (column / (columns - 1)) * 3.2,
        y: -0.7 + (row / (rows - 1)) * 1.4,
        z: 0,
        phase: row * 0.33 + column * 0.07,
      };
    });
  }

  if (type === "mesh") {
    return Array.from({ length: 106 }, () => {
      const theta = random() * Math.PI * 2;
      const radius = Math.sqrt(random());
      return {
        x: Math.cos(theta) * radius * 1.48,
        y: Math.sin(theta) * radius * 0.88,
        z: 0,
        phase: random() * Math.PI * 2,
      };
    });
  }

  const count = type === "brain" ? 78 : 64;
  return Array.from({ length: count }, () => {
    const theta = random() * Math.PI * 2;
    const v = random() * 2 - 1;
    const radial = Math.sqrt(1 - v * v);
    const groove =
      type === "brain" ? 1 - 0.11 * Math.exp(-Math.pow(Math.cos(theta) * radial * 7, 2)) : 1;
    const lobe = type === "brain" ? 1 + 0.035 * Math.sin(theta * 8) * Math.cos(v * 10) : 1;
    return {
      x: Math.cos(theta) * radial * 1.02 * groove * lobe,
      y: v * 0.8 * lobe,
      z: Math.sin(theta) * radial * 0.55 * lobe,
      phase: random() * Math.PI * 2,
    };
  });
}

function createEdges(points: Point[], type: AnimationId): Edge[] {
  if (type === "waves") {
    const columns = 30;
    const rows = points.length / columns;
    const edges: Edge[] = [];
    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns - 1; column += 1) {
        const index = row * columns + column;
        edges.push([index, index + 1]);
        if (column % 4 === row % 4 && row < rows - 1) edges.push([index, index + columns]);
      }
    }
    return edges;
  }

  const edgeKeys = new Set<string>();
  points.forEach((point, index) => {
    points
      .map((candidate, candidateIndex) => ({
        candidateIndex,
        distance:
          Math.pow(point.x - candidate.x, 2) +
          Math.pow(point.y - candidate.y, 2) +
          Math.pow((point.z - candidate.z) * 0.8, 2),
      }))
      .filter((candidate) => candidate.candidateIndex !== index)
      .sort((left, right) => left.distance - right.distance)
      .slice(0, type === "brain" || type === "mesh" ? 3 : 2)
      .forEach(({ candidateIndex, distance }) => {
        if (distance < (type === "brain" ? 0.42 : type === "mesh" ? 0.36 : 0.58)) {
          const first = Math.min(index, candidateIndex);
          const second = Math.max(index, candidateIndex);
          edgeKeys.add(`${first}:${second}`);
        }
      });
  });
  return [...edgeKeys].map((key) => key.split(":").map(Number) as [number, number]);
}

function makeDynamicGeometry(pointCount: number) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(pointCount * 3);
  const attribute = new THREE.BufferAttribute(positions, 3);
  attribute.setUsage(THREE.DynamicDrawUsage);
  geometry.setAttribute("position", attribute);
  return { geometry, positions, attribute };
}

function AnimatedField({ type }: { type: AnimationId }) {
  const group = useRef<THREE.Group>(null);
  const points = useMemo(() => createPoints(type), [type]);
  const edges = useMemo(() => createEdges(points, type), [points, type]);
  const pulseEdges = useMemo(
    () => edges.filter((_, index) => index % 3 === 0).slice(0, 28),
    [edges],
  );
  const nodeBuffer = useMemo(() => makeDynamicGeometry(points.length), [points.length]);
  const edgeBuffer = useMemo(() => makeDynamicGeometry(edges.length * 2), [edges.length]);
  const pulseBuffer = useMemo(() => makeDynamicGeometry(pulseEdges.length), [pulseEdges.length]);

  useEffect(() => {
    return () => {
      nodeBuffer.geometry.dispose();
      edgeBuffer.geometry.dispose();
      pulseBuffer.geometry.dispose();
    };
  }, [edgeBuffer.geometry, nodeBuffer.geometry, pulseBuffer.geometry]);

  useFrame(({ clock, pointer }) => {
    const time = clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y += (pointer.x * 0.065 - group.current.rotation.y) * 0.025;
      group.current.rotation.x += (-pointer.y * 0.035 - group.current.rotation.x) * 0.025;
    }

    const coordinates = points.map((point) => {
      const wave = Math.sin(time * 0.52 + point.phase);
      const cursorDistance = Math.hypot(point.x - pointer.x * 1.3, point.y - pointer.y * 0.85);
      const cursorLift = type === "waves" || type === "mesh" ? Math.exp(-cursorDistance * 3) : 0;
      if (type === "mesh") {
        return [
          point.x,
          point.y,
          0.21 * Math.sin(point.x * 2.1 + time * 0.8) * Math.cos(point.y * 2.4 - time * 0.43) +
            wave * 0.05 +
            cursorLift * 0.22,
        ];
      }
      if (type === "waves") {
        return [
          point.x,
          point.y,
          0.19 * Math.sin(point.x * 2.5 + time * 0.75 + point.phase) +
            0.06 * Math.cos(point.y * 7.4 - time * 0.46) +
            cursorLift * 0.2,
        ];
      }
      return [
        point.x + Math.sin(time * 0.32 + point.phase) * 0.035,
        point.y + Math.cos(time * 0.27 + point.phase) * 0.03,
        point.z + wave * (type === "brain" ? 0.035 : 0.065),
      ];
    });

    coordinates.forEach(([x, y, z], index) => {
      const offset = index * 3;
      nodeBuffer.positions[offset] = x;
      nodeBuffer.positions[offset + 1] = y;
      nodeBuffer.positions[offset + 2] = z;
    });
    edges.forEach(([first, second], index) => {
      const firstPoint = coordinates[first];
      const secondPoint = coordinates[second];
      const offset = index * 6;
      edgeBuffer.positions.set(firstPoint, offset);
      edgeBuffer.positions.set(secondPoint, offset + 3);
    });
    pulseEdges.forEach(([first, second], index) => {
      const start = coordinates[first];
      const end = coordinates[second];
      const progress = (time * (type === "brain" ? 0.12 : 0.16) + index * 0.137) % 1;
      const eased = progress * progress * (3 - 2 * progress);
      const offset = index * 3;
      pulseBuffer.positions[offset] = THREE.MathUtils.lerp(start[0], end[0], eased);
      pulseBuffer.positions[offset + 1] = THREE.MathUtils.lerp(start[1], end[1], eased);
      pulseBuffer.positions[offset + 2] = THREE.MathUtils.lerp(start[2], end[2], eased);
    });

    nodeBuffer.attribute.needsUpdate = true;
    edgeBuffer.attribute.needsUpdate = true;
    pulseBuffer.attribute.needsUpdate = true;
    nodeBuffer.geometry.computeBoundingSphere();
    edgeBuffer.geometry.computeBoundingSphere();
    pulseBuffer.geometry.computeBoundingSphere();
  });

  const edgeOpacity = type === "brain" ? 0.46 : type === "mesh" ? 0.32 : 0.38;
  const edgeColor = type === "brain" ? "#68baff" : type === "mesh" ? "#58d3d1" : "#61cfc9";

  return (
    <group ref={group}>
      <lineSegments geometry={edgeBuffer.geometry}>
        <lineBasicMaterial color={edgeColor} transparent opacity={edgeOpacity} />
      </lineSegments>
      <points geometry={nodeBuffer.geometry}>
        <pointsMaterial
          color={type === "brain" ? "#9bcfff" : "#a7fff0"}
          size={type === "brain" ? 0.045 : 0.04}
          sizeAttenuation
          transparent
          opacity={0.86}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <points geometry={pulseBuffer.geometry}>
        <pointsMaterial
          color="#d2fff6"
          size={0.078}
          sizeAttenuation
          transparent
          opacity={0.94}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

function DataStoreCore() {
  const core = useRef<THREE.Group>(null);
  const cylinder = useMemo(() => new THREE.CylinderGeometry(0.34, 0.34, 0.42, 48, 1, true), []);
  const rimGeometry = useMemo(() => new THREE.TorusGeometry(0.34, 0.009, 6, 64), []);

  useFrame(({ clock }) => {
    if (core.current) core.current.rotation.y = Math.sin(clock.elapsedTime * 0.12) * 0.08;
  });

  useEffect(() => {
    return () => {
      cylinder.dispose();
      rimGeometry.dispose();
    };
  }, [cylinder, rimGeometry]);

  return (
    <group ref={core} position={[0, -0.02, 0.16]}>
      <mesh geometry={cylinder}>
        <meshBasicMaterial color="#5bdacc" transparent opacity={0.28} side={THREE.DoubleSide} />
      </mesh>
      {[-0.21, 0, 0.21].map((y) => (
        <mesh geometry={rimGeometry} key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#9af5e4" transparent opacity={0.88} />
        </mesh>
      ))}
      <mesh position={[-0.34, 0, 0]}>
        <sphereGeometry args={[0.018, 8, 8]} />
        <meshBasicMaterial color="#c3fff4" />
      </mesh>
      <mesh position={[0.34, 0, 0]}>
        <sphereGeometry args={[0.018, 8, 8]} />
        <meshBasicMaterial color="#c3fff4" />
      </mesh>
    </group>
  );
}

export function AnimationCanvas({
  type,
  visible,
  reducedMotion,
}: {
  type: AnimationId;
  visible: boolean;
  reducedMotion: boolean;
}) {
  const frameLoop = visible && !reducedMotion ? "always" : "demand";

  return (
    <Canvas
      aria-hidden="true"
      camera={{ position: [0, 0, 4.1], fov: 42 }}
      dpr={[1, 1.5]}
      frameloop={frameLoop}
      gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
      onCreated={({ gl }) => gl.setClearColor(new THREE.Color("#070a10"), 0)}
    >
      <ambientLight intensity={0.5} />
      <AnimatedField key={type} type={type} />
      <DataStoreCore />
    </Canvas>
  );
}
