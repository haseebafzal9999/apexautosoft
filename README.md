
  <div align="center">
    <h1>ApexAutosoft</h1>
    <p><strong>Automation that moves business forward.</strong></p>
    <p>
      <a href="#-overview">Overview</a> •
      <a href="#-services">Services</a> •
      <a href="#-projects">Projects</a> •
      <a href="#-tech-stack">Tech Stack</a> •
      <a href="#-getting-started">Getting Started</a>
    </p>
    <br>
  </div>

---

## Overview

**ApexAutosoft** builds intelligent automation systems, AI agents, custom software applications, and business workflows. We help businesses eliminate manual work, streamline operations, and scale efficiently by connecting modern technologies into reliable, event-driven automation pipelines.

From Twilio-powered communication platforms and Zapier workflow automations to AI-driven lead scoring, custom web applications, and Systeme.io funnel setups — every solution is designed around measurable business outcomes.

---

## Services

| # | Service | Description |
|---|---------|-------------|
| 01 | **Custom Web Applications** | Tailored web applications built with modern technologies to solve unique business challenges. |
| 02 | **Twilio Integrations** | Voice calls, SMS notifications, WhatsApp messaging, IVR systems and automated communication workflows. |
| 03 | **Automation & Integrations** | Zapier automations, Systeme.io setups and custom workflows that connect tools and eliminate manual work. |
| 04 | **AI Agents & Intelligent Systems** | Smart AI agents for customer support, lead qualification, data processing and business workflows. |
| 05 | **Systeme.io & Funnel Automation** | Sales funnels, email marketing automation, membership systems and CRM setups. |
| 06 | **API & Business Integrations** | Connect existing software systems and automate data movement between them. |

---

## Projects

### ConnectHub Communication Platform
*Twilio Automation — DEMO*

A centralized customer communication platform combining voice calls, SMS conversations, and CRM-style customer management into a single modern interface. Built with **Twilio**, **ASP.NET Core**, **React**, and **PostgreSQL**, it demonstrates how businesses can manage all customer interactions from one unified dashboard with real-time analytics, team performance monitoring, and complete communication history.

**Technologies:** Twilio Voice API, Twilio SMS API, ASP.NET Core, C#, Entity Framework Core, React, PostgreSQL, Recharts

### SMS Automation for Membership Platform
*Zapier Automation — DEMO*

A workflow automation system that automates the complete member communication lifecycle — from onboarding and SMS engagement to weekly content delivery and cancellation handling. Uses **Systeme.io**, **Zapier**, **Twilio**, and **Google Sheets** to replace repetitive manual operations with reliable event-driven workflows.

**Technologies:** Systeme.io, Zapier, Twilio SMS API, Google Sheets, Webhooks

### Flowbase Automation Suite
*AI + Business Automation — DEMO*

An AI-powered workflow automation platform using **n8n** as the core engine to orchestrate lead scoring, support ticket triage, payment follow-ups, account health monitoring, and error alerting — all connected to **OpenAI**, **Google Sheets**, and **Slack**. Demonstrates how repetitive business operations can be transformed into intelligent, automated workflows.

**Technologies:** n8n, OpenAI API, React, Tailwind CSS, Google Sheets, Slack, Docker, PostgreSQL

### School Management System
*Custom Web Application — DEMO*

A comprehensive educational administration platform digitizing school operations — from student admissions, attendance, timetables, and examinations to fee management, payroll, and role-based access. Built with **ASP.NET Core**, **React**, and **PostgreSQL** with JWT-secured role-based access for administrators, principals, teachers, and staff.

**Technologies:** ASP.NET Core, C#, Entity Framework Core, React, PostgreSQL, JWT Authentication

### SentriX AI
*AI + Business Automation — DEMO*

A smart security and surveillance platform designed to modernize physical security operations through AI-powered video monitoring, intelligent incident management, security-zone monitoring, attendance integration, notifications, analytics, and an AI security copilot. Built with **Next.js**, **FastAPI**, **PostgreSQL**, and **WebSockets**.

**Technologies:** React, Next.js, TypeScript, Tailwind CSS, FastAPI, PostgreSQL, WebSockets, AI/Computer Vision

---

## Tech Stack

**Frontend**
- [Next.js](https://nextjs.org/) 14.2 (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 3.4
- [Framer Motion](https://www.framer.com/motion/) 12
- [GSAP](https://gsap.com/) 3.15
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) / Three.js

**Tooling**
- ESLint (Next.js config)
- PostCSS
- Playwright (testing)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd apexautosoft

# Install dependencies
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

## Project Structure

```
apexautosoft/
├── src/
│   ├── app/               # Next.js App Router pages and layout
│   │   ├── globals.css
│   │   ├── layout.tsx      # Root layout with metadata
│   │   └── page.tsx        # Main landing page
│   ├── components/         # React components
│   │   ├── 3d/             # Three.js / R3F components
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Projects.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   └── lib/
│       ├── constants.ts    # Business info and content
│       └── projects.ts     # Project data definitions
├── public/                 # Static assets (images, videos)
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

<div align="center">
  <br>
  <p>
    <a href="mailto:hello@apexautosoft.com">hello@apexautosoft.com</a>
  </p>
  <p>
    Built with Next.js &middot; Deployed on Vercel
  </p>
  <br>
</div>
