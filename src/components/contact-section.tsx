import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";

// Custom SVG icons for brand logos (lucide-react dropped brand icons)
const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const FacebookIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);


const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/naaivvv",
    icon: GithubIcon,
    color: "var(--foreground)",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/edwinbayog07/",
    icon: LinkedinIcon,
    color: "var(--secondary)",
  },
  {
    label: "Email",
    href: "mailto:edwinbayog22@gmail.com",
    icon: Mail,
    color: "var(--primary)",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/naaaivvv/",
    icon: FacebookIcon,
    color: "var(--accent)",
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative w-full min-h-screen overflow-hidden bg-transparent flex flex-col justify-center">
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pointer-events-none">
        <div className="pointer-events-auto">
          {/* Big CONNECT Header */}
          <motion.div
            className="w-full flex justify-center mb-16 sm:mb-24"
            initial={{ opacity: 0, y: 50, rotate: -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut", type: "spring", stiffness: 100 }}
          >
            <h1 
              className="font-[var(--font-display)] text-[16vw] sm:text-[14vw] md:text-[12vw] font-black uppercase tracking-tighter leading-none m-0 p-0 text-[var(--foreground)]"
              style={{ textShadow: "8px 8px 0 var(--brutal-shadow), 16px 16px 0 var(--muted)" }}
            >
              CONNECT
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 items-center">
            {/* Left Content / Text & CTA */}
            <motion.div
              className="lg:col-span-2 flex flex-col gap-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            >
              <div 
                className="p-6 sm:p-8 bg-[var(--card)] border-[3px] sm:border-4"
                style={{ 
                  borderColor: "var(--brutal-border)", 
                  boxShadow: "8px 8px 0 var(--brutal-shadow-strong)" 
                }}
              >
                <h3 className="font-[var(--font-display)] text-2xl sm:text-3xl font-bold mb-4 text-[var(--foreground)] leading-tight">
                  Let's Build Something <span className="text-[var(--primary)] underline decoration-[var(--primary)] decoration-4 underline-offset-4">Extraordinary</span>
                </h3>
                <p className="text-base sm:text-lg font-medium text-[var(--muted-foreground)] mb-8">
                  Whether it's an Edge AI prototype, an automated workflow, or a full-stack web application — I'm always open to challenging projects and collaborations.
                </p>

                <a href="mailto:edwinbayog22@gmail.com" className="inline-block w-full focus:outline-none focus:ring-4 focus:ring-[var(--brutal-shadow)]">
                  <button 
                    className="w-full py-4 px-6 bg-[var(--primary)] text-[var(--primary-foreground)] font-[var(--font-display)] font-bold text-lg sm:text-xl uppercase tracking-wider flex items-center justify-center gap-3 border-[3px] transition-all hover:-translate-y-1 active:translate-y-1"
                    style={{ 
                      borderColor: "var(--brutal-border)", 
                      boxShadow: "6px 6px 0 var(--brutal-shadow)",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.boxShadow = "10px 10px 0 var(--brutal-shadow)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.boxShadow = "6px 6px 0 var(--brutal-shadow)";
                    }}
                    onMouseDown={(e) => {
                      e.currentTarget.style.boxShadow = "0px 0px 0 var(--brutal-shadow)";
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.boxShadow = "10px 10px 0 var(--brutal-shadow)";
                    }}
                  >
                    <Mail strokeWidth={2.5} /> GET IN TOUCH <ArrowUpRight strokeWidth={2.5} />
                  </button>
                </a>
              </div>
            </motion.div>

            {/* Right Content / Social Cards */}
            <motion.div
              className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            >
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-6 bg-[var(--background)] border-[3px] transition-all hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-[var(--primary)]"
                  style={{ 
                    borderColor: "var(--brutal-border)", 
                    boxShadow: "8px 8px 0 var(--brutal-shadow)",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.boxShadow = "12px 12px 0 var(--brutal-shadow-strong)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.boxShadow = "8px 8px 0 var(--brutal-shadow)";
                  }}
                >
                  <div className="flex justify-between items-start mb-12">
                    <div 
                      className="p-3 bg-[var(--card)] border-[3px] transition-transform group-hover:scale-110 group-hover:rotate-3"
                      style={{ 
                        borderColor: "var(--brutal-border)", 
                        color: link.color,
                        boxShadow: "4px 4px 0 var(--brutal-shadow)"
                      }}
                    >
                      <link.icon size={32} />
                    </div>
                    <div 
                      className="p-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0"
                    >
                      <ArrowUpRight size={24} strokeWidth={3} />
                    </div>
                  </div>
                  <h4 className="font-[var(--font-display)] text-2xl font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                    {link.label}
                  </h4>
                </a>
              ))}
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div
            className="mt-24 sm:mt-32 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 border-t-[3px]"
            style={{ borderColor: "var(--brutal-border)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
          >
            <div 
              className="px-4 py-2 bg-[var(--card)] border-[3px] font-bold text-sm sm:text-base text-[var(--foreground)]"
              style={{ 
                borderColor: "var(--brutal-border)",
                boxShadow: "4px 4px 0 var(--brutal-shadow)"
              }}
            >
              © {new Date().getFullYear()} EDWIN JR. P. BAYOG
            </div>
            <div 
              className="px-4 py-2 bg-[var(--muted)] border-[3px] font-bold text-xs sm:text-sm text-[var(--foreground)] hidden sm:block"
              style={{ 
                borderColor: "var(--brutal-border)",
                boxShadow: "4px 4px 0 var(--brutal-shadow)"
              }}
            >
              REACT · TYPESCRIPT · TAILWIND CSS
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
