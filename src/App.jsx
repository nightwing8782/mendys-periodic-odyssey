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
  const [attemptNumber, setAttemptNumber] = useState(1);
  const [activeHighlightSymbols, setActiveHighlightSymbols] = useState([]);

  // Clear manual inspection cache on question or game state transition, reset attempts
  useEffect(() => {
    setInspectedElement(null);
    setAttemptNumber(1);

    // Filter 4 elements (correct + 3 random incorrects) for Attempt 3 Matrix Highlight
    const currentQuestion = questions[currentIndex];
    if (gameState === 'PLAYING' && currentRoundType === 'GRID_TAP' && currentQuestion) {
      const targetSym = currentQuestion.symbol;
      const incorrectSymbols = elements
        .filter(e => e.symbol !== targetSym)
        .map(e => e.symbol)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      setActiveHighlightSymbols([targetSym, ...incorrectSymbols]);
    } else {
      setActiveHighlightSymbols([]);
    }
  }, [currentIndex, gameState, currentRoundType, questions]);

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
    <CockpitLayout score={score} shake={shakeScreen}>
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
        <div className="fixed inset-0 border-[6px] rounded-none pointer-events-none z-50 animate-flash-pulse" />
      )}

      {/* COLUMN 1 (LEFT, 25%): Holographic Mendy & Telemetry Diagnostic Feed */}
      <div className="lg:col-span-3 flex flex-col justify-between space-y-4">
        <div className="flex justify-center w-full">
          <Mendy state={mendyState} />
        </div>
        
        {/* Diagnostic Warp Core panel */}
        <div className="hud-panel p-4 flex flex-col justify-between bg-black/40 font-mono text-xs space-y-3 relative flex-grow">
          <div className="hud-bracket hud-bracket-tl" />
          <div className="hud-bracket hud-bracket-tr" />
          <div className="hud-bracket hud-bracket-bl" />
          <div className="hud-bracket hud-bracket-br" />
          
          <div className="space-y-2">
            <div className="w-full flex justify-between text-[11px] text-cyan-400 font-bold">
              <span>[WARP_CORE_CHARGE]</span>
              <span>{collectedElements.length} / 118 BANKED</span>
            </div>
            
            <div className="w-full h-3 bg-black/50 border border-cyan-500/20 p-[2px] shadow-inner">
              <div 
                className="h-full bg-cyan-400 hud-telemetry-segments text-cyan-400 transition-all duration-1000"
                style={{ width: `${(collectedElements.length / 118) * 100}%` }}
              />
            </div>
          </div>

          <div className="border-t border-cyan-500/10 pt-3 flex flex-col items-center">
            <ElementCapsule element={activeContainmentElement} />
            <span className="font-mono text-[10px] text-cyan-500/50 uppercase tracking-widest mt-2 block">
              [CONTAINMENT_MATRIX]
            </span>
          </div>
          
          <div className="text-[11px] text-yellow-400 text-center uppercase tracking-widest border-t border-cyan-500/10 pt-2.5">
            {gameState === 'victory' ? 'WARP_ENGAGED' : `EXPEDITION: PROTOCOL_${round}`}
          </div>
        </div>
      </div>

      {/* COLUMN 2 (CENTER, 25%): Central Gauntlet Terminal Core */}
      <div className="lg:col-span-3 flex flex-col justify-stretch">
        
        {/* 1. INTRO / START STATE */}
        {gameState === 'intro' && (
          <div className="hud-panel p-6 flex flex-col justify-between items-center text-center select-none h-full relative">
            <div className="hud-bracket hud-bracket-tl" />
            <div className="hud-bracket hud-bracket-tr" />
            <div className="hud-bracket hud-bracket-bl" />
            <div className="hud-bracket hud-bracket-br" />
            <div className="border border-cyan-500/20 px-6 py-2 bg-cyan-950/10 w-full mb-4">
              <h1 className="font-mono text-base font-bold text-yellow-400 tracking-wider">
                MISSION HARVESTER
              </h1>
            </div>
            
            <div className="my-4 space-y-4">
              <p className="text-xs leading-relaxed text-cyan-200 font-mono">
                Captain Mendy's starship warp drive has failed! 
                Help her traverse the periodic fields in this endless element collection gauntlet. 
                Identify, compare, synthesize, and tap elements until all 118 are secured!
              </p>
              <div className="bg-black/50 border border-cyan-500/20 p-4 text-xs font-mono text-left text-cyan-300 space-y-2 max-h-[140px] overflow-y-auto">
                <div className="flex items-start space-x-2">
                  <span className="text-yellow-400">⚡</span>
                  <span><strong>Endless Loop:</strong> Play mini-rounds until your Mastery Board holds all 118 elements.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-yellow-400">⚡</span>
                  <span><strong>Back-to-Back Ban:</strong> You cannot play the same mode twice consecutively.</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                unlockAudio();
                playClueChime();
                startGame();
              }}
              className="hud-btn-arcade w-full cursor-pointer text-xs"
            >
              INITIALIZE HARVESTER
            </button>
          </div>
        )}

        {/* 2. MODE SELECTION STATE */}
        {gameState === 'MODE_SELECTION' && (
          <div className="hud-panel p-4 flex flex-col justify-between items-center text-center select-none h-full relative animate-fade-in">
            <div className="hud-bracket hud-bracket-tl" />
            <div className="hud-bracket hud-bracket-tr" />
            <div className="hud-bracket hud-bracket-bl" />
            <div className="hud-bracket hud-bracket-br" />
            <div className="border border-cyan-500/20 px-6 py-1.5 bg-cyan-950/10 w-full mb-3">
              <h1 className="font-mono text-sm font-bold text-yellow-400 tracking-wider">
                SELECT PROTOCOL
              </h1>
            </div>
            
            <div className="my-2 space-y-3 w-full flex-grow flex flex-col justify-center">
              <p className="text-xs leading-normal text-cyan-300 font-mono">
                Captain Mendy requires energy telemetry. Select an active protocol below to proceed:
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                {choices.map((mode) => {
                  const details = getModeDetails(mode);
                  return (
                    <button
                      key={mode}
                      onClick={() => {
                        unlockAudio();
                        selectMode(mode);
                      }}
                      className="hud-panel hover:hud-panel-active border border-cyan-500/20 hover:border-yellow-400/80 p-3 flex flex-col items-center justify-between text-center min-h-[140px] cursor-pointer bg-black/40 hover:bg-black/60 transition-all duration-150 transform hover:scale-[1.02] active:scale-[0.98] w-full relative"
                    >
                      <div className="hud-bracket hud-bracket-tl" />
                      <div className="hud-bracket hud-bracket-tr" />
                      <div className="hud-bracket hud-bracket-bl" />
                      <div className="hud-bracket hud-bracket-br" />
                      <span className="text-xl mb-1">{details.icon}</span>
                      <span className="font-mono font-bold text-[11.5px] text-yellow-400 tracking-wider uppercase z-10">{details.title}</span>
                      <span className="text-[10.5px] text-cyan-500/60 font-mono mt-1 leading-normal z-10">{details.desc}</span>
                      <span className="text-[9.5px] text-cyan-400 font-mono mt-2 border border-cyan-500/20 px-1.5 py-0.5 bg-cyan-950/20 uppercase tracking-widest z-10">{details.length}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            
            <div className="text-[9.5px] text-cyan-500/50 font-mono tracking-widest uppercase">
              THE BACK-TO-BACK BAN PREVENTS REPEATED PROTOCOLS
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
            attemptNumber={attemptNumber}
            setAttemptNumber={setAttemptNumber}
          />
        )}

        {/* 4. ROUND CLEAR DOSSIER TERMINAL */}
        {gameState === 'ROUND_CLEAR' && (
          <div className="hud-panel p-4 flex flex-col justify-between items-center text-center select-none h-full relative animate-fade-in font-mono">
            <div className="hud-bracket hud-bracket-tl" />
            <div className="hud-bracket hud-bracket-tr" />
            <div className="hud-bracket hud-bracket-bl" />
            <div className="hud-bracket hud-bracket-br" />
            <div className="border border-cyan-500/20 px-6 py-1.5 bg-cyan-950/10 w-full mb-3">
              <h1 className="font-mono text-sm font-bold text-yellow-400 tracking-wider">
                EXPEDITION SUMMARY
              </h1>
            </div>

            {/* Harvested Elements slide view */}
            <div className="w-full flex-grow flex flex-col justify-between my-2 overflow-hidden">
              <div className="text-left mb-2">
                <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider block">
                  HARVESTED ELEMENT TELEMETRY
                </span>
                <span className="text-[10.5px] text-cyan-500/50 block mt-0.5">
                  Click elements on Mastery Board to research details.
                </span>
              </div>

              {/* Dossier slide lists */}
              <div className="flex-grow overflow-y-auto pr-1 space-y-3 max-h-[170px] bg-black/30 rounded-none p-3 border border-cyan-500/10">
                {roundCollectedElements.length === 0 ? (
                  <div className="h-full flex flex-col justify-center items-center text-cyan-500/60 text-xs py-10">
                    <span>No elements were collected during this expedition.</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-2.5">
                    {roundCollectedElements.map((el) => (
                      <div 
                        key={el.symbol} 
                        className="hud-panel border border-cyan-500/20 bg-black/30 p-2.5 flex flex-col text-left relative overflow-hidden"
                      >
                        <div className="hud-bracket hud-bracket-tl" />
                        <div className="hud-bracket hud-bracket-tr" />
                        <div className="hud-bracket hud-bracket-bl" />
                        <div className="hud-bracket hud-bracket-br" />
                        <div className="flex justify-between items-center text-[10.5px] text-cyan-400 border-b border-cyan-500/10 pb-1 mb-1.5 z-10 font-bold">
                          <span>SECURED DATA</span>
                          <span className="text-yellow-400 font-bold">{el.symbol}</span>
                        </div>

                        <div className="text-xs text-cyan-300 space-y-1 z-10">
                          <div className="grid grid-cols-2 gap-x-2">
                            <div>
                              <span className="text-cyan-500/60 text-[10px]">NAME:</span>{' '}
                              <span className="font-bold text-slate-200 uppercase">{el.name}</span>
                            </div>
                            <div>
                              <span className="text-cyan-500/60 text-[10px]">ATOMIC #:</span>{' '}
                              <span className="font-bold text-slate-200">{el.number}</span>
                            </div>
                          </div>
                          
                          <div className="border-t border-cyan-500/5 pt-1 text-[10.5px] text-cyan-200/80">
                            <span className="text-cyan-500/60 font-bold text-[9.5px]">USE:</span> {el.use}
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
              className="hud-btn-arcade-green w-full text-xs cursor-pointer"
            >
              ENGAGE NEXT WARP PROTOCOL
            </button>
          </div>
        )}

        {/* 5. VICTORY CELEBRATION */}
        {gameState === 'victory' && (
          <div className="hud-panel p-6 flex flex-col justify-between items-center text-center select-none h-full relative animate-fade-in font-mono">
            <div className="hud-bracket hud-bracket-tl" />
            <div className="hud-bracket hud-bracket-tr" />
            <div className="hud-bracket hud-bracket-bl" />
            <div className="hud-bracket hud-bracket-br" />
            <div className="border border-cyan-500/20 px-6 py-2 bg-cyan-950/10 w-full mb-4">
              <h1 className="font-mono text-base font-bold text-yellow-400 tracking-wider">
                ODYSSEY COMPLETED
              </h1>
            </div>

            <div className="my-4 space-y-4">
              <div className="text-4xl animate-bounce">⚡</div>
              <p className="text-xs text-cyan-200 leading-relaxed">
                Stunning! You have harvested all 118 elements of the universe! 
                Captain Mendy's warp core is completely charged and she is returning to the stars. 
                Earth is saved and documented!
              </p>
              <div className="grid grid-cols-2 gap-4 bg-black/60 border border-cyan-500/20 p-3 text-xs">
                <div>
                  <span className="text-cyan-500/50 block text-[11px] uppercase tracking-wider">TOTAL SCORE</span>
                  <span className="text-yellow-400 font-bold">{score} PTS</span>
                </div>
                <div>
                  <span className="text-cyan-500/50 block text-[11px] uppercase tracking-wider">EXPEDITIONS</span>
                  <span className="text-cyan-400 font-bold">ROUND {round}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                unlockAudio();
                playWarpDrive();
                resetGame();
              }}
              className="hud-btn-arcade w-full text-xs cursor-pointer"
            >
              REBOOT ODYSSEY PROCESS
            </button>
          </div>
        )}

      </div>

      {/* COLUMN 3 (RIGHT, 50%): Interactive Mastery Board & Scanner Deck */}
      <div className="lg:col-span-6 h-full flex flex-col justify-between space-y-4">
        <div className="flex-grow">
          {/* Pass interactive=true when in GRID_TAP mode */}
          <MasteryBoard 
            collectedElements={collectedSet} 
            totalGoalCount={118}
            interactive={gameState === 'PLAYING' && currentRoundType === 'GRID_TAP'}
            onTileClick={handleTileClick}
            attemptNumber={attemptNumber}
            targetSymbol={currentQuestion?.symbol}
            activeHighlightSymbols={activeHighlightSymbols}
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
