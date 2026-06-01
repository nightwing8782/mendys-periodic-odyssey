import React, { useState, useEffect, useCallback } from 'react';
import CockpitLayout from './components/CockpitLayout';
import Mendy from './components/Mendy';
import GauntletConsole from './components/GauntletConsole';
import ElementCapsule from './components/ElementCapsule';
import MasteryBoard from './components/MasteryBoard';
import CombinationConsole from './components/CombinationConsole';
import { elements } from './data/elements';
import { playWarpDrive, playClueChime, unlockAudio } from './utils/audio';
import useTriviaEngine from './hooks/useTriviaEngine';

export default function App() {
  const {
    gameState,
    collectedElements,
    collectedSet,
    score,
    round,
    currentRoundType,
    questions,
    currentIndex,
    roundCollected,
    choices,
    startGame,
    selectMode,
    submitAnswer,
    nextQuestion,
    resetGame,
    advanceRound
  } = useTriviaEngine();

  // Local feedback and animation states
  const [mendyState, setMendyState] = useState('idle');
  const [shakeScreen, setShakeScreen] = useState(false);
  const [greenFlash, setGreenFlash] = useState(false);
  const [gridTapSymbol, setGridTapSymbol] = useState(null);
  const [inspectedElement, setInspectedElement] = useState(null);

  // Clear manual inspection cache on question or game state transition
  useEffect(() => {
    setInspectedElement(null);
  }, [currentIndex, gameState]);

  // Manage Mendy avatar state based on game stage
  useEffect(() => {
    if (gameState === 'PLAYING') {
      setMendyState('thinking');
    } else {
      setMendyState('idle');
    }
  }, [currentIndex, currentRoundType, gameState]);

  // Answer handler wired to GauntletConsole - memoized to prevent resetting child console feedback
  const handleAnswerSubmitted = useCallback((isCorrect, symbol, points) => {
    // Ensure audio is unlocked on first action
    unlockAudio();

    if (isCorrect) {
      setMendyState('correct');
      setGreenFlash(true);
      setTimeout(() => setGreenFlash(false), 600);

      // Trigger screen shake for visual punchiness
      setShakeScreen(true);
      setTimeout(() => setShakeScreen(false), 500);
    } else {
      setMendyState('incorrect');
    }

    // Report answer to the state hook
    submitAnswer(isCorrect, symbol, points);
  }, [submitAnswer]);

  // Helper to fetch details for choice cards
  const getModeDetails = (mode) => {
    switch (mode) {
      case 'MULTIPLE_CHOICE':
        return {
          icon: '📋',
          title: 'Multiple Choice',
          desc: 'Identify elements based on historic or scientific clues from Mendy.',
          length: '10 Questions'
        };
      case 'WEIGHT_COMPARISON':
        return {
          icon: '⚖️',
          title: 'Weight Comparison',
          desc: 'Examine two side-by-side elements and tap the heavier one by atomic mass.',
          length: '5 Questions'
        };
      case 'NUCLEAR_SYNTHESIS':
        return {
          icon: '⚛️',
          title: 'Nuclear Synthesis',
          desc: 'Synthesize elements by combining their atomic numbers in equations.',
          length: '5 Questions'
        };
      case 'GRID_TAP':
        return {
          icon: '🎯',
          title: 'Grid Tap',
          desc: 'High-stakes test! Click the correct element square directly on the periodic table.',
          length: '1 Question'
        };
      case 'CLASSIC_TRIVIA':
        return {
          icon: '🔮',
          title: 'Classic Trivia',
          desc: 'Unveil up to 3 clues and type the full element name or symbol to secure it.',
          length: '5 Questions'
        };
      default:
        return { icon: '❓', title: 'Unknown', desc: '', length: '' };
    }
  };

  // Click on Mastery Board element tile - memoized and upgraded to support manual element inspection
  const handleTileClick = useCallback((symbol) => {
    if (gameState === 'PLAYING' && currentRoundType === 'GRID_TAP') {
      setGridTapSymbol(symbol);
    } else {
      const el = elements.find(e => e.symbol === symbol);
      if (el) {
        setInspectedElement(el);
      }
    }
  }, [gameState, currentRoundType]);

  const resetGridTapSymbol = useCallback(() => {
    setGridTapSymbol(null);
  }, []);

  // Determine current active element for Containment Chamber particle system
  const currentQuestion = questions[currentIndex];
  const activeContainmentElement = gameState === 'PLAYING' ? currentQuestion?.element : null;

  // Retrieve elements successfully collected during this round
  const roundCollectedElements = roundCollected
    .map(sym => elements.find(el => el.symbol === sym))
    .filter(Boolean);

  return (
    <CockpitLayout score={score}>
      {/* Inline styles for screen shake and outline flashes */}
      <style>{`
        @keyframes screen-shake-anim {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          10% { transform: translate(-2.5px, -2px) rotate(-0.4deg); }
          20% { transform: translate(2.5px, 2px) rotate(0.4deg); }
          30% { transform: translate(-2px, 1.5px) rotate(-0.2deg); }
          40% { transform: translate(2px, -1.5px) rotate(0.2deg); }
          50% { transform: translate(-1.5px, 2px) rotate(-0.4deg); }
          60% { transform: translate(2.5px, -1px) rotate(0.4deg); }
          70% { transform: translate(-2px, -1.5px) rotate(-0.2deg); }
          80% { transform: translate(2px, 2px) rotate(0.2deg); }
          90% { transform: translate(-1px, 1px) rotate(-0.2deg); }
        }
        .animate-shake {
          animation: screen-shake-anim 0.5s ease-in-out;
        }
        @keyframes flash-pulse-anim {
          0%, 100% { opacity: 0.4; border-color: #10b981; box-shadow: inset 0 0 10px rgba(16, 185, 129, 0.4); }
          50% { opacity: 0.9; border-color: #34d399; box-shadow: inset 0 0 30px rgba(52, 211, 153, 0.85); }
        }
        .animate-flash-pulse {
          animation: flash-pulse-anim 0.3s ease-in-out infinite;
        }
      `}</style>

      {/* Screen Success Flash Overlay */}
      {greenFlash && (
        <div className="fixed inset-0 border-[6px] rounded-lg pointer-events-none z-50 animate-flash-pulse" />
      )}

      {/* LEFT COLUMN: Captain Mendy & Navigation */}
      <div className={`lg:col-span-3 flex flex-col items-center justify-between space-y-6 transition-transform duration-500 ${shakeScreen ? 'animate-shake' : ''}`}>
        
        {/* Avatar panel */}
        <div className="glass-panel rounded-2xl p-4 border border-teal-500/20 w-full flex items-center justify-center bg-teal-950/10 min-h-[300px]">
          <Mendy state={mendyState} />
        </div>

        {/* Cockpit Status Board */}
        <div className="glass-panel rounded-2xl p-4 border border-yellow-500/20 w-full flex flex-col justify-center items-center space-y-3 bg-slate-900/60 font-mono-sci">
          <div className="w-full flex justify-between text-[9px] text-teal-400">
            <span>WARP CORE CHARGE</span>
            <span>{collectedElements.length} / 118 ELEMENTS</span>
          </div>
          
          <div className="w-full h-3 bg-slate-950 border border-teal-500/30 rounded-full overflow-hidden p-0.5 shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full glow-teal transition-all duration-1000"
              style={{ width: `${(collectedElements.length / 118) * 100}%` }}
            />
          </div>

          <div className="text-[10px] text-yellow-500 text-center uppercase tracking-widest mt-1">
            {gameState === 'victory' ? 'WARP ENGAGED' : `GAUNTLET EXPEDITION: ROUND ${round}`}
          </div>
        </div>

      </div>

      {/* CENTER COLUMN: Central Console & Element Containment Chamber */}
      <div className={`lg:col-span-5 flex flex-col justify-between space-y-6 transition-transform duration-500 ${shakeScreen ? 'animate-shake' : ''}`}>
        
        {/* Main interactive state switcher */}
        <div className="flex-grow min-h-[360px]">
          
          {/* 1. INTRO / START STATE */}
          {gameState === 'intro' && (
            <div className="glass-panel rounded-2xl p-8 border-2 border-yellow-500/30 glow-gold h-full flex flex-col justify-between items-center text-center select-none">
              <div className="art-deco-border px-6 py-2 border border-yellow-500/30 bg-yellow-950/20 rounded">
                <h1 className="font-deco text-2xl font-black text-yellow-400 tracking-wider">
                  MISSION HARVESTER
                </h1>
              </div>
              
              <div className="my-6 space-y-4">
                <p className="text-sm leading-relaxed text-teal-100 font-mono-sci">
                  Captain Mendy's starship warp drive has failed! 
                  Help her traverse the periodic fields in this endless element collection gauntlet. 
                  Identify, compare, synthesize, and tap elements until all 118 are secured!
                </p>
                <div className="bg-slate-950/80 border border-teal-500/20 rounded-xl p-4 text-[11px] font-mono-sci text-left text-slate-300 space-y-2.5 max-h-[140px] overflow-y-auto">
                  <div className="flex items-start space-x-2">
                    <span className="text-teal-400">⚡</span>
                    <span><strong>Endless Loop:</strong> Play mini-rounds until your Mastery Board holds all 118 elements.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-teal-400">⚡</span>
                    <span><strong>Back-to-Back Ban:</strong> You cannot play the same mode twice consecutively.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-teal-400">⚡</span>
                    <span><strong>Deep Scans:</strong> Read and study element cards between rounds to prepare your grid taps.</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  unlockAudio();
                  playClueChime();
                  startGame();
                }}
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-slate-950 font-bold py-3.5 px-6 rounded-xl transition-all duration-300 transform active:scale-95 shadow-[0_0_15px_rgba(234,179,8,0.3)] font-mono-sci tracking-widest text-sm cursor-pointer"
              >
                INITIALIZE HARVESTER
              </button>
            </div>
          )}

          {/* 2. MODE SELECTION STATE */}
          {gameState === 'MODE_SELECTION' && (
            <div className="glass-panel rounded-2xl p-6 border-2 border-yellow-500/30 glow-gold h-full flex flex-col justify-between items-center text-center select-none animate-fade-in">
              <div className="art-deco-border px-6 py-2 border border-yellow-500/30 bg-yellow-950/20 rounded">
                <h1 className="font-deco text-xl font-black text-yellow-400 tracking-wider">
                  SELECT REACTOR TYPE
                </h1>
              </div>
              
              <div className="my-4 space-y-4 w-full flex-grow flex flex-col justify-center">
                <p className="text-xs leading-normal text-teal-100 font-mono-sci">
                  Captain Mendy requires energy telemetry from specific mini-game modes. Choose an active protocol below to proceed with the harvest:
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  {choices.map((mode) => {
                    const details = getModeDetails(mode);
                    return (
                      <button
                        key={mode}
                        onClick={() => {
                          unlockAudio();
                          selectMode(mode);
                        }}
                        className="glass-panel border border-teal-500/35 hover:border-yellow-400/80 rounded-2xl p-4 flex flex-col items-center justify-between text-center min-h-[160px] cursor-pointer bg-slate-900/60 hover:bg-slate-950/90 transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.97]"
                      >
                        <span className="text-3xl mb-2">{details.icon}</span>
                        <span className="font-deco font-bold text-xs text-yellow-400 tracking-wider uppercase">{details.title}</span>
                        <span className="text-[9px] text-slate-400 font-mono-sci mt-1 leading-normal">{details.desc}</span>
                        <span className="text-[8px] text-teal-400 font-mono-sci mt-3 border border-teal-500/20 px-2 py-0.5 rounded bg-teal-950/20 uppercase tracking-widest">{details.length}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              
              <div className="text-[8px] text-teal-500/60 font-mono-sci tracking-widest uppercase">
                THE BACK-TO-BACK BAN PREVENTS PLAYING THE SAME PROTOCOL CONSECUTIVELY
              </div>
            </div>
          )}

          {/* 3. PLAYING TRIVIA RUN */}
          {gameState === 'PLAYING' && currentQuestion && (
            <GauntletConsole
              question={currentQuestion}
              index={currentIndex}
              totalQuestions={questions.length}
              round={round}
              onAnswerSubmitted={handleAnswerSubmitted}
              nextQuestion={nextQuestion}
              gridTapSymbol={gridTapSymbol}
              resetGridTapSymbol={resetGridTapSymbol}
            />
          )}

          {/* 4. ROUND CLEAR DOSSIER TERMINAL */}
          {gameState === 'ROUND_CLEAR' && (
            <div className="glass-panel rounded-2xl p-6 border-2 border-emerald-500/30 glow-green h-full flex flex-col justify-between items-center text-center select-none animate-fade-in font-mono-sci">
              <div className="art-deco-border px-6 py-1.5 border border-emerald-500/30 bg-emerald-950/20 rounded">
                <h1 className="font-deco text-xl font-black text-emerald-400 tracking-wider">
                  REACTOR EXPEDITION SUMMARY
                </h1>
              </div>

              {/* Harvested Elements slide view */}
              <div className="w-full flex-grow flex flex-col justify-between my-4 overflow-hidden">
                <div className="text-left mb-2">
                  <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider block">
                    HARVESTED ELEMENT TELEMETRY
                  </span>
                  <span className="text-[8.5px] text-slate-400 block mt-0.5">
                    Expedition {round - 1} Dossier Cards. Click elements on Mastery Board to research details.
                  </span>
                </div>

                {/* Dossier slide lists */}
                <div className="flex-grow overflow-y-auto pr-1 space-y-3 max-h-[170px] bg-slate-950/50 rounded-xl p-3 border border-emerald-500/10">
                  {roundCollectedElements.length === 0 ? (
                    <div className="h-full flex flex-col justify-center items-center text-slate-500 text-xs py-10">
                      <span>No elements were collected during this expedition.</span>
                      <span className="text-[10px] mt-1 text-slate-600">Try prioritizing target questions in the next round.</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-2.5">
                      {roundCollectedElements.map((el, i) => (
                        <div 
                          key={el.symbol} 
                          className="glass-panel border border-emerald-500/20 bg-slate-900/40 rounded-xl p-3 flex flex-col text-left relative overflow-hidden"
                        >
                          <div className="flex justify-between items-center text-[8.5px] text-emerald-400 border-b border-emerald-500/10 pb-1 mb-1.5">
                            <span className="font-bold">SECURED DATA #{i + 1}</span>
                            <span className="font-bold text-yellow-400 font-deco">{el.symbol}</span>
                          </div>

                          <div className="text-[9.5px] text-emerald-300 space-y-1">
                            <div className="grid grid-cols-2 gap-x-2">
                              <div>
                                <span className="text-emerald-500/60 font-medium">NAME:</span>{' '}
                                <span className="font-bold text-slate-200 uppercase">{el.name}</span>
                              </div>
                              <div>
                                <span className="text-emerald-500/60 font-medium">ATOMIC #:</span>{' '}
                                <span className="font-bold text-slate-200">{el.number}</span>
                              </div>
                            </div>
                            
                            <div className="border-t border-emerald-500/5 pt-1 text-[8.5px] text-slate-300">
                              <span className="text-emerald-500/60 font-medium uppercase font-bold text-[8px]">USE:</span> {el.use}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => {
                  unlockAudio();
                  advanceRound();
                }}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold py-3.5 px-6 rounded-xl transition-all duration-300 transform active:scale-95 shadow-[0_0_15px_rgba(16,185,129,0.3)] font-mono-sci tracking-widest text-sm cursor-pointer"
              >
                ENGAGE NEXT WARP PROTOCOL
              </button>
            </div>
          )}

          {/* 5. VICTORY CELEBRATION */}
          {gameState === 'victory' && (
            <div className="glass-panel rounded-2xl p-8 border-2 border-yellow-500/40 glow-gold h-full flex flex-col justify-between items-center text-center select-none animate-fade-in">
              <div className="art-deco-border px-6 py-2 border border-yellow-500/30 bg-yellow-950/20 rounded">
                <h1 className="font-deco text-2xl font-black text-yellow-400 tracking-wider animate-pulse">
                  ODYSSEY COMPLETED!
                </h1>
              </div>

              <div className="my-6 space-y-4">
                <div className="text-6xl animate-bounce">🚀</div>
                <p className="text-sm font-mono-sci text-slate-200 leading-relaxed">
                  Stunning! You have harvested all 118 elements of the universe! 
                  Captain Mendy's warp core is completely charged and she is returning to the stars. 
                  Earth is saved and documented!
                </p>
                <div className="grid grid-cols-2 gap-4 bg-slate-950/80 border border-yellow-500/20 rounded-xl p-3 font-mono-sci text-xs">
                  <div>
                    <span className="text-slate-500 block">TOTAL SCORE</span>
                    <span className="text-yellow-400 font-bold text-sm">{score} PTS</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">ROUND REACHED</span>
                    <span className="text-emerald-400 font-bold text-sm">ROUND {round}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  unlockAudio();
                  playWarpDrive();
                  resetGame();
                }}
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-slate-950 font-bold py-3.5 px-6 rounded-xl transition-all duration-300 transform active:scale-95 shadow-[0_0_15px_rgba(234,179,8,0.4)] font-mono-sci tracking-widest text-sm cursor-pointer"
              >
                REBOOT ODYSSEY PROCESS
              </button>
            </div>
          )}

        </div>

        {/* Dynamic Containment Capsule */}
        <div className="flex flex-col items-center">
          <ElementCapsule element={activeContainmentElement} />
          <span className="font-mono-sci text-[9px] text-yellow-500/60 uppercase tracking-widest mt-2">
            Element Containment Chamber
          </span>
        </div>

      </div>

      {/* RIGHT COLUMN: Holographic Mastery Dashboard & Combination Console */}
      <div className={`lg:col-span-4 h-full flex flex-col justify-stretch transition-transform duration-500 ${shakeScreen ? 'animate-shake' : ''}`}>
        
        <div className="flex-grow">
          {/* Pass interactive=true when in GRID_TAP mode */}
          <MasteryBoard 
            collectedElements={collectedSet} 
            totalGoalCount={118}
            interactive={gameState === 'PLAYING' && currentRoundType === 'GRID_TAP'}
            onTileClick={handleTileClick}
          />
        </div>
        
        {/* Bottom deep scanner & Interstellar Radio */}
        <CombinationConsole 
          activeElement={activeContainmentElement}
          isCorrect={gameState === 'PLAYING' && mendyState === 'correct'}
          currentIndex={currentIndex}
          inspectedElement={inspectedElement}
        />
      </div>

    </CockpitLayout>
  );
}
