import React, { useState, useEffect } from 'react';
import { 
  Terminal, Shield, Globe, Award, Sparkles, BookOpen, 
  Layers, Command, Eye, FileText, ChevronRight, Check,
  Mail, Phone, MapPin, Download, ExternalLink, Moon, Sun, Monitor
} from 'lucide-react';

// Import sub-components
import BloodLifeSaviorDemo from './components/BloodLifeSaviorDemo';
import NeuroSenseDemo from './components/NeuroSenseDemo';
import SkillsGrid from './components/SkillsGrid';
import CertificatesAndEducation from './components/CertificatesAndEducation';
import ContactForm from './components/ContactForm';

export default function App() {
  const [viewMode, setViewMode] = useState<'sandbox' | 'resume'>('sandbox');
  const [clockTime, setClockTime] = useState<string>('');
  
  // Initialize dynamic live clock running on her standard Ranchi timezone (GMT+5:30)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format as IST time
      const istString = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setClockTime(istString + ' IST');
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handlePrintSimulation = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#fafefb] bg-gradient-to-tr from-stone-50 via-zinc-50/50 to-indigo-50/10 text-zinc-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 relative">
      
      {/* FLOATING HEADER / CONTROL PANEL */}
      <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-zinc-150 py-3 px-4 md:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo Brand Brand */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-zinc-900 rounded-xl flex items-center justify-center text-white font-sans font-bold shadow-sm">
              AP
            </div>
            <div>
              <h1 className="font-sans text-sm font-extrabold tracking-tight text-zinc-900 leading-none">Alfiya Parween</h1>
              <p className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 mt-1 font-bold">MERN Full-stack Developer</p>
            </div>
          </div>

          {/* Tab Selector: Interactive Sandbox vs Static CV */}
          <div className="flex bg-zinc-100/80 p-0.5 rounded-xl border border-zinc-200/40">
            <button
              onClick={() => setViewMode('sandbox')}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                viewMode === 'sandbox' 
                  ? 'bg-white text-zinc-900 shadow-sm' 
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Interactive Sandbox</span>
            </button>
            <button
              onClick={() => setViewMode('resume')}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                viewMode === 'resume' 
                  ? 'bg-white text-zinc-900 shadow-sm' 
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Classic Document View</span>
            </button>
          </div>

          {/* Time & Quick Stats Panel */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 rounded-lg border border-zinc-200 text-[10px] font-mono text-zinc-650 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span>TIME: {clockTime || ' Ranchi Std'}</span>
            </div>
            <a 
              href="mailto:parweenalfiya959@gmail.com"
              className="text-xs font-semibold bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 px-4 py-2 transition-all shadow-sm"
            >
              Hire Me
            </a>
          </div>

        </div>
      </nav>

      {/* CORE VIEWPORT CARDS */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 relative">

        {/* ==============================================
             LAYOUT A: INTERACTIVE SANDBOX VIEW (DEFAULT)
             ============================================== */}
        {viewMode === 'sandbox' && (
          <div className="space-y-16 animate-fadeIn text-zinc-900">
            
            {/* HERO INTRODUCTION BENTO GRID */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="bento-hero">
              
              {/* Main Bio Card (col-span-8) */}
              <div className="lg:col-span-8 bg-white border border-zinc-200 rounded-3xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300" id="bio-card">
                
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50/50 text-indigo-700 border border-indigo-100 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider mb-5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    Available for Internships & Projects
                  </div>

                  <h2 className="font-sans text-4xl md:text-5xl font-extrabold text-zinc-950 tracking-tight leading-tight">
                    Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-indigo-950 to-indigo-800 select-all font-extrabold">Alfiya Parween</span>
                  </h2>
                  <p className="text-sm md:text-lg text-zinc-800 font-medium mt-3.5 leading-snug">
                    Aspiring Full Stack Web Developer & Deep Learning Enthusiast based in Ranchi, India.
                  </p>

                  <p className="text-xs md:text-sm text-zinc-500 leading-relaxed mt-3 max-w-[620px] font-medium animate-fadeIn">
                    I build scalable, highly responsive MERN stack web applications integrated with powerful server frameworks and deep learning pipelines. Focused on clean layouts, structural database design and intuitive client experiences.
                  </p>
                </div>

                {/* Technical Anchors */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-zinc-100 pt-5 mt-8">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-zinc-400 font-bold tracking-wider">Core Technology</span>
                    <p className="text-xs font-semibold text-zinc-800 mt-1">MERN Stack, Next.js</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-zinc-400 font-bold tracking-wider">AI / ML Platforms</span>
                    <p className="text-xs font-semibold text-zinc-800 mt-1">TensorFlow, BERT</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-zinc-400 font-bold tracking-wider">Graduation</span>
                    <p className="text-xs font-semibold text-zinc-800 mt-1">B.Tech CSE (2026)</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-zinc-400 font-bold tracking-wider">Base Location</span>
                    <p className="text-xs font-semibold text-zinc-800 mt-1">Ranchi, Jharkhand</p>
                  </div>
                </div>

              </div>

              {/* Stats & Quick Links Bento Block (col-span-4) */}
              <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-6">
                
                <div className="bg-white border border-zinc-200 p-5 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300" id="metric-bento-1">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono text-zinc-400 font-extrabold uppercase tracking-wider">Active Projects</span>
                    <span className="p-1 px-2.5 bg-indigo-50 text-indigo-700 rounded-md text-[9px] font-mono font-bold">Live Metrics</span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-4xl font-extrabold text-zinc-900 tracking-tight">02</h3>
                    <p className="text-xs text-zinc-500 font-medium mt-1 leading-snug">Multimodal systems & donor dispatch terminals.</p>
                  </div>
                </div>

                <div className="bg-white border border-zinc-200 p-5 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300" id="metric-bento-2">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono text-zinc-400 font-extrabold uppercase tracking-wider">Credentials Accrued</span>
                    <span className="p-1 px-2.5 bg-indigo-50 text-indigo-700 rounded-md text-[9px] font-mono font-bold">Verified</span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-4xl font-extrabold text-zinc-900 tracking-tight">08</h3>
                    <p className="text-xs text-zinc-500 font-medium mt-1 leading-snug">Educative, Forage, Great Learning, LIS, Udemy.</p>
                  </div>
                </div>

              </div>

            </section>

            {/* INTERACTIVE PROJECTS DISPLAY SECTION */}
            <section className="space-y-8" id="projects">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-150 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#6366f1]">Engineering Portfolio</span>
                  <h3 className="font-sans text-2xl font-extrabold text-zinc-950 mt-1.5 uppercase tracking-tight leading-none">
                    Featured Systems & Interactive Simulators
                  </h3>
                  <p className="text-xs text-zinc-500 mt-2 max-w-[650px] font-medium leading-relaxed">
                    Interact directly with fully functional, high-fidelity mock architectures representing the real-world operational flows of my projects.
                  </p>
                </div>
              </div>

              {/* PROJECT A: NEUROSENSE */}
              <div className="bg-white border border-zinc-200 rounded-3xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <NeuroSenseDemo />
              </div>

              {/* PROJECT B: BLOOD LIFE SAVIOR */}
              <div className="bg-white border border-zinc-200 rounded-3xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <BloodLifeSaviorDemo />
              </div>
            </section>

            {/* SKILLS PLAYGROUND SECTION */}
            <section className="space-y-6" id="skills-sandbox">
              <div className="bg-white border border-zinc-200 rounded-3xl p-6 md:p-8 shadow-sm">
                <SkillsGrid />
              </div>
            </section>

            {/* TIMELINES & CREDENTIAL TIMELINE MAPS */}
            <section className="space-y-6" id="foundations-sandbox">
              <div className="bg-white border border-zinc-200 rounded-3xl p-6 md:p-8 shadow-sm">
                <CertificatesAndEducation />
              </div>
            </section>

            {/* CONTACT COOPERATE FORM */}
            <section className="space-y-6" id="contact-sandbox">
              <div className="bg-white border border-zinc-200 rounded-3xl p-6 md:p-8 shadow-sm">
                <ContactForm />
              </div>
            </section>

          </div>
        )}

        {/* ==============================================
             LAYOUT B: CLASSIC PRINTABLE RESUME FORMAT
             ============================================== */}
        {viewMode === 'resume' && (
          <div className="max-w-[850px] mx-auto bg-white border border-zinc-200 p-4 md:p-8 shadow-md rounded-2xl relative animate-fadeIn text-zinc-900" id="resume-printable-document">
            
            {/* Control HUD for Resume View */}
            <div className="flex flex-col sm:flex-row justify-between items-center bg-zinc-50 border border-zinc-150 rounded-xl p-4 mb-8 gap-4 print:hidden shadow-sm">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-zinc-500 animate-pulse" />
                <span className="text-xs font-mono text-zinc-600 font-semibold uppercase tracking-wide">Format: Standard Professional Recruiter Format</span>
              </div>
              <button 
                onClick={handlePrintSimulation}
                className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-all shadow-sm shrink-0 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download / Print PDF</span>
              </button>
            </div>

            {/* PRINT WRAPPER CONTENT (A4-Style White Contrast Mode for authentic reading) */}
            <div className="bg-white text-zinc-800 p-6 md:p-12 font-sans overflow-hidden border border-zinc-200 shadow-sm print:border-none print:shadow-none" id="pdf-a4-page">
              
              {/* Header Contact Block */}
              <div className="text-center pb-5 border-b border-zinc-200">
                <h1 className="text-3xl font-extrabold uppercase tracking-tight text-zinc-900 leading-tight">Alfiya Parween</h1>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mt-1.5">Ranchi, Jharkhand, India - 835204</p>
                <div className="flex flex-wrap justify-center items-center gap-4 mt-3 text-xs text-zinc-700 font-semibold font-mono">
                  <a href="mailto:parweenalfiya959@gmail.com" className="hover:text-indigo-600 px-1 py-0.5 border border-transparent transition-colors flex items-center gap-1">
                    <Mail className="w-3 h-3 inline" /> parweenalfiya959@gmail.com
                  </a>
                  <span>|</span>
                  <a href="tel:6203457673" className="hover:text-indigo-600 px-1 py-0.5 border border-transparent transition-colors flex items-center gap-1">
                    <Phone className="w-3 h-3 inline" /> +91 6203457673
                  </a>
                  <span>|</span>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-indigo-600 px-1 py-0.5 border border-transparent transition-colors flex items-center gap-1">
                    <ExternalLink className="w-3 h-3 inline" /> LinkedIn
                  </a>
                </div>
              </div>

              {/* 1. PROFESSIONAL SUMMARY */}
              <div className="my-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 pb-1 border-b border-zinc-200 mb-2">
                  Professional Summary
                </h3>
                <p className="text-xs leading-relaxed text-zinc-650 font-medium">
                  Aspiring Full Stack Web Developer with strong foundations in MERN Stack development. Skilled in HTML, CSS, JavaScript, React.js, Node.js, MongoDB, and REST APIs. Passionate about building responsive and scalable web applications with problem-solving and teamwork abilities.
                </p>
              </div>

              {/* 2. EDUCATION */}
              <div className="my-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 pb-1 border-b border-zinc-200 mb-3">
                  Education
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-bold uppercase text-zinc-900">Jharkhand Rai University, Ranchi</h4>
                      <p className="text-xs text-zinc-550 italic">Bachelor of Technology in Computer Science Engineering</p>
                      <p className="text-[10.5px] text-zinc-500 font-bold mt-0.5">Last Semester SGPA: 7.96</p>
                    </div>
                    <span className="text-xs font-mono font-medium text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded">2023 – 2026</span>
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-bold uppercase text-zinc-900">Birla Institute of Technology (BIT) Mesra, Ranchi</h4>
                      <p className="text-xs text-zinc-550 italic">Diploma in Computer Science Engineering</p>
                      <p className="text-[10.5px] text-zinc-500 font-bold mt-0.5">Overall CGPA: 7.23</p>
                    </div>
                    <span className="text-xs font-mono font-medium text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded">2020 – 2023</span>
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-bold uppercase text-zinc-900">Sarvoday Public School, Rahe</h4>
                      <p className="text-xs text-zinc-550 italic">Matriculation (Secondary High School)</p>
                      <p className="text-[10.5px] text-zinc-500 font-bold mt-0.5">Final Score - 75.6%</p>
                    </div>
                    <span className="text-xs font-mono font-medium text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded">2020</span>
                  </div>
                </div>
              </div>

              {/* 3. TECHNICAL SKILLS */}
              <div className="my-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 pb-1 border-b border-zinc-200 mb-2.5">
                  Technical Skills
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2.5 text-xs">
                  <div>
                    <span className="font-bold uppercase text-zinc-900">Frontend:</span> <span className="text-zinc-650">HTML5, CSS3, Tailwind CSS, JavaScript, React.js, Next.js</span>
                  </div>
                  <div>
                    <span className="font-bold uppercase text-zinc-900">Backend & Databases:</span> <span className="text-zinc-650">Node.js, Express.js • MongoDB, SQL</span>
                  </div>
                  <div>
                    <span className="font-bold uppercase text-zinc-900">Coding Languages:</span> <span className="text-zinc-650">C, Java, Python</span>
                  </div>
                  <div>
                    <span className="font-bold uppercase text-zinc-900">Tools & Platforms:</span> <span className="text-zinc-650">Git, GitHub, VS Code</span>
                  </div>
                  <div>
                    <span className="font-bold uppercase text-zinc-900">Core Concepts:</span> <span className="text-zinc-650">Data Structures & Algorithms</span>
                  </div>
                  <div>
                    <span className="font-bold uppercase text-zinc-900">Soft Skills:</span> <span className="text-zinc-650">Team Collaboration, Problem Solving, Continuous Learning, Time Management</span>
                  </div>
                </div>
              </div>

              {/* 4. PROJECTS */}
              <div className="my-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 pb-1 border-b border-zinc-200 mb-3">
                  Projects
                </h3>

                <div className="space-y-5">
                  
                  <div>
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-xs font-bold uppercase text-zinc-900">Blood Life Savior (MERN Stack)</h4>
                      <span className="text-[10.5px] font-mono text-zinc-500 font-semibold italic">Hospital Administration System</span>
                    </div>
                    <ul className="list-disc pl-5 mt-1.5 space-y-1 text-xs text-zinc-600">
                      <li>Developed a donor registration and management system to track blood donors, blood groups, and donation history securely in MongoDB.</li>
                      <li>Implemented hospital blood request handling with request tracking and automated delivery verification status updates.</li>
                      <li>Added custom notifications and flash alert features warning of low blood supply thresholds and identifying donor eligibility bounds.</li>
                      <li>Built responsive frontend using React.js and REST APIs using Node.js and Express.js.</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-xs font-bold uppercase text-zinc-900">NeuroSense: Mental Health Estimation</h4>
                      <span className="text-[10.5px] font-mono text-zinc-500 font-semibold italic">Deep Learning Multimodal Platform</span>
                    </div>
                    <ul className="list-disc pl-5 mt-1.5 space-y-1 text-xs text-zinc-600">
                      <li>Developed AI-powered multimodal mental health estimation system using Deep Learning, NLP, Computer Vision, and Audio Signal Processing to analyze text, voice tone, and facial expressions for stress, anxiety, and depression classification.</li>
                      <li>Implemented BERT, CNN, LSTM, and Multimodal self-attention Fusion networks with TensorFlow/PyTorch and FastAPI backends, achieving 94% prediction accuracy.</li>
                      <li>Built and deployed a full-stack real-time web application integrating React.js, FastAPI, and responsive REST APIs.</li>
                    </ul>
                  </div>

                </div>
              </div>

              {/* 5. CERTIFICATIONS */}
              <div className="my-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 pb-1 border-b border-zinc-200 mb-2.5">
                  Certifications
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs list-disc pl-5 text-zinc-600">
                  <li>Artificial Intelligence (AI) Upskilling Program – LIS — Dec 2025</li>
                  <li>GenAI Powered Data Analytics Job Simulation – TATA Forage, July 2025</li>
                  <li>Deloitte Australia Technology Job Simulation – Forage, June 2025</li>
                  <li>Data Visualization with Power BI – Great Learning, August 2025</li>
                  <li>Frontend Developer Course – Educative.io</li>
                  <li>SQL Course – Programiz.pro</li>
                  <li>Java Course – Udemy</li>
                  <li>Fundamental of Python – Udemy</li>
                </ul>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-900 py-10 px-4 text-center mt-12 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-xs">© 2026 Alfiya Parween. Built with a clean, modern, and minimalist design paradigm.</p>
          <div className="flex gap-4 text-[11px] text-zinc-500 font-medium">
            <span>Ranchi, India</span>
            <span>•</span>
            <span>B.Tech CSE</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
