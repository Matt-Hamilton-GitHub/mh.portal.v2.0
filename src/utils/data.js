/* ─── DATA ─────────────────────────────────────────────── */
export const ME = {
  name: "MATT HAMILTON",
  initials: "MC",
  title: "Software Engineer",
  tagline: ["I build things", "that matter,", "at scale."],
  manifesto: "Code is craft. Every system I design carries the weight of intention. Performance & Security aren't incidental, they're the point. I believe the best engineers don't just ship features, they shape futures.",
  about: `
  I'm Matt, a software engineer who genuinely loves what he does. My background runs through mathematics, physics, electrical engineering, and computer science. Each step intentional, each one making me a better engineer than the last. 
  I'm drawn to software because it's the rare place where rigorous thinking and creative instinct belong in the same room. I love building things that are fast, secure, and, most importantly, actually pleasant to use.
  User experience, trust, and safety sit at the core of everything I build. Because behind every interface is a real person, and they deserve better than an afterthought.`}

export const SKILLS = [
  { category: "Languages", icon: "⌨", items: ["TypeScript", "JavaScript", "PHP", "Python", "C#", "SQL"] },
  { category: "Frontend",   icon: "◻", items: ["React", "Next.js", "WebGL", "CSS/Animation", "GraphQL", "Vite", "Tailwind"] },
  { category: "Backend & Infra", icon: "⬡", items: ["Node.js", "gRPC", "Apache Kafka", "Redis", "PostgreSQL", "MangoDB"] },
  { category: "Cloud & DevOps",  icon: "△", items: ["AWS", "Kubernetes", "Docker", "Terraform", "CI/CD"] },
];

export const EXPERIENCE = [
  {
    company: "Rausser College of Natural Resources", role: "Senior Software Engineer", period: "AUG 2023 – Present", highlight: ["Architected Platform Serving 2K+ users", "Scaled APIs to 0.7M+ requests/day","Cut Latency by 20%"],
    desc: "Led the development of full-stack web applications, owning architecture decisions from front-end experience to backend infrastructure. Architected scalable APIs, optimized data pipelines, and integrated cloud and real-time services to significantly improve performance, reliability, and responsiveness. Championed clean code practices, streamlined workflows, and drove code review standards to ensure a maintainable and high-quality codebase. Partnered cross-functionally in Agile environments, accelerating delivery while strengthening system scalability and long-term technical strategy.",
  },
  {
    company: "UC Berkeley", role: "Software Engineer Instructore (CubStart)", period: "JAN 2023 – DEC 2023", highlight: ["Mentored 50+ Students in Full-Stack Development", "Elevated Code Quality Through Structured Reviews","Delivered Weekly High-Impact Technical Lectures"],
    desc: "Led instruction for a Full-Stack Web Development course at UC Berkeley DeCal, mentoring and training aspiring engineers while driving measurable improvements in code quality, performance optimization, and system design best practices.",
  },
  {
    company: "Yalantis", role: "Junior Developer", period: "MAR 2020 – AUG 2021", highlight: ["Reduced Load Times by 30% (SSR, SSG, PPR)", "Integrated REST & GraphQL APIs Handling 500K+ Req/Month", "Participated in 50+ Code Reviews","45+ Agile Pair Programming Sessions"],
    desc: "Where I learned to take things seriously. I Developed and optimized React/Next.js web applications, contributing to front-end architecture and improving performance. Implemented SSR, SSG, and lazy loading to speed up load times and enhance SEO. Worked with RESTful and GraphQL APIs and managed state using Redux and Zustand to ensure smooth data flow. Participated in code reviews, pair programming, and Agile sprints, gaining experience in building scalable and maintainable applications.",
  },
];

export const PROJECTS = [
  { name: "Cabinly",      year: "2024", tech: ["Next.js","Node.js", "MangoDB", "JWT", "React", 'Tailwind'],    desc: "Cabinly is an experience-driven travel platform that combines cabin rentals, curated activities, and social group experiences into structured adventure bundles. It is designed to help people connect with nature, meet like-minded individuals, and participate in intellectually and culturally enriching retreats.", accent: "#00ff9d" },
  { name: "CozyHome",  year: "2021", tech: ["React", "Firebase", "Node.js", "Auth0", "PostgreSQL"],               desc: "This platform is a premium furniture brand dedicated to artisan-crafted, timeless pieces designed to elevate modern living spaces. It combines traditional craftsmanship with refined contemporary design, offering furniture that is both functional and heirloom-worthy.",         stars: "",  accent: "#00e0ff" },
//   { name: "DataMesh",     year: "2023", tech: ["Python", "Kafka", "ClickHouse"],          desc: "Federated analytics framework for distributed teams. 15k+ monthly downloads on PyPI.",                 stars: "", accent: "#f59e0b" },
//   { name: "NeuralCache",  year: "2024", tech: ["TypeScript", "LLM APIs", "pgvector"],     desc: "Semantic caching for LLM apps using vector similarity. Cuts API costs by up to 60%.",                  stars: "",  accent: "#a78bfa" },
];

export const COURSEWORK = [
  "CS 189 — Machine Learning",
  "CS 161 — Computer Security",
  "CS 188 — Artificial Intelligence",
  "CS 169 — Software Engineering",
  "CS 170 — Efficient Algorithms",
  "CS 70 — Probability & Random Processes",
];

export const MARQUEE_WORDS = ["Kafka","Python","React","TypeScript","Kubernetes","Redis","Next.js","C","Cybersecurity","PostgreSQL","AWS","Docker","Firebase", "Auth0", "Stripe","MangoDB"];