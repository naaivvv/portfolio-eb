import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Brain, Cpu, Database, Network, Activity, Server, ArrowUpRight, BarChart } from "lucide-react";
import {
  SiPython,
  SiTensorflow,
  SiOpencv,
  SiRaspberrypi,
  SiReact,
  SiCplusplus,
  SiEspressif,
  SiLaravel,
  SiLivewire,
  SiPhp,
  SiBootstrap,
  SiMysql,
  SiVite,
  SiDocker,
  SiFlask,
  SiGithub,
  SiVuedotjs,
} from "@icons-pack/react-simple-icons";

// --- PROJECT DATA ---
export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  category: string;
  year: string;
  image: string;
  githubUrl?: string;
};

const getProjectImage = (name: string) => new URL(`../assets/projects/${name}`, import.meta.url).href;

const getTechIcon = (tech: string, key: string, withLabel: boolean = false) => {
  const t = tech.toLowerCase();
  let IconComponent = Cpu;

  if (t.includes("python")) IconComponent = SiPython;
  else if (t.includes("tensorflow") || t.includes("deep learning") || t.includes("efficientnet") || t.includes("mobilenet")) IconComponent = SiTensorflow;
  else if (t.includes("opencv") || t.includes("computer vision")) IconComponent = SiOpencv;
  else if (t.includes("raspberry pi")) IconComponent = SiRaspberrypi;
  else if (t.includes("react")) IconComponent = SiReact;
  else if (t.includes("c++") || t.includes("embedded c")) IconComponent = SiCplusplus;
  else if (t.includes("esp32")) IconComponent = SiEspressif;
  else if (t.includes("laravel")) IconComponent = SiLaravel;
  else if (t.includes("livewire")) IconComponent = SiLivewire;
  else if (t.includes("php")) IconComponent = SiPhp;
  else if (t.includes("bootstrap")) IconComponent = SiBootstrap;
  else if (t.includes("mysql") || t.includes("sql")) IconComponent = SiMysql;
  else if (t.includes("vite")) IconComponent = SiVite;
  else if (t.includes("vue")) IconComponent = SiVuedotjs;
  else if (t.includes("power bi") || t.includes("powerbi")) IconComponent = BarChart;
  else if (t.includes("docker")) IconComponent = SiDocker;
  else if (t.includes("flask")) IconComponent = SiFlask;
  else if (t.includes("ai") || t.includes("nlp") || t.includes("word2vec") || t.includes("yolo")) IconComponent = Brain;
  else if (t.includes("data") || t.includes("etl")) IconComponent = Database;
  else if (t.includes("wireless") || t.includes("network")) IconComponent = Network;
  else if (t.includes("health") || t.includes("eye") || t.includes("brain tumor")) IconComponent = Activity;
  else if (t.includes("server") || t.includes("backend") || t.includes("full-stack")) IconComponent = Server;

  if (withLabel) {
    return (
      <div key={key} className="flex items-center gap-1.5 px-2 py-1 bg-[var(--background)] border-2 border-[var(--border)] shadow-[2px_2px_0_var(--brutal-shadow)] text-[var(--foreground)] text-xs font-bold uppercase transition-all hover:border-[var(--primary)] hover:text-[var(--primary)] hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--brutal-shadow)] cursor-default">
        <IconComponent className="w-3.5 h-3.5" />
        <span>{tech}</span>
      </div>
    );
  }

  return (
    <div key={key} className="p-1.5 border-2 border-[var(--border)] rounded-none bg-[var(--background)] shadow-[2px_2px_0_var(--brutal-shadow)] text-[var(--foreground)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-all hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--brutal-shadow)] cursor-default" title={tech}>
      <IconComponent className="w-4 h-4" />
    </div>
  );
};

