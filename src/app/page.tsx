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
        className="hidden md:flex w-70 flex-col fixed top-0 left-0 h-screen z-40 glass"
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
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-8 md:py-16 mt-14 md:mt-0">
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

            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
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
            <div className="flex gap-8 mt-10">
              <StatBadge value="6th" label="Semester" />
              <StatBadge value="10+" label="Projects" />
              <StatBadge value="2" label="Certificates" />
            </div>
          </div>

          {/* Right Column — Profile Image */}
          <div className="flex justify-center order-1 md:order-2 animate-fade-in-right">
            <div className="relative">
              {/* Decorative orbit rings */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  width: "320px",
                  height: "320px",
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
                    boxShadow: "0 0 15px rgba(173,255,47,0.6)",
                    animation: "orbit 16s linear infinite",
                    top: "50%",
                    left: "50%",
                  }}
                />
              </div>

              {/* Profile image */}
              <div className="profile-ring">
                <div
                  className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden"
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <SkillCard
            icon={<FaHtml5 size={36} />}
            name="HTML5"
            color="#E44D26"
          />
          <SkillCard
            icon={<FaCss3Alt size={36} />}
            name="CSS3"
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
    </div>
  );
}

/* ========== PROJECTS PAGE ========== */
function ProjectsPage() {
  const projects = [
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

  return (
    <div className="animate-fade-in-up">
      <h1 className="text-4xl font-bold section-heading gradient-text-primary mb-12">
        My Projects
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <div
            key={i}
            className="glass-card p-6 group"
            style={{
              background: project.gradient,
              borderColor: project.borderColor,
              animationDelay: `${i * 0.15}s`,
            }}
          >
            {/* Project icon placeholder */}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{
                background: "rgba(0,245,255,0.1)",
                border: "1px solid rgba(0,245,255,0.15)",
              }}
            >
              <FolderKanban
                size={22}
                className="text-primary group-hover:scale-110 transition-transform"
              />
            </div>

            <h3 className="text-xl font-bold text-text-primary mb-2">
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

            <button className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:gap-3 transition-all cursor-pointer bg-transparent border-none">
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
      <h1 className="text-4xl font-bold section-heading gradient-text-primary mb-12">
        About Me
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main about card */}
        <div className="md:col-span-2 glass-card p-8">
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
          Tools I Use
        </h3>
        <div className="flex flex-wrap gap-3">
          {[
            "Figma",
            "Canva",
            "Visual Paradigm",
            "VS Code",
            "Microsoft Office",
            "GitHub",
            "Notion",
          ].map((tool) => (
            <span
              key={tool}
              className="px-4 py-2 rounded-xl text-sm font-medium glass-card"
              style={{
                background: "rgba(15,23,42,0.5)",
                color: "#94A3B8",
                border: "1px solid rgba(0,245,255,0.06)",
              }}
            >
              {tool}
            </span>
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
      <h1 className="text-4xl font-bold section-heading gradient-text-primary mb-12">
        Education
      </h1>

      <div className="space-y-6">
        <EducationCard
          institution="Bina Nusantara University"
          degree="S1 — Information Systems"
          period="2023 — Present"
          desc="Currently in the 5th semester. Focused on UI/UX design, systems analysis, and software development."
          color="#00F5FF"
          active
        />
        <EducationCard
          institution="Peter Canisius Minor Seminary Mertoyudan"
          degree="Social Sciences (IPS)"
          period="2019 — 2023"
          desc="Graduated with strong foundation in analytical thinking and technology."
          color="#A855F7"
        />
      </div>
    </div>
  );
}

/* ========== EXPERIENCE PAGE ========== */
function ExperiencePage() {
  const experiences = [
    {
      title: "CB (Character Building)",
      desc: "Dalam proyek ini saya terlibat dalam memberikan ajaran kepada masyarakat dan berpartisipasi dalam penyusunan laporan akhir, dokumentasi dan brainstorming ide kreatif.",
      color: "#00F5FF",
    },
    {
      title: "HIMSISFO (Himpunan Sistem Informasi)",
      desc: "Sebagai aktivis HIMSISFO komisi 2 Public Relation 2025 terlibat dalam kepanitiaan divisi acara BPAR dan HIMSISFO Gold.",
      color: "#00F5FF",
    },
    {
      title: "HARDIKNAS (Hari Pendidikan Nasional)",
      desc: "Berperan sebagai pengajar di SDN Srondol Wetan 05 dalam kegiatan pendampingan belajar bagi siswa.",
      color: "#00F5FF",
    },
  ];

  return (
    <div className="animate-fade-in-up">
      <h1 className="text-4xl font-bold section-heading gradient-text-primary mb-12">
        Experience
      </h1>

      {/* Timeline */}
      <div className="relative pl-8">
        {/* Timeline line */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[2px]"
          style={{
            background:
              "linear-gradient(180deg, #00F5FF, #00F5FF, #00F5FF, transparent)",
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
                className="absolute -left-8 top-2 w-4 h-4 rounded-full"
                style={{
                  background: exp.color,
                  border: "3px solid #070b14",
                  boxShadow: `0 0 15px ${exp.color}66`,
                  transform: "translateX(-50%)",
                  left: "-0.02rem",
                }}
              />

              {/* Card */}
              <div className="glass-card p-6 ml-4">
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: exp.color }}
                >
                  {exp.title}
                </h3>
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

  const certs = [
    { src: "/Images/Certificate 1.jpg", alt: "Inolabs Academy" },
    { src: "/Images/Certificate 2.jpg", alt: "HIMSISFO (Himpunan Sistem Informasi)" },
  ];

  return (
    <>
      <div className="animate-fade-in-up">
        <h1 className="text-4xl font-bold section-heading gradient-text-primary mb-12">
          Certificates
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {certs.map((cert, i) => (
            <div
              key={i}
              className="glass-card overflow-hidden group animate-fade-in-scale"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              {/* Image */}
              <div className="relative w-full h-78 overflow-hidden">
                <Image
                  src={cert.src}
                  alt={cert.alt}
                  fill
                  priority
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay on hover — click opens lightbox */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent, rgba(15,23,42,0.8))",
                  }}
                  onClick={() => setLightbox(cert)}
                >
                  <span className="text-primary font-medium text-sm flex items-center gap-2">
                    <ExternalLink size={16} /> View Full Size
                  </span>
                </div>
              </div>

              {/* Label */}
              <div className="p-4">
                <p className="text-text-primary font-medium">{cert.alt}</p>
                <p className="text-text-muted text-sm">Professional Certificate</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== LIGHTBOX MODAL (rendered outside animated div) ===== */}
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
            background: "rgba(0, 0, 0, 0.85)",
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