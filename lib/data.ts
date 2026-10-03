export const profile = {
  name: "Hemakshi Chitte",
  headline: "Software Engineer",
  credential: "M.S. Computer Science · Binghamton University '25",
  intro:
    "I've spent 3+ years building and shipping production web applications, focused on React and TypeScript, with growing expertise in AI development and backend APIs.",
  email: "hemakshi.chitte@yahoo.com",
  github: "https://github.com/hchitte2",
  linkedin: "https://www.linkedin.com/in/hemakshi-chitte-485674205/",
  resume: "/Hemakshi_Chitte_Resume (1).pdf",
  stats: [
    { value: "3+ yrs", label: "Shipping production web apps" },
    { value: "M.S. CS", label: "Binghamton University '25" },
    { value: "Open", label: "To full-stack and AI roles" },
  ],
};

export const experience = [
  {
    company: "Runara AI",
    role: "Software Engineer",
    period: "Mar 2026 – Jul 2026",
    location: "Remote",
    points: [
      "Benchmarked competing LLM inference frameworks across GPU hardware, measuring throughput and p95 latency under concurrent load to guide production deployment and hardware selection.",
      "Built and evaluated LangGraph pipelines for inference optimization, contributing to architecture decisions around speculative decoding and query rewriting.",
      "Applied post-training quantization (INT8, FP8, MXFP4) to open-weight models and published checkpoints with documented accuracy, memory, and speed tradeoffs.",
    ],
    stack: ["LangGraph", "vLLM", "PyTorch", "GCP", "Docker"],
  },
  {
    company: "Atlasly",
    role: "Full Stack Engineer",
    period: "Aug 2025 – Feb 2026",
    location: "Remote",
    points: [
      "Rebuilt the frontend as a multi-step React 18 + TypeScript web app that unified several third-party data APIs behind one interface layer.",
      "Added graceful fallbacks that kept the app usable when an upstream source was slow, flaky, or unavailable.",
      "Integrated Supabase Auth, Realtime, and Edge Functions to sync UI state across multi-step transactions per account.",
    ],
    stack: ["React 18", "TypeScript", "Supabase", "REST APIs"],
  },
  {
    company: "Xoriant Pvt. Ltd.",
    role: "Software Developer",
    period: "Jul 2021 – Jul 2023",
    location: "Pune, India",
    points: [
      "Built and maintained a React + TypeScript app that pulled data from multiple backend services, designing the GraphQL schemas and resolvers that merged them into a single client call.",
      "Created a reusable component library across 10+ shared UI modules, cutting code duplication by 30% and production bugs by 15%.",
      "Set up CI/CD pipelines with Jenkins, Docker, and GitHub Actions, cutting deploy time by 35%.",
    ],
    stack: ["React", "TypeScript", "GraphQL", "Node.js", "PostgreSQL", "CI/CD"],
  },
];

export const education = [
  {
    degree: "Master of Science in Computer Science",
    school: "Binghamton University, State University of New York",
    location: "Binghamton, NY",
    period: "Aug 2023 – Dec 2025",
    courses: [
      "Design and Analysis of Algorithms",
      "Distributed Systems",
      "Design Patterns",
      "Programming for the Web",
      "Computer Architecture and Organization",
      "Operating Systems",
    ],
  },
  {
    degree: "Bachelor of Engineering in Electronics and Telecommunications",
    school: "Savitribai Phule Pune University",
    location: "Pune, India",
    period: "Aug 2017 – Jul 2021",
    courses: [
      "Integrated Circuits",
      "Microcontrollers",
      "Analog and Digital Communication",
      "Electromagnetics",
      "Mechatronics",
      "VLSI Design and Technologies",
      "Computer Networks and Security",
      "Mobile Communication",
    ],
  },
];

