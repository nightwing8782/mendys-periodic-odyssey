import React, { useState, useEffect, useCallback } from 'react';
import CockpitLayout from './components/CockpitLayout';
import Mendy from './components/Mendy';
import TriviaConsole from './components/TriviaConsole';
import ElementCapsule from './components/ElementCapsule';
import MasteryBoard from './components/MasteryBoard';
import FailureScreen from './components/FailureScreen';
import CombinationConsole from './components/CombinationConsole';
import { elements } from './data/elements';
import { playWarpDrive, playClueChime, stopRadioMusic } from './utils/audio';

// Helper to shuffle array and take N items
const getRandomBatch = (arr, count) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Select a batch of N elements prioritizing those NOT yet collected and matching the current round's tier
const getRoundBatch = (allElements, collectedSet, count, roundNumber) => {
  // 1. Filter elements in the current round's tier (Tiers 1 to 6)
  const tierElements = allElements.filter(el => el.tier === roundNumber);
  
  // Find those in this tier that have NOT been collected yet
  const uncollectedInTier = tierElements.filter(el => !collectedSet.has(el.symbol));

  if (uncollectedInTier.length >= count) {
    // If we have enough uncollected elements in the current tier, use them
    return getRandomBatch(uncollectedInTier, count);
  }

  // 2. If not enough, get uncollected elements from other tiers to fill the gap
  const otherElements = allElements.filter(el => el.tier !== roundNumber);
  const uncollectedInOther = otherElements.filter(el => !collectedSet.has(el.symbol));

  const combinedUncollected = [
    ...uncollectedInTier,
    ...getRandomBatch(uncollectedInOther, Math.min(uncollectedInOther.length, count - uncollectedInTier.length))
  ];

  if (combinedUncollected.length >= count) {
    return combinedUncollected.sort(() => 0.5 - Math.random());
  }

  // 3. Fallback: If total uncollected elements in the entire table is less than count (20),
  // fill remaining slots using already collected elements (current tier first, then others)
  const collectedInTier = tierElements.filter(el => collectedSet.has(el.symbol));
  const collectedInOther = otherElements.filter(el => collectedSet.has(el.symbol));
  
  const needed = count - combinedUncollected.length;
  const fillSource = [...collectedInTier, ...collectedInOther].sort(() => 0.5 - Math.random());
  const fallbackFill = fillSource.slice(0, needed);

  return [...combinedUncollected, ...fallbackFill].sort(() => 0.5 - Math.random());
};

