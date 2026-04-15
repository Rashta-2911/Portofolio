"use client";

import { useState } from "react";
import Image from "next/image";

import {
  Home,
  FolderKanban,
  User,
  GraduationCap,
  Briefcase,
  Award,
} from "lucide-react";

import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaNodeJs
} from "react-icons/fa";

import {
  SiNextdotjs,
  SiTailwindcss,
  SiRedux
} from "react-icons/si";

export default function MainPage() {

  const [activePage, setActivePage] = useState("home");

  return (

    <div className="flex min-h-screen bg-zinc-900 text-white">

      {/* ✅ SIDEBAR */}
      <aside className="w-64 bg-zinc-950 border-r border-zinc-800 p-6">

        <h2 className="text-xl font-bold mb-10">
          Portfolio
        </h2>

        <nav className="space-y-3 text-zinc-400">

          <Menu icon={<Home size={18}/>} text="Home" onClick={()=>setActivePage("home")}/>
          <Menu icon={<FolderKanban size={18}/>} text="Projects" onClick={()=>setActivePage("projects")}/>
          <Menu icon={<User size={18}/>} text="About" onClick={()=>setActivePage("about")}/>
          <Menu icon={<GraduationCap size={18}/>} text="Education" onClick={()=>setActivePage("education")}/>
          <Menu icon={<Briefcase size={18}/>} text="Experiences" onClick={()=>setActivePage("experience")}/>
          <Menu icon={<Award size={18}/>} text="Certificates" onClick={()=>setActivePage("certificates")}/>

        </nav>

      </aside>

      {/* ✅ CONTENT */}
      <main className="flex-1 px-12 py-20 overflow-y-auto">

        {/* ✅ HOME */}
        {activePage === "home" && (
          <div>

            {/* HERO */}
            <div className="grid md:grid-cols-2 gap-10 items-center">

              <div>
                <h1 className="text-5xl font-bold mb-6">
                  Hi, I'm{" "}
                  <span className="text-indigo-400">
                    Hernandia Rashta R
                  </span>
                </h1>

                <p className="text-zinc-400 text-lg">
                  Hi there!, I am a fifth-semester Information Systems student at Bina Nusantara University with a strong
                  interest in UI/UX Design and systems analysis. I have skills in using Figma, Canva, Virtual Paradigm, and
                  Microsoft Office. I am enthusiastic about learning and developing my professional abilities through an
                  internship program.
                </p>
              </div>

              {/* ✅ PROFILE IMAGE FIX */}
              <div className="flex justify-center">
                <div className="relative w-70 h-70 rounded-full overflow-hidden border-4 border-indigo-500">
                  <Image
                    src="/Images/profile.jpg"
                    alt="Profile"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </div>

            </div>

            {/* ✅ SKILLS ICON */}
            <div className="mt-20">

              <h2 className="text-3xl font-bold mb-6 text-indigo-400">
                Skills
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                <Skill icon={<FaHtml5 size={40} className="text-orange-500"/>} name="HTML"/>
                <Skill icon={<FaCss3Alt size={40} className="text-blue-500"/>} name="CSS"/>
                <Skill icon={<FaJsSquare size={40} className="text-yellow-400"/>} name="JavaScript"/>
                <Skill icon={<FaReact size={40} className="text-cyan-400"/>} name="React"/>
                <Skill icon={<SiNextdotjs size={40}/>} name="Next.js"/>
                <Skill icon={<SiTailwindcss size={40} className="text-sky-400"/>} name="Tailwind"/>
                <Skill icon={<SiRedux size={40} className="text-purple-500"/>} name="Redux"/>
                <Skill icon={<FaNodeJs size={40} className="text-green-500"/>} name="Node.js"/>

              </div>
            </div>

          </div>
        )}

        {/* PROJECTS */}
        {activePage === "projects" && (
          <h1 className="text-4xl text-indigo-400">
            Projects Section
          </h1>
        )}

        {/* ABOUT */}
        {activePage === "about" && (
          <h1 className="text-4xl text-indigo-400">
            About Section
          </h1>
        )}

        {/* EDUCATION */}
        {activePage === "education" && (
          <h1 className="text-4xl text-indigo-400">
            Education Section
          </h1>
        )}

        {/* ✅ EXPERIENCE TIMELINE WITH IMAGE */}
{activePage === "experience" && (
  <div>

    <h1 className="text-3xl font-bold mb-10 text-indigo-400">
      Experience
    </h1>

    <div className="relative border-l-2 border-indigo-400 pl-10 space-y-12">

      {/* EXPERIENCE CARD */}
      <ExperienceCard
        title="CB (Character Building)"
        img="/experience/cb.jpg"
        desc="Dalam proyek ini saya terlibat dalam memberikan ajaran kepada masyarakat dan berpartisipasi dalam penyusunan laporan akhir, dokumentasi dan brainstorming ide kreatif."
      />

      <ExperienceCard
        title="HIMSISFO (Himpunan Sistem Informasi)"
        img="/experience/himsisfo.jpg"
        desc="Sebagai aktivis HIMSISFO komisi 2 Public Relation 2025 terlibat dalam kepanitiaan divisi acara BPAR dan HIMSISFO Gold."
      />

      <ExperienceCard
        title="HARDIKNAS (Hari Pendidikan Nasional)"
        img="/experience/hardiknas.jpg"
        desc="Berperan sebagai pengajar di SDN Srondol Wetan 05 dalam kegiatan pendampingan belajar bagi siswa."
      />

    </div>

  </div>
)}

        {/* CERTIFICATES */}
        {activePage === "certificates" && (
          <div>
            <h1 className="text-4xl text-indigo-400">
              Certificates
            </h1>
          </div>
        )}

      </main>

    </div>
  );
}

// ✅ MENU COMPONENT
function Menu({icon,text,onClick}:{icon:any,text:string,onClick:()=>void}){
  return(
    <div
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-indigo-500/20 hover:text-indigo-400 cursor-pointer transition">
      {icon}{text}
    </div>
  )
}

// ✅ SKILL ICON COMPONENT
function Skill({icon,name}:{icon:any,name:string}){
  return(
    <div className="bg-zinc-800 p-6 rounded-xl flex flex-col items-center hover:scale-105 transition">
      {icon}
      <p className="mt-2">{name}</p>
    </div>
  )
}

function ExperienceCard({ title, desc, img }: { title: string; desc: string; img: string }) {
  return (
    <div className="relative grid md:grid-cols-2 gap-6 items-center">

      {/* DOT */}
      <div className="absolute -left-5 top-6 w-4 h-4 bg-indigo-400 rounded-full border-4 border-zinc-900 shadow-lg shadow-indigo-500/40"></div>

      {/* TEXT */}
      <div>
        <h3 className="text-xl font-bold text-indigo-400 mb-2">
          {title}
        </h3>

        <p className="text-zinc-300">
          {desc}
        </p>
      </div>

      {/* IMAGE */}
      <div className="relative w-full h-48 rounded-xl overflow-hidden shadow-lg">
/*image*/
      </div>

    </div>
  );
}
``