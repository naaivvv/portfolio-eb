import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, Sun, Moon } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

interface NavbarProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const isDark = theme === "dark";

  return (
    <nav
      className={cn(
        "fixed z-50 transition-all duration-300 left-0 right-0 mx-auto w-full md:w-[calc(100%-2rem)] max-w-6xl",
        scrolled
          ? "top-2 bg-[var(--background)] border-4 border-[var(--border)] shadow-[8px_8px_0_var(--brutal-shadow)] rounded-none"
          : "top-0 bg-transparent border-4 border-transparent shadow-none"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#"
            className="font-[var(--font-display)] text-lg font-bold tracking-wider"
            style={{ color: "var(--primary)" }}
          >
            EB<span className="text-[var(--secondary)]">.</span>
          </a>

          {/* Desktop Links + Theme Toggle */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-bold uppercase transition-all duration-200",
                  scrolled
                    ? cn(
                        "border-2",
                        activeSection === link.href
                          ? "text-[var(--primary-foreground)] bg-[var(--primary)] border-[var(--border)] shadow-[4px_4px_0_var(--brutal-shadow)]"
                          : "text-[var(--foreground)] bg-transparent border-transparent hover:bg-[var(--card)] hover:border-[var(--border)] hover:shadow-[4px_4px_0_var(--brutal-shadow)] hover:-translate-y-0.5 hover:-translate-x-0.5"
                      )
                    : cn(
                        "rounded-md border-2 border-transparent hover:bg-[var(--surface-subtle)]",
                        activeSection === link.href ? "text-[var(--primary)]" : "text-[var(--foreground)]"
                      )
                )}
              >
                {link.label}
              </a>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={cn(
                "ml-2 p-2 transition-all duration-200 cursor-pointer",
                scrolled
                  ? "bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] shadow-[4px_4px_0_var(--brutal-shadow)] hover:shadow-[6px_6px_0_var(--primary)] hover:-translate-y-0.5 hover:-translate-x-0.5"
                  : "bg-transparent border-2 border-transparent text-[var(--foreground)] hover:bg-[var(--surface-subtle)] rounded-lg"
              )}
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile: Theme Toggle + Hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={cn(
                "p-2 transition-all duration-200 cursor-pointer",
                scrolled
                  ? "bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] shadow-[4px_4px_0_var(--brutal-shadow)] hover:shadow-[6px_6px_0_var(--primary)] hover:-translate-y-0.5 hover:-translate-x-0.5"
                  : "bg-transparent border-2 border-transparent text-[var(--foreground)] hover:bg-[var(--surface-subtle)] rounded-lg"
              )}
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              className={cn(
                "p-2 transition-all duration-200 cursor-pointer",
                scrolled
                  ? "bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] shadow-[4px_4px_0_var(--brutal-shadow)] hover:shadow-[6px_6px_0_var(--primary)] hover:-translate-y-0.5 hover:-translate-x-0.5"
                  : "bg-transparent border-2 border-transparent text-[var(--foreground)] hover:bg-[var(--surface-subtle)] rounded-lg"
              )}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[var(--background)] border-b-4 border-x-4 border-[var(--border)] shadow-[8px_8px_0_var(--brutal-shadow)] animate-fade-in mx-2 mt-2 p-2">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block px-4 py-3 text-sm font-bold uppercase transition-all duration-200 border-2 mb-2",
                  activeSection === link.href
                    ? "text-[var(--primary-foreground)] bg-[var(--primary)] border-[var(--border)] shadow-[4px_4px_0_var(--brutal-shadow)]"
                    : "text-[var(--foreground)] bg-transparent border-transparent hover:bg-[var(--card)] hover:border-[var(--border)] hover:shadow-[4px_4px_0_var(--brutal-shadow)] hover:-translate-y-0.5 hover:-translate-x-0.5"
                )}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
