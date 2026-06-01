import React, { useState, useEffect } from 'react';
import { elements } from '../data/elements';

// Helper to get group colors for elements
function getCategoryColor(category) {
  switch (category) {
    case 'alkali metal':
      return {
        collectedBg: 'bg-orange-500',
        collectedBorder: 'border-orange-500',
        collectedText: 'text-[#030306]',
        uncollectedBorder: 'border-orange-500/20',
        uncollectedBg: 'bg-orange-950/5'
      };
    case 'alkaline earth metal':
      return {
        collectedBg: 'bg-amber-500',
        collectedBorder: 'border-amber-500',
        collectedText: 'text-[#030306]',
        uncollectedBorder: 'border-amber-500/20',
        uncollectedBg: 'bg-amber-950/5'
      };
    case 'transition metal':
      return {
        collectedBg: 'bg-teal-500',
        collectedBorder: 'border-teal-500',
        collectedText: 'text-[#030306]',
        uncollectedBorder: 'border-teal-500/20',
        uncollectedBg: 'bg-teal-950/5'
      };
    case 'lanthanide':
      return {
        collectedBg: 'bg-purple-500',
        collectedBorder: 'border-purple-500',
        collectedText: 'text-[#030306]',
        uncollectedBorder: 'border-purple-500/20',
        uncollectedBg: 'bg-purple-950/5'
      };
    case 'actinide':
      return {
        collectedBg: 'bg-pink-500',
        collectedBorder: 'border-pink-500',
        collectedText: 'text-[#030306]',
        uncollectedBorder: 'border-pink-500/20',
        uncollectedBg: 'bg-pink-950/5'
      };
    case 'post-transition metal':
      return {
        collectedBg: 'bg-blue-500',
        collectedBorder: 'border-blue-500',
        collectedText: 'text-[#030306]',
        uncollectedBorder: 'border-blue-500/20',
        uncollectedBg: 'bg-blue-950/5'
      };
    case 'metalloid':
      return {
        collectedBg: 'bg-emerald-500',
        collectedBorder: 'border-emerald-500',
        collectedText: 'text-[#030306]',
        uncollectedBorder: 'border-emerald-500/20',
        uncollectedBg: 'bg-emerald-950/5'
      };
    case 'reactive nonmetal':
      return {
        collectedBg: 'bg-lime-500',
        collectedBorder: 'border-lime-500',
        collectedText: 'text-[#030306]',
        uncollectedBorder: 'border-lime-500/20',
        uncollectedBg: 'bg-lime-950/5'
      };
    case 'halogen':
      return {
        collectedBg: 'bg-cyan-500',
        collectedBorder: 'border-cyan-500',
        collectedText: 'text-[#030306]',
        uncollectedBorder: 'border-cyan-500/20',
        uncollectedBg: 'bg-cyan-950/5'
      };
    case 'noble gas':
      return {
        collectedBg: 'bg-fuchsia-500',
        collectedBorder: 'border-fuchsia-500',
        collectedText: 'text-[#030306]',
        uncollectedBorder: 'border-fuchsia-500/20',
        uncollectedBg: 'bg-fuchsia-950/5'
      };
    default:
      return {
        collectedBg: 'bg-slate-500',
        collectedBorder: 'border-slate-500',
        collectedText: 'text-[#030306]',
        uncollectedBorder: 'border-slate-500/10',
        uncollectedBg: 'bg-transparent'
      };
  }
}

// Grid layout mapping for all 118 elements in the Periodic Table
const tableElements = [
  // Row 1
  { symbol: "H", num: 1, col: 1, row: 1 },
  { symbol: "He", num: 2, col: 18, row: 1 },
  // Row 2
  { symbol: "Li", num: 3, col: 1, row: 2 },
  { symbol: "Be", num: 4, col: 2, row: 2 },
  { symbol: "B", num: 5, col: 13, row: 2 },
  { symbol: "C", num: 6, col: 14, row: 2 },
  { symbol: "N", num: 7, col: 15, row: 2 },
  { symbol: "O", num: 8, col: 16, row: 2 },
  { symbol: "F", num: 9, col: 17, row: 2 },
  { symbol: "Ne", num: 10, col: 18, row: 2 },
  // Row 3
  { symbol: "Na", num: 11, col: 1, row: 3 },
  { symbol: "Mg", num: 12, col: 2, row: 3 },
  { symbol: "Al", num: 13, col: 13, row: 3 },
  { symbol: "Si", num: 14, col: 14, row: 3 },
  { symbol: "P", num: 15, col: 15, row: 3 },
  { symbol: "S", num: 16, col: 16, row: 3 },
  { symbol: "Cl", num: 17, col: 17, row: 3 },
  { symbol: "Ar", num: 18, col: 18, row: 3 },
  // Row 4
  { symbol: "K", num: 19, col: 1, row: 4 },
  { symbol: "Ca", num: 20, col: 2, row: 4 },
  { symbol: "Sc", num: 21, col: 3, row: 4 },
  { symbol: "Ti", num: 22, col: 4, row: 4 },
  { symbol: "V", num: 23, col: 5, row: 4 },
  { symbol: "Cr", num: 24, col: 6, row: 4 },
  { symbol: "Mn", num: 25, col: 7, row: 4 },
  { symbol: "Fe", num: 26, col: 8, row: 4 },
  { symbol: "Co", num: 27, col: 9, row: 4 },
  { symbol: "Ni", num: 28, col: 10, row: 4 },
  { symbol: "Cu", num: 29, col: 11, row: 4 },
  { symbol: "Zn", num: 30, col: 12, row: 4 },
  { symbol: "Ga", num: 31, col: 13, row: 4 },
  { symbol: "Ge", num: 32, col: 14, row: 4 },
  { symbol: "As", num: 33, col: 15, row: 4 },
  { symbol: "Se", num: 34, col: 16, row: 4 },
  { symbol: "Br", num: 35, col: 17, row: 4 },
  { symbol: "Kr", num: 36, col: 18, row: 4 },
  // Row 5
  { symbol: "Rb", num: 37, col: 1, row: 5 },
  { symbol: "Sr", num: 38, col: 2, row: 5 },
  { symbol: "Y", num: 39, col: 3, row: 5 },
  { symbol: "Zr", num: 40, col: 4, row: 5 },
  { symbol: "Nb", num: 41, col: 5, row: 5 },
  { symbol: "Mo", num: 42, col: 6, row: 5 },
  { symbol: "Tc", num: 43, col: 7, row: 5 },
  { symbol: "Ru", num: 44, col: 8, row: 5 },
  { symbol: "Rh", num: 45, col: 9, row: 5 },
  { symbol: "Pd", num: 46, col: 10, row: 5 },
  { symbol: "Ag", num: 47, col: 11, row: 5 },
  { symbol: "Cd", num: 48, col: 12, row: 5 },
  { symbol: "In", num: 49, col: 13, row: 5 },
  { symbol: "Sn", num: 50, col: 14, row: 5 },
  { symbol: "Sb", num: 51, col: 15, row: 5 },
  { symbol: "Te", num: 52, col: 16, row: 5 },
  { symbol: "I", num: 53, col: 17, row: 5 },
  { symbol: "Xe", num: 54, col: 18, row: 5 },
  // Row 6
  { symbol: "Cs", num: 55, col: 1, row: 6 },
  { symbol: "Ba", num: 56, col: 2, row: 6 },
  { symbol: "Lu", num: 71, col: 3, row: 6 },
  { symbol: "Hf", num: 72, col: 4, row: 6 },
  { symbol: "Ta", num: 73, col: 5, row: 6 },
  { symbol: "W", num: 74, col: 6, row: 6 },
  { symbol: "Re", num: 75, col: 7, row: 6 },
  { symbol: "Os", num: 76, col: 8, row: 6 },
  { symbol: "Ir", num: 77, col: 9, row: 6 },
  { symbol: "Pt", num: 78, col: 10, row: 6 },
  { symbol: "Au", num: 79, col: 11, row: 6 },
  { symbol: "Hg", num: 80, col: 12, row: 6 },
  { symbol: "Tl", num: 81, col: 13, row: 6 },
  { symbol: "Pb", num: 82, col: 14, row: 6 },
  { symbol: "Bi", num: 83, col: 15, row: 6 },
  { symbol: "Po", num: 84, col: 16, row: 6 },
  { symbol: "At", num: 85, col: 17, row: 6 },
  { symbol: "Rn", num: 86, col: 18, row: 6 },
  // Row 7
  { symbol: "Fr", num: 87, col: 1, row: 7 },
  { symbol: "Ra", num: 88, col: 2, row: 7 },
  { symbol: "Lr", num: 103, col: 3, row: 7 },
  { symbol: "Rf", num: 104, col: 4, row: 7 },
  { symbol: "Db", num: 105, col: 5, row: 7 },
  { symbol: "Sg", num: 106, col: 6, row: 7 },
  { symbol: "Bh", num: 107, col: 7, row: 7 },
  { symbol: "Hs", num: 108, col: 8, row: 7 },
  { symbol: "Mt", num: 109, col: 9, row: 7 },
  { symbol: "Ds", num: 110, col: 10, row: 7 },
  { symbol: "Rg", num: 111, col: 11, row: 7 },
  { symbol: "Cn", num: 112, col: 12, row: 7 },
  { symbol: "Nh", num: 113, col: 13, row: 7 },
  { symbol: "Fl", num: 114, col: 14, row: 7 },
  { symbol: "Mc", num: 115, col: 15, row: 7 },
  { symbol: "Lv", num: 116, col: 16, row: 7 },
  { symbol: "Ts", num: 117, col: 17, row: 7 },
  { symbol: "Og", num: 118, col: 18, row: 7 },

  // Lanthanides row offset at bottom (Row 8)
  { symbol: "La", num: 57, col: 4, row: 8 },
  { symbol: "Ce", num: 58, col: 5, row: 8 },
  { symbol: "Pr", num: 59, col: 6, row: 8 },
  { symbol: "Nd", num: 60, col: 7, row: 8 },
  { symbol: "Pm", num: 61, col: 8, row: 8 },
  { symbol: "Sm", num: 62, col: 9, row: 8 },
  { symbol: "Eu", num: 63, col: 10, row: 8 },
  { symbol: "Gd", num: 64, col: 11, row: 8 },
  { symbol: "Tb", num: 65, col: 12, row: 8 },
  { symbol: "Dy", num: 66, col: 13, row: 8 },
  { symbol: "Ho", num: 67, col: 14, row: 8 },
  { symbol: "Er", num: 68, col: 15, row: 8 },
  { symbol: "Tm", num: 69, col: 16, row: 8 },
  { symbol: "Yb", num: 70, col: 17, row: 8 },

  // Actinides row offset at bottom (Row 9)
  { symbol: "Ac", num: 89, col: 4, row: 9 },
  { symbol: "Th", num: 90, col: 5, row: 9 },
  { symbol: "Pa", num: 91, col: 6, row: 9 },
  { symbol: "U", num: 92, col: 7, row: 9 },
  { symbol: "Np", num: 93, col: 8, row: 9 },
  { symbol: "Pu", num: 94, col: 9, row: 9 },
  { symbol: "Am", num: 95, col: 10, row: 9 },
  { symbol: "Cm", num: 96, col: 11, row: 9 },
  { symbol: "Bk", num: 97, col: 12, row: 9 },
  { symbol: "Cf", num: 98, col: 13, row: 9 },
  { symbol: "Es", num: 99, col: 14, row: 9 },
  { symbol: "Fm", num: 100, col: 15, row: 9 },
  { symbol: "Md", num: 101, col: 16, row: 9 },
  { symbol: "No", num: 102, col: 17, row: 9 }
];



