import React from 'react';

export default function CockpitLayout({ children, score }) {
  return (
    <div 
      className="min-h-screen relative overflow-hidden flex flex-col items-center justify-between p-4 md:p-6 text-slate-100 font-sans bg-slate-950 bg-cover bg-center"
      style={{ 
        backgroundImage: 'url("/cockpit-bg.jpg")',
        minHeight: '100vh'
      }}
    >

      {/* 2. BRASS & GOLD COCKPIT CEILING DECOR (Symmetrical Sunburst) */}
      <div className="w-full max-w-7xl z-10 hidden md:flex items-center justify-between px-12 py-1 bg-gradient-to-b from-[#131b2e] to-transparent border-b border-yellow-500/20 relative">
        {/* Left Sunburst corner */}
        <div className="flex items-center space-x-1 opacity-45">
          <div className="w-8 h-[2px] bg-yellow-500" />
          <div className="w-4 h-4 border-t-2 border-l-2 border-yellow-500 transform rotate-45" />
        </div>
        
        {/* Center Plaque */}
        <div className="flex items-center space-x-6">
          {/* Left ceiling fan */}
          <div className="w-8 h-8 rounded-full border border-yellow-500/30 flex items-center justify-center text-[10px] text-yellow-500/40 font-mono animate-spin" style={{ animationDuration: '4s' }}>
            ❈
          </div>
          <div className="text-center font-deco text-yellow-500 tracking-[0.3em] font-bold text-xs uppercase px-8 py-1 bg-slate-950/70 border-x border-yellow-500/30 rounded-md">
            MENDY'S PERIODIC ODYSSEY
          </div>
          {/* Right ceiling fan */}
          <div className="w-8 h-8 rounded-full border border-yellow-500/30 flex items-center justify-center text-[10px] text-yellow-500/40 font-mono animate-spin" style={{ animationDuration: '4s' }}>
            ❈
          </div>
        </div>

        {/* Right Sunburst corner */}
        <div className="flex items-center space-x-1 opacity-45">
          <div className="w-4 h-4 border-t-2 border-r-2 border-yellow-500 transform -rotate-45" />
          <div className="w-8 h-[2px] bg-yellow-500" />
        </div>
      </div>

      {/* 3. MAIN COCKPIT BRIDGE LAYOUT */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-6 z-10 mt-2 flex-grow items-stretch relative">
        
        {/* Left column decorative lightning bolts */}
        <div className="absolute left-[-20px] top-1/3 text-yellow-500/10 pointer-events-none text-6xl hidden xl:block select-none">
          ⚡
        </div>
        <div className="absolute right-[-20px] top-1/3 text-yellow-500/10 pointer-events-none text-6xl hidden xl:block select-none">
          ⚡
        </div>

        {children}

      </div>

      {/* 4. COCKPIT DASHBOARD BASE PANEL (Analog Buttons & Dials) */}
      <div className="w-full max-w-7xl z-10 mt-6 bg-[#0a0f1d] border-t border-yellow-500/30 rounded-b-3xl px-8 py-3 flex flex-wrap items-center justify-between shadow-[0_-5px_15px_rgba(234,179,8,0.08)]">
        
        {/* Left Dashboard Gauges */}
        <div className="flex items-center space-x-4 mb-2 md:mb-0">
          {/* Analog dial button 1 */}
          <div className="w-8 h-8 rounded-full bg-slate-900 border border-teal-500/40 flex items-center justify-center p-1 shadow-[inset_0_0_5px_#14b8a6]">
            <div className="w-full h-[2px] bg-teal-400 transform rotate-45" />
          </div>
          {/* Analog dial button 2 */}
          <div className="w-8 h-8 rounded-full bg-slate-900 border border-yellow-500/40 flex items-center justify-center p-1 shadow-[inset_0_0_5px_#eab308]">
            <div className="w-full h-[2px] bg-yellow-400 transform -rotate-12" />
          </div>

          <div className="flex space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500 animate-blink shadow-[0_0_6px_#ef4444]" />
            <span className="w-3 h-3 rounded-full bg-teal-400 shadow-[0_0_4px_#2dd4bf]" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_4px_#10b981]" />
          </div>
          
          <span className="font-mono-sci text-[10px] text-teal-500/60 uppercase">AUTO-DIAGNOSTIC STATUS: NOMINAL</span>
        </div>

        {/* Score Board indicator */}
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-mono-sci text-yellow-500/60 tracking-wider">TOTAL EXPEDITION SCORE</span>
            <span className="font-mono-sci text-xl font-bold text-yellow-400 tracking-widest">{score} PTS</span>
          </div>
          {/* Small visual power core indicator */}
          <div className="w-6 h-6 rounded-full border-2 border-dashed border-teal-400 flex items-center justify-center animate-spin" style={{ animationDuration: '8s' }}>
            <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full glow-gold" />
          </div>
        </div>

      </div>

    </div>
  );
}