const projects: Project[] = [
  {
    id: "kidsentry",
    title: "KidSentry",
    subtitle: "Hybrid Edge-Cloud AI for Child Safety",
    description: "Thesis project architecting a real-time hazard detection system for indoor child environments. Combines edge computing with cloud AI pipelines using YOLO object detection, TensorFlow models, and OpenCV — all running on embedded hardware to minimize latency for safety-critical alerts.",
    techStack: ["Python", "YOLO", "TensorFlow", "OpenCV", "Raspberry Pi", "Edge AI"],
    category: "AI / ML",
    year: "2026",
    image: getProjectImage("kidsentry.png"),
    githubUrl: "https://github.com/naaivvv",
  },
  {
    id: "brightedge",
    title: "BrightEdge",
    subtitle: "Advanced Eye Disease Pre-Diagnosis System",
    description: "A research project focusing on the development of a computer vision-based system for the pre-diagnosis of eye diseases using fundus images. It leverages deep learning (EfficientNetV2-S architecture) to detect Cataract, Diabetic Retinopathy (DR), and Glaucoma with clinical precision, while ensuring secure, HIPAA-compliant data handling.",
    techStack: ["Computer Vision", "Deep Learning", "EfficientNetV2-S", "Python", "Healthcare AI"],
    category: "AI / ML",
    year: "2026",
    image: getProjectImage("brightedge.png"),
    githubUrl: "https://github.com/naaivvv",
  },
  {
    id: "snaid",
    title: "SNAID",
    subtitle: "Snake Identification AI System",
    description: "An embedded AI pipeline utilizing a Raspberry Pi 5 to process real-time imagery for deployment in Negros Occidental. Features a highly optimized 2-stage architecture leveraging YOLO for rapid object detection and MobileNet for precise species classification. Interface powered by a React desktop application with a robust Python backend.",
    techStack: ["YOLO", "MobileNet", "Python", "React", "Raspberry Pi"],
    category: "AI / Embedded",
    year: "2026",
    image: getProjectImage("snaid.png"),
    githubUrl: "https://github.com/naaivvv",
  },
  {
    id: "iot-vehicle",
    title: "IoT Vehicle Control",
    subtitle: "Wireless Legacy Vehicle Modernization",
    description: "Designed an IoT-based wireless control system that retrofits legacy vehicles with mobile app control. Engineered custom PCB boards, integrated embedded microcontrollers, and built a real-time communication layer between hardware and a mobile application.",
    techStack: ["IoT", "PCB Design", "Embedded C", "Mobile App", "Wireless Protocols"],
    category: "IoT / Hardware",
    year: "2025",
    image: getProjectImage("technodrive.jpg"),
    githubUrl: "https://github.com/naaivvv",
  },
  {
    id: "sugarcane-monitor",
    title: "Industrial Stack Gas Analyzer",
    subtitle: "Sugar Mill Monitoring System",
    description: "Architected a real-time gas monitoring system for sugarcane mills using distributed IoT sensors. The system provides continuous environmental monitoring, automated alerts for hazardous gas levels, and a centralized dashboard for mill operators.",
    techStack: ["IoT Sensors", "Embedded Systems", "Real-time Data", "Alert Systems"],
    category: "IoT / Hardware",
    year: "2025",
    image: getProjectImage("isga.jpg"),
    githubUrl: "https://github.com/naaivvv/isga_v3",
  },
  {
    id: "sentiment-analysis",
    title: "Sentiment Analysis Pipeline",
    subtitle: "NLP Classification Engine",
    description: "An end-to-end natural language processing model leveraging Word2Vec (Google News embeddings) and TensorFlow for accurate sentiment classification. The application is containerized with Docker, deployed on HuggingFace, and exposed via a Flask backend running through ngrok for real-time web access.",
    techStack: ["NLP", "Word2Vec", "TensorFlow", "Docker", "Flask"],
    category: "AI / ML",
    year: "2025",
    image: getProjectImage("sentiment.png"),
    githubUrl: "https://github.com/naaivvv/Project-Sentiment-Analysis-Tensorflow-",
  },
  {
    id: "light-pollution",
    title: "Light Intensity & Pollution Predictor",
    subtitle: "Environmental Deep Learning Model",
    description: "A deep learning regression model engineered to analyze environmental monitoring datasets. It accurately predicts light intensity (Is) and regional pollution levels, providing a scalable solution for ecological data tracking and analysis.",
    techStack: ["Deep Learning", "Python", "TensorFlow"],
    category: "AI / ML",
    year: "2025",
    image: getProjectImage("light.png"),
    githubUrl: "https://github.com/naaivvv/light_intensity_prediction_app",
  },
  {
    id: "brain-tumor",
    title: "Brain Tumor MRI Classification",
    subtitle: "Medical Imaging Diagnostics",
    description: "A deep learning diagnostic tool built to analyze medical imaging. Engineered to classify MRI scans with high accuracy, assisting in rapid and reliable pre-diagnosis workflows for medical professionals.",
    techStack: ["Computer Vision", "Deep Learning", "TensorFlow", "Python"],
    category: "AI / Computer Vision",
    year: "2025",
    image: getProjectImage("brain.png"),
    githubUrl: "https://github.com/naaivvv/brain-tumor-mri-classification",
  },
  {
    id: "smart-outlet",
    title: "Smart 4-Gang Outlet System",
    subtitle: "IoT Hardware Integration",
    description: "A custom hardware-software integration utilizing a PIC18F4550 microcontroller and an ESP32 for Wi-Fi capabilities. Features real-time temperature monitoring and an integrated LCD interface for local control alongside remote IoT management.",
    techStack: ["IoT", "Hardware", "PIC18F4550", "ESP32", "C++"],
    category: "IoT / Hardware",
    year: "2024",
    image: getProjectImage("4gos.png"),
    githubUrl: "https://github.com/naaivvv/4gos",
  },
  {
    id: "yieldwerx",
    title: "yieldWerx Analytics",
    subtitle: "Semiconductor Data Intelligence",
    description: "Built data-driven software solutions at yieldWerx Semiconductor to improve operational reporting accuracy. Optimized complex SQL queries to reduce latency, developed analytical dashboards, and ensured data integrity across large-scale semiconductor datasets.",
    techStack: ["SQL", "Python", "Data Analysis", "ETL", "Power BI"],
    category: "Data Engineering",
    year: "2024",
    image: getProjectImage("yieldwerx.png"),
    githubUrl: "https://github.com/naaivvv",
  },
  {
    id: "chmsu-cier",
    title: "CHMSU CIER Management System",
    subtitle: "Institutional Admin Platform",
    description: "A comprehensive administrative platform built for the Carlos Hilado Memorial State University Center for Internationalization and External Relations. Engineered for dynamic, real-time institutional data handling and record management.",
    techStack: ["Laravel", "Livewire", "PHP", "Full-Stack"],
    category: "Web Development",
    year: "2024",
    image: getProjectImage("ciermis.png"),
    githubUrl: "https://github.com/naaivvv",
  },
  {
    id: "wiredesk",
    title: "WireDesk CRM",
    subtitle: "Customer Relationship Management",
    description: "A dedicated customer relationship management solution for a business specializing in laptop wireless accessories. Features a fast, responsive dashboard tailored for tracking customer care tickets and service solutions.",
    techStack: ["Laravel", "Vue", "Vite", "PHP"],
    category: "Web Development",
    year: "2024",
    image: getProjectImage("wiredesk.jpeg"),
    githubUrl: "https://github.com/naaivvv/WireDesk",
  },
  {
    id: "acrosys",
    title: "ACROSYS",
    subtitle: "Attendee and Crowd Syncing System",
    description: "An event management application designed to handle large-scale crowd tracking and attendee synchronization in real-time, ensuring seamless event operations and data consistency.",
    techStack: ["Laravel", "Livewire", "PHP"],
    category: "Web Development",
    year: "2023",
    image: getProjectImage("acrosys.png"),
    githubUrl: "https://github.com/naaivvv/ACROSYS",
  },
  {
    id: "happy-teeth",
    title: "Happy-Teeth Dental Clinic",
    subtitle: "Clinic Management System",
    description: "A foundational web-based clinic management system featuring patient scheduling, secure record keeping, and administrative dashboards engineered for cross-browser reliability.",
    techStack: ["PHP", "Bootstrap", "MySQL"],
    category: "Web Development",
    year: "2023",
    image: getProjectImage("happy.png"),
    githubUrl: "https://github.com/naaivvv/Happy-Teeth-Dental-Clinic",
  },
];

