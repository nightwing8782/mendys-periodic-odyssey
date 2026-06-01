import React from 'react';

export default function CockpitLayout({ children, score, shake }) {
  return (
    <div 
      className={`min-h-screen relative overflow-hidden flex flex-col items-center justify-between p-4 md:p-6 text-cyan-400 font-mono bg-[#030306] select-none ${shake ? 'animate-shake' : ''}`}
      style={{ 
        minHeight: '100vh',
        backgroundImage: 'radial-gradient(circle at center, #050b14 0%, #030306 100%)'
      }}
    >
      {/* Cyber Grid background overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
        style={{
          backgroundImage: 'linear-gradient(rgba(20, 184, 166, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(20, 184, 166, 0.3) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}
      />

      {/* HUD Hacking Header */}
      <div className="w-full max-w-7xl z-10 hidden md:flex items-center justify-between px-6 py-2 border border-cyan-500/20 bg-[#05050a] relative">
        <div className="hud-bracket hud-bracket-tl" />
        <div className="hud-bracket hud-bracket-tr" />
        <div className="hud-bracket hud-bracket-bl" />
        <div className="hud-bracket hud-bracket-br" />
        
        <div className="flex items-center space-x-3 text-xs tracking-widest font-bold">
          <span className="w-2 h-2 bg-cyan-500 animate-pulse shadow-[0_0_8px_#06b6d4]" />
          <span>TACTICAL FEED [SYS_ON]</span>
        </div>

        <div className="text-center text-sm font-bold tracking-[0.4em] text-yellow-400">
          MENDY'S PERIODIC ODYSSEY
        </div>

        <div className="text-xs text-cyan-500/80 font-bold tracking-wider">
          COORDINATES: SEC-0{score || 0}
        </div>
      </div>

      {/* 3. MAIN TERMINAL GRID CORES */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-4 z-10 mt-4 flex-grow items-stretch relative">
        {children}
      </div>

      {/* HUD TERMINAL BASE FOOTER */}
      <div className="w-full max-w-7xl z-10 mt-4 border border-cyan-500/20 bg-[#05050a] px-6 py-3 flex flex-wrap items-center justify-between relative">
        <div className="hud-bracket hud-bracket-tl" />
        <div className="hud-bracket hud-bracket-tr" />
        <div className="hud-bracket hud-bracket-bl" />
        <div className="hud-bracket hud-bracket-br" />

        {/* Left Status */}
        <div className="flex items-center space-x-4 mb-2 md:mb-0 text-xs font-bold">
          <div className="flex space-x-1">
            <span className="w-2 h-2 bg-emerald-500 shadow-[0_0_6px_#10b981]" />
            <span className="w-2 h-2 bg-cyan-400 animate-pulse shadow-[0_0_6px_#2dd4bf]" />
          </div>
          <span className="text-[10px] text-cyan-500/70 tracking-wider">SECURE LINK: STABLE [100.0% COHERENCY]</span>
        </div>

        {/* Right Score telemetry */}
        <div className="flex items-center space-x-6 text-xs font-bold">
          <div className="flex flex-col items-end">
            <span className="text-[8px] text-cyan-500/50 tracking-widest uppercase">BANKED SCORE DATA</span>
            <span className="text-sm font-bold text-yellow-400 tracking-wider">{score} PTS</span>
          </div>
        </div>
      </div>

    </div>
  );
}
