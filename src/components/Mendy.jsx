import React from 'react';

export default function Mendy({ state = 'idle' }) {
  // Determine styles and transforms based on state
  const isCorrect = state === 'correct';
  const isIncorrect = state === 'incorrect';
  const isThinking = state === 'thinking';

  return (
    <div className={`relative w-full max-w-[270px] aspect-[4/5] flex flex-col items-center justify-center p-3 border-2 border-yellow-600/40 rounded-2xl bg-gradient-to-br from-teal-950/20 via-[#070b13] to-teal-950/30 overflow-hidden shadow-[inset_0_0_20px_rgba(20,184,166,0.25)] glow-gold select-none`}>
      
      {/* Intricate Steampunk Chassis Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-scanlines opacity-[0.05]" />
        
        {/* Spinning Gear 1 (Top Left) */}
        <svg className="absolute -top-6 -left-6 w-14 h-14 text-yellow-600/20 animate-gear-cw origin-center" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50,30 C39,30 30,39 30,50 C30,61 39,70 50,70 C61,70 70,61 70,50 C70,39 61,30 50,30 Z M50,60 C44.5,60 40,55.5 40,50 C40,44.5 44.5,40 50,40 C55.5,40 60,44.5 60,50 C60,55.5 55.5,60 50,60 Z" />
          <path d="M46,12 L54,12 L56,22 C59,23 62,25 64,27 L73,20 L79,26 L72,35 C74,37 76,40 77,43 L87,45 L87,53 L77,55 C76,58 74,61 72,63 L79,72 L73,78 L64,71 C62,73 59,75 56,76 L54,86 L46,86 L44,76 C41,75 38,73 36,71 L27,78 L21,72 L28,63 C26,61 24,58 23,55 L13,53 L13,45 L23,43 C24,40 26,37 28,35 L21,26 L27,20 L36,27 C38,25 41,23 44,22 L46,12 Z" />
        </svg>

        {/* Spinning Gear 2 (Bottom Right) */}
        <svg className="absolute -bottom-8 -right-8 w-20 h-20 text-teal-600/15 animate-gear-ccw origin-center" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50,30 C39,30 30,39 30,50 C30,61 39,70 50,70 C61,70 70,61 70,50 C70,39 61,30 50,30 Z M50,60 C44.5,60 40,55.5 40,50 C40,44.5 44.5,40 50,40 C55.5,40 60,44.5 60,50 C60,55.5 55.5,60 50,60 Z" />
          <path d="M46,12 L54,12 L56,22 C59,23 62,25 64,27 L73,20 L79,26 L72,35 C74,37 76,40 77,43 L87,45 L87,53 L77,55 C76,58 74,61 72,63 L79,72 L73,78 L64,71 C62,73 59,75 56,76 L54,86 L46,86 L44,76 C41,75 38,73 36,71 L27,78 L21,72 L28,63 C26,61 24,58 23,55 L13,53 L13,45 L23,43 C24,40 26,37 28,35 L21,26 L27,20 L36,27 C38,25 41,23 44,22 L46,12 Z" />
        </svg>

        {/* Golden piping inside */}
        <div className="absolute inset-2 border border-yellow-600/35 rounded-xl pointer-events-none" />
      </div>

      {/* Symmetrical Art Deco Brass Rivets */}
      <div className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-yellow-600 border border-yellow-400 shadow-[0_0_2px_#ca8a04] z-10" />
      <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-yellow-600 border border-yellow-400 shadow-[0_0_2px_#ca8a04] z-10" />
      <div className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-yellow-600 border border-yellow-400 shadow-[0_0_2px_#ca8a04] z-10" />
      <div className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-yellow-600 border border-yellow-400 shadow-[0_0_2px_#ca8a04] z-10" />

      {/* Actual Character Wrapper with dynamic float/shake */}
      <div className="flex flex-col items-center justify-center relative z-10 w-full h-full p-2">
        {/* Inline styles for custom keyframe animations */}
        <style>{`
          @keyframes gear-rotate-cw {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes gear-rotate-ccw {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(-360deg); }
          }
          @keyframes zero-g-float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(1deg); }
          }
          @keyframes correct-shake {
            0%, 100% { transform: scale(1.05) translateY(-5px) rotate(0deg); }
            25% { transform: scale(1.05) translateY(-8px) rotate(-1deg); }
            75% { transform: scale(1.05) translateY(-3px) rotate(1deg); }
          }
          @keyframes incorrect-shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-4px) rotate(-1.5deg); }
            40%, 80% { transform: translateX(4px) rotate(1.5deg); }
          }
          .animate-gear-cw {
            animation: gear-rotate-cw 12s linear infinite;
          }
          .animate-gear-ccw {
            animation: gear-rotate-ccw 8s linear infinite;
          }
          .animate-mendy-float {
            animation: zero-g-float 5s ease-in-out infinite;
          }
          .animate-mendy-correct {
            animation: correct-shake 0.5s ease-in-out infinite;
          }
          .animate-mendy-incorrect {
            animation: incorrect-shake 0.4s ease-in-out 3;
          }
          .mendy-glow-teal {
            filter: drop-shadow(0 0 15px rgba(45, 212, 191, 0.4)) drop-shadow(0 0 2px rgba(45, 212, 191, 0.2));
          }
          .mendy-glow-amber {
            filter: drop-shadow(0 0 15px rgba(234, 179, 8, 0.4)) drop-shadow(0 0 2px rgba(234, 179, 8, 0.2));
          }
          .mendy-glow-red {
            filter: drop-shadow(0 0 15px rgba(239, 68, 68, 0.5)) drop-shadow(0 0 2px rgba(239, 68, 68, 0.3)) brightness(0.85);
          }
          .mendy-glow-emerald {
            filter: drop-shadow(0 0 20px rgba(52, 211, 153, 0.6)) drop-shadow(0 0 4px rgba(52, 211, 153, 0.3));
          }
        `}</style>

        <div className={`w-full max-w-[210px] aspect-[4/5] flex items-center justify-center transition-all duration-500 ${
          isCorrect ? 'animate-mendy-correct mendy-glow-emerald' :
          isIncorrect ? 'animate-mendy-incorrect mendy-glow-red' :
          isThinking ? 'animate-mendy-float mendy-glow-amber' :
          'animate-mendy-float mendy-glow-teal'
        }`}>
          <img 
            src="/mendy-v2.png" 
            alt="Captain Mendy" 
            className="w-full h-full object-contain pointer-events-none"
          />
        </div>
      </div>

      {/* Thinking state bubble */}
      {isThinking && (
        <div className="absolute bottom-3 bg-slate-950/95 border border-yellow-500 text-yellow-300 text-[8px] px-3 py-1 rounded-full font-mono-sci shadow-[0_0_12px_rgba(234,179,8,0.35)] animate-pulse z-20 uppercase tracking-widest">
          SCANNING MATRIX...
        </div>
      )}
      
      {isCorrect && (
        <div className="absolute bottom-3 bg-emerald-950/95 border border-emerald-400 text-emerald-300 text-[8px] px-3 py-1 rounded-full font-mono-sci shadow-[0_0_12px_rgba(16,185,129,0.35)] z-20 uppercase tracking-widest">
          SECURED!
        </div>
      )}

      {isIncorrect && (
        <div className="absolute bottom-3 bg-red-950/95 border border-red-500 text-red-400 text-[8px] px-3 py-1 rounded-full font-mono-sci shadow-[0_0_12px_rgba(239,68,68,0.35)] z-20 uppercase tracking-widest">
          ANOMALY DETECTED!
        </div>
      )}
    </div>
  );
}
