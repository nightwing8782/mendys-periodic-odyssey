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
  const [feedback, setFeedback] = useState(null); // 'correct' | 'incorrect'
  const inputRef = useRef(null);

  // Auto-focus input when a new element or round appears
  useEffect(() => {
    setInputValue('');
    setCluesRevealed([true, false, false]);
    setFeedback(null);
    
    // Slight timeout to ensure DOM update completed
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [element, round]);

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
      setTimeout(() => {
        onAnswerSubmitted(true, points);
      }, 1500);
    } else {
      setFeedback('incorrect');
      playIncorrectBuzz();
      setTimeout(() => {
        onAnswerSubmitted(false, 0);
      }, 1500);
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-6 relative border-2 border-yellow-500/30 glow-gold select-none h-full flex flex-col justify-between">
      {/* Decorative corners */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-yellow-400 opacity-60"></div>
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-yellow-400 opacity-60"></div>
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-yellow-400 opacity-60"></div>
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-yellow-400 opacity-60"></div>

      {/* Header Panel */}
      <div className="border-b border-yellow-500/20 pb-3 flex justify-between items-center text-yellow-400 font-mono-sci text-xs">
        <span className="uppercase tracking-widest text-[10px]">
          Round {round}: {passThreshold}% Needed to Advance
        </span>
        <span className="font-bold px-2 py-0.5 border border-yellow-500/30 rounded bg-yellow-950/20">
          ELEMENT {index + 1} / 20
        </span>
      </div>

      {/* Question Details */}
      <div className="my-4 min-h-[90px] flex flex-col justify-center">
        <h3 className="text-sm font-mono-sci text-teal-400/80 mb-1 uppercase tracking-wider">
          Identify the Element (Hard - 300 Pts):
        </h3>
        <p className="text-sm md:text-base font-bold text-slate-100 font-deco tracking-wide leading-relaxed">
          {element?.clues[0]}
        </p>
      </div>

      {/* Two Clues Cards */}
      <div className="flex-grow flex flex-col space-y-3 justify-center mb-6">

        {/* Clue 2 (Medium, 200 pts) */}
        {cluesRevealed[1] ? (
          <div className="border border-teal-500/30 rounded-xl p-3 bg-slate-900/80 glow-teal relative animate-fade-in">
            <div className="flex justify-between items-center text-[10px] font-mono-sci text-teal-400 mb-1.5">
              <span>CLUE 2 (MEDIUM)</span>
              <span className="font-bold text-teal-300">+200 PTS</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-mono-sci">
              {element?.clues[1]}
            </p>
          </div>
        ) : (
          <button
            disabled={feedback !== null}
            onClick={() => revealClue(1)}
            className="border border-dashed border-teal-500/20 hover:border-teal-500/40 rounded-xl p-4 bg-teal-950/5 text-center text-xs text-teal-500/60 font-mono-sci transition-all duration-300 cursor-pointer hover:bg-teal-950/15"
          >
            [ + ] Click to reveal Clue 2 (Points decay to 200 Max)
          </button>
        )}

        {/* Clue 3 (Easy, 100 pts) */}
        {cluesRevealed[2] ? (
          <div className="border border-cyan-500/30 rounded-xl p-3 bg-slate-900/80 glow-cyan relative">
            <div className="flex justify-between items-center text-[10px] font-mono-sci text-cyan-400 mb-1.5">
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
            className={`border border-dashed rounded-xl p-4 text-center text-xs font-mono-sci transition-all duration-300 ${
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
      <form onSubmit={handleSubmit} className="mt-auto">
        <div className="flex items-center space-x-3">
          
          <div className="relative flex-grow">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              disabled={feedback !== null}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={cluesRevealed[2] ? "Enter the full element name (no symbols)" : "Name (e.g. Hydrogen) or Symbol (H)"}
              className={`w-full bg-slate-950 text-slate-100 font-mono-sci text-sm px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none ${
                feedback === 'correct'
                  ? 'border-emerald-500 text-emerald-400 glow-green'
                  : feedback === 'incorrect'
                  ? 'border-red-500 text-red-400 animate-bounce'
                  : 'border-teal-500/30 focus:border-yellow-500 focus:shadow-[0_0_10px_rgba(234,179,8,0.2)]'
              }`}
            />
            
            {/* Answer feedback status */}
            {feedback === 'correct' && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-400 font-mono-sci uppercase animate-pulse">
                CORRECT!
              </span>
            )}
            {feedback === 'incorrect' && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-red-400 font-mono-sci uppercase">
                INCORRECT: {element.name}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={feedback !== null || !inputValue.trim()}
            className={`font-mono-sci font-bold py-3 px-6 rounded-xl transition-all duration-300 active:scale-95 shadow-md ${
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
