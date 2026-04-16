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
} from "react-icons/fa";

import { SiNextdotjs, SiTailwindcss, SiRedux, SiCanva, SiVisualparadigm, SiLaravel, SiPhp, SiMysql } from "react-icons/si";

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
  },
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
    <div className="flex min-h-screen relative">
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
        <div className="px-6 py-6">
          <div
            className="rounded-xl p-4"
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
            <div className="flex gap-3">
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
                href="mailto: [rashta2911@gmail.com]"
              />
              <SocialIcon
                icon={<FaTiktok size={16} />}
                href="https://www.tiktok.com/@rashtarudigdo"
              />
            </div>
          </div>
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
          className="md:hidden fixed inset-0 z-40 glass"
          style={{ paddingTop: "64px" }}
        >
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
        </div>
      )}

      {/* ========== MAIN CONTENT ========== */}
      <main className="flex-1 md:ml-72 min-h-screen grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8 md:py-16 mt-14 md:mt-0 w-full overflow-hidden">
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
      <section className="min-h-[80vh] flex items-center">
        <div className="grid md:grid-cols-2 gap-12 items-center w-full">
          {/* Left Column */}
          <div className="animate-fade-in-left order-2 md:order-1">
            {/* Status badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{
                background: "rgba(0,245,255,0.08)",
                border: "1px solid rgba(0,245,255,0.15)",
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "#ADFF2F" }}
              />
              <span className="text-sm text-primary">
                Open to opportunities
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="text-text-primary">Hi, I&apos;m</span>
              <br />
              <span className="gradient-text-primary">
                Hernandia Rashta R
              </span>
            </h1>

            <p className="text-text-secondary text-lg leading-relaxed mb-8 max-w-lg">
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
            <div className="flex flex-wrap gap-4">
              <a
                href="/Documents/CV.pdf"
                download
                className="btn-primary inline-flex items-center gap-2 text-sm no-underline"
              >
                <Download size={18} />
                Download CV
              </a>
              <button
                onClick={() =>
                  document
                    .getElementById("skills")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-secondary inline-flex items-center gap-2 text-sm cursor-pointer"
              >
                View Skills
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-4 sm:gap-8 mt-10">
              <StatBadge value="6th" label="Semester" />
              <StatBadge value={PROJECTS_DATA.length.toString()} label="Projects" />
              <StatBadge value={CERTIFICATES_DATA.length.toString()} label="Certificates" />
            </div>
          </div>

          {/* Right Column — Profile Image */}
          <div className="flex justify-center order-1 md:order-2 animate-fade-in-right">
            <div className="relative">
              {/* Decorative orbit rings */}
              <div
                className="absolute inset-0 rounded-full w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[400px] lg:h-[400px]"
                style={{
                  margin: "auto",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}
              >
                <div
                  className="absolute w-4 h-4 rounded-full"
                  style={{
                    background: "#00F5FF",
                    boxShadow: "0 0 15px rgba(0,245,255,0.6)",
                    animation: "orbit 8s linear infinite",
                    top: "50%",
                    left: "50%",
                  }}
                />
                <div
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    background: "#A855F7",
                    boxShadow: "0 0 15px rgba(168,85,247,0.6)",
                    animation: "orbit 12s linear infinite reverse",
                    top: "50%",
                    left: "50%",
                  }}
                />
                <div
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: "#ADFF2F",
                    boxShadow: "#00F5FF",
                    animation: "orbit 16s linear infinite",
                    top: "50%",
                    left: "50%",
                  }}
                />
              </div>

              {/* Profile image */}
              <div className="profile-ring">
                <div
                  className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden"
                  style={{
                    border: "3px solid rgba(15,23,42,0.8)",
                  }}
                >
                  <Image
                    src="/Images/profile.jpg"
                    alt="Hernandia Rashta R"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="mt-24 animate-fade-in-up delay-300">
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-3xl font-bold section-heading gradient-text-primary">
            Tech Stack & Skills
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
          <SkillCard
            icon={<FaHtml5 size={36} />}
            name="HTML"
            color="#E44D26"
          />
          <SkillCard
            icon={<FaCss3Alt size={36} />}
            name="CSS"
            color="#1572B6"
          />
          <SkillCard
            icon={<FaJsSquare size={36} />}
            name="JavaScript"
            color="#F0DB4F"
          />
          <SkillCard
            icon={<FaReact size={36} />}
            name="React"
            color="#61DAFB"
          />
          <SkillCard
            icon={<SiNextdotjs size={36} />}
            name="Next.js"
            color="#ffffff"
          />
          <SkillCard
            icon={<SiTailwindcss size={36} />}
            name="Tailwind"
            color="#38BDF8"
          />
          <SkillCard
            icon={<SiRedux size={36} />}
            name="Redux"
            color="#764ABC"
          />
          <SkillCard
            icon={<FaNodeJs size={36} />}
            name="Node.js"
            color="#68A063"
          />
          <SkillCard
            icon={<FaFigma size={36} />}
            name="Figma"
            color="#A259FF"
          />
          <SkillCard
            icon={<SiCanva size={36} />}
            name="Canva"
            color="#00C4CC"
          />
          <SkillCard
            icon={<SiVisualparadigm size={36} />}
            name="Visual Paradigm"
            color="#E3001B"
          />
          <SkillCard
            icon={<SiLaravel size={36} />}
            name="Laravel"
            color="#E3001B"
          />
          <SkillCard
            icon={<SiPhp size={36} />}
            name="PHP"
            color="#4F5B93"
          />
          <SkillCard
            icon={<SiMysql size={36} />}
            name="MySQL"
            color="#4F5B93"
          />
        </div>
      </section>

      {/* GITHUB CONTRIBUTIONS */}
      <section className="mt-32 animate-fade-in-up">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-3xl font-bold section-heading gradient-text-primary">
            GitHub Contributions
          </h2>
        </div>
        <GithubStatsRealtime />
      </section>
    </div>
  );
}

