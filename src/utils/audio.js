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
