export const PERSONAL_INFO = {
  name: "RAYEES",
  role: "Videographer · Video Editor · Visual Storyteller",
  tagline: "BRINGING LIFE & STORIES INTO THE LIGHT.",
  bio: "Creative videographer and editor specializing in wedding ceremonies (Bride to Be, Groom to Be, Nikkah, Engagement), milestone birthday celebrations, high-cadence automotive cinema, destination travel stories, culinary food reels, and executive presentations.",
  location: "Available for Commissions & On-Location Shoots",
  email: "muhammedrayees759@gmail.com",
  phone: "+91 94463 88427",
  whatsapp: "+919446388427",
  instagram: "https://instagram.com/shotsbyrys",
  behance: "https://behance.net",
  linkedin: "https://linkedin.com",
  vimeo: "https://vimeo.com",
  youtube: "https://youtube.com",
  status: "AVAILABLE FOR COMMISSIONS",
  reelDuration: "02:18",
  aspectRatio: "2.39:1 CINEMASCOPE",
  heroImage: "/images/hero_cutout.png"
};

// Original Categories for SelectedWorks (Untouched as requested)
export const CATEGORIES = [
  { id: "ALL", label: "ALL WORKS" },
  { id: "VIDEO EDITING", label: "VIDEO EDITING" },
  { id: "VIDEOGRAPHY", label: "VIDEOGRAPHY" },
  { id: "GRAPHIC DESIGN", label: "GRAPHIC DESIGN" }
];

// Projects for SelectedWorks — 3 real disciplines
export const PROJECTS = [
  {
    id: "frames-in-motion",
    title: "FRAMES IN MOTION",
    category: "VIDEO EDITING",
    subCategory: "SHORT-FORM VIDEO · REELS",
    year: "2026",
    role: "Video Editor",
    duration: null,
    tools: ["CapCut", "Video Editing"],
    aspectRatio: "9:16 VERTICAL REEL",
    thumbnail: "/images/showreel_thumbnail.png",
    videoUrl: "/videos/reel.mp4",
    shortDesc: "Cinematic edits combining dynamic transitions, text animation, synchronized audio, subtitles, and visual effects.",
    fullDesc: "Cinematic edits combining dynamic transitions, text animation, synchronized audio, subtitles, and visual effects crafted to maximize retention and engagement on short-form platforms.",
    client: null,
    colorPalette: ["#000000", "#1b1b22", "#acee01", "#b4bbab"],
    aspect: "large",
    stills: [
      "/images/showreel_thumbnail.png"
    ]
  },
  {
    id: "moments-in-focus",
    title: "MOMENTS IN FOCUS",
    category: "VIDEOGRAPHY",
    subCategory: "VISUAL STORYTELLING · CONTENT",
    year: "2026",
    role: "Videographer",
    duration: null,
    tools: ["Visual Composition", "Audio Sync"],
    aspectRatio: "2.39:1 CINEMASCOPE",
    thumbnail: "/images/skill2 videography.png",
    videoUrl: "/videos/skill2.mp4",
    shortDesc: "Capturing authentic moments and transforming footage into engaging visual stories for digital platforms.",
    fullDesc: "Capturing authentic moments and transforming raw footage into compelling visual stories for digital platforms — with a focus on visual composition and audio synchronization.",
    client: null,
    colorPalette: ["#000000", "#0f172a", "#acee01", "#b4bbab"],
    aspect: "regular",
    stills: [
      "/images/skill2 videography.png"
    ]
  },
  {
    id: "visual-impact",
    title: "VISUAL IMPACT",
    category: "GRAPHIC DESIGN",
    subCategory: "POSTERS · SOCIAL MEDIA CREATIVES",
    year: "2026",
    role: "Graphic Designer",
    duration: null,
    tools: ["Canva", "Adobe Photoshop"],
    aspectRatio: "PRINT & DIGITAL",
    thumbnail: "/images/grafic.png",
    videoUrl: null,
    shortDesc: "Eye-catching designs combining bold typography, thoughtful layouts, color theory, and consistent brand visuals.",
    fullDesc: "Eye-catching designs combining bold typography, thoughtful layouts, color theory, and consistent brand visuals — crafted for posters, social media creatives, and promotional content.",
    client: null,
    colorPalette: ["#000000", "#e4e4e7", "#acee01", "#71717a"],
    aspect: "regular",
    stills: [
      "/images/grafic.png"
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
  title: "RAYEES SHOWREEL 2026",
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
    company: "Rayees Visual Productions",
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
