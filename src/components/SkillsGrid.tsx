import React, { useState } from 'react';
import { Code, Database, Globe, Wrench, GraduationCap, Layout, Sparkles } from 'lucide-react';

interface SkillItem {
  name: string;
  level: string;
  description: string;
  snippet: string;
  language: string;
}

export default function SkillsGrid() {
  const [activeGroup, setActiveGroup] = useState<'frontend' | 'backend' | 'databases' | 'languages' | 'tools' | 'concepts'>('frontend');
  const [selectedSkill, setSelectedSkill] = useState<string>('React.js');

  const skillGroups = {
    frontend: {
      title: 'Frontend Development',
      icon: Layout,
      color: 'text-indigo-400 border-indigo-500/20',
      skills: [
        { 
          name: 'React.js', 
          level: 'Expert', 
          description: 'Component lifecycles, custom hooks, context state management, and virtual DOM renders.',
          language: 'typescript',
          snippet: `// React.js Custom Hook for Real-time Token Sync
import { useState, useEffect } from 'react';

export function useAuthToken(sessionToken: string) {
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    const validate = () => {
      if (sessionToken.startsWith('bearer_')) {
        setIsValid(true);
      }
    };
    validate();
  }, [sessionToken]);

  return { isValid };
}`
        },
        { 
          name: 'Next.js', 
          level: 'Advanced', 
          description: 'Server Components, app routing architecture, API endpoints, dynamic routes.',
          language: 'typescript',
          snippet: `// Next.js App Router Server Action API
import { revalidatePath } from 'next/cache';

export async function updateRequestStatus(id: string, status: string) {
  try {
    await db.requests.updateOne({ _id: id }, { $set: { status } });
    revalidatePath('/dashboard/requests');
    return { success: true };
  } catch (error) {
    return { error: 'Authentication failed' };
  }
}`
        },
        { 
          name: 'Tailwind CSS', 
          level: 'Expert', 
          description: 'Modern flexbox/grid layouts, theme configurations, custom arbitrary variants, responsive setups.',
          language: 'html',
          snippet: `<!-- Tailwind CSS Bento-grid Hero Section -->
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 h-auto">
  <div className="col-span-2 bg-slate-900/50 backdrop-blur border border-slate-800 rounded-3xl p-8 hover:border-blue-500/35 transition-all">
    <h1 className="text-3xl font-display font-bold tracking-tight text-white mb-2">My Creative Identity</h1>
    <p className="text-slate-400 text-sm leading-relaxed">Responsive structural flex grids</p>
  </div>
</div>`
        },
        { 
          name: 'JavaScript (ES6+)', 
          level: 'Expert', 
          description: 'Clousures, closures scopes, map/reduce/filter arrays, Promises, async/await processing.',
          language: 'javascript',
          snippet: `// Async Pipeline with Map & Promise.all
async function retrieveMultimodalEmbeddings(streamPayloads) {
  const parsedInputs = streamPayloads.filter(p => p.isActive);
  
  return Promise.all(parsedInputs.map(async (item) => {
    const res = await fetch(\`/api/extract/\${item.id}\`);
    return res.json();
  }));
}`
        },
        { 
          name: 'HTML5', 
          level: 'Expert', 
          description: 'Semantic SEO schemas, structural hierarchies, DOM API integrations.',
          language: 'html',
          snippet: `<!-- Interactive Canvas Node & Audio Element -->
<figure id="audio-analysis-container" className="p-4 border">
  <figcaption className="text-xs text-slate-400 font-mono">Input Spectrogram</figcaption>
  <audio id="voice-stream-source" src="/assets/audio_input.wav" controls></audio>
  <canvas id="waveform-canvas-nodes" width="600" height="150"></canvas>
</figure>`
        },
        { 
          name: 'CSS3', 
          level: 'Expert', 
          description: 'Custom keyframe animations, transition bezier curves, variables, flexbox structures.',
          language: 'css',
          snippet: `/* Custom Glowing Radar Ping Keyframes */
@keyframes pulseRadarping {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
  }
}`
        }
      ]
    },
    backend: {
      title: 'Backend Engineering',
      icon: Code,
      color: 'text-emerald-400 border-emerald-500/20',
      skills: [
        { 
          name: 'Node.js', 
          level: 'Expert', 
          description: 'Server architectures, event loops, stream file-handling routers, full asynchronous performance control.',
          language: 'javascript',
          snippet: `// Node.js Clustering for High-Throughput API Gateway
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  // Instances run independently on designated virtual ports
  console.log(\`Cluster process \${process.pid} running successfully.\`);
}`
        }
      ]
    },
    databases: {
      title: 'Database Management',
      icon: Database,
      color: 'text-cyan-400 border-cyan-500/20',
      skills: [
        { 
          name: 'MongoDB', 
          level: 'Expert', 
          description: 'Aggregation pipelines, indexes, data nesting constraints, cluster configurations, schemas.',
          language: 'javascript',
          snippet: `// MongoDB Aggregation: Fulfilling Urgent Blood Supply Metrics
db.requests.aggregate([
  { $match: { urgency: "Critical", status: "Pending" } },
  { $group: {
      _id: "$bloodGroup",
      totalRequiredUnits: { $sum: "$units" },
      matchingFacilities: { $addToSet: "$hospital" }
    }
  },
  { $sort: { totalRequiredUnits: -1 } }
]);`
        },
        { 
          name: 'SQL', 
          level: 'Advanced', 
          description: 'Complex inner joins, transactions, CTEs, tables, index variables.',
          language: 'sql',
          snippet: `-- SQL CTE: Retrieve High-Risk Hospital Demands
WITH CriticalDemands AS (
  SELECT hospital, bloodGroup, units, 
         RANK() OVER(PARTITION BY bloodGroup ORDER BY units DESC) AS UrgencyRank
  FROM blood_requests
  WHERE urgency = 'Critical'
)
SELECT hospital, bloodGroup, units
FROM CriticalDemands
WHERE UrgencyRank = 1;`
        }
      ]
    },
    languages: {
      title: 'Programming Languages',
      icon: Globe,
      color: 'text-rose-400 border-rose-500/20',
      skills: [
        { 
          name: 'Python', 
          level: 'Advanced', 
          description: 'Deep Learning models, NumPy matrices, PyTorch structures, Pandas cleaning logs, NLP scripting.',
          language: 'python',
          snippet: `# Multimodal Fusion Attention Feedforward in PyTorch
import torch
import torch.nn as nn

class AttentionFusion(nn.Module):
    def __init__(self, text_dim, audio_dim, face_dim, hidden_dim):
        super(AttentionFusion, self).__init__()
        self.text_fc = nn.Linear(text_dim, hidden_dim)
        self.audio_fc = nn.Linear(audio_dim, hidden_dim)
        self.face_fc = nn.Linear(face_dim, hidden_dim)
        self.attention = nn.Linear(hidden_dim * 3, 3)
        
    def forward(self, t, a, f):
        # Project modalities into unified embedding vectors
        t_proj = torch.tanh(self.text_fc(t))
        a_proj = torch.tanh(self.audio_fc(a))
        f_proj = torch.tanh(self.face_fc(f))
        
        # Calculate cross-modal attention coefficients
        combined = torch.cat([t_proj, a_proj, f_proj], dim=-1)
        weights = torch.softmax(self.attention(combined), dim=-1)
        
        # Fuse modalities via weighted average representation
        fused = weights[:, 0:1] * t_proj + weights[:, 1:2] * a_proj + weights[:, 2:3] * f_proj
        return fused`
        },
        { 
          name: 'Java', 
          level: 'Intermediate', 
          description: 'Object-Oriented structures, polymorphism mechanisms, JVM variables, inheritance matrices.',
          language: 'java',
          snippet: `// Object-Oriented Polymorphism Sample
public abstract class BloodProduct {
    protected String batchId;
    protected int volumeMl;

    public BloodProduct(String id, int vol) {
        this.batchId = id;
        this.volumeMl = vol;
    }

    public abstract boolean checkViability(int storageTempCelcius);
}`
        },
        { 
          name: 'C', 
          level: 'Intermediate', 
          description: 'Pointers memory references, structures definitions, registers handling.',
          language: 'c',
          snippet: `/* Memory Buffer Manipulation in C */
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int donor_id;
    char blood_type[4];
    int units;
} BloodRecord;

void log_record(BloodRecord* ptr) {
    if (ptr != NULL) {
        printf("Donor Record #%d: Type %s\\n", ptr->donor_id, ptr->blood_type);
    }
}`
        }
      ]
    },
    tools: {
      title: 'Tools & Platforms',
      icon: Wrench,
      color: 'text-amber-400 border-amber-500/20',
      skills: [
        { 
          name: 'Git & GitHub', 
          level: 'Expert', 
          description: 'Branch merges, continuous integration pipelines, rebase conflicts resolution.',
          language: 'bash',
          snippet: `# Git Branch Rebase & Conflict Resolution Commands
git checkout main
git pull origin main
git checkout feature/blood-saver-mern
git rebase main

# Push force-with-lease to secure repository logs
git push --force-with-lease origin feature/blood-saver-mern`
        },
        { 
          name: 'vs code', 
          level: 'Expert', 
          description: 'Custom setups, linter configs, source control workflows.',
          language: 'json',
          snippet: `// Workspace Settings.json Configuration
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "always"
  }
}`
        }
      ]
    },
    concepts: {
      title: 'Core Concepts',
      icon: GraduationCap,
      color: 'text-purple-400 border-purple-500/20',
      skills: [
        { 
          name: 'Data Structures', 
          level: 'Advanced', 
          description: 'Directed Graphs, balanced red-black trees, hash maps indexing, heaps sorting, arrays, doubly linked lists.',
          language: 'typescript',
          snippet: `// Graph Representation for Hospital Routing Networks
class HospitalGraph {
  private adjacencyList: Map<string, string[]> = new Map();

  addFacility(hospital: string) {
    this.adjacencyList.set(hospital, []);
  }

  addRoute(h1: string, h2: string) {
    this.adjacencyList.get(h1)?.push(h2);
    this.adjacencyList.get(h2)?.push(h1);
  }
}`
        }
      ]
    }
  };

  const activeSkillsList = skillGroups[activeGroup].skills;
  const currentSkillData = activeSkillsList.find(s => s.name === selectedSkill) || activeSkillsList[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-zinc-900" id="skills-section">
      
      {/* Category Sidebar Selector (col-span-4) */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        <h3 className="font-sans text-xl font-extrabold text-zinc-950 flex items-center gap-2 uppercase tracking-tight">
          <Sparkles className="w-5 h-5 text-indigo-600 animate-pulse" />
          Technical Domains
        </h3>
        <p className="text-xs text-zinc-500 font-medium leading-relaxed">
          Filter through diverse technology stacks mapped back from academic achievements and active projects.
        </p>
 
        <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none">
          {(Object.keys(skillGroups) as Array<keyof typeof skillGroups>).map(key => {
            const group = skillGroups[key];
            const Icon = group.icon;
            const isSelected = activeGroup === key;
 
            return (
              <button
                key={key}
                onClick={() => {
                  setActiveGroup(key);
                  setSelectedSkill(group.skills[0].name);
                }}
                className={`flex items-center gap-3 px-4 py-2.5 text-xs font-semibold rounded-xl tracking-wide transition-all border shrink-0 ${
                  isSelected 
                    ? 'bg-zinc-950 text-white border-zinc-950 shadow-sm' 
                    : 'bg-white text-zinc-500 border-zinc-200 hover:border-zinc-300 hover:text-zinc-800 hover:bg-zinc-50'
                }`}
              >
                <div className={`p-1.5 rounded-lg border ${isSelected ? 'border-zinc-800 bg-zinc-800 text-white' : 'border-zinc-200 bg-zinc-50 text-zinc-500'}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">{group.title}</span>
              </button>
            );
          })}
        </div>
      </div>
 
      {/* Selected Group Skills list & IDE editor output (col-span-8) */}
      <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Sub-skills bubble list (col-span-4) */}
        <div className="md:col-span-5 flex flex-col gap-3">
          <h4 className="text-[10px] uppercase tracking-widest font-mono font-bold text-zinc-400 mb-1">Select Skill to Examine Code:</h4>
          
          <div className="flex flex-wrap md:flex-col gap-2">
            {activeSkillsList.map(skill => {
              const isSel = selectedSkill === skill.name;
              return (
                <button
                  key={skill.name}
                  onClick={() => setSelectedSkill(skill.name)}
                  className={`w-full text-left p-3 border rounded-xl transition-all flex flex-col ${
                    isSel 
                      ? 'bg-indigo-50/40 border-indigo-200 text-indigo-950 shadow-sm' 
                      : 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50/50'
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="text-xs font-extrabold font-sans uppercase tracking-tight">{skill.name}</span>
                    <span className={`text-[8.5px] font-mono px-2 py-0.5 rounded border font-bold uppercase ${
                      isSel ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-zinc-100 text-zinc-650 border-zinc-200'
                    }`}>
                      {skill.level}
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-500 font-sans leading-relaxed mt-1">{skill.description}</p>
                </button>
              );
            })}
          </div>
        </div>
 
        {/* Dynamic IDE Panel (col-span-8) */}
        <div className="md:col-span-7 flex flex-col h-full bg-[#0a0d13] border border-zinc-800 rounded-2xl overflow-hidden shadow-md min-h-[320px]">
          {/* Header IDE mock */}
          <div className="flex justify-between items-center px-4 py-2.5 bg-[#0e121a] border-b border-zinc-850">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-550/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <div className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
              <span className="text-indigo-400">alfiya-parween</span>
              <span>/</span>
              <span className="text-white">
                {currentSkillData.name.toLowerCase().replace(/\s/g, '_')}.
                {currentSkillData.language === 'typescript' ? 'ts' : currentSkillData.language === 'javascript' ? 'js' : currentSkillData.language === 'python' ? 'py' : currentSkillData.language}
              </span>
            </div>
            <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded bg-zinc-805 text-zinc-300 font-semibold border border-zinc-700">
              {currentSkillData.language}
            </span>
          </div>
 
          {/* Code block area */}
          <div className="p-4 font-mono text-[11px] text-[#86e1fc] flex-grow h-full bg-[#0d1017] overflow-y-auto leading-relaxed overflow-x-auto min-h-[220px]">
            <pre className="text-zinc-300 select-all font-mono">
              <code>{currentSkillData.snippet}</code>
            </pre>
          </div>
 
          {/* Footer IDE mock */}
          <div className="bg-[#0e121a] px-4 py-2 border-t border-zinc-850 text-[9px] font-mono text-zinc-550 flex justify-between">
            <span>Spaces: 2 • UTF-8</span>
            <span className="animate-pulse text-indigo-400 font-bold">// Live Interpreter Active</span>
          </div>
        </div>
 
      </div>
 
    </div>
  );
}
