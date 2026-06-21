import React, { useState } from 'react';
import { Award, Library, Calendar, MapPin, CheckCircle, ExternalLink, GraduationCap, ChevronRight, Compass } from 'lucide-react';

interface CertDetails {
  title: string;
  issuer: string;
  date: string;
  duration?: string;
  description: string;
  skillsAcquired: string[];
  credentialId: string;
  category: 'core' | 'ai_data' | 'simulations';
}

export default function CertificatesAndEducation() {
  const [selectedCert, setSelectedCert] = useState<number>(0);
  const [verificationMsg, setVerificationMsg] = useState<string | null>(null);

  const educationHistory = [
    {
      institution: 'Jharkhand Rai University, Ranchi',
      degree: 'Bachelor of Technology in Computer Science Engineering',
      duration: '2023 – 2026',
      location: 'Ranchi, Jharkhand',
      metric: 'Last Semester SGPA: 7.96',
      details: 'Comprehensive computer science framework with special emphasis on system designs, database architecture, neural networks, and modern software engineering paradigms.'
    },
    {
      institution: 'Birla Institute of Technology (BIT) Mesra, Ranchi',
      degree: 'Diploma in Computer Science Engineering',
      duration: '2020 – 2023',
      location: 'Ranchi, Jharkhand',
      metric: 'Overall CGPA: 7.23',
      details: 'Fundamental foundations in procedural algorithms, object-oriented methodologies, computer systems, and local networking architectures.'
    },
    {
      institution: 'Sarvoday Public School, Rahe',
      degree: 'Matriculation (High School)',
      duration: 'Class of 2020',
      location: 'Rahe, Jharkhand',
      metric: 'Final Aggregate Score: 75.6%',
      details: 'Secondary general science and advanced mathematics preparation.'
    }
  ];

  const certifications: CertDetails[] = [
    {
      title: 'Artificial Intelligence (AI) Upskilling Program',
      issuer: 'Learnet Institute of Skills (LIS)',
      date: 'December 2025',
      duration: '4 Months',
      description: 'Advanced machine learning architectures, CNN landmark detection model structures, attention layers, and multimodal fusion implementations.',
      skillsAcquired: ['Deep Learning', 'PyTorch', 'Model Optimizations', 'Feature Engineering'],
      credentialId: 'CRED-LIS-AI-901844',
      category: 'ai_data'
    },
    {
      title: 'GenAI Powered Data Analytics Job Simulation',
      issuer: 'TATA Forage',
      date: 'July 2025',
      duration: 'Self-paced',
      description: 'Simulated corporate engineering pipeline for analytical queries, business metric dashboards, and GenAI-driven descriptive statistics generation.',
      skillsAcquired: ['GenAI Tools', 'Data Aggregation', 'Executive Dashboards', 'Insight Extraction'],
      credentialId: 'CRED-FORAGE-TATA-7741',
      category: 'ai_data'
    },
    {
      title: 'Deloitte Australia Technology Job Simulation',
      issuer: 'Forage / Deloitte',
      date: 'June 2025',
      duration: 'Self-paced',
      description: 'Consultancy simulation covering database designs, API security setups, and continuous integration pipeline verification steps.',
      skillsAcquired: ['API Architecture', 'Agile Workflows', 'Database Design', 'UML Schema'],
      credentialId: 'CRED-FORAGE-DELOITTE-0453',
      category: 'simulations'
    },
    {
      title: 'Data Visualization with Power BI',
      issuer: 'Great Learning',
      date: 'August 2025',
      duration: '2 Months',
      description: 'Data transformations, DAX formulas, interactive multi-pane dashboards, and cohort charts creation.',
      skillsAcquired: ['Power BI', 'DAX Querying', 'ETL Processes', 'Reporting Systems'],
      credentialId: 'CRED-GL-PBI-556102',
      category: 'ai_data'
    },
    {
      title: 'Frontend Developer Course',
      issuer: 'Educative.io',
      date: 'May 2024',
      duration: '3 Months',
      description: 'Structural component strategies, dynamic React states, and modern modular layouts.',
      skillsAcquired: ['React.js', 'DOM API', 'Web Performance', 'ES6 Javascript'],
      credentialId: 'CRED-ED-FE-201944',
      category: 'core'
    },
    {
      title: 'SQL Course',
      issuer: 'Programiz.pro',
      date: 'February 2024',
      duration: '1 Month',
      description: 'Relational database designs, complex JOINs, aggregated summaries, CTEs, and index strategies.',
      skillsAcquired: ['SQL Server', 'Relational Schemas', 'Query Tuning', 'Joins'],
      credentialId: 'CRED-PRO-SQL-4012892',
      category: 'core'
    },
    {
      title: 'Java Developer Academy',
      issuer: 'Udemy',
      date: 'November 2023',
      duration: '6 Weeks',
      description: 'Object-oriented fundamentals, multithreading basics, collections frameworks, and JVM architectures.',
      skillsAcquired: ['Java Core', 'OOP Paradigms', 'Collections API', 'Unit Testing'],
      credentialId: 'CRED-UD-JV-229410A',
      category: 'core'
    },
    {
      title: 'Fundamental of Python',
      issuer: 'Udemy',
      date: 'September 2023',
      duration: '4 Weeks',
      description: 'Python core variables, array sorting, file controls, and NumPy mathematics packages.',
      skillsAcquired: ['Python Core', 'NumPy basics', 'File I/O', 'Iterators'],
      credentialId: 'CRED-UD-PY-104991B',
      category: 'core'
    }
  ];

  const currentCert = certifications[selectedCert];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-black" id="education-cert-section">
      
      {/* LEFT COLUMN: Academic Timeline (col-span-5) */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        <h3 className="font-display text-xl font-black uppercase text-black flex items-center gap-2">
          <Library className="w-5 h-5 text-indigo-700" />
          Academic Foundations
        </h3>
        <p className="text-xs text-gray-750 font-semibold leading-relaxed">
          Educational credentials demonstrating deep commitment to computer science engineering values and consistent grading metrics.
        </p>

        {/* Academic Timeline Cards */}
        <div className="relative border-l-3 border-black pl-6 ml-3 space-y-6">
          {educationHistory.map((edu, idx) => (
            <div key={idx} className="relative group select-none">
              {/* Point Node */}
              <div className="absolute -left-[32.5px] top-2 h-4 w-4 rounded-full border-2 bg-[#fcfbf9] border-black group-hover:bg-yellow-300 transition-all duration-200" />
              
              <div className="bg-white border-2 border-black p-4 shadow-[3px_3px_0_0_#000] hover:shadow-[5px_5px_0_0_#000] transition-all duration-200">
                <span className="text-[9px] uppercase font-mono font-black tracking-wider text-black bg-yellow-250 bg-yellow-200 border border-black px-2.5 py-0.5">
                  {edu.duration}
                </span>
                
                <h4 className="font-display text-sm font-black text-black mt-2">
                  {edu.institution}
                </h4>
                
                <h5 className="text-xs text-gray-750 font-black mt-1 uppercase tracking-wide">
                  {edu.degree}
                </h5>

                <div className="flex flex-wrap items-center gap-3 mt-3 text-[10.5px] text-gray-600 font-semibold">
                  <span className="flex items-center gap-1 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-black" /> {edu.location}
                  </span>
                  <span className="px-2 py-0.5 border border-black bg-[#fafaf6] text-black font-mono font-bold">
                    {edu.metric}
                  </span>
                </div>

                <p className="text-[11px] text-gray-500 mt-2.5 leading-relaxed font-semibold">
                  {edu.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN: Interactive Certifications (col-span-7) */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <h3 className="font-display text-xl font-black uppercase text-black flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-700" />
            Milestones & Certifications
          </h3>
          <span className="text-xs font-mono text-black bg-white border-2 border-black px-2.5 py-1 shadow-[2px_2px_0_0_rgba(0,0,0,1)] uppercase font-black">
            {certifications.length} Credentials
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 h-auto">
          
          {/* Certifications Bullet Selection Panel (col-span-12 -> 5) */}
          <div className="md:col-span-5 flex flex-col gap-2 max-h-[365px] overflow-y-auto pr-1">
            {certifications.map((cert, index) => {
              const active = selectedCert === index;
              return (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedCert(index);
                    setVerificationMsg(null);
                  }}
                  className={`text-left p-2.5 rounded-none border-2 transition-all text-xs flex justify-between items-center shrink-0 cursor-pointer ${
                    active 
                      ? 'bg-yellow-300 border-black text-black font-black shadow-[2px_2px_0_0_#000] translate-y-[-1px]' 
                      : 'bg-white border-black text-black font-extrabold hover:bg-yellow-50/50'
                  }`}
                >
                  <div className="truncate pr-2">
                    <h4 className="font-extrabold truncate uppercase tracking-tight">{cert.title}</h4>
                    <p className="text-[9px] text-gray-550 font-mono mt-0.5 uppercase tracking-wide font-black">{cert.issuer}</p>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${active ? 'text-black translate-x-0.5' : 'text-gray-400'}`} />
                </button>
              );
            })}
          </div>

          {/* Interactive Credential Digital Frame Container (col-span-12 -> 7) */}
          <div className="md:col-span-7 bg-white border-3 border-black p-5 shadow-[4px_4px_0_0_#000] relative overflow-hidden flex flex-col justify-between min-h-[365px]" id="credential-explorer-frame">
            
            {/* Decal Background */}
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px]" />
            
            {/* Certificate Header Badge */}
            <div className="flex justify-between items-start gap-4 pb-4 border-b-2 border-dashed border-gray-300">
              <div className="p-2 bg-indigo-100 border-2 border-black text-indigo-900 shadow-[1.5px_1.5px_0_0_rgba(0,0,0,1)]">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="text-right">
                <span className="text-[8.5px] font-mono tracking-wider text-black uppercase font-black px-2 py-1 bg-emerald-100 border-2 border-black shadow-[1.5px_1.5px_0_0_rgba(0,0,0,1)] inline-block">
                  Verified Credential
                </span>
                <p className="text-[9.5px] font-mono text-gray-500 uppercase mt-2 font-bold">{currentCert.date}</p>
              </div>
            </div>

            {/* Cert Meta */}
            <div className="my-4">
              <h4 className="font-display text-base font-black text-black leading-tight uppercase">
                {currentCert.title}
              </h4>
              <p className="text-xs text-indigo-700 font-extrabold mt-1.5 uppercase tracking-wide">
                Issuer: {currentCert.issuer}
              </p>

              <p className="text-[11px] text-gray-650 mt-3 leading-relaxed font-semibold">
                {currentCert.description}
              </p>

              {/* Skills Tag Cloud */}
              <div className="mt-4">
                <h5 className="text-[9px] uppercase tracking-wider font-mono font-black text-gray-400 mb-2">Validated Syllabi:</h5>
                <div className="flex flex-wrap gap-1.5">
                  {currentCert.skillsAcquired.map((skill, k) => (
                    <span 
                      key={k} 
                      className="text-[9px] font-mono bg-[#fafaf6] text-black border border-black font-extrabold px-2 py-0.5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Blockchain Verification Indicator */}
            <div className="flex flex-col gap-2 mt-2">
              {verificationMsg && (
                <div className="p-2 bg-yellow-300 border-2 border-black text-[10px] font-mono font-black uppercase text-black select-none animate-fadeIn">
                  {verificationMsg}
                </div>
              )}
              <div className="p-3 bg-[#fafaf6] border-2 border-black flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div className="min-w-0 pr-1">
                    <h6 className="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest leading-none">BLOCKCHAIN SECURE ID</h6>
                    <p className="text-[9.5px] font-mono text-black font-bold truncate mt-1">{currentCert.credentialId}</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setVerificationMsg(`Verified Core Blockchain Block #${currentCert.credentialId.slice(-4)} matching secure hash.`);
                  }}
                  className="px-2.5 py-1.5 bg-cyan-200 hover:bg-cyan-300 border-2 border-black text-[9px] font-mono font-black hover:translate-y-[-1px] transition-all rounded-none uppercase flex items-center gap-1 shrink-0 shadow-[1.5px_1.5px_0_0_#000] cursor-pointer"
                >
                  Verify <ExternalLink className="w-2.5 h-2.5 inline shrink-0" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