export const projects = [
  {
    name: "AI Patient Voice Bot",
    points: [
      "Places real outbound calls to a healthcare voice agent and holds natural 1–3 minute conversations across 16 scripted personas",
      "Streams speech with Deepgram and drives dialogue with Llama on Groq, then records and transcribes each call into a bug report",
      "Locks the only dialable number in code, with a test suite covering that safety guard",
    ],
    stack: ["Python", "FastAPI", "Twilio", "Deepgram", "Groq", "Claude"],
    href: "https://github.com/hchitte2/pgai-voicebot",
  },
  {
    name: "Clearline — Loan Origination System",
    points: [
      "Built a mortgage CRM with a stage pipeline, a document needs list, and a no-login borrower upload link",
      "Enforced an append-only audit log with Postgres triggers that records who really acted during impersonation",
      "Runs at $0/month on Vercel, Neon, and Blob, with a deterministic seed and a daily demo reset",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Drizzle ORM", "Playwright"],
    href: "https://github.com/hchitte2/Loan-Origination-System-LOS-",
  },
  {
    name: "Kurious",
    points: [
      "Answers a kid's \"why?\" with one illustrated card, a short narrated paragraph, and \"But why?\" follow-ups",
      "Pairs a writer model with a second-provider checker to catch the misconceptions kids' explanations get wrong",
      "Built on the DeepSpace SDK with React and Vite, deployed to Cloudflare Workers",
    ],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Cloudflare Workers", "Playwright"],
    href: "https://github.com/hchitte2/kurious",
  },
  {
    name: "MCP Engineering Ops",
    points: [
      "Lets an LLM agent read a plain-English request and pick the right tool from 10 registered MCP tools at runtime",
      "Creates, updates, and assigns tickets through a FastMCP server with Pydantic-validated inputs",
      "Persists to SQLite with an audit log of every write",
    ],
    stack: ["Python", "Model Context Protocol", "FastMCP", "Google Gemini", "SQLite"],
    href: "https://github.com/hchitte2/mcp-engineering-ops",
  },
  {
    name: "FinQA RAG Chatbot",
    points: [
      "Answers numeric questions from financial filings by chunking and embedding documents into FAISS",
      "Retries with a rewritten query when retrieval looks weak so the model doesn't invent numbers",
      "Evaluated on the FinQA benchmark with the LLM provider swappable between OpenAI and self-hosted vLLM",
    ],
    stack: ["Python", "LangGraph", "LangChain", "OpenAI", "FAISS", "vLLM"],
    href: "https://github.com/hchitte2/finqa-rag",
  },
  {
    name: "LLM-Powered Support Apps",
    points: [
      "Theme-park support chatbot that keeps context across multi-turn sessions using templated system prompts and response-ID chaining",
      "Review summarizer that pulls product reviews from a database and distills them into key positive and negative themes",
      "Caches summaries in the database so repeat requests skip the LLM",
    ],
    stack: ["Node.js", "Bun", "React", "OpenAI API", "SQL"],
    href: "https://github.com/hchitte2/Build-AI-Powered-Apps",
  },
  {
    name: "AI Agents for Beginners — Microsoft Open Source",
    points: [
      "Built multi-agent prototypes with Azure AI Foundry and Semantic Kernel to automate real-world workflows",
      "Designed orchestration patterns that cut manual knowledge retrieval by 40% and lifted response relevance by 30%",
    ],
    stack: ["Python", "Azure AI Foundry", "Semantic Kernel"],
  },
  {
    name: "AI-Powered Job Board Platform",
    points: [
      "Led Next.js front-end development for an AI job-matching system that cut average search time by 40%",
      "Built a real-time application tracking dashboard with live status updates and scheduling",
      "Integrated AI-driven resume scoring that raised application success rates by 25%",
    ],
    stack: ["Next.js", "React", "TypeScript", "AI Resume Scoring"],
  },
  {
    name: "MLOps Pipeline with Vertex AI",
    points: [
      "Automated an end-to-end MLOps pipeline with Vertex AI, Kubeflow, and CI/CD, reaching 85%+ accuracy on e-commerce predictions",
      "Deployed ML microservices with FastAPI on Vertex AI endpoints",
      "Built a Gemini + Flet conversational UI so non-technical users can query the models directly",
    ],
    stack: ["Vertex AI", "Kubeflow", "FastAPI", "Gemini", "Flet", "Docker"],
  },
];

export const skills = [
  {
    group: "Languages",
    items: ["JavaScript (ES6+)", "TypeScript", "Python", "Go", "C", "Java"],
  },
  {
    group: "Frontend",
    items: [
      "React",
      "Next.js",
      "Redux",
      "Zustand",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
      "GraphQL",
      "DOM",
    ],
  },
  {
    group: "Backend & DevOps",
    items: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "Webhooks",
      "PostgreSQL",
      "Supabase",
      "MongoDB",
      "MySQL",
      "Docker",
      "CI/CD",
      "Webpack",
    ],
  },
  {
    group: "AI Development",
    items: [
      "Claude Code",
      "Model Context Protocol",
      "LangChain",
      "LangGraph",
      "vLLM",
      "PyTorch",
      "TensorFlow",
    ],
  },
  {
    group: "Cloud & Tools",
    items: [
      "GCP",
      "Firebase",
      "GitHub / GitHub Actions",
      "Bitbucket",
      "Playwright",
      "Mocha",
      "Google Analytics",
      "SEO",
      "Accessibility",
      "Cloud Monitoring",
    ],
  },
];
