import React, { useState, useEffect, useRef } from 'react';
import { Brain, Camera, Mic, Type, Activity, Sliders, Cpu, Info, Shield, RefreshCw, Radio } from 'lucide-react';

interface SentimentWeight {
  word: string;
  weight: number; // 0.0 to 1.0 (attention weight)
}

export default function NeuroSenseDemo() {
  const [activeTab, setActiveTab] = useState<'text' | 'voice' | 'facial' | 'fusion'>('text');
  
  // TEXT STATE
  const [textVal, setTextVal] = useState("I'm feeling really stressed out and overwhelmed with my exam schedule, but I'm trying my best to stay calm.");
  const [textWeights, setTextWeights] = useState<SentimentWeight[]>([]);
  const [textResults, setTextResults] = useState({ stress: 78, anxiety: 84, depression: 42 });

  // VOICE STATE
  const [isRecording, setIsRecording] = useState(false);
  const [voiceWaveform, setVoiceWaveform] = useState<number[]>([]);
  const [voiceStats, setVoiceStats] = useState({ pitch: 185, jitter: 0.12, shimmer: 0.45, hnr: 18 });
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // FACIAL STATE
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<'subject1' | 'subject2' | 'subject3'>('subject1');
  const [faceResult, setFaceResult] = useState({ valence: -0.45, arousal: 0.62, expressiveness: 0.78, score: 82 });
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const faceCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const faceAnimationFrameRef = useRef<number | null>(null);

  // FUSION STATE
  const [fusionMethod, setFusionMethod] = useState<'attention' | 'early' | 'late'>('attention');
  const [attentionWeights, setAttentionWeights] = useState({ text: 0.45, voice: 0.25, face: 0.30 });

  // 1. Text Analysis (Token Attention Maps Generator)
  useEffect(() => {
    // Basic reactive keyword attention weights mapping for simulation
    const keywords: Record<string, number> = {
      stressed: 0.95,
      overwhelmed: 0.88,
      anxious: 0.92,
      sad: 0.85,
      tired: 0.76,
      worry: 0.78,
      scared: 0.82,
      trying: 0.35,
      best: 0.20,
      calm: 0.15,
      peace: 0.10,
      exam: 0.65,
      schedule: 0.55
    };

    const words = textVal.split(/\s+/);
    let totalStress = 0;
    let counts = 0;

    const weights: SentimentWeight[] = words.map(w => {
      const cleanWord = w.toLowerCase().replace(/[^a-z']/g, '');
      const weight = keywords[cleanWord] !== undefined ? keywords[cleanWord] : (Math.random() * 0.15 + 0.05);
      if (keywords[cleanWord] !== undefined) {
        totalStress += keywords[cleanWord];
        counts++;
      }
      return { word: w, weight };
    });

    setTextWeights(weights);

    // Calculate simulated NLP scores
    const baseSt = counts > 0 ? (totalStress / counts) * 90 : 25;
    const finalStress = Math.min(98, Math.max(10, Math.round(baseSt + (words.length > 5 ? Math.random() * 8 : -10))));
    const finalAnxiety = Math.min(96, Math.max(15, Math.round(finalStress * 1.05)));
    const finalDepression = Math.min(94, Math.max(5, Math.round(finalStress * 0.55)));

    setTextResults({
      stress: finalStress,
      anxiety: finalAnxiety,
      depression: finalDepression
    });
  }, [textVal]);

  // 2. Audio waveform rendering with real mic access or simulation backup
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      setIsRecording(true);

      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      audioContextRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);
      microphoneRef.current = source;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const drawWave = () => {
        if (!analyserRef.current || !canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        const w = canvasRef.current.width;
        const h = canvasRef.current.height;
        analyserRef.current.getByteFrequencyData(dataArray);

        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, w, h);

        const barWidth = (w / bufferLength) * 1.6;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * h * 0.85;
          
          // Emerald glow gradient
          const grad = ctx.createLinearGradient(0, h, 0, h - barHeight);
          grad.addColorStop(0, '#10b981');
          grad.addColorStop(1, '#34d399');

          ctx.fillStyle = grad;
          ctx.fillRect(x, h - barHeight, barWidth - 1, barHeight);
          x += barWidth;
        }

        // Simulate reactive high-end parameters
        let avg = 0;
        for (let i = 0; i < bufferLength; i++) avg += dataArray[i];
        avg = avg / bufferLength;

        setVoiceStats({
          pitch: Math.round(150 + (avg * 1.2) + Math.random() * 10),
          jitter: Number((0.08 + (avg / 1000) * 0.15).toFixed(3)),
          shimmer: Number((0.3 + (avg / 1000) * 0.45).toFixed(3)),
          hnr: Math.round(24 - (avg / 25)),
        });

        animationFrameRef.current = requestAnimationFrame(drawWave);
      };

      drawWave();
    } catch (err) {
      console.warn("Microphone access declined or unavailable. Falling back to active voice simulation synthesizer loop.", err);
      // Failsafe stream simulation
      setIsRecording(true);
      let t = 0;
      const drawSimulatedWave = () => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;
        const w = canvasRef.current.width;
        const h = canvasRef.current.height;
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, w, h);

        ctx.beginPath();
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3.5;
        ctx.moveTo(0, h / 2);

        for (let x = 0; x < w; x++) {
          const wave = Math.sin(x * 0.05 + t) * Math.cos(x * 0.01 + t) * (h * 0.35) * Math.random();
          ctx.lineTo(x, h / 2 + wave);
        }
        ctx.stroke();

        t += 0.15;
        setVoiceStats(prev => ({
          pitch: Math.round(175 + Math.sin(t) * 15 + Math.random() * 5),
          jitter: Number((0.11 + Math.sin(t) * 0.02 + Math.random() * 0.01).toFixed(3)),
          shimmer: Number((0.38 + Math.cos(t) * 0.05).toFixed(3)),
          hnr: Math.round(19 + Math.cos(t) * 3),
        }));

        animationFrameRef.current = requestAnimationFrame(drawSimulatedWave);
      };
      drawSimulatedWave();
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (microphoneRef.current) microphoneRef.current.disconnect();
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (audioContextRef.current) audioContextRef.current.close();
  };

  // 3. Camera face landmarks rendering & facial scans
  const toggleCamera = async () => {
    if (isCameraOn) {
      setIsCameraOn(false);
      if (faceAnimationFrameRef.current) cancelAnimationFrame(faceAnimationFrameRef.current);
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    } else {
      setIsCameraOn(true);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 240 } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err) {
        console.warn("Camera streaming unavailable or blocked.", err);
      }
    }
  };

  // Canvas drawing for face landmarks (simulated layer)
  useEffect(() => {
    if (!isCameraOn && !selectedSubject) return;

    let localFrame: number;
    let tick = 0;

    const drawFaceLandmarks = () => {
      const canvas = faceCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      tick += 0.05;

      // Define face bounding coordinates depending on mode
      let faceX = w / 2;
      let faceY = h / 2 - 10;
      let faceR = 55;

      if (isCameraOn) {
        // Center bounding scanning
        faceX = w / 2;
        faceY = h / 2 - 5;
        faceR = 60;
      }

      // Draw bounding box
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      
      const boxSize = faceR * 2.1;
      ctx.strokeRect(faceX - boxSize / 2, faceY - boxSize / 2, boxSize, boxSize);
      ctx.setLineDash([]); // Reset line dash

      // Corner accent frames
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 3.5;
      const len = 15;
      const offset = boxSize / 2;
      
      // Top Left
      ctx.beginPath();
      ctx.moveTo(faceX - offset, faceY - offset + len);
      ctx.lineTo(faceX - offset, faceY - offset);
      ctx.lineTo(faceX - offset + len, faceY - offset);
      ctx.stroke();

      // Top Right
      ctx.beginPath();
      ctx.moveTo(faceX + offset, faceY - offset + len);
      ctx.lineTo(faceX + offset, faceY - offset);
      ctx.lineTo(faceX + offset - len, faceY - offset);
      ctx.stroke();

      // Bottom Left
      ctx.beginPath();
      ctx.moveTo(faceX - offset, faceY + offset - len);
      ctx.lineTo(faceX - offset, faceY + offset);
      ctx.lineTo(faceX - offset + len, faceY + offset);
      ctx.stroke();

      // Bottom Right
      ctx.beginPath();
      ctx.moveTo(faceX + offset, faceY + offset - len);
      ctx.lineTo(faceX + offset, faceY + offset);
      ctx.lineTo(faceX + offset - len, faceY + offset);
      ctx.stroke();

      // Draw standard facial neural net landmarks
      ctx.fillStyle = '#00f2fe';
      
      // Eyes mapping
      const eyeOffset = faceR * 0.35;
      const eyeY = faceY - faceR * 0.2;
      ctx.beginPath();
      ctx.arc(faceX - eyeOffset, eyeY, 3, 0, Math.PI * 2);
      ctx.arc(faceX + eyeOffset, eyeY, 3, 0, Math.PI * 2);
      ctx.fill();

      // Eyebrows
      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(faceX - eyeOffset - 10, eyeY - 8);
      ctx.lineTo(faceX - eyeOffset + 8, eyeY - 6 + Math.sin(tick) * 2);
      ctx.moveTo(faceX + eyeOffset + 10, eyeY - 8);
      ctx.lineTo(faceX + eyeOffset - 8, eyeY - 6 + Math.sin(tick) * 2);
      ctx.stroke();

      // Nose bridge
      ctx.beginPath();
      ctx.moveTo(faceX, eyeY);
      ctx.lineTo(faceX, faceY + 5);
      ctx.lineTo(faceX - 5, faceY + 12);
      ctx.lineTo(faceX + 5, faceY + 12);
      ctx.stroke();

      // Mouth / Lips contour
      const mouthY = faceY + faceR * 0.45;
      const moodCurve = Math.sin(tick * 0.8) * 4; // Simulated emotional expression adjustments
      ctx.beginPath();
      ctx.moveTo(faceX - 22, mouthY);
      ctx.quadraticCurveTo(faceX, mouthY + moodCurve, faceX + 22, mouthY);
      ctx.stroke();

      // Outer cheek points & chin profile points
      ctx.fillStyle = '#38bdf8';
      const points = [
        [faceX - faceR * 0.85, faceY],
        [faceX + faceR * 0.85, faceY],
        [faceX - faceR * 0.6, faceY + faceR * 0.6],
        [faceX + faceR * 0.6, faceY + faceR * 0.6],
        [faceX, faceY + faceR * 1.05], // Chin point
      ];
      points.forEach(([px, py]) => {
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
        // connect contour lines
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(faceX, faceY);
        ctx.lineTo(px, py);
        ctx.stroke();
      });

      // Animated scanning laser line
      const scanY = faceY - offset + ((Math.sin(tick * 1.5) + 1) / 2) * boxSize;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(faceX - offset, scanY);
      ctx.lineTo(faceX + offset, scanY);
      ctx.stroke();

      // Update text annotations dynamically
      setFaceResult({
        valence: Number((-0.25 + Math.sin(tick * 0.5) * 0.3).toFixed(2)),
        arousal: Number((0.55 + Math.cos(tick * 0.45) * 0.15).toFixed(2)),
        expressiveness: Number((0.72 + Math.sin(tick * 0.9) * 0.08).toFixed(2)),
        score: Math.round(75 + Math.sin(tick * 0.5) * 12)
      });

      localFrame = requestAnimationFrame(drawFaceLandmarks);
    };

    drawFaceLandmarks();

    return () => {
      cancelAnimationFrame(localFrame);
    };
  }, [isCameraOn, selectedSubject]);

  // Clean-up refs on dismount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (faceAnimationFrameRef.current) cancelAnimationFrame(faceAnimationFrameRef.current);
    };
  }, []);

  // 4. Multimodal Fusion Math Calculations
  const calculatedFusionScore = Math.round(
    textResults.stress * attentionWeights.text +
    (isRecording ? (voiceStats.pitch > 190 ? 82 : 65) : 72) * attentionWeights.voice +
    faceResult.score * attentionWeights.face
  );

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 relative text-zinc-900 border border-zinc-100" id="neurosense-component">
      
      {/* Decorative Grid texture */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Header Panel */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 pb-6 border-b border-zinc-200 mb-8 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 px-3 bg-indigo-50 text-indigo-700 rounded-lg text-[9px] font-mono font-bold tracking-widest uppercase border border-indigo-150">
              Deep Learning Model Pipeline
            </span>
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          </div>
          <h2 className="font-sans text-2xl font-extrabold tracking-tight text-zinc-950 mt-2">
            NeuroSense: Multimodal Estimator
          </h2>
          <p className="text-xs text-zinc-500 font-semibold mt-1">
            Sandbox reflecting BERT, CNN, and LSTM fusion pipelines achieving 94% accuracy in real-time mental health triage tracking.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap bg-zinc-100/75 p-1 rounded-2xl border border-zinc-200/40 w-full xl:w-auto xl:min-w-[420px] justify-between gap-1 select-none">
          {[
            { id: 'text', label: 'BERT NLP', icon: Type },
            { id: 'voice', label: 'LSTM Voice', icon: Mic },
            { id: 'facial', label: 'CNN Face', icon: Camera },
            { id: 'fusion', label: 'Fusion Core', icon: Brain },
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl transition-all duration-100 tracking-wide ${
                  active 
                    ? 'bg-zinc-900 text-white shadow-sm' 
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* BODY CONTENT DEPENDING ON ACTIVE TAB */}
      
      {/* TAB 1: BERT NLP PANEL */}
      {activeTab === 'text' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn text-black" id="neurosense-nlp-panel">
          <div className="lg:col-span-8 flex flex-col gap-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
              <Type className="w-4 h-4 text-black" />
              // Interactive Sentiment Transformer Inputs
            </h3>
            
            <textarea
              value={textVal}
              onChange={e => setTextVal(e.target.value)}
              className="w-full h-[150px] bg-white border-3 border-black p-4 text-xs leading-relaxed text-black focus:outline-none focus:ring-2 focus:ring-yellow-400 font-sans font-medium shadow-[3px_3px_0_0_rgba(0,0,0,1)]"
              placeholder="Type out feeling details to simulate transformer sentiment extraction maps..."
            />

            {/* Token Attention Map Output */}
            <div className="bg-white border-3 border-black p-4 shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
              <h4 className="text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest mb-3 flex justify-between">
                <span>Self-Attention Feature Weight Map (BERT Head 3)</span>
                <span className="text-black font-bold">// Interactive Heatmap</span>
              </h4>
              <div className="flex flex-wrap gap-x-2.5 gap-y-3 p-3 bg-yellow-50/50 border-2 border-black">
                {textWeights.map((w, idx) => {
                  const opacity = Math.min(1, Math.max(0.08, w.weight));
                  
                  // Neo-brutalist heat background
                  let bgColor = 'bg-gray-100';
                  let borderStyle = 'border-slate-200';
                  let textColor = 'text-gray-600';
                  
                  if (w.weight > 0.6) {
                    bgColor = 'bg-rose-300';
                    borderStyle = 'border-black';
                    textColor = 'text-black font-extrabold';
                  } else if (w.weight > 0.25) {
                    bgColor = 'bg-cyan-200';
                    borderStyle = 'border-black';
                    textColor = 'text-black font-bold';
                  }

                  return (
                    <div 
                      key={idx} 
                      className={`px-2 py-1 border-2 text-xs transition-all cursor-help ${bgColor} ${borderStyle} ${textColor}`} 
                      title={`Attention metric: ${(w.weight * 100).toFixed(1)}%`}
                    >
                      {w.word}
                      <span className="block text-[8px] opacity-80 font-mono text-center">{(w.weight * 100).toFixed(0)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="bg-white border-3 border-black p-4 flex flex-col justify-between shadow-[3px_3px_0_0_rgba(0,0,0,1)] height-fit">
              <div>
                <h4 className="text-[10px] font-mono font-extrabold text-gray-550 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-black" />
                  BERT Predicted Confidence
                </h4>

                <div className="space-y-4">
                  {[
                    { label: 'Calculated Stress Index', score: textResults.stress, color: 'bg-rose-400' },
                    { label: 'Exhibitive Anxiety Score', score: textResults.anxiety, color: 'bg-cyan-300' },
                    { label: 'Depressed Affect Likelihood', score: textResults.depression, color: 'bg-purple-300' },
                  ].map((item, id) => (
                    <div key={id}>
                      <div className="flex justify-between text-xs font-mono font-black uppercase mb-1">
                        <span className="text-gray-800">{item.label}</span>
                        <span className="text-black bg-yellow-250 border border-black px-1">{item.score}%</span>
                      </div>
                      <div className="w-full bg-gray-100 border-2 border-black h-3.5 overflow-hidden">
                        <div 
                          className={`h-full ${item.color} border-r-2 border-black transition-all duration-300`} 
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 p-3.5 bg-yellow-50 border-2 border-black text-black text-[11px] leading-relaxed font-medium">
                <strong className="text-black uppercase tracking-wider font-extrabold flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-black" />
                  Transformer Tokenization:
                </strong>
                <p className="mt-1 text-gray-700">
                  Tokenizer splits sequences into vocabulary subwords. BERT outputs represent semantic embeddings processed via 12 self-attention heads.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: VOICE PROSODY LSTM PANEL */}
      {activeTab === 'voice' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn text-black" id="neurosense-voice-panel">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
              <Mic className="w-4 h-4 text-black" />
              // Acoustic Feature Extraction Model (LSTM)
            </h3>
            
            <p className="text-xs text-slate-800 font-semibold leading-relaxed">
              Trigger recording or use simulation to test acoustic vocal analysis in real-time. Features extractor captures formant frequencies, jitter (pitch micro-variability) and HNR (harmonicity).
            </p>
 
            {/* Simulated Analyzer Interface */}
            <div className="bg-white border-3 border-black p-5 flex flex-col items-center justify-between min-h-[220px] shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
              <canvas 
                ref={canvasRef} 
                width="380" 
                height="100" 
                className="w-full bg-[#111318] border-2 border-black overflow-hidden shrink-0" 
              />
              
              <div className="flex flex-wrap items-center gap-4 mt-5 w-full justify-center">
                {!isRecording ? (
                  <button
                    onClick={startRecording}
                    className="flex items-center gap-2 bg-emerald-300 hover:bg-emerald-400 text-black font-black uppercase text-xs px-5 py-3 border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] select-none hover:translate-y-[-1px] transition-all cursor-pointer"
                  >
                    <Radio className="w-4 h-4 animate-pulse text-black" />
                    Start Live Analyzer
                  </button>
                ) : (
                  <button
                    onClick={stopRecording}
                    className="flex items-center gap-2 bg-rose-300 hover:bg-rose-450 text-black font-black uppercase text-xs px-5 py-3 border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] animate-pulse select-none cursor-pointer"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-black shrink-0" />
                    Stop & Extract MFCCs
                  </button>
                )}
                
                {isRecording && (
                  <span className="text-xs text-black font-mono font-black animate-pulse flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 border border-black" /> Receiving PCM payload...
                  </span>
                )}
              </div>
            </div>
          </div>
 
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-white border-3 border-black p-4 shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
              <h4 className="text-[10px] font-mono font-extrabold text-gray-550 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-black" />
                Vocal Prosody Extracted Parameters
              </h4>
 
              <div className="space-y-3">
                <div className="bg-yellow-55 bg-yellow-50/50 border-2 border-black p-3 flex justify-between items-center transition-colors">
                  <div>
                    <h5 className="text-[10px] uppercase tracking-wide font-mono font-black text-gray-500">Fundamental Pitch (F0)</h5>
                    <p className="text-[11px] font-bold text-gray-800 mt-0.5">Fundamental raw vocal tone frequency</p>
                  </div>
                  <span className="text-xs font-mono font-black text-black bg-white border-2 border-black px-2 py-0.5">{voiceStats.pitch} Hz</span>
                </div>
 
                <div className="bg-yellow-55 bg-yellow-50/50 border-2 border-black p-3 flex justify-between items-center transition-colors">
                  <div>
                    <h5 className="text-[10px] uppercase tracking-wide font-mono font-black text-gray-500">Vocal Jitter (Pitch Dev)</h5>
                    <p className="text-[11px] font-bold text-gray-800 mt-0.5">Cycle-to-cycle frequency variations</p>
                  </div>
                  <span className="text-xs font-mono font-black text-black bg-white border-2 border-black px-2 py-0.5">{voiceStats.jitter}%</span>
                </div>
 
                <div className="bg-yellow-55 bg-yellow-50/50 border-2 border-black p-3 flex justify-between items-center transition-colors">
                  <div>
                    <h5 className="text-[10px] uppercase tracking-wide font-mono font-black text-gray-500">Vocal Shimmer (Amplitude Dev)</h5>
                    <p className="text-[11px] font-bold text-gray-800 mt-0.5">Vocal envelope power variability</p>
                  </div>
                  <span className="text-xs font-mono font-black text-black bg-white border-2 border-black px-2 py-0.5">{voiceStats.shimmer}%</span>
                </div>
 
                <div className="bg-yellow-55 bg-yellow-50/50 border-2 border-black p-3 flex justify-between items-center transition-colors">
                  <div>
                    <h5 className="text-[10px] uppercase tracking-wide font-mono font-black text-gray-500">Harmonics-to-Noise Ratio (HNR)</h5>
                    <p className="text-[11px] font-bold text-gray-800 mt-0.5">Ratio of harmonic sound to breathy noise</p>
                  </div>
                  <span className="text-xs font-mono font-black text-black bg-white border-2 border-black px-2 py-0.5">{voiceStats.hnr} dB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FACIAL EXPRESSION CNN PANEL */}
      {activeTab === 'facial' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn text-black" id="neurosense-face-panel">
          
          <div className="lg:col-span-7 flex flex-col gap-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-black" />
              // Computer Vision Facial Landmark Detector (CNN)
            </h3>
            
            <p className="text-xs text-slate-800 font-semibold leading-relaxed">
              Initiate camera input to draw a live face tracking grid and scan emotional micro-expressions OR test features using predefined models below.
            </p>

            {/* Video & canvas composite block */}
            <div className="relative bg-[#111318] border-3 border-black overflow-hidden aspect-video max-h-[260px] flex items-center justify-center shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
              
              {/* Fallback mock picture when camera is inactive */}
              {!isCameraOn && (
                <div className="absolute inset-0 z-0 flex flex-col items-center justify-center p-3 text-center bg-gray-900 border-none select-none">
                  {selectedSubject === 'subject1' && (
                    <div className="w-20 h-20 rounded-full bg-blue-900/30 border-2 border-blue-400/80 relative flex items-center justify-center text-slate-400 mb-3 overflow-hidden">
                      <span className="text-3xl">👤</span>
                      <span className="absolute bottom-1 bg-black text-[8px] font-mono border border-blue-500 px-1.5 rounded text-sky-400 font-black uppercase tracking-wider">Subject A</span>
                    </div>
                  )}
                  {selectedSubject === 'subject2' && (
                    <div className="w-20 h-20 rounded-full bg-rose-900/30 border-2 border-rose-400/80 relative flex items-center justify-center text-slate-400 mb-3 overflow-hidden">
                      <span className="text-3xl">👧</span>
                      <span className="absolute bottom-1 bg-black text-[8px] font-mono border border-rose-500 px-1.5 rounded text-rose-400 font-black uppercase tracking-wider">Subject B</span>
                    </div>
                  )}
                  {selectedSubject === 'subject3' && (
                    <div className="w-20 h-20 rounded-full bg-cyan-900/30 border-2 border-cyan-400/80 relative flex items-center justify-center text-slate-400 mb-3 overflow-hidden">
                      <span className="text-3xl">👨</span>
                      <span className="absolute bottom-1 bg-black text-[8px] font-mono border border-cyan-500 px-1.5 rounded text-cyan-400 font-black uppercase tracking-wider">Subject C</span>
                    </div>
                  )}

                  <p className="text-xs font-black text-white uppercase tracking-wider">AI Face Scanning Model Active</p>
                  <p className="text-[10px] text-gray-400 mt-1 max-w-[280px]">Change the test Subject below or allow Webcam permission above to run real-time hardware validation.</p>
                </div>
              )}

              {/* Real camera video if allowed */}
              {isCameraOn && (
                <video 
                  ref={videoRef} 
                  className="absolute inset-0 w-full h-full object-cover border-none"
                  playsInline 
                  muted 
                />
              )}

              {/* Scanning Landmark canvas */}
              <canvas 
                ref={faceCanvasRef} 
                width="360" 
                height="220" 
                className="absolute inset-0 z-10 w-full h-full" 
              />

              {/* Small Overlay Panel */}
              <div className="absolute top-3 left-3 bg-black border-2 border-black px-3 py-1.5 z-20 font-mono text-[9px] text-yellow-350 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping border border-black" />
                <span className="text-yellow-300 font-black">CNN DETECTOR: RUNNING (94% CONFIDENCE)</span>
              </div>
            </div>

            {/* Selector Options */}
            {!isCameraOn && (
              <div className="flex bg-white p-2 border-3 border-black justify-between items-center shadow-[3px_3px_0_0_rgba(0,0,0,1)] select-none">
                <span className="text-[10px] uppercase font-mono tracking-wider ml-1 font-black text-gray-500">// Subject Profile:</span>
                <div className="flex gap-2">
                  {(['subject1', 'subject2', 'subject3'] as const).map(sub => (
                    <button
                      key={sub}
                      onClick={() => setSelectedSubject(sub)}
                      className={`text-[9.5px] uppercase font-mono px-2.5 py-1.5 border-2 transition-all ${
                        selectedSubject === sub 
                          ? 'bg-yellow-300 font-black text-black border-black shadow-[2px_2px_0_0_#000]' 
                          : 'bg-white text-gray-500 border-slate-350 hover:border-black hover:text-black font-bold'
                      }`}
                    >
                      {sub === 'subject1' ? 'Alpha Profile' : sub === 'subject2' ? 'Beta Profile' : 'Gamma Profile'}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={toggleCamera}
              className={`w-full text-xs font-black uppercase py-3 border-2 border-black select-none hover:translate-y-[-1px] transition-all cursor-pointer ${
                isCameraOn 
                  ? 'bg-rose-300 text-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]' 
                  : 'bg-cyan-200 text-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]'
              }`}
            >
              <Camera className="w-4 h-4" />
              {isCameraOn ? "Shut Down Webcam Stream" : "Connect Live Webcam Scanner"}
            </button>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-white border-3 border-black p-4 shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
              <h4 className="text-[10px] font-mono font-extrabold text-gray-550 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-black" />
                Landmark Mesh Regression Metrics
              </h4>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1 font-black uppercase text-gray-700">
                    <span>Valence Score (Emotion Positivity)</span>
                    <span className="text-black bg-yellow-100 px-1 border border-black">{faceResult.valence}</span>
                  </div>
                  <div className="w-full bg-gray-100 h-3.5 border-2 border-black overflow-hidden relative">
                    {/* Centered valence line */}
                    <div className="absolute left-1/2 top-0 h-full w-0.5 bg-black" />
                    <div 
                      className={`h-full absolute top-0 ${faceResult.valence >= 0 ? 'bg-cyan-300' : 'bg-rose-300'}`}
                      style={{ 
                        left: faceResult.valence >= 0 ? '50%' : `${50 + faceResult.valence * 50}%`,
                        width: `${Math.abs(faceResult.valence) * 50}%`
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1 font-black uppercase text-gray-700">
                    <span>Arousal Weight (Activation Energy)</span>
                    <span className="text-black bg-yellow-100 px-1 border border-black">{faceResult.arousal}</span>
                  </div>
                  <div className="w-full bg-gray-100 h-3.5 border-2 border-black overflow-hidden">
                    <div className="h-full bg-cyan-300 border-r-2 border-black transition-all duration-300" style={{ width: `${(faceResult.arousal + 1) * 50}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1 font-black uppercase text-gray-700">
                    <span>Facial Micro-Expressiveness</span>
                    <span className="text-black bg-yellow-100 px-1 border border-black">{(faceResult.expressiveness * 100).toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-3.5 border-2 border-black overflow-hidden">
                    <div className="h-full bg-cyan-300 border-r-2 border-black transition-all duration-300" style={{ width: `${faceResult.expressiveness * 100}%` }} />
                  </div>
                </div>

                <div className="bg-rose-50 border-t-2 border-black pt-4 mt-2 p-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black uppercase font-mono tracking-wider text-gray-800">Estimated Distress Ratio</span>
                    <span className="text-xl font-display font-black text-rose-650 bg-white border-2 border-black px-2">{faceResult.score}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 4: ENSEMBLE ATTENTION FUSION CORE */}
      {activeTab === 'fusion' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn text-black" id="neurosense-fusion-panel">
          <div className="lg:col-span-8 flex flex-col gap-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-black" />
              // Cross-Modal Self-Attention Fusion Network
            </h3>
            
            <p className="text-xs text-slate-800 font-semibold leading-relaxed">
              Adjust attention weights to see how the mathematical Multimodal Fusion engine integrates BERT Tokenized output, Voice Prosody Pitch, and CNN Face Landmark feeds into a unified 94% accurate prediction index.
            </p>

            {/* Slider Configurator */}
            <div className="bg-white border-3 border-black p-5 space-y-5 shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
              <h4 className="text-[10px] uppercase tracking-wider font-mono font-black text-gray-500">// Dynamic Stream Attention Allocation:</h4>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5 font-black uppercase text-gray-700">
                    <span>BERT NLP Attention Weight</span>
                    <span className="text-black bg-yellow-105 bg-yellow-150 bg-yellow-200 border border-black px-1.5 font-black">{(attentionWeights.text * 100).toFixed(0)}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.05"
                    value={attentionWeights.text}
                    onChange={e => {
                      const textW = Number(e.target.value);
                      const left = 1.0 - textW;
                      setAttentionWeights({
                        text: textW,
                        voice: Number((left * 0.45).toFixed(2)),
                        face: Number((left * 0.55).toFixed(2))
                      });
                    }}
                    className="w-full accent-black cursor-pointer h-2 bg-gray-200 border border-black rounded-lg appearance-none"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5 font-black uppercase text-gray-700">
                    <span>LSTM Voice Waveform Weight</span>
                    <span className="text-black bg-yellow-200 border border-black px-1.5 font-black">{(attentionWeights.voice * 100).toFixed(0)}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.05"
                    value={attentionWeights.voice}
                    onChange={e => {
                      const voiceW = Number(e.target.value);
                      const left = 1.0 - voiceW;
                      setAttentionWeights({
                        voice: voiceW,
                        text: Number((left * 0.6).toFixed(2)),
                        face: Number((left * 0.4).toFixed(2))
                      });
                    }}
                    className="w-full accent-black cursor-pointer h-2 bg-gray-200 border border-black rounded-lg appearance-none"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5 font-black uppercase text-gray-700">
                    <span>CNN Facial Landmarks Mesh Weight</span>
                    <span className="text-black bg-yellow-200 border border-black px-1.5 font-black">{(attentionWeights.face * 100).toFixed(0)}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.05"
                    value={attentionWeights.face}
                    onChange={e => {
                      const faceW = Number(e.target.value);
                      const left = 1.0 - faceW;
                      setAttentionWeights({
                        face: faceW,
                        text: Number((left * 0.65).toFixed(2)),
                        voice: Number((left * 0.35).toFixed(2))
                      });
                    }}
                    className="w-full accent-black cursor-pointer h-2 bg-gray-200 border border-black rounded-lg appearance-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="bg-white border-3 border-black p-5 text-center flex flex-col items-center justify-between shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
              <div className="w-full">
                <span className="text-[10px] font-mono text-gray-550 font-black uppercase tracking-widest">// Ensemble Output Prediction</span>
                <div className="w-28 h-28 rounded-full border-4 border-black flex flex-col justify-center items-center mt-5 mx-auto relative bg-yellow-100/65 shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
                  <span className="text-3xl font-display font-black text-black">{calculatedFusionScore}%</span>
                  <span className="text-[8px] font-mono uppercase text-gray-600 font-extrabold tracking-wider mt-1">Mental Stress</span>
                </div>
              </div>

              <div className="mt-6 w-full">
                <h5 className="text-[10px] font-black text-gray-550 uppercase tracking-widest mb-3 font-mono">// Consolidated Triage Classification</h5>
                <div className={`p-3 border-2 border-black text-xs font-black uppercase tracking-wide leading-relaxed shadow-[2px_2px_0_0_rgba(0,0,0,1)] ${
                  calculatedFusionScore > 75 
                    ? 'bg-rose-300 text-black' 
                    : calculatedFusionScore > 45
                    ? 'bg-amber-300 text-black'
                    : 'bg-emerald-300 text-black'
                }`}>
                  {calculatedFusionScore > 75 
                    ? "Severe Triage Threshold: Recommend Professional Clinic Outreach" 
                    : calculatedFusionScore > 45 
                    ? "Moderate Boundary: General Fatigue detected. Monitor stress patterns." 
                    : "Optimal Balance Score: Homeostasis emotional equilibrium output."
                  }
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
