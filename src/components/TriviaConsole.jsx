import React, { useState, useEffect, useRef } from 'react';
import { playClueChime, playCorrectAscent, playIncorrectBuzz } from '../utils/audio';

export default function TriviaConsole({
  element,
  index,
  round,
  passThreshold,
  onAnswerSubmitted
}) {
  const [cluesRevealed, setCluesRevealed] = useState([true, false, false]); // [clue1, clue2, clue3]
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState(null); // 'correct' | 'incorrect' | 'timeout'
  const [timeLeft, setTimeLeft] = useState(15);
  const [clueIndices, setClueIndices] = useState([0, 2]);
  const inputRef = useRef(null);
  const timeoutRef = useRef(null);

  // Cleanup any active transition timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Auto-focus input and reset timer when a new element or round appears
  useEffect(() => {
    setInputValue('');
    setCluesRevealed([true, false, false]);
    setFeedback(null);
    setTimeLeft(15);
    
    // Choose stable random indices for the active question:
    // Choose 0 or 1 for Clue 1 (Hard), 2 or 3 for Clue 2 (Medium)
    const hardIdx = Math.random() < 0.5 ? 0 : 1;
    const medIdx = Math.random() < 0.5 ? 2 : 3;
    setClueIndices([hardIdx, medIdx]);
    
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [element, round]);

  // Timer countdown handler
  useEffect(() => {
    if (feedback !== null) return;
    
    if (timeLeft <= 0) {
      setFeedback('timeout');
      playIncorrectBuzz();
      timeoutRef.current = setTimeout(() => {
        onAnswerSubmitted(false, 0);
      }, 1500);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, feedback, onAnswerSubmitted]);

  const revealClue = (clueIndex) => {
    if (cluesRevealed[clueIndex] || feedback !== null) return;
    
    const newRevealed = [...cluesRevealed];
    newRevealed[clueIndex] = true;
    setCluesRevealed(newRevealed);
    playClueChime();
  };

  // Determine current potential points based on revealed clues
  const getPotentialPoints = () => {
    if (cluesRevealed[2]) return 100;
    if (cluesRevealed[1]) return 200;
    return 300;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback !== null || !inputValue.trim()) return;

    const answer = inputValue.trim().toLowerCase();
    const correctName = element.name.toLowerCase();
    const correctSymbol = element.symbol.toLowerCase();

    const isCorrect = cluesRevealed[2]
      ? (answer === correctName)
      : (answer === correctName || answer === correctSymbol);

    if (isCorrect) {
      setFeedback('correct');
      playCorrectAscent();
      const points = getPotentialPoints();
      timeoutRef.current = setTimeout(() => {
        // Pass info back to parent: isCorrect, pointsEarned, and wasPrecision (no hints used)
        const wasPrecision = !cluesRevealed[1] && !cluesRevealed[2];
        onAnswerSubmitted(true, points, wasPrecision);
      }, 1500);
    } else {
      setFeedback('incorrect');
      playIncorrectBuzz();
      timeoutRef.current = setTimeout(() => {
        onAnswerSubmitted(false, 0);
      }, 1500);
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-6 relative border-2 border-yellow-500/10 glow-gold select-none h-full flex flex-col justify-between overflow-hidden">
      {/* Inline styles for circuit energy flow border */}
      <style>{`
        @keyframes circuit-flow {
          0% { stroke-dashoffset: 400; }
          100% { stroke-dashoffset: 0; }
        }
        .animate-circuit-pulse-orange {
          animation: circuit-flow 3.5s linear infinite;
          stroke: #f97316;
          filter: drop-shadow(0 0 5px rgba(249, 115, 22, 0.7));
          opacity: 0.9;
        }
        .animate-circuit-success {
          animation: circuit-flow 1.2s linear infinite;
          stroke: #22c55e;
          filter: drop-shadow(0 0 10px rgba(34, 197, 94, 0.95));
          stroke-width: 3px;
          opacity: 1;
        }
      `}</style>

      {/* SVG Circuit Borders */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl z-0">
        <rect
          x="1.5"
          y="1.5"
          width="calc(100% - 3px)"
          height="calc(100% - 3px)"
          rx="14"
          fill="none"
          stroke={
            feedback === 'correct'
              ? '#22c55e'
              : (cluesRevealed[1] || cluesRevealed[2])
              ? '#f97316'
              : '#eab308'
          }
          strokeWidth="2"
          className={`transition-all duration-500 ${
            feedback === 'correct'
              ? 'animate-circuit-success'
              : (cluesRevealed[1] || cluesRevealed[2])
              ? 'animate-circuit-pulse-orange'
              : 'opacity-20'
          }`}
          style={{
            strokeDasharray: '50 250',
            strokeDashoffset: '0'
          }}
        />
      </svg>

      {/* Header Panel */}
      <div className="border-b border-yellow-500/20 pb-3 flex justify-between items-center text-yellow-400 font-mono-sci text-xs z-10">
        <span className="uppercase tracking-widest text-[9px]">
          Round {round}: {passThreshold}% Needed to Advance
        </span>
        <span className="font-bold px-2 py-0.5 border border-yellow-500/30 rounded bg-yellow-950/20">
          ELEMENT {index + 1} / 20
        </span>
      </div>

      {/* 15-Second Progress Timer bar */}
      <div className="w-full mt-3 z-10">
        <div className="flex justify-between items-center text-[9px] font-mono-sci text-slate-400 mb-1">
          <span>TIME REMAINING</span>
          <span className={`font-bold ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-teal-400'}`}>
            {timeLeft}s
          </span>
        </div>
        <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-teal-500/20 p-0.5 shadow-inner">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${
              timeLeft <= 5 
                ? 'bg-gradient-to-r from-red-600 to-red-500 glow-red' 
                : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 glow-teal'
            }`}
            style={{ width: `${(timeLeft / 15) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Details */}
      <div className="my-4 min-h-[90px] flex flex-col justify-center z-10">
        <h3 className="text-[10px] font-mono-sci text-teal-400/80 mb-1 uppercase tracking-wider">
          Identify the Element (Hard - 300 Pts):
        </h3>
        <p className="text-xs md:text-sm font-bold text-slate-100 font-deco tracking-wide leading-relaxed">
          {element?.clues && element.clues[clueIndices[0]]}
        </p>
      </div>

      {/* Two Clues Cards */}
      <div className="flex-grow flex flex-col space-y-3 justify-center mb-4 z-10">

        {/* Clue 2 (Medium, 200 pts) */}
        {cluesRevealed[1] ? (
          <div className="border border-teal-500/30 rounded-xl p-3 bg-slate-900/80 glow-teal relative animate-fade-in">
            <div className="flex justify-between items-center text-[9px] font-mono-sci text-teal-400 mb-1">
              <span>CLUE 2 (MEDIUM)</span>
              <span className="font-bold text-teal-300">+200 PTS</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-mono-sci">
              {element?.clues && element.clues[clueIndices[1]]}
            </p>
          </div>
        ) : (
          <button
            disabled={feedback !== null}
            onClick={() => revealClue(1)}
            className="border border-dashed border-teal-500/20 hover:border-teal-500/40 rounded-xl p-3 bg-teal-950/5 text-center text-[10px] text-teal-500/60 font-mono-sci transition-all duration-300 cursor-pointer hover:bg-teal-950/15"
          >
            [ + ] Click to reveal Clue 2 (Points decay to 200 Max)
          </button>
        )}

        {/* Clue 3 (Easy, 100 pts) */}
        {cluesRevealed[2] ? (
          <div className="border border-cyan-500/30 rounded-xl p-3 bg-slate-900/80 glow-cyan relative">
            <div className="flex justify-between items-center text-[9px] font-mono-sci text-cyan-400 mb-1">
              <span>CLUE 3 (EASY)</span>
              <span className="font-bold text-cyan-300">+100 PTS</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-mono-sci font-bold text-yellow-400">
              What element has the symbol '{element?.symbol}'?
            </p>
          </div>
        ) : (
          <button
            disabled={!cluesRevealed[1] || feedback !== null}
            onClick={() => revealClue(2)}
            className={`border border-dashed rounded-xl p-3 text-center text-[10px] font-mono-sci transition-all duration-300 ${
              cluesRevealed[1] && feedback === null
                ? 'border-cyan-500/20 hover:border-cyan-500/40 text-cyan-500/60 bg-cyan-950/5 cursor-pointer hover:bg-cyan-950/15'
                : 'border-slate-800 text-slate-700 bg-transparent cursor-not-allowed'
            }`}
          >
            [ + ] Click to reveal Clue 3 (Points decay to 100 Max)
          </button>
        )}

      </div>

      {/* Input parsing & submit form */}
      <form onSubmit={handleSubmit} className="mt-auto z-10">
        <div className="flex items-center space-x-3">
          
          <div className="relative flex-grow">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              disabled={feedback !== null}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={cluesRevealed[2] ? "Enter the full element name (no symbols)" : "Name (e.g. Hydrogen) or Symbol (H)"}
              className={`w-full bg-slate-950 text-slate-100 font-mono-sci text-xs px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none ${
                feedback === 'correct'
                  ? 'border-emerald-500 text-emerald-400 glow-green'
                  : feedback === 'incorrect'
                  ? 'border-red-500 text-red-400 animate-bounce'
                  : feedback === 'timeout'
                  ? 'border-orange-500 text-orange-400 glow-orange animate-pulse'
                  : 'border-teal-500/30 focus:border-yellow-500 focus:shadow-[0_0_10px_rgba(234,179,8,0.2)]'
              }`}
            />
            
            {/* Answer feedback status overlay */}
            {feedback === 'correct' && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-emerald-400 font-mono-sci uppercase animate-pulse">
                CORRECT!
              </span>
            )}
            {feedback === 'incorrect' && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-bold text-red-400 font-mono-sci uppercase">
                INCORRECT: {element.name}
              </span>
            )}
            {feedback === 'timeout' && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-bold text-orange-400 font-mono-sci uppercase">
                TIME'S UP: {element.name}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={feedback !== null || !inputValue.trim()}
            className={`font-mono-sci text-xs font-bold py-3 px-5 rounded-xl transition-all duration-300 active:scale-95 shadow-md ${
              feedback !== null || !inputValue.trim()
                ? 'bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-slate-950 cursor-pointer shadow-[0_0_10px_rgba(234,179,8,0.2)]'
            }`}
          >
            SUBMIT
          </button>

        </div>
      </form>
    </div>
  );
}
