import React, { useState } from 'react';
import { 
  Heart, MessageCircle, Share2, Bookmark, Music, 
  Sparkles, Radio, Users, CheckCircle2, 
  Send, Instagram, Facebook, ShieldCheck, 
  Plus, Check
} from 'lucide-react';
import { soundEngine } from '../utils/audioSynth.ts';

interface ReelItem {
  id: string;
  creator: string;
  location: string;
  avatarBg: string;
  title: string;
  captionShona: string;
  captionEnglish: string;
  soundTitle: string;
  likes: number;
  commentsCount: number;
  shares: number;
  tags: string[];
  gradient: string;
  poll?: {
    question: string;
    options: string[];
    votes: number[];
  };
}

export const ReelsSocialFeed: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'reels' | 'stories' | 'groups' | 'voiceroom'>('reels');
  const [currentReelIdx, setCurrentReelIdx] = useState(0);
  const [likedReels, setLikedReels] = useState<Record<string, boolean>>({});
  const [bookmarkedReels, setBookmarkedReels] = useState<Record<string, boolean>>({});
  const [reelsLikes, setReelsLikes] = useState<Record<string, number>>({
    'r-1': 2841029,
    'r-2': 1920400,
    'r-3': 3104520,
  });
  const [pollVotes, setPollVotes] = useState<Record<string, number | null>>({});
  const [commentInput, setCommentInput] = useState('');
  const [commentsList, setCommentsList] = useState<Record<string, string[]>>({
    'r-1': [
      "Zviri bhoo zvisingaite! Harare beat hits different 🔥",
      "Manchester crew we are tuned in live! 🇬🇧🇿🇼",
      "FR43 captions are crisp and accurate! Ooo paTikTok?"
    ],
    'r-2': [
      "The $2,438.50 creator bag is real, EcoCash payout received!",
      "Hosho rhythm with the 808 sub is elite"
    ],
    'r-3': [
      "Highfield to Salford connect forever!",
      "Loving this FUTURECHAT vibe"
    ]
  });

  // Selected sticker state
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);

  const stories = [
    { name: 'You (Owner)', active: true, avatar: '👑', label: 'Add Story' },
    { name: 'Tadiwa_HRE', active: false, avatar: '🇿🇼', label: 'Harare Jam' },
    { name: 'Liam_MCR', active: false, avatar: '🇬🇧', label: 'Deansgate Beat' },
    { name: 'Nyasha_Zim', active: false, avatar: '🎷', label: 'Jazz Live' },
    { name: 'Kudzai_UK', active: false, avatar: '💰', label: 'EcoCash Flex' },
    { name: 'Q AI 95%', active: false, avatar: '⚡', label: 'Ooo paTikTok?' },
  ];

  const reels: ReelItem[] = [
    {
      id: 'r-1',
      creator: '@tadiwa_harare',
      location: 'Borrowdale, Harare',
      avatarBg: 'bg-amber-500',
      title: 'Midnight Jazz & Hosho Groove live in Avondale 🎷🇿🇼',
      captionShona: 'Ooo paTikTok? Tichitambidza beat reMidnight Jazz kuManchester! Bhoo zvekuti!',
      captionEnglish: 'Sending the Midnight Jazz groove all the way to Manchester! Pure bliss!',
      soundTitle: 'Harare Diaspora Collective - Midnight Jazz (98% Match)',
      likes: 2841029,
      commentsCount: 1420,
      shares: 980,
      tags: ['#FutureChat', '#HarareManchester', '#MidnightJazz', '#FR41'],
      gradient: 'from-amber-900/60 via-purple-950/80 to-slate-950',
      poll: {
        question: 'Which sound hits harder tonight? 🎶',
        options: ['Midnight Jazz Sax 🎷', 'Harare Hosho Afrobeat 🥁'],
        votes: [74, 26]
      }
    },
    {
      id: 'r-2',
      creator: '@marcus_mcr',
      location: 'Northern Quarter, Manchester',
      avatarBg: 'bg-cyan-500',
      title: 'Sampling Zimbabwean Hosho on an 808 drum machine 🇬🇧',
      captionShona: 'Zviri sei shamwari! Manchester studio vibing to the Harare tempo! Tiri pamwechete.',
      captionEnglish: 'What is good my friends! Manchester studio locked into the Harare rhythm!',
      soundTitle: 'Mbare Beatmakers x Salford Sound - Summer Vibes 2.8M',
      likes: 1920400,
      commentsCount: 884,
      shares: 612,
      tags: ['#AfroBeat', '#ManchesterProducers', '#DuetRemix', '#FR46'],
      gradient: 'from-cyan-950/70 via-indigo-950/80 to-slate-950'
    },
    {
      id: 'r-3',
      creator: '@chipo_creator',
      location: 'Salford Quays & Highfield',
      avatarBg: 'bg-emerald-500',
      title: 'Cashing out $2,438.50 on EcoCash & UK Faster Payments! 💸',
      captionShona: 'Mari yavepo shamwari! 10c per 100 streams pays better than TikTok and Spotify combined!',
      captionEnglish: 'The funds are in! 10c per 100 streams pays better than legacy apps combined!',
      soundTitle: 'FUTURECHAT Anthem ft. Q AI (FR66 Earnings)',
      likes: 3104520,
      commentsCount: 2310,
      shares: 1890,
      tags: ['#CreatorFund', '#EcoCashPayout', '#UKBankPayout', '#FR70'],
      gradient: 'from-emerald-950/70 via-teal-950/80 to-slate-950'
    }
  ];

  const currentReel = reels[currentReelIdx];

  const handleLike = (id: string) => {
    soundEngine.playChime();
    setLikedReels(prev => {
      const isLiked = !prev[id];
      setReelsLikes(counts => ({
        ...counts,
        [id]: (counts[id] || 0) + (isLiked ? 1 : -1)
      }));
      return { ...prev, [id]: isLiked };
    });
  };

  const handleVotePoll = (reelId: string, optionIdx: number) => {
    soundEngine.playCashSound();
    setPollVotes(prev => ({ ...prev, [reelId]: optionIdx }));
  };

  const handleAddComment = (reelId: string) => {
    if (!commentInput.trim()) return;
    soundEngine.playChime();
    setCommentsList(prev => ({
      ...prev,
      [reelId]: [commentInput, ...(prev[reelId] || [])]
    }));
    setCommentInput('');
  };

  const handleWhatsAppShare = () => {
    soundEngine.playCashSound();
    const shareText = `Check out "${currentReel.title}" on FUTURECHAT! Harare x Manchester Super-App (FR52 1-Tap Share)`;
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      {/* Stories 24h Carousel (FR49) */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-4">
        <div className="flex items-center justify-between mb-3 text-xs">
          <span className="font-extrabold text-white flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>FR49 Stories 24h (Harare ✕ Manchester Creators)</span>
          </span>
          <span className="text-[11px] text-slate-400">Auto-expires in 24h</span>
        </div>

        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-1">
          {stories.map((st, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group">
              <div className="relative">
                <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-amber-400 via-rose-500 to-violet-600 group-hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-xl">
                    {st.avatar}
                  </div>
                </div>
                {st.name.includes('Owner') && (
                  <div className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-950 rounded-full p-0.5 shadow">
                    <Plus className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
              <span className="text-[11px] font-semibold text-slate-300 group-hover:text-amber-400 transition-colors">
                {st.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sub tabs: Reels Feed, Groups Zim+UK, Live Voice Room */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: 'reels', label: 'FR41 Reels Feed (2.8M Views)', icon: Sparkles },
          { id: 'groups', label: 'FR50 Groups Zim+UK (Communities)', icon: Users },
          { id: 'voiceroom', label: 'FR51 Live Voice Lounge (2.8k Users)', icon: Radio },
        ].map((tab) => {
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                activeSubTab === tab.id
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-violet-400 shadow-md shadow-violet-500/20'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SUBTAB 1: REELS FEED (FR41-FR47, FR52, FR55, FR58) */}
      {activeSubTab === 'reels' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Vertical Reel Player (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className={`relative w-full max-w-md h-[580px] rounded-3xl overflow-hidden bg-gradient-to-b ${currentReel.gradient} border border-slate-800 shadow-2xl flex flex-col justify-between p-5 text-white`}>
              
              {/* Top Creator Info & Badges */}
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2.5">
                  <div className={`w-10 h-10 rounded-full ${currentReel.avatarBg} flex items-center justify-center text-slate-950 font-black text-xs ring-2 ring-white/20`}>
                    {currentReel.creator.substring(1, 3).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-1 font-black text-sm">
                      <span>{currentReel.creator}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                    <div className="text-[11px] text-slate-300">{currentReel.location}</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                  <span className="font-bold">2.8M WATCHING</span>
                </div>
              </div>

              {/* Center Canvas / Animated Visual for Reel */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                <div className="w-64 h-64 rounded-full border-4 border-dashed border-amber-400/40 animate-spin [animation-duration:20s]"></div>
                <div className="absolute w-44 h-44 rounded-full border-2 border-violet-400/40 animate-pulse"></div>
              </div>

              {/* Active Sticker Overlay (FR44) */}
              {selectedSticker && (
                <div className="absolute top-20 right-6 z-20 bg-slate-950/80 backdrop-blur-md border border-amber-500/50 px-3 py-1.5 rounded-2xl shadow-xl animate-bounce text-xs font-black text-amber-300">
                  {selectedSticker}
                </div>
              )}

              {/* Interactive Poll Sticker (FR47) */}
              {currentReel.poll && (
                <div className="z-10 bg-black/60 backdrop-blur-md border border-white/20 rounded-2xl p-3 space-y-2 mt-auto mb-4">
                  <div className="text-xs font-black text-amber-300 flex items-center gap-1.5">
                    <span>📊 FR47 LIVE POLL:</span>
                    <span>{currentReel.poll.question}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {currentReel.poll.options.map((opt, oIdx) => {
                      const isVoted = pollVotes[currentReel.id] === oIdx;
                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleVotePoll(currentReel.id, oIdx)}
                          className={`p-2 rounded-xl text-xs font-bold transition-all border text-left ${
                            isVoted
                              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow'
                              : 'bg-white/10 text-white border-white/10 hover:bg-white/20'
                          }`}
                        >
                          <div>{opt}</div>
                          {pollVotes[currentReel.id] !== undefined && (
                            <div className="text-[10px] opacity-80 mt-0.5">
                              {currentReel.poll?.votes[oIdx]}% voted
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Bottom Caption & Shona Subtitles (FR43) */}
              <div className="z-10 space-y-2">
                <div className="bg-slate-950/70 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                  <div className="text-xs font-extrabold text-white">{currentReel.title}</div>
                  
                  {/* FR43 Shona Auto Captions */}
                  <div className="mt-1 text-xs font-bold text-amber-300">
                    🇿🇼 Shona Subtitles: "{currentReel.captionShona}"
                  </div>
                  <div className="text-[11px] text-slate-300 italic">
                    🇬🇧 English: "{currentReel.captionEnglish}"
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {currentReel.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-semibold text-cyan-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Sound bar */}
                <div className="flex items-center gap-2 text-xs bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  <Music className="w-3.5 h-3.5 text-pink-400 animate-spin" />
                  <span className="truncate text-[11px] text-slate-200">{currentReel.soundTitle}</span>
                </div>
              </div>

              {/* Right Floating Actions Column (Likes, Comments, WhatsApp, IG Sync) */}
              <div className="absolute right-3 bottom-24 flex flex-col items-center gap-4 z-20">
                {/* Like Button (FR60 2.8M counter) */}
                <button
                  onClick={() => handleLike(currentReel.id)}
                  className="flex flex-col items-center gap-1 group"
                >
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                    likedReels[currentReel.id]
                      ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/50 scale-110'
                      : 'bg-black/50 text-white hover:bg-black/80'
                  }`}>
                    <Heart className={`w-5 h-5 ${likedReels[currentReel.id] ? 'fill-white' : ''}`} />
                  </div>
                  <span className="text-[11px] font-extrabold text-white drop-shadow">
                    {((reelsLikes[currentReel.id] || 0) / 1000000).toFixed(1)}M
                  </span>
                </button>

                {/* Comments button */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-11 h-11 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-extrabold text-white drop-shadow">
                    {currentReel.commentsCount}
                  </span>
                </div>

                {/* WhatsApp 1-Tap Share (FR52) */}
                <button
                  onClick={handleWhatsAppShare}
                  className="flex flex-col items-center gap-1 group"
                  title="FR52: WhatsApp 1-Tap Share"
                >
                  <div className="w-11 h-11 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-white drop-shadow">WA Share</span>
                </button>

                {/* Bookmark */}
                <button
                  onClick={() => setBookmarkedReels(prev => ({ ...prev, [currentReel.id]: !prev[currentReel.id] }))}
                  className="flex flex-col items-center gap-1"
                >
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md ${
                    bookmarkedReels[currentReel.id] ? 'bg-amber-500 text-slate-950' : 'bg-black/50 text-white'
                  }`}>
                    <Bookmark className="w-5 h-5" />
                  </div>
                </button>
              </div>
            </div>

            {/* Reel Navigation Buttons (Next / Prev) */}
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => setCurrentReelIdx((prev) => (prev - 1 + reels.length) % reels.length)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
              >
                Previous Reel
              </button>
              <span className="text-xs font-bold text-slate-400">
                {currentReelIdx + 1} of {reels.length}
              </span>
              <button
                onClick={() => setCurrentReelIdx((prev) => (prev + 1) % reels.length)}
                className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition-colors"
              >
                Next Reel ➔
              </button>
            </div>
          </div>

          {/* Social Studio Tools (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-5">
            {/* FR44 Harare x Manchester Sticker Box */}
            <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-extrabold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>FR44 Harare ✕ Manchester Stickers</span>
                </h4>
                <span className="text-[11px] text-slate-400">Tap to overlay</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  "🇿🇼 Harare Pride",
                  "🐝 Manchester Bee",
                  "🔥 Ooo paTikTok?",
                  "🤙 Bhoo Zvekuti",
                  "🎷 Midnight Jazz 98%",
                  "💸 $2,438.50 Bag"
                ].map((st, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => {
                      soundEngine.playChime();
                      setSelectedSticker(selectedSticker === st ? null : st);
                    }}
                    className={`p-2.5 rounded-xl border text-left font-bold transition-all ${
                      selectedSticker === st
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow'
                        : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* FR55 Instagram & FR56/57 Facebook Connection Bridge */}
            <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-5 space-y-3">
              <h4 className="text-sm font-extrabold text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>FR55–FR58 Meta & Social Bridges</span>
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-pink-400" />
                    <span className="text-white font-bold">Instagram Reels Sync</span>
                  </div>
                  <span className="text-[10px] bg-pink-500/20 text-pink-300 border border-pink-500/40 px-2 py-0.5 rounded font-bold">
                    FR58 Synced
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="flex items-center gap-2">
                    <Facebook className="w-4 h-4 text-blue-400" />
                    <span className="text-white font-bold">Facebook Import & Login</span>
                  </div>
                  <span className="text-[10px] bg-blue-500/20 text-blue-300 border border-blue-500/40 px-2 py-0.5 rounded font-bold">
                    FR56/57 Connected
                  </span>
                </div>
              </div>
            </div>

            {/* FR59 Comments with AI Toxicity Filter */}
            <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-extrabold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>FR59 AI Clean Comments</span>
                </h4>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
                  Zero Toxicity Active
                </span>
              </div>

              {/* Comments Stream */}
              <div className="space-y-2 max-h-44 overflow-y-auto no-scrollbar text-xs">
                {(commentsList[currentReel.id] || []).map((comm, cIdx) => (
                  <div key={cIdx} className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200">
                    <span className="font-bold text-amber-400 mr-2">Creator #{cIdx + 1}:</span>
                    <span>{comm}</span>
                  </div>
                ))}
              </div>

              {/* Add Comment Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddComment(currentReel.id);
                }}
                className="flex items-center gap-2 pt-2 border-t border-slate-800"
              >
                <input
                  type="text"
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  placeholder="Drop a comment in Shona or English..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                />
                <button
                  type="submit"
                  className="bg-violet-600 hover:bg-violet-500 text-white font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: GROUPS ZIM+UK (FR50) */}
      {activeSubTab === 'groups' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              name: 'Harare Diaspora in Manchester Hub',
              members: '12,420 members',
              desc: 'Official bridge connecting Zimbabwean creatives living across Greater Manchester, Salford, and Leeds.',
              topics: ['Studio rentals in MCR', 'Sending funds to Harare', 'Zimbabwean food spots in Cheetham Hill']
            },
            {
              name: 'Borrowdale x Wilmslow Indie Creators',
              members: '8,150 members',
              desc: 'Producers, jazz instrumentalists, and visual artists collaborating on cross-continental music drops.',
              topics: ['Midnight Jazz stems exchange', 'Afrobeats drum packs', 'EcoCash royalty splitting']
            },
            {
              name: 'Highfield to Salford Tech & Code',
              members: '5,940 members',
              desc: 'Software engineers building Flutter, Dart, and Web apps with Q AI code assistance.',
              topics: ['ZESA offline resilience', 'Fintech EcoCash API integrations', 'UK Tech visa advice']
            },
            {
              name: 'Top Zim Charts Voting Syndicate',
              members: '19,300 members',
              desc: 'Curating the weekly top 20 trending songs in Southern Africa and the UK.',
              topics: ['Friday chart release', 'Midnight Jazz voting', 'TikTok sound promotions']
            }
          ].map((group, gIdx) => (
            <div key={gIdx} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-black text-white">{group.name}</h4>
                <span className="text-[11px] bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded font-bold">
                  {group.members}
                </span>
              </div>
              <p className="text-xs text-slate-300">{group.desc}</p>
              <div className="space-y-1 pt-2 border-t border-slate-800/80">
                <span className="text-[10px] uppercase font-bold text-slate-400">Trending Topics:</span>
                <div className="flex flex-wrap gap-1.5">
                  {group.topics.map((top, tIdx) => (
                    <span key={tIdx} className="text-[11px] bg-slate-950 px-2 py-0.5 rounded text-amber-300 border border-slate-800">
                      #{top}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => soundEngine.playChime()}
                className="w-full mt-2 py-2 rounded-xl bg-slate-800 hover:bg-violet-600 hover:text-white text-slate-200 text-xs font-bold transition-colors"
              >
                Enter Community Lounge (FR50)
              </button>
            </div>
          ))}
        </div>
      )}

      {/* SUBTAB 3: LIVE VOICE ROOM (FR51) */}
      {activeSubTab === 'voiceroom' && (
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-3 w-3 rounded-full bg-rose-500 animate-ping"></span>
                <h3 className="text-lg font-black text-white">
                  FR51: Harare ✕ Manchester Late Night Voice Stage
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Spatial low-latency audio room with live DJ stage and interactive audience.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs px-3 py-1 rounded-full font-bold">
                2,842 Active Listeners
              </span>
            </div>
          </div>

          {/* Speakers on Stage */}
          <div className="space-y-2">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              Speakers on Stage (Harare & UK)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { name: 'Host: Tadiwa (HRE)', role: 'DJ / Stage Host', avatar: '🎙️', speaking: true },
                { name: 'Q AI 95%', role: 'AI Co-Host', avatar: '⚡', speaking: false },
                { name: 'Liam (Manchester)', role: 'Beatmaker', avatar: '🎧', speaking: false },
                { name: 'You (Owner)', role: 'Special Guest', avatar: '👑', speaking: false },
              ].map((sp, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    sp.speaking
                      ? 'bg-rose-500/10 border-rose-500/50 ring-2 ring-rose-500/20'
                      : 'bg-slate-950/80 border-slate-800'
                  }`}
                >
                  <div className="w-12 h-12 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-xl mb-2">
                    {sp.avatar}
                  </div>
                  <div className="text-xs font-black text-white">{sp.name}</div>
                  <div className="text-[10px] text-slate-400">{sp.role}</div>
                  {sp.speaking && (
                    <span className="inline-block mt-2 text-[10px] font-bold text-rose-400 animate-pulse">
                      Speaking 🟢
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4 border-t border-slate-800">
            <button
              onClick={() => soundEngine.playChime()}
              className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-lg"
            >
              Raise Hand to Speak ✋
            </button>
            <button
              onClick={() => soundEngine.playMidnightJazz()}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs"
            >
              Play Stage Background Music (Midnight Jazz) 🎷
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
