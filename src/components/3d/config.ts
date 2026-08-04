export interface NodeConfig {
  id: string;
  label: string;
  status: string;
  type: string;
}

export type NodePositions = Record<string, [number, number, number]>;

export const NODE_CONFIGS: NodeConfig[] = [
  { id: "lead", label: "LEAD", status: "Captured", type: "input" },
  { id: "ai", label: "AI AGENT", status: "Processing", type: "processor" },
  { id: "twilio", label: "TWILIO", status: "Active", type: "integration" },
  { id: "zapier", label: "ZAPIER", status: "Connected", type: "integration" },
  { id: "crm", label: "CRM", status: "Syncing", type: "system" },
  { id: "result", label: "RESULT", status: "Delivered", type: "output" },
];

export const DESKTOP_POSITIONS: NodePositions = {
  lead: [-4, 2.5, 1],
  ai: [-4, -1, 1.5],
  twilio: [-2.5, -3, 0],
  zapier: [2.5, 3, 0],
  crm: [3.5, 0.5, 1.5],
  result: [3, -2.5, 0.5],
};

export const FLOW_PATHS = [
  { from: "lead", to: "ai" },
  { from: "ai", to: "core" },
  { from: "lead", to: "core" },
  { from: "twilio", to: "core" },
  { from: "core", to: "zapier" },
  { from: "core", to: "crm" },
  { from: "zapier", to: "crm" },
  { from: "crm", to: "result" },
];

const MOBILE_ANGLES: { id: string; angleDeg: number }[] = [
  { id: "lead", angleDeg: 90 },
  { id: "zapier", angleDeg: 35 },
  { id: "crm", angleDeg: -10 },
  { id: "result", angleDeg: -90 },
  { id: "twilio", angleDeg: -145 },
  { id: "ai", angleDeg: 170 },
];

function computeMobilePositions(viewportWidth: number, canvasHeight: number): NodePositions {
  const containerWidth = Math.min(viewportWidth - 48, 600);
  const maxDim = Math.min(containerWidth, canvasHeight);
  const radius = Math.max(maxDim / 50, 4.5);

  const positions: NodePositions = {};
  for (const n of MOBILE_ANGLES) {
    const rad = (n.angleDeg * Math.PI) / 180;
    positions[n.id] = [radius * Math.cos(rad), radius * Math.sin(rad), radius * 0.04];
  }
  return positions;
}

function computeTabletPositions(factor = 1.3): NodePositions {
  const positions: NodePositions = {};
  for (const [id, pos] of Object.entries(DESKTOP_POSITIONS)) {
    positions[id] = [pos[0] * factor, pos[1] * factor, pos[2]];
  }
  return positions;
}

export function getResponsiveLayout(
  viewportWidth: number,
  canvasHeight: number
): {
  positions: NodePositions;
  cameraZ: number;
  fov: number;
  dpr: number;
  particleCount: number;
  isMobile: boolean;
  isTablet: boolean;
} {
  const isMobile = viewportWidth < 768;
  const isTablet = viewportWidth >= 768 && viewportWidth < 1024;

  let positions: NodePositions;
  let cameraZ: number;
  let fov: number;
  let dpr: number;
  let particleCount: number;

  if (isMobile) {
    positions = computeMobilePositions(viewportWidth, canvasHeight);
    cameraZ = 14;
    fov = 65;
    dpr = Math.min(window.devicePixelRatio, 1);
    particleCount = 8;
  } else if (isTablet) {
    positions = computeTabletPositions(1.3);
    cameraZ = 12;
    fov = 55;
    dpr = Math.min(window.devicePixelRatio, 1.5);
    particleCount = 25;
  } else {
    positions = { ...DESKTOP_POSITIONS };
    cameraZ = 10;
    fov = 50;
    dpr = Math.min(window.devicePixelRatio, 2);
    particleCount = 45;
  }

  return { positions, cameraZ, fov, dpr, particleCount, isMobile, isTablet };
}

export function getNodePos(id: string, positions?: NodePositions): [number, number, number] {
  if (id === "core") return [0, 0, 0];
  if (positions && positions[id]) return positions[id];
  if (DESKTOP_POSITIONS[id]) return DESKTOP_POSITIONS[id];
  return [0, 0, 0];
}
