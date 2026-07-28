export type ServiceType = "twilio" | "zapier" | "ai-agents" | "systeme" | "web-app" | "ai-automation";

export interface Project {
  id: string;
  title: string;
  category: string;
  serviceType: ServiceType;
  status: "DEMO" | "IN DEVELOPMENT" | "LAUNCHED" | "MAINTENANCE";
  shortDescription: string;
  fullDescription?: string;
  technologies: string[];
  features: string[];
  results: string[];
  image?: string;
  video?: string;
  liveUrl?: string;
  caseStudyUrl?: string;
}

export const CATEGORY_LABELS: Record<string, string> = {
  "Twilio Automation": "TWILIO",
  "Zapier Automation": "ZAPIER",
  "AI Agents": "AI AGENTS",
  "Systeme.io Automation": "SYSTEME.IO",
  "Custom Web Applications": "WEB APPS",
  "AI + Business Automation": "AI + AUTOMATION",
};

export const CATEGORY_ORDER = [
  "Twilio Automation",
  "Zapier Automation",
  "AI Agents",
  "Systeme.io Automation",
  "Custom Web Applications",
  "AI + Business Automation",
];

export const PROJECTS: Project[] = [
  // === Twilio Automation (1) ===
  {
    id: "twilio-project-01",
    title: "Twilio Automation Project",
    category: "Twilio Automation",
    serviceType: "twilio",
    status: "DEMO",
    shortDescription: "Project description will be added soon.",
    technologies: [],
    features: [],
    results: [],
  },

  // === Zapier Automation (1) ===
  {
    id: "zapier-project-01",
    title: "Zapier Automation Project",
    category: "Zapier Automation",
    serviceType: "zapier",
    status: "DEMO",
    shortDescription: "Project description will be added soon.",
    technologies: [],
    features: [],
    results: [],
  },

  // === AI Agents (1) ===
  {
    id: "ai-agent-project-01",
    title: "AI Agent Project",
    category: "AI Agents",
    serviceType: "ai-agents",
    status: "DEMO",
    shortDescription: "Project description will be added soon.",
    technologies: [],
    features: [],
    results: [],
  },

  // === Systeme.io Automation (1) ===
  {
    id: "systeme-project-01",
    title: "Systeme.io Automation Project",
    category: "Systeme.io Automation",
    serviceType: "systeme",
    status: "DEMO",
    shortDescription: "Project description will be added soon.",
    technologies: [],
    features: [],
    results: [],
  },

  // === Custom Web Applications (1) ===
  {
    id: "webapp-project-01",
    title: "Custom Web Application Project",
    category: "Custom Web Applications",
    serviceType: "web-app",
    status: "DEMO",
    shortDescription: "Project description will be added soon.",
    technologies: [],
    features: [],
    results: [],
  },

  // === SentriX AI ===
  {
    id: "sentrix-ai",
    title: "SentriX AI",
    category: "AI + Business Automation",
    serviceType: "ai-automation",
    status: "DEMO",
    shortDescription: "SentriX AI is a smart security and surveillance platform designed to modernize physical security operations through AI-powered video monitoring, intelligent incident management, security-zone monitoring, attendance integration, notifications, analytics, and an AI security copilot.",
    fullDescription: "SentriX AI is an AI-powered security and surveillance management platform designed to help organizations monitor, analyze, and manage physical security operations from a centralized interface.\n\nThe platform combines intelligent video surveillance with security management workflows, enabling organizations to monitor cameras, manage security zones, handle incidents, receive notifications, analyze security activity, and integrate AI-powered capabilities into their existing security infrastructure.\n\nSentriX AI is designed around a modular architecture so that existing systems such as employee management and attendance infrastructure can work alongside the security platform through API-based integrations.\n\nThe platform includes live monitoring, AI-assisted security workflows, face-recognition attendance integration, security-zone integration, incident management, notifications, reports and analytics, role-based access control, audit logging, system configuration, and an AI Security Copilot.",
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
      "WebSockets",
      "REST APIs",
      "HLS / WebRTC",
      "Pydantic",
      "AI / Computer Vision",
    ],
    features: [
      "AI-powered video surveillance",
      "Centralized live camera monitoring",
      "Camera and camera-group management",
      "Face recognition attendance integration",
      "Security zone monitoring",
      "Incident management",
      "Security notifications",
      "Security reports and analytics",
      "AI Security Copilot",
      "Role-based access control",
      "Audit logs",
      "System settings and configuration",
      "API-based integration with existing EMS infrastructure",
      "Responsive enterprise security dashboard",
    ],
    results: [],
    image: "/projects/sentrix-ai.webp",
    video: "/videos/sentrix-ai-demo.mp4",
    liveUrl: "",
    caseStudyUrl: "",
  },

  // === AI + Business Automation (extra for View More test) ===
  {
    id: "ai-automation-project-01",
    title: "AI + Business Automation Project",
    category: "AI + Business Automation",
    serviceType: "ai-automation",
    status: "DEMO",
    shortDescription: "Project description will be added soon.",
    technologies: [],
    features: [],
    results: [],
  },
];

export function getProjectCategories(): string[] {
  const cats = new Set(PROJECTS.map((p) => p.category));
  return CATEGORY_ORDER.filter((c) => cats.has(c));
}
