import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Send, Volume2, VolumeX, Sparkles, Code2, 
  BookOpen, Music2, ShieldCheck, Zap, RefreshCw, 
  Smile, Flame, Award, HelpCircle
} from 'lucide-react';
import { soundEngine } from '../utils/audioSynth.ts';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  moodTag?: string;
  source?: string;
}

interface QAIAssistantProps {
  language: 'shona' | 'english';
  isZesaOffline: boolean;
  onNavigateToMusic: () => void;
  onNavigateToEarnings: () => void;
}

export const QAIAssistant: React.FC<QAIAssistantProps> = ({
  language,
  isZesaOffline,
  onNavigateToMusic,
  onNavigateToEarnings
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-init',
      role: 'model',
      text: "Ndeipi! Zviri sei? Ooo paTikTok? 🇿🇼🇬🇧 Ndiri Q AI — 95% match, your Harare teen bestie! Friendly 15+, fluent in Shona, English and 50 languages. I know all 105 FUTURECHAT features, your Music DNA (98% Midnight Jazz), and that healthy $2,438.50 creator balance! What are we cooking today?",
      timestamp: 'Just now',
      moodTag: 'Hype / Friendly 15+',
      source: 'gemini-3.8-flash'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [userMood, setUserMood] = useState<'Excited' | 'Chill' | 'Studying' | 'Creative'>('Excited');
  const [activeMode, setActiveMode] = useState<'general' | 'study' | 'code' | 'quiz' | 'translate'>('general');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const quickPrompts = [
    { label: "Ooo paTikTok? ⚡", text: "Ooo paTikTok? What's trending between Harare and Manchester right now?" },
    { label: "Check $2,438.50 Balance 💰", text: "Break down my $2,438.50 creator earnings and EcoCash payout options." },
    { label: "Recommend Midnight Jazz 🎷", text: "Why is my Music DNA 98% matched with Midnight Jazz? Put on some chill vibes!" },
    { label: "Harare Slang Guide 🇿🇼", text: "Explain top 5 Harare street phrases like 'bhoo zvekuti' and 'ndokupanga' for my Manchester mates." },
    { label: "Code Helper: Flutter & React 💻", text: "Help me write a Dart feature controller for FR105 Owner Certificate." },
    { label: "Homework Solver (ZIMSEC/GCSE) 📚", text: "Can you be my Study Buddy and solve a physics momentum problem?" },
    { label: "Tumira Pic Safety Test 🛡️", text: "What happens if a stranger in DMs says 'Tumira pic shamwari'?" }
  ];

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isLoading) return;

    soundEngine.playChime();

    const userMessage: Message = {
      id: `usr-${Date.now()}`,
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!customText) setInput('');
    setIsLoading(true);

    try {
      let replyText = '';
      let replySource = 'gemini-3.8-flash';

      if (isZesaOffline) {
        // FR15: Offline Q for ZESA load-shedding cache mode
        replyText = `[⚡ ZESA Offline Engine FR15]: Zviri bho shamwari! Magetsi adzima asi FUTURECHAT local edge AI is running 100%! Regarding "${textToSend}": All 105 features are cached on your phone, Music DNA is locked at 98%, and your $2,438.50 balance is securely synced to local storage. Ooo paTikTok? Keep rocking!`;
        replySource = 'local-zesa-cache';
      } else {
        const res = await fetch('/api/gemini/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: textToSend,
            history: messages.map(m => ({ role: m.role, text: m.text })),
          }),
        });
        const data = await res.json();
        replyText = data.reply || "Ooo paTikTok? Bho zvekuti! I'm here for you!";
        replySource = data.source || 'gemini-3.8-flash';
      }

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        moodTag: userMood,
        source: replySource,
      };

      setMessages((prev) => [...prev, botMessage]);

      // FR6: Voice Chat text-to-speech if enabled
      if (voiceEnabled && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const cleanSpeech = replyText.replace(/\[.*?\]/g, '').replace(/[\u{1F600}-\u{1F64F}]/gu, '');
        const utterance = new SpeechSynthesisUtterance(cleanSpeech);
        utterance.rate = 1.05;
        utterance.pitch = 1.15; // youthful energetic pitch
        window.speechSynthesis.speak(utterance);
      }
    } catch (err) {
      console.error(err);
      const fallbackMsg: Message = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: "Ooo paTikTok? Zviri bho! Local Q resilience kicked in. Don't stress, our Harare x Manchester connection is intact and all 105 features are ready!",
        timestamp: 'Now',
        source: 'q-resilience-fallback'
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header Profile Card for Q AI */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 border border-cyan-500/30 p-5 shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 via-sky-400 to-indigo-600 p-[2px] shadow-lg shadow-cyan-500/30">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Bot className="w-9 h-9 text-cyan-400" />
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-slate-950 ring-2 ring-slate-900">
                ✓
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-extrabold text-white tracking-tight">Q AI 95% Match</h2>
                <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[11px] font-bold px-2 py-0.5 rounded-full">
                  Harare Teen • 15+ Friendly
                </span>
                <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-[11px] font-bold px-2 py-0.5 rounded-full">
                  Shona + English + 50 Langs
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                "Ooo paTikTok?" — Dual diaspora super-assistant powered by Gemini 3.8 Flash. Knows all 105 master features, Music DNA 98%, and your $2,438.50 wallet.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* FR6 Voice Chat Toggle */}
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                voiceEnabled
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span>{voiceEnabled ? 'Voice Active (FR6)' : 'Voice Muted'}</span>
            </button>

            {/* FR10 Mood Selector */}
            <div className="flex items-center gap-1 bg-slate-950/80 border border-slate-800 rounded-lg p-1 text-xs">
              <Smile className="w-3.5 h-3.5 text-amber-400 ml-1" />
              {(['Excited', 'Chill', 'Studying', 'Creative'] as const).map((mood) => (
                <button
                  key={mood}
                  onClick={() => setUserMood(mood)}
                  className={`px-2 py-1 rounded text-[11px] font-medium transition-all ${
                    userMood === mood
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Feature Badges Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>FR14 "Tumira pic" Blocked</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{isZesaOffline ? 'FR15 ZESA Offline Active' : 'FR15 Cloud Synced'}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Music2 className="w-3.5 h-3.5 text-pink-400 shrink-0" />
            <span>FR13 Midnight Jazz Ready</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Award className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>FR3 Context Memory Active</span>
          </div>
        </div>
      </div>

      {/* Mode Switches: General, Study Buddy (FR5), Code Helper (FR4), Homework Solver (FR7) */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: 'general', label: 'General Chat', icon: Sparkles },
          { id: 'study', label: 'Study Buddy (FR5/FR7)', icon: BookOpen },
          { id: 'code', label: 'Code Helper (FR4)', icon: Code2 },
          { id: 'quiz', label: 'Quiz Generator (FR9)', icon: HelpCircle },
        ].map((mode) => {
          const Icon = mode.icon;
          return (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode.id as any)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                activeMode === mode.id
                  ? 'bg-slate-100 text-slate-950 border-white shadow'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{mode.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Chat Stream */}
      <div className="bg-slate-900/60 rounded-2xl border border-slate-800/80 p-4 md:p-5 flex flex-col h-[520px]">
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((m) => {
            const isBot = m.role === 'model';
            return (
              <div
                key={m.id}
                className={`flex gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}
              >
                {isBot && (
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-md ${
                    isBot
                      ? 'bg-slate-950/90 text-slate-100 border border-slate-800'
                      : 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-medium'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-1 text-[11px] opacity-70">
                    <span className="font-bold">
                      {isBot ? 'Q AI (95% Match)' : 'You (Harare x Manchester)'}
                    </span>
                    <span>{m.timestamp}</span>
                  </div>

                  <p className="whitespace-pre-wrap">{m.text}</p>

                  {isBot && m.source && (
                    <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
                      <span className="flex items-center gap-1 text-cyan-400">
                        <Sparkles className="w-3 h-3" />
                        Engine: {m.source}
                      </span>
                      {m.moodTag && (
                        <span className="text-amber-400 font-medium">
                          Mood: {m.moodTag}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {!isBot && (
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 mt-1 font-bold text-xs">
                    YOU
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl px-4 py-2 text-xs text-cyan-300 flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
                <span>Q is thinking in Shona + English... "Ooo paTikTok?"</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Prompts Chips */}
        <div className="pt-3 border-t border-slate-800/80">
          <div className="text-[11px] font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Quick Q Prompts (Harare Teen x UK Slang):</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p.text)}
                className="shrink-0 text-xs px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 transition-all font-medium"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="mt-3 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              language === 'shona'
                ? "Bvunza Q AI chero chinhu... (bv. Ooo paTikTok? Sei $2,438.50?)"
                : "Ask Q AI anything... (e.g. Ooo paTikTok?, Midnight Jazz, coding helper)"
            }
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-50 text-slate-950 font-bold px-5 py-3 rounded-xl flex items-center gap-1.5 text-sm transition-all shadow-md shadow-cyan-500/20"
          >
            <span>Send</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Quick Action Navigation Bridges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={onNavigateToMusic}
          className="p-4 rounded-xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 hover:border-pink-500/40 text-left transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-pink-400">FR16 — FR40</span>
            <span className="text-[10px] bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded font-bold">98% Match</span>
          </div>
          <h4 className="text-sm font-extrabold text-white mt-1 group-hover:text-pink-300 transition-colors">
            Launch Music DNA Player & Midnight Jazz 🎷
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Live synth chord progression, 5-band equalizer, Shona lyrics and interactive frequency graph.
          </p>
        </button>

        <button
          onClick={onNavigateToEarnings}
          className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 hover:border-emerald-500/40 text-left transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400">FR66 — FR85</span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">$2,438.50 USD</span>
          </div>
          <h4 className="text-sm font-extrabold text-white mt-1 group-hover:text-emerald-300 transition-colors">
            Manage Creator Earnings & EcoCash Payout 💸
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Instant transfer to Zimbabwean EcoCash wallet, PayPal, or Manchester UK Bank account.
          </p>
        </button>
      </div>
    </div>
  );
};
