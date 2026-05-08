import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    period: "Apr 2026 – Jun 2026",
    role: "AI/IoT Engineering Intern",
    company: "Clever Minds Digital Solutions",
    highlights: [
      "Developed AI-driven IoT solutions and automation workflows",
      "Integrated agentic AI tools for intelligent system prototyping",
      "Collaborated on edge computing deployments and smart device integrations",
    ],
    tags: ["AI/IoT", "Edge Computing", "Agentic AI", "Automation"],
    accentColor: "var(--primary)",
  },
  {
    period: "Oct 2024 – Present",
    role: "Freelance Technical Consultant",
    company: "R&D — Independent",
    highlights: [
      "Architecting comprehensive thesis systems for Master's degree clients",
      "IoT-Based Wireless Control System for Legacy Vehicles via Mobile App",
      "Industrial Stack Gas Analyzer with real-time sensor integration",
      "Embedded systems design and AI-powered solution prototyping",
    ],
    tags: ["Embedded Systems", "AI/ML", "IoT", "R&D"],
    accentColor: "var(--secondary)",
  },
  {
    period: "Jul 2024 – Sep 2024",
    role: "System Developer & Data Analyst Intern",
    company: "yieldWerx Semiconductor",
    highlights: [
      "Designed data-driven software solutions for operational reporting accuracy",
      "Performed SQL database troubleshooting and query optimization",
      "Reduced query latency and ensured data integrity across systems",
    ],
    tags: ["SQL", "Data Analysis", "Python", "Reporting"],
    accentColor: "var(--secondary)",
  },
  {
    period: "Sep 2023 – Apr 2024",
    role: "Shopify Web Developer & Technical VA",
    company: "LuxeEclat",
    highlights: [
      "Managed backend configurations and web content for e-commerce platform",
      "Ensured technical deliverables aligned with business requirements",
      "Implemented responsive designs and optimized storefront performance",
    ],
    tags: ["Shopify", "Web Dev", "E-commerce", "Technical VA"],
    accentColor: "var(--accent)",
  },
  {
    period: "Jul 2023 – Aug 2023",
    role: "IT Support Intern",
    company: "Bacolod City Government (MITCS)",
    highlights: [
      "Provided frontline technical assistance for municipal operations",
      "Hardware troubleshooting and system maintenance",
      "Supported daily IT infrastructure needs across departments",
    ],
    tags: ["IT Support", "Hardware", "Networking"],
    accentColor: "var(--secondary)",
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative w-full min-h-screen overflow-hidden bg-transparent">
      <div className="relative z-10 max-w-6xl mx-auto section-padding pointer-events-none">
        <div className="pointer-events-auto">
        {/* Section Header */}
        <motion.div
          className="text-right mb-16 md:mb-20"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="font-[var(--font-display)] text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter leading-none">
            <span style={{ color: "var(--foreground)" }}>WORK</span><br />
            <span style={{ color: "var(--primary)" }}>EXPERIENCE</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div
            className="absolute left-4 md:left-8 top-0 bottom-0 border-l-4 border-[var(--border)]"
          />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                className="relative pl-12 md:pl-20"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.15 }}
              >
                {/* Timeline Dot */}
                <div
                  className="absolute left-[7px] md:left-[23px] top-2 w-4 h-4 rounded-none border-4"
                  style={{
                    borderColor: exp.accentColor,
                    background: "var(--background)",
                    boxShadow: `2px 2px 0 var(--brutal-shadow)`,
                  }}
                />

                {/* Card */}
                <div className="bg-[var(--card)] border-4 border-[var(--border)] rounded-none p-6 shadow-[8px_8px_0_var(--brutal-shadow)] transition-all duration-300 hover:shadow-[12px_12px_0_var(--primary)] hover:-translate-y-1 hover:-translate-x-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <Briefcase size={14} style={{ color: exp.accentColor }} />
                      <span className="text-xs font-medium tracking-wider uppercase" style={{ color: exp.accentColor }}>
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold font-[var(--font-display)] tracking-wide mb-1" style={{ color: "var(--foreground)" }}>
                    {exp.role}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: "var(--muted-foreground)" }}>
                    {exp.company}
                  </p>

                  <ul className="space-y-2 mb-4">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="text-sm flex items-start gap-2" style={{ color: "var(--muted-foreground)" }}>
                        <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: exp.accentColor }} />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
