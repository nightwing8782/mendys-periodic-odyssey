import React, { useEffect, useRef, useState } from 'react';
import { 
  startRadioMusic, 
  stopRadioMusic, 
  setRadioVolume, 
  setRadioMute, 
  getRadioDataArray 
} from '../utils/audio';

export default function CombinationConsole({ activeElement, isCorrect, currentIndex }) {
  // Radio control states
  const [station, setStation] = useState(-1); // -1 = Off, 0 = Ambient, 1 = Retro, 2 = Theremin
  const [volume, setVolume] = useState(0.3);
  const [muted, setMuted] = useState(false);
  const [lastScannedElement, setLastScannedElement] = useState(null);
  const canvasRef = useRef(null);

  // Reset cache at the start of a round (index 0)
  useEffect(() => {
    if (currentIndex === 0) {
      setLastScannedElement(null);
    }
  }, [currentIndex]);

  // Update cached scan details on a correct answer
  useEffect(() => {
    if (isCorrect && activeElement) {
      setLastScannedElement(activeElement);
    }
  }, [isCorrect, activeElement]);

  // Tuner station handler
  const handleStationChange = (stationIndex) => {
    if (station === stationIndex) {
      // Toggle off
      stopRadioMusic();
      setStation(-1);
    } else {
      setStation(stationIndex);
      startRadioMusic(stationIndex);
    }
  };

  // Volume slider handler
  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setRadioVolume(val);
  };

  // Mute toggle handler
  const handleMuteToggle = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    setRadioMute(nextMuted);
  };

  // Oscilloscope wave canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = 150;
    const height = canvas.height = 55;
    let animId;

    const draw = () => {
      ctx.fillStyle = 'rgba(6, 8, 20, 0.4)'; // trails effect
      ctx.fillRect(0, 0, width, height);

      // Draw grid lines for sci-fi look
      ctx.strokeStyle = 'rgba(20, 184, 166, 0.15)';
      ctx.lineWidth = 0.5;
      
      // Vertical grid lines
      for (let x = 0; x < width; x += 15) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      // Horizontal grid lines
      for (let y = 0; y < height; y += 15) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Fetch live wave data
      const dataArray = getRadioDataArray();
      
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#2dd4bf'; // Neon teal visualizer wave
      ctx.shadowBlur = 4;
      ctx.shadowColor = '#2dd4bf';

      ctx.beginPath();

      if (dataArray && station !== -1 && !muted) {
        // Draw real synthesized oscillator waveforms
        const sliceWidth = width / dataArray.length;
        let x = 0;

        for (let i = 0; i < dataArray.length; i++) {
          const v = dataArray[i] / 128.0; // normalised
          const y = (v * height) / 2;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }

          x += sliceWidth;
        }
      } else {
        // Draw flat line with subtle white noise wobble if off/muted
        ctx.moveTo(0, height / 2);
        for (let x = 0; x < width; x++) {
          const wobble = station !== -1 && muted ? 0 : (Math.random() - 0.5) * 1.5;
          ctx.lineTo(x, height / 2 + wobble);
        }
      }

      ctx.stroke();
      ctx.shadowBlur = 0; // Reset shadow

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [station, muted]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full select-none text-slate-200 mt-4">
      {/* CSS custom scanning animations */}
      <style>{`
        @keyframes scanner-swipe {
          0% { top: -2px; }
          100% { top: calc(100% + 2px); }
        }
        .animate-scan-bar {
          animation: scanner-swipe 2s linear infinite;
        }
        .green-glow-text {
          text-shadow: 0 0 5px rgba(16, 185, 129, 0.65);
        }
      `}</style>

      {/* PANEL A: ATOMIC DEEP SCANNER */}
      <div className="glass-panel border border-emerald-500/20 bg-slate-950/60 rounded-2xl p-4 flex flex-col justify-between min-h-[145px] relative overflow-hidden font-mono-sci">
        {/* Decorative corner brackets */}
        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-emerald-500/40"></div>
        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-emerald-500/40"></div>
        <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-emerald-500/40"></div>
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-emerald-500/40"></div>

        <div className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest border-b border-emerald-500/20 pb-1.5 flex justify-between items-center">
          <span>ATOMIC DEEP SCANNER</span>
          {isCorrect ? (
            <span className="animate-pulse flex items-center space-x-1 text-yellow-400">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-ping" />
              <span>DATA UNLOCKED</span>
            </span>
          ) : lastScannedElement ? (
            <span className="flex items-center space-x-1 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>CACHED DATA</span>
            </span>
          ) : (
            <span className="animate-pulse flex items-center space-x-1 text-emerald-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
              <span>SCANNING MATRIX</span>
            </span>
          )}
        </div>

        {lastScannedElement ? (
          // Displays detailed element scientific profile of the last successfully scanned target
          <div className="flex-grow flex flex-col justify-between text-[10px] text-emerald-300 mt-2 space-y-1 animate-fade-in">
            <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
              <div>
                <span className="text-emerald-500/60 font-medium">ELEMENT:</span>{' '}
                <span className="font-bold text-slate-100 uppercase">{lastScannedElement.name}</span>
              </div>
              <div>
                <span className="text-emerald-500/60 font-medium">SYMBOL:</span>{' '}
                <span className="font-bold text-yellow-400 font-deco">{lastScannedElement.symbol}</span>
              </div>
              <div>
                <span className="text-emerald-500/60 font-medium">ATOMIC #:</span>{' '}
                <span className="font-bold text-slate-200">{lastScannedElement.number}</span>
              </div>
              <div>
                <span className="text-emerald-500/60 font-medium">MASS:</span>{' '}
                <span className="font-bold text-slate-200">{lastScannedElement.mass} u</span>
              </div>
            </div>
            
            <div className="border-t border-emerald-500/10 pt-1">
              <span className="text-emerald-500/60 font-medium">CONFIG:</span>{' '}
              <span className="text-emerald-400 text-[9px] font-semibold">{lastScannedElement.config}</span>
            </div>
            
            <div className="border-t border-emerald-500/10 pt-1 leading-normal text-[9px] text-slate-300 italic">
              <span className="text-emerald-500/60 font-medium not-italic uppercase font-bold text-[8.5px]">USE:</span> {lastScannedElement.use}
            </div>
          </div>
        ) : (
          // Scanning looping grid bar when answering
          <div className="flex-grow flex flex-col justify-center items-center text-center mt-2 relative">
            <div className="absolute left-0 right-0 h-[1.5px] bg-emerald-500/40 glow-green animate-scan-bar pointer-events-none" />
            
            <span className="text-emerald-500 font-bold tracking-widest text-xs animate-pulse green-glow-text mb-1">
              SCANNING MATRIX...
            </span>
            <span className="text-[8px] text-emerald-500/60 uppercase tracking-widest">
              Awaiting Target Formulation
            </span>
          </div>
        )}
      </div>

      {/* PANEL B: INTERSTELLAR RADIO */}
      <div className="glass-panel border border-teal-500/20 bg-slate-950/60 rounded-2xl p-4 flex flex-col justify-between min-h-[145px] font-mono-sci relative">
        {/* Decorative corner brackets */}
        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-teal-500/40"></div>
        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-teal-500/40"></div>
        <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-teal-500/40"></div>
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-teal-500/40"></div>

        <div className="text-[9px] text-teal-400 font-bold uppercase tracking-widest border-b border-teal-500/20 pb-1.5 flex justify-between items-center">
          <span>INTERSTELLAR RADIO</span>
          <span className="text-teal-500/60">SYS-COM STATION</span>
        </div>

        {/* Visualizer Wave & Tuner Grid */}
        <div className="flex items-center space-x-3 my-2">
          {/* oscilloscope canvas */}
          <canvas 
            ref={canvasRef} 
            className="border border-teal-500/20 rounded-md bg-[#02040b]"
            style={{ width: '110px', height: '42px' }}
          />

          {/* Tuner Buttons */}
          <div className="flex flex-col space-y-1 flex-grow">
            <button
              onClick={() => handleStationChange(0)}
              className={`text-[8px] text-left px-2 py-1 rounded transition-all duration-300 font-bold border ${
                station === 0 
                  ? 'bg-teal-500/25 border-teal-400 text-teal-200 shadow-[0_0_8px_rgba(20,184,166,0.3)]' 
                  : 'bg-slate-950/80 border-teal-950/60 text-teal-600 hover:border-teal-500/30'
              }`}
            >
              🌌 AMBIENT
            </button>
            <button
              onClick={() => handleStationChange(1)}
              className={`text-[8px] text-left px-2 py-1 rounded transition-all duration-300 font-bold border ${
                station === 1 
                  ? 'bg-teal-500/25 border-teal-400 text-teal-200 shadow-[0_0_8px_rgba(20,184,166,0.3)]' 
                  : 'bg-slate-950/80 border-teal-950/60 text-teal-600 hover:border-teal-500/30'
              }`}
            >
              👾 RETRO
            </button>
            <button
              onClick={() => handleStationChange(2)}
              className={`text-[8px] text-left px-2 py-1 rounded transition-all duration-300 font-bold border ${
                station === 2 
                  ? 'bg-teal-500/25 border-teal-400 text-teal-200 shadow-[0_0_8px_rgba(20,184,166,0.3)]' 
                  : 'bg-slate-950/80 border-teal-950/60 text-teal-600 hover:border-teal-500/30'
              }`}
            >
              🎹 THEREMIN
            </button>
          </div>
        </div>

        {/* Volume Slider & Mute control */}
        <div className="flex items-center justify-between text-[8px] border-t border-teal-500/10 pt-1.5 text-teal-400/80">
          <div className="flex items-center space-x-1.5 flex-grow mr-4">
            <span>VOL</span>
            <input
              type="range"
              min="0"
              max="0.8"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full accent-teal-400 h-1 bg-slate-950 rounded-lg cursor-pointer"
            />
          </div>
          
          <button
            onClick={handleMuteToggle}
            className={`px-2.5 py-0.5 rounded text-[8px] font-bold transition-all duration-300 border ${
              muted 
                ? 'bg-red-950/50 border-red-500 text-red-400 glow-red animate-pulse' 
                : 'bg-slate-950 border-teal-950/60 text-teal-500 hover:border-teal-500/30'
            }`}
          >
            {muted ? 'MUTED' : 'MUTE'}
          </button>
        </div>
      </div>
    </div>
  );
}
