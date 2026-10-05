export type ArchNode = {
  id: string;
  label: string;
  detail?: string;
  /** Drawn by shape: store is a cylinder, external is dashed, legacy is dashed and muted. */
  kind: "client" | "service" | "worker" | "store" | "external" | "legacy";
  /** The component the case study is about; drawn in the accent. One per diagram. */
  core?: boolean;
};

export type ArchEdge = {
  from: string;
  to: string;
  label?: string;
  /** Push, event, or migration rather than a request: drawn dashed. */
  async?: boolean;
};

/** Layered component diagram: tiers render top to bottom, nodes left to right. */
export type Architecture = {
  tiers: { name: string; nodes: ArchNode[] }[];
  edges: ArchEdge[];
};

export type Project = {
  id: string;
  title: string;
  /** Short facts shown under a featured project's verdict, e.g. domain and stack focus. */
  context: string[];
  category: "work" | "personal";
  /** Employer for client work; shown once in the group heading, not per project. */
  company?: string;
  verdict: string;
  problem: string;
  decision: string;
  architecture: Architecture;
  outcome: string;
  metrics: { label: string; value: string }[];
  stack: string[];
  repoUrl?: string;
  demoUrl?: string;
  proprietary?: boolean;
};

export type ExperienceEntry = {
  period: string;
  role: string;
  company: string;
  summary: string;
  /** One line on the ongoing responsibilities that aren't a single piece of work. */
  dayToDay?: string;
  /** Work shipped in this role, newest first. */
  timeline?: {
    title: string;
    did: string;
    current?: boolean;
    /** Project id of the matching case study, if there is one. */
    caseStudy?: string;
  }[];
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
    context: [],
    category: "work",
    company: "Tudip Technologies",
    verdict: "Orders now flow from inbox to system automatically, no manual entry.",
    problem:
      "Client orders arrived as HTML emails in Outlook, each client using its own template. Getting that data into the system meant someone reading the email and keying the order in by hand.",
    decision:
      "Built a service on Microsoft Graph that fetches matching mail by subject, parses the order HTML against a per-client template, extracts the fields, and inserts the result as an order record. A new client's format means adding a template, not rewriting the pipeline.",
    architecture: {
      tiers: [
        { name: "Source", nodes: [{ id: "mail", label: "Outlook inbox", detail: "Client order emails", kind: "external" }] },
        {
          name: "Service",
          nodes: [
            { id: "ingest", label: "Ingestion service", detail: ".NET Core", kind: "service", core: true },
            { id: "parser", label: "Template parser", detail: "3 client formats", kind: "service" },
          ],
        },
        { name: "Data", nodes: [{ id: "sql", label: "SQL Server", detail: "Order records", kind: "store" }] },
      ],
      edges: [
        { from: "mail", to: "ingest", label: "Graph API" },
        { from: "ingest", to: "parser", label: "HTML" },
        { from: "parser", to: "sql", label: "insert order" },
      ],
    },
    outcome:
      "Orders now flow from inbox to system without manual keying. Onboarding a new client's email format is a template addition, not a pipeline change.",
    metrics: [{ label: "Client templates", value: "3" }],
    stack: ["ASP.NET Core", "Microsoft Graph API", "SQL Server"],
    proprietary: true,
  },
  {
    id: "mvc-to-api-migration",
    title: "Splitting a Legacy MVC App into a Standalone API",
    context: [],
    category: "work",
    company: "Tudip Technologies",
    verdict: "Frontend and backend now ship on independent release cycles.",
    problem:
      "The product was getting a full revamp, new design and a new frontend stack. The existing ASP.NET MVC app couldn't carry that redesign without becoming unmanageable if extended in place.",
    decision:
      "Extracted the backend logic out of the MVC app into a standalone .NET Core Web API so the redesigned frontend could consume it independently of the old app's release cycle. Added a new external integration secured with Stripe and OAuth2 client credentials, and set up that flow on both the external application and the API.",
    architecture: {
      tiers: [
        { name: "Before", nodes: [{ id: "mvc", label: "ASP.NET MVC", detail: "Legacy app", kind: "legacy" }] },
        { name: "API", nodes: [{ id: "api", label: ".NET Core Web API", detail: "Extracted backend", kind: "service", core: true }] },
        {
          name: "Clients",
          nodes: [
            { id: "web", label: "New frontend", detail: "Own release cycle", kind: "client" },
            { id: "ext", label: "External app", detail: "Stripe", kind: "external" },
          ],
        },
      ],
      edges: [
        { from: "mvc", to: "api", label: "logic extracted", async: true },
        { from: "web", to: "api", label: "REST" },
        { from: "ext", to: "api", label: "OAuth2 client creds" },
      ],
    },
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
    context: [],
    category: "work",
    company: "Tudip Technologies",
    verdict: "The correctness pass and re-routing to researchers now run automatically.",
    problem:
      "Before a report was approved, an editor read it end to end looking for anything incorrect, incomplete, or needing more research. It was a fully manual pass on every report.",
    decision:
      "Integrated an existing AI validation application that scores a report against a set of correctness questions, then built the orchestration around it. The system triggers validation as a background job once a report reaches the editor stage, pulls back pass/fail results per question, automatically reassigns the report to the original researcher when anything fails, and stores a per-question failure summary that only editor-level users can regenerate.",
    architecture: {
      tiers: [
        { name: "Trigger", nodes: [{ id: "flow", label: "Report workflow", detail: "Editor stage", kind: "service" }] },
        {
          name: "Jobs",
          nodes: [
            { id: "job", label: "Hangfire job", detail: "Runs validation", kind: "worker", core: true },
            { id: "ai", label: "AI validator", detail: "Existing app", kind: "external" },
          ],
        },
        {
          name: "Results",
          nodes: [
            { id: "summary", label: "Failure summary", detail: "Per question", kind: "store" },
            { id: "researcher", label: "Researcher", detail: "Reassigned", kind: "client" },
          ],
        },
      ],
      edges: [
        { from: "flow", to: "job", label: "enqueue" },
        { from: "job", to: "ai", label: "score" },
        { from: "job", to: "summary", label: "store" },
        { from: "job", to: "researcher", label: "on fail" },
      ],
    },
    outcome:
      "This is only partially automated. The objective correctness pass and the re-routing to researchers now happen without an editor manually deciding it, and there's a stored per-question summary of what needs fixing. Editors still do the final review.",
    metrics: [{ label: "Background jobs", value: "Hangfire" }],
    stack: ["Hangfire", "ASP.NET Core", "SQL Server"],
    proprietary: true,
  },
  {
    id: "relayforge",
    title: "RelayForge",
    context: ["DAG job scheduler", ".NET 8 and Next.js"],
    category: "personal",
    verdict: "A background job engine you can watch retry, dead-letter, and recover in real time.",
    problem:
      "Background job systems are easy to describe and hard to get right: steps depend on each other, independent work should run in parallel, failures need retries without hammering anything, and a crash mid-run shouldn't leave work stuck forever. Most of that behavior is invisible once it's working.",
    decision:
      "Built a DAG-based job scheduler on .NET 8 with a pure domain layer for cycle detection, topological ordering, readiness, and job finalization. Workers claim tasks with a lease, failures go through exponential backoff with jitter up to a max-attempts limit before dead-lettering, and a reliability sweep reclaims tasks whose lease expired after a crash or restart. A Next.js frontend streams state changes over SignalR and walks through six guided scenarios.",
    architecture: {
      tiers: [
        { name: "Client", nodes: [{ id: "ui", label: "Next.js UI", detail: "Live DAG view", kind: "client" }] },
        {
          name: "API",
          nodes: [
            { id: "api", label: ".NET 8 API", detail: "Minimal API", kind: "service" },
            { id: "hub", label: "SignalR hub", detail: "State push", kind: "service" },
          ],
        },
        {
          name: "Engine",
          nodes: [
            { id: "domain", label: "Domain", detail: "DAG, topo sort", kind: "service" },
            { id: "workers", label: "Workers", detail: "Lease, retry", kind: "worker", core: true },
            { id: "sweep", label: "Sweep", detail: "Reclaim", kind: "worker" },
          ],
        },
        { name: "Data", nodes: [{ id: "pg", label: "PostgreSQL", detail: "EF Core", kind: "store" }] },
      ],
      edges: [
        { from: "ui", to: "api", label: "REST" },
        { from: "hub", to: "ui", label: "live state", async: true },
        { from: "api", to: "domain", label: "validate" },
        { from: "workers", to: "hub", label: "events", async: true },
        { from: "workers", to: "pg", label: "lease" },
        { from: "sweep", to: "pg", label: "requeue" },
      ],
    },
    outcome:
      "Six one-click scenarios (ordering, parallelism, retry, dead-letter, partial failure, cancellation) each submit a real job and show it running live. A job with one broken branch ends PartiallyFailed instead of failing outright, and a restart mid-job recovers instead of hanging. Domain logic is unit tested and CI runs the tests plus a frontend lint and build.",
    metrics: [
      { label: "Guided scenarios", value: "6" },
      { label: "Job states", value: "6" },
      { label: "Task states", value: "6" },
    ],
    stack: [".NET 8", "ASP.NET Core Minimal API", "EF Core", "PostgreSQL", "SignalR", "Next.js"],
    repoUrl: "https://github.com/Pratik5357/RelayForge",
    demoUrl: "https://relay-forge.vercel.app/",
  },
  {
    id: "ethix-portal",
    title: "Ethix Portal",
    context: ["IEC research ethics", "MERN"],
    category: "personal",
    verdict: "Four roles, eight proposal states, one portal from draft to approval.",
    problem:
      "IEC proposals are long forms (investigators, consent sections, checklists, attachments) and multiple people touch each one before it gets approved. Spreadsheets and email threads weren't cutting it.",
    decision:
      "A full-stack portal with four roles (researcher, reviewer, scrutiny, admin), a multi-step wizard with save-as-draft, JWT on Express routes, and a MongoDB schema that tracks eight explicit states from draft through approved or rejected.",
    architecture: {
      tiers: [
        { name: "Client", nodes: [{ id: "spa", label: "React SPA", detail: "4 role dashboards", kind: "client" }] },
        {
          name: "API",
          nodes: [
            { id: "api", label: "Express API", detail: "JWT, role guard", kind: "service", core: true },
            { id: "multer", label: "Multer", detail: "File uploads", kind: "service" },
          ],
        },
        { name: "Data", nodes: [{ id: "mongo", label: "MongoDB", detail: "Users, Proposals", kind: "store" }] },
      ],
      edges: [
        { from: "spa", to: "api", label: "JSON + JWT" },
        { from: "spa", to: "multer", label: "files" },
        { from: "api", to: "mongo", label: "Mongoose" },
        { from: "multer", to: "mongo", label: "on proposal" },
      ],
    },
    outcome:
      "Researchers submit and track proposals, admins assign reviewers, and scrutiny and reviewer roles leave comments on decisions. Source is on GitHub if you want to dig into the status machine or auth middleware.",
    metrics: [
      { label: "Roles", value: "4" },
      { label: "Proposal states", value: "8" },
      { label: "Form sections", value: "5+" },
    ],
    stack: ["React", "Express", "Node.js", "MongoDB", "JWT"],
    repoUrl: "https://github.com/Pratik5357/EthixPortal",
    demoUrl: "https://ethixportal.netlify.app/",
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
      depth: "Inbox reads and template-driven extraction in .NET Core",
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
            "Zoho CRM sync, RingCentral Call-Out REST with webhooks, and a Stripe integration secured with OAuth2 client-credentials (set up on both sides)",
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
          name: "PostgreSQL / EF Core / SignalR",
          depth: "RelayForge, using leases, retries, and live job-state push over SignalR",
        },
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
    dayToDay:
      "Day to day I ship and maintain ASP.NET Core Web APIs on active product modules and own SQL Server work on live data, including schemas, queries, and stored procedures.",
    timeline: [
      {
        title: "Workflow orchestrator",
        did: "Building an orchestrator that drives operations across our existing internal APIs based on decision logic.",
        current: true,
      },
      {
        title: "AI-assisted report validation",
        did: "A Hangfire job runs AI validation once a report reaches the editor, then sends failures back to the researcher with a per-question summary.",
        caseStudy: "ai-report-validation-automation",
      },
      {
        title: "Legacy MVC app split into a standalone API",
        did: "Moved a legacy ASP.NET MVC app's backend into a .NET Core Web API for a full site revamp, and added a Stripe integration secured with OAuth2 client credentials.",
        caseStudy: "mvc-to-api-migration",
      },
      {
        title: "RingCentral telephony in the company portal",
        did: "Integrated Call-Out REST so users place outbound calls from the portal, plus webhooks that validate events and keep call state in sync on our side.",
      },
      {
        title: "Zoho CRM in the company portal",
        did: "Built a Zoho-facing service on the OWIN Web API using OAuth, mapped accounts and contacts into the portal, and kept CRM sync out of unrelated modules.",
      },
      {
        title: "Order ingestion via Microsoft Graph",
        did: "Read order emails through Graph on .NET Core, parse them against one of three per-client HTML templates, and insert the result as an order record in SQL Server.",
        caseStudy: "order-email-ingestion",
      },
    ],
  },
];

export const navSections = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];
