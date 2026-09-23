export type Project = {
  id: string;
  title: string;
  context: string;
  category: "work" | "personal";
  problem: string;
  decision: string;
  architecture: string[];
  outcome: string;
  metrics: { label: string; value: string }[];
  stack: string[];
  repoUrl?: string;
  proprietary?: boolean;
};

export type ExperienceEntry = {
  period: string;
  role: string;
  company: string;
  summary: string;
  shipped?: { title: string; did: string }[];
  highlights?: string[];
};

export const site = {
  name: "Pratik Keraba Kumbhar",
  title: ".NET Backend Developer",
  pageTitle: "Pratik Kumbhar | Backend Developer",
  statement:
    "Backend developer working on ASP.NET Web APIs, SQL Server, and REST integrations across .NET Framework and Core. Also experienced with full-stack development using the MERN stack.",
  location: "Kolhapur, Maharashtra, India",
  contact: {
    email: "pratikkumbhar008@gmail.com",
    linkedin: "https://www.linkedin.com/in/pratik-kumbhar-08b216246",
    github: "https://github.com/Pratik5357",
  },
};

export const projects: Project[] = [
  {
    id: "ethix-portal",
    title: "Ethix Portal",
    context: "Personal project · IEC research ethics · MERN",
    category: "personal",
    problem:
      "IEC proposals are long forms — investigators, consent sections, checklists, attachments — and multiple people touch each one before it gets approved. Spreadsheets and email threads weren't cutting it.",
    decision:
      "Full-stack portal: four roles (researcher, reviewer, scrutiny, admin), a multi-step wizard with save-as-draft, JWT on Express routes, and a MongoDB schema that tracks eight explicit states from draft through approved or rejected.",
    architecture: [
      "React (Vite) SPA → Express REST API",
      "JWT auth + role middleware per route",
      "MongoDB: User and Proposal collections",
      "Multer uploads → documents on proposal record",
      "Role-specific dashboards (researcher → reviewer → admin)",
    ],
    outcome:
      "Researchers submit and track proposals; admins assign reviewers; scrutiny and reviewer roles leave comments on decisions. Source is on GitHub if you want to dig into the status machine or auth middleware.",
    metrics: [
      { label: "Roles", value: "4" },
      { label: "Proposal states", value: "8" },
      { label: "Form sections", value: "5+" },
    ],
    stack: ["React", "Express", "Node.js", "MongoDB", "JWT"],
    repoUrl: "https://github.com/Pratik5357/EthixPortal",
  },
];

export const techStack = {
  core: [
    {
      name: "ASP.NET Core Web API",
      depth: "Where I spend most of my time — endpoints, services, shipping features",
    },
    {
      name: "OWIN .NET Web API",
      depth: "Older portal host; Zoho and RingCentral integrations both sit here",
    },
    {
      name: ".NET Framework / .NET Core",
      depth: "Day-to-day runtime across the codebases I'm on",
    },
    {
      name: "C#",
      depth: "Service layers, regex parsing, async I/O, HTTP clients to third parties",
    },
    {
      name: "SQL Server",
      depth: "Schemas, T-SQL, stored procedures — I manage DB work on live workloads",
    },
    {
      name: "Microsoft Graph API",
      depth: "Inbox read + template-driven extraction in .NET Core",
    },
  ],
  secondary: [
    {
      name: "ASP.NET MVC",
      depth: "Read through the codebase; limited hands-on changes so far",
    },
    {
      name: "Zoho CRM & RingCentral APIs",
      depth:
        "Zoho CRM sync in the company portal; RingCentral Call-Out REST API, webhooks, and call-state updates",
    },
    {
      name: "MongoDB",
      depth: "Ethix Portal — Mongoose schemas, proposal documents",
    },
    {
      name: "Node.js / Express / React",
      depth: "Personal MERN work — APIs, JWT, multi-step forms",
    },
    {
      name: "Next.js & Tailwind CSS",
      depth: "This site — App Router, utility CSS",
    },
    {
      name: "Git",
      depth: "Branches, PRs, daily version control",
    },
  ],
};

export const experience: ExperienceEntry[] = [
  {
    period: "Mar 2025 — present",
    role: "Software Developer",
    company: "Tudip Technologies Pvt. Ltd",
    summary:
      "Backend development on .NET Framework and .NET Core — shipping Web APIs, managing SQL Server, and building third-party integrations into the company portal.",
    shipped: [
      {
        title: "Inbox OCR via Microsoft Graph",
        did: "Read mailbox messages through Graph on .NET Core, extract fields with a per-document-type regex template registry, and persist to SQL Server. New layouts get a template instead of a pipeline rewrite.",
      },
      {
        title: "Zoho CRM in the company portal",
        did: "Built a Zoho-facing service on the OWIN Web API — OAuth, mapped accounts and contacts into the portal, and kept CRM sync out of unrelated modules.",
      },
      {
        title: "RingCentral telephony in the company portal",
        did: "Integrated Call-Out REST so users place outbound calls from the portal, plus webhooks that validate events and keep call state in sync on our side.",
      },
    ],
    highlights: [
      "Ship and maintain ASP.NET Core Web APIs on active product modules.",
      "Own SQL Server work — schemas, queries, and stored procedures on live data.",
      "Exploring ASP.NET MVC areas of the codebase with limited hands-on changes so far.",
    ],
  },
];

export const navSections = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];
