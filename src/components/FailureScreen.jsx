import React, { useMemo } from 'react';
import Mendy from './Mendy';

const EARTH_JOKES = [
  "This terrestrial internet is so slow! I tried to download a star chart and it took 10 Earth minutes. In that time, I could have flown to the Andromeda galaxy and back!",
  "Why do humans cluster their ground vehicles in long lines called 'traffic'? It is completely illogical. Simply teleport over each other!",
  "Your roasted bean water ('coffee') is highly addictive, but your tax forms are a Class-4 planetary hazard. I do not understand how you survive.",
  "I got stuck on a website because of a 'CAPTCHA' test. It asked me to click on traffic lights. Traffic lights! We do not have those in the Sirius system! The computer thinks I am a robot.",
  "Why do your weather announcers guess the weather? On my home planet, we simply program the rain to fall on Tuesdays at precisely 14:00.",
  "Human sleep is incredibly inefficient. You spend one-third of your rotation cycles completely unconscious just to function? Unbelievable.",
  "I attempted to read Earth's internet, but your 'Accept Cookie' banners occupied 94% of my ship's holographic memory core!",
  "Why do you put plants in small pots inside your houses and then get upset when they photosynthesize? Earth customs are very confusing."
];

export default function FailureScreen({ round, scoreNeeded, scoreAchieved, onRetry }) {
  // Select a random joke on render
  const joke = useMemo(() => {
    const index = round % EARTH_JOKES.length;
    return EARTH_JOKES[index];
  }, [round]); // select new joke if round changes, or on re-mount

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex items-center justify-center z-50 p-4">
      {/* Container panel */}
      <div className="glass-panel max-w-2xl w-full border-2 border-red-500/40 rounded-3xl p-8 relative glow-cyan flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
        
        {/* Red warning border elements */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-red-500"></div>
        <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-red-500"></div>
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-red-500"></div>
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-red-500"></div>

        {/* Left Side: Captain Mendy in dismay state */}
        <div className="w-48 h-48 md:w-56 md:h-56 flex-shrink-0 flex items-center justify-center">
          <Mendy state="incorrect" />
        </div>

        {/* Right Side: Failure Details & Comic speech bubble */}
        <div className="flex-1 flex flex-col">
          {/* Header Warning */}
          <div className="mb-2">
            <span className="font-mono-sci text-xs text-red-500 tracking-widest font-bold uppercase animate-pulse">
              [ WARP DRIVE INSUFFICIENTLY CHARGED ]
            </span>
            <h2 className="font-deco text-2xl font-black text-slate-100 tracking-wider mt-1">
              ROUND RESET
            </h2>
          </div>

          {/* Speech Bubble */}
          <div className="bg-slate-900 border border-teal-500/30 rounded-2xl p-4 relative mb-6 shadow-md">
            {/* Speech bubble arrow */}
            <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-r-[12px] border-r-slate-900 border-b-[8px] border-b-transparent hidden md:block" />
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-b-[12px] border-b-slate-900 border-r-[8px] border-r-transparent block md:hidden" />
            
            <p className="text-teal-100 font-mono-sci text-sm leading-relaxed">
              "{joke}"
            </p>
          </div>

          {/* Score breakdown */}
          <div className="grid grid-cols-2 gap-4 bg-slate-900/60 border border-slate-800 rounded-xl p-3 mb-6 text-center font-mono-sci text-xs">
            <div>
              <span className="text-slate-500 block uppercase">Required Accuracy</span>
              <span className="text-yellow-400 font-bold text-sm">{scoreNeeded}%</span>
            </div>
            <div>
              <span className="text-slate-500 block uppercase">Your Accuracy</span>
              <span className="text-red-400 font-bold text-sm">{scoreAchieved}%</span>
            </div>
          </div>

          {/* Action button */}
          <button
            onClick={onRetry}
            className="w-full bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-slate-950 font-bold py-3 px-6 rounded-xl transition-all duration-300 transform active:scale-95 shadow-[0_0_15px_rgba(239,68,68,0.3)] font-mono-sci tracking-wider"
          >
            RETRY HARVESTING
          </button>
        </div>

      </div>
    </div>
  );
}
