export const NODE_DATA = [
  { id: "lead", label: "LEAD", status: "Captured", pos: [-4, 2.5, 1], type: "input" },
  { id: "ai", label: "AI AGENT", status: "Processing", pos: [-4, -1, 1.5], type: "processor" },
  { id: "twilio", label: "TWILIO", status: "Active", pos: [-2.5, -3, 0], type: "integration" },
  { id: "zapier", label: "ZAPIER", status: "Connected", pos: [2.5, 3, 0], type: "integration" },
  { id: "crm", label: "CRM", status: "Syncing", pos: [3.5, 0.5, 1.5], type: "system" },
  { id: "result", label: "RESULT", status: "Delivered", pos: [3, -2.5, 0.5], type: "output" },
];

// Define paths for data particles
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

export function getNodePos(id: string): [number, number, number] {
  if (id === "core") return [0, 0, 0];
  const node = NODE_DATA.find((n) => n.id === id);
  return node ? (node.pos as [number, number, number]) : [0, 0, 0];
}
