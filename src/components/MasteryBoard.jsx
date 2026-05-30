import React from 'react';

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

export default function MasteryBoard({ collectedElements = new Set(), totalGoalCount = 118 }) {
  const collectedCount = collectedElements.size;

  return (
    <div className="glass-panel-teal rounded-2xl p-4 md:p-5 relative border-2 border-teal-500/30 glow-teal select-none flex flex-col justify-between h-full">
      {/* Decorative corners */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-teal-400 opacity-60"></div>
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-teal-400 opacity-60"></div>
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-teal-400 opacity-60"></div>
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-teal-400 opacity-60"></div>

      {/* Title Header Art Deco */}
      <div className="flex flex-col items-center mb-3">
        <div className="border border-teal-400/40 px-6 py-0.5 rounded-sm relative art-deco-border bg-teal-950/40">
          <h2 className="font-deco text-lg font-bold tracking-widest text-teal-300 text-center">
            MASTERY BOARD
          </h2>
        </div>
        <div className="w-1/2 h-[1px] bg-gradient-to-r from-transparent via-teal-400/50 to-transparent mt-1"></div>
      </div>

      {/* Periodic Table Grid Container - Capped max-width to avoid stretching tall on desktop */}
      <div className="w-full mb-3 flex justify-center">
        <div 
          className="grid gap-[1px] md:gap-[1.5px] w-full max-w-[340px] md:max-w-[420px]"
          style={{ 
            gridTemplateColumns: 'repeat(18, minmax(0, 1fr))',
            gridTemplateRows: 'repeat(9, minmax(0, 1fr))'
          }}
        >
          {tableElements.map((el) => {
            const isCollected = collectedElements.has(el.symbol);

            return (
              <div
                key={el.num}
                className={`relative flex flex-col items-center justify-center border rounded-[1.5px] aspect-square transition-all duration-500 ${
                  isCollected
                    ? 'bg-emerald-950/70 border-emerald-500 text-emerald-400 glow-green animate-glow-pulse font-bold'
                    : 'bg-teal-950/15 border-teal-950/40 text-teal-800/60 font-medium'
                }`}
                style={{
                  gridColumn: el.col,
                  gridRow: el.row,
                }}
                title={`${el.symbol} (Atomic #${el.num}) ${isCollected ? '[COLLECTED]' : '[LOCKED]'}`}
              >
                {/* Micro absolute atomic number at top left */}
                <span className="absolute top-[0.5px] left-[1px] text-[4.5px] md:text-[5px] opacity-75 leading-none select-none">
                  {el.num}
                </span>
                
                {/* Chemical Symbol in center */}
                <span className="text-[6.5px] md:text-[8px] font-bold select-none leading-none mt-1">
                  {el.symbol}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Counter & Indicators bottom */}
      <div className="flex items-center justify-between mt-auto">
        {/* Neon Indicator Tube elements */}
        <div className="flex space-x-3 items-end h-12">
          <div className="flex flex-col items-center">
            {/* Tube 1 */}
            <div className={`w-2.5 h-8 rounded-full border border-teal-500/30 relative overflow-hidden bg-slate-950`}>
              <div 
                className="absolute bottom-0 left-0 right-0 bg-teal-400 glow-teal transition-all duration-1000"
                style={{ height: `${Math.min(100, (collectedCount / totalGoalCount) * 100)}%` }}
              />
            </div>
            <span className="text-[7.5px] font-mono-sci text-teal-400 mt-1">CAPS A</span>
          </div>

          <div className="flex flex-col items-center">
            {/* Tube 2 */}
            <div className={`w-2.5 h-8 rounded-full border border-emerald-500/30 relative overflow-hidden bg-slate-950`}>
              <div 
                className="absolute bottom-0 left-0 right-0 bg-emerald-400 glow-green transition-all duration-1000"
                style={{ height: `${collectedCount >= totalGoalCount ? 100 : 0}%` }}
              />
            </div>
            <span className="text-[7.5px] font-mono-sci text-emerald-400 mt-1">WARP</span>
          </div>
        </div>

        {/* Holographic Collected Screen */}
        <div className="bg-slate-950/90 border border-teal-500/40 rounded-xl px-4 py-2.5 flex flex-col items-center min-w-[170px] shadow-[inset_0_0_10px_rgba(20,184,166,0.3)]">
          <span className="text-[9px] font-mono-sci text-teal-400 uppercase tracking-widest mb-0.5">
            Elements Collected
          </span>
          <div className="flex items-baseline space-x-1">
            <span className="font-mono-sci text-2xl font-bold text-yellow-400 tracking-wider">
              {collectedCount}
            </span>
            <span className="font-mono-sci text-xs text-teal-600">/</span>
            <span className="font-mono-sci text-lg text-teal-400">
              {totalGoalCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