export default function MasteryBoard({ 
  collectedElements = new Set(), 
  totalGoalCount = 118, 
  interactive = false, 
  onTileClick = null,
  attemptNumber = 1,
  targetSymbol = '',
  activeHighlightSymbols = []
}) {
  const collectedCount = collectedElements.size;
  const [prevCleared, setPrevCleared] = useState(new Set());
  const [flashingColumns, setFlashingColumns] = useState(new Set());

  // Find target element coordinates
  const targetEl = targetSymbol ? tableElements.find(e => e.symbol === targetSymbol) : null;
  const targetCol = targetEl?.col || 1;
  const targetRow = targetEl?.row || 1;

  // Attempt 2 coordinates bounds
  let minCol = 1, maxCol = 18, minRow = 1, maxRow = 9;
  if (interactive && attemptNumber === 2 && targetEl) {
    minCol = targetCol - 1;
    if (minCol < 1) minCol = 1;
    maxCol = minCol + 3;
    if (maxCol > 18) {
      maxCol = 18;
      minCol = maxCol - 3;
    }
    
    minRow = targetRow - 1;
    if (minRow < 1) minRow = 1;
    maxRow = minRow + 3;
    if (maxRow > 9) {
      maxRow = 9;
      minRow = maxRow - 3;
    }
  }

  // Detect column clears and newly cleared columns
  useEffect(() => {
    const nextCleared = new Set();
    
    for (let col = 1; col <= 18; col++) {
      const colElements = tableElements.filter(el => el.col === col);
      if (colElements.length > 0 && colElements.every(el => collectedElements.has(el.symbol))) {
        nextCleared.add(col);
      }
    }

    // Find newly cleared columns (in nextCleared but not in prevCleared)
    const newlyCleared = [];
    nextCleared.forEach(col => {
      if (!prevCleared.has(col)) {
        newlyCleared.push(col);
      }
    });

    if (newlyCleared.length > 0) {
      setFlashingColumns(new Set(newlyCleared));
      const timer = setTimeout(() => {
        setFlashingColumns(new Set());
      }, 2000); // Flash for 2 seconds
      
      setPrevCleared(nextCleared);
      return () => clearTimeout(timer);
    }

    setPrevCleared(nextCleared);
  }, [collectedElements, prevCleared]);

  return (
    <div className={`hud-panel p-4 select-none flex flex-col justify-between h-full overflow-hidden ${interactive ? 'hud-panel-active' : ''}`}>
      <div className="hud-bracket hud-bracket-tl" />
      <div className="hud-bracket hud-bracket-tr" />
      <div className="hud-bracket hud-bracket-bl" />
      <div className="hud-bracket hud-bracket-br" />
      
      {/* 1. Holographic / Scanline CRT Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Subtle scanline lines */}
        <div className="absolute inset-0 bg-scanlines opacity-[0.04] pointer-events-none" />
      </div>

      {/* Embedded style block for Mastery Board unique holographic keyframes */}
      <style>{`
        .bg-scanlines {
          background: linear-gradient(
            rgba(18, 16, 16, 0) 50%, 
            rgba(0, 0, 0, 0.3) 50-100%
          );
          background-size: 100% 3px;
        }
        @keyframes sector-pulse {
          0% { border-color: rgba(6, 182, 212, 0.4); box-shadow: 0 0 10px rgba(6, 182, 212, 0.2), inset 0 0 10px rgba(6, 182, 212, 0.1); }
          100% { border-color: rgba(34, 211, 238, 1); box-shadow: 0 0 25px rgba(34, 211, 238, 0.8), inset 0 0 20px rgba(34, 211, 238, 0.5); }
        }
        .neon-sector-border {
          border: 2px solid #22d3ee;
          animation: sector-pulse 0.8s ease-in-out infinite alternate;
        }
      `}</style>

      {/* Title Header Hacking style */}
      <div className="flex justify-between items-center mb-3 z-10 text-xs uppercase font-bold tracking-wider border-b border-cyan-500/20 pb-2">
        <span className="text-yellow-400 font-bold">[MASTERY_DATABASE]</span>
        <span className="text-cyan-500/60">SECTOR_TELEMETRY: CORE_118</span>
      </div>

      {/* Periodic Table Grid Container */}
      <div className="w-full mb-3 flex justify-center z-10">
        <div className={`relative p-2 border border-cyan-500/10 bg-black/35 w-full max-w-[850px] ${interactive && attemptNumber === 1 ? 'grid-crosshair-scan border-cyan-500/30' : ''}`}>
          <div 
            className="grid gap-[1px] md:gap-[2px] w-full relative"
            style={{ 
              gridTemplateColumns: 'repeat(18, minmax(0, 1fr))',
              gridTemplateRows: 'repeat(9, minmax(0, 1fr))'
            }}
          >
            {/* Flashing Neon Sector overlay on Attempt 2 */}
            {interactive && attemptNumber === 2 && targetEl && (
              <div 
                className="absolute pointer-events-none neon-sector-border z-20"
                style={{
                  gridColumn: `${minCol} / span 4`,
                  gridRow: `${minRow} / span 4`,
                }}
              />
            )}

            {tableElements.map((el) => {
              const isCollected = collectedElements.has(el.symbol);
              const isColumnCompleted = prevCleared.has(el.col);
              const isColumnFlashing = flashingColumns.has(el.col);

              // Grid limits check
              const in4x4Sector = !interactive || attemptNumber !== 2 || !targetEl ||
                (el.col >= minCol && el.col <= maxCol && el.row >= minRow && el.row <= maxRow);

              const in4SquareHighlight = !interactive || attemptNumber !== 3 ||
                activeHighlightSymbols.includes(el.symbol);

              const isClickable = (interactive && in4x4Sector && in4SquareHighlight) || (!interactive && isCollected);

              const elementMeta = elements.find(e => e.symbol === el.symbol);
              const category = elementMeta?.category || 'unknown';
              const catColors = getCategoryColor(category);

              let tileClass = '';

              if (interactive && attemptNumber === 3) {
                if (in4SquareHighlight) {
                  tileClass = `bg-cyan-950/40 border-2 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.6)] font-bold cursor-pointer hover:scale-110 active:scale-95 z-30`;
                } else {
                  tileClass = `opacity-0 border-transparent pointer-events-none`;
                }
              } else if (interactive && attemptNumber === 2) {
                if (in4x4Sector) {
                  tileClass = `border-dashed border-cyan-500/40 hover:border-yellow-400 bg-cyan-950/5 text-transparent cursor-pointer hover:scale-110 active:scale-95 z-30`;
                } else {
                  tileClass = `opacity-10 border-cyan-500/5 bg-transparent text-transparent pointer-events-none`;
                }
              } else {
                tileClass = isCollected 
                  ? `${catColors.collectedBg} ${catColors.collectedBorder} ${catColors.collectedText} font-bold shadow-[0_0_8px_rgba(20,184,166,0.3)]`
                  : isColumnFlashing
                  ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200'
                  : isColumnCompleted
                  ? 'bg-cyan-950/20 border-cyan-500/50 text-cyan-400'
                  : `border-dashed ${catColors.uncollectedBorder} ${catColors.uncollectedBg} text-transparent`;

                if (interactive) {
                  tileClass = isCollected
                    ? `${catColors.collectedBg} ${catColors.collectedBorder} ${catColors.collectedText} font-bold cursor-pointer hover:scale-110 active:scale-95 z-30`
                    : `border-dashed border-cyan-500/40 hover:border-yellow-400 bg-cyan-950/5 text-transparent cursor-pointer hover:scale-110 active:scale-95 z-30`;
                } else if (isCollected) {
                  tileClass += ` cursor-pointer hover:scale-110 active:scale-95 z-30`;
                }
              }

              const showSymbol = isCollected || (interactive && attemptNumber === 3 && in4SquareHighlight);

              return (
                <div
                  key={el.num}
                  className={`relative flex flex-col items-center justify-center border rounded-none aspect-square transition-all duration-300 ${tileClass}`}
                  style={{
                    gridColumn: `${el.col}`,
                    gridRow: `${el.row}`,
                  }}
                  onClick={() => {
                    if (isClickable && onTileClick) {
                      onTileClick(el.symbol);
                    }
                  }}
                  title={isCollected ? `${el.symbol} (Atomic #${el.num})` : ''}
                >
                  {showSymbol && (
                    <>
                      {/* Micro absolute atomic number at top left */}
                      <span className={`absolute top-[1px] left-[1.5px] text-[7.5px] sm:text-[8.5px] md:text-[9.5px] opacity-80 leading-none select-none ${isCollected ? '' : 'text-cyan-400'}`}>
                        {el.num}
                      </span>
                      
                      {/* Chemical Symbol in center */}
                      <span className="text-[11.5px] sm:text-[13px] md:text-[14.5px] font-extrabold select-none leading-none mt-1.5">
                        {el.symbol}
                      </span>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Counter & Indicators bottom */}
      <div className="flex items-center justify-between mt-auto z-10 border-t border-cyan-500/15 pt-3 w-full">
        {/* Flat Telemetry segment lines */}
        <div className="flex items-center space-x-3 w-1/2">
          <span className="text-sm text-cyan-500/70 font-bold uppercase tracking-wider">HARVEST_LOAD</span>
          <div className="h-3 bg-slate-950/60 border border-cyan-500/25 flex-grow p-[2px] relative">
            <div 
              className="h-full bg-cyan-400 hud-telemetry-segments text-cyan-400 transition-all duration-1000"
              style={{ width: `${Math.min(100, (collectedCount / totalGoalCount) * 100)}%` }}
            />
          </div>
        </div>

        {/* Flat Hacking Text Ticker */}
        <div className="flex items-center space-x-2 text-sm font-bold font-mono">
          <span className="text-cyan-500/50 uppercase tracking-widest text-sm">DATABASE_LOAD:</span>
          <span className="text-yellow-400">{collectedCount}</span>
          <span className="text-cyan-500/30">/</span>
          <span className="text-cyan-400">{totalGoalCount} SECURED</span>
        </div>
      </div>
    </div>
  );
}