/* ========== PROJECTS PAGE ========== */
function ProjectsPage() {
  return (
    <div className="animate-fade-in-up">
      <h1 className="text-4xl font-bold section-heading text-white mb-4">
        My Projects
      </h1>
      <p className="text-text-secondary mb-12 max-w-2xl">
        Explore my latest projects showcasing expertise in full-stack development, UI/UX design, and systems analysis.
      </p>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {PROJECTS_DATA.map((project, i) => (
          <div
            key={i}
            className="glass-card p-6 group hover:translate-y-[-4px] transition-all duration-300"
            style={{
              background: "rgba(0,245,255,0.05)",
              borderColor: "rgba(0,245,255,0.15)",
              border: "1px solid rgba(0,245,255,0.15)",
              animationDelay: `${i * 0.15}s`,
            }}
          >
            {/* Project icon placeholder */}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
              style={{
                background: "linear-gradient(135deg, rgba(0,245,255,0.15), rgba(168,85,247,0.15))",
                border: "1px solid rgba(0,245,255,0.2)",
              }}
            >
              <FolderKanban
                size={22}
                className="text-primary"
              />
            </div>

            <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              {project.desc}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full font-medium"
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

            <button className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:gap-3 transition-all cursor-pointer bg-transparent border-none hover:text-secondary">
              View Project <ExternalLink size={14} />
            </button>
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
      <h1 className="text-4xl font-bold section-heading text-white mb-4">
        About Me
      </h1>
      <p className="text-text-secondary mb-12 max-w-2xl">
        Get to know me better and discover my journey in technology and design.
      </p>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main about card */}
        <div className="lg:col-span-2 glass-card p-6 sm:p-8">
          <p className="text-text-secondary text-lg leading-relaxed mb-6">
            I am a passionate Information Systems student with a keen interest in{" "}
            <span className="text-primary font-medium">UI/UX Design</span> and{" "}
            <span className="text-secondary font-medium">
              Systems Analysis
            </span>
            . I have honed my skills in using design tools such as Figma, Canva,
            Visual Paradigm, and Microsoft Office.
          </p>
          <p className="text-text-secondary leading-relaxed">
            I am eager to apply my knowledge and creativity in real-world
            projects through an internship program, where I can further develop
            my professional abilities and contribute to innovative solutions.
          </p>
        </div>

        {/* Info cards */}
        <div className="space-y-4">
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
      <div className="mt-12">
        <h3 className="text-xl font-bold text-text-primary mb-6">
          Tools & Technologies
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
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
              className="px-4 py-3 rounded-xl text-sm font-medium glass-card hover:translate-y-[-2px] transition-all duration-300"
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
      <h1 className="text-4xl font-bold section-heading gradient-text-primary mb-4">
        Education
      </h1>
      <p className="text-text-secondary mb-12 max-w-2xl">
        My academic journey and achievements in Information Systems and design.
      </p>

      <div className="space-y-6">
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
      <div className="mt-12">
        <h3 className="text-xl font-bold text-text-primary mb-6">
          Key Skills Developed
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className="glass-card p-4"
            style={{
              background: "rgba(0,245,255,0.05)",
              border: "1px solid rgba(0,245,255,0.1)",
            }}
          >
            <p className="font-semibold text-primary mb-2">Technical</p>
            <p className="text-sm text-text-secondary">Web Development, Database Design, System Architecture, API Development</p>
          </div>
          <div
            className="glass-card p-4"
            style={{
              background: "rgba(168,85,247,0.05)",
              border: "1px solid rgba(168,85,247,0.1)",
            }}
          >
            <p className="font-semibold text-secondary mb-2">Design</p>
            <p className="text-sm text-text-secondary">UI/UX Design, Wireframing, Prototyping, Visual Design Systems</p>
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
      <h1 className="text-4xl font-bold section-heading gradient-text-primary mb-4">
        Experience & Activities
      </h1>
      <p className="text-text-secondary mb-12 max-w-2xl">
        My involvement in educational, organizational, and community projects.
      </p>

      {/* Timeline */}
      <div className="relative pl-8">
        {/* Timeline line */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[2px]"
          style={{
            background: "linear-gradient(to bottom, rgba(0,245,255,0.3), rgba(168,85,247,0.3))",
          }}
        />

        <div className="space-y-10">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="relative animate-fade-in-left"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              {/* Timeline dot */}
              <div
                className="absolute -left-8 top-2 w-5 h-5 rounded-full"
                style={{
                  background: exp.color,
                  boxShadow: `0 0 20px ${exp.color}88, inset 0 0 10px ${exp.color}44`,
                  left: "-0.62rem",
                }}
              />

              {/* Card */}
              <div
                className="glass-card p-6 ml-4 hover:translate-x-1 transition-transform duration-300"
                style={{
                  borderLeft: `3px solid ${exp.color}`,
                  background: "rgba(15,23,42,0.6)",
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3
                    className="text-xl font-bold"
                    style={{ color: exp.color }}
                  >
                    {exp.title}
                  </h3>
                  <span className="text-xs font-semibold text-text-muted bg-neutral-light px-2 py-1 rounded">
                    {exp.year}
                  </span>
                </div>
                <p className="text-text-secondary leading-relaxed">
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
        <h1 className="text-4xl font-bold section-heading gradient-text-primary mb-4">
          Certificates & Achievements
        </h1>
        <p className="text-text-secondary mb-12 max-w-2xl">
          Professional certificates and credentials earned through various programs and organizations.
        </p>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
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
              <div className="relative w-full h-80 overflow-hidden bg-neutral">
                <Image
                  src={cert.src}
                  alt={cert.alt}
                  fill
                  priority
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
                  <span className="text-primary font-medium text-sm flex items-center gap-2 bg-neutral-dark px-4 py-2 rounded-lg">
                    <ExternalLink size={16} /> View Full Size
                  </span>
                </div>
              </div>

              {/* Label */}
              <div className="p-4">
                <p className="text-text-primary font-semibold">{cert.alt}</p>
                <p className="text-text-muted text-sm">Professional Certificate</p>
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
      className="glass-card p-5 flex flex-col items-center gap-3 group cursor-default"
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
      <p className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">
        {name}
      </p>
    </div>
  );
}

/* Stat Badge */
function StatBadge({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-2xl font-bold gradient-text-primary">{value}</p>
      <p className="text-xs text-text-muted">{label}</p>
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
  const CELL_SIZE = 14; // Size of each contribution square + gap
  const CELL_GAP = 2; // Gap between cells

  return (
    <div className="w-full mt-12 overflow-x-auto pb-4">
      <div 
        className="glass-card p-6 inline-block min-w-full"
        style={{
          background: "rgba(15, 23, 42, 0.6)",
          border: "1px solid rgba(0, 245, 255, 0.1)",
        }}
      >
        {/* Month labels */}
        <div className="flex items-start">
          {/* Spacer for day labels column */}
          <div style={{ minWidth: "42px" }} />
          
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
        <div className="flex gap-1 mt-4">
          {/* Day labels column */}
          <div className="flex flex-col gap-0.5">
            {dayLabels.map((day) => (
              <div
                key={day}
                className="flex items-center justify-center"
                style={{
                  minWidth: "42px",
                  height: `${CELL_SIZE}px`,
                }}
              >
                <span className="text-xs text-text-muted font-medium">{day}</span>
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
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-700">
          <span className="text-xs text-text-muted">Less</span>
          <div className="flex gap-0.5">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            />
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: "rgba(173, 255, 47, 0.3)" }}
            />
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: "rgba(173, 255, 47, 0.5)" }}
            />
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: "rgba(173, 255, 47, 0.7)" }}
            />
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: "rgba(173, 255, 47, 1)" }}
            />
          </div>
          <span className="text-xs text-text-muted">More</span>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-6 pt-6 border-t border-gray-700">
          <div>
            <p className="text-2xl font-bold gradient-text-primary">{stats.repos}</p>
            <p className="text-xs text-text-muted">Repositories</p>
          </div>
          <div>
            <p className="text-2xl font-bold gradient-text-primary">{stats.followers}</p>
            <p className="text-xs text-text-muted">Followers</p>
          </div>
          <div>
            <p className="text-2xl font-bold gradient-text-primary">{stats.contributions}</p>
            <p className="text-xs text-text-muted">Contributions</p>
          </div>
          <div>
            <p className="text-2xl font-bold gradient-text-primary">{todayCommit}</p>
            <p className="text-xs text-text-muted">Today</p>
          </div>
          <div>
            <p className="text-2xl font-bold gradient-text-primary">🔥 {streak}</p>
            <p className="text-xs text-text-muted">Streak</p>
          </div>
        </div>
      </div>
    </div>
  )
}