import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Bot, User, Paperclip, ArrowUp, CodeXml, Rocket, FileUp, Image as ImageIcon, X, RotateCcw, Shapes, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { fetchAIResponse, type ChatMessage } from "@/lib/ai-service";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import { Sketch } from "@/components/ui/generative-geometry";

interface Message {
  id: number;
  role: "user" | "ai";
  content: string;
}

interface HeroSectionProps {
  isDark: boolean;
}

function formatMessageContent(content: string) {
  // Extract attached document if present
  const docMatch = content.match(/\[Attached Document: (.*?)\]\n([\s\S]*)$/);
  let mainContent = content;
  let attachedFileName = null;

  if (docMatch) {
    mainContent = content.substring(0, docMatch.index).trim();
    attachedFileName = docMatch[1];
    if (!mainContent) {
      mainContent = `Uploaded a document`;
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="chat-markdown">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {mainContent}
        </ReactMarkdown>
      </div>
      {attachedFileName && (
        <div
          className="flex items-center gap-2 mt-1 px-3 py-1.5 rounded-lg w-fit"
          style={{
            background: "var(--surface-subtle)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <FileUp size={14} className="opacity-70" />
          <span className="text-xs opacity-70">{attachedFileName}</span>
        </div>
      )}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 py-2">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: "var(--primary)",
              animation: `typing-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function HeroSection({ isDark }: HeroSectionProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [attachedFile, setAttachedFile] = useState<{ name: string; content: string } | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Lenis integration for consistent smooth scrolling
  const lenis = useLenis();

  // Scroll-driven parallax: track hero section scroll progress
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Map scroll progress to opacity (1 → 0) and y-drift (0 → 150px)
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setAttachedFile({
        name: file.name,
        content: event.target?.result as string,
      });
    };
    reader.readAsText(file);
    // Reset input so the same file can be uploaded again if removed
    e.target.value = '';
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      // Chat container is an internal overflow div, not managed by Lenis.
      // Use native scrollTo to keep the chat scrolled to the bottom.
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string = inputValue) => {
    if (!text.trim() && !attachedFile) return;

    setHasInteracted(true);

    let finalContent = text.trim();
    if (attachedFile) {
      finalContent += `\n\n[Attached Document: ${attachedFile.name}]\n${attachedFile.content}`;
    }

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      content: finalContent.trim(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputValue("");
    setAttachedFile(null);
    setIsTyping(true);

    try {
      // Map local messages to OpenRouter format
      const apiMessages: ChatMessage[] = newMessages.map(msg => ({
        role: msg.role === "ai" ? "assistant" : "user",
        content: msg.content
      }));

      const aiMsgId = Date.now() + 1;
      setMessages((prev) => [...prev, { id: aiMsgId, role: "ai", content: "" }]);

      await fetchAIResponse(apiMessages, (chunk) => {
        setIsTyping(false); // Hide dots as soon as the first word arrives
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMsgId ? { ...msg, content: msg.content + chunk } : msg
          )
        );
      });

    } catch (error) {
      console.error(error);
      const errorMsg: Message = {
        id: Date.now() + 1,
        role: "ai",
        content: "Oops! Something went wrong while connecting to my brain. Please try asking again later.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const suggestions = [
    { icon: CodeXml, text: "AI Skills" },
    { icon: Rocket, text: "Projects" },
    { icon: User, text: "Resume Overview" },
    { icon: ImageIcon, text: "Project Demos" },
  ];

  // Theme-aware colors
  const aiAvatarBg = isDark ? "#ff0000" : "#dff1f1";
  const userAvatarBg = isDark ? "#bbd5da" : "#ff0000";

  // Scroll to About section using Lenis
  const scrollToAbout = () => {
    const aboutEl = document.getElementById("about");
    if (aboutEl && lenis) {
      lenis.scrollTo(aboutEl, { duration: 1.5 });
    } else if (aboutEl) {
      aboutEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section ref={sectionRef} className="relative w-full min-h-dvh flex flex-col items-center justify-center overflow-hidden bg-transparent px-3 pt-20 pb-10 sm:px-6 sm:pt-24 sm:pb-12">
      {/* Decorative neo-brutal shapes */}
      <div className="pointer-events-none absolute left-4 top-24 hidden sm:block h-16 w-16 border-2 border-[var(--brutal-border)] bg-[var(--accent)] shadow-[6px_6px_0_var(--brutal-shadow)] rotate-6" />
      <div className="pointer-events-none absolute right-8 top-28 hidden sm:block h-10 w-28 border-2 border-[var(--brutal-border)] bg-[var(--primary)] shadow-[5px_5px_0_var(--brutal-border)] -rotate-3" />
      <div className="pointer-events-none absolute bottom-20 left-[8%] hidden sm:block h-5 w-40 border-2 border-[var(--brutal-border)] bg-[var(--secondary)] shadow-[4px_4px_0_var(--brutal-shadow)]" />

      {/* Content Layer — scroll-driven parallax */}
      <motion.div
        className={cn(
          "relative z-10 grid w-full max-w-7xl grid-cols-1 items-center gap-6 sm:gap-10 pointer-events-none transition-all duration-700",
          !hasInteracted && "md:grid-cols-[minmax(0,1fr)_minmax(280px,0.75fr)] lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.88fr)]"
        )}
        style={{ opacity: heroOpacity, y: heroY }}
      >
        <div className={cn(
          "flex min-w-0 flex-col transition-all duration-700",
          hasInteracted ? "items-center w-full max-w-3xl mx-auto" : "items-start"
        )}>

          {/* Header Area (Shrinks if interacted) */}
          <div className={cn(
            "relative flex flex-col items-start text-left transition-all duration-[1000ms] ease-out z-10",
            hasInteracted ? "opacity-0 h-0 overflow-hidden mb-0 scale-95" : "opacity-100 h-auto mb-6 scale-100"
          )}>
            {/* Conversational Greeting */}
            <h1
              className="font-[var(--font-display)] text-2xl sm:text-3xl md:text-4xl font-black leading-tight max-w-5xl animate-fade-up opacity-0 stagger-1"
              style={{ color: "var(--foreground)" }}
            >
              Hi, I'm <span className="bg-[var(--primary)] px-2 text-[var(--primary-foreground)] shadow-[4px_4px_0_var(--brutal-border)]">Edwin Jr.</span>
            </h1>

            <p
              className="font-[var(--font-display)] text-sm sm:text-base md:text-lg font-extrabold leading-relaxed max-w-3xl mt-4 animate-fade-up opacity-0 stagger-2"
              style={{ color: "var(--muted-foreground)" }}
            >
              A Computer Engineer building intelligent systems with
            </p>

            <div className="mt-3 sm:mt-4 animate-fade-up opacity-0 stagger-2 w-full flex justify-start">
              <GooeyText
                texts={["IoT Architecture", "Full-Stack Apps", "AI Agents", "Computer Vision", "Edge Computing", "Data Engineering"]}
                morphTime={2}
                cooldownTime={4}
                className="text-[clamp(2rem,5.5vw,4rem)] leading-none inline-flex items-start justify-start w-full max-w-full h-[1.3em]"
                textClassName={cn(
                  "font-black whitespace-nowrap text-left text-[color:var(--foreground)]"
                )}
              />
            </div>
          </div>

          {/* AI Prompt Box Area */}
          <div className={cn(
            "w-full flex flex-col items-center pointer-events-auto transition-all duration-700",
            hasInteracted ? "h-[60vh]" : "animate-fade-up opacity-0 stagger-3"
          )}>

            {/* Chat History Display */}
            {hasInteracted && (
              <div className="w-full flex-1 flex flex-col mb-6 min-h-0">
                <div className="flex justify-end items-center mb-4 px-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setMessages([]);
                      setHasInteracted(false);
                      setInputValue("");
                      setAttachedFile(null);
                    }}
                    className="h-8 text-xs"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    <RotateCcw size={14} className="mr-1.5" />
                    New Chat
                  </Button>
                </div>
                <div
                  ref={chatContainerRef}
                  data-lenis-prevent
                  className="w-full flex-1 overflow-y-auto pr-2 space-y-6 scrollbar-thin flex flex-col"
                >
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex gap-3 max-w-[85%]",
                        msg.role === "user" ? "self-end flex-row-reverse" : "self-start"
                      )}
                    >
                      <div
                        className="w-8 h-8 flex-shrink-0 flex items-center justify-center mt-1 border-2 shadow-[3px_3px_0_var(--brutal-shadow)]"
                        style={{
                          background: msg.role === "ai" ? aiAvatarBg : userAvatarBg,
                          borderColor: `var(--brutal-border)`,
                          borderRadius: "var(--radius)",
                        }}
                      >
                        {msg.role === "ai" ? (
                          <Bot size={16} style={{ color: isDark ? "var(--primary-foreground)" : "var(--foreground)" }} />
                        ) : (
                          <User size={16} style={{ color: isDark ? "var(--foreground)" : "var(--primary-foreground)" }} />
                        )}
                      </div>
                      <div
                        className="px-5 py-3.5 text-sm sm:text-base leading-relaxed border-2 shadow-[6px_6px_0_var(--brutal-shadow)]"
                        style={{
                          background: "var(--chat-bubble-bg)",
                          color: "var(--foreground)",
                          borderColor: "var(--brutal-border)",
                          borderRadius: "var(--radius)",
                        }}
                      >
                        {msg.role === "ai" && !msg.content ? (
                          <TypingIndicator />
                        ) : (
                          formatMessageContent(msg.content)
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Main Input Box */}
            <div
              className="w-full relative group transition-all duration-300 border-2 shadow-[10px_10px_0_var(--brutal-shadow)]"
              style={{
                background: "var(--chat-input-bg)",
                borderColor: "var(--chat-input-border)",
                borderRadius: "var(--radius)"
              }}
            >
              <form
                className="relative flex flex-col p-4 sm:p-5 min-h-[140px]"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputValue);
                }}
              >
                {/* Attachment Badge (if any) */}
                {attachedFile && (
                  <div
                    className="flex items-center justify-between px-3 py-2 mb-2 rounded-lg backdrop-blur-sm"
                    style={{
                      background: "var(--surface-subtle)",
                      border: "1px solid var(--border-subtle)",
                    }}
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FileUp size={14} style={{ color: "var(--primary)" }} className="shrink-0" />
                      <span className="text-xs truncate" style={{ color: "var(--muted-foreground)" }}>{attachedFile.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAttachedFile(null)}
                      className="p-1 rounded-md transition-colors shrink-0"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}

                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={attachedFile ? "Add a message about this document..." : "Ask about the projects I've brought to life..."}
                  className="w-full bg-transparent border-none outline-none resize-none flex-1 text-sm sm:text-base"
                  style={{
                    color: "var(--foreground)",
                    caretColor: "var(--primary)",
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(inputValue);
                    }
                  }}
                />

                {/* Bottom Row of Input Box */}
                <div className="flex items-center justify-between mt-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".txt,.md,.csv"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 rounded-xl transition-colors"
                    style={{ color: "var(--muted-foreground)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--primary)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted-foreground)"; }}
                  >
                    <Paperclip size={18} />
                  </button>

                  <Button
                    type="submit"
                    size="icon"
                    disabled={!inputValue.trim() && !attachedFile}
                    className="h-9 w-9 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    style={{
                      background: (inputValue.trim() || attachedFile) ? "var(--primary)" : "var(--surface-subtle)",
                      color: (inputValue.trim() || attachedFile) ? "var(--primary-foreground)" : "var(--muted-foreground)",
                    }}
                  >
                    <ArrowUp size={18} />
                  </Button>
                </div>
              </form>
            </div>

            {/* Prompt Suggestions */}
            {!hasInteracted && (
              <div className="flex flex-wrap justify-start gap-3 mt-6 max-w-2xl">
                {suggestions.map((suggestion, i) => {
                  const Icon = suggestion.icon;
                  return (
                    <button
                      key={i}
                      onClick={() => handleSend(suggestion.text)}
                      className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 border-2 shadow-[5px_5px_0_var(--brutal-shadow)]"
                      style={{
                        background: "var(--surface-subtle)",
                        borderColor: "var(--brutal-border)",
                        color: "var(--foreground)",
                        borderRadius: "var(--radius)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--border-subtle-hover)";
                        e.currentTarget.style.background = "var(--surface-subtle-hover)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "var(--brutal-border)";
                        e.currentTarget.style.background = "var(--surface-subtle)";
                      }}
                    >
                      <Icon size={14} className="opacity-70" />
                      <span>{suggestion.text}</span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

        </div>

        {/* Right column: Generative Mondrian art — hidden during chat */}
        <div className={cn(
          "pointer-events-auto transition-all duration-700",
          hasInteracted ? "hidden" : "hidden md:block"
        )}>
          <div
            className="relative w-full overflow-hidden border-2 border-[var(--brutal-border)] bg-[var(--card)] shadow-[6px_6px_0_var(--brutal-shadow)] md:shadow-[10px_10px_0_var(--brutal-shadow)]"
            style={{ borderRadius: "var(--radius)" }}
          >
            {/* Card header bar */}
            <div className="flex items-center justify-between gap-3 border-b-2 border-[var(--brutal-border)] px-4 py-2.5">
              <div className="flex items-center gap-2">
                <Shapes size={16} style={{ color: "var(--primary)" }} />
                <span className="text-xs font-extrabold uppercase tracking-wide" style={{ color: "var(--foreground)" }}>
                  Generative Art
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 border-2 border-[var(--brutal-border)] bg-[var(--secondary)] px-2 py-0.5 text-[10px] font-extrabold uppercase shadow-[3px_3px_0_var(--brutal-shadow)]">
                  <Sparkles size={10} />
                  Live
                </span>
              </div>
            </div>

            {/* Canvas area */}
            <div className="relative aspect-[4/3] w-full">
              <Sketch />
            </div>
          </div>
        </div>

      </motion.div>

      {/* Scroll indicator */}
      {!hasInteracted && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-chevron-bounce cursor-pointer pointer-events-auto"
          onClick={scrollToAbout}
        >
          <ChevronDown size={32} style={{ color: "var(--muted-foreground)" }} />
        </div>
      )}
    </section>
  );
}
