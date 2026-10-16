/* ─── DATA ─────────────────────────────────────────────── */
export const ME = {
  name: "MATT HAMILTON",
  initials: "MC",
  title: "Software Engineer",
  tagline: ["I build things", "that matter,", "at scale."],
  manifesto:
    "Code is craft. Every system I design carries the weight of intention. Performance & Security aren't incidental, they're the point. I believe the best engineers don't just ship features, they shape futures.",
  about: `
  I'm Matt, a software engineer who genuinely loves what he does. My background runs through mathematics, physics, electrical engineering, and computer science. Each step intentional, each one making me a better engineer than the last. 
  I'm drawn to software because it's the rare place where rigorous thinking and creative instinct belong in the same room. I love building things that are fast, secure, and, most importantly, actually pleasant to use.
  User experience, trust, and safety sit at the core of everything I build. Because behind every interface is a real person, and they deserve better than an afterthought.`,
};

export const SKILLS = [
  {
    category: "Languages",
    icon: "⌨",
    items: ["TypeScript", "JavaScript", "PHP", "Python", "C#", "SQL"],
  },
  {
    category: "Frontend",
    icon: "◻",
    items: [
      "React",
      "Next.js",
      "WebGL",
      "CSS/Animation",
      "GraphQL",
      "Vite",
      "Tailwind",
    ],
  },
  {
    category: "Backend & Infra",
    icon: "⬡",
    items: [
      "Node.js",
      "gRPC",
      "Apache Kafka",
      "Redis",
      "PostgreSQL",
      "MangoDB",
    ],
  },
  {
    category: "Cloud & DevOps",
    icon: "△",
    items: ["AWS", "Kubernetes", "Docker", "Terraform", "CI/CD"],
  },
];

export const EXPERIENCE = [
  {
    company: "Rausser College of Natural Resources",
    role: "Senior Software Engineer",
    period: "AUG 2023 – Present",
    highlight: [
      "Architected Platform Serving 2K+ users",
      "Scaled APIs to 0.7M+ requests/day",
      "Cut Latency by 20%",
    ],
    desc: "Led the development of full-stack web applications, owning architecture decisions from front-end experience to backend infrastructure. Architected scalable APIs, optimized data pipelines, and integrated cloud and real-time services to significantly improve performance, reliability, and responsiveness. Championed clean code practices, streamlined workflows, and drove code review standards to ensure a maintainable and high-quality codebase. Partnered cross-functionally in Agile environments, accelerating delivery while strengthening system scalability and long-term technical strategy.",
  },
  {
    company: "UC Berkeley",
    role: "Software Engineer Instructore ",
    period: "JAN 2023 – DEC 2023",
    highlight: [
      "Mentored 50+ Students in Full-Stack Development",
      "Elevated Code Quality Through Structured Reviews",
      "Delivered Weekly High-Impact Technical Lectures",
    ],
    desc: "Led instruction for a Full-Stack Web Development course at UC Berkeley DeCal, mentoring and training aspiring engineers while driving measurable improvements in code quality, performance optimization, and system design best practices.",
  },
  {
    company: "Yalantis",
    role: "Junior Developer",
    period: "MAR 2020 – AUG 2021",
    highlight: [
      "Reduced Load Times by 30% (SSR, SSG, PPR)",
      "Integrated REST & GraphQL APIs Handling 500K+ Req/Month",
      "Participated in 50+ Code Reviews",
      "45+ Agile Pair Programming Sessions",
    ],
    desc: "Where I learned to take things seriously. I Developed and optimized React/Next.js web applications, contributing to front-end architecture and improving performance. Implemented SSR, SSG, and lazy loading to speed up load times and enhance SEO. Worked with RESTful and GraphQL APIs and managed state using Redux and Zustand to ensure smooth data flow. Participated in code reviews, pair programming, and Agile sprints, gaining experience in building scalable and maintainable applications.",
  },
];

