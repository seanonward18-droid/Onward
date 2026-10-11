export interface FeatureItem {
  id: number;
  code: string;
  name: string;
  category: 'q_ai' | 'music_dna' | 'reels_social' | 'earnings' | 'safety_tech' | 'play_store';
  description: string;
  badge?: string;
  highlights?: string[];
}

export const CATEGORIES = [
  { id: 'all', name: 'All 105 Features', icon: 'Sparkles', color: 'text-amber-400' },
  { id: 'q_ai', name: 'Q AI Engine (1-15)', icon: 'Bot', color: 'text-cyan-400' },
  { id: 'music_dna', name: 'Music DNA (16-40)', icon: 'Music', color: 'text-pink-400' },
  { id: 'reels_social', name: 'Reels & Social (41-65)', icon: 'Video', color: 'text-violet-400' },
  { id: 'earnings', name: 'Earnings $2,438.50 (66-85)', icon: 'DollarSign', color: 'text-emerald-400' },
  { id: 'safety_tech', name: 'Safety & Spacetalk (86-100)', icon: 'Shield', color: 'text-blue-400' },
  { id: 'play_store', name: 'Play Store Ready (101-105)', icon: 'CheckCircle2', color: 'text-amber-300' },
] as const;

export const ALL_105_FEATURES: FeatureItem[] = [
  // Q AI (1-15)
  {
    id: 1,
    code: 'FR1',
    name: 'Q AI Chat 95% Match',
    category: 'q_ai',
    description: 'Conversational assistant with 95% contextual matching, trained on Harare x Manchester youth culture.',
    badge: '95% Match',
    highlights: ['Gemini 3.8 Flash integrated', 'Ultra-fast inference', 'Dual diaspora slang']
  },
  {
    id: 2,
    code: 'FR2',
    name: 'Shona+English 50 Langs',
    category: 'q_ai',
    description: 'Fluid code-switching between ChiShona, English, Ndebele and 50 global languages with dialect nuance.',
    badge: 'Polyglot',
    highlights: ['Natural Shona urban phrasing', 'UK Manchester vernacular', 'Grammar auto-tuning']
  },
  {
    id: 3,
    code: 'FR3',
    name: 'Context Memory',
    category: 'q_ai',
    description: 'Long-term session memory remembering your music tastes, earnings milestones, and favorite slang.',
    badge: 'Memory Active',
    highlights: ['Multi-turn session cache', 'User preference graph', 'Zero data leak']
  },
  {
    id: 4,
    code: 'FR4',
    name: 'Code Helper',
    category: 'q_ai',
    description: 'Instant full-stack debugging, Flutter/Dart code generator, React/TypeScript algorithms helper.',
    badge: 'Dev Pro',
    highlights: ['Dart/Flutter specialist', 'Algorithm solver', 'Clean code review']
  },
  {
    id: 5,
    code: 'FR5',
    name: 'Study Buddy',
    category: 'q_ai',
    description: 'Curriculum-aligned assistant for ZIMSEC, Cambridge O/A-Levels, and UK GCSE study sessions.',
    badge: 'ZIMSEC/UK',
    highlights: ['Flashcards generator', 'Formula breakdown', 'Past papers guide']
  },
  {
    id: 6,
    code: 'FR6',
    name: 'Voice Chat',
    category: 'q_ai',
    description: 'Real-time two-way voice synthesis with warm Harare teen intonation and expressive voice cues.',
    badge: 'Web Audio Speech',
    highlights: ['Text-to-speech audio', 'Voice pitch modulator', 'Hands-free mode']
  },
  {
    id: 7,
    code: 'FR7',
    name: 'Homework Solver',
    category: 'q_ai',
    description: 'Step-by-step problem solver for STEM, literature, history, and commerce homework questions.',
    badge: 'Step-by-Step',
    highlights: ['Math solver', 'Science concepts', 'Detailed explanations']
  },
  {
    id: 8,
    code: 'FR8',
    name: 'Essay Writer',
    category: 'q_ai',
    description: 'Structured essay brainstorming, outline generator, and vocabulary enhancer for students.',
    badge: 'Academic',
    highlights: ['Theses formulation', 'Citation suggestions', 'Plagiarism-safe outlines']
  },
  {
    id: 9,
    code: 'FR9',
    name: 'Quiz Generator',
    category: 'q_ai',
    description: 'Dynamic trivia and knowledge tests covering music, African history, technology, and pop culture.',
    badge: 'Interactive',
    highlights: ['Instant scoring', 'Timed challenges', 'Leaderboard points']
  },
  {
    id: 10,
    code: 'FR10',
    name: 'Mood Detector',
    category: 'q_ai',
    description: 'Real-time sentimental analysis adapting Q personality and music playback to current user mood.',
    badge: 'Sentiment AI',
    highlights: ['Tone calibration', 'Empathy triggers', 'Vibe synchronization']
  },
  {
    id: 11,
    code: 'FR11',
    name: 'Auto-Translate',
    category: 'q_ai',
    description: 'Instant bidirectional translations between Shona slang and British English for diaspora connections.',
    badge: 'Dual Dialect',
    highlights: ['Idiomatic accuracy', 'Cultural slang bridge', '1-tap clipboard']
  },
  {
    id: 12,
    code: 'FR12',
    name: 'Personality 95%',
    category: 'q_ai',
    description: 'Authentic Harare teen personality: says "Ooo paTikTok?", "Zviri sei shamwari", friendly 15+ tone.',
    badge: 'Harare Teen',
    highlights: ['Signature catchphrases', 'Positive energy', 'Safe teen companionship']
  },
  {
    id: 13,
    code: 'FR13',
    name: 'Midnight Jazz Recommender',
    category: 'q_ai',
    description: 'Curates ultra-chill late night jazz fusion playlists tailored for late night coding or studying.',
    badge: 'Jazz Engine',
    highlights: ['Tempo matching', 'Sax & Rhodes balance', 'Night focus mode']
  },
  {
    id: 14,
    code: 'FR14',
    name: 'Friendly Filter Tumira pic block',
    category: 'q_ai',
    description: 'Automated privacy shield detecting and blocking unverified stranger requests asking for pictures.',
    badge: 'Privacy Shield',
    highlights: ['Anti-grooming guard', 'Automated red flag alert', 'Parent ping option']
  },
  {
    id: 15,
    code: 'FR15',
    name: 'Offline Q for ZESA',
    category: 'q_ai',
    description: 'Local edge cache powering essential Q AI assistant responses even during Harare ZESA load shedding.',
    badge: 'ZESA Resilient',
    highlights: ['Local heuristic cache', 'Zero data needed', 'Battery saver profile']
  },

  // Music DNA (16-40)
  {
    id: 16,
    code: 'FR16',
    name: 'Music DNA 98% Match',
    category: 'music_dna',
    description: 'Acoustic fingerprinting engine calculating a 98% harmonic compatibility score with your taste profile.',
    badge: '98% Compatibility',
    highlights: ['Harmonic analysis', 'Spectral profiling', 'Adaptive playlisting']
  },
  {
    id: 17,
    code: 'FR17',
    name: 'Midnight Jazz Engine',
    category: 'music_dna',
    description: 'Generative and streaming smooth jazz channel blending Manchester rainy streets with Harare warmth.',
    badge: 'Signature Sound',
    highlights: ['432Hz tuning option', 'Mellow Rhodes piano', 'Live interactive synth']
  },
  {
    id: 18,
    code: 'FR18',
    name: 'Summer Vibes 2.8M',
    category: 'music_dna',
    description: 'Afro-fusion anthem charting at 2.8M streams across Southern Africa and UK diaspora communities.',
    badge: '2.8M Streams',
    highlights: ['Uptempo 112 BPM', 'Acoustic mbira accents', 'Summer playlist leader']
  },
  {
    id: 19,
    code: 'FR19',
    name: 'Chill Night Drive 4.1M',
    category: 'music_dna',
    description: 'Atmospheric synthwave and mellow jazz hit with 4.1 million plays, engineered for night travels.',
    badge: '4.1M Plays',
    highlights: ['Deep sub-bass', 'Stereo imaging', 'Night mode audio']
  },
  {
    id: 20,
    code: 'FR20',
    name: 'AI Compose',
    category: 'music_dna',
    description: 'Neural track composition engine generating chords, drum patterns, and instrumental bridges in seconds.',
    badge: 'Gemini Composer',
    highlights: ['Multi-genre synthesis', 'MIDI & audio export', 'Instant stems preview']
  },
  {
    id: 21,
    code: 'FR21',
    name: 'Beat Generator',
    category: 'music_dna',
    description: 'Interactive drum machine with kick, snare, hi-hat, 808 sub, and Zimbabwean shakers (hosho).',
    badge: 'WebAudio Synth',
    highlights: ['Step sequencer', 'Hosho shaker swing', 'BPM control (80-140)']
  },
  {
    id: 22,
    code: 'FR22',
    name: 'Lyric Writer Shona',
    category: 'music_dna',
    description: 'Smart lyricist generating rhymes, metaphors, and storytelling verses blending ChiShona and English.',
    badge: 'Poetry AI',
    highlights: ['Rhyme scheme lock', 'Zim folklore themes', 'Hook generator']
  },
  {
    id: 23,
    code: 'FR23',
    name: 'Vocal FX',
    category: 'music_dna',
    description: 'Digital audio DSP effects: warm tape saturation, telephone filter, reverb space, and robotic vocoder.',
    badge: 'DSP Studio',
    highlights: ['Reverb & Delay', 'Pitch contouring', 'Real-time preview']
  },
  {
    id: 24,
    code: 'FR24',
    name: 'Music Room 2.8M',
    category: 'music_dna',
    description: 'Virtual synchronized listening lounge hosting 2.8k simultaneous listeners across Harare and the UK.',
    badge: '2.8k In Room',
    highlights: ['Synchronized playback', 'Live chat reactions', 'DJ queue voting']
  },
  {
    id: 25,
    code: 'FR25',
    name: 'Play All',
    category: 'music_dna',
    description: 'Continuous gapless playback queue managing continuous streams across all FUTURECHAT playlists.',
    badge: 'Gapless',
    highlights: ['Crossfade support', 'Zero buffer lag', 'Smart queue']
  },
  {
    id: 26,
    code: 'FR26',
    name: 'Share to IG Story',
    category: 'music_dna',
    description: 'One-tap custom animated story card generator with track artwork, sound waves, and user profile tag.',
    badge: 'Social Export',
    highlights: ['9:16 Story format', 'Dynamic audio wave', 'Clickable bio link']
  },
  {
    id: 27,
    code: 'FR27',
    name: 'Download Offline',
    category: 'music_dna',
    description: 'Secure client-side encrypted caching for 100% offline playback when traveling or without electricity.',
    badge: 'Encrypted Cache',
    highlights: ['Lossless audio cache', 'Storage optimizer', 'Offline player']
  },
  {
    id: 28,
    code: 'FR28',
    name: 'Equalizer',
    category: 'music_dna',
    description: 'Interactive 5-band parametric equalizer (60Hz, 250Hz, 1kHz, 4kHz, 14kHz) with custom presets.',
    badge: '5-Band EQ',
    highlights: ['Bass Boost preset', 'Jazz Warmth preset', 'Live BiquadFilter']
  },
  {
    id: 29,
    code: 'FR29',
    name: 'Sleep Timer',
    category: 'music_dna',
    description: 'Intelligent fade-out timer (15m, 30m, 45m, 60m) gently tapering volume for restful sleep.',
    badge: 'Smart Fade',
    highlights: ['Gradual dB decrease', 'Auto app standby', 'Low battery shutoff']
  },
  {
    id: 30,
    code: 'FR30',
    name: 'Karaoke Mode',
    category: 'music_dna',
    description: 'Synchronized real-time lyric highlighting with pitch-guide visualization for singing along.',
    badge: 'Sing Along',
    highlights: ['Word-by-word sync', 'Instrumental toggle', 'Vocal pitch guide']
  },
  {
    id: 31,
    code: 'FR31',
    name: 'Duet Remix',
    category: 'music_dna',
    description: 'Split-track remixing tool allowing creators to overlay their own verses or instrumental covers.',
    badge: 'Collab Audio',
    highlights: ['Multi-track mixer', 'Gain staging', 'Instant community publish']
  },
  {
    id: 32,
    code: 'FR32',
    name: 'Sound DNA Graph',
    category: 'music_dna',
    description: 'Multi-dimensional radar & spectrum visualizer plotting Rhythm, Energy, Melody, Valence, and Soul.',
    badge: 'Visualizer',
    highlights: ['Real-time 60fps canvas', 'Acoustic radar', 'Bio-acoustic match']
  },
  {
    id: 33,
    code: 'FR33',
    name: 'Top Zim Charts',
    category: 'music_dna',
    description: 'Official top 20 trending chart ranking the biggest songs in Zimbabwe and the diaspora each week.',
    badge: 'Top 20 Chart',
    highlights: ['Verified stream counts', 'Weekly movements', 'Underground spotlights']
  },
  {
    id: 34,
    code: 'FR34',
    name: 'Lyrics Display',
    category: 'music_dna',
    description: 'Full verified lyrics in Shona and English with cultural footnotes and slang translations.',
    badge: 'Annotated',
    highlights: ['Cultural annotations', 'Copy lyric quote', 'Artist verified']
  },
  {
    id: 35,
    code: 'FR35',
    name: 'Music AI 95% Matching',
    category: 'music_dna',
    description: 'Algorithm pairing friends and creators based on overlapping Music DNA and listening histories.',
    badge: 'Social Match',
    highlights: ['Friend compatibility', 'Shared listening party', 'Taste discovery']
  },
  {
    id: 36,
    code: 'FR36',
    name: 'Lo-Fi Chill Mix',
    category: 'music_dna',
    description: 'Continuous mellow beats with rain textures, vinyl crackle, and soothing acoustic guitar riffs.',
    badge: 'Study Vibe',
    highlights: ['Rain & vinyl FX', 'Endless loop', 'Zero distraction']
  },
  {
    id: 37,
    code: 'FR37',
    name: 'TikTok Music Import',
    category: 'music_dna',
    description: 'Instant metadata detector importing trending audio clips and sounds straight from TikTok.',
    badge: 'Trend Import',
    highlights: ['Sound extraction', 'BPM sync', 'Hashtag correlation']
  },
  {
    id: 38,
    code: 'FR38',
    name: 'Spotify Link',
    category: 'music_dna',
    description: 'Deep link bridge allowing two-way playlist syncing and artist profile verification with Spotify.',
    badge: 'Streaming Bridge',
    highlights: ['Deep link URI', 'Profile badge sync', 'External library link']
  },
  {
    id: 39,
    code: 'FR39',
    name: 'Mood Playlist',
    category: 'music_dna',
    description: 'Instant playlist generation according to tags: "Chill Sunday", "Late Night Harare", "Manchester Rain", "Study Focus".',
    badge: 'Smart Tags',
    highlights: ['Dynamic curation', '1-tap shuffle', 'Auto cover art']
  },
  {
    id: 40,
    code: 'FR40',
    name: 'Concert Finder',
    category: 'music_dna',
    description: 'Live event radar highlighting upcoming gigs, jazz jams, and festivals in Harare (HICC) & Manchester (AO Arena).',
    badge: 'Gig Radar',
    highlights: ['Harare & UK venues', 'Ticket alerts', 'Diaspora meetups']
  },

  // Reels + Social + IG/FB (41-65)
  {
    id: 41,
    code: 'FR41',
    name: 'Reels Short Video 2.8M',
    category: 'reels_social',
    description: 'Vertical video feed featuring 2.8M creator clips with smooth swipe, sound overlays, and instant likes.',
    badge: '2.8M Feed',
    highlights: ['60fps vertical feed', 'Double tap like animation', 'Sound attribution']
  },
  {
    id: 42,
    code: 'FR42',
    name: 'AI Cuts Auto',
    category: 'reels_social',
    description: 'Smart video editor that detects beat drops and pauses, automatically trimming clips for high engagement.',
    badge: 'Smart Cut',
    highlights: ['Beat drop detection', 'Silent gap trimmer', 'Action highlights']
  },
  {
    id: 43,
    code: 'FR43',
    name: 'Auto Captions Shona',
    category: 'reels_social',
    description: 'Automatic speech-to-text generating animated subtitles with Shona slang and English phonetic accuracy.',
    badge: 'Subtitles',
    highlights: ['Karaoke font style', 'Shona spelling dictionary', 'Custom caption colors']
  },
  {
    id: 44,
    code: 'FR44',
    name: 'Stickers',
    category: 'reels_social',
    description: 'Exclusive Harare x Manchester sticker pack: Zim flag, Jacaranda bloom, Manchester Bee, "Bhoo Zvekuti", "Ooo paTikTok?".',
    badge: 'Sticker Pack',
    highlights: ['Pinch-to-resize', 'Animated GIF stickers', 'Custom text stickers']
  },
  {
    id: 45,
    code: 'FR45',
    name: 'Trend Detector',
    category: 'reels_social',
    description: 'Viral hashtag and audio radar forecasting trending challenges before they peak on mainstream networks.',
    badge: 'Viral Radar',
    highlights: ['Velocity tracking', 'Top trending sounds', 'Creator tip alerts']
  },
  {
    id: 46,
    code: 'FR46',
    name: 'Collab Remix',
    category: 'reels_social',
    description: 'Side-by-side stitch or audio remix tool enabling seamless creator duets across continents.',
    badge: 'Duet / Stitch',
    highlights: ['Split screen layout', 'Audio mix balance', 'Shared attribution']
  },
  {
    id: 47,
    code: 'FR47',
    name: 'Polls Voting',
    category: 'reels_social',
    description: 'Interactive overlay stickers with real-time percentage counts for audience questions and debates.',
    badge: 'Live Polls',
    highlights: ['Instant percentage calc', 'Haptic feedback', 'Result breakdown']
  },
  {
    id: 48,
    code: 'FR48',
    name: 'All-in-One Feed',
    category: 'reels_social',
    description: 'Unified stream merging reels, text updates, music releases, and group discussions into one sleek feed.',
    badge: 'Unified',
    highlights: ['Multi-format cards', 'Smart sorting', 'Zero ad clutter']
  },
  {
    id: 49,
    code: 'FR49',
    name: 'Stories 24h',
    category: 'reels_social',
    description: 'Ephemeral 24-hour video and photo updates with viewer list, emoji reactions, and reply threading.',
    badge: 'Ephemeral',
    highlights: ['Auto expiry after 24h', 'Ring avatar gradients', 'Story reactions']
  },
  {
    id: 50,
    code: 'FR50',
    name: 'Groups Zim+UK',
    category: 'reels_social',
    description: 'Dedicated community hubs uniting Harare diaspora in Manchester, Leeds, Birmingham with homeland youth.',
    badge: 'Community',
    highlights: ['Highfield to Salford hub', 'Study & Visa tips', 'Diaspora sports talks']
  },
  {
    id: 51,
    code: 'FR51',
    name: 'Live Voice Room',
    category: 'reels_social',
    description: 'Drop-in audio rooms featuring interactive speaker stage, listener audience, and background music playback.',
    badge: 'Voice Stage',
    highlights: ['Speaker hand raise', 'Spatial audio room', 'Host moderation controls']
  },
  {
    id: 52,
    code: 'FR52',
    name: 'WhatsApp 1-Tap Share',
    category: 'reels_social',
    description: 'Instant compression and direct link generation optimized for Zimbabwean WhatsApp group forwarding.',
    badge: '1-Tap WhatsApp',
    highlights: ['Low-bandwidth preview', 'Direct api link', 'Status format support']
  },
  {
    id: 53,
    code: 'FR53',
    name: 'Single Login FutureChat ID',
    category: 'reels_social',
    description: 'Universal decentralized creator identifier linking chat, earnings wallet, and social graph.',
    badge: 'FC-ID',
    highlights: ['Unified credentials', 'Profile badges', 'One-click auth']
  },
  {
    id: 54,
    code: 'FR54',
    name: 'Creator Studio',
    category: 'reels_social',
    description: 'Analytics suite tracking reach, audience retention, earnings per reel, and listener demographics.',
    badge: 'Analytics',
    highlights: ['Audience retention graph', 'Peak hour insights', 'Monetization metrics']
  },
  {
    id: 55,
    code: 'FR55',
    name: 'Connect Instagram',
    category: 'reels_social',
    description: 'Native bridge connecting your Instagram account for cross-posting and story sharing.',
    badge: 'IG Bridge',
    highlights: ['Follower cross-sync', 'Story mirroring', 'Verified link']
  },
  {
    id: 56,
    code: 'FR56',
    name: 'Import from Facebook',
    category: 'reels_social',
    description: 'Seamless media importer syncing photo albums, video archives, and Facebook pages directly into FUTURECHAT.',
    badge: 'FB Import',
    highlights: ['Batch media import', 'Post caption preservation', 'Page sync']
  },
  {
    id: 57,
    code: 'FR57',
    name: 'Facebook Login',
    category: 'reels_social',
    description: 'Fast social authentication provider allowing 1-click onboarding for users with existing Facebook profiles.',
    badge: 'Social Auth',
    highlights: ['Secure token handshake', 'Instant avatar import', 'Zero password fatigue']
  },
  {
    id: 58,
    code: 'FR58',
    name: 'IG Reels Sync',
    category: 'reels_social',
    description: 'Automated background synchronization publishing FUTURECHAT reels directly to Instagram Reels.',
    badge: 'Auto Sync',
    highlights: ['Aspect ratio matching', 'Hashtag bridge', 'Duplicate detection']
  },
  {
    id: 59,
    code: 'FR59',
    name: 'Comments AI Filter',
    category: 'reels_social',
    description: 'Real-time hate speech, cyberbullying, and spam filter maintaining uplifting and productive comment sections.',
    badge: 'Zero Toxicity',
    highlights: ['Harare slang profanity filter', 'Auto shadow-ban spammers', 'Kindness booster']
  },
  {
    id: 60,
    code: 'FR60',
    name: 'Likes 2.8M Counter',
    category: 'reels_social',
    description: 'High-throughput optimistic counter displaying verified like milestones with particle celebrations.',
    badge: '2.8M Likes',
    highlights: ['Optimistic UI update', 'Heart burst particles', 'Milestone badges']
  },
  {
    id: 61,
    code: 'FR61',
    name: 'Following Feed',
    category: 'reels_social',
    description: 'Pure chronological stream without algorithmic manipulation, showing only creators you actively follow.',
    badge: 'Chronological',
    highlights: ['No algorithmic bias', 'Real-time freshness', 'Catch up indicator']
  },
  {
    id: 62,
    code: 'FR62',
    name: 'Discover Page',
    category: 'reels_social',
    description: 'Curated explore grid surfacing breakout musicians, witty storytellers, and tech innovators.',
    badge: 'Explore Grid',
    highlights: ['Masonry feed', 'Trending spotlight', 'Category tabs']
  },
  {
    id: 63,
    code: 'FR63',
    name: 'Search',
    category: 'reels_social',
    description: 'Instant global search indexing hashtags, audio tracks, creators, Harare locations, and UK spots.',
    badge: 'Omni-Search',
    highlights: ['Fuzzy text search', 'Audio-first search', 'Recent searches cache']
  },
  {
    id: 64,
    code: 'FR64',
    name: 'Notifications',
    category: 'reels_social',
    description: 'Smart grouped alert inbox for stream royalties, reel comments, duet invites, and friend messages.',
    badge: 'Smart Alerts',
    highlights: ['Categorized trays', 'Sound & badge preview', 'Quiet hours schedule']
  },
  {
    id: 65,
    code: 'FR65',
    name: 'Direct Messages',
    category: 'reels_social',
    description: 'End-to-end encrypted messaging with voice notes, media sharing, and Q AI inline assistance.',
    badge: 'Encrypted DM',
    highlights: ['Voice message waveform', 'Typing indicator', 'Tumira pic shield active']
  },

  // Earnings (66-85)
  {
    id: 66,
    code: 'FR66',
    name: 'Earnings $2,438.50 Dashboard',
    category: 'earnings',
    description: 'Master financial overview displaying your active balance of $2,438.50 USD with real-time stream breakdown.',
    badge: '$2,438.50 USD',
    highlights: ['Live balance display', 'Currency conversion toggle', 'Weekly growth metric']
  },
  {
    id: 67,
    code: 'FR67',
    name: 'Token Rewards',
    category: 'earnings',
    description: 'In-app utility tokens awarded for active engagement, listening streaks, and quality community comments.',
    badge: 'FC Tokens',
    highlights: ['Daily streak bonus', 'Redeemable for gifts', 'Gamified milestones']
  },
  {
    id: 68,
    code: 'FR68',
    name: 'Ad Revenue 50/50',
    category: 'earnings',
    description: 'Equal 50/50 creator split on all banner and sponsorship impressions placed across your media.',
    badge: '50/50 Split',
    highlights: ['Transparent ledger', 'Real-time impression log', 'Higher than TikTok rates']
  },
  {
    id: 69,
    code: 'FR69',
    name: 'Creator NFT Cert',
    category: 'earnings',
    description: 'Cryptographically signed ownership deed validating you as the official owner of this FUTURECHAT applet.',
    badge: 'Ownership Key',
    highlights: ['Harare x Manchester seal', 'Immutable hash', 'Downloadable certificate']
  },
  {
    id: 70,
    code: 'FR70',
    name: 'EcoCash Payout',
    category: 'earnings',
    description: 'Direct payout integration transferring your funds straight into Zimbabwean EcoCash USD/ZiG mobile wallets.',
    badge: 'EcoCash Zim',
    highlights: ['Instant mobile transfer', 'Zero foreign exchange cut', 'Direct phone number verification']
  },
  {
    id: 71,
    code: 'FR71',
    name: 'PayPal Payout',
    category: 'earnings',
    description: 'Global electronic settlement allowing instant transfers to verified PayPal accounts worldwide.',
    badge: 'PayPal Global',
    highlights: ['Global currency support', 'Automated email confirmation', 'Low withdrawal threshold']
  },
  {
    id: 72,
    code: 'FR72',
    name: 'UK Bank Payout',
    category: 'earnings',
    description: 'Direct Faster Payments routing to UK bank accounts (Sort Code & Account Number) in Manchester & Britain.',
    badge: 'UK Faster Pay',
    highlights: ['GBP settlement', 'Sort Code verification', 'Zero diaspora transfer fees']
  },
  {
    id: 73,
    code: 'FR73',
    name: 'Referral $0.50',
    category: 'earnings',
    description: 'Earn $0.50 credited immediately to your balance for every new verified creator invited with your code.',
    badge: '$0.50 / Invite',
    highlights: ['Custom referral link', 'Live invite tracking', 'Instant wallet credit']
  },
  {
    id: 74,
    code: 'FR74',
    name: 'Task Wall $0.05',
    category: 'earnings',
    description: 'Micro-task wall paying $0.05 to $0.50 for beta feedback, music rating, and bug finding.',
    badge: 'Micro Earnings',
    highlights: ['5-minute tasks', 'Instant credit', 'Daily new tasks']
  },
  {
    id: 75,
    code: 'FR75',
    name: '10c per 100 Streams',
    category: 'earnings',
    description: 'Fair streaming rate guaranteeing $0.10 for every 100 plays on your original tracks and beats.',
    badge: '$0.10 / 100 Streams',
    highlights: ['3x higher than legacy platforms', 'Verified audio plays', 'Continuous payout']
  },
  {
    id: 76,
    code: 'FR76',
    name: 'Weekly Payout',
    category: 'earnings',
    description: 'Automated Friday disbursements sending accumulated royalties directly to your designated payout channel.',
    badge: 'Every Friday',
    highlights: ['Zero manual request needed', 'Email receipt', 'Reliable processing']
  },
  {
    id: 77,
    code: 'FR77',
    name: 'Student Creator Fund',
    category: 'earnings',
    description: 'Subsidized grants and equipment stipends specifically reserved for high school and university creators.',
    badge: 'Student Grant',
    highlights: ['ZIMSEC & UK university eligibility', 'Equipment stipend', 'Zero debt']
  },
  {
    id: 78,
    code: 'FR78',
    name: 'Gifts 16+',
    category: 'earnings',
    description: 'Virtual tipping system allowing verified viewers aged 16 and above to send animated gifts during live rooms.',
    badge: 'Safe Tipping',
    highlights: ['Animated gift effects', 'Creator revenue cut', 'Strict 16+ protection']
  },
  {
    id: 79,
    code: 'FR79',
    name: 'Diamonds',
    category: 'earnings',
    description: 'Prestige loyalty asset convertible into USD cash balance or redeemable for VIP studio features.',
    badge: 'Diamond Asset',
    highlights: ['Fixed exchange rate', 'Profile crown status', 'Exclusive sound access']
  },
  {
    id: 80,
    code: 'FR80',
    name: 'Withdraw 18+',
    category: 'earnings',
    description: 'Legally compliant withdrawal gate with KYC verification ensuring funds are withdrawn by creators 18+ or guardians.',
    badge: 'KYC Verified',
    highlights: ['Guardian approval pathway', 'ID verification', 'Anti-fraud audit']
  },
  {
    id: 81,
    code: 'FR81',
    name: 'Transaction History',
    category: 'earnings',
    description: 'Itemized financial ledger displaying every stream royalty, referral reward, and EcoCash cashout.',
    badge: 'Audit Ledger',
    highlights: ['Downloadable CSV', 'Filter by method', 'Timestamped entries']
  },
  {
    id: 82,
    code: 'FR82',
    name: 'Tax Report ZIMRA',
    category: 'earnings',
    description: 'Automated tax summary export tailored for Zimbabwe Revenue Authority (ZIMRA) and HMRC UK filings.',
    badge: 'ZIMRA & HMRC',
    highlights: ['Official PDF format', 'Annual deductible breakdown', 'Compliance certified']
  },
  {
    id: 83,
    code: 'FR83',
    name: 'Sponsor Deals',
    category: 'earnings',
    description: 'Direct marketplace connecting creators with brands in Harare (Econet, Delta) and Manchester businesses.',
    badge: 'Brand Marketplace',
    highlights: ['Standard rate cards', 'Escrow contract safety', 'Direct pitch portal']
  },
  {
    id: 84,
    code: 'FR84',
    name: 'Brand Collab',
    category: 'earnings',
    description: 'Contract management workspace for sponsored reels, joint audio campaigns, and product placements.',
    badge: 'Contracts',
    highlights: ['E-signature workflow', 'Milestone tracking', 'Performance guarantee']
  },
  {
    id: 85,
    code: 'FR85',
    name: 'Budget Tracker',
    category: 'earnings',
    description: 'Personal finance planner calculating studio expenses, music production costs, and net creator profits.',
    badge: 'Finance Tool',
    highlights: ['Profit margin graph', 'Savings goal meter', 'Monthly budget caps']
  },

  // Safety + Spacetalk + Tech (86-100)
  {
    id: 86,
    code: 'FR86',
    name: 'Age Gate 13+/16+/18+ like Spacetalk',
    category: 'safety_tech',
    description: 'Multi-tiered content and feature gating inspired by Spacetalk safety standards, with guardian pairing.',
    badge: 'Spacetalk Grade',
    highlights: ['13+ Teen zone', '16+ Social zone', '18+ Financial zone']
  },
  {
    id: 87,
    code: 'FR87',
    name: 'Parent Mode',
    category: 'safety_tech',
    description: 'PIN-protected guardian controls restricting late night screen time, stranger DMs, and financial limits.',
    badge: 'Guardian Lock',
    highlights: ['4-digit secure PIN', 'Curfew lock', 'Safe contact whitelist']
  },
  {
    id: 88,
    code: 'FR88',
    name: 'No Stranger Pics Block',
    category: 'safety_tech',
    description: 'Automated computer vision filter instantly blocking photo exchange with unverified or unfamiliar accounts.',
    badge: 'Zero Stranger Media',
    highlights: ['Neural image quarantine', 'Sender warning', 'Immediate report log']
  },
  {
    id: 89,
    code: 'FR89',
    name: 'Content Moderation',
    category: 'safety_tech',
    description: 'Dual layer of AI inspection and human verification reviewing public feeds and live broadcast rooms.',
    badge: '24/7 Shield',
    highlights: ['Zero tolerance bullying', 'Automated redacting', 'Community appeal flow']
  },
  {
    id: 90,
    code: 'FR90',
    name: 'Harm Detector',
    category: 'safety_tech',
    description: 'Predictive safety neural net identifying self-harm, emotional distress, or dangerous viral stunts.',
    badge: 'Care Net',
    highlights: ['Warm intervention prompts', 'Harare & UK helpline triggers', 'Support resources']
  },
  {
    id: 91,
    code: 'FR91',
    name: 'Privacy Shield',
    category: 'safety_tech',
    description: 'Zero third-party tracking cookies or ad network telemetry; user data stays encrypted in memory.',
    badge: 'Zero Telemetry',
    highlights: ['End-to-end encryption', 'No tracker cookies', 'User-owned keys']
  },
  {
    id: 92,
    code: 'FR92',
    name: 'Bias Filter',
    category: 'safety_tech',
    description: 'Algorithmic neutrality engine preventing regional, ethnic, or socioeconomic bias in feed recommendations.',
    badge: 'Ethical AI',
    highlights: ['Balanced exposure', 'Cultural neutrality', 'Audited algorithms']
  },
  {
    id: 93,
    code: 'FR93',
    name: 'Accessibility Voiceover',
    category: 'safety_tech',
    description: 'Full screen reader audio descriptions and high-contrast typography for visually impaired creators.',
    badge: 'A11y Pro',
    highlights: ['Semantic ARIA support', 'Audio description of cards', 'High contrast toggle']
  },
  {
    id: 94,
    code: 'FR94',
    name: 'Edge AI',
    category: 'safety_tech',
    description: 'Lightweight client-side inference executing mood detection, filtering, and synthesis right on device.',
    badge: 'Edge Runtime',
    highlights: ['Sub-10ms response', 'Zero cloud egress', 'Conserves mobile data']
  },
  {
    id: 95,
    code: 'FR95',
    name: 'Cross-Platform SDK',
    category: 'safety_tech',
    description: 'Universal Flutter / React code architecture running smoothly on Android, iOS, and modern Web browsers.',
    badge: 'Universal SDK',
    highlights: ['Flutter/Dart parity', 'Web responsive', 'Unified state manager']
  },
  {
    id: 96,
    code: 'FR96',
    name: 'Cloud Sync',
    category: 'safety_tech',
    description: 'Automatic encrypted background synchronization keeping your balance, draft tracks, and chat history aligned.',
    badge: 'Auto Cloud',
    highlights: ['Conflict-free sync', 'Differential delta updates', 'Low data usage']
  },
  {
    id: 97,
    code: 'FR97',
    name: 'Offline Mode for ZESA',
    category: 'safety_tech',
    description: 'Emergency offline architecture designed for Zimbabwe power cuts — keeps all 105 features operational.',
    badge: 'ZESA Resilient',
    highlights: ['Local IndexedDB cache', 'Battery saver mode', 'Zero connection needed']
  },
  {
    id: 98,
    code: 'FR98',
    name: 'Low-Latency Streaming',
    category: 'safety_tech',
    description: 'Custom WebRTC & audio compression protocol delivering real-time voice and music with under 80ms latency.',
    badge: '<80ms Latency',
    highlights: ['Adaptive bitrate', 'Packet loss concealment', 'Buffer-free stream']
  },
  {
    id: 99,
    code: 'FR99',
    name: 'SOS Button',
    category: 'safety_tech',
    description: 'Instant emergency trigger with 1-tap geolocation dispatching emergency alerts to pre-saved guardians in Harare & UK.',
    badge: 'Emergency SOS',
    highlights: ['Instant GPS broadcast', 'Harare 999 & UK 999 hotlines', 'Loud alarm strobe option']
  },
  {
    id: 100,
    code: 'FR100',
    name: 'Open Source Ethical',
    category: 'safety_tech',
    description: 'Transparent architecture built with verifiable privacy commitments and community auditability.',
    badge: 'Ethical Tech',
    highlights: ['Community verifiable', 'No hidden backdoors', 'Data sovereignty']
  },

  // EXTRA 5 for Play Store (101-105)
  {
    id: 101,
    code: 'FR101',
    name: 'Push Notifications',
    category: 'play_store',
    description: 'Native web & mobile push notifications for royalty payouts, duet invites, and Q AI homework alerts.',
    badge: 'Native Push',
    highlights: ['Instant delivery', 'Custom sound chime', 'Custom vibration pattern']
  },
  {
    id: 102,
    code: 'FR102',
    name: 'Dark Mode',
    category: 'play_store',
    description: 'OLED cyber-midnight theme saving battery life and easing eye strain during late-night creative sessions.',
    badge: 'OLED Dark',
    highlights: ['Deep blacks #020617', 'Neon amber & cyan glow', 'Battery conservative']
  },
  {
    id: 103,
    code: 'FR103',
    name: 'Light Mode',
    category: 'play_store',
    description: 'Crisp daytime high-visibility theme optimized for reading under bright Harare outdoor sunlight.',
    badge: 'Bright Sun',
    highlights: ['High contrast daytime', 'Anti-glare typography', '1-tap quick toggle']
  },
  {
    id: 104,
    code: 'FR104',
    name: 'Language Switch Shona/English',
    category: 'play_store',
    description: '1-tap instant interface translation toggling all menus, labels, and prompts between ChiShona and English.',
    badge: 'Bilingual UI',
    highlights: ['Immediate UI re-render', 'Culturally authentic copy', 'Preserves user settings']
  },
  {
    id: 105,
    code: 'FR105',
    name: 'Owner Certificate YOU',
    category: 'play_store',
    description: 'Official master certificate declaring YOU as the sole owner and creator of FUTURECHAT (Harare x Manchester).',
    badge: 'Master Owner',
    highlights: ['Unique Owner Token', 'Harare x Manchester Seal', 'Cryptographic verification']
  }
];

export const BENCHMARK_COMPARISON = [
  { metric: 'Total Master Features', futurechat: '105 Features', spacetalk: '3 Features', facebook: '10 Features', instagram: '8 Features' },
  { metric: 'Built-in Q AI (95% Match)', futurechat: 'Yes (Harare Teen + Shona/UK)', spacetalk: 'No', facebook: 'Generic Bot', instagram: 'None' },
  { metric: 'Music DNA (98% Match)', futurechat: 'Yes (Synth + EQ + Live DNA)', spacetalk: 'No', facebook: 'No', instagram: 'No' },
  { metric: 'Direct EcoCash Payout', futurechat: 'Instant Zim Mobile Wallet', spacetalk: 'No', facebook: 'No', instagram: 'No' },
  { metric: 'UK Bank Faster Payments', futurechat: 'Native Sort Code Payout', spacetalk: 'No', facebook: 'Slow Wire', instagram: 'Complex Stripe' },
  { metric: 'Creator Payout Rate', futurechat: '$0.10 per 100 streams (3x)', spacetalk: 'None', facebook: 'Ad Cut', instagram: 'Ad Cut' },
  { metric: 'ZESA Load-Shedding Offline Mode', futurechat: 'Full Offline Edge Engine', spacetalk: 'Offline watch only', facebook: 'Requires Data', instagram: 'Requires Data' },
  { metric: 'Tumira Pic Stranger Shield', futurechat: 'Automatic Red-flag Block', spacetalk: 'Whitelist call only', facebook: 'Weak Filter', instagram: 'Basic Filter' },
  { metric: 'Overall Verdict', futurechat: '🏆 WINNER: FUTURECHAT', spacetalk: 'Outmatched', facebook: 'Outmatched', instagram: 'Outmatched' },
];
