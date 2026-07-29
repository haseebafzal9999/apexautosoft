"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { FLOW_PATHS, getNodePos, NodePositions } from "./config";

export default function ConnectionLines({
  positions,
}: {
  positions?: NodePositions;
}) {
  const lines = useMemo(() => {
    return FLOW_PATHS.map((path) => {
      const from = new THREE.Vector3(...getNodePos(path.from, positions));
      const to = new THREE.Vector3(...getNodePos(path.to, positions));

      const mid = new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5);
      const distance = from.distanceTo(to);
      const control = mid
        .clone()
        .add(new THREE.Vector3(0, distance * 0.2, distance * 0.1));

      const curve = new THREE.QuadraticBezierCurve3(from, control, to);
      const points = curve.getPoints(50);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      return geometry;
    });
  }, [positions]);

  return (
    <group>
      {lines.map((geom, i) => {
        const material = new THREE.LineBasicMaterial({
          color: "#182019",
          opacity: 0.15,
          transparent: true,
        });
        const lineObj = new THREE.Line(geom, material);
        return <primitive key={i} object={lineObj} />;
      })}
    </group>
  );
}
