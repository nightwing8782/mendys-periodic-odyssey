import React, { useEffect, useState } from 'react';

export default function Mendy({ state = 'idle' }) {
  const [blink, setBlink] = useState(false);

  // Auto-blink mechanism for organic feel
  useEffect(() => {
    if (state !== 'idle' && state !== 'thinking') return;

    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 200);
    }, 4000);

    return () => clearInterval(interval);
  }, [state]);

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
      <div className={`flex flex-col items-center ${isCorrect ? 'animate-success-bounce' : 'animate-float'} relative z-10 w-full`}>
        {/* Inline styles for custom keyframe animations */}
        <style>{`
          @keyframes antenna-twitch-l {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(20deg) scaleY(0.95); }
          }
          @keyframes antenna-twitch-r {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(-20deg) scaleY(0.95); }
          }
          @keyframes tip-wiggle-l {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-4px, -2px) scale(1.2); }
          }
          @keyframes tip-wiggle-r {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(4px, -2px) scale(1.2); }
          }
          @keyframes success-bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px) rotate(0.5deg); }
          }
          @keyframes gear-rotate-cw {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes gear-rotate-ccw {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(-360deg); }
          }
          .animate-antenna-l {
            animation: antenna-twitch-l 0.8s ease-in-out infinite;
          }
          .animate-antenna-r {
            animation: antenna-twitch-r 0.8s ease-in-out infinite 0.15s;
          }
          .animate-tip-l {
            animation: tip-wiggle-l 0.8s ease-in-out infinite;
            transform-origin: 55px 60px;
          }
          .animate-tip-r {
            animation: tip-wiggle-r 0.8s ease-in-out infinite 0.15s;
            transform-origin: 205px 60px;
          }
          .animate-success-bounce {
            animation: success-bounce 0.45s ease-in-out infinite;
          }
          .animate-gear-cw {
            animation: gear-rotate-cw 12s linear infinite;
          }
          .animate-gear-ccw {
            animation: gear-rotate-ccw 8s linear infinite;
          }
        `}</style>

        <svg
          width="210"
          height="250"
          viewBox="0 0 260 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_12px_rgba(234,179,8,0.2)]"
        >
          {/* Antennas */}
          <g id="antennas">
            {/* Left Antenna Group */}
            <g
              className={`transition-all duration-500 origin-[95px_105px] ${isThinking ? 'animate-antenna-l' : ''}`}
              style={{
                transformOrigin: '95px 105px',
                transform: isIncorrect ? 'rotate(-15deg)' : 'none'
              }}
            >
              <path
                d="M95 105C80 75 60 60 55 60"
                stroke="#eab308"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <circle
                cx="55"
                cy="60"
                r="10"
                fill="#22c55e"
                className={`transition-all duration-500 ${isThinking ? 'animate-tip-l' : ''} ${isCorrect ? 'fill-emerald-400' : 'fill-emerald-500'}`}
                style={{
                  filter: isCorrect ? 'drop-shadow(0 0 10px #22c55e)' : isThinking ? 'drop-shadow(0 0 4px #22c55e)' : 'none'
                }}
              />
            </g>

            {/* Right Antenna Group */}
            <g
              className={`transition-all duration-500 origin-[165px_105px] ${isThinking ? 'animate-antenna-r' : ''}`}
              style={{
                transformOrigin: '165px 105px',
                transform: isIncorrect ? 'rotate(15deg)' : 'none'
              }}
            >
              <path
                d="M165 105C180 75 200 60 205 60"
                stroke="#eab308"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <circle
                cx="205"
                cy="60"
                r="10"
                fill="#22c55e"
                className={`transition-all duration-500 ${isThinking ? 'animate-tip-r' : ''} ${isCorrect ? 'fill-emerald-400' : 'fill-emerald-500'}`}
                style={{
                  filter: isCorrect ? 'drop-shadow(0 0 10px #22c55e)' : isThinking ? 'drop-shadow(0 0 4px #22c55e)' : 'none'
                }}
              />
            </g>
          </g>

          {/* Head & Suit Color Definitions */}
          <defs>
            <radialGradient id="headGrad" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="80%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ca8a04" />
            </radialGradient>

            <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#14b8a6" />
              <stop offset="50%" stopColor="#0f766e" />
              <stop offset="100%" stopColor="#115e59" />
            </linearGradient>

            <linearGradient id="goldTrimGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#a16207" />
            </linearGradient>
          </defs>

          {/* Suit/Body */}
          <g id="body">
            {/* Torso */}
            <path
              d="M80 230C80 230 70 270 70 320H190C190 320 180 270 180 230H80Z"
              fill="url(#suitGrad)"
              stroke="url(#goldTrimGrad)"
              strokeWidth="3"
            />

            {/* Collar */}
            <path
              d="M85 230C85 230 130 250 175 230C165 240 155 245 130 245C105 245 95 240 85 230Z"
              fill="#eab308"
              stroke="#fef08a"
              strokeWidth="1"
            />

            {/* Left Arm */}
            <path
              d="M75 235C60 250 40 275 35 290C30 300 45 305 50 295C55 285 70 260 80 250"
              fill="url(#suitGrad)"
              stroke="url(#goldTrimGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="transition-all duration-500 origin-[75px_235px]"
              style={{
                transform: 'none'
              }}
            />

            {/* Right Arm */}
            <path
              d="M185 235C200 245 220 260 235 255C245 250 240 235 225 230C215 225 195 230 180 232"
              fill="url(#suitGrad)"
              stroke="url(#goldTrimGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="transition-all duration-500 origin-[185px_235px]"
              style={{
                transform: isCorrect 
                  ? 'rotate(130deg) translate(42px, -55px)' 
                  : isIncorrect 
                  ? 'rotate(-42deg) translate(-12px, 8px)' 
                  : 'none'
              }}
            />

            {/* Chest Starburst details */}
            <path
              d="M130 255L120 285L130 295L140 285L130 255Z"
              fill="#eab308"
              opacity="0.95"
            />
            <path
              d="M110 270L125 280M150 270L135 280"
              stroke="#eab308"
              strokeWidth="2"
            />
          </g>

          {/* Head */}
          <circle
            cx="130"
            cy="165"
            r="72"
            fill="url(#headGrad)"
            stroke="#ca8a04"
            strokeWidth="3.5"
          />

          {/* Head Patterns */}
          <path
            d="M100 102C120 115 140 115 160 102"
            stroke="#ca8a04"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.4"
          />
          <path
            d="M110 112C123 122 137 122 150 112"
            stroke="#ca8a04"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.4"
          />

          {/* Cheeks Blushing */}
          <circle
            cx="80"
            cy="195"
            r="10"
            fill="#ef4444"
            opacity={isCorrect ? "0.75" : isIncorrect ? "0.1" : "0.3"}
            className="transition-all duration-500"
            style={{
              filter: 'blur(3px)'
            }}
          />
          <circle
            cx="180"
            cy="195"
            r="10"
            fill="#ef4444"
            opacity={isCorrect ? "0.75" : isIncorrect ? "0.1" : "0.3"}
            className="transition-all duration-500"
            style={{
              filter: 'blur(3px)'
            }}
          />

          {/* Eyes */}
          <g id="eyes">
            {/* Left Eye */}
            <g
              className="transition-all duration-500 origin-[95px_175px]"
              style={{
                transform: isCorrect ? 'scale(1.15)' : isIncorrect ? 'scaleY(0.4) translateY(5px)' : isThinking ? 'translate(2px, -3px)' : 'none'
              }}
            >
              <ellipse cx="95" cy="175" rx="18" ry="24" fill="#1e1b4b" />
              <ellipse cx="95" cy="175" rx="14" ry="19" fill="#030712" />
              {!blink && (
                <>
                  <circle cx="91" cy="165" r="5" fill="#ffffff" />
                  <circle cx="99" cy="183" r="2.5" fill="#ffffff" opacity="0.7" />
                </>
              )}
              {blink && <ellipse cx="95" cy="175" rx="18" ry="24" fill="url(#headGrad)" />}
            </g>

            {/* Right Eye */}
            <g
              className="transition-all duration-500 origin-[165px_175px]"
              style={{
                transform: isCorrect ? 'scale(1.15)' : isIncorrect ? 'scaleY(0.4) translateY(5px)' : isThinking ? 'translate(2px, -3px)' : 'none'
              }}
            >
              <ellipse cx="165" cy="175" rx="18" ry="24" fill="#1e1b4b" />
              <ellipse cx="165" cy="175" rx="14" ry="19" fill="#030712" />
              {!blink && (
                <>
                  <circle cx="161" cy="165" r="5" fill="#ffffff" />
                  <circle cx="169" cy="183" r="2.5" fill="#ffffff" opacity="0.7" />
                </>
              )}
              {blink && <ellipse cx="165" cy="175" rx="18" ry="24" fill="url(#headGrad)" />}
            </g>
          </g>

          {/* Mouth */}
          <g id="mouth">
            {isCorrect && (
              <path
                d="M115 198C115 198 130 220 145 198"
                stroke="#7f1d1d"
                strokeWidth="5"
                strokeLinecap="round"
                fill="#ef4444"
                className="transition-all duration-500"
              />
            )}
            {isIncorrect && (
              <path
                d="M120 205C125 200 135 200 140 205"
                stroke="#7f1d1d"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-500"
              />
            )}
            {isThinking && (
              <ellipse
                cx="130"
                cy="203"
                rx="6"
                ry="8"
                fill="#7f1d1d"
                stroke="#ca8a04"
                strokeWidth="1.5"
                className="transition-all duration-500"
              />
            )}
            {state === 'idle' && (
              <path
                d="M120 200C123 205 137 205 140 200"
                stroke="#7f1d1d"
                strokeWidth="4.5"
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-500"
              />
            )}
          </g>

          {/* Sweatdrop for failure */}
          {isIncorrect && (
            <path
              d="M62 145C62 145 55 155 58 160C61 165 67 163 67 158C67 153 62 145 62 145Z"
              fill="#38bdf8"
              className="animate-bounce"
              style={{
                filter: 'drop-shadow(0 0 3px rgba(56, 189, 248, 0.5))'
              }}
            />
          )}
        </svg>
      </div>

      {/* Thinking state bubble */}
      {isThinking && (
        <div className="absolute bottom-2 bg-slate-950 border border-yellow-500 text-yellow-300 text-[8px] px-2.5 py-0.5 rounded-full font-mono-sci shadow-[0_0_8px_rgba(234,179,8,0.2)] animate-pulse z-20">
          SCANNING BRAINWAVES...
        </div>
      )}
    </div>
  );
}
