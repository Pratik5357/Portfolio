export type Project = {
  id: string;
  title: string;
  context: string;
  category: "work" | "personal";
  verdict: string;
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
  shipped:
    "Shipped: inbox-to-order automation on Microsoft Graph, a Stripe/OAuth2-secured API migration, AI-validation workflow automation, and day-to-day SQL Server ownership across multiple .NET runtimes.",
  location: "Kolhapur, Maharashtra, India",
  contact: {
    email: "pratikkumbhar008@gmail.com",
    linkedin: "https://www.linkedin.com/in/pratik-kumbhar-08b216246",
    github: "https://github.com/Pratik5357",
  },
};

export const projects: Project[] = [
  {
    id: "order-email-ingestion",
    title: "Order Ingestion from Inbox Templates",
    context: "Work · Tudip Technologies · Microsoft Graph",
    category: "work",
    verdict: "Orders now flow from inbox to system automatically, no manual entry.",
    problem:
      "Client orders arrived as HTML emails in Outlook, each client using its own template. Getting that data into the system meant someone reading the email and keying the order in by hand.",
    decision:
      "Built a service on Microsoft Graph that fetches matching mail by subject, parses the order HTML against a per-client template, extracts the fields, and inserts the result as an order record. A new client's format means adding a template, not rewriting the pipeline.",
    architecture: [
      "Microsoft Graph API → fetch mail by subject match",
      "Per-client HTML template parser (3 templates)",
      "Field extraction from parsed HTML",
      "Insert into SQL Server as an order record",
    ],
    outcome:
      "Orders now flow from inbox to system without manual keying. Onboarding a new client's email format is a template addition, not a pipeline change.",
    metrics: [{ label: "Client templates", value: "3" }],
    stack: ["ASP.NET Core", "Microsoft Graph API", "SQL Server"],
    proprietary: true,
  },
  {
    id: "mvc-to-api-migration",
    title: "Splitting a Legacy MVC App into a Standalone API",
    context: "Work · Tudip Technologies · .NET Core Web API",
    category: "work",
    verdict: "Frontend and backend now ship on independent release cycles.",
    problem:
      "The product was getting a full revamp, new design and a new frontend stack. The existing ASP.NET MVC app couldn't carry that redesign without becoming unmanageable if extended in place.",
    decision:
      "Extracted the backend logic out of the MVC app into a standalone .NET Core Web API so the redesigned frontend could consume it independently of the old app's release cycle. Added a new external integration secured with Stripe and OAuth2 client credentials, and set up that flow on both the external application and the API.",
    architecture: [
      "ASP.NET MVC app → backend logic extracted into .NET Core Web API",
      "Redesigned frontend consumes the API independently",
      "Stripe integration for the new external service",
      "OAuth2 client-credentials flow, configured on both the external app and the API",
    ],
    outcome:
      "Frontend and backend now ship on independent cycles instead of both living in one MVC app.",
    metrics: [],
    stack: [
      "ASP.NET Core Web API",
      "Stripe",
      "OAuth 2.0 (client credentials)",
      "ASP.NET MVC (legacy)",
    ],
    proprietary: true,
  },
  {
    id: "ai-report-validation-automation",
    title: "Automating AI-Assisted Report Validation",
    context: "Work · Tudip Technologies · Hangfire + AI validation",
    category: "work",
    verdict: "The correctness pass and re-routing to researchers now run automatically.",
    problem:
      "Before a report was approved, an editor read it end to end looking for anything incorrect, incomplete, or needing more research. It was a fully manual pass on every report.",
    decision:
      "Integrated an existing AI validation application that scores a report against a set of correctness questions, then built the orchestration around it. The system triggers validation as a background job once a report reaches the editor stage, pulls back pass/fail results per question, automatically reassigns the report to the original researcher when anything fails, and stores a per-question failure summary that only editor-level users can regenerate.",
    architecture: [
      "Report reaches editor stage → Hangfire background job triggers AI validation",
      "AI scores report against question set → pass/fail per question",
      "Any failures → auto-reassign to researcher + store failure summary",
      "Per-question summary regeneration restricted to editor-level users",
    ],
    outcome:
      "This is only partially automated. The objective correctness pass and the re-routing to researchers now happen without an editor manually deciding it, and there's a stored per-question summary of what needs fixing. Editors still do the final review.",
    metrics: [{ label: "Background jobs", value: "Hangfire" }],
    stack: ["Hangfire", "ASP.NET Core", "SQL Server"],
    proprietary: true,
  },
  {
    id: "ethix-portal",
    title: "Ethix Portal",
    context: "Personal project · IEC research ethics · MERN",
    category: "personal",
    verdict: "Four roles, eight proposal states, one portal from draft to approval.",
    problem:
      "IEC proposals are long forms (investigators, consent sections, checklists, attachments) and multiple people touch each one before it gets approved. Spreadsheets and email threads weren't cutting it.",
    decision:
      "A full-stack portal with four roles (researcher, reviewer, scrutiny, admin), a multi-step wizard with save-as-draft, JWT on Express routes, and a MongoDB schema that tracks eight explicit states from draft through approved or rejected.",
    architecture: [
      "React (Vite) SPA → Express REST API",
      "JWT auth + role middleware per route",
      "MongoDB with User and Proposal collections",
      "Multer uploads → documents on proposal record",
      "Role-specific dashboards (researcher → reviewer → admin)",
    ],
    outcome:
      "Researchers submit and track proposals, admins assign reviewers, and scrutiny and reviewer roles leave comments on decisions. Source is on GitHub if you want to dig into the status machine or auth middleware.",
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
      depth: "This is where I spend most of my time, working on endpoints, services, and shipping features",
    },
    {
      name: "OWIN .NET Web API",
      depth: "Older portal host, home to the Zoho and RingCentral integrations",
    },
    {
      name: ".NET Framework / .NET Core",
      depth:
        "I run multiple .NET runtimes in production, from .NET Framework 4.6.1 with OWIN and Web API 2 on the main app, to .NET Core 3.1 and .NET 8 on newer services",
    },
    {
      name: "C#",
      depth: "Service layers, regex parsing, async I/O, HTTP clients to third parties",
    },
    {
      name: "SQL Server",
      depth: "I manage DB work on live workloads, including schemas, T-SQL, and stored procedures",
    },
    {
      name: "Microsoft Graph API",
      depth: "Inbox read + template-driven extraction in .NET Core",
    },
  ],
  secondary: [
    {
      group: "Portal & integrations",
      items: [
        {
          name: "ASP.NET MVC",
          depth:
            "Migrated a legacy MVC app's backend into a standalone .NET Core Web API for a full site revamp",
        },
        {
          name: "Zoho, RingCentral & Stripe APIs",
          depth:
            "Zoho CRM sync, RingCentral Call-Out REST + webhooks, and a Stripe integration secured with OAuth2 client-credentials (set up on both sides)",
        },
      ],
    },
    {
      group: "Background processing",
      items: [
        {
          name: "Hangfire",
          depth: "Background job processing, orchestrating the AI report-validation workflow",
        },
        {
          name: "WebJobs / Windows Scheduled Jobs",
          depth: "Scheduled and background processing outside the request/response cycle",
        },
      ],
    },
    {
      group: "Personal stack & tooling",
      items: [
        {
          name: "MongoDB",
          depth: "Ethix Portal, using Mongoose schemas and proposal documents",
        },
        {
          name: "Node.js / Express / React",
          depth: "Personal MERN work with APIs, JWT, and multi-step forms",
        },
        {
          name: "Next.js & Tailwind CSS",
          depth: "This site, built with App Router and utility CSS",
        },
        {
          name: "Git",
          depth: "Branches, PRs, daily version control",
        },
      ],
    },
  ],
};

