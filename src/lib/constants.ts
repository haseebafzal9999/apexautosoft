import type { LucideIcon } from "lucide-react";
import {
  PhoneCall,
  MessageSquare,
  Bot,
  HeartPulse,
  Users,
  Workflow,
} from "lucide-react";

export const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Tools", href: "#tools" },
  { name: "Work", href: "#work" },
  { name: "About Us", href: "#about" },
  { name: "Contact Us", href: "#contact" },
];

export interface Tool {
  name: string;
  logo: string;
  desc: string;
  tag: string;
  invert?: boolean;
}

export const TOOLS: Tool[] = [
  {
    name: "Twilio",
    logo: "/logos/twilio.svg",
    desc: "Voice, SMS & WhatsApp communication APIs",
    tag: "Communication",
    invert: true,
  },
  {
    name: "n8n",
    logo: "/logos/n8n.svg",
    desc: "Visual workflow automation engine",
    tag: "Automation",
    invert: true,
  },
  {
    name: "Systeme.io",
    logo: "/logos/systeme-io.svg",
    desc: "Funnels, email & membership platform",
    tag: "Marketing",
  },
  {
    name: "ElevenLabs",
    logo: "/logos/elevenlabs.svg",
    desc: "AI voice generation & voice agents",
    tag: "AI Voice",
    invert: true,
  },
  {
    name: "OpenAI",
    logo: "/logos/openai.svg",
    desc: "GPT models & intelligent AI capabilities",
    tag: "AI",
    invert: true,
  },
  {
    name: "Next.js",
    logo: "/logos/nextdotjs.svg",
    desc: "Production-grade React framework",
    tag: "Frontend",
    invert: true,
  },
  {
    name: "FastAPI",
    logo: "/logos/fastapi.svg",
    desc: "High-performance Python APIs",
    tag: "Backend",
    invert: true,
  },
  {
    name: "PostgreSQL",
    logo: "/logos/postgresql.svg",
    desc: "Reliable relational databases",
    tag: "Database",
    invert: true,
  },
  {
    name: "Claude",
    logo: "/logos/claude.svg",
    desc: "Anthropic's assistant & reasoning AI",
    tag: "AI",
    invert: true,
  },
  {
    name: "Make",
    logo: "/logos/make.svg",
    desc: "Visual scenario-based integrations",
    tag: "Automation",
    invert: true,
  },
  {
    name: "Stripe",
    logo: "/logos/stripe.svg",
    desc: "Payments, billing & financial APIs",
    tag: "Payments",
    invert: true,
  },
  {
    name: "Gemini",
    logo: "/logos/googlegemini.svg",
    desc: "Google's multimodal AI models",
    tag: "AI",
    invert: true,
  },
];

export type SolutionLabel = "AI" | "Automation" | "Integration";

export interface Solution {
  id: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  label: SolutionLabel;
}

export const SOLUTIONS: Solution[] = [
  {
    id: "ai-voice",
    icon: PhoneCall,
    title: "AI Voice & Call Automation",
    desc: "Automated outbound and inbound calls with AI voice agents, lead qualification, appointment booking, follow-ups, and call handling with minimal human intervention.",
    label: "AI",
  },
  {
    id: "communication",
    icon: MessageSquare,
    title: "Automated Communication Systems",
    desc: "SMS, WhatsApp, and voice notifications with customer communication workflows, reminders, alerts, and automated follow-ups across every channel.",
    label: "Automation",
  },
  {
    id: "ai-support",
    icon: Bot,
    title: "AI Customer Support Agents",
    desc: "AI-powered agents that handle customer questions, qualify leads, route conversations, and automate repetitive support workflows around the clock.",
    label: "AI",
  },
  {
    id: "healthcare",
    icon: HeartPulse,
    title: "Healthcare Automation",
    desc: "Automated patient communication, appointment workflows, reminders, follow-ups, and intake processes — software automation for healthcare businesses.",
    label: "Automation",
  },
  {
    id: "crm-leads",
    icon: Users,
    title: "CRM & Lead Automation",
    desc: "Lead capture, qualification, routing, CRM updates, follow-up sequences, and automated sales workflows that keep every deal moving.",
    label: "AI",
  },
  {
    id: "workflow",
    icon: Workflow,
    title: "Business Workflow Automation",
    desc: "Connect different business systems and automate repetitive processes using n8n, Zapier, APIs, and custom applications.",
    label: "Integration",
  },
];

export const WHY_US = [
  {
    title: "RESULTS-DRIVEN SOLUTIONS",
    desc: "Every system is designed around measurable business outcomes.",
  },
  {
    title: "MODERN TECHNOLOGY",
    desc: "Modern APIs, AI, automation and full-stack development.",
  },
  {
    title: "END-TO-END SUPPORT",
    desc: "From planning to deployment and ongoing improvements.",
  },
  {
    title: "TIME & COST EFFICIENCY",
    desc: "Automation reduces repetitive work and operational overhead.",
  },
  {
    title: "CLEAR COMMUNICATION",
    desc: "Transparent development and clear project progress.",
  },
];

export const PROCESS = [
  {
    num: "01",
    title: "DISCOVER",
    desc: "Understand the business bottleneck.",
  },
  {
    num: "02",
    title: "DESIGN",
    desc: "Plan the user experience and technical architecture.",
  },
  {
    num: "03",
    title: "BUILD",
    desc: "Develop the web application.",
  },
  {
    num: "04",
    title: "AUTOMATE",
    desc: "Connect APIs, AI and business tools.",
  },
  {
    num: "05",
    title: "LAUNCH & OPTIMIZE",
    desc: "Deploy, monitor and continuously improve.",
  },
];
