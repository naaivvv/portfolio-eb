import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Award,
  BookOpen,
  Cpu,
  Sparkles,
  ShieldCheck,
  Trophy,
  Languages,
  MapPin,
  Code2,
  Calendar,
} from "lucide-react";
import portraitImg from "@/assets/portrait.png";

const quickStats = [
  { label: "Years Experience", value: "3+", icon: Sparkles },
  { label: "Projects Delivered", value: "10+", icon: Cpu },
  { label: "DOST Scholar", value: "✓", icon: Award },
];

interface Certification {
  title: string;
  issuer: string;
  date: string;
  variant: "default" | "secondary" | "accent" | "outline";
}

const certifications: Certification[] = [
  // Technical Certifications
  { title: "Certified Google AI Professional", issuer: "Google", date: "May 2026", variant: "accent" },
  { title: "Vibe Coding — L2: Silver", issuer: "Lovable", date: "Mar 2026", variant: "accent" },
  { title: "Career Accelerator: Technical Skills That Actually Matter", issuer: "TUP", date: "Feb 2026", variant: "accent" },
  { title: "The Multi-Hyphenate Engineer — Beyond the Code", issuer: "TUP", date: "Mar 2026", variant: "accent" },
  { title: "Digital Footprint: Impact of CpE on Modern Society", issuer: "TUP", date: "Feb 2026", variant: "accent" },
  { title: "GIS Techniques & Spatial Data Analysis", issuer: "ICpEP.se-R6", date: "Mar 2023", variant: "accent" },

  // Awards & Honors
  { title: "2× DepEd Division Technolympics Web Page Designing Contest Champion", issuer: "DepEd", date: "", variant: "default" },
  { title: "Class Valedictorian (JHS & SHS)", issuer: "Academic", date: "", variant: "default" },
  { title: "DOST-SEI JLSS Scholar", issuer: "DOST", date: "", variant: "default" },

  // Language & Proficiency
  { title: "HSK Level 4 — Chinese Proficiency", issuer: "CLEC", date: "Dec 2021", variant: "secondary" },

  // Community & Events
  { title: "Google DevFest Attendee", issuer: "GDG", date: "Oct 2023", variant: "outline" },
  { title: "STEM Capstone Research Consultant", issuer: "Academic", date: "", variant: "outline" },
];

