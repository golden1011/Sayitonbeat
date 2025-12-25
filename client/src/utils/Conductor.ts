// Conductor.ts
// A class to manage rhythm timing using the Web Audio API for high precision.

export class Conductor {
  bpm: number;
  crotchet: number; // Time per beat in seconds
  audioContext: AudioContext;
  startTime: number;
  isPlaying: boolean;
  beatNumber: number;
  lookahead: number; // How far ahead to schedule events (in seconds)
  scheduleAheadTime: number; // How far ahead to look for beats (in seconds)
  nextNoteTime: number; // When the next note is due
  onBeat: (beat: number) => void;
  timerID: number | null;

  constructor(bpm: number, onBeat: (beat: number) => void) {
    this.bpm = bpm;
    this.crotchet = 60 / bpm;
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.startTime = 0;
    this.isPlaying = false;
    this.beatNumber = 0;
    this.lookahead = 25.0; // 25ms
    this.scheduleAheadTime = 0.1; // 100ms
    this.nextNoteTime = 0.0;
    this.onBeat = onBeat;
    this.timerID = null;
  }

  start() {
    if (this.isPlaying) return;
    
    // Resume audio context if suspended (browser policy)
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }

    this.isPlaying = true;
    this.beatNumber = 0;
    this.startTime = this.audioContext.currentTime + 0.1; // slight delay to start
    this.nextNoteTime = this.startTime;
    
    this.scheduler();
  }

  stop() {
    this.isPlaying = false;
    if (this.timerID !== null) {
      window.clearTimeout(this.timerID);
      this.timerID = null;
    }
  }

  setBpm(bpm: number) {
    this.bpm = bpm;
    this.crotchet = 60 / bpm;
  }

  // The scheduler loop: checks if we need to schedule a beat
  scheduler() {
    // while there are notes that will need to play before the next interval, 
    // schedule them and advance the pointer.
    while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime) {
      this.scheduleNote(this.beatNumber, this.nextNoteTime);
      this.nextNote();
    }
    
    if (this.isPlaying) {
      this.timerID = window.setTimeout(() => this.scheduler(), this.lookahead);
    }
  }

  // Advance to the next beat
  nextNote() {
    const secondsPerBeat = 60.0 / this.bpm;
    this.nextNoteTime += secondsPerBeat;
    this.beatNumber++;
  }

  scheduleNote(beatNumber: number, time: number) {
    // Trigger the callback exactly when the beat is supposed to happen
    // We use a small timeout or just callback, but for visual sync we want to be close.
    // However, JS main thread might be busy. 
    // Ideally, for audio, we schedule oscillators here.
    // For visuals, we can use requestAnimationFrame or similar, but for this "game logic",
    // we will emit the event. 
    // Note: Emitting immediately here might be slightly "early" relative to audio if scheduleAheadTime is large.
    
    // For precise visual sync, we might calculate the diff and setTimeout
    const diff = time - this.audioContext.currentTime;
    if (diff > 0) {
      setTimeout(() => {
        this.onBeat(beatNumber);
      }, diff * 1000);
    } else {
       this.onBeat(beatNumber);
    }
    
    // If we were playing audio, we'd do:
    // const osc = this.audioContext.createOscillator();
    // osc.start(time);
    // osc.stop(time + 0.1);
  }
}