export const experience: ExperienceEntry[] = [
  {
    period: "Mar 2025 to present",
    role: "Software Developer",
    company: "Tudip Technologies Pvt. Ltd",
    summary:
      "Backend development on .NET Framework and .NET Core, shipping Web APIs, managing SQL Server, and building third-party integrations into the company portal.",
    shipped: [
      {
        title: "Order ingestion via Microsoft Graph",
        did: "Read order emails through Graph on .NET Core, parse against one of three per-client HTML templates, extract fields, and insert the result as an order record in SQL Server.",
      },
      {
        title: "Zoho CRM in the company portal",
        did: "Built a Zoho-facing service on the OWIN Web API using OAuth, mapped accounts and contacts into the portal, and kept CRM sync out of unrelated modules.",
      },
      {
        title: "RingCentral telephony in the company portal",
        did: "Integrated Call-Out REST so users place outbound calls from the portal, plus webhooks that validate events and keep call state in sync on our side.",
      },
    ],
    highlights: [
      "Ship and maintain ASP.NET Core Web APIs on active product modules.",
      "Own SQL Server work, including schemas, queries, and stored procedures on live data.",
      "Migrated a legacy ASP.NET MVC app's backend into a standalone .NET Core Web API as part of a full site revamp.",
      "Currently building a workflow orchestrator that drives operations across existing internal APIs based on decision logic.",
    ],
  },
];

export const navSections = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];
