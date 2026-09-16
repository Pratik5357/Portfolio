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
  highlights?: string[];
};

export const site = {
  name: "Pratik Keraba Kumbhar",
  title: ".NET Backend Developer",
  statement:
    "Backend developer working on ASP.NET Web APIs, SQL Server, and REST integrations across .NET Framework and Core. Also experienced with full-stack development using the MERN stack.",
  location: "Kolhapur, Maharashtra, India",
  resumePath: "/resume.pdf",
  contact: {
    email: "pratikkumbhar008@gmail.com",
    linkedin: "https://www.linkedin.com/in/pratik-kumbhar-08b216246",
    github: "https://github.com/Pratik5357",
  },
};

export const projects: Project[] = [
  {
    id: "graph-inbox-ocr",
    title: "Inbox OCR via Microsoft Graph",
    context: "Tudip Technologies · .NET Core · Microsoft Graph",
    category: "work",
    problem:
      "Operations were opening mailbox messages and copying fields into the system by hand. That broke down fast — every vendor formats attachments differently, and a single parser couldn't cover the layouts we were seeing.",
    decision:
      "Pulled messages through Microsoft Graph on .NET Core and ran extracted text through a template registry: each document type gets its own regex set in C#. When a new layout shows up, we add a template instead of patching the main pipeline.",
    architecture: [
      "Microsoft Graph → mailbox / message read",
      ".NET Core / ASP.NET Core service processes incoming content",
      "Template registry → regex pattern per document type",
      "Parsed output → SQL Server persistence",
      "Web API exposes results to consuming clients",
    ],
    outcome:
      "Mail comes in, gets matched to a template, and lands in SQL Server without someone retyping it. I haven't had to rewrite the core flow for a new document shape — just register another pattern.",
    metrics: [
      { label: "New doc layout", value: "Add template" },
      { label: "Inbox access", value: "Graph API" },
      { label: "Persistence", value: "SQL Server" },
    ],
    stack: [".NET Core", "ASP.NET Core", "C#", "Microsoft Graph", "SQL Server"],
    proprietary: true,
  },
  {
    id: "zoho-crm",
    title: "Zoho CRM in the company portal",
    context: "Tudip Technologies · OWIN Web API · CRM data",
    category: "work",
    problem:
      "Sales and support were bouncing between the internal portal and Zoho to look up accounts and contacts. Copy-paste between tabs, stale data in our DB, the usual mess.",
    decision:
      "Built a Zoho-facing service behind an OWIN .NET Web API: OAuth for Zoho, mapped their REST resources to what the portal UI needed, and kept CRM sync logic out of unrelated modules.",
    architecture: [
      "Company portal → OWIN .NET Web API",
      "Zoho integration service (auth + mapping)",
      "Zoho CRM REST API",
      "SQL Server for portal-side state",
    ],
    outcome:
      "CRM records show up where portal users already work. Zoho auth, rate limits, and error responses are handled in one place — not mixed into the RingCentral code path.",
    metrics: [
      { label: "Data", value: "Accounts & contacts" },
      { label: "Auth", value: "Zoho OAuth" },
      { label: "Surface", value: "OWIN Web API" },
    ],
    stack: [".NET Framework", "OWIN", "C#", "REST APIs", "SQL Server"],
    proprietary: true,
  },
  {
    id: "ringcentral",
    title: "RingCentral telephony in the company portal",
    context: "Tudip Technologies · OWIN Web API · Call-Out REST",
    category: "work",
    problem:
      "Users had to open RingCentral and dial outbound numbers themselves. The application needed outbound calling built in — and a way to keep call information up to date on our side as RingCentral reported what happened on the line.",
    decision:
      "Integrated RingCentral's Call-Out REST API into the existing OWIN backend: authenticate API requests, pass caller and destination details, initiate the call, and handle the outbound workflow end to end. Added webhook handling for call-related event notifications — validate incoming requests from RingCentral, process the event payloads, and update application-side call data as events arrive.",
    architecture: [
      "Portal user → initiate outbound call",
      "OWIN backend → authenticate + Call-Out REST request",
      "RingCentral initiates and connects the call",
      "RingCentral webhook → portal event endpoint",
      "Validate request, parse payload, update call state",
      "Application workflow stays in sync without leaving the portal",
    ],
    outcome:
      "Users place outbound calls from the application without switching to RingCentral. The API handles initiation; webhooks handle the rest asynchronously — validation, payload processing, and updating call information on the backend. Both paths plug into the same integration layer on the existing portal backend.",
    metrics: [
      { label: "Outbound", value: "Call-Out REST" },
      { label: "Inbound", value: "Webhooks" },
      { label: "Host", value: "OWIN Web API" },
    ],
    stack: [
      ".NET Framework",
      "OWIN",
      "C#",
      "RingCentral REST API",
      "Webhooks",
      "SQL Server",
    ],
    proprietary: true,
  },
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
      name: "Azure",
      depth: "Early exposure — Azure Repos, hosted environments; still building depth",
    },
    {
      name: "Classic CI/CD pipelines",
      depth: "I know how our team's build and release pipeline runs, not owning it yet",
    },
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
    highlights: [
      "Ship and maintain ASP.NET Core Web APIs on active product modules.",
      "Own SQL Server work — schemas, queries, and stored procedures on live data.",
      "Build third-party REST integrations into the portal (mail, CRM, telephony).",
      "Working with Azure Repos and the team's CI/CD pipeline; still building depth on the ops side.",
      "Exploring ASP.NET MVC areas of the codebase with limited hands-on changes so far.",
    ],
  },
];

export const navSections = [
  { id: "projects", label: "Projects" },
  { id: "stack", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export const projectGroups = [
  { id: "work", label: "Client work" },
  { id: "personal", label: "Personal" },
] as const;
