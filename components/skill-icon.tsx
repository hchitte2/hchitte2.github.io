import {
  Accessibility,
  Activity,
  Box,
  Cloud,
  Code,
  Cpu,
  Database,
  FileText,
  GitMerge,
  LayoutTemplate,
  Layers,
  Network,
  Phone,
  Search,
  Sparkles,
  TestTube,
  Webhook,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import {
  siBitbucket,
  siBun,
  siC,
  siClaude,
  siCloudflareworkers,
  siCss,
  siDeepgram,
  siDocker,
  siDrizzle,
  siExpress,
  siFastapi,
  siFirebase,
  siGithub,
  siGo,
  siGoogleanalytics,
  siGooglecloud,
  siGooglegemini,
  siGraphql,
  siHtml5,
  siJavascript,
  siLangchain,
  siLanggraph,
  siMocha,
  siModelcontextprotocol,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siOpenjdk,
  siPostgresql,
  siPython,
  siPytorch,
  siReact,
  siRedux,
  siSqlite,
  siSupabase,
  siTailwindcss,
  siTensorflow,
  siTypescript,
  siVite,
  siVllm,
  siWebpack,
  type SimpleIcon,
} from "simple-icons";
import { cn } from "@/lib/utils";

// Brand logos from simple-icons, keyed by the exact strings used in lib/data.ts.
const BRANDS: Record<string, SimpleIcon> = {
  "JavaScript (ES6+)": siJavascript,
  TypeScript: siTypescript,
  Python: siPython,
  Go: siGo,
  C: siC,
  Java: siOpenjdk,
  React: siReact,
  "React 18": siReact,
  "Next.js": siNextdotjs,
  Redux: siRedux,
  "Tailwind CSS": siTailwindcss,
  HTML5: siHtml5,
  CSS3: siCss,
  GraphQL: siGraphql,
  "Node.js": siNodedotjs,
  "Express.js": siExpress,
  PostgreSQL: siPostgresql,
  Supabase: siSupabase,
  MongoDB: siMongodb,
  MySQL: siMysql,
  Docker: siDocker,
  Webpack: siWebpack,
  "Claude Code": siClaude,
  Claude: siClaude,
  "Model Context Protocol": siModelcontextprotocol,
  FastMCP: siModelcontextprotocol,
  LangChain: siLangchain,
  LangGraph: siLanggraph,
  vLLM: siVllm,
  PyTorch: siPytorch,
  TensorFlow: siTensorflow,
  GCP: siGooglecloud,
  "Vertex AI": siGooglecloud,
  Firebase: siFirebase,
  "GitHub / GitHub Actions": siGithub,
  Bitbucket: siBitbucket,
  Mocha: siMocha,
  "Google Analytics": siGoogleanalytics,
  FastAPI: siFastapi,
  Deepgram: siDeepgram,
  "Google Gemini": siGooglegemini,
  Gemini: siGooglegemini,
  SQLite: siSqlite,
  Bun: siBun,
  Vite: siVite,
  "Cloudflare Workers": siCloudflareworkers,
  "Drizzle ORM": siDrizzle,
};

// Concepts, and brands simple-icons doesn't carry, get a descriptive generic icon instead.
const GENERIC: Record<string, LucideIcon> = {
  DOM: Code,
  "REST APIs": Network,
  Webhooks: Webhook,
  "CI/CD": GitMerge,
  SEO: Search,
  Accessibility: Accessibility,
  "Cloud Monitoring": Activity,
  Zustand: Layers,
  Playwright: TestTube,
  SQL: Database,
  FAISS: Search,
  OpenAI: Sparkles,
  "OpenAI API": Sparkles,
  Twilio: Phone,
  Groq: Cpu,
  "Semantic Kernel": Cpu,
  "Azure AI Foundry": Cloud,
  Kubeflow: Workflow,
  Flet: LayoutTemplate,
  "AI Resume Scoring": FileText,
};

/**
 * Small single-colour logo for a skill or stack tag. Uses `currentColor`, so it follows the
 * pill's text colour (including the selected and hover states) instead of brand colours.
 * Unknown names fall back to a neutral box rather than rendering nothing.
 */
export function SkillIcon({ name, className }: { name: string; className?: string }) {
  const brand = BRANDS[name];
  const size = cn("size-3.5 shrink-0", className);

  if (brand) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={size}>
        <path d={brand.path} />
      </svg>
    );
  }

  const Icon = GENERIC[name] ?? Box;
  return <Icon aria-hidden="true" className={size} />;
}
