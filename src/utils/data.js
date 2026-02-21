/* ─── DATA ─────────────────────────────────────────────── */
export const ME = {
  name: "MATT HAMILTON",
  initials: "MC",
  title: "Software Engineer",
  tagline: ["I build  things", "that matter,", "at scale."],
  manifesto: "Code is craft. Every system I design carries the weight of intention — performance & security aren't incidental, they're the point. I believe the best engineers don't just ship features, they shape futures.",
  about: "Six years ago I wrote my first real production bug and fixed it at 2 AM with cold coffee and a rubber duck. That feeling — the deep satisfaction of making something complex finally work — never left. Today I lead architecture on systems that process millions of events daily, mentor engineers early in their careers, and stay restless about what comes next.",
};

export const SKILLS = [
  { category: "Languages", icon: "⌨", items: ["TypeScript", "JavaScript", "PHP", "Python", "Rust", "SQL"] },
  { category: "Frontend",   icon: "◻", items: ["React", "Next.js", "WebGL", "CSS/Animation", "GraphQL", "Vite"] },
  { category: "Backend & Infra", icon: "⬡", items: ["Node.js", "gRPC", "Apache Kafka", "Redis", "PostgreSQL", "ClickHouse"] },
  { category: "Cloud & DevOps",  icon: "△", items: ["AWS", "GCP", "Kubernetes", "Docker", "Terraform", "CI/CD"] },
];

export const EXPERIENCE = [
  {
    company: "Rausser College of Natural Resources", role: "Senior Software Engineer", period: "2022 – Present", highlight: "50M+ events/day",
    desc: "Lead architect on a real-time data pipeline that became the backbone of the platform. Redesigned the microservice topology and introduced Redis-based caching that cut end-to-end latency by 40%. Grew the infrastructure team from 3 to 9 engineers.",
  },
  {
    company: "UC Berkeley", role: "Software Engineer Instructore (CubStart)", period: "2020 – 2022", highlight: "200+ enterprise clients",
    desc: "Built the multi-tenant SaaS foundation serving enterprise clients across finance and healthcare. Introduced a CI/CD pipeline that compressed deployment time from 2 hours to 8 minutes — a change that compounded every single day.",
  },
  {
    company: "Axiom Digital", role: "Junior Developer", period: "2018 – 2020", highlight: "Perf: 52 → 94",
    desc: "Where I learned to take things seriously. Rebuilt the product suite's frontend performance from the ground up and fell in love with the craft of doing things right.",
  },
];

export const PROJECTS = [
  { name: "Cabinly",      year: "2024", tech: ["Go", "WebSockets", "Redis", "React"],    desc: "Real-time collaborative code editor. Operational transformation. 500+ concurrent users, <10ms sync.", stars: "1.2k", accent: "#00ff9d" },
  { name: "CozyHome",  year: "2023", tech: ["Rust", "WASM", "Node.js"],               desc: "Cloud infrastructure management that compiles to WASM — runs anywhere, even in your browser.",         stars: "847",  accent: "#00e0ff" },
  { name: "DataMesh",     year: "2023", tech: ["Python", "Kafka", "ClickHouse"],          desc: "Federated analytics framework for distributed teams. 15k+ monthly downloads on PyPI.",                 stars: "2.3k", accent: "#f59e0b" },
  { name: "NeuralCache",  year: "2024", tech: ["TypeScript", "LLM APIs", "pgvector"],     desc: "Semantic caching for LLM apps using vector similarity. Cuts API costs by up to 60%.",                  stars: "634",  accent: "#a78bfa" },
];

export const COURSEWORK = [
  "CS 189 — Machine Learning",
  "CS 186 — Database Systems",
  "CS 162 — Operating Systems",
  "CS 169 — Software Engineering",
  "CS 170 — Efficient Algorithms",
  "EE 126 — Probability & Random Processes",
];

export const MARQUEE_WORDS = ["React","Go","Rust","Kafka","TypeScript","Kubernetes","Redis","Next.js","gRPC","WebAssembly","PostgreSQL","AWS","Docker","Terraform"];
