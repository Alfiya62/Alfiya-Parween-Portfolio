import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Send, RefreshCw, CheckCircle, Database, AlertCircle } from 'lucide-react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Collaboration');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Simulated backend processing states
  const [formStatus, setFormStatus] = useState<'idle' | 'validating' | 'saving' | 'transmitted'>('idle');
  const [payloadLog, setPayloadLog] = useState<string>('');

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg('Constraint Failure: Required parameters missing (name, email, message).');
      return;
    }

    // Step 1: Validating
    setFormStatus('validating');
    setTimeout(() => {
      // Step 2: Saving to dynamic MongoDB buffer simulation
      setFormStatus('saving');
      const mockDoc = {
        _id: `msg_${Math.random().toString(36).substring(2, 9)}`,
        sender: name,
        contact: email,
        category: subject,
        body: message,
        timestamp: new Date().toISOString()
      };
      setPayloadLog(JSON.stringify(mockDoc, null, 2));

      setTimeout(() => {
        // Step 3: Transmitted successfully
        setFormStatus('transmitted');
      }, 1200);
    }, 1000);
  };

  const handleReset = () => {
    setFormStatus('idle');
    setName('');
    setEmail('');
    setSubject('Collaboration');
    setMessage('');
    setPayloadLog('');
    setErrorMsg(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-black" id="contact-section">
      
      {/* LEFT COLUMN: Personal Info Details (col-span-5) */}
      <div className="lg:col-span-5 flex flex-col justify-between gap-6">
        <div>
          <span className="text-[10px] uppercase font-mono font-black tracking-wider text-black bg-yellow-250 bg-yellow-200 border border-black px-2 py-0.5">CONNECT CHANNELS</span>
          <h3 className="font-display text-2xl font-black text-black mt-4 mb-4 leading-tight uppercase">
            Let's build something scalable together.
          </h3>
          <p className="text-xs text-gray-750 font-bold leading-relaxed">
            I am actively looking for Full Stack Web Developer internships, entry-level software engineering roles, or collaborative open-source opportunities.
          </p>
        </div>

        {/* Contact list cards */}
        <div className="space-y-4">
          
          <div className="flex items-center gap-4 bg-white border-2 border-black p-4 shadow-[3px_3px_0_0_#000] hover:bg-yellow-50/20 transition-all select-none">
            <div className="p-3 bg-indigo-100 border-2 border-black text-indigo-900 shadow-[1px_1px_0_0_#000]">
              <Mail className="w-5 h-5 shrink-0" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-[9px] uppercase tracking-wider font-mono font-black text-gray-400">EMAIL OUTBOX</h4>
              <a href="mailto:parweenalfiya959@gmail.com" className="text-xs font-black text-black hover:text-indigo-700 transition-colors block truncate">
                parweenalfiya959@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white border-2 border-black p-4 shadow-[3px_3px_0_0_#000] hover:bg-yellow-50/20 transition-all select-none">
            <div className="p-3 bg-indigo-100 border-2 border-black text-indigo-900 shadow-[1px_1px_0_0_#000]">
              <Phone className="w-5 h-5 shrink-0" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-[9px] uppercase tracking-wider font-mono font-black text-gray-400">COMMUNICATION RADAR</h4>
              <a href="tel:6203457673" className="text-xs font-black text-black hover:text-indigo-700 transition-colors block">
                +91 6203457673
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white border-2 border-black p-4 shadow-[3px_3px_0_0_#000] hover:bg-yellow-50/20 transition-all select-none">
            <div className="p-3 bg-indigo-100 border-2 border-black text-indigo-900 shadow-[1px_1px_0_0_#000]">
              <MapPin className="w-5 h-5 shrink-0" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-[9px] uppercase tracking-wider font-mono font-black text-gray-400">BASESTATION</h4>
              <span className="text-xs font-black text-black block">
                Ranchi, Jharkhand, India - 835204
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white border-2 border-black p-4 shadow-[3px_3px_0_0_#000] hover:bg-yellow-300/10 transition-all select-none">
            <div className="p-3 bg-indigo-100 border-2 border-black text-indigo-900 shadow-[1px_1px_0_0_#000]">
              <Linkedin className="w-5 h-5 shrink-0" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-[9px] uppercase tracking-wider font-mono font-black text-gray-400">PROFESSIONAL DIRECTORY</h4>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-xs font-black text-indigo-950 uppercase flex items-center gap-1 bg-yellow-250 bg-yellow-200 hover:bg-yellow-300 border border-black px-2.5 py-1 inline-block mt-1 shadow-[1px_1px_0_0_#000]"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>

        </div>

        <div className="text-[9.5px] text-gray-500 font-mono font-black uppercase tracking-wider select-none leading-relaxed mt-4 lg:mt-0">
          Last updated: June 2026. Inspired by clean technical architectures & neo-brutalism.
        </div>
      </div>

      {/* RIGHT COLUMN: Interactive Input Form (col-span-7) */}
      <div className="lg:col-span-7 bg-white border-3 border-black p-6 shadow-[4px_4px_0_0_#000] relative overflow-hidden" id="contact-routing-terminal">
        
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px]" />

        {/* Form State machine rendering */}
        {formStatus === 'idle' && (
          <form onSubmit={handleMessageSubmit} className="space-y-4 animate-fadeIn">
            <div className="flex justify-between items-center pb-4 border-b-2 border-dashed border-gray-300 select-none">
              <span className="font-mono text-xs text-black font-black uppercase tracking-wider flex items-center gap-1.5">
                <Send className="w-4 h-4 text-black shrink-0" />
                Submit REST Message payload
              </span>
              <span className="text-[8.5px] font-mono text-black border-2 border-black bg-yellow-200 px-2 py-0.5 uppercase font-black">
                Route: /api/contact
              </span>
            </div>

            {errorMsg && (
              <div className="p-2.5 bg-rose-50 border-2 border-red-500 text-xs font-bold text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-mono font-black text-gray-600">Your Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Steve Jobs"
                  className="bg-[#fafaf6] border-2 border-black px-3 py-2 text-xs text-black font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-mono font-black text-gray-600">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="steve.jobs@apple.com"
                  className="bg-[#fafaf6] border-2 border-black px-3 py-2 text-xs text-black font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-mono font-black text-gray-600">Category Subject</label>
              <select 
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className="bg-[#fafaf6] border-2 border-black px-2.5 py-2 text-xs text-black font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-300"
              >
                <option value="Collaboration">Project Collaboration</option>
                <option value="Internship/Job">Internship / Job Inquiry</option>
                <option value="Open Source">Open Source Contribution</option>
                <option value="Query">General Inquiry</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-mono font-black text-gray-600">Message Body</label>
              <textarea 
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Write message contents..."
                rows={4}
                className="bg-[#fafaf6] border-2 border-black px-3 py-2 text-xs text-black font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-300"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-cyan-200 hover:bg-cyan-300 text-black font-black uppercase text-xs px-4 py-3 border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-y-[-1px] transition-all cursor-pointer flex items-center justify-center gap-1.5 mt-2"
            >
              <Send className="w-4 h-4 shrink-0" />
              Dispatch API Transmission
            </button>
          </form>
        )}

        {formStatus === 'validating' && (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-pulse">
            <RefreshCw className="w-10 h-10 text-black animate-spin mb-4" />
            <span className="font-mono text-xs text-black font-black uppercase tracking-wider">
              Validating message structures...
            </span>
            <p className="text-[10px] text-gray-500 font-mono font-bold mt-1 uppercase">Executing integrity checks on fields.</p>
          </div>
        )}

        {formStatus === 'saving' && (
          <div className="flex flex-col items-center justify-center py-12 animate-pulse">
            <Database className="w-10 h-10 text-emerald-600 animate-bounce mb-4" />
            <span className="font-mono text-xs text-black font-black uppercase tracking-wider">
              Pushing record to local Mongo buffer...
            </span>
            <div className="w-full max-w-[400px] bg-[#111318] p-3 border-2 border-black mt-4 text-left shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
              <pre className="text-[9.5px] font-mono text-emerald-400 overflow-x-auto select-all">
                {payloadLog}
              </pre>
            </div>
          </div>
        )}

        {formStatus === 'transmitted' && (
          <div className="flex flex-col items-center justify-center py-14 text-center animate-fadeIn">
            <div className="p-3 bg-emerald-100 border-2 border-black text-emerald-950 mb-4 shadow-[2px_2px_0_0_#000]">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h4 className="font-display font-black text-lg text-black uppercase tracking-tight">Transmission Successful</h4>
            <p className="text-xs text-gray-500 mt-2 font-semibold max-w-[280px] mx-auto leading-relaxed">
              Your inquiry payload has been authorized and buffered into db.messages successfully!
            </p>

            <button 
              onClick={handleReset}
              className="mt-6 text-xs bg-yellow-300 border-2 border-black hover:bg-yellow-400 text-black px-4 py-2 font-black uppercase shadow-[2px_2px_0_0_#000] hover:translate-y-[-1px] transition-all cursor-pointer"
            >
              Reset Outgoing Channel
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
