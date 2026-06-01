import React, { useState, useEffect } from 'react';

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



export default function MasteryBoard({ collectedElements = new Set(), totalGoalCount = 118, interactive = false, onTileClick = null }) {
  const collectedCount = collectedElements.size;
  const [prevCleared, setPrevCleared] = useState(new Set());
  const [flashingColumns, setFlashingColumns] = useState(new Set());

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
      `}</style>

      {/* Title Header Hacking style */}
      <div className="flex justify-between items-center mb-3 z-10 text-[10px] uppercase font-bold tracking-wider border-b border-cyan-500/20 pb-2">
        <span className="text-yellow-400 font-bold">[MASTERY_DATABASE]</span>
        <span className="text-cyan-500/60">SECTOR_TELEMETRY: CORE_118</span>
      </div>

      {/* Periodic Table Grid Container */}
      <div className="w-full mb-3 flex justify-center z-10">
        <div className={`relative p-2 border border-cyan-500/10 bg-black/35 w-full max-w-[850px] ${interactive ? 'grid-crosshair-scan border-cyan-500/30' : ''}`}>
          <div 
            className="grid gap-[1px] md:gap-[2px] w-full"
            style={{ 
              gridTemplateColumns: 'repeat(18, minmax(0, 1fr))',
              gridTemplateRows: 'repeat(9, minmax(0, 1fr))'
            }}
          >
            {tableElements.map((el) => {
              const isCollected = collectedElements.has(el.symbol);
              const isColumnCompleted = prevCleared.has(el.col);
              const isColumnFlashing = flashingColumns.has(el.col);

              const isClickable = interactive || isCollected;

              return (
                <div
                  key={el.num}
                  className={`relative flex flex-col items-center justify-center border rounded-none aspect-square transition-all duration-300 ${
                    isCollected 
                      ? 'bg-yellow-500 border-yellow-500 text-[#030306] font-bold shadow-[0_0_8px_rgba(234,179,8,0.7)]'
                      : isColumnFlashing
                      ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200'
                      : isColumnCompleted
                      ? 'bg-cyan-950/20 border-cyan-500/50 text-cyan-400'
                      : 'border-dashed border-cyan-500/10 bg-transparent text-transparent'
                  } ${
                    isClickable ? 'cursor-pointer hover:scale-110 active:scale-95 z-30' : ''
                  } ${
                    interactive && !isCollected ? 'border-cyan-500/40 hover:border-yellow-400 hover:bg-yellow-500/20' : ''
                  }`}
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
                  {isCollected && (
                    <>
                      {/* Micro absolute atomic number at top left */}
                      <span className="absolute top-[0.5px] left-[1px] text-[6px] sm:text-[7.5px] md:text-[8px] opacity-80 leading-none select-none">
                        {el.num}
                      </span>
                      
                      {/* Chemical Symbol in center */}
                      <span className="text-[9px] sm:text-[11px] md:text-[13px] font-extrabold select-none leading-none mt-1">
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
          <span className="text-[8.5px] text-cyan-500/70 font-bold uppercase tracking-wider">HARVEST_LOAD</span>
          <div className="h-3 bg-slate-950/60 border border-cyan-500/25 flex-grow p-[2px] relative">
            <div 
              className="h-full bg-cyan-400 hud-telemetry-segments text-cyan-400 transition-all duration-1000"
              style={{ width: `${Math.min(100, (collectedCount / totalGoalCount) * 100)}%` }}
            />
          </div>
        </div>

        {/* Flat Hacking Text Ticker */}
        <div className="flex items-center space-x-2 text-xs font-bold font-mono">
          <span className="text-cyan-500/50 uppercase tracking-widest text-[9px]">DATABASE_LOAD:</span>
          <span className="text-yellow-400">{collectedCount}</span>
          <span className="text-cyan-500/30">/</span>
          <span className="text-cyan-400">{totalGoalCount} SECURED</span>
        </div>
      </div>
    </div>
  );
}
