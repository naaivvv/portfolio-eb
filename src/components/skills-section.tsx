import { motion } from "framer-motion";
import antigravityIcon from "@/assets/icons/antigravity.svg";
import lovableIcon from "@/assets/icons/lovable.svg";
import powerbiIcon from "@/assets/icons/powerbi.svg";
import vscodeIcon from "@/assets/icons/vscode.svg";
import codexIcon from "@/assets/icons/codex.svg";
import openaiIcon from "@/assets/icons/openai.svg";

interface SkillsSectionProps {
  isDark: boolean;
}

type Skill = {
  name: string;
  color: string;
} & ({ cdn: string; local?: never } | { local: string; cdn?: never });

const skillCategories: { title: string; skills: Skill[] }[] = [
  {
    title: "AI & Data",
    skills: [
      { name: "Antigravity", local: antigravityIcon, color: "#4285F4" },
      { name: "Claude Code", cdn: "claude", color: "#D97757" },
      { name: "Codex", local: codexIcon, color: "#FFFFFF" },
      { name: "CrewAI", cdn: "crewai", color: "#FF4A00" },
      { name: "LangChain", cdn: "langchain", color: "#FFFFFF" },
      { name: "ElevenLabs", cdn: "elevenlabs", color: "#FFFFFF" },
      { name: "Ollama", cdn: "ollama", color: "#FFFFFF" },
      { name: "OpenAI", local: openaiIcon, color: "#FFFFFF" },
      { name: "Python", cdn: "python", color: "#3776AB" },
      { name: "PyTorch", cdn: "pytorch", color: "#EE4C2C" },
      { name: "TensorFlow", cdn: "tensorflow", color: "#FF6F00" },
      { name: "OpenCV", cdn: "opencv", color: "#5C3EE8" },
      { name: "Power BI", local: powerbiIcon, color: "#F2C811" },
    ]
  },
  {
    title: "Frontend & Mobile",
    skills: [
      { name: "React", cdn: "react", color: "#61DAFB" },
      { name: "Next.js", cdn: "nextdotjs", color: "#FFFFFF" },
      { name: "Tailwind CSS", cdn: "tailwindcss", color: "#06B6D4" },
      { name: "Vite", cdn: "vite", color: "#646CFF" },
      { name: "Flutter", cdn: "flutter", color: "#02569B" },
    ]
  },
  {
    title: "Backend & Cloud",
    skills: [
      { name: "Node.js", cdn: "nodedotjs", color: "#5FA04E" },
      { name: "PHP", cdn: "php", color: "#777BB4" },
      { name: "Laravel", cdn: "laravel", color: "#FF2D20" },
      { name: "MySQL", cdn: "mysql", color: "#4479A1" },
      { name: "Supabase", cdn: "supabase", color: "#3FCF8E" },
      { name: "Firebase", cdn: "firebase", color: "#DD2C00" },
      { name: "Docker", cdn: "docker", color: "#2496ED" },
      { name: "Vercel", cdn: "vercel", color: "#FFFFFF" },
      { name: "Render", cdn: "render", color: "#FFFFFF" },
      { name: "Linux", cdn: "linux", color: "#FCC624" },
    ]
  },
  {
    title: "Embedded & Hardware",
    skills: [
      { name: "C++", cdn: "cplusplus", color: "#00599C" },
      { name: "Arduino", cdn: "arduino", color: "#00878F" },
      { name: "ESP32", cdn: "espressif", color: "#E7352C" },
      { name: "Raspberry Pi", cdn: "raspberrypi", color: "#A22846" },
    ]
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "TypeScript", cdn: "typescript", color: "#3178C6" },
      { name: "Git", cdn: "git", color: "#F05032" },
      { name: "GitHub", cdn: "github", color: "#FFFFFF" },
      { name: "VS Code", local: vscodeIcon, color: "#007ACC" },
      { name: "Cursor", cdn: "cursor", color: "#FFFFFF" },
      { name: "Figma", cdn: "figma", color: "#F24E1E" },
      { name: "Google Stitch", cdn: "google", color: "#4285F4" },
      { name: "Lovable", local: lovableIcon, color: "#FF5757" },
      { name: "N8n", cdn: "n8n", color: "#EA4B71" },
      { name: "Shopify", cdn: "shopify", color: "#7AB55C" },
    ]
  }
];

const SIMPLE_ICONS_CDN = "https://cdn.simpleicons.org";

function getIconSrc(skill: Skill, isDark: boolean): string {
  if (skill.local) return skill.local;
  const color = (!isDark && skill.color === "#FFFFFF") ? "333333" : skill.color.replace("#", "");
  return `${SIMPLE_ICONS_CDN}/${skill.cdn}/${color}`;
}

export default function SkillsSection({ isDark }: SkillsSectionProps) {
  return (
    <section id="skills" className="relative w-full min-h-screen overflow-hidden bg-transparent py-20 border-t-8 border-b-8 border-[var(--foreground)]">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header — center-aligned neo-brutalist */}
        <div className="mb-16 md:mb-20 text-center">
          <h2 className="font-[var(--font-display)] text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4">
            <span style={{ color: "var(--foreground)" }}>TECH</span><br />
            <span style={{ color: "var(--primary)" }}>ARSENAL</span>
          </h2>
          <p className="text-sm sm:text-base max-w-xl mx-auto font-medium uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>
            Tools, frameworks, and platforms I build with.
          </p>
        </div>

        <div className="flex flex-col gap-16">
          {skillCategories.map((category, catIndex) => (
            <motion.div 
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="bg-[var(--background)] border-4 border-[var(--foreground)] p-6 md:p-10 shadow-[8px_8px_0_var(--foreground)]"
            >
              <h3 className="font-[var(--font-display)] text-3xl font-black uppercase tracking-tighter mb-8 border-b-4 border-[var(--foreground)] pb-4 inline-block text-[var(--foreground)]">
                {category.title}
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {category.skills.map((skill, i) => (
                  <div
                    key={skill.name}
                    className="group relative flex flex-col items-center justify-center gap-4 p-6 border-4 border-[var(--foreground)] bg-[var(--card)] shadow-[4px_4px_0_var(--foreground)] hover:shadow-[0_0_0_var(--foreground)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200 cursor-pointer animate-fade-up opacity-0"
                    style={{
                      animationDelay: `${(i % 12) * 50 + 100}ms`,
                    }}
                  >
                    <img
                      src={getIconSrc(skill, isDark)}
                      alt={skill.name}
                      className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                      draggable={false}
                    />
                    <span
                      className="font-[var(--font-display)] text-xs font-bold uppercase tracking-widest text-center leading-tight text-[var(--foreground)]"
                    >
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
