import React from 'react';

export default function Mendy({ state = 'idle' }) {
  const isThinking = state === 'thinking';
  const isCorrect = state === 'correct';
  const isIncorrect = state === 'incorrect';

  return (
    <div className="relative w-full max-w-[270px] aspect-[4/5] flex flex-col items-center justify-center p-4 bg-[#05050a] border border-cyan-500/20 select-none overflow-hidden">
      {/* Neon corner brackets */}
      <div className="hud-bracket hud-bracket-tl" />
      <div className="hud-bracket hud-bracket-tr" />
      <div className="hud-bracket hud-bracket-bl" />
      <div className="hud-bracket hud-bracket-br" />

      {/* Holographic AI streaming placeholder */}
      <div className="flex flex-col items-center justify-center space-y-4 z-10 text-center w-full h-full p-4">
        
        {/* Pulsing radar icon */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-cyan-400 animate-ping opacity-25" />
          <div className={`absolute inset-2 rounded-full border-2 border-dashed animate-spin ${
            isCorrect ? 'border-emerald-400' :
            isIncorrect ? 'border-red-500' :
            isThinking ? 'border-yellow-400' :
            'border-cyan-400'
          }`} style={{ animationDuration: '6s' }} />
          <span className="text-xl">🤖</span>
        </div>

        <div className="space-y-1 font-mono">
          <div className={`text-[10px] font-bold tracking-widest ${
            isCorrect ? 'text-emerald-400' :
            isIncorrect ? 'text-red-400 animate-pulse' :
            isThinking ? 'text-yellow-400 animate-pulse' :
            'text-cyan-400 animate-status-glow'
          }`}>
            {isCorrect ? '[TRANSMISSION_SECURED]' :
             isIncorrect ? '[LINK_ANOMALY]' :
             isThinking ? '[SCANNING_MATRIX]' :
             '[HOLOGRAPHIC AI STREAMING...]'}
          </div>
          <div className="text-[8px] text-cyan-500/50 tracking-wider">
            RIVE CORE PROTOCOL OFFLINE
          </div>
        </div>

        {/* Fake waveform / activity lines */}
        <div className="flex items-center space-x-1.5 h-6">
          <div className="w-[2px] bg-cyan-400 h-6 animate-waveform-bar" style={{ animationDelay: '0.1s', animationDuration: '0.9s' }} />
          <div className="w-[2px] bg-cyan-400 h-6 animate-waveform-bar" style={{ animationDelay: '0.35s', animationDuration: '0.7s' }} />
          <div className="w-[2px] bg-cyan-400 h-6 animate-waveform-bar" style={{ animationDelay: '0.15s', animationDuration: '0.8s' }} />
          <div className="w-[2px] bg-cyan-400 h-6 animate-waveform-bar" style={{ animationDelay: '0.5s', animationDuration: '0.6s' }} />
          <div className="w-[2px] bg-cyan-400 h-6 animate-waveform-bar" style={{ animationDelay: '0.25s', animationDuration: '0.85s' }} />
        </div>
      </div>
    </div>
  );
}
