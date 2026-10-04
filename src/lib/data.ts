export type Project = {
  id: string;
  title: string;
  /** Short facts shown above the title, e.g. company and focus. Category is shown separately. */
  context: string[];
  category: "work" | "personal";
  verdict: string;
  problem: string;
  decision: string;
  architecture: string[];
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
    context: ["Tudip Technologies", "Microsoft Graph"],
    category: "work",
    verdict: "Orders now flow from inbox to system automatically, no manual entry.",
    problem:
      "Client orders arrived as HTML emails in Outlook, each client using its own template. Getting that data into the system meant someone reading the email and keying the order in by hand.",
    decision:
      "Built a service on Microsoft Graph that fetches matching mail by subject, parses the order HTML against a per-client template, extracts the fields, and inserts the result as an order record. A new client's format means adding a template, not rewriting the pipeline.",
    architecture: [
      "Fetch Outlook mail by subject through Microsoft Graph",
      "Parse the order HTML with one of 3 client templates",
      "Extract the order fields from the parsed HTML",
      "Insert the order record into SQL Server",
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
    context: ["Tudip Technologies", ".NET Core Web API"],
    category: "work",
    verdict: "Frontend and backend now ship on independent release cycles.",
    problem:
      "The product was getting a full revamp, new design and a new frontend stack. The existing ASP.NET MVC app couldn't carry that redesign without becoming unmanageable if extended in place.",
    decision:
      "Extracted the backend logic out of the MVC app into a standalone .NET Core Web API so the redesigned frontend could consume it independently of the old app's release cycle. Added a new external integration secured with Stripe and OAuth2 client credentials, and set up that flow on both the external application and the API.",
    architecture: [
      "Legacy ASP.NET MVC app",
      "Backend logic extracted into a .NET Core Web API",
      "Redesigned frontend consumes the API on its own release cycle",
      "Stripe integration for the new external service",
      "OAuth2 client credentials, set up on the external app and the API",
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
    context: ["Tudip Technologies", "Hangfire and AI validation"],
    category: "work",
    verdict: "The correctness pass and re-routing to researchers now run automatically.",
    problem:
      "Before a report was approved, an editor read it end to end looking for anything incorrect, incomplete, or needing more research. It was a fully manual pass on every report.",
    decision:
      "Integrated an existing AI validation application that scores a report against a set of correctness questions, then built the orchestration around it. The system triggers validation as a background job once a report reaches the editor stage, pulls back pass/fail results per question, automatically reassigns the report to the original researcher when anything fails, and stores a per-question failure summary that only editor-level users can regenerate.",
    architecture: [
      "Report reaches the editor stage",
      "Hangfire background job triggers AI validation",
      "AI scores the report, pass or fail per question",
      "Failures go back to the researcher with a stored summary",
      "Only editor-level users can regenerate a summary",
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
    context: ["IEC research ethics", "MERN"],
    category: "personal",
    verdict: "Four roles, eight proposal states, one portal from draft to approval.",
    problem:
      "IEC proposals are long forms (investigators, consent sections, checklists, attachments) and multiple people touch each one before it gets approved. Spreadsheets and email threads weren't cutting it.",
    decision:
      "A full-stack portal with four roles (researcher, reviewer, scrutiny, admin), a multi-step wizard with save-as-draft, JWT on Express routes, and a MongoDB schema that tracks eight explicit states from draft through approved or rejected.",
    architecture: [
      "React (Vite) SPA calling an Express REST API",
      "JWT auth with role middleware on every route",
      "MongoDB with User and Proposal collections",
      "Multer uploads stored on the proposal record",
      "Separate dashboards for researcher, reviewer, and admin",
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
    demoUrl: "https://ethixportal.netlify.app/",
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
    architecture: [
      "Next.js UI calling a .NET 8 Minimal API",
      "DAG validation and topological sort in a framework-free domain layer",
      "Worker pool claims each task with a lease in PostgreSQL",
      "Failed tasks back off with jitter, then dead-letter after max attempts",
      "A sweep requeues due retries and reclaims expired leases",
      "SignalR pushes job and task state to the live DAG view",
    ],
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
