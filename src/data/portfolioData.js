export const PERSONAL_INFO = {
  name: "RAEES",
  role: "Videographer · Video Editor · Visual Storyteller",
  tagline: "BRINGING LIFE & STORIES INTO THE LIGHT.",
  bio: "Creative videographer and editor specializing in wedding ceremonies (Bride to Be, Groom to Be, Nikkah, Engagement), milestone birthday celebrations, high-cadence automotive cinema, destination travel stories, culinary food reels, and executive presentations.",
  location: "Available for Commissions & On-Location Shoots",
  email: "raees.visuals@domain.com",
  phone: "+1 (555) 019-2834",
  whatsapp: "+15550192834",
  instagram: "https://instagram.com",
  behance: "https://behance.net",
  linkedin: "https://linkedin.com",
  vimeo: "https://vimeo.com",
  youtube: "https://youtube.com",
  status: "AVAILABLE FOR COMMISSIONS",
  reelDuration: "02:18",
  aspectRatio: "2.39:1 CINEMASCOPE",
  heroImage: "/images/hero_portrait.jpg"
};

// Original Categories for SelectedWorks (Untouched as requested)
export const CATEGORIES = [
  { id: "ALL", label: "ALL WORKS" },
  { id: "VIDEO EDITING", label: "VIDEO EDITING" },
  { id: "VIDEOGRAPHY", label: "VIDEOGRAPHY" },
  { id: "GRAPHIC DESIGN", label: "GRAPHIC DESIGN" }
];

// Original Projects for SelectedWorks (Preserved as requested)
export const PROJECTS = [
  {
    id: "echoes-of-valkyrie",
    title: "ECHOES OF VALKYRIE",
    category: "VIDEO EDITING",
    subCategory: "Commercial Fashion Film",
    year: "2026",
    role: "Lead Editor & Sound Designer",
    duration: "02:45",
    tools: ["DaVinci Resolve", "Premiere Pro", "After Effects"],
    aspectRatio: "2.39:1 Anamorphic",
    thumbnail: "public/images/showreel_thumbnail.png",
    videoUrl: "/videos/reel.mp4",
    shortDesc: "High-octane narrative commercial combining kinetic montage pacing, deep atmospheric sound design, and an electric lime cinema grade.",
    fullDesc: "Commissioned for an avant-garde fashion capsule, this piece blends rapid rhythmic cross-cutting with sub-bass audio swells and textural sound design.",
    client: "Studio Valkyrie",
    colorPalette: ["#000000", "#1b1b22", "#acee01", "#b4bbab"],
    aspect: "large",
    stills: [
      "/images/hero_cinematic.jpg",
      "/images/editing_suite.jpg",
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: "midnight-cinematography",
    title: "MIDNIGHT HORIZON",
    category: "VIDEOGRAPHY",
    subCategory: "Cinematography & Lighting",
    year: "2025",
    role: "Director of Photography",
    duration: "03:12",
    tools: ["ARRI Alexa Mini", "Cooke Anamorphic 40mm", "DaVinci Resolve Studio"],
    aspectRatio: "2.39:1 CinemaScope",
    thumbnail: "public/images/skill2 videography.png",
    videoUrl: "public/videos/skill2.mp4",
    shortDesc: "Moody low-light cinematography capturing urban nightscapes through anamorphic glass with organic optical flares.",
    fullDesc: "Shot entirely between 1:00 AM and 5:00 AM across transit corridors. Utilized minimal LED tube accent lighting to sculpt silhouettes while preserving rich pure black shadow detail.",
    client: "Independent Production",
    colorPalette: ["#000000", "#0f172a", "#acee01", "#b4bbab"],
    aspect: "regular",
    stills: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: "chronicles-of-echo",
    title: "CHRONICLES OF ECHO",
    category: "GRAPHIC DESIGN",
    subCategory: "Key Art &  Poster",
    year: "2025",
    role: "Creative Director & Poster Designer",
    duration: "Print & Digital Campaign",
    tools: ["Photoshop", "Illustrator", "InDesign"],
    aspectRatio: "2:3 Poster",
    thumbnail: "public/images/grafic.png",
    videoUrl: "public/images/grafic.png",
    shortDesc: "Award-winning editorial poster design utilizing Swiss typography, raw texture scanning, and brutalist geometric framing.",
    fullDesc: "Official key art campaign designed for an indie psychological thriller. Incorporates distressed typography, bespoke film strip glyphs, and custom hand-screened texture treatments.",
    client: "Aperture Films",
    colorPalette: ["#000000", "#e4e4e7", "#acee01", "#71717a"],
    aspect: "regular",
    stills: [
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: "architects-monologue",
    title: "THE ARCHITECT'S MONOLOGUE",
    category: "VIDEO EDITING",
    subCategory: "Documentary Short",
    year: "2025",
    role: "Editor & Colorist",
    duration: "06:14",
    tools: ["Premiere Pro", "DaVinci Resolve", "Izotope RX"],
    aspectRatio: "4:3 Academy Ratio",
    thumbnail: "/images/editing_suite.jpg",
    videoUrl: "/videos/reel.mp4",
    shortDesc: "Deliberate, contemplative documentary editing exploring brutalist concrete structures and human scale in 4:3 Academy ratio.",
    fullDesc: "Emphasized spatial continuity and silence as narrative devices. The sound architecture was constructed using room-tone reverberations recorded inside cavernous spaces.",
    client: "Design Guild",
    colorPalette: ["#000000", "#2a2b34", "#d4d4d8", "#acee01"],
    aspect: "large",
    stills: [
      "/images/editing_suite.jpg",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: "iceland-solitude",
    title: "SOLITUDE IN ICELAND",
    category: "VIDEOGRAPHY",
    subCategory: "Aerial & Landscape Cinema",
    year: "2024",
    role: "Cinematographer & Drone Pilot",
    duration: "04:02",
    tools: ["RED V-Raptor 8K", "DJI Inspire 3", "Zeiss Supreme Prime"],
    aspectRatio: "2.39:1 CinemaScope",
    thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "/videos/reel.mp4",
    shortDesc: "Expansive aerial cinematography over black volcanic sands, sub-zero glacial waterfalls, and low Arctic sunlight.",
    fullDesc: "Shot across 8 days in sub-zero conditions. Captured high dynamic range textures from basalt columns to turbulent glacial runoffs.",
    client: "Wilderness Expeditions",
    colorPalette: ["#000000", "#1e293b", "#94a3b8", "#acee01"],
    aspect: "regular",
    stills: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: "soundwave-identity",
    title: "SOUNDWAVE RECORDS",
    category: "GRAPHIC DESIGN",
    subCategory: "Brand Identity & Vinyl System",
    year: "2024",
    role: "Brand Identity Designer",
    duration: "Full Brand System",
    tools: ["Illustrator", "Photoshop", "Glyphs"],
    aspectRatio: "1:1 Square & Print",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    videoUrl: null,
    shortDesc: "Monochrome visual identity, bespoke typographic logotype, and gatefold vinyl packaging for an electronic record label.",
    fullDesc: "Designed an entire visual architecture centered around analogue audio frequencies and waveform harmonics.",
    client: "Soundwave Media",
    colorPalette: ["#000000", "#18181b", "#ffffff", "#acee01"],
    aspect: "regular",
    stills: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop"
    ]
  }
];

// Raees's 9 Actual Work Disciplines
export const WORK_DISCIPLINES = [
  { id: "ALL", label: "ALL DISCIPLINES" },
  { id: "BRIDE TO BE", label: "BRIDE TO BE" },
  { id: "GROOM TO BE", label: "GROOM TO BE" },
  { id: "NIKKAH", label: "NIKKAH" },
  { id: "ENGAGEMENT", label: "ENGAGEMENT" },
  { id: "BIRTHDAY", label: "BIRTHDAY" },
  { id: "AUTOMOTIVE", label: "AUTOMOTIVE" },
  { id: "TRAVELING", label: "TRAVELING" },
  { id: "FOOD", label: "FOOD" },
  { id: "PRESENTATION", label: "PRESENTATION" }
];

// Pre-loaded Production Projects across all 9 areas
export const WORK_PROJECTS = [
  // 1. BRIDE TO BE
  {
    id: "noor-bride-to-be",
    title: "NOOR · BRIDE TO BE",
    category: "BRIDE TO BE",
    subCategory: "Bridal Preparation & Teaser Reel",
    year: "2026",
    role: "Lead Cinematographer & Editor",
    duration: "01:45",
    tools: ["Sony FX3", "50mm F1.2 GM", "DaVinci Resolve"],
    aspectRatio: "9:16 Vertical & 2.39:1 Scope",
    thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "/videos/reel.mp4",
    shortDesc: "Intimate bridal preparation, intricate veil textures, delicate henna, and radiant pre-wedding moments captured in soft cinematic light.",
    client: "Noor Private Wedding",
    colorPalette: ["#000000", "#e8dcc4", "#acee01", "#ffffff"]
  },
  // 2. GROOM TO BE
  {
    id: "the-grooms-essence",
    title: "THE GROOM'S ESSENCE",
    category: "GROOM TO BE",
    subCategory: "Groom Preparation & Editorial Reel",
    year: "2026",
    role: "Cinematographer & Colorist",
    duration: "01:30",
    tools: ["Sony FX6", "85mm F1.4 GM", "Premiere Pro"],
    aspectRatio: "2.39:1 CinemaScope",
    thumbnail: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "/videos/reel.mp4",
    shortDesc: "Sharp bespoke tailoring, cufflink adjustments, confident brotherhood moments, and moody low-key cinematic lighting.",
    client: "Tariq Wedding Collective",
    colorPalette: ["#000000", "#18181b", "#e8dcc4", "#acee01"]
  },
  // 3. NIKKAH
  {
    id: "qubool-hai-nikkah",
    title: "QUBOOL HAI: SACRED NIKKAH",
    category: "NIKKAH",
    subCategory: "Islamic Wedding Ceremony & Highlights",
    year: "2026",
    role: "Lead Cinematographer & Editor",
    duration: "03:45",
    tools: ["Sony FX3", "Dual Camera Rig", "DaVinci Resolve"],
    aspectRatio: "2.39:1 CinemaScope",
    thumbnail: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "/videos/reel.mp4",
    shortDesc: "The solemn moment of vows, heartfelt tears of joy, family blessings, and timeless cultural heritage documented in 4K cinema.",
    client: "The Al-Rashid Family",
    colorPalette: ["#000000", "#e8dcc4", "#acee01", "#3f3f46"]
  },
  // 4. ENGAGEMENT
  {
    id: "eternal-promise-engagement",
    title: "ETERNAL PROMISE: ENGAGEMENT REEL",
    category: "ENGAGEMENT",
    subCategory: "Ring Ceremony & Golden Hour Cinema",
    year: "2026",
    role: "Lead Cinematographer & Editor",
    duration: "02:15",
    tools: ["Sony FX3", "35mm F1.4", "DaVinci Resolve"],
    aspectRatio: "2.39:1 CinemaScope",
    thumbnail: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "/videos/reel.mp4",
    shortDesc: "Intimate golden-hour ring exchange, genuine laughter, and romantic couple portraiture framed against sunset light.",
    client: "Farhan & Ayla",
    colorPalette: ["#000000", "#e8dcc4", "#acee01", "#ffffff"]
  },
  // 5. BIRTHDAY
  {
    id: "midnight-gala-birthday",
    title: "MIDNIGHT GALA: 25TH BIRTHDAY",
    category: "BIRTHDAY",
    subCategory: "Milestone Celebration & Party Reel",
    year: "2026",
    role: "Lead Editor & Videographer",
    duration: "01:30",
    tools: ["Sony FX3", "24-70mm GM II", "After Effects"],
    aspectRatio: "9:16 Reel & 2.39:1 CinemaScope",
    thumbnail: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "/videos/reel.mp4",
    shortDesc: "Electric party energy, sparklers, champagne toasts, and dynamic rhythm-synced transitions celebrating life's vibrant milestones.",
    client: "Private Milestone Celebration",
    colorPalette: ["#000000", "#acee01", "#e8dcc4", "#ffffff"]
  },
  // 6. AUTOMOTIVE
  {
    id: "apex-velocity-automotive",
    title: "APEX HORIZON: AUTOMOTIVE CINEMA",
    category: "AUTOMOTIVE",
    subCategory: "Supercar Commercial & Rolling Shots",
    year: "2026",
    role: "Lead Cinematographer & Sound Designer",
    duration: "01:30",
    tools: ["Sony FX6 Tracking Rig", "DJI RS3 Pro", "DaVinci Resolve"],
    aspectRatio: "2.39:1 CinemaScope",
    thumbnail: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "/videos/reel.mp4",
    shortDesc: "Aggressive exhaust notes, precision rolling gimbal shots, and high-cadence speed ramping framing pure performance.",
    client: "Apex Velocity Club",
    colorPalette: ["#000000", "#acee01", "#e8dcc4", "#1f2937"]
  },
  // 7. TRAVELING
  {
    id: "horizons-unbound-travel",
    title: "HORIZONS UNBOUND: TRAVEL ODYSSEY",
    category: "TRAVELING",
    subCategory: "Destination Cinema & Drone Landscapes",
    year: "2026",
    role: "Cinematographer & Drone Pilot",
    duration: "03:15",
    tools: ["DJI Mavic 3 Cine", "Sony FX3", "DaVinci Resolve"],
    aspectRatio: "2.39:1 CinemaScope",
    thumbnail: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "/videos/reel.mp4",
    shortDesc: "Expansive aerial vistas over coastal cliffs, misty mountain highways, and cultural wanderlust graded to a rich organic palette.",
    client: "Wanderlust Expeditions",
    colorPalette: ["#000000", "#acee01", "#e8dcc4", "#475569"]
  },
  // 8. FOOD
  {
    id: "artisan-gastronomy-food",
    title: "ARTISAN GASTRONOMY: FOOD REEL",
    category: "FOOD",
    subCategory: "Culinary & Gourmet Cinematography",
    year: "2026",
    role: "Lead Cinematographer & Colorist",
    duration: "01:20",
    tools: ["Sony FX3", "90mm Macro F2.8", "DaVinci Resolve"],
    aspectRatio: "9:16 Vertical Reel & 16:9 4K",
    thumbnail: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "/videos/reel.mp4",
    shortDesc: "Sizzling textures, slow-motion sauce drizzles, and delicious macro details designed for premier restaurants and culinary brands.",
    client: "Maison Gourmet Restaurant",
    colorPalette: ["#000000", "#e8dcc4", "#acee01", "#ffffff"]
  },
  // 9. PRESENTATION
  {
    id: "nexus-keynote-presentation",
    title: "NEXUS SUMMIT: KEYNOTE PRESENTATION",
    category: "PRESENTATION",
    subCategory: "Corporate Showcase & Stage Presentation",
    year: "2026",
    role: "Presentation Video Producer & Editor",
    duration: "03:00",
    tools: ["Sony FX6 Multicam", "After Effects", "Premiere Pro"],
    aspectRatio: "16:9 Master & 2.39:1 Scope",
    thumbnail: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "/videos/reel.mp4",
    shortDesc: "High-impact keynote presentation edit featuring crisp speaker angles, synced slide graphics, and clean corporate audio clarity.",
    client: "Nexus Innovation Summit",
    colorPalette: ["#000000", "#acee01", "#e8dcc4", "#ffffff"]
  }
];

export const SHOWREEL_METRICS = {
  title: "RAEES SHOWREEL 2026",
  aspect: "2.39:1 DCI SCOPE",
  fps: "24.00 FPS",
  resolution: "4K DCI MASTER",
  colorSpace: "ACEScc / ARRI Wide Gamut 4",
  placeholderVideo: "/videos/raees show reeel.mp4"
};

export const SKILLS_DATA = {
  primary: [
    {
      id: "video-editing",
      category: "VIDEO EDITING & REELS",
      role: "Video Editor & Short-Form Specialist",
      tagline: "High-retention editing, kinetic transitions, sound design & Reels mastery",
      icon: "Film",
      tools: ["CapCut", "Adobe Premiere Pro", "Audition"],
      items: [
        { name: "Short-Form Video Editing", level: "Master", pct: 95 },
        { name: "Instagram Reels & TikTok Editing", level: "Master", pct: 96 },
        { name: "Kinetic Transitions & Visual Effects", level: "Expert", pct: 90 },
        { name: "Text Animation & Dynamic Subtitles", level: "Master", pct: 94 },
        { name: "Audio Synchronization & Music Editing", level: "Master", pct: 92 },
        { name: "Basic Color Correction & Grading", level: "Advanced", pct: 86 }
      ],
      cvHighlight: "Created engaging Instagram Reels and short-form videos using transitions, effects, subtitles, and audio synchronization to maximize audience engagement."
    },
    {
      id: "digital-marketing",
      category: "DIGITAL MARKETING & SEO",
      role: "Digital Marketing Associate",
      tagline: "Audience growth strategies, content planning, hashtag SEO & analytics",
      icon: "TrendingUp",
      tools: ["Meta Business Suite", "Google Analytics", "Instagram Insights"],
      items: [
        { name: "Social Media Management", level: "Master", pct: 93 },
        { name: "Content Planning & Calendars", level: "Master", pct: 95 },
        { name: "Basic Search Engine Optimization (SEO)", level: "Advanced", pct: 88 },
        { name: "Hashtag Research & Discovery", level: "Expert", pct: 91 },
        { name: "Instagram Growth Strategies", level: "Expert", pct: 90 },
        { name: "Audience Engagement & Retention", level: "Advanced", pct: 89 }
      ],
      cvHighlight: "Managed social media pages by planning content, editing creative assets, and publishing on regular schedules while applying SEO and growth strategies."
    },
    {
      id: "graphic-design",
      category: "GRAPHIC DESIGN & BRANDING",
      role: "Graphic Designer & Creative Stylist",
      tagline: "Thumbnails, social creatives, promotional posters & brand visual consistency",
      icon: "Palette",
      tools: ["Adobe Photoshop", "Canva", "Illustrator"],
      items: [
        { name: "Social Media Creatives & Post Design", level: "Master", pct: 94 },
        { name: "High-CTR YouTube & Reel Thumbnails", level: "Master", pct: 96 },
        { name: "Promotional Posters & Event Banners", level: "Expert", pct: 92 },
        { name: "Basic Logo Design & Brand Identity", level: "Advanced", pct: 87 },
        { name: "Layout Design & Typographic Hierarchy", level: "Expert", pct: 90 },
        { name: "Color Theory & Aesthetic Harmony", level: "Expert", pct: 91 }
      ],
      cvHighlight: "Designed posters, thumbnails, banners, and social creatives using Canva and Adobe Photoshop while maintaining strict brand consistency and visual appeal."
    },
    {
      id: "technical-suite",
      category: "TECHNICAL TOOLKIT",
      role: "Software Arsenal & Digital Stack",
      tagline: "Hands-on execution across industry standard software and platforms",
      icon: "Cpu",
      tools: ["CapCut", "Adobe Photoshop", "Canva", "SEO Tools", "Social Schedulers"],
      items: [
        { name: "CapCut Timeline & Keyframing", level: "Master", pct: 96 },
        { name: "Adobe Photoshop Manipulation", level: "Expert", pct: 90 },
        { name: "Canva Pro Creative Workflow", level: "Master", pct: 95 },
        { name: "Basic SEO & Keyword Research", level: "Advanced", pct: 85 },
        { name: "Social Media Publishing Pipelines", level: "Expert", pct: 92 },
        { name: "Digital Asset Optimization", level: "Master", pct: 93 }
      ],
      cvHighlight: "Utilizing modern creator toolchains to execute rapid concept-to-publish workflows with zero compromise on visual quality."
    },
    {
      id: "professional-ethic",
      category: "PROFESSIONAL ATTRIBUTES",
      role: "Core Work Ethic & Delivery",
      tagline: "Dedicated execution with attention to detail and creative adaptability",
      icon: "Award",
      tools: ["Calicut University", "Adi Group Training"],
      items: [
        { name: "Creativity & Concept Ideation", level: "Master", pct: 96 },
        { name: "Fast Learning & Trend Adoption", level: "Master", pct: 95 },
        { name: "Attention to Frame-by-Frame Detail", level: "Master", pct: 97 },
        { name: "Clear Communication & Briefing", level: "Expert", pct: 92 },
        { name: "Time Management & Strict Deadlines", level: "Master", pct: 94 },
        { name: "Agile Problem Solving", level: "Expert", pct: 90 }
      ],
      cvHighlight: "Quick learner with strong creativity, communication skills, and a commitment to delivering high-quality marketing and video content."
    }
  ],
  technicalWeb: [
    { name: "CapCut", note: "Short-form video editing, visual effects & dynamic pacing" },
    { name: "Adobe Photoshop", note: "Graphic design, thumbnail creation & visual enhancement" },
    { name: "Canva", note: "Social media post layouts, banners & fast creative workflows" },
    { name: "Basic SEO", note: "Search engine optimization, keyword targeting & discoverability" },
    { name: "Social Media Suite", note: "Audience engagement, scheduled publishing & growth strategies" },
    { name: "Color & Typography", note: "Color theory, aesthetic balance & readable typography" }
  ]
};

export const EXPERIENCE = [
  {
    period: "2024 — PRESENT",
    role: "Lead Videographer & Commercial Video Editor",
    company: "Raees Visual Productions",
    location: "On-Location / Studio",
    description: "Directing, shooting, and editing wedding ceremonies (Nikkah, Engagement, Bride to Be, Groom to Be), high-speed automotive films, travel documentaries, and culinary promos with high cinematic standards.",
    deliverables: [
      "Master cinematic delivery across 4K DCI, 2.39:1 CinemaScope, and 9:16 vertical reels",
      "Full ceremony coverage and emotional highlight films for Nikkah and Engagement celebrations",
      "Car-to-car rolling shots and precision exhaust-synced automotive commercials"
    ]
  },
  {
    period: "2022 — 2024",
    role: "Cinematographer & Event Video Specialist",
    company: "Creative Visual Media",
    location: "On-Location Shoots",
    description: "Filmed milestone birthday celebrations, destination travel stories, and culinary food reels for restaurant brands and private commissions.",
    deliverables: [
      "Captured 50+ milestone birthdays and events with dynamic lighting and gimbal rigs",
      "Produced destination travel films utilizing 4K drone aerials and immersive soundscapes",
      "Shot macro culinary cinematography highlighting steam, crust textures, and plating details"
    ]
  },
  {
    period: "2020 — 2022",
    role: "Video Editor & Presentation Specialist",
    company: "Digital Motion Studio",
    location: "Studio / Remote",
    description: "Edited corporate keynote presentations, wedding teaser reels, and social campaigns with rapid turnaround times and polished visual standards.",
    deliverables: [
      "Edited high-impact executive presentation videos with kinetic slide graphics and clean sound",
      "Crafted romantic teaser reels for couples (Bride & Groom to Be) with beat-matched editing",
      "Handled multi-camera sync, dialogue cleanup, and audio stem mixing"
    ]
  }
];

export const GEAR_AND_KIT = [
  { category: "CAMERAS", items: "Sony FX6, Sony FX3 Cinema Line, DJI Mavic 3 Cine" },
  { category: "OPTICS", items: "Sony G-Master Trio (24/35/50/85mm), 90mm Macro F2.8, Cooke Anamorphic" },
  { category: "LIGHTING", items: "Aputure 600d Pro, Nanlite Pavotubes RGBWW, Lantern Modifiers" },
  { category: "RIGGING & TRACKING", items: "DJI RS3 Pro Gimbal, Car Suction Mounts, Dana Dolly" },
  { category: "POST SUITE", items: "Apple Mac Studio M2 Ultra, DaVinci Micro Panel, Premiere Pro, After Effects" }
];