// --- CARD WIDTH CONFIG ---
const CARD_W = 380; // px per card
const GAP = 20; // px gap between cards

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of the tall outer container
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Total width the row needs to travel
  // (total row width minus one viewport width)
  const totalRowWidth = projects.length * (CARD_W + GAP) - GAP;
  // We'll compute the actual translate in the motion style using a CSS calc
  // so it adapts to viewport width at runtime.

  // Map 0-1 scroll progress → 0 to -(totalRowWidth - 100vw)
  // We overshoot slightly: at progress=1 the last card is fully visible.
  // Using a pixel estimate for the max translation:
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(totalRowWidth - (typeof window !== "undefined" ? window.innerWidth : 1200) + 80)] // 80px padding buffer
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative bg-transparent"
      // The tall container gives vertical scroll room to drive the horizontal animation
      style={{ height: `${Math.max(300, Math.ceil(projects.length / 3) * 100)}vh` }}
    >
      {/* Sticky viewport — pins while user scrolls through the tall section */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col pointer-events-none">

        {/* Header — center-aligned neo-brutalist */}
        <div className="relative z-10 pt-20 pb-8 pointer-events-auto">
          <div className="text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-[var(--font-display)] text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4">
              <span style={{ color: "var(--foreground)" }}>FEATURED</span><br />
              <span style={{ color: "var(--primary)" }}>PROJECTS</span>
            </h2>
            <p className="text-sm sm:text-base max-w-xl mx-auto font-medium uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>
              A curated selection of my work spanning AI, IoT, web development, and data engineering.
            </p>
          </div>
        </div>

        {/* Horizontal scroll track */}
        <div className="flex-1 flex items-center overflow-hidden">
          <motion.div
            className="flex gap-5 pl-10 pr-[40vw]"
            style={{ x }}
          >
            {projects.map((project) => (
              <Dialog.Root key={project.id}>
                <Dialog.Trigger asChild>
                  <div
                    className="pointer-events-auto cursor-pointer flex flex-col flex-shrink-0 bg-[var(--card)] rounded-none border-4 border-[var(--border)] transition-all duration-300 shadow-[8px_8px_0_var(--brutal-shadow)] hover:shadow-[12px_12px_0_var(--primary)] hover:-translate-y-1 hover:-translate-x-1 group"
                    style={{ width: `${CARD_W}px` }}
                  >
                    {/* Image */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden border-b-4 border-[var(--border)] bg-[var(--muted)]">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                        loading="lazy"
                      />
                      {/* Year badge */}
                      <div className="absolute top-3 right-3">
                        <span className="text-[10px] font-black tracking-widest px-2.5 py-1 bg-[var(--background)] border-2 border-[var(--border)] shadow-[2px_2px_0_var(--primary)] text-[var(--foreground)] uppercase">
                          {project.year}
                        </span>
                      </div>
                      {/* Category badge */}
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-black tracking-widest px-2.5 py-1 bg-[var(--primary)] border-2 border-[var(--border)] shadow-[2px_2px_0_var(--foreground)] text-[var(--primary-foreground)] uppercase">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="font-[var(--font-display)] text-xl font-black uppercase tracking-tighter mb-1 text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors duration-200 line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-xs font-bold uppercase mb-4 text-[var(--secondary)] line-clamp-1">
                        {project.subtitle}
                      </p>

                      {/* Tech Stack Icons */}
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.techStack.map((tag, idx) => getTechIcon(tag, `card-${project.id}-${idx}`))}
                      </div>
                    </div>
                  </div>
                </Dialog.Trigger>

                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 pointer-events-auto" />
                  <Dialog.Content className="fixed left-[50%] top-[50%] z-[110] grid w-[90vw] max-w-2xl translate-x-[-50%] translate-y-[-50%] bg-[var(--card)] border-4 border-[var(--border)] shadow-[16px_16px_0_var(--brutal-shadow)] p-0 rounded-none duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] max-h-[90vh] overflow-y-auto pointer-events-auto">
                    
                    <div className="relative w-full aspect-[16/9] border-b-4 border-[var(--border)] bg-[var(--muted)]">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                      
                      <Dialog.Close className="absolute top-4 right-4 bg-[var(--background)] border-2 border-[var(--border)] p-1.5 shadow-[4px_4px_0_var(--primary)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_var(--primary)] transition-all cursor-pointer text-[var(--foreground)] focus:outline-none">
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close</span>
                      </Dialog.Close>
                    </div>

                    <div className="p-6 sm:p-8 flex flex-col gap-6">
                      <div>
                        <Dialog.Title className="font-[var(--font-display)] text-3xl sm:text-4xl font-black uppercase tracking-tighter text-[var(--foreground)] mb-2">
                          {project.title}
                        </Dialog.Title>
                        <Dialog.Description className="text-sm sm:text-base font-bold uppercase text-[var(--primary)]">
                          {project.subtitle}
                        </Dialog.Description>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tag, idx) => getTechIcon(tag, `modal-${project.id}-${idx}`, true))}
                      </div>

                      <p className="text-sm sm:text-base leading-relaxed text-[var(--muted-foreground)] border-l-4 border-[var(--primary)] pl-4">
                        {project.description}
                      </p>

                      <div className="flex flex-col sm:flex-row gap-4 mt-4 pt-6 border-t-4 border-[var(--border)]">
                        <a 
                          href={project.githubUrl || "#"} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center justify-center gap-2 bg-[var(--foreground)] text-[var(--background)] font-black uppercase px-6 py-3 border-4 border-[var(--border)] shadow-[6px_6px_0_var(--primary)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_var(--primary)] transition-all"
                        >
                          <SiGithub className="w-5 h-5" />
                          View Source
                        </a>
                        <a 
                          href="#" 
                          className="inline-flex items-center justify-center gap-2 bg-[var(--background)] text-[var(--foreground)] font-black uppercase px-6 py-3 border-4 border-[var(--border)] shadow-[6px_6px_0_var(--brutal-shadow)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_var(--brutal-shadow)] transition-all"
                        >
                          <ArrowUpRight className="w-5 h-5" />
                          Live Demo
                        </a>
                      </div>
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
