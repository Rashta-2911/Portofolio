"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

import {
  Home,
  FolderKanban,
  User,
  GraduationCap,
  Briefcase,
  Award,
  Download,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Menu as MenuIcon,
  X,
} from "lucide-react";

import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaNodeJs,
  FaFigma,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaTiktok,
  FaKeyboard,
} from "react-icons/fa";

import { SiNextdotjs, SiTailwindcss, SiRedux, SiCanva, SiVisualparadigm, SiLaravel, SiPhp, SiMysql } from "react-icons/si";
import { title } from "process";

/* =============================================
   TYPE DEFINITIONS
   ============================================= */
type PageId =
  | "home"
  | "projects"
  | "about"
  | "education"
  | "experience"
  | "certificates";

interface NavItem {
  id: PageId;
  label: string;
  icon: React.ReactNode;
}

/* =============================================
   DATA DEFINITIONS
   ============================================= */
const PROJECTS_DATA = [
  {
    title: "RuangKonsul",
    desc: "A full-stack application with doctor scheduling, real-time chat, and Midtrans payment integration.",
    tags: ["Laravel", "Filament", "Midtrans"],
    gradient: "linear-gradient(135deg, rgba(0,245,255,0.15), rgba(168,85,247,0.15))",
    borderColor: "rgba(0,245,255,0.15)",
  },
  {
    title: "Portfolio Website",
    desc: "Modern portfolio with glassmorphism design, smooth animations, and responsive layout built with Next.js.",
    tags: ["Next.js", "Tailwind", "TypeScript"],
    gradient: "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(173,255,47,0.15))",
    borderColor: "rgba(168,85,247,0.15)",
    link: "https://portofolio-alpha-eight-17.vercel.app/",
  },
  {
    title: "Mood Board",
    desc: "Logo design and branding for a local business, creating a cohesive visual identity across digital and print media.",
    tags: ["Adobe Illustrator", "Canva", "Affinity"],
    gradient: "linear-gradient(135deg, rgba(173,255,47,0.15), rgba(0,245,255,0.15))",
    borderColor: "rgba(173,255,47,0.15)",
    link: "/Documents/Product Design.pdf",
  },
  {
    title: "Go-Food Merchant Watch",
    desc: "Data analysis and dashboard design for Go-Food merchants, providing insights on sales performance and customer behavior.",
    tags: ["Google Form", "Figma", "Canva"],
    gradient: "linear-gradient(135deg, rgba(0,245,255,0.15), rgba(168,85,247,0.15))",
    borderColor: "rgba(0,245,255,0.15)",
    link: "https://canva.link/l8o2yvetl3sup0k",
  },
  {
    title: "Jaga Muda",
    desc: "A mobile app prototype for a youth organization, featuring event management, member profiles, and community engagement tools.",
    tags: ["Figma"],
    gradient: "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(173,255,47,0.15))",
    borderColor: "rgba(168,85,247,0.15)",
    link: "https://www.figma.com/design/QvTVL7YzUAbtnqxuDqnlEs/JagaMuda-IA?node-id=0-1&t=bnJEG146krMBRS3w-1"
  }
];

const CERTIFICATES_DATA = [
  { src: "/Images/Certificate 1.jpg", alt: "Inolabs Academy" },
  { src: "/Images/Certificate 2.jpg", alt: "HIMSISFO (Himpunan Sistem Informasi)" },
];

/* =============================================
   MAIN COMPONENT
   ============================================= */
export default function MainPage() {
  const [activePage, setActivePage] = useState<PageId>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems: NavItem[] = [
    { id: "home", label: "Home", icon: <Home size={18} /> },
    { id: "projects", label: "Projects", icon: <FolderKanban size={18} /> },
    { id: "about", label: "About", icon: <User size={18} /> },
    { id: "education", label: "Education", icon: <GraduationCap size={18} /> },
    { id: "experience", label: "Experience", icon: <Briefcase size={18} /> },
    { id: "certificates", label: "Certificates", icon: <Award size={18} /> },
  ];

  const handleNav = (id: PageId) => {
    setActivePage(id);
    setMobileMenuOpen(false);
  };

  if (!mounted) return null;

  return (
    <div className="flex w-full min-h-screen relative overflow-x-hidden">
      {/* ========== SIDEBAR (Desktop) ========== */}
      <aside
        className="hidden md:flex w-72 flex-col fixed top-0 left-0 h-screen z-40 glass"
        style={{
          borderRight: "1px solid rgba(0,245,255,0.08)",
        }}
      >
        {/* Logo */}
        <div className="px-6 pt-8 pb-6">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #00F5FF, #A855F7)",
              }}
            >
              <Sparkles size={20} className="text-neutral" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-text-primary">Nanda</h2>
              <p className="text-xs text-text-muted">Portfolio</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider px-3 mb-3">
            Menu
          </p>
          {navItems.map((item) => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              text={item.label}
              active={activePage === item.id}
              onClick={() => handleNav(item.id)}
            />
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="px-6 py-6 mt-auto">
          <LetsConnectWidget />
        </div>
      </aside>

      {/* ========== MOBILE HEADER ========== */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 glass px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #00F5FF, #A855F7)",
            }}
          >
            <Sparkles size={16} className="text-neutral" />
          </div>
          <span className="font-bold text-text-primary">Rashta</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-neutral-light transition-colors cursor-pointer"
        >
          {mobileMenuOpen ? (
            <X size={22} className="text-primary" />
          ) : (
            <MenuIcon size={22} className="text-text-primary" />
          )}
        </button>
      </div>

      {/* ========== MOBILE MENU OVERLAY ========== */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 glass flex flex-col"
          style={{ paddingTop: "64px" }}
        >
          <div className="flex-1 overflow-y-auto w-full flex flex-col">
            <nav className="p-4 space-y-1">
              {navItems.map((item) => (
                <SidebarItem
                  key={item.id}
                  icon={item.icon}
                  text={item.label}
                  active={activePage === item.id}
                  onClick={() => handleNav(item.id)}
                />
              ))}
            </nav>
            <div className="p-6 mt-auto">
              <LetsConnectWidget />
            </div>
          </div>
        </div>
      )}

      {/* ========== MAIN CONTENT ========== */}
      <main className="flex-1 min-w-0 max-w-full md:ml-72 min-h-screen grid-pattern overflow-x-hidden flex flex-col">
        <div className="flex-1 w-full mx-auto px-3 sm:px-5 md:px-8 lg:px-12 py-6 sm:py-8 md:py-12 lg:py-16 mt-16 sm:mt-14 md:mt-0 overflow-hidden max-w-screen-2xl lg:mx-auto">
          {/* HOME PAGE */}
          {activePage === "home" && <HomePage />}

          {/* PROJECTS PAGE */}
          {activePage === "projects" && <ProjectsPage />}

          {/* ABOUT PAGE */}
          {activePage === "about" && <AboutPage />}

          {/* EDUCATION PAGE */}
          {activePage === "education" && <EducationPage />}

          {/* EXPERIENCE PAGE */}
          {activePage === "experience" && <ExperiencePage />}

          {/* CERTIFICATES PAGE */}
          {activePage === "certificates" && <CertificatesPage />}
        </div>

        {/* Mobile footer for Let's Connect */}
        <div className="md:hidden w-full px-4 sm:px-6 pb-8 pt-4">
          <LetsConnectWidget />
        </div>
      </main>
    </div>
  );
}