// export const PROJECTS = [
//   { name: "Cabinly",      year: "2024", tech: ["Next.js","Node.js", "MangoDB", "JWT", "React", 'Tailwind'],    desc: "Cabinly is an experience-driven travel platform that combines cabin rentals, curated activities, and social group experiences into structured adventure bundles. It is designed to help people connect with nature, meet like-minded individuals, and participate in intellectually and culturally enriching retreats.", accent: "#00ff9d" },
//   { name: "CozyHome",  year: "2021", tech: ["React", "Firebase", "Node.js", "Auth0", "PostgreSQL"],               desc: "This platform is a premium furniture brand dedicated to artisan-crafted, timeless pieces designed to elevate modern living spaces. It combines traditional craftsmanship with refined contemporary design, offering furniture that is both functional and heirloom-worthy.",         stars: "",  accent: "#00e0ff" },
// //   { name: "DataMesh",     year: "2023", tech: ["Python", "Kafka", "ClickHouse"],          desc: "Federated analytics framework for distributed teams. 15k+ monthly downloads on PyPI.",                 stars: "", accent: "#f59e0b" },
// //   { name: "NeuralCache",  year: "2024", tech: ["TypeScript", "LLM APIs", "pgvector"],     desc: "Semantic caching for LLM apps using vector similarity. Cuts API costs by up to 60%.",                  stars: "",  accent: "#a78bfa" },
// ];
export const PROJECTS = [
  {
    name: "Cabinly",
    tagline:
      "A full-stack adventure travel marketplace with AI-powered search.",
    year: "2025",
    status: "Live",
    role: "Solo project",
    desc: "Cabinly is an end-to-end travel platform where users discover handpicked destinations, book cabins, sign up for guided activities, and earn Summit Points on every adventure. Built with a custom JWT authentication system using HTTP-only cookies, a two-layer data architecture separating session identity (context) from server state (React Query), and an atomic booking flow that decrements cabin and activity availability with automatic rollback on failure. Features a MongoDB TTL-based booking expiry system with Change Streams for automatic cleanup, a Resend email confirmation flow with signed JWT links, a gamification system with four membership tiers and a 15-medal achievement shelf, and an AI-powered destination search that takes a natural language prompt and returns ranked place matches using the Claude API.",
    link: "https://cabinly-matt-60eb.vercel.app/",
    repo: "https://github.com/Matt-Hamilton-GitHub/cabinly",
    images: [
      // {
      //   src: "/img/cabinly-hero.png",
      //   caption: "Hero section with animated stats",
      // },
      // {
      //   src: "/img/cabinly-places.png",
      //   caption: "Places page with AI search and sidebar filters",
      // },
      // {
      //   src: "/img/cabinly-place.png",
      //   caption: "Place detail with cabin selector and booking sidebar",
      // },
      // {
      //   src: "/img/cabinly-account.png",
      //   caption: "User account with medal shelf and Summit Points",
      // },
      // {
      //   src: "/img/cabinly-guides.png",
      //   caption: "Guides leaderboard with XP scoring system",
      // },
      // {
      //   src: "/img/cabinly-booking.png",
      //   caption: "Booking confirmation flow with email verification",
      // },
    ],
    stack: [
      "Next.js 15",
      "TypeScript",
      "MongoDB",
      "Mongoose",
      "Tailwind CSS",
      "React Query",
      "JWT",
      "bcrypt",
      "Resend",
      "Claude API",
      "Email Notifications",
      "Google Maps API",
      "@vis.gl/react-google-maps",
      "Lucide React",
    ],
  },
{
  name: "Oakline",
  tagline:
    "A luxury custom furniture storefront with secure sign-in and Stripe checkout",
  year: "2024",
  status: "Live",
  role: "Solo project",
  desc: "Oakline is an online storefront for bespoke, made-to-measure furniture. Visitors can browse the collection with search, category, company, color, price and free-shipping filters, sort and switch between grid and list views, open a product page, and build a cart. Sign-in runs through Auth0 (including Google), and payment is handled by Stripe through a serverless Netlify function. The site has a custom brand identity and logo, a responsive layout, and a newsletter signup.",
  link: "https://oakline-store.netlify.app/",
  repo: "https://github.com/Matt-Hamilton-GitHub/CozyHome",
  images: [],
  stack: [
    "React 17",
    "React Router",
    "Context API",
    "styled-components",
    "Auth0",
    "Stripe",
    "Netlify Functions",
    "Axios",
    "Formspree",
    "React Icons",
  ],
},
 {
  name: "PLab Server",
  tagline:
    "A backend server that works under the hood to orchestrate communication between all the products and services I've built.",
  year: "2026",
  status: "Live",
  role: "Solo project",
  desc: "PLab is the backbone of my entire ecosystem: one server that every product and service I've built plugs into. It centralizes authentication, request routing, and data access behind a single secure API, so new products launch faster without rebuilding the same backend logic. Built as a modular Node.js and Express system with JWT-based auth and a dual-database setup (MongoDB and PostgreSQL), it's designed to scale as new services are added. I designed, built, and deployed it end to end as a solo project.",
  repo: "https://github.com/Matt-Hamilton-GitHub/polygon-server",
  images: [],
  stack: [
    "Node.js",
    "Express",
    "MongoDB",
    "Mongoose",
    "PostgreSQL",
    "JWT",
    "bcrypt",
    "REST API",
    "Zod",
    "CORS",
    "Helmet",
    "dotenv",
    "Nodemon",
    "Postman",
    "Git",
    "Modular Architecture",
  ],
},
];

export const COURSEWORK = [
  "CS 161 — Computer Security",
  "CS 171 — Cryptography",
  "CS 160 — User Interface Design and Development",
  "CS 70 — Discrete Mathematics and Probability Theory",
  "CS 168 — The Internet: Architecture and Protocols",
  "CS 169 — Software Engineering",
  "CS 170 — Efficient Algorithms and Intractable Problems",
  "CS 188 — Artificial Intelligence",
];

export const MARQUEE_WORDS = [
  "Kafka",
  "Python",
  "React",
  "TypeScript",
  "Kubernetes",
  "Redis",
  "Next.js",
  "C",
  "Cybersecurity",
  "PostgreSQL",
  "AWS",
  "Docker",
  "Firebase",
  "Auth0",
  "Stripe",
  "MangoDB",
];
