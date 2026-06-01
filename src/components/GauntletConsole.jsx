import React, { useState, useEffect, useRef } from 'react';
import { playCorrectAscent, playIncorrectBuzz, playClueChime } from '../utils/audio';

export default function GauntletConsole({
  question,
  index,
  totalQuestions,
  round,
  onAnswerSubmitted,
  nextQuestion,
  gridTapSymbol,
  resetGridTapSymbol
}) {
  const [feedback, setFeedback] = useState(null); // 'correct' | 'incorrect' | 'timeout'
  const [timeLeft, setTimeLeft] = useState(20);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Local choice tracking
  const timeoutRef = useRef(null);

  const dismissFeedback = () => {
    if (feedback === null) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    nextQuestion();
  };

  // Classic trivia states
  const [cluesRevealed, setCluesRevealed] = useState([true, false, false]);
  const [inputValue, setInputValue] = useState('');
  const [clueIndices, setClueIndices] = useState([0, 2]);
  const inputRef = useRef(null);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Reset console state for each new question
  useEffect(() => {
    setFeedback(null);
    setTimeLeft(20);
    setSelectedAnswer(null);
    if (resetGridTapSymbol) {
      resetGridTapSymbol();
    }

    // Reset classic trivia states
    setInputValue('');
    setCluesRevealed([true, false, false]);
    const hardIdx = Math.random() < 0.5 ? 0 : 1;
    const medIdx = Math.random() < 0.5 ? 2 : 3;
    setClueIndices([hardIdx, medIdx]);

    // Auto-focus input for Classic Trivia mode
    if (question.type === 'CLASSIC_TRIVIA') {
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [question, index, round, resetGridTapSymbol]);

  // Timer countdown handler
  useEffect(() => {
    if (feedback !== null) return;

    if (timeLeft <= 0) {
      setFeedback('timeout');
      playIncorrectBuzz();
      onAnswerSubmitted(false, question.symbol, 0);
      timeoutRef.current = setTimeout(() => {
        nextQuestion();
      }, 3000);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, feedback, question, onAnswerSubmitted, nextQuestion]);

  // Handle grid taps for GRID_TAP mode
  useEffect(() => {
    if (question.type === 'GRID_TAP' && gridTapSymbol && feedback === null) {
      const isCorrect = gridTapSymbol.toLowerCase() === question.answer.toLowerCase();
      setSelectedAnswer(gridTapSymbol);
      
      if (isCorrect) {
        setFeedback('correct');
        playCorrectAscent();
        onAnswerSubmitted(true, question.symbol, 500);
      } else {
        setFeedback('incorrect');
        playIncorrectBuzz();
        onAnswerSubmitted(false, question.symbol, 0);
      }

      timeoutRef.current = setTimeout(() => {
        nextQuestion();
      }, 3000);
    }
  }, [gridTapSymbol, question, feedback, onAnswerSubmitted, nextQuestion]);

  const handleMultipleChoiceSubmit = (choice) => {
    if (feedback !== null) return;
    setSelectedAnswer(choice);

    const isCorrect = choice.toLowerCase() === question.answer.toLowerCase();
    if (isCorrect) {
      setFeedback('correct');
      playCorrectAscent();
      // Award 200 points for MULTIPLE_CHOICE
      onAnswerSubmitted(true, question.symbol, 200);
    } else {
      setFeedback('incorrect');
      playIncorrectBuzz();
      onAnswerSubmitted(false, question.symbol, 0);
    }

    timeoutRef.current = setTimeout(() => {
      nextQuestion();
    }, 3000);
  };

  const handleWeightComparisonSubmit = (symbol) => {
    if (feedback !== null) return;
    setSelectedAnswer(symbol);

    const isCorrect = symbol.toLowerCase() === question.answer.toLowerCase();
    if (isCorrect) {
      setFeedback('correct');
      playCorrectAscent();
      // Award 300 points for WEIGHT_COMPARISON
      onAnswerSubmitted(true, question.symbol, 300);
    } else {
      setFeedback('incorrect');
      playIncorrectBuzz();
      onAnswerSubmitted(false, question.symbol, 0);
    }

    timeoutRef.current = setTimeout(() => {
      nextQuestion();
    }, 3000);
  };

  const handleNuclearSynthesisSubmit = (choice) => {
    if (feedback !== null) return;
    setSelectedAnswer(choice);

    const isCorrect = choice.toLowerCase() === question.answer.toLowerCase();
    if (isCorrect) {
      setFeedback('correct');
      playCorrectAscent();
      // Award 300 points for NUCLEAR_SYNTHESIS
      onAnswerSubmitted(true, question.symbol, 300);
    } else {
      setFeedback('incorrect');
      playIncorrectBuzz();
      onAnswerSubmitted(false, question.symbol, 0);
    }

    timeoutRef.current = setTimeout(() => {
      nextQuestion();
    }, 3000);
  };

  const getClassicPoints = () => {
    if (cluesRevealed[2]) return 100;
    if (cluesRevealed[1]) return 200;
    return 300;
  };

  const handleClassicSubmit = (e) => {
    if (e) e.preventDefault();
    if (feedback !== null || !inputValue.trim()) return;

    const answer = inputValue.trim().toLowerCase();
    const correctName = question.element.name.toLowerCase();
    const correctSymbol = question.element.symbol.toLowerCase();

    // If Clue 3 is revealed, must type full name. Else name or symbol works.
    const isCorrect = cluesRevealed[2]
      ? (answer === correctName)
      : (answer === correctName || answer === correctSymbol);

    if (isCorrect) {
      setFeedback('correct');
      playCorrectAscent();
      const points = getClassicPoints();
      onAnswerSubmitted(true, question.symbol, points);
    } else {
      setFeedback('incorrect');
      playIncorrectBuzz();
      onAnswerSubmitted(false, question.symbol, 0);
    }

    timeoutRef.current = setTimeout(() => {
      nextQuestion();
    }, 3000);
  };

  const revealClue = (clueIndex) => {
    if (cluesRevealed[clueIndex] || feedback !== null) return;
    const newRevealed = [...cluesRevealed];
    newRevealed[clueIndex] = true;
    setCluesRevealed(newRevealed);
    playClueChime();
  };

  // Helper to determine element containment state for card styling
  const getElementStateColor = (state) => {
    if (state === 'gas') return 'border-pink-500 text-pink-400 bg-pink-950/20 shadow-[0_0_8px_rgba(244,63,94,0.3)]';
    if (state === 'liquid') return 'border-cyan-500 text-cyan-400 bg-cyan-950/20 shadow-[0_0_8px_rgba(6,182,212,0.3)]';
    return 'border-amber-500 text-amber-400 bg-amber-950/20 shadow-[0_0_8px_rgba(245,158,11,0.3)]'; // solids / metals
  };

  return (
    <div className="hud-panel p-6 select-none h-full flex flex-col justify-between overflow-hidden relative">
      <div className="hud-bracket hud-bracket-tl" />
      <div className="hud-bracket hud-bracket-tr" />
      <div className="hud-bracket hud-bracket-bl" />
      <div className="hud-bracket hud-bracket-br" />
      
      {/* Styles for Art Deco details, circuit lines and custom keyframe animations */}
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
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          14% { transform: scale(1.08); }
          28% { transform: scale(1); }
          42% { transform: scale(1.12); }
          70% { transform: scale(1); }
        }
        .animate-heartbeat {
          animation: heartbeat 1s infinite;
        }
        @keyframes radar-ping {
          0% { transform: scale(0.9); opacity: 0.8; }
          100% { transform: scale(1.2); opacity: 0; }
        }
        .animate-radar-ping {
          animation: radar-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>

      {/* Dynamic Circuit SVG Borders */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-none z-0">
        <rect
          x="1.5"
          y="1.5"
          width="calc(100% - 3px)"
          height="calc(100% - 3px)"
          rx="0"
          fill="none"
          stroke={
            feedback === 'correct'
              ? '#22c55e'
              : feedback === 'incorrect' || feedback === 'timeout'
              ? '#ef4444'
              : '#eab308'
          }
          strokeWidth="2"
          className={`transition-all duration-500 ${
            feedback === 'correct'
              ? 'animate-circuit-success'
              : feedback === 'incorrect' || feedback === 'timeout'
              ? ''
              : 'opacity-20'
          }`}
          style={{
            strokeDasharray: '50 250',
            strokeDashoffset: '0'
          }}
        />
      </svg>

      {/* Header Info HUD */}
      <div className="border-b border-cyan-500/20 pb-3 flex justify-between items-center text-cyan-400 font-mono text-xs z-10">
        <span className="uppercase tracking-widest text-[9px] text-cyan-500/60">
          MODE: {question.type.replace('_', ' ')}
        </span>
        <span className="font-bold px-2 py-0.5 border border-cyan-500/30 bg-cyan-950/20">
          QUESTION {index + 1} / {totalQuestions}
        </span>
      </div>

      {/* 20-Second Progress Timer Bar */}
      <div className="w-full mt-3 mb-2 z-10 font-mono">
        <div className="flex justify-between items-center text-[9px] text-cyan-500/70 mb-1">
          <span>SYNTHESIS LOCK COUNTDOWN</span>
          <span className={`font-bold text-xs ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-cyan-400'}`}>
            {timeLeft}s / 20s
          </span>
        </div>
        <div className="w-full h-3 bg-black/40 border border-cyan-500/20 p-[2px]">
          <div
            className={`h-full hud-telemetry-segments transition-all duration-1000 ${
              timeLeft <= 5 
                ? 'text-red-500' 
                : 'text-cyan-400'
            }`}
            style={{ width: `${(timeLeft / 20) * 100}%` }}
          />
        </div>
      </div>

      {/* Dynamic Content Panel by Question Type */}
      <div className="flex-grow flex flex-col justify-center my-3 min-h-[220px] z-10 relative">
        
        {/* MULTIPLE CHOICE MODE */}
        {question.type === 'MULTIPLE_CHOICE' && (
          <div className="space-y-4">
            <div className="bg-slate-950/40 border border-teal-500/20 rounded-none p-4 text-center">
              <span className="text-[9px] text-teal-500 uppercase tracking-widest font-mono-sci block mb-1">Mendy's Transmission Clue</span>
              <p className="text-xs md:text-sm font-bold text-slate-200 font-deco tracking-wide leading-relaxed">
                "{question.clue}"
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {question.options.map((option) => {
                const isSelected = selectedAnswer === option;
                const isCorrectAnswer = option.toLowerCase() === question.answer.toLowerCase();
                
                let buttonStyle = 'hud-btn-arcade w-full';
                if (feedback !== null) {
                  if (isCorrectAnswer) {
                    buttonStyle = 'bg-emerald-500 border-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.6)] font-bold w-full';
                  } else if (isSelected) {
                    buttonStyle = 'bg-red-600 border-red-600 text-black font-bold w-full';
                  } else {
                    buttonStyle = 'opacity-30 border-cyan-950 text-cyan-900 cursor-not-allowed w-full';
                  }
                }

                return (
                  <button
                    key={option}
                    disabled={feedback !== null}
                    onClick={() => handleMultipleChoiceSubmit(option)}
                    className={`rounded-none text-xs font-bold transition-all duration-75 font-mono cursor-pointer ${buttonStyle}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* WEIGHT COMPARISON MODE */}
        {question.type === 'WEIGHT_COMPARISON' && (
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-[9px] text-yellow-500 uppercase tracking-widest font-mono-sci block">COMPASS ANALYSIS</span>
              <h4 className="text-xs font-bold text-slate-300 font-deco mt-1">Tap the heavier element based on atomic mass!</h4>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[question.elementA, question.elementB].map((el) => {
                const isSelected = selectedAnswer === el.symbol;
                const isCorrectAnswer = el.symbol.toLowerCase() === question.answer.toLowerCase();
                
                let cardStyle = getElementStateColor(el.state);
                if (feedback !== null) {
                  if (isCorrectAnswer) {
                    cardStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]';
                  } else if (isSelected) {
                    cardStyle = 'border-red-500 bg-red-950/40 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.4)] opacity-80';
                  } else {
                    cardStyle = 'border-slate-800 bg-slate-950/30 text-slate-600 opacity-40';
                  }
                } else {
                  cardStyle += ' cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 hover:border-yellow-400 hover:shadow-[0_0_12px_rgba(234,179,8,0.35)]';
                }

                return (
                  <div
                    key={el.symbol}
                    onClick={() => handleWeightComparisonSubmit(el.symbol)}
                    className={`border border-cyan-500/20 rounded-none p-4 flex flex-col items-center justify-between text-center min-h-[140px] relative overflow-hidden ${cardStyle}`}
                  >
                    <div className="hud-bracket hud-bracket-tl" />
                    <div className="hud-bracket hud-bracket-tr" />
                    <div className="hud-bracket hud-bracket-bl" />
                    <div className="hud-bracket hud-bracket-br" />
                    <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-current opacity-40" />
                    <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-current opacity-40" />
                    <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-current opacity-40" />

                    <span className="text-3xl font-deco font-black tracking-wide my-2">{el.symbol}</span>
                    <span className="text-[10px] font-bold tracking-widest uppercase mb-1">{el.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* NUCLEAR SYNTHESIS MODE */}
        {question.type === 'NUCLEAR_SYNTHESIS' && (
          <div className="space-y-4">
            {/* Visual Formula Addition Box */}
            <div className="flex items-center justify-center space-x-3 bg-slate-950/50 border border-yellow-500/20 rounded-none p-4 relative overflow-hidden shadow-inner">
              
              {/* Reactant 1 */}
              <div className="bg-slate-900/90 border border-teal-500/40 rounded-none px-3 py-2 flex flex-col items-center min-w-[70px]">
                <span className="text-[8px] text-teal-400 font-mono-sci">ATOMIC #{question.elementA.number}</span>
                <span className="text-xl font-bold font-deco text-slate-100 my-0.5">{question.elementA.symbol}</span>
                <span className="text-[8px] text-slate-400 uppercase font-mono-sci">{question.elementA.name}</span>
              </div>

              {/* Plus Sign */}
              <span className="text-yellow-500 text-lg font-black font-mono-sci">+</span>

              {/* Reactant 2 */}
              <div className="bg-slate-900/90 border border-teal-500/40 rounded-none px-3 py-2 flex flex-col items-center min-w-[70px]">
                <span className="text-[8px] text-teal-400 font-mono-sci">ATOMIC #{question.elementB.number}</span>
                <span className="text-xl font-bold font-deco text-slate-100 my-0.5">{question.elementB.symbol}</span>
                <span className="text-[8px] text-slate-400 uppercase font-mono-sci">{question.elementB.name}</span>
              </div>

              {/* Equals Sign */}
              <span className="text-yellow-500 text-lg font-black font-mono-sci">=</span>

              {/* Product Placeholder */}
              <div className="bg-yellow-950/20 border border-dashed border-yellow-500/50 rounded-none px-3 py-2 flex flex-col items-center min-w-[70px] animate-pulse">
                <span className="text-[8px] text-yellow-400 font-mono-sci font-bold">TOTAL Z = {question.elementC.number}</span>
                <span className="text-xl font-black font-deco text-yellow-400 my-0.5">?</span>
                <span className="text-[8px] text-yellow-500/70 uppercase font-mono-sci">PRODUCT</span>
              </div>
            </div>

            {/* Multiple Choice Answers */}
            <div className="grid grid-cols-2 gap-3">
              {question.options.map((option) => {
                const isSelected = selectedAnswer === option;
                const isCorrectAnswer = option.toLowerCase() === question.answer.toLowerCase();
                
                let buttonStyle = 'hud-btn-arcade w-full';
                if (feedback !== null) {
                  if (isCorrectAnswer) {
                    buttonStyle = 'bg-emerald-500 border-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.6)] font-bold w-full';
                  } else if (isSelected) {
                    buttonStyle = 'bg-red-600 border-red-600 text-black font-bold w-full';
                  } else {
                    buttonStyle = 'opacity-30 border-cyan-950 text-cyan-900 cursor-not-allowed w-full';
                  }
                }

                return (
                  <button
                    key={option}
                    disabled={feedback !== null}
                    onClick={() => handleNuclearSynthesisSubmit(option)}
                    className={`rounded-none text-xs font-bold transition-all duration-75 font-mono cursor-pointer ${buttonStyle}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* GRID TAP MODE */}
        {question.type === 'GRID_TAP' && (
          <div className="space-y-4 flex flex-col items-center justify-center text-center p-4">
            
            {/* Visual pulse radar */}
            <div className="relative w-16 h-16 flex items-center justify-center mb-2">
              <div className="absolute inset-0 rounded-full border border-teal-500/40 animate-radar-ping" />
              <div className="absolute inset-2 rounded-full border-2 border-teal-400/60 animate-pulse bg-teal-950/30" />
              <span className="text-xl z-10">🎯</span>
            </div>

            <div className="bg-slate-950/60 border border-teal-500/30 rounded-none p-5 w-full relative">
              {/* Corner brackets */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-teal-400 opacity-60" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-teal-400 opacity-60" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-teal-400 opacity-60" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-teal-400 opacity-60" />

              <span className="text-[9px] text-teal-400 font-mono-sci uppercase tracking-widest font-bold block mb-2">
                HOLOGRAPHIC NAVIGATION PROTOCOL
              </span>
              
              <p className="text-xs md:text-sm font-bold text-slate-100 font-deco tracking-wide leading-relaxed">
                {question.clue}
              </p>
              
              <p className="text-[10px] text-slate-400 font-mono-sci mt-4 italic">
                * Click/Tap the correct square directly on the Periodic Table to submit your response!
              </p>
            </div>
          </div>
        )}

        {/* CLASSIC TRIVIA MODE */}
        {question.type === 'CLASSIC_TRIVIA' && (
          <div className="space-y-4">
            
            {/* Clue 1 (Hard, 300 Pts) */}
            <div className="bg-slate-950/40 border border-teal-500/20 rounded-none p-3.5 text-center relative overflow-hidden">
              <span className="text-[9px] text-teal-400 uppercase tracking-widest font-mono-sci block mb-1 font-bold">
                Clue 1 (Hard - 300 Pts)
              </span>
              <p className="text-xs md:text-sm font-bold text-slate-200 font-deco tracking-wide leading-relaxed">
                "{question.element.clues && question.element.clues[clueIndices[0]]}"
              </p>
            </div>

            {/* Clue 2 & 3 Reveal Panel */}
            <div className="grid grid-cols-2 gap-3">
              {/* Clue 2 */}
              {cluesRevealed[1] ? (
                <div className="border border-teal-500/30 rounded-none p-2.5 bg-slate-900/60 text-left animate-fade-in min-h-[70px] flex flex-col justify-center">
                  <div className="flex justify-between items-center text-[8px] font-mono-sci text-teal-400 mb-0.5 font-bold">
                    <span>CLUE 2 (MEDIUM)</span>
                    <span className="text-teal-300">200 PTS MAX</span>
                  </div>
                  <p className="text-[9.5px] text-slate-300 font-mono-sci leading-tight">
                    {question.element.clues && question.element.clues[clueIndices[1]]}
                  </p>
                </div>
              ) : (
                <button
                  type="button"
                  disabled={feedback !== null}
                  onClick={() => revealClue(1)}
                  className="border border-teal-500/30 hover:border-teal-400 rounded-none p-2.5 bg-black/40 text-center text-[9px] text-teal-400 font-mono-sci transition-colors duration-75 cursor-pointer hover:bg-teal-500/10 hover:text-teal-300 min-h-[70px] flex flex-col items-center justify-center"
                >
                  <span>🔍 Unlock Clue 2</span>
                  <span className="text-[8px] opacity-75 mt-0.5">(Decays to 200 pts)</span>
                </button>
              )}

              {/* Clue 3 */}
              {cluesRevealed[2] ? (
                <div className="border border-cyan-500/30 rounded-none p-2.5 bg-slate-900/60 text-left animate-fade-in min-h-[70px] flex flex-col justify-center">
                  <div className="flex justify-between items-center text-[8px] font-mono-sci text-cyan-400 mb-0.5 font-bold">
                    <span>CLUE 3 (EASY)</span>
                    <span className="text-cyan-300">100 PTS MAX</span>
                  </div>
                  <p className="text-[9.5px] font-mono-sci leading-tight text-yellow-400 font-bold">
                    What element has the symbol '{question.element.symbol}'?
                  </p>
                </div>
              ) : (
                <button
                  type="button"
                  disabled={!cluesRevealed[1] || feedback !== null}
                  onClick={() => revealClue(2)}
                  className={`border rounded-none p-2.5 text-center text-[9px] font-mono-sci transition-colors duration-75 min-h-[70px] flex flex-col items-center justify-center ${
                    cluesRevealed[1] && feedback === null
                      ? 'border-cyan-500/30 hover:border-cyan-400 text-cyan-400 bg-black/40 cursor-pointer hover:bg-cyan-500/10 hover:text-cyan-300'
                      : 'border-slate-800 text-slate-700 bg-transparent cursor-not-allowed'
                  }`}
                >
                  <span>🔒 Unlock Clue 3</span>
                  <span className="text-[8px] opacity-75 mt-0.5">(Decays to 100 pts)</span>
                </button>
              )}
            </div>

            {/* Input Submission Box */}
            <form onSubmit={handleClassicSubmit} className="mt-2">
              <div className="flex items-center space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  disabled={feedback !== null}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={cluesRevealed[2] ? "Enter element name" : "Name (e.g. Sodium) or Symbol (Na)"}
                  className={`flex-grow bg-slate-950 text-slate-100 font-mono-sci text-xs px-3.5 py-3 rounded-none border transition-all duration-300 focus:outline-none ${
                    feedback === 'correct'
                      ? 'border-emerald-500 text-emerald-400 glow-green'
                      : feedback === 'incorrect'
                      ? 'border-red-500 text-red-400'
                      : 'border-teal-500/30 focus:border-yellow-500'
                  }`}
                />
                
                <button
                  type="submit"
                  disabled={feedback !== null || !inputValue.trim()}
                  className="hud-btn-arcade text-xs px-4 py-3 cursor-pointer"
                >
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Answer Feedback Alert Overlay inside content panel */}
        {feedback && (
          <div 
            onClick={dismissFeedback}
            className="absolute inset-0 bg-slate-950/90 rounded-none flex flex-col items-center justify-center p-4 transition-all duration-300 animate-fade-in z-20 cursor-pointer select-none hover:bg-slate-950/95"
            title="Tap to dismiss"
          >
            {feedback === 'correct' && (
              <div className="text-center space-y-2 animate-bounce">
                <span className="text-4xl text-emerald-400">✨</span>
                <h3 className="text-lg font-deco font-black text-emerald-400 tracking-wider">SUCCESSFULLY SECURED!</h3>
                <p className="text-xs text-slate-300 font-mono-sci">
                  Secured Telemetry for: <strong className="text-yellow-400 uppercase font-bold">{question.symbol}</strong>
                </p>
                <span className="text-[10px] text-teal-400 font-mono-sci block pt-2 animate-pulse">
                  (Tap anywhere to dismiss)
                </span>
              </div>
            )}
            {feedback === 'incorrect' && (
              <div className="text-center space-y-2">
                <span className="text-4xl text-red-500 animate-pulse">⚠️</span>
                <h3 className="text-lg font-deco font-black text-red-500 tracking-wider">SYNTHESIS FAILURE</h3>
                <p className="text-xs text-slate-300 font-mono-sci">
                  Correct Product: <strong className="text-emerald-400 uppercase font-bold">{question.symbol} ({question.element.name})</strong>
                </p>
                <span className="text-[10px] text-red-400/80 font-mono-sci block pt-2 animate-pulse">
                  (Tap anywhere to dismiss)
                </span>
              </div>
            )}
            {feedback === 'timeout' && (
              <div className="text-center space-y-2">
                <span className="text-4xl text-orange-500 animate-pulse">⏳</span>
                <h3 className="text-lg font-deco font-black text-orange-500 tracking-wider">HARVEST TIMEOUT</h3>
                <p className="text-xs text-slate-300 font-mono-sci">
                  Lock Lost! Solution was: <strong className="text-emerald-400 uppercase font-bold">{question.symbol}</strong>
                </p>
                <span className="text-[10px] text-orange-400/80 font-mono-sci block pt-2 animate-pulse">
                  (Tap anywhere to dismiss)
                </span>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Footer Info / Potential score reward */}
      <div className="border-t border-yellow-500/20 pt-3 flex justify-between items-center text-[10px] font-mono-sci text-slate-500 z-10">
        <span>EST. VALUE: {
          question.type === 'GRID_TAP' 
            ? '500 PTS' 
            : question.type === 'MULTIPLE_CHOICE' 
            ? '200 PTS' 
            : question.type === 'CLASSIC_TRIVIA'
            ? '300 PTS MAX'
            : '300 PTS'
        }</span>
        <span className="text-yellow-500/60 uppercase">WARP CORE GAUNTLET PROTOCOL</span>
      </div>
    </div>
  );
}