const education = [
  {
    degree: "BS Computer Engineering",
    school: "Technological University of the Philippines - Visayas",
    period: "2022 – Present",
    detail: "Thesis: KidSentry — Hybrid Edge-Cloud AI",
    color: "var(--primary)",
    icon: GraduationCap,
  },
  {
    degree: "Mandarin Language Program",
    school: "Beijing Language & Culture Univ.",
    period: "2021 – 2022",
    detail: "HSK4 Proficiency Achieved",
    color: "var(--accent)",
    icon: Languages,
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full min-h-screen overflow-hidden bg-transparent">
      <div className="relative z-10 max-w-6xl mx-auto section-padding pointer-events-none">
        <div className="pointer-events-auto">
          {/* Section Header */}
          <motion.div
            className="text-left mb-16 md:mb-20"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2
              className="font-[var(--font-display)] text-6xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter leading-none"
              style={{ color: "var(--foreground)" }}
            >
              ABOUT<br />
              <span style={{ color: "var(--primary)" }}>ME</span>
            </h2>
          </motion.div>

          {/* ─── Top Row: Portrait + Summary ─── */}
          <motion.div
            className="grid lg:grid-cols-12 gap-8 mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            {/* Portrait Card */}
            <div className="lg:col-span-4 flex">
              <div
                className="relative bg-[var(--card)] border-4 border-[var(--border)] p-1.5 shadow-[8px_8px_0_var(--brutal-shadow)] rounded-none w-full"
              >
                <img
                  src={portraitImg}
                  alt="Edwin Jr. P. Bayog — Computer Engineer"
                  className="w-full h-full object-cover rounded-none"
                  loading="lazy"
                  width={280}
                  height={373}
                />
                {/* Overlay info strip */}
                <div
                  className="absolute bottom-2 left-2 right-2 border-2 border-white px-4 py-3 flex items-center gap-3 rounded-none"
                  style={{
                    background: "var(--foreground)",
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold truncate" style={{ color: "var(--background)" }}>
                      Edwin Jr. P. Bayog
                    </div>
                    <div className="text-xs font-medium truncate" style={{ color: "var(--background)" }}>
                      Computer Engineer
                    </div>
                  </div>
                  <div
                    className="w-3 h-3 border-2 border-white rounded-none shrink-0 animate-glow-pulse"
                    style={{ background: "var(--primary)" }}
                  />
                </div>
              </div>
            </div>

            {/* Summary + Stats */}
            <div className="lg:col-span-8 flex flex-col justify-between gap-6">
              <div className="bg-[var(--card)] border-4 border-[var(--border)] p-8 rounded-none shadow-[8px_8px_0_var(--brutal-shadow)]">
                <p className="text-base leading-relaxed mb-6 font-medium" style={{ color: "var(--foreground)" }}>
                  Versatile Computer Engineer skilled in bridging the gap between hardware and software development.
                  Specialized in creating intelligent applications that analyze data and automate tasks to improve
                  safety and decision-making. Strong background in research and development, with a track record
                  of delivering successful projects in dynamic, fast-paced environments.
                </p>
                <p className="text-base leading-relaxed font-medium" style={{ color: "var(--foreground)" }}>
                  Currently pursuing a{" "}
                  <span className="font-bold underline decoration-4 underline-offset-4" style={{ decorationColor: "var(--primary)", color: "var(--secondary)" }}>BS in Computer Engineering</span> at
                  Technological University of the Philippines - Visayas while actively taking on freelance R&D consulting work — architecting thesis systems
                  involving embedded AI, IoT automation, and intelligent monitoring solutions.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {quickStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center p-4 bg-[var(--card)] border-4 border-[var(--border)] rounded-none shadow-[4px_4px_0_var(--brutal-shadow)] transition-all duration-300 hover:shadow-[8px_8px_0_var(--primary)] hover:-translate-y-1 hover:-translate-x-1"
                  >
                    <stat.icon size={24} className="mx-auto mb-3" style={{ color: "var(--primary)" }} />
                    <div className="text-3xl font-black font-[var(--font-display)]" style={{ color: "var(--foreground)" }}>
                      {stat.value}
                    </div>
                    <div className="text-xs font-bold uppercase mt-1 tracking-wider" style={{ color: "var(--foreground)" }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ─── Bottom Row: Education + Certifications ─── */}
          <motion.div
            className="grid lg:grid-cols-12 gap-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            {/* Education */}
            <div className="lg:col-span-5">
              <div className="bg-[var(--card)] border-4 border-[var(--border)] rounded-none p-6 shadow-[8px_8px_0_var(--brutal-shadow)] h-full">
                <h3
                  className="font-[var(--font-display)] text-sm font-semibold tracking-widest uppercase mb-6 flex items-center gap-2"
                  style={{ color: "var(--secondary)" }}
                >
                  <GraduationCap size={16} /> Education
                </h3>
                <div className="space-y-5">
                  {education.map((edu) => (
                    <div key={edu.degree} className="relative border-l-2 pl-5" style={{ borderColor: edu.color }}>
                      <div className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                        {edu.degree}
                      </div>
                      <div className="text-xs flex items-center gap-1 mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                        <MapPin size={10} className="shrink-0" />
                        {edu.school}
                      </div>
                      <div className="text-xs flex items-center gap-1 mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                        <Calendar size={10} className="shrink-0" />
                        {edu.period}
                      </div>
                      <div
                        className="text-xs mt-2 px-2.5 py-1 rounded-md inline-block"
                        style={{
                          color: "var(--foreground)",
                          background: "var(--surface-subtle)",
                          border: "1px solid var(--border-subtle)",
                        }}
                      >
                        {edu.detail}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Certifications & Awards */}
            <div className="lg:col-span-7">
              <div className="bg-[var(--card)] border-4 border-[var(--border)] rounded-none p-6 shadow-[8px_8px_0_var(--brutal-shadow)] h-full">
                <h3
                  className="font-[var(--font-display)] text-sm font-semibold tracking-widest uppercase mb-6 flex items-center gap-2"
                  style={{ color: "var(--secondary)" }}
                >
                  <BookOpen size={16} /> Certifications & Awards
                </h3>

                {/* Category legend */}
                <div className="flex flex-wrap gap-3 mb-5">
                  <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--muted-foreground)" }}>
                    <ShieldCheck size={12} style={{ color: "var(--accent)" }} />
                    <span>Technical</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--muted-foreground)" }}>
                    <Trophy size={12} style={{ color: "var(--primary)" }} />
                    <span>Awards</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--muted-foreground)" }}>
                    <Languages size={12} style={{ color: "var(--secondary)" }} />
                    <span>Language</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--muted-foreground)" }}>
                    <Code2 size={12} style={{ color: "var(--foreground)" }} />
                    <span>Community</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {certifications.map((cert) => (
                    <Badge
                      key={cert.title}
                      variant={cert.variant}
                      className="text-xs font-bold py-1 px-3 cursor-default transition-all duration-200 border-2 shadow-[2px_2px_0_var(--brutal-shadow)] hover:shadow-[4px_4px_0_var(--primary)] hover:-translate-y-0.5"
                      title={cert.date ? `${cert.issuer} · ${cert.date}` : cert.issuer}
                    >
                      {cert.title}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
