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
    <div className={`flex flex-col items-center select-none ${isCorrect ? 'animate-success-bounce' : 'animate-float'} relative`}>
      {/* Inline styles for custom keyframe animations */}
      <style>{`
        @keyframes antenna-twitch-l {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(18deg) scaleY(0.95); }
        }
        @keyframes antenna-twitch-r {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-18deg) scaleY(0.95); }
        }
        @keyframes chin-tap-anim {
          0%, 100% { transform: rotate(-74deg) translate(-24px, -35px); }
          50% { transform: rotate(-68deg) translate(-22px, -37px); }
        }
        @keyframes success-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
        .animate-antenna-l {
          animation: antenna-twitch-l 0.8s ease-in-out infinite;
        }
        .animate-antenna-r {
          animation: antenna-twitch-r 0.8s ease-in-out infinite 0.15s;
        }
        .animate-chin-tap {
          animation: chin-tap-anim 0.6s ease-in-out infinite;
        }
        .animate-success-bounce {
          animation: success-bounce 0.45s ease-in-out infinite;
        }
      `}</style>

      <svg
        width="260"
        height="320"
        viewBox="0 0 260 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_15px_rgba(234,179,8,0.25)]"
      >
        {/* Antennas */}
        <g id="antennas">
          {/* Left Antenna */}
          <path
            d="M95 105C80 75 60 60 55 60"
            stroke="#eab308"
            strokeWidth="5"
            strokeLinecap="round"
            className={`transition-all duration-500 origin-[95px_105px] ${isThinking ? 'animate-antenna-l' : ''}`}
            style={{
              transform: isIncorrect ? 'rotate(-15deg)' : 'none'
            }}
          />
          <circle
            cx="55"
            cy="60"
            r="10"
            fill="#22c55e"
            className={`transition-all duration-500 ${isCorrect ? 'fill-emerald-400' : 'fill-emerald-500'}`}
            style={{
              filter: isCorrect ? 'drop-shadow(0 0 8px #22c55e)' : 'none',
              transform: isIncorrect ? 'translate(-8px, 12px)' : 'none',
              animation: isThinking ? 'antenna-twitch-l 0.8s ease-in-out infinite origin-[95px_105px]' : 'none'
            }}
          />

          {/* Right Antenna */}
          <path
            d="M165 105C180 75 200 60 205 60"
            stroke="#eab308"
            strokeWidth="5"
            strokeLinecap="round"
            className={`transition-all duration-500 origin-[165px_105px] ${isThinking ? 'animate-antenna-r' : ''}`}
            style={{
              transform: isIncorrect ? 'rotate(15deg)' : 'none'
            }}
          />
          <circle
            cx="205"
            cy="60"
            r="10"
            fill="#22c55e"
            className={`transition-all duration-500 ${isCorrect ? 'fill-emerald-400' : 'fill-emerald-500'}`}
            style={{
              filter: isCorrect ? 'drop-shadow(0 0 8px #22c55e)' : 'none',
              transform: isIncorrect ? 'translate(8px, 12px)' : 'none'
            }}
          />
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
          {/* Suit Torso */}
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
            className={`transition-all duration-500 origin-[75px_235px] ${isThinking ? 'animate-chin-tap' : ''}`}
            style={{
              transform: isCorrect 
                ? 'rotate(-130deg) translate(-45px, -35px)' 
                : isIncorrect 
                ? 'rotate(42deg) translate(12px, -8px)' // resting on hip
                : 'none'
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
                ? 'rotate(130deg) translate(42px, -55px)' // fist pump / waving
                : isIncorrect 
                ? 'rotate(-42deg) translate(-12px, 8px)' // resting on hip
                : 'none'
            }}
          />

          {/* Chest Pattern (Art Deco Starburst details) */}
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

        {/* Art Deco Head Patterns */}
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

        {/* Cheeks (Blushing) */}
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

        {/* Sweatdrop for incorrect state */}
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

      {/* Thinking state bubble */}
      {isThinking && (
        <div className="absolute -top-6 bg-slate-900 border border-yellow-500 text-yellow-300 text-[10px] px-3 py-1 rounded-full font-mono-sci shadow-[0_0_10px_rgba(234,179,8,0.2)] animate-pulse">
          SCANNING BRAINWAVES...
        </div>
      )}
    </div>
  );
}