/* =============================================================================
   PAGE SECTIONS
   ============================================================================= */

/* ========== HOME PAGE ========== */
function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="min-h-[80vh] flex items-center py-4 sm:py-6 md:py-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center w-full">
          {/* Left Column */}
          <div className="animate-fade-in-left order-2 md:order-1">
            {/* Status badge */}
            <div
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full mb-3 xs:mb-4 sm:mb-6"
              style={{
                background: "rgba(0,245,255,0.08)",
                border: "1px solid rgba(0,245,255,0.15)",
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "#ADFF2F" }}
              />
              <span className="text-xs sm:text-sm text-primary">
                Open to opportunities
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-3 xs:mb-4 sm:mb-6">
              <span className="text-text-primary">Hi, I&apos;m</span>
              <br />
              <span className="gradient-text-primary">
                Hernandia Rashta R
              </span>
            </h1>

            <p className="text-text-secondary text-sm xs:text-base sm:text-lg leading-relaxed mb-5 xs:mb-6 sm:mb-8 max-w-lg">
              A sixth-semester Information Systems student at{" "}
              <span className="text-primary font-medium">
                Bina Nusantara University
              </span>{" "}
              with a strong interest in{" "}
              <span className="text-secondary font-medium">UI/UX Design</span>{" "}
              and{" "}
              <span className="text-tertiary font-medium">
                Systems Analysis
              </span>
              . Enthusiastic about learning and developing professional
              abilities.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col xs:flex-row gap-2.5 xs:gap-3 sm:gap-4 mb-5 xs:mb-6 sm:mb-8 w-full xs:w-auto">
              <a
                href="/Documents/CV.pdf"
                download
                className="btn-primary inline-flex items-center justify-center xs:justify-start gap-2 text-xs sm:text-sm no-underline w-full xs:w-auto"
              >
                <Download size={14} />
                Download CV
              </a>
              <button
                onClick={() =>
                  document
                    .getElementById("skills")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-secondary inline-flex items-center justify-center xs:justify-start gap-2 text-xs sm:text-sm cursor-pointer w-full xs:w-auto"
              >
                View Skills
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Quick stats */}
            <div className="flex flex-col xs:flex-row flex-wrap gap-4 xs:gap-5 sm:gap-6 md:gap-8 mt-6 xs:mt-8 sm:mt-10">
              <StatBadge value="6th" label="Semester" />
              <StatBadge value={PROJECTS_DATA.length.toString()} label="Projects" />
              <StatBadge value={CERTIFICATES_DATA.length.toString()} label="Certificates" />
            </div>
          </div>

          {/* Right Column — Profile Image */}
          <div className="flex justify-center order-1 md:order-2 animate-fade-in-right mt-4 xs:mt-5 sm:mt-6 md:mt-0">
            <div className="relative">
              {/* Decorative orbit rings */}
              <div
                className="absolute inset-0 rounded-full w-[180px] h-[180px] xs:w-[220px] xs:h-[220px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] lg:w-[380px] lg:h-[380px] pointer-events-none"
                style={{
                  margin: "auto",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}
              >
                {/* Ring 1 - Outer */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ 
                    border: "1px dashed rgba(0,245,255,0.3)",
                    animation: "rotateGlow 8s linear infinite" 
                  }}
                >
                  <div
                    className="absolute w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 rounded-full"
                    style={{
                      background: "#00F5FF",
                      boxShadow: "0 0 15px rgba(0,245,255,0.6)",
                      top: "-6px",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  />
                </div>
                {/* Ring 2 - Middle */}
                <div
                  className="absolute inset-[8px] xs:inset-[10px] sm:inset-[15px] md:inset-[18px] lg:inset-[20px] rounded-full"
                  style={{ 
                    border: "1px dashed rgba(168,85,247,0.3)",
                    animation: "rotateGlow 12s linear infinite reverse" 
                  }}
                >
                  <div
                    className="absolute w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 rounded-full"
                    style={{
                      background: "#A855F7",
                      boxShadow: "0 0 15px rgba(168,85,247,0.6)",
                      bottom: "-5px",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  />
                </div>
                {/* Ring 3 - Inner */}
                <div
                  className="absolute inset-[16px] xs:inset-[18px] sm:inset-[24px] md:inset-[30px] lg:inset-[40px] rounded-full"
                  style={{ 
                    border: "1px dashed rgba(173,255,47,0.3)",
                    animation: "rotateGlow 16s linear infinite" 
                  }}
                >
                  <div
                    className="absolute w-2 h-2 xs:w-2.5 xs:h-2.5 rounded-full"
                    style={{
                      background: "#ADFF2F",
                      boxShadow: "0 0 10px #ADFF2F",
                      top: "50%",
                      right: "-3px",
                      transform: "translateY(-50%)",
                    }}
                  />
                </div>
              </div>

              {/* Profile image */}
              <div className="profile-ring">
                <div
                  className="relative w-40 h-40 xs:w-48 xs:h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden"
                  style={{
                    border: "3px solid rgba(15,23,42,0.8)",
                  }}
                >
                  <Image
                    src="/Images/profile.jpg"
                    alt="Hernandia Rashta R"
                    fill
                    priority
                    sizes="(max-width: 480px) 160px, (max-width: 640px) 192px, (max-width: 768px) 240px, (max-width: 1024px) 288px, 320px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="mt-16 sm:mt-20 md:mt-24 lg:mt-32 animate-fade-in-up delay-300">
        <div className="flex items-center gap-3 mb-6 px-2 font-mono">
          <Sparkles size={24} color="#00F5FF" />
          <h2 className="text-xl sm:text-2xl font-bold gradient-text-primary">
            Tech Stack & Skills
          </h2>
        </div>

        <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-2 sm:gap-3 md:gap-4">
          <SkillCard
            icon={<FaHtml5 size={28} />}
            name="HTML"
            color="#E44D26"
          />
          <SkillCard
            icon={<FaCss3Alt size={28} />}
            name="CSS"
            color="#1572B6"
          />
          <SkillCard
            icon={<FaJsSquare size={28} />}
            name="JavaScript"
            color="#F0DB4F"
          />
          <SkillCard
            icon={<FaReact size={28} />}
            name="React"
            color="#61DAFB"
          />
          <SkillCard
            icon={<SiNextdotjs size={28} />}
            name="Next.js"
            color="#ffffff"
          />
          <SkillCard
            icon={<SiTailwindcss size={28} />}
            name="Tailwind"
            color="#38BDF8"
          />
          <SkillCard
            icon={<SiRedux size={28} />}
            name="Redux"
            color="#764ABC"
          />
          <SkillCard
            icon={<FaNodeJs size={28} />}
            name="Node.js"
            color="#68A063"
          />
          <SkillCard
            icon={<FaFigma size={28} />}
            name="Figma"
            color="#A259FF"
          />
          <SkillCard
            icon={<SiCanva size={28} />}
            name="Canva"
            color="#00C4CC"
          />
          <SkillCard
            icon={<SiVisualparadigm size={28} />}
            name="Visual Paradigm"
            color="#E3001B"
          />
          <SkillCard
            icon={<SiLaravel size={28} />}
            name="Laravel"
            color="#E3001B"
          />
          <SkillCard
            icon={<SiPhp size={28} />}
            name="PHP"
            color="#4F5B93"
          />
          <SkillCard
            icon={<SiMysql size={28} />}
            name="MySQL"
            color="#4F5B93"
          />
        </div>
      </section>

      {/* GITHUB CONTRIBUTIONS */}
      <section className="mt-16 sm:mt-20 md:mt-24 lg:mt-32 animate-fade-in-up">
        <div className="flex items-center gap-3 mb-6 px-2 font-mono">
          <FaGithub size={24} color="#00F5FF" />
          <h2 className="text-xl sm:text-2xl font-bold gradient-text-primary">
            GitHub Contributions
          </h2>
        </div>
        <GithubStatsRealtime />
      </section>

      {/* TYPING STATS */}
      <section className="mt-16 sm:mt-20 md:mt-24 animate-fade-in-up">
        <MonkeyTypeStatsRealtime />
      </section>
    </div>
  );
}

/* ========== PROJECTS PAGE ========== */
function ProjectsPage() {
  return (
    <div className="animate-fade-in-up">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold section-heading gradient-text-primary mb-3 sm:mb-4">
        My Projects
      </h1>
      <p className="text-text-secondary text-sm sm:text-base mb-8 sm:mb-10 md:mb-12 max-w-2xl">
        Explore my latest projects showcasing expertise in full-stack development, UI/UX design, and systems analysis.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {PROJECTS_DATA.map((project, i) => (
          <div
            key={i}
            className="glass-card p-5 sm:p-6 group hover:translate-y-[-4px] transition-all duration-300"
            style={{
              background: "rgba(0,245,255,0.05)",
              borderColor: "rgba(0,245,255,0.15)",
              border: "1px solid rgba(0,245,255,0.15)",
              animationDelay: `${i * 0.15}s`,
            }}
          >
            {/* Project icon placeholder */}
            <div
              className="w-10 h-10 xs:w-12 xs:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300"
              style={{
                background: "linear-gradient(135deg, rgba(0,245,255,0.15), rgba(168,85,247,0.15))",
                border: "1px solid rgba(0,245,255,0.2)",
              }}
            >
              <FolderKanban
                size={18}
                className="text-primary"
              />
            </div>

            <h3 className="text-base sm:text-lg md:text-xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-text-secondary text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
              {project.desc}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 sm:px-3 py-1 rounded-full font-medium"
                  style={{
                    background: "rgba(0,245,255,0.08)",
                    color: "#00F5FF",
                    border: "1px solid rgba(0,245,255,0.12)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <a 
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-primary font-medium hover:gap-3 transition-all cursor-pointer bg-transparent border-none hover:text-secondary no-underline"
            >
              View Project <ExternalLink size={12} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ========== ABOUT PAGE ========== */
function AboutPage() {
  return (
    <div className="animate-fade-in-up">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold section-heading gradient-text-primary mb-3 sm:mb-4">
        About Me
      </h1>
      <p className="text-text-secondary text-sm sm:text-base mb-8 sm:mb-10 md:mb-12 max-w-2xl">
        Get to know me better and discover my journey in technology and design.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Main about card */}
        <div className="lg:col-span-2 glass-card p-5 sm:p-6 md:p-8">
          <p className="text-text-secondary text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
            I am a passionate Information Systems student with a keen interest in{" "}
            <span className="text-primary font-medium">UI/UX Design</span> and{" "}
            <span className="text-secondary font-medium">
              Systems Analysis
            </span>
            . I have honed my skills in using design tools such as Figma, Canva,
            Visual Paradigm, and Microsoft Office.
          </p>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
            I am eager to apply my knowledge and creativity in real-world
            projects through an internship program, where I can further develop
            my professional abilities and contribute to innovative solutions.
          </p>
        </div>

        {/* Info cards */}
        <div className="space-y-3 sm:space-y-4">
          <InfoCard
            label="Location"
            value="Semarang, Indonesia"
            color="#00F5FF"
          />
          <InfoCard
            label="University"
            value="Bina Nusantara"
            color="#A855F7"
          />
          <InfoCard
            label="Focus"
            value="UI/UX & Analysis"
            color="#ADFF2F"
          />
        </div>
      </div>

      {/* Tools I use */}
      <div className="mt-10 sm:mt-12">
        <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-4 sm:mb-6">
          Tools & Technologies
        </h3>
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3">
          {[
            "Figma",
            "Canva",
            "Visual Paradigm",
            "VS Code",
            "Microsoft Office",
            "GitHub",
            "Notion",
            "Adobe XD",
          ].map((tool) => (
            <div
              key={tool}
              className="px-3 py-2.5 xs:px-4 xs:py-3 rounded-xl text-xs xs:text-sm font-medium glass-card hover:translate-y-[-2px] transition-all duration-300"
              style={{
                background: "rgba(0,245,255,0.08)",
                color: "#00F5FF",
                border: "1px solid rgba(0,245,255,0.12)",
              }}
            >
              {tool}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ========== EDUCATION PAGE ========== */
function EducationPage() {
  return (
    <div className="animate-fade-in-up">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold section-heading gradient-text-primary mb-3 sm:mb-4">
        Education
      </h1>
      <p className="text-text-secondary text-sm sm:text-base mb-8 sm:mb-10 md:mb-12 max-w-2xl">
        My academic journey and achievements in Information Systems and design.
      </p>

      <div className="space-y-4 sm:space-y-6">
        <EducationCard
          institution="Bina Nusantara University"
          degree="S1 — Information Systems"
          period="2023 — Present"
          desc="Currently in the 6th semester. Focused on UI/UX design, systems analysis, and full-stack software development. Active in student organizations and community projects."
          color="#00F5FF"
          active
        />
        <EducationCard
          institution="Peter Canisius Minor Seminary Mertoyudan"
          degree="Social Sciences (IPS)"
          period="2019 — 2023"
          desc="Graduated with strong foundation in analytical thinking, technology, and communication skills. Participated in various academic competitions and projects."
          color="#A855F7"
        />
      </div>

      {/* Skills Section */}
      <div className="mt-10 sm:mt-12">
        <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-4 sm:mb-6">
          Key Skills Developed
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div
            className="glass-card p-4"
            style={{
              background: "rgba(0,245,255,0.05)",
              border: "1px solid rgba(0,245,255,0.1)",
            }}
          >
            <p className="font-semibold text-primary mb-2 text-sm sm:text-base">Technical</p>
            <p className="text-xs sm:text-sm text-text-secondary">Web Development, Database Design, System Architecture, API Development</p>
          </div>
          <div
            className="glass-card p-4"
            style={{
              background: "rgba(168,85,247,0.05)",
              border: "1px solid rgba(168,85,247,0.1)",
            }}
          >
            <p className="font-semibold text-secondary mb-2 text-sm sm:text-base">Design</p>
            <p className="text-xs sm:text-sm text-text-secondary">UI/UX Design, Wireframing, Prototyping, Visual Design Systems</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========== EXPERIENCE PAGE ========== */
function ExperiencePage() {
  const experiences = [
    {
      title: "CB (Character Building)",
      desc: "Involved in community service projects, providing education to the community and participating in final report compilation, documentation, and creative brainstorming.",
      color: "#00F5FF",
      year: "2024",
    },
    {
      title: "HIMSISFO (Himpunan Sistem Informasi)",
      desc: "Public Relations Commission member for 2025. Involved in event planning committees including BPAR division and HIMSISFO Gold events.",
      color: "#A855F7",
      year: "2024",
    },
    {
      title: "HARDIKNAS (National Education Day)",
      desc: "Served as an educator at SDN Srondol Wetan 05 in learning assistance activities for students during national education celebration.",
      color: "#ADFF2F",
      year: "2024",
    },
  ];

  return (
    <div className="animate-fade-in-up">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold section-heading gradient-text-primary mb-3 sm:mb-4">
        Experience & Activities
      </h1>
      <p className="text-text-secondary text-sm sm:text-base mb-8 sm:mb-10 md:mb-12 max-w-2xl">
        My involvement in educational, organizational, and community projects.
      </p>

      {/* Timeline */}
      <div className="relative pl-6 sm:pl-8">
        {/* Timeline line */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[2px]"
          style={{
            background: "linear-gradient(to bottom, rgba(0,245,255,0.3), rgba(168,85,247,0.3))",
          }}
        />

        <div className="space-y-6 sm:space-y-8 md:space-y-10">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="relative animate-fade-in-left"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              {/* Timeline dot */}
              <div
                className="absolute -left-6 sm:-left-8 top-2 w-4 h-4 sm:w-5 sm:h-5 rounded-full"
                style={{
                  background: exp.color,
                  boxShadow: `0 0 20px ${exp.color}88, inset 0 0 10px ${exp.color}44`,
                  transform: "translateX(calc(1px - 50%))",
                }}
              />

              {/* Card */}
              <div
                className="glass-card p-4 sm:p-5 md:p-6 ml-2 sm:ml-4 hover:translate-x-1 transition-transform duration-300"
                style={{
                  borderLeft: `3px solid ${exp.color}`,
                  background: "rgba(15,23,42,0.6)",
                }}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3
                    className="text-base sm:text-lg md:text-xl font-bold"
                    style={{ color: exp.color }}
                  >
                    {exp.title}
                  </h3>
                  <span className="text-xs font-semibold text-text-muted bg-neutral-light px-2 py-1 rounded flex-shrink-0">
                    {exp.year}
                  </span>
                </div>
                <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
                  {exp.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ========== CERTIFICATES PAGE ========== */
function CertificatesPage() {
  const [lightbox, setLightbox] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  return (
    <>
      <div className="animate-fade-in-up">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold section-heading gradient-text-primary mb-3 sm:mb-4">
          Certificates & Achievements
        </h1>
        <p className="text-text-secondary text-sm sm:text-base mb-8 sm:mb-10 md:mb-12 max-w-2xl">
          Professional certificates and credentials earned through various programs and organizations.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {CERTIFICATES_DATA.map((cert, i) => (
            <div
              key={i}
              className="glass-card overflow-hidden group animate-fade-in-scale hover:shadow-2xl transition-all duration-300"
              style={{
                border: "1px solid rgba(0,245,255,0.1)",
                animationDelay: `${i * 0.2}s`,
              }}
            >
              {/* Image */}
              <div className="relative w-full h-60 sm:h-72 md:h-80 lg:h-96 overflow-hidden bg-neutral">
                <Image
                  src={cert.src}
                  alt={cert.alt}
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer backdrop-blur-sm"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,245,255,0.1), rgba(15,23,42,0.8))",
                  }}
                  onClick={() => setLightbox(cert)}
                >
                  <span className="text-primary font-medium text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 bg-neutral-dark px-3 sm:px-4 py-2 rounded-lg">
                    <ExternalLink size={14} /> View Full Size
                  </span>
                </div>
              </div>

              {/* Label */}
              <div className="p-3 sm:p-4">
                <p className="text-text-primary font-semibold text-sm sm:text-base">{cert.alt}</p>
                <p className="text-text-muted text-xs sm:text-sm">Coordinator of Event Division</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== LIGHTBOX MODAL ===== */}
      {lightbox && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            animation: "fadeInScale 0.3s ease-out both",
          }}
          onClick={() => setLightbox(null)}
        >
          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox(null);
            }}
            className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer z-10 transition-all duration-300 hover:scale-110"
            style={{
              background: "rgba(0, 245, 255, 0.1)",
              border: "1px solid rgba(0, 245, 255, 0.2)",
              color: "#00F5FF",
            }}
          >
            <X size={20} />
          </button>

          {/* Full-size image container */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              maxWidth: "900px",
              maxHeight: "85vh",
              width: "90%",
              border: "1px solid rgba(0, 245, 255, 0.1)",
              boxShadow: "0 0 60px rgba(0, 245, 255, 0.08)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              width={1200}
              height={800}
              className="w-full h-auto object-contain"
              priority
            />

            {/* Caption bar */}
            <div
              className="absolute bottom-0 left-0 right-0 px-6 py-4"
              style={{
                background:
                  "linear-gradient(transparent, rgba(15, 23, 42, 0.95))",
              }}
            >
              <p className="text-text-primary font-medium">{lightbox.alt}</p>
              <p className="text-text-muted text-sm">Professional Certificate</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* =============================================================================
   REUSABLE COMPONENTS
   ============================================================================= */

/* Sidebar Navigation Item */
function SidebarItem({
  icon,
  text,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  text: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer border-none"
      style={{
        background: active
          ? "linear-gradient(135deg, rgba(0,245,255,0.12), rgba(168,85,247,0.08))"
          : "transparent",
        color: active ? "#00F5FF" : "#94A3B8",
        borderLeft: active ? "2px solid #00F5FF" : "2px solid transparent",
      }}
    >
      <span
        style={{
          color: active ? "#00F5FF" : "#64748B",
          transition: "color 0.3s",
        }}
      >
        {icon}
      </span>
      {text}
    </button>
  );
}

/* Lets Connect Widget */
function LetsConnectWidget() {
  return (
    <div
      className="rounded-xl p-4 w-full"
      style={{
        background:
          "linear-gradient(135deg, rgba(0,245,255,0.08), rgba(168,85,247,0.08))",
        border: "1px solid rgba(0,245,255,0.1)",
      }}
    >
      <p className="text-sm font-medium text-text-primary mb-1">
        Let&apos;s Connect!
      </p>
      <p className="text-xs text-text-muted mb-3">
        Open for opportunities
      </p>
      <div className="flex gap-2.5 flex-wrap">
        <SocialIcon
          icon={<FaGithub size={16} />}
          href="https://github.com/Rashta-2911"
        />
        <SocialIcon
          icon={<FaLinkedin size={16} />}
          href="https://www.linkedin.com/in/hernandiarashta/"
        />
        <SocialIcon
          icon={<FaInstagram size={16} />}
          href="https://www.instagram.com/hernandia_rashta/"
        />
        <SocialIcon
          icon={<FaEnvelope size={16} />}
          href="mailto:rashta2911@gmail.com"
        />
        <SocialIcon
          icon={<FaTiktok size={16} />}
          href="https://www.tiktok.com/@rashtarudigdo"
        />
      </div>
    </div>
  );
}

/* Skill Card */
function SkillCard({
  icon,
  name,
  color,
}: {
  icon: React.ReactNode;
  name: string;
  color: string;
}) {
  return (
    <div
      className="glass-card p-3 xs:p-4 sm:p-5 flex flex-col items-center gap-2 xs:gap-2.5 sm:gap-3 group cursor-default hover:translate-y-[-2px] transition-all duration-300"
      style={{
        ["--skill-color" as string]: color,
      }}
    >
      <div
        className="transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-lg"
        style={{ color, filter: `drop-shadow(0 0 8px ${color}44)` }}
      >
        {icon}
      </div>
      <p className="text-xs xs:text-xs sm:text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors text-center">
        {name}
      </p>
    </div>
  );
}

/* Stat Badge */
function StatBadge({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-lg xs:text-xl sm:text-2xl font-bold gradient-text-primary">{value}</p>
      <p className="text-xs xs:text-xs sm:text-sm text-text-muted">{label}</p>
    </div>
  );
}

/* Social Icon */
function SocialIcon({
  icon,
  href,
}: {
  icon: React.ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-primary transition-all duration-300 hover:scale-110"
      style={{
        background: "rgba(0,245,255,0.06)",
        border: "1px solid rgba(0,245,255,0.08)",
      }}
    >
      {icon}
    </a>
  );
}

/* Info Card */
function InfoCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div
      className="glass-card p-4"
      style={{
        borderLeft: `3px solid ${color}`,
      }}
    >
      <p className="text-xs text-text-muted mb-1">{label}</p>
      <p className="text-sm font-semibold text-text-primary">{value}</p>
    </div>
  );
}

/* Education Card */
function EducationCard({
  institution,
  degree,
  period,
  desc,
  color,
  active,
}: {
  institution: string;
  degree: string;
  period: string;
  desc: string;
  color: string;
  active?: boolean;
}) {
  return (
    <div
      className="glass-card p-6 relative overflow-hidden"
      style={{
        borderLeft: `3px solid ${color}`,
      }}
    >
      {/* Active indicator */}
      {active && (
        <span
          className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold"
          style={{
            background: `${color}15`,
            color: color,
            border: `1px solid ${color}30`,
          }}
        >
          Current
        </span>
      )}

      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: `${color}12`,
            border: `1px solid ${color}20`,
          }}
        >
          <GraduationCap size={22} style={{ color }} />
        </div>

        <div>
          <h3 className="text-lg font-bold text-text-primary">{institution}</h3>
          <p className="text-sm font-medium" style={{ color }}>
            {degree}
          </p>
          <p className="text-xs text-text-muted mt-1 mb-3">{period}</p>
          <p className="text-text-secondary text-sm leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function MonkeyTypeStatsRealtime() {
  const [data, setData] = useState<any>(null);
  const [range, setRange] = useState("last 12 months");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [lastSync, setLastSync] = useState<string>("");

  // Helper to get YYYY-MM-DD in local time
  const getLocalDateString = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchData = () => {
      fetch("/API/MonkeyType")
        .then((res) => res.json())
        .then((json) => {
          setData(json);
          setLastSync(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
        })
        .catch((err) => console.error("Failed to fetch MonkeyType stats:", err));
    };

    fetchData();
    const interval = setInterval(fetchData, 300000); // Poll every 5 minutes to avoid rate limit

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      clearInterval(interval);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const stats = data?.profile;
  const results = data?.results || [];

  // Group results by local date with better timestamp handling
  const activityMap: Record<string, number> = {};
  results.forEach((res: any) => {
    try {
      const rawTimestamp = typeof res.timestamp === 'number' ? res.timestamp : new Date(res.timestamp).getTime();
      // Handle both seconds (MonkeyType API) and milliseconds
      const resTimestamp = rawTimestamp < 10000000000 ? rawTimestamp * 1000 : rawTimestamp;
      const dateStr = getLocalDateString(new Date(resTimestamp));
      activityMap[dateStr] = (activityMap[dateStr] || 0) + 1;
    } catch (e) {
      // Skip invalid timestamps
    }
  });

  const getTimeBest = (seconds: number) => stats?.personalBests?.[seconds]?.[0];
  const getWordBest = (words: number) => stats?.personalBests?.words?.[words]?.[0];

  const formatTime = (seconds: number) => {
    if (!seconds) return "-";
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hrs > 0) return `${hrs}h ${mins}m`;
    return `${mins}m`;
  };

  const t15 = getTimeBest(15);
  const t30 = getTimeBest(30);
  const t60 = getTimeBest(60);
  const t120 = getTimeBest(120);

  const w10 = getWordBest(10);
  const w25 = getWordBest(25);
  const w50 = getWordBest(50);
  const w100 = getWordBest(100);

  const StatColumn = ({ label, data }: { label: string, data: any }) => (
    <div className="flex flex-col items-center justify-start min-w-[60px] sm:min-w-[70px]">
      <span className="text-[10px] sm:text-xs text-slate-500 mb-2 font-mono whitespace-nowrap">{label}</span>
      <span className="text-2xl sm:text-3xl font-bold transition-all duration-300" 
            style={{ color: data ? "#00F5FF" : "#64748B", textShadow: data ? "0 0 10px rgba(0,245,255,0.3)" : "none" }}>
        {data ? Math.round(data.wpm) : "-"}
      </span>
      <span className="text-xs sm:text-sm font-medium mt-0.5 transition-all duration-300" 
            style={{ color: data ? "#A855F7" : "#64748B" }}>
        {data ? `${Math.round(data.acc)}%` : "-"}
      </span>
    </div>
  );

  const currentYear = new Date().getFullYear().toString();

  // Heatmap Logic
  const today = new Date();
  const todayStr = getLocalDateString(today);
  const weeks: Date[][] = [];
  
  if (range === currentYear) {
    const startOfYear = new Date(parseInt(currentYear), 0, 1);
    const firstDay = new Date(startOfYear);
    // Align to previous Monday
    const dayOfWeek = firstDay.getDay();
    const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    firstDay.setDate(firstDay.getDate() - diff);
    
    for (let w = 0; w < 53; w++) {
      const week: Date[] = [];
      for (let d = 0; d < 7; d++) {
        const day = new Date(firstDay);
        day.setDate(day.getDate() + (w * 7) + d);
        week.push(day);
      }
      weeks.push(week);
    }
  } else {
    const startPoint = new Date(today);
    startPoint.setFullYear(startPoint.getFullYear() - 1);
    const firstDay = new Date(startPoint);
    firstDay.setHours(0, 0, 0, 0);
    // Align to previous Monday
    const dayOfWeek = firstDay.getDay();
    const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    firstDay.setDate(firstDay.getDate() - diff);

    for (let w = 0; w < 53; w++) {
      const week: Date[] = [];
      for (let d = 0; d < 7; d++) {
        const day = new Date(firstDay);
        day.setDate(day.getDate() + (w * 7) + d);
        week.push(day);
      }
      weeks.push(week);
    }
  }

  const testsThisYear = Object.keys(activityMap).reduce((acc, date) => {
    return date.startsWith(currentYear) ? acc + activityMap[date] : acc;
  }, 0);

  const avgWPM = results.length > 0 
    ? Math.round(results.reduce((acc: number, r: any) => acc + r.wpm, 0) / results.length) 
    : 0;
  const avgAcc = results.length > 0
    ? Math.round(results.reduce((acc: number, r: any) => acc + r.acc, 0) / results.length)
    : 0;

  return (
    <div className="w-full overflow-x-hidden font-mono mt-6 sm:mt-8">
      <div className="flex items-center gap-3 mb-6 px-2">
        <FaKeyboard size={24} color="#00F5FF" />
        <h3 className="text-xl sm:text-2xl font-bold gradient-text-primary">MonkeyType Profile</h3>
        {lastSync && <span className="text-[10px] text-slate-500 font-mono ml-auto opacity-60">Sync: {lastSync}</span>}
        {!data && <span className="w-2 h-2 rounded-full bg-cyan-400/50 animate-pulse ml-2" />}
        {data?.isRateLimited && (
          <span className="text-[10px] text-amber-500 font-mono ml-2 animate-pulse">
            [Rate Limited - Retrying...]
          </span>
        )}
      </div>

        <div className="flex gap-4 sm:gap-6 px-2 mb-8 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex flex-col min-w-max">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">completed</span>
            <span className="text-xl font-bold text-[#00F5FF]">{stats?.typingStats?.completedTests || 0}</span>
          </div>
          <div className="flex flex-col border-l border-slate-800 pl-4 sm:pl-6 min-w-max">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">started</span>
            <span className="text-xl font-bold text-slate-400">{stats?.typingStats?.startedTests || 0}</span>
          </div>
          <div className="flex flex-col border-l border-slate-800 pl-4 sm:pl-6 min-w-max">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">avg wpm</span>
            <span className="text-xl font-bold text-[#ADFF2F]">{avgWPM || "-"}</span>
          </div>
          <div className="flex flex-col border-l border-slate-800 pl-4 sm:pl-6 min-w-max">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">avg acc</span>
            <span className="text-xl font-bold text-slate-300">{avgAcc ? `${avgAcc}%` : "-"}</span>
          </div>
          <div className="flex flex-col border-l border-slate-800 pl-4 sm:pl-6 min-w-max">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">time typing</span>
            <span className="text-xl font-bold text-[#A855F7]">{formatTime(stats?.typingStats?.timeTyping || 0)}</span>
          </div>
        </div>

      <div className="flex flex-col gap-4 sm:gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 w-full">
          <div className="rounded-xl p-5 sm:p-6 flex justify-between items-start w-full relative group transition-colors duration-300 hover:bg-slate-800/40" 
               style={{ background: "#0F172A", border: "1px solid rgba(0, 245, 255, 0.1)" }}>
            <StatColumn label="15 seconds" data={t15} />
            <StatColumn label="30 seconds" data={t30} />
            <StatColumn label="60 seconds" data={t60} />
            <StatColumn label="120 seconds" data={t120} />
            <div className="absolute right-3 sm:right-4 top-3 sm:top-4 text-slate-600 transition-colors cursor-pointer hover:text-[#00F5FF]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
            </div>
          </div>

          <div className="rounded-xl p-5 sm:p-6 flex justify-between items-start w-full relative group transition-colors duration-300 hover:bg-slate-800/40" 
               style={{ background: "#0F172A", border: "1px solid rgba(168, 85, 247, 0.1)" }}>
            <StatColumn label="10 words" data={w10} />
            <StatColumn label="25 words" data={w25} />
            <StatColumn label="50 words" data={w50} />
            <StatColumn label="100 words" data={w100} />
            <div className="absolute right-3 sm:right-4 top-3 sm:top-4 text-slate-600 transition-colors cursor-pointer hover:text-[#A855F7]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
            </div>
          </div>
        </div>

        <div className="rounded-xl p-4 sm:p-6 w-full overflow-x-auto" 
             style={{ background: "#0F172A", border: "1px solid rgba(173, 255, 47, 0.15)" }}>
          <div className="flex justify-between items-end mb-4 min-w-max px-1">
            <div className="flex items-center gap-4">
              <div ref={dropdownRef} className="relative">
                <div 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="px-3 py-1.5 rounded flex items-center gap-2 cursor-pointer text-[11px] sm:text-xs text-slate-300 transition-colors hover:text-white select-none"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                >
                  {range} 
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"/></svg>
                </div>

                {dropdownOpen && (
                  <div className="absolute left-0 top-full mt-1 w-40 rounded-lg shadow-xl z-50 overflow-hidden py-1" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)" }}>
                    {["last 12 months", currentYear].map((opt) => (
                      <div key={opt} onClick={() => { setRange(opt); setDropdownOpen(false); }} className={`px-3 py-2 text-[11px] sm:text-xs cursor-pointer transition-colors ${range === opt ? 'text-[#ADFF2F] bg-slate-800' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <span className="text-[11px] sm:text-xs text-slate-500 font-mono tracking-wide">
                {range === currentYear ? `${testsThisYear} tests` : (`${stats?.typingStats?.completedTests || 0} tests`)}
                {!data?.hasRealResults && results.length > 0 && <span className="text-[9px] text-slate-600 ml-1">(est.)</span>}
              </span>
            </div>
            
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-500 font-mono tracking-wide">
              less
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm ml-1" style={{ background: "rgba(30, 41, 59, 0.5)" }} />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm" style={{ background: "rgba(173, 255, 47, 0.2)" }} />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm" style={{ background: "rgba(173, 255, 47, 0.5)" }} />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm" style={{ background: "rgba(173, 255, 47, 0.8)" }} />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm mr-1" style={{ background: "#ADFF2F" }} />
              more
            </div>
          </div>
          
          <div className="flex gap-1.5 sm:gap-2 min-w-max text-[10px] sm:text-xs text-slate-500 font-mono pr-2">
            <div className="flex flex-col justify-between py-1 pr-1 sm:pr-3 h-[90px] sm:h-[110px]">
              <span className="text-[10px] uppercase text-slate-500">mon</span>
              <span className="text-[10px] uppercase text-slate-500/30">tue</span>
              <span className="text-[10px] uppercase text-slate-500">wed</span>
              <span className="text-[10px] uppercase text-slate-500/30">thu</span>
              <span className="text-[10px] uppercase text-slate-500">fri</span>
              <span className="text-[10px] uppercase text-slate-500/30">sat</span>
              <span className="text-[10px] uppercase text-slate-500">sun</span>
            </div>
            
            <div className="flex gap-1">
              {weeks.map((week, colIndex) => (
                <div key={colIndex} className="flex flex-col gap-1">
                  {week.map((day, rowIndex) => {
                    const dateStr = getLocalDateString(day);
                    const testsCount = activityMap[dateStr] || 0;
                    const isToday = dateStr === todayStr;
                    const isFuture = day > today && !isToday;
                    
                    let bg = "rgba(30, 41, 59, 0.6)"; 
                    if (isFuture) bg = "rgba(30, 41, 59, 0.2)";
                    else if (testsCount >= 10) bg = "#ADFF2F";
                    else if (testsCount >= 5) bg = "rgba(173, 255, 47, 0.8)";
                    else if (testsCount >= 3) bg = "rgba(173, 255, 47, 0.5)";
                    else if (testsCount >= 1) bg = "rgba(173, 255, 47, 0.25)";

                    const dateFormatted = day.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

                    return (
                      <div 
                        key={rowIndex} 
                        className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[2px] cursor-pointer group/cell relative"
                        style={{ background: bg }}
                      >
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-slate-800 text-[9px] sm:text-[10px] text-white whitespace-nowrap opacity-0 group-hover/cell:opacity-100 pointer-events-none transition-opacity z-[100] border border-slate-700 shadow-xl">
                          {testsCount} {testsCount === 1 ? 'test' : 'tests'} on {dateFormatted}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <p className="text-[9px] sm:text-[10px] text-slate-600 text-center mt-6 tracking-wide uppercase">
            {data?.hasRealResults ? "✓ Real activity data (UTC time)" : "⚡ Estimated activity from profile stats"}
          </p>
        </div>
      </div>
    </div>
  );
}

function GithubStatsRealtime() {

  const [stats, setStats] = useState<any>(null)
  const [streak, setStreak] = useState(0)
  const [todayCommit, setTodayCommit] = useState(0)

  useEffect(() => {
    fetch("/API/Github")
      .then(res => res.json())
      .then(data => {

        setStats(data)

        const allDays = data.weeks.flatMap((w:any)=>
          w.contributionDays
        )

        let currentStreak = 0

        for (let i = allDays.length - 1; i >= 0; i--) {
          if (allDays[i].contributionCount > 0) {
            currentStreak++
          } else {
            break
          }
        }

        setStreak(currentStreak)

        const today = new Date().toISOString().split("T")[0]

        const todayData = allDays.find((d:any)=>
          d.date === today
        )

        if (todayData) {
          setTodayCommit(todayData.contributionCount)
        }

      })
  }, [])

  if (!stats) return <p>Loading GitHub Stats...</p>

  // Get contribution color based on count
  const getContributionColor = (count: number, maxCount: number) => {
    if (count === 0) return "rgba(255, 255, 255, 0.1)";
    const intensity = Math.min(count / Math.max(maxCount, 1), 1);
    if (intensity < 0.25) return "rgba(173, 255, 47, 0.3)";
    if (intensity < 0.5) return "rgba(173, 255, 47, 0.5)";
    if (intensity < 0.75) return "rgba(173, 255, 47, 0.7)";
    return "rgba(173, 255, 47, 1)";
  };

  // Get max contribution count
  const allDays = stats.weeks.flatMap((w:any) => w.contributionDays);
  const maxContribution = Math.max(...allDays.map((d:any) => d.contributionCount));

  // Get month labels with proper positioning
  const getMonthLabel = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en", { month: "short" });
  };

  // Calculate month boundaries and their positions
  const monthPositions: { month: string; startWeek: number; endWeek: number }[] = [];
  let currentMonth = "";
  let monthStart = 0;

  stats.weeks.forEach((week: any, weekIndex: number) => {
    if (week.contributionDays.length > 0) {
      const firstDay = week.contributionDays[0].date;
      const month = getMonthLabel(firstDay);
      
      if (month !== currentMonth) {
        if (currentMonth !== "") {
          monthPositions.push({
            month: currentMonth,
            startWeek: monthStart,
            endWeek: weekIndex - 1,
          });
        }
        currentMonth = month;
        monthStart = weekIndex;
      }
    }
  });

  // Add the last month
  if (currentMonth !== "") {
    monthPositions.push({
      month: currentMonth,
      startWeek: monthStart,
      endWeek: stats.weeks.length - 1,
    });
  }

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const CELL_SIZE = 20; // Size of each contribution square + gap
  const CELL_GAP = 0.5; // Gap between cells

  return (
    <div className="w-full mt-12 overflow-x-auto pb-4">
      <div 
        className="glass-card p-3 xs:p-4 sm:p-6 inline-block min-w-full"
        style={{
          background: "rgba(15, 23, 42, 0.6)",
          border: "1px solid rgba(0, 245, 255, 0.1)",
        }}
      >
        {/* Month labels */}
        <div className="flex items-start overflow-x-auto">
          {/* Spacer for day labels column */}
          <div style={{ minWidth: "32px" }} className="xs:block hidden" />
          <div style={{ minWidth: "24px" }} className="xs:hidden" />
          
          {/* Month labels row */}
          <div className="flex" style={{ gap: `${CELL_GAP}px` }}>
            {monthPositions.map((monthPos, idx) => {
              const monthWidth = (monthPos.endWeek - monthPos.startWeek + 1) * CELL_SIZE;
              return (
                <div
                  key={`month-${idx}`}
                  style={{
                    width: `${monthWidth}px`,
                    textAlign: "left",
                    paddingLeft: "2px",
                  }}
                >
                  <p className="text-xs text-text-muted font-medium">{monthPos.month}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contribution grid */}
        <div className="flex gap-1 mt-2 xs:mt-4 overflow-x-auto">
          {/* Day labels column */}
          <div className="flex flex-col gap-0.5">
            {dayLabels.map((day) => (
              <div
                key={day}
                className="flex items-center justify-center text-xs xs:text-sm"
                style={{
                  minWidth: "24px",
                  height: `${CELL_SIZE}px`,
                }}
              >
                <span className="text-text-muted font-medium hidden xs:inline">{day}</span>
                <span className="text-text-muted font-medium xs:hidden">{day[0]}</span>
              </div>
            ))}
          </div>

          {/* Weeks grid */}
          <div className="flex" style={{ gap: `${CELL_GAP}px` }}>
            {stats.weeks.map((week: any, weekIndex: number) => (
              <div key={weekIndex} className="flex flex-col gap-0.5">
                {week.contributionDays.map((day: any, dayIndex: number) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    title={`${day.date}: ${day.contributionCount} contributions`}
                    className="rounded-sm cursor-pointer hover:ring-1 hover:ring-primary transition-all"
                    style={{
                      width: `${CELL_SIZE - CELL_GAP}px`,
                      height: `${CELL_SIZE - CELL_GAP}px`,
                      backgroundColor: getContributionColor(day.contributionCount, maxContribution),
                      border: "1px solid rgba(0, 245, 255, 0.1)",
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 mt-3 xs:mt-4 pt-3 xs:pt-4 border-t border-gray-700 flex-wrap">
          <span className="text-xs text-text-muted">Less</span>
          <div className="flex gap-0.5">
            <div
              className="w-2.5 h-2.5 xs:w-3 xs:h-3 rounded-sm"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            />
            <div
              className="w-2.5 h-2.5 xs:w-3 xs:h-3 rounded-sm"
              style={{ backgroundColor: "rgba(173, 255, 47, 0.3)" }}
            />
            <div
              className="w-2.5 h-2.5 xs:w-3 xs:h-3 rounded-sm"
              style={{ backgroundColor: "rgba(173, 255, 47, 0.5)" }}
            />
            <div
              className="w-2.5 h-2.5 xs:w-3 xs:h-3 rounded-sm"
              style={{ backgroundColor: "rgba(173, 255, 47, 0.7)" }}
            />
            <div
              className="w-2.5 h-2.5 xs:w-3 xs:h-3 rounded-sm"
              style={{ backgroundColor: "rgba(173, 255, 47, 1)" }}
            />
          </div>
          <span className="text-xs text-text-muted">More</span>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 gap-2 xs:gap-3 sm:gap-4 mt-4 xs:mt-6 pt-4 xs:pt-6 border-t border-gray-700">
          <div>
            <p className="text-lg xs:text-xl sm:text-2xl font-bold gradient-text-primary">{stats.repos}</p>
            <p className="text-xs text-text-muted mt-0.5">
              <span className="xs:hidden">Repos</span>
              <span className="hidden xs:inline">Repositories</span>
            </p>
          </div>
          <div>
            <p className="text-lg xs:text-xl sm:text-2xl font-bold gradient-text-primary">{stats.followers}</p>
            <p className="text-xs text-text-muted mt-0.5">Followers</p>
          </div>
          <div>
            <p className="text-lg xs:text-xl sm:text-2xl font-bold gradient-text-primary">{stats.contributions}</p>
            <p className="text-xs text-text-muted mt-0.5">
              <span className="xs:hidden">Contribs</span>
              <span className="hidden xs:inline">Contributions</span>
            </p>
          </div>
          <div className="col-span-2 xs:col-span-1">
            <p className="text-lg xs:text-xl sm:text-2xl font-bold gradient-text-primary">{todayCommit}</p>
            <p className="text-xs text-text-muted mt-0.5">Today</p>
          </div>
          <div>
            <p className="text-lg xs:text-xl sm:text-2xl font-bold gradient-text-primary">🔥 {streak}</p>
            <p className="text-xs text-text-muted mt-0.5">Streak</p>
          </div>
        </div>
      </div>
    </div>
  )
}