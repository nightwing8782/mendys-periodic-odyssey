// Retro-futuristic Sci-Fi Sound Generator using Web Audio API

let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Mobile Web Audio unlocker (silent buffer play)
export function unlockAudio() {
  try {
    const ctx = initAudio();
    const buffer = ctx.createBuffer(1, 1, 22050);
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start(0);
    source.stop(0.01);
  } catch (e) {
    console.warn("Silent audio context unlock failed:", e);
  }
}


// 1. Computerized chime when clues appear
export function playClueChime() {
  try {
    const ctx = initAudio();
    const now = ctx.currentTime;

    // Dual sine oscillators for a clean chime chord
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(880, now); // A5

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1320, now); // E6 (Perfect fifth above)

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.15, now + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);

    osc1.stop(now + 0.6);
    osc2.stop(now + 0.6);
  } catch (error) {
    console.warn("Audio play failed:", error);
  }
}

// 2. Ascending synth/teleport effect on a correct answer
export function playCorrectAscent() {
  try {
    const ctx = initAudio();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, now);
    // Smooth frequency sweep upward
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.4);

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.2, now + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.5);
  } catch (error) {
    console.warn("Audio play failed:", error);
  }
}

// 3. Soft electronic buzz for incorrect text
export function playIncorrectBuzz() {
  try {
    const ctx = initAudio();
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Detuned sawtooth/square mix for a gritty buzz
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(110, now); // A2

    osc2.type = 'square';
    osc2.frequency.setValueAtTime(111.5, now); // Detuned

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, now);

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.18, now + 0.03);
    gainNode.gain.linearRampToValueAtTime(0.0001, now + 0.28);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);

    osc1.stop(now + 0.3);
    osc2.stop(now + 0.3);
  } catch (error) {
    console.warn("Audio play failed:", error);
  }
}

// 4. Playful, dramatic sci-fi drone when a round fails
export function playFailureDrone() {
  try {
    const ctx = initAudio();
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    const gainNode = ctx.createGain();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(75, now); // Low Eb

    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(75.8, now); // Detuned

    // LFO to create a wobble effect
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(6, now); // 6 Hz modulation
    lfoGain.gain.setValueAtTime(15, now); // Wobble intensity

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(250, now);
    filter.frequency.linearRampToValueAtTime(80, now + 1.8); // Sweeps down

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.25, now + 0.2);
    gainNode.gain.linearRampToValueAtTime(0.2, now + 1.2);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

    lfo.connect(lfoGain);
    lfoGain.connect(osc1.frequency);
    lfoGain.connect(osc2.frequency);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    lfo.start(now);
    osc1.start(now);
    osc2.start(now);

    lfo.stop(now + 2.0);
    osc1.stop(now + 2.0);
    osc2.stop(now + 2.0);
  } catch (error) {
    console.warn("Audio play failed:", error);
  }
}

// 5. Epic spaceship warp speed sound when winning the whole game
export function playWarpDrive() {
  try {
    const ctx = initAudio();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(80, now);
    // Exponential sweep upward to space frequencies
    osc.frequency.exponentialRampToValueAtTime(2500, now + 2.5);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(150, now);
    filter.frequency.exponentialRampToValueAtTime(4000, now + 2.0);

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.25, now + 0.3);
    gainNode.gain.linearRampToValueAtTime(0.25, now + 2.0);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 3.0);
  } catch (error) {
    console.warn("Audio play failed:", error);
  }
}

// --- BACKGROUND RADIO MUSIC SYNTHESISER LOOP ---
let radioVolumeNode = null;
let radioAnalyserNode = null;
let radioMusicInterval = null;
let activeRadioOscillators = [];
let radioVolume = 0.3; // Default moderate volume
let radioMuted = false;

export function initRadio() {
  const ctx = initAudio();
  if (!radioVolumeNode) {
    radioVolumeNode = ctx.createGain();
    radioVolumeNode.gain.setValueAtTime(radioMuted ? 0 : radioVolume, ctx.currentTime);
    
    radioAnalyserNode = ctx.createAnalyser();
    radioAnalyserNode.fftSize = 64; // Small fftSize to extract a clean waveform wave
    
    radioVolumeNode.connect(radioAnalyserNode);
    radioAnalyserNode.connect(ctx.destination);
  }
}

export function stopRadioMusic() {
  if (radioMusicInterval) {
    clearInterval(radioMusicInterval);
    radioMusicInterval = null;
  }
  activeRadioOscillators.forEach(osc => {
    try { osc.stop(); } catch { /* ignore */ }
  });
  activeRadioOscillators = [];
}

export function setRadioVolume(volume) {
  radioVolume = volume;
  if (radioVolumeNode && !radioMuted) {
    const ctx = initAudio();
    radioVolumeNode.gain.setValueAtTime(volume, ctx.currentTime);
  }
}

export function setRadioMute(muted) {
  radioMuted = muted;
  if (radioVolumeNode) {
    const ctx = initAudio();
    radioVolumeNode.gain.setValueAtTime(muted ? 0 : radioVolume, ctx.currentTime);
  }
}

export function getRadioDataArray() {
  if (!radioAnalyserNode) return null;
  const bufferLength = radioAnalyserNode.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  radioAnalyserNode.getByteTimeDomainData(dataArray);
  return dataArray;
}

export function startRadioMusic(stationIndex) {
  stopRadioMusic();
  initRadio();
  
  const ctx = initAudio();
  const now = ctx.currentTime;
  
  if (stationIndex === 0) {
    // Station 0: Space Ambient (Slow detuned cosmic hum)
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(65.41, now); // Low C2
    
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(65.90, now); // Detuned C2
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, now);
    
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.08, now); // Slow filter sweep LFO
    lfoGain.gain.setValueAtTime(30, now);
    
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(radioVolumeNode);
    
    lfo.start(now);
    osc1.start(now);
    osc2.start(now);
    
    activeRadioOscillators.push(lfo, osc1, osc2);
    
  } else if (stationIndex === 1) {
    // Station 1: Retro Electronic (Arpeggiated synth arpeggio)
    const arpeggio = [130.81, 155.56, 196.00, 233.08, 261.63, 311.13, 392.00, 311.13]; // C minor 7th
    let step = 0;
    
    const playNextNote = () => {
      const nowTime = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(arpeggio[step % arpeggio.length], nowTime);
      
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, nowTime);
      
      gain.gain.setValueAtTime(0, nowTime);
      gain.gain.linearRampToValueAtTime(0.18, nowTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, nowTime + 0.2);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(radioVolumeNode);
      
      osc.start(nowTime);
      osc.stop(nowTime + 0.22);
      
      activeRadioOscillators.push(osc);
      setTimeout(() => {
        activeRadioOscillators = activeRadioOscillators.filter(o => o !== osc);
      }, 300);
      
      step++;
    };
    
    playNextNote();
    radioMusicInterval = setInterval(playNextNote, 220);
    
  } else if (stationIndex === 2) {
    // Station 2: Theremin Synth (mysterious wavy theremin)
    const thereminScale = [220.00, 246.94, 293.66, 329.63, 392.00, 440.00, 493.88, 587.33, 659.25, 783.99]; // Pentatonic minor
    const osc = ctx.createOscillator();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(329.63, now); // E4
    
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(5.5, now); // 5.5Hz vibrato
    lfoGain.gain.setValueAtTime(6, now);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, now);
    
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    
    osc.connect(filter);
    filter.connect(radioVolumeNode);
    
    lfo.start(now);
    osc.start(now);
    
    activeRadioOscillators.push(lfo, osc);
    
    const glidePitch = () => {
      const nowTime = ctx.currentTime;
      const targetFreq = thereminScale[Math.floor(Math.random() * thereminScale.length)];
      osc.frequency.exponentialRampToValueAtTime(targetFreq, nowTime + 1.2);
    };
    
    radioMusicInterval = setInterval(glidePitch, 1500);
  }
}