export default function App() {
  // Game States: 'intro' | 'playing' | 'round_complete' | 'failure' | 'victory'
  const [gameState, setGameState] = useState('intro');
  const [round, setRound] = useState(1);
  const [currentBatch, setCurrentBatch] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const [correctInRound, setCorrectInRound] = useState(0);
  const [score, setScore] = useState(0);
  const [collectedSymbols, setCollectedSymbols] = useState(new Set());
  
  // Track Mendy's active visual expression state: 'idle' | 'correct' | 'incorrect' | 'thinking'
  const [mendyState, setMendyState] = useState('idle');

  // Scanner, flash and shake states for cinematic overhauled effects
  const [isCurrentElementCorrect, setIsCurrentElementCorrect] = useState(false);
  const [shakeScreen, setShakeScreen] = useState(false);
  const [greenFlash, setGreenFlash] = useState(false);
  const [correctElementsInRound, setCorrectElementsInRound] = useState([]);
  const [showDossierModal, setShowDossierModal] = useState(false);

  // Round thresholds
  const getRoundThreshold = (r) => {
    if (r === 1) return 50;
    if (r === 2) return 60;
    if (r === 3) return 70;
    if (r === 4) return 80;
    if (r === 5) return 90;
    return 100; // Round 6: 100% needed
  };

  const passThreshold = getRoundThreshold(round);

  // Initialize a new round
  const startRound = useCallback((roundNumber) => {
    const batch = getRoundBatch(elements, collectedSymbols, 20, roundNumber);
    setCurrentBatch(batch);
    setCurrentIndex(0);
    setCorrectInRound(0);
    setRound(roundNumber);
    setMendyState('thinking'); // Mendy starts in thinking mode
    setIsCurrentElementCorrect(false);
    setCorrectElementsInRound([]);
    setGameState('playing');
  }, [collectedSymbols]);

  // Answer handler
  const handleAnswerSubmitted = (isCorrect, pointsEarned, wasPrecision) => {
    if (isCorrect) {
      setMendyState('correct');
      setCorrectInRound(prev => prev + 1);
      setScore(prev => prev + pointsEarned);
      setIsCurrentElementCorrect(true); // Populates scanner details

      // Precision correct entries trigger screen shake
      if (wasPrecision) {
        setShakeScreen(true);
        setTimeout(() => setShakeScreen(false), 500);
      }

      // Success full-screen border green flash
      setGreenFlash(true);
      setTimeout(() => setGreenFlash(false), 600);
      
      // Permanently add to unlocked elements database for the Mastery Board
      const currentElement = currentBatch[currentIndex];
      setCorrectElementsInRound(prev => [...prev, currentElement]);
      setCollectedSymbols(prev => {
        const next = new Set(prev);
        next.add(currentElement.symbol);
        return next;
      });
    } else {
      setMendyState('incorrect');
    }

    // Delay before moving to the next element
    setTimeout(() => {
      setMendyState('thinking'); // Reset to thinking for the next countdown
      setIsCurrentElementCorrect(false); // Reset correct state for scanner
      
      if (currentIndex < 19) {
        setCurrentIndex(prev => prev + 1);
      } else {
        // Round Finished! Check accuracy percentage
        const accuracy = Math.round(( (correctInRound + (isCorrect ? 1 : 0)) / 20 ) * 100);
        const threshold = getRoundThreshold(round);
        
        if (accuracy >= threshold) {
          if (round === 6) {
            // WIN THE GAME!
            setGameState('victory');
            playWarpDrive();
            stopRadioMusic();
          } else {
            // Completed Round 1 to 5 successfully
            setGameState('round_complete');
            setShowDossierModal(true); // Auto-open dossier popup!
          }
        } else {
          // Failed the round requirements
          setGameState('failure');
        }
      }
    }, 1500);
  };

  // Retry the current round
  const handleRetryRound = () => {
    startRound(round);
  };

  // Move to next round
  const handleNextRound = () => {
    startRound(round + 1);
  };

  // Restart the whole odyssey
  const handleRestartGame = () => {
    setScore(0);
    setCollectedSymbols(new Set());
    stopRadioMusic();
    startRound(1);
  };

  return (
    <CockpitLayout score={score}>
      {/* Inline styles for screen shake and viewport outline flash */}
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

      {/* Viewport Electric Green Border Flash Overlay */}
      {greenFlash && (
        <div className="fixed inset-0 border-[6px] rounded-lg pointer-events-none z-50 animate-flash-pulse" />
      )}
      
      {/* LEFT COLUMN: Captain Mendy & Controls */}
      <div className={`lg:col-span-3 flex flex-col items-center justify-between space-y-6 transition-transform duration-500 ${shakeScreen ? 'animate-shake' : ''}`}>
        
        {/* Captain Mendy card container */}
        <div className="glass-panel rounded-2xl p-4 border border-teal-500/20 w-full flex items-center justify-center bg-teal-950/10 min-h-[300px]">
          <Mendy state={mendyState} />
        </div>

        {/* Cockpit Gauge Panel */}
        <div className="glass-panel rounded-2xl p-4 border border-yellow-500/20 w-full flex flex-col justify-center items-center space-y-3 bg-slate-900/60 font-mono-sci">
          <div className="w-full flex justify-between text-[9px] text-teal-400">
            <span>WARP DRIVE SPEED</span>
            <span>CELL CHARGE</span>
          </div>
          {/* Progress Bar representation */}
          <div className="w-full h-3 bg-slate-950 border border-teal-500/30 rounded-full overflow-hidden p-0.5">
            <div 
              className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full glow-teal transition-all duration-1000"
              style={{ width: `${(round / 6) * 100}%` }}
            />
          </div>

          <div className="text-[10px] text-yellow-500 text-center uppercase tracking-widest mt-1">
            ROUND {round} / 6 EXPEDITION
          </div>
        </div>

      </div>

      {/* CENTER COLUMN: Trivia Console & Element Capsule */}
      <div className={`lg:col-span-5 flex flex-col justify-between space-y-6 transition-transform duration-500 ${shakeScreen ? 'animate-shake' : ''}`}>
        
        {/* Trivia Area */}
        <div className="flex-grow min-h-[360px]">
          {gameState === 'playing' && currentBatch[currentIndex] && (
            <TriviaConsole
              element={currentBatch[currentIndex]}
              index={currentIndex}
              round={round}
              passThreshold={passThreshold}
              onAnswerSubmitted={handleAnswerSubmitted}
            />
          )}

          {gameState === 'intro' && (
            <div className="glass-panel rounded-2xl p-8 border-2 border-yellow-500/30 glow-gold h-full flex flex-col justify-between items-center text-center select-none">
              <div className="art-deco-border px-6 py-2 border border-yellow-500/30 bg-yellow-950/20 rounded">
                <h1 className="font-deco text-2xl font-black text-yellow-400 tracking-wider">
                  MISSION PROTOCOL
                </h1>
              </div>
              
              <div className="my-6 space-y-4">
                <p className="text-sm leading-relaxed text-teal-100 font-mono-sci">
                  Captain Mendy has crash-landed on Earth! Her warp drive is depleted. 
                  To leave, she must harvest and synthesize target elements.
                </p>
                <div className="bg-slate-950/80 border border-teal-500/20 rounded-xl p-3 text-[11px] font-mono-sci text-left text-slate-300 space-y-1.5 max-h-[140px] overflow-y-auto animate-fade-in">
                  <div className="flex items-center space-x-2 text-yellow-500">
                    <span>⚡</span> <span>Round 1: Common elements, 50% accuracy needed.</span>
                  </div>
                  <div className="flex items-center space-x-2 text-yellow-400">
                    <span>⚡</span> <span>Round 2: Industrial elements, 60% accuracy needed.</span>
                  </div>
                  <div className="flex items-center space-x-2 text-teal-400">
                    <span>⚡</span> <span>Round 3: Precious metals, 70% accuracy needed.</span>
                  </div>
                  <div className="flex items-center space-x-2 text-teal-300">
                    <span>⚡</span> <span>Round 4: Lanthanides & Refractory, 80% accuracy.</span>
                  </div>
                  <div className="flex items-center space-x-2 text-emerald-400">
                    <span>⚡</span> <span>Round 5: Actinides & Radioactive, 90% accuracy.</span>
                  </div>
                  <div className="flex items-center space-x-2 text-emerald-300 font-bold animate-pulse">
                    <span>⚡</span> <span>Round 6: Superheavy & Synthetic, 100% accuracy.</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  playClueChime();
                  startRound(1);
                }}
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-slate-950 font-bold py-3.5 px-6 rounded-xl transition-all duration-300 transform active:scale-95 shadow-[0_0_15px_rgba(234,179,8,0.3)] font-mono-sci tracking-widest text-sm"
              >
                INITIALIZE HARVESTER
              </button>
            </div>
          )}

          {gameState === 'round_complete' && (
            <div className="glass-panel rounded-2xl p-8 border-2 border-emerald-500/30 glow-green h-full flex flex-col justify-between items-center text-center select-none animate-fade-in">
              <div className="art-deco-border px-6 py-2 border border-emerald-500/30 bg-emerald-950/20 rounded">
                <h1 className="font-deco text-2xl font-black text-emerald-400 tracking-wider">
                  REACTOR STAGE COMPLETED
                </h1>
              </div>

              <div className="my-6 space-y-4">
                <div className="text-5xl">🔋</div>
                <p className="text-sm font-mono-sci text-slate-300 leading-relaxed">
                  Congratulations! You completed Round {round} with at least {passThreshold}% accuracy!
                  Warp cells charged to {Math.round((round / 6) * 100)}%.
                </p>
                <div className="bg-slate-950/60 border border-emerald-500/20 rounded-xl p-3 inline-block font-mono-sci text-xs text-emerald-400">
                  REACTOR HARVEST EFFICIENCY: {Math.round((correctInRound / 20) * 100)}%
                </div>
              </div>

              <div className="flex flex-col space-y-3 w-full mt-4">
                <button
                  onClick={() => setShowDossierModal(true)}
                  className="w-full bg-slate-900 border border-emerald-500/35 hover:border-emerald-400/60 text-emerald-400 font-bold py-2.5 px-6 rounded-xl transition-all duration-300 font-mono-sci text-xs cursor-pointer shadow-[0_0_8px_rgba(16,185,129,0.15)]"
                >
                  📁 REVIEW SCAN LOGS ({correctElementsInRound.length} CARDS)
                </button>
                <button
                  onClick={handleNextRound}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold py-3.5 px-6 rounded-xl transition-all duration-300 transform active:scale-95 shadow-[0_0_15px_rgba(16,185,129,0.3)] font-mono-sci tracking-widest text-sm cursor-pointer"
                >
                  ENGAGE ROUND {round + 1} REACTOR
                </button>
              </div>
            </div>
          )}

          {gameState === 'victory' && (
            <div className="glass-panel rounded-2xl p-8 border-2 border-yellow-500/40 glow-gold h-full flex flex-col justify-between items-center text-center select-none animate-fade-in">
              <div className="art-deco-border px-6 py-2 border border-yellow-500/30 bg-yellow-950/20 rounded">
                <h1 className="font-deco text-2xl font-black text-yellow-400 tracking-wider animate-pulse">
                  WARP DRIVE 100% ONLINE!
                </h1>
              </div>

              <div className="my-6 space-y-4">
                <div className="text-6xl animate-bounce">🚀</div>
                <p className="text-sm font-mono-sci text-slate-200 leading-relaxed">
                  Captain Mendy's warp drive is fully charged with a flawless 100% accuracy round! 
                  She is leaving Earth orbits now. Goodbye, terrestrial humans!
                </p>
                <div className="grid grid-cols-2 gap-4 bg-slate-950/80 border border-yellow-500/20 rounded-xl p-3 font-mono-sci text-xs">
                  <div>
                    <span className="text-slate-500 block">TOTAL SCORE</span>
                    <span className="text-yellow-400 font-bold text-sm">{score} PTS</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">ELEMENTS HARVESTED</span>
                    <span className="text-emerald-400 font-bold text-sm">{collectedSymbols.size} / 118</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleRestartGame}
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-slate-950 font-bold py-3.5 px-6 rounded-xl transition-all duration-300 transform active:scale-95 shadow-[0_0_15px_rgba(234,179,8,0.4)] font-mono-sci tracking-widest text-sm"
              >
                REBOOT ODYSSEY PROCESS
              </button>
            </div>
          )}
        </div>

        {/* Containment Capsule */}
        <div className="flex flex-col items-center">
          <ElementCapsule element={gameState === 'playing' ? currentBatch[currentIndex] : null} />
          <span className="font-mono-sci text-[9px] text-yellow-500/60 uppercase tracking-widest mt-2">
            Element Containment Chamber
          </span>
        </div>

      </div>

      {/* RIGHT COLUMN: Holographic Mastery Dashboard & Combination Console */}
      <div className={`lg:col-span-4 h-full flex flex-col justify-stretch transition-transform duration-500 ${shakeScreen ? 'animate-shake' : ''}`}>
        <div className="flex-grow">
          <MasteryBoard 
            collectedElements={collectedSymbols} 
            totalGoalCount={118}
          />
        </div>
        
        {/* Overhaul Lower-Right Combination Console */}
        <CombinationConsole 
          activeElement={gameState === 'playing' ? currentBatch[currentIndex] : null}
          isCorrect={isCurrentElementCorrect}
          currentIndex={currentIndex}
        />
      </div>

      {/* Round Failure Screen Overlay */}
      {gameState === 'failure' && (
        <FailureScreen
          round={round}
          scoreNeeded={passThreshold}
          scoreAchieved={Math.round((correctInRound / 20) * 100)}
          onRetry={handleRetryRound}
        />
      )}

      {/* Dossier Modal Overlay */}
      {showDossierModal && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center z-50 p-4 md:p-6 animate-fade-in font-mono-sci">
          <div className="glass-panel border-2 border-emerald-500/40 bg-slate-950/95 glow-green rounded-3xl w-full max-w-4xl max-h-[85vh] flex flex-col p-6 relative">
            
            {/* Header */}
            <div className="border-b border-emerald-500/30 pb-4 flex justify-between items-center text-emerald-400">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📁</span>
                <div className="text-left">
                  <h2 className="font-deco text-lg md:text-xl font-bold tracking-wider text-slate-100 uppercase">
                    HARVESTED ELEMENT LOGS
                  </h2>
                  <p className="text-[10px] text-emerald-500/80 uppercase tracking-widest mt-0.5">
                    Expedition Round {round} Dossier — {correctElementsInRound.length} / 20 Identified
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowDossierModal(false)}
                className="text-slate-400 hover:text-red-400 text-xs font-bold border border-slate-700 hover:border-red-500/50 rounded-xl px-3.5 py-2 bg-slate-900 transition-all duration-300 cursor-pointer"
              >
                CLOSE
              </button>
            </div>

            {/* Content (Grid of Cards) */}
            <div className="flex-grow overflow-y-auto my-6 pr-2 space-y-4">
              {correctElementsInRound.length === 0 ? (
                <div className="h-48 flex flex-col justify-center items-center text-slate-500 text-xs">
                  <span>No element telemetry was recorded in this round.</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {correctElementsInRound.map((el, i) => (
                    <div 
                      key={el.symbol} 
                      className="glass-panel border border-emerald-500/20 bg-slate-900/60 rounded-xl p-4 flex flex-col justify-between min-h-[110px] relative overflow-hidden text-left animate-fade-in"
                    >
                      {/* Accent brackets */}
                      <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 border-t border-l border-emerald-500/30" />
                      <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 border-t border-r border-emerald-500/30" />
                      
                      <div className="flex justify-between items-center text-[10px] text-emerald-400 border-b border-emerald-500/10 pb-1 mb-2">
                        <span className="font-bold">DEEP SCAN #{i + 1}</span>
                        <span className="text-[9px] text-emerald-500/60 font-semibold">STATUS: SECURED</span>
                      </div>

                      <div className="text-[10px] text-emerald-300 space-y-1">
                        <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
                          <div>
                            <span className="text-emerald-500/60 font-medium">ELEMENT:</span>{' '}
                            <span className="font-bold text-slate-100 uppercase">{el.name}</span>
                          </div>
                          <div>
                            <span className="text-emerald-500/60 font-medium">SYMBOL:</span>{' '}
                            <span className="font-bold text-yellow-400 font-deco">{el.symbol}</span>
                          </div>
                          <div>
                            <span className="text-emerald-500/60 font-medium">ATOMIC #:</span>{' '}
                            <span className="font-bold text-slate-200">{el.number}</span>
                          </div>
                          <div>
                            <span className="text-emerald-500/60 font-medium">MASS:</span>{' '}
                            <span className="font-bold text-slate-200">{el.mass} u</span>
                          </div>
                        </div>
                        
                        <div className="border-t border-emerald-500/10 pt-1 text-[9px]">
                          <span className="text-emerald-500/60 font-medium">CONFIG:</span>{' '}
                          <span className="text-emerald-400 font-semibold">{el.config}</span>
                        </div>
                        
                        <div className="border-t border-emerald-500/10 pt-1 leading-normal text-[9px] text-slate-300 italic">
                          <span className="text-emerald-500/60 font-medium not-italic uppercase font-bold text-[8.5px]">USE:</span> {el.use}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer / Continue button */}
            <div className="border-t border-emerald-500/30 pt-4 flex flex-col sm:flex-row justify-between items-center text-xs space-y-3 sm:space-y-0">
              <span className="text-slate-500 text-center sm:text-left text-[10px] sm:text-xs">
                You can review these element details at any time before starting the next stage.
              </span>
              <button 
                onClick={() => {
                  setShowDossierModal(false);
                  if (gameState === 'round_complete') {
                    handleNextRound();
                  }
                }}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl transition-all duration-300 active:scale-95 shadow-[0_0_10px_rgba(16,185,129,0.2)] tracking-wider cursor-pointer font-mono-sci text-xs"
              >
                {gameState === 'round_complete' ? 'CONTINUE TO NEXT ROUND' : 'CLOSE DOSSIER'}
              </button>
            </div>

          </div>
        </div>
      )}

    </CockpitLayout>
  );
}
