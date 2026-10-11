import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, SkipForward, SkipBack, Volume2, 
  Sliders, Mic2, Download, Share2, Sparkles, 
  Flame, Radio, Compass, Disc3, Clock, Check
} from 'lucide-react';
import { soundEngine } from '../utils/audioSynth.ts';

interface Track {
  id: string;
  title: string;
  artist: string;
  streams: string;
  dnaMatch: string;
  genre: string;
  bpm: number;
  playFn: () => void;
  lyricsShona: string[];
  lyricsEnglish: string[];
}

export const MusicDNAPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'player' | 'visualizer' | 'equalizer' | 'karaoke' | 'compose' | 'charts'>('player');
  const [volume, setVolume] = useState(0.7);
  const [karaokeLine, setKaraokeLine] = useState(0);
  const [sleepTimerMinutes, setSleepTimerMinutes] = useState<number | null>(null);
  const [showStoryShareModal, setShowStoryShareModal] = useState(false);
  const [offlineDownloaded, setOfflineDownloaded] = useState<Record<string, boolean>>({});

  // 5-band EQ state (-12dB to +12dB)
  const [eqBands, setEqBands] = useState([3, 1, 0, 2, 4]); // 60Hz, 250Hz, 1kHz, 4kHz, 14kHz

  // AI Composer state
  const [composePrompt, setComposePrompt] = useState({ genre: 'Afrobeats / Midnight Jazz', mood: 'Chill Night Drive', language: 'shona' });
  const [composedSong, setComposedSong] = useState<any>(null);
  const [isComposing, setIsComposing] = useState(false);

  // Canvas visualizer reference
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const tracks: Track[] = [
    {
      id: 't-1',
      title: 'Midnight Jazz in Manchester (FR17)',
      artist: 'Harare Diaspora Collective ft. Q AI',
      streams: '3.4M Streams',
      dnaMatch: '98% DNA Match',
      genre: 'Midnight Jazz & Muted Brass',
      bpm: 104,
      playFn: () => soundEngine.playMidnightJazz((step) => setKaraokeLine(step % 4)),
      lyricsShona: [
        "Usiku hwezvino, mvura yeManchester ichinaya...",
        "Tiri kufunga kumba, kubva Avondale kusvika Borrowdale.",
        "Ooo paTikTok? Jazz iyi inonyaradza pfungwa.",
        "FUTURECHAT inoti batanidza nyika mbiri, Harare x Manchester!"
      ],
      lyricsEnglish: [
        "Late midnight hour, Manchester rain falling steady...",
        "Thinking of home, from Avondale to Borrowdale.",
        "Ooo paTikTok? This jazz calms the weary mind.",
        "FUTURECHAT bridging two worlds, Harare x Manchester!"
      ]
    },
    {
      id: 't-2',
      title: 'Summer Vibes 2.8M (FR18)',
      artist: 'Mbare Beatmakers x Salford Sound',
      streams: '2.8M Streams',
      dnaMatch: '96% DNA Match',
      genre: 'Afro-fusion & Hosho Groove',
      bpm: 120,
      playFn: () => soundEngine.playSummerVibes((step) => setKaraokeLine(step % 4)),
      lyricsShona: [
        "Zuva riri kupisa, tiri pamhepo bhoo zvekuti!",
        "Hosho inorira, vanhu vese vari kudzidza tsika.",
        "Bhadharai maStream, 10c per 100 plays muhomwe!",
        "Eheka shamwari, Harare iri kumberi zvisingaite!"
      ],
      lyricsEnglish: [
        "Sun is blazing bright, we're on the sweetest wave!",
        "Traditional shakers playing, everyone moving to the groove.",
        "Pay the stream royalties, 10c per 100 plays straight to the bag!",
        "Yes my friend, Harare is leading without question!"
      ]
    },
    {
      id: 't-3',
      title: 'Chill Night Drive 4.1M (FR19)',
      artist: 'Harare Neon Lights ft. Midnight sax',
      streams: '4.1M Streams',
      dnaMatch: '99% DNA Match',
      genre: 'Neo-Soul & Deep Bass',
      bpm: 92,
      playFn: () => soundEngine.playChillNightDrive((step) => setKaraokeLine(step % 4)),
      lyricsShona: [
        "Mota ichienda zvinyoronyoro muSamora Machel...",
        "Q AI iri panext seat, ichironga ramangwana redu.",
        "$2,438.50 yave muEcoCash, hapana chekutya.",
        "Night drive yakanaka, vibe racho ndere mudenga!"
      ],
      lyricsEnglish: [
        "Cruising smoothly along Samora Machel Avenue...",
        "Q AI riding shotgun, architecting our future roadmap.",
        "$2,438.50 verified in EcoCash, zero worries tonight.",
        "Cruising the midnight highway, pristine vibrations in the air!"
      ]
    }
  ];

  const currentTrack = tracks[currentTrackIndex];

  // Handle Play / Pause
  const togglePlay = () => {
    if (isPlaying) {
      soundEngine.stop();
      setIsPlaying(false);
    } else {
      currentTrack.playFn();
      setIsPlaying(true);
      soundEngine.playChime();
    }
  };

  const handleNext = () => {
    soundEngine.stop();
    const nextIdx = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(nextIdx);
    if (isPlaying) {
      tracks[nextIdx].playFn();
    }
  };

  const handlePrev = () => {
    soundEngine.stop();
    const prevIdx = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrackIndex(prevIdx);
    if (isPlaying) {
      tracks[prevIdx].playFn();
    }
  };

  // Equalizer Change
  const handleEqChange = (bandIdx: number, val: number) => {
    const updated = [...eqBands];
    updated[bandIdx] = val;
    setEqBands(updated);
    soundEngine.setEqBand(bandIdx, val);
  };

  // Canvas Realtime Audio Visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const analyser = soundEngine.getAnalyser();
    const bufferLength = analyser ? analyser.frequencyBinCount : 32;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      animId = requestAnimationFrame(render);
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      if (analyser && isPlaying) {
        analyser.getByteFrequencyData(dataArray);
      } else {
        // Idle ambient gentle wave
        for (let i = 0; i < bufferLength; i++) {
          dataArray[i] = Math.sin(Date.now() * 0.003 + i * 0.2) * 20 + 25;
        }
      }

      const barWidth = (width / bufferLength) * 2;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * height * 0.85;

        // Gradient for DNA spectrum: Amber to Magenta to Cyan
        const grad = ctx.createLinearGradient(0, height, 0, height - barHeight);
        grad.addColorStop(0, '#f59e0b');
        grad.addColorStop(0.5, '#ec4899');
        grad.addColorStop(1, '#06b6d4');

        ctx.fillStyle = grad;
        ctx.fillRect(x, height - barHeight, barWidth - 3, barHeight);

        // Top glow dot
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x, height - barHeight - 2, barWidth - 3, 2);

        x += barWidth;
      }
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  // AI Compose trigger
  const handleGenerateSong = async () => {
    setIsComposing(true);
    soundEngine.playChime();
    try {
      const res = await fetch('/api/gemini/compose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(composePrompt),
      });
      const data = await res.json();
      setComposedSong(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsComposing(false);
    }
  };

  const handleDownloadOffline = (id: string) => {
    soundEngine.playCashSound();
    setOfflineDownloaded(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      {/* Top Banner: Music DNA 98% Match Indicator */}
      <div className="rounded-2xl bg-gradient-to-r from-pink-950/60 via-purple-950/40 to-slate-950 border border-pink-500/30 p-5 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-pink-500/20 text-pink-300 border border-pink-500/40 px-2.5 py-0.5 rounded-full text-xs font-black tracking-wide flex items-center gap-1.5">
                <Disc3 className="w-3.5 h-3.5 animate-spin" />
                FR16 MUSIC DNA 98% MATCH
              </span>
              <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 px-2 py-0.5 rounded-full text-xs font-semibold">
                Harare ✕ Manchester Night Lounge
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1">
                <Radio className="w-3 h-3 text-emerald-400" />
                FR24: 2.8k Listeners Live
              </span>
            </div>

            <h2 className="text-2xl font-black text-white mt-2 tracking-tight">
              {currentTrack.title}
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              {currentTrack.artist} • <span className="text-pink-400 font-bold">{currentTrack.streams}</span> • {currentTrack.genre}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowStoryShareModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-pink-500/50 text-xs text-slate-200 font-medium transition-colors"
              title="FR26: Share to IG Story"
            >
              <Share2 className="w-3.5 h-3.5 text-pink-400" />
              <span>Share IG Story (FR26)</span>
            </button>

            <button
              onClick={() => handleDownloadOffline(currentTrack.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                offlineDownloaded[currentTrack.id]
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-900 border-slate-700 text-slate-200 hover:border-emerald-500/50'
              }`}
              title="FR27: Download Offline"
            >
              {offlineDownloaded[currentTrack.id] ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Downloaded (FR27)</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Offline Cache (FR27)</span>
                </>
              )}
            </button>

            <button
              onClick={() => setSleepTimerMinutes(sleepTimerMinutes ? null : 30)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                sleepTimerMinutes
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-900 border-slate-700 text-slate-300'
              }`}
              title="FR29: Sleep Timer"
            >
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{sleepTimerMinutes ? `${sleepTimerMinutes}m Timer` : 'Sleep Timer (FR29)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs navigation for Music Modules */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'player', label: 'Player & Queue (FR25)', icon: Disc3 },
          { id: 'visualizer', label: 'Sound DNA Graph (FR32)', icon: Radio },
          { id: 'equalizer', label: '5-Band Equalizer (FR28)', icon: Sliders },
          { id: 'karaoke', label: 'Karaoke Shona Mode (FR30)', icon: Mic2 },
          { id: 'compose', label: 'AI Compose & Beats (FR20/FR21)', icon: Sparkles },
          { id: 'charts', label: 'Top Zim Charts (FR33)', icon: Flame },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                activeTab === tab.id
                  ? 'bg-pink-500 text-slate-950 border-pink-400 shadow-md shadow-pink-500/20'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Main Player & Controls */}
      {activeTab === 'player' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Vinyl & Playback Controls Card */}
          <div className="lg:col-span-2 rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 flex flex-col justify-between space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Animated Record Sleeve */}
              <div className="relative group shrink-0">
                <div className={`w-36 h-36 rounded-2xl bg-gradient-to-tr from-pink-600 via-purple-600 to-indigo-600 p-1 shadow-2xl shadow-pink-500/20 ${isPlaying ? 'ring-2 ring-pink-400/50' : ''}`}>
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center relative overflow-hidden">
                    <div className={`w-28 h-28 rounded-full border-4 border-slate-800 flex items-center justify-center bg-slate-900 ${isPlaying ? 'animate-spin [animation-duration:6s]' : ''}`}>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-amber-500 flex items-center justify-center text-slate-950 font-black text-[10px]">
                        98%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Track Details */}
              <div className="flex-1 text-center sm:text-left">
                <span className="text-xs uppercase font-extrabold text-pink-400 tracking-wider">
                  NOW STREAMING
                </span>
                <h3 className="text-xl font-black text-white mt-0.5">
                  {currentTrack.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {currentTrack.artist} • <span className="text-slate-300 font-semibold">{currentTrack.bpm} BPM</span>
                </p>

                {/* Live sound waveform mini-canvas */}
                <div className="mt-4 h-12 bg-slate-950/80 rounded-xl p-2 border border-slate-800/80 flex items-center justify-center overflow-hidden">
                  <canvas ref={canvasRef} width={400} height={40} className="w-full h-full" />
                </div>
              </div>
            </div>

            {/* Playback Controls Bar */}
            <div className="space-y-4 pt-4 border-t border-slate-800/80">
              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                  title="Previous Track"
                >
                  <SkipBack className="w-5 h-5" />
                </button>

                <button
                  onClick={togglePlay}
                  className="w-14 h-14 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-500 hover:scale-105 active:scale-95 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-pink-500/30 transition-all"
                  title={isPlaying ? 'Pause' : 'Play Midnight Jazz'}
                >
                  {isPlaying ? <Pause className="w-6 h-6 fill-slate-950" /> : <Play className="w-6 h-6 fill-slate-950 ml-0.5" />}
                </button>

                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                  title="Next Track"
                >
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 px-2">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-slate-400" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);
                      setVolume(v);
                      soundEngine.setVolume(v);
                    }}
                    className="w-24 accent-pink-500 cursor-pointer"
                  />
                  <span>{Math.round(volume * 100)}%</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                    FR25: Play All Gapless
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Playlist Queue (FR25) */}
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Disc3 className="w-4 h-4 text-pink-400" />
                <span>Featured Playlists & Queue</span>
              </h4>
              <span className="text-[11px] text-pink-400 font-bold">3 Tracks Loaded</span>
            </div>

            <div className="space-y-2.5">
              {tracks.map((t, idx) => (
                <div
                  key={t.id}
                  onClick={() => {
                    soundEngine.stop();
                    setCurrentTrackIndex(idx);
                    t.playFn();
                    setIsPlaying(true);
                  }}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    currentTrackIndex === idx
                      ? 'bg-pink-500/10 border-pink-500/40 shadow-sm'
                      : 'bg-slate-950/60 border-slate-800/70 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white line-clamp-1">{t.title}</span>
                    <span className="text-[10px] bg-pink-500/20 text-pink-300 px-1.5 py-0.5 rounded font-bold">
                      {t.dnaMatch}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                    <span>{t.artist}</span>
                    <span className="text-emerald-400 font-semibold">{t.streams}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Spotify Bridge & TikTok Import (FR37, FR38) */}
            <div className="pt-3 border-t border-slate-800/80 space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                  <Radio className="w-3.5 h-3.5 text-emerald-400" />
                  FR38: Spotify Account Linked
                </span>
                <span className="text-emerald-400 font-bold text-[11px]">Sync Active</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                  <Flame className="w-3.5 h-3.5 text-rose-400" />
                  FR37: TikTok Music Import
                </span>
                <span className="text-rose-400 font-bold text-[11px]">Ready</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Sound DNA Graph (FR32) */}
      {activeTab === 'visualizer' && (
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Radio className="w-5 h-5 text-pink-400" />
                <span>FR32 Sound DNA Graph & Acoustic Radar</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Acoustic profiling analyzing 5 core dimensions for the Harare x Manchester demographic.
              </p>
            </div>
            <span className="bg-pink-500/20 text-pink-300 border border-pink-500/30 text-xs px-3 py-1 rounded-full font-bold">
              Harmonic Resonance: 98.4%
            </span>
          </div>

          {/* DNA 5-Pillar Radar Scores */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { name: 'Midnight Jazz Vibe', score: '98%', desc: 'Rhodes & Muted Horns' },
              { name: 'Afro-Swing Rhythm', score: '95%', desc: 'Hosho Shaker Accent' },
              { name: 'Manchester Rain Mood', score: '92%', desc: 'Sub Lo-Fi Acoustic' },
              { name: 'Lyrical Shona Depth', score: '97%', desc: 'Dialect Storytelling' },
              { name: 'Energy & Valence', score: '94%', desc: 'Uptempo Chill Blend' },
            ].map((d, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                <div className="text-xs text-slate-400 font-medium">{d.name}</div>
                <div className="text-xl font-black text-pink-400 mt-1">{d.score}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{d.desc}</div>
              </div>
            ))}
          </div>

          <div className="h-44 bg-slate-950 rounded-xl p-4 border border-slate-800 flex items-center justify-center">
            <canvas ref={canvasRef} width={800} height={150} className="w-full h-full" />
          </div>
        </div>
      )}

      {/* TAB 3: 5-Band Equalizer (FR28) */}
      {activeTab === 'equalizer' && (
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-pink-400" />
                <span>FR28 Interactive 5-Band Parametric Equalizer</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Real-time WebAudio BiquadFilter manipulation tuned for Afro-jazz and street beats.
              </p>
            </div>
            <button
              onClick={() => {
                setEqBands([6, 3, 0, 4, 5]);
                [6, 3, 0, 4, 5].forEach((v, i) => soundEngine.setEqBand(i, v));
              }}
              className="text-xs font-bold text-pink-400 hover:text-pink-300 bg-pink-500/10 px-3 py-1.5 rounded-lg border border-pink-500/20"
            >
              Preset: Jazz Warmth
            </button>
          </div>

          <div className="grid grid-cols-5 gap-4 py-4 bg-slate-950/80 rounded-xl p-5 border border-slate-800">
            {['60Hz (Sub)', '250Hz (Warmth)', '1kHz (Vocals)', '4kHz (Presence)', '14kHz (Air)'].map((label, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3">
                <span className="text-xs font-black text-pink-400">
                  {eqBands[idx] > 0 ? `+${eqBands[idx]}` : eqBands[idx]} dB
                </span>
                <input
                  type="range"
                  min="-12"
                  max="12"
                  value={eqBands[idx]}
                  onChange={(e) => handleEqChange(idx, parseInt(e.target.value))}
                  className="h-36 -rotate-90 my-8 accent-pink-500 cursor-pointer"
                />
                <span className="text-[11px] font-semibold text-slate-300 text-center">{label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Karaoke Shona Mode (FR30, FR34) */}
      {activeTab === 'karaoke' && (
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Mic2 className="w-5 h-5 text-pink-400" />
                <span>FR30 Karaoke Mode & FR34 Verified Shona Lyrics</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Synchronized lyrics with ChiShona cultural footnotes and English translations.
              </p>
            </div>
            <button
              onClick={togglePlay}
              className="bg-pink-500 hover:bg-pink-400 text-slate-950 font-bold px-4 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause Song' : 'Start Karaoke Track'}</span>
            </button>
          </div>

          <div className="space-y-4">
            {currentTrack.lyricsShona.map((line, idx) => {
              const isCurrent = karaokeLine === idx;
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border transition-all ${
                    isCurrent
                      ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-pink-500/60 scale-[1.01] shadow-lg'
                      : 'bg-slate-950/60 border-slate-800/70 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-base font-extrabold ${isCurrent ? 'text-pink-300' : 'text-slate-200'}`}>
                      {line}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] bg-pink-500 text-slate-950 font-black px-2 py-0.5 rounded-full animate-pulse">
                        SING NOW 🎤
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 mt-1 italic">
                    🇬🇧 {currentTrack.lyricsEnglish[idx]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 5: AI Compose & Beat Generator (FR20, FR21, FR22) */}
      {activeTab === 'compose' && (
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 space-y-6">
          <div>
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-pink-400" />
              <span>FR20 AI Compose & FR21 Shona Beat Generator</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Harness Gemini 3.8 Flash to write custom verses, Afrobeat rhythms, and diaspora jazz hooks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300">Genre / Style</label>
              <select
                value={composePrompt.genre}
                onChange={(e) => setComposePrompt(prev => ({ ...prev, genre: e.target.value }))}
                className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              >
                <option value="Afrobeats / Midnight Jazz">Afrobeats / Midnight Jazz</option>
                <option value="Harare Drill x UK Grime">Harare Drill x UK Grime</option>
                <option value="Chill Lo-Fi Hosho Soul">Chill Lo-Fi Hosho Soul</option>
                <option value="Amapiano Harare Lounge">Amapiano Harare Lounge</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300">Mood</label>
              <select
                value={composePrompt.mood}
                onChange={(e) => setComposePrompt(prev => ({ ...prev, mood: e.target.value }))}
                className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              >
                <option value="Chill Night Drive">Chill Night Drive</option>
                <option value="High Energy Summer">High Energy Summer</option>
                <option value="Melancholic Diaspora Reflection">Melancholic Diaspora Reflection</option>
                <option value="Celebration & Flexing $2438">Celebration & Flexing $2438</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300">Language Blend</label>
              <select
                value={composePrompt.language}
                onChange={(e) => setComposePrompt(prev => ({ ...prev, language: e.target.value }))}
                className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              >
                <option value="shona">ChiShona & English Dual</option>
                <option value="english">Urban Manchester English</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerateSong}
            disabled={isComposing}
            className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-400 hover:to-amber-400 text-slate-950 font-black py-3 rounded-xl text-sm transition-all shadow-lg shadow-pink-500/20 flex items-center justify-center gap-2"
          >
            {isComposing ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Gemini 3.8 Flash is composing lyrics & chords...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Original Song & Beat Recipe (FR20/FR22)</span>
              </>
            )}
          </button>

          {composedSong && (
            <div className="p-5 rounded-xl bg-slate-950 border border-pink-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-pink-300">{composedSong.title}</h4>
                <span className="text-[11px] bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded font-bold">
                  {composedSong.bpm} BPM
                </span>
              </div>
              <pre className="text-xs text-slate-200 whitespace-pre-wrap font-sans leading-relaxed">
                {composedSong.lyrics}
              </pre>
              <div className="text-[11px] text-amber-400 pt-2 border-t border-slate-800">
                💡 Production Notes: {composedSong.vibeNotes}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 6: Top Zim Charts & Concerts (FR33, FR40) */}
      {activeTab === 'charts' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-5 space-y-4">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>FR33 Top Zim Charts (This Week)</span>
            </h3>
            <div className="space-y-2 text-xs">
              {[
                { rank: '01', title: 'Midnight Jazz in Manchester', artist: 'Harare Diaspora Collective', streams: '3.4M' },
                { rank: '02', title: 'Summer Vibes 2.8M', artist: 'Mbare Beatmakers', streams: '2.8M' },
                { rank: '03', title: 'Avondale Nights', artist: 'Salford Groove feat. Q AI', streams: '2.1M' },
                { rank: '04', title: 'EcoCash Dollar Bounce', artist: 'Borrowdale Brass', streams: '1.9M' },
                { rank: '05', title: 'Deansgate Rain (Afro Refix)', artist: 'Northern Zim Stars', streams: '1.7M' },
              ].map((c) => (
                <div key={c.rank} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-black text-amber-400 text-sm">{c.rank}</span>
                    <div>
                      <div className="font-bold text-white">{c.title}</div>
                      <div className="text-[11px] text-slate-400">{c.artist}</div>
                    </div>
                  </div>
                  <span className="font-black text-emerald-400 text-xs">{c.streams}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-5 space-y-4">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>FR40 Concert Finder (Harare ✕ Manchester)</span>
            </h3>
            <div className="space-y-2.5 text-xs">
              {[
                { city: 'Harare', venue: 'HICC (Harare Intl Conference Centre)', date: 'Nov 14', event: 'Afro-Jazz Fest 2026' },
                { city: 'Manchester', venue: 'AO Arena / Victoria Station', date: 'Dec 02', event: 'UK Diaspora Sound Clash' },
                { city: 'Harare', venue: 'Celebration Centre, Borrowdale', date: 'Dec 18', event: 'Summer Vibes Live 2.8M' },
                { city: 'Manchester', venue: 'Albert Hall, Peter St', date: 'Jan 10', event: 'Midnight Jazz Winter Lounge' },
              ].map((ev, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                      {ev.city} • {ev.date}
                    </span>
                    <div className="font-bold text-white mt-1">{ev.event}</div>
                    <div className="text-[11px] text-slate-400">{ev.venue}</div>
                  </div>
                  <button className="px-3 py-1 rounded bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 font-bold text-[11px] transition-colors">
                    Alert
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Share to IG Story Modal (FR26) */}
      {showStoryShareModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-pink-500/40 rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl">
            <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">FR26: Share to IG Story</span>
            <div className="w-48 h-80 mx-auto rounded-2xl bg-gradient-to-b from-purple-900 via-pink-900 to-slate-950 p-4 border border-pink-500/40 flex flex-col justify-between text-white shadow-xl">
              <div className="text-[10px] font-bold text-pink-300">FUTURECHAT ✕ INSTAGRAM</div>
              <div className="space-y-2">
                <div className="w-16 h-16 mx-auto rounded-full bg-pink-500/30 border border-pink-400 flex items-center justify-center">
                  <Disc3 className="w-8 h-8 text-pink-300 animate-spin" />
                </div>
                <div className="font-extrabold text-sm">{currentTrack.title}</div>
                <div className="text-[11px] text-slate-300">{currentTrack.dnaMatch}</div>
              </div>
              <div className="text-[10px] bg-white/10 rounded py-1 font-bold">
                Swipe up for FUTURECHAT ID
              </div>
            </div>
            <p className="text-xs text-slate-300">Export formatted 9:16 story card with active sound attribution!</p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowStoryShareModal(false)}
                className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  soundEngine.playChime();
                  setShowStoryShareModal(false);
                }}
                className="flex-1 py-2 rounded-xl bg-pink-500 text-slate-950 text-xs font-black shadow"
              >
                Push to IG Story
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
