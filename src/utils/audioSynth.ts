// Web Audio API Synth Engine for FUTURECHAT Music DNA & Sound Effects

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentTrack: string | null = null;
  private loopTimer: any = null;
  private analyserNode: AnalyserNode | null = null;
  private masterGain: GainNode | null = null;

  // EQ BiquadFilterNodes
  private eqFilters: BiquadFilterNode[] = [];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.5;

      this.analyserNode = this.ctx.createAnalyser();
      this.analyserNode.fftSize = 64;

      // 5-band EQ setup: 60Hz, 250Hz, 1000Hz, 4000Hz, 14000Hz
      const freqs = [60, 250, 1000, 4000, 14000];
      const types: BiquadFilterType[] = ['lowshelf', 'peaking', 'peaking', 'peaking', 'highshelf'];

      let prevNode: AudioNode = this.masterGain;
      this.eqFilters = freqs.map((f, i) => {
        const filter = this.ctx!.createBiquadFilter();
        filter.type = types[i];
        filter.frequency.value = f;
        filter.gain.value = 0;
        prevNode.connect(filter);
        prevNode = filter;
        return filter;
      });

      prevNode.connect(this.analyserNode);
      this.analyserNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getAnalyser(): AnalyserNode | null {
    this.initContext();
    return this.analyserNode;
  }

  public setEqBand(bandIndex: number, gainDb: number) {
    this.initContext();
    if (this.eqFilters[bandIndex]) {
      this.eqFilters[bandIndex].gain.value = gainDb;
    }
  }

  public setVolume(val: number) {
    this.initContext();
    if (this.masterGain) {
      this.masterGain.gain.value = Math.max(0, Math.min(1, val));
    }
  }

  // Play Rhodes-like mellow electric piano chord
  private playChord(notes: number[], duration = 2.0, timeOffset = 0) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime + timeOffset;

    notes.forEach((freq) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Subtle warm detune
      const subOsc = this.ctx!.createOscillator();
      subOsc.type = 'triangle';
      subOsc.frequency.setValueAtTime(freq * 0.5, now);
      const subGain = this.ctx!.createGain();
      subGain.gain.setValueAtTime(0.08, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      subOsc.connect(subGain);
      subGain.connect(this.masterGain!);

      osc.start(now);
      osc.stop(now + duration);
      subOsc.start(now);
      subOsc.stop(now + duration);
    });
  }

  // Play Shona Hosho (gourd shaker) simulation
  private playHoshoShaker(timeOffset = 0) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime + timeOffset;

    const bufferSize = this.ctx.sampleRate * 0.05;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 6500;
    filter.Q.value = 3.0;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    whiteNoise.start(now);
    whiteNoise.stop(now + 0.05);
  }

  // Play Warm Kick drum
  private playKick(timeOffset = 0) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime + timeOffset;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(38, now + 0.18);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.22);
  }

  // Play Midnight Jazz Track Loop
  public playMidnightJazz(onBeatTick?: (step: number) => void) {
    this.initContext();
    this.stop();
    this.isPlaying = true;
    this.currentTrack = 'Midnight Jazz Engine';

    // Jazzy chord progression (Fm9 -> Bb13 -> Ebmaj9 -> C7b9)
    const chords = [
      [174.61, 220.0, 261.63, 311.13, 349.23], // Fm9
      [116.54, 185.0, 233.08, 293.66, 349.23], // Bb13
      [155.56, 196.0, 246.94, 311.13, 392.00], // Ebmaj9
      [130.81, 164.81, 246.94, 293.66, 329.63] // C7b9
    ];

    let chordIdx = 0;
    let step = 0;
    const stepDuration = 0.45; // ~133 BPM eighth-notes / swing jazz

    const playBar = () => {
      if (!this.isPlaying) return;

      const currentChord = chords[chordIdx % chords.length];
      this.playChord(currentChord, 1.8, 0);

      // 4 steps per chord
      for (let s = 0; s < 4; s++) {
        const offset = s * stepDuration;
        if (s === 0 || s === 2) {
          this.playKick(offset);
        }
        // Hosho shaker on offbeats
        this.playHoshoShaker(offset + 0.15);
        this.playHoshoShaker(offset + 0.3);
      }

      if (onBeatTick) {
        onBeatTick(step);
      }
      step++;
      chordIdx++;

      this.loopTimer = setTimeout(playBar, stepDuration * 4 * 1000);
    };

    playBar();
  }

  public playSummerVibes(onBeatTick?: (step: number) => void) {
    this.initContext();
    this.stop();
    this.isPlaying = true;
    this.currentTrack = 'Summer Vibes 2.8M';

    // Uptempo Afro-fusion chords (Gmaj7 -> Em7 -> Am7 -> D7)
    const chords = [
      [196.0, 246.94, 293.66, 369.99],
      [164.81, 196.0, 246.94, 329.63],
      [220.0, 261.63, 329.63, 392.0],
      [146.83, 220.0, 293.66, 369.99],
    ];

    let chordIdx = 0;
    let step = 0;
    const stepDuration = 0.32; // ~120 BPM bouncy

    const playBar = () => {
      if (!this.isPlaying) return;
      const currentChord = chords[chordIdx % chords.length];
      this.playChord(currentChord, 1.2, 0);

      for (let s = 0; s < 4; s++) {
        const offset = s * stepDuration;
        this.playKick(offset);
        this.playHoshoShaker(offset + 0.1);
        this.playHoshoShaker(offset + 0.22);
      }

      if (onBeatTick) onBeatTick(step);
      step++;
      chordIdx++;

      this.loopTimer = setTimeout(playBar, stepDuration * 4 * 1000);
    };

    playBar();
  }

  public playChillNightDrive(onBeatTick?: (step: number) => void) {
    this.initContext();
    this.stop();
    this.isPlaying = true;
    this.currentTrack = 'Chill Night Drive 4.1M';

    // Mellow neo-soul synth chords
    const chords = [
      [146.83, 174.61, 220.0, 261.63],
      [130.81, 164.81, 196.0, 246.94],
      [110.0, 164.81, 220.0, 277.18],
      [123.47, 146.83, 185.0, 246.94]
    ];

    let chordIdx = 0;
    let step = 0;
    const stepDuration = 0.55;

    const playBar = () => {
      if (!this.isPlaying) return;
      const currentChord = chords[chordIdx % chords.length];
      this.playChord(currentChord, 2.1, 0);

      this.playKick(0);
      this.playHoshoShaker(0.35);
      this.playKick(stepDuration * 2);
      this.playHoshoShaker(stepDuration * 3);

      if (onBeatTick) onBeatTick(step);
      step++;
      chordIdx++;

      this.loopTimer = setTimeout(playBar, stepDuration * 4 * 1000);
    };

    playBar();
  }

  // Play Sound FX
  public playCashSound() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    [987.77, 1318.51, 1760.0].forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.18, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.35);
    });
  }

  public playSosSound() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.linearRampToValueAtTime(1400, now + 0.25);
    osc.frequency.linearRampToValueAtTime(800, now + 0.5);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.6);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.6);
  }

  public playChime() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, now);
    osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.12);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  public stop() {
    this.isPlaying = false;
    this.currentTrack = null;
    if (this.loopTimer) {
      clearTimeout(this.loopTimer);
      this.loopTimer = null;
    }
  }

  public getStatus() {
    return {
      isPlaying: this.isPlaying,
      currentTrack: this.currentTrack,
    };
  }
}

export const soundEngine = new SoundEngine();
