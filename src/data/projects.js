export const projects = [
  {
    id: "airvault",
    title: "AirVault: Encrypted Vault with Airdrop Sharing",
    category: "cloud fullstack web",
    categoryTag: "CLOUD & SECURE STORAGE",
    image: "src/assets/images/projects/airvault.png",
    demoUrl: "https://airvault-fronted.vercel.app/",
    githubUrl: "https://github.com/Akash04471",
    techIcons: ["fab fa-react", "fab fa-node-js", "fas fa-database"],
    description: "A zero-knowledge encrypted file vault with client-side AES-GCM encryption, ensuring secure storage without exposing plaintext to the server.",
    features: [
      "Zero-knowledge client-side AES-GCM encryption",
      "Secure file sharing and encrypted storage",
      "Full-stack React & Express integration",
      "Cloudflare R2 secure storage integration",
      "Secure authentication & role-based access control"
    ],
    impact: [
      { value: "AES-GCM", label: "Encryption" },
      { value: "Cloudflare R2", label: "Object Storage" },
      { value: "Zero-Knowledge", label: "Vault Architecture" }
    ],
    tags: ["React", "Express", "Node.js", "MongoDB", "WebCrypto API", "Cloudflare R2"]
  },
  {
    id: "smartplate",
    title: "SmartPlate: Autonomous Nutritional Intelligence",
    category: "ai web",
    categoryTag: "AI INTEGRATION & HEALTHTECH",
    image: "src/assets/images/projects/smartplate_ai.png",
    demoUrl: "https://smartplate-ai-frontend.vercel.app/",
    githubUrl: "https://github.com/Akash04471",
    techIcons: ["fab fa-react", "fas fa-brain", "fas fa-chart-pie"],
    description: "An autonomous nutrition tracker utilizing Gemini 2.0 and the Edamam API for precise meal logging, paired with an interactive AI Coach supporting rich markdown rendering.",
    features: [
      "Autonomous nutrition tracking with Gemini 2.0",
      "Edamam API integration for precise meal logging",
      "Interactive AI Coach with rich markdown rendering",
      "Custom data visualizations (Metabolic Ruler) & GSAP animations",
      "Secure Node.js backend with Drizzle ORM & PostgreSQL"
    ],
    impact: [
      { value: "Gemini 2.0", label: "AI Engine" },
      { value: "Drizzle ORM", label: "Database Layer" },
      { value: "Metabolic Ruler", label: "GSAP Visualization" }
    ],
    tags: ["Next.js", "Express", "PostgreSQL", "Gemini AI", "Drizzle ORM", "Edamam API", "GSAP"]
  },
  {
    id: "voicemod",
    title: "Voice Modulation System",
    category: "academic ai",
    categoryTag: "IOT & SIGNAL PROCESSING",
    image: "src/assets/images/projects/voice_modulation.png",
    demoUrl: "public/projects/voice-modulation.html",
    githubUrl: "https://github.com/Akash04471",
    techIcons: ["fab fa-python", "fas fa-microchip"],
    description: "Gesture-controlled voice modulation using Raspberry Pi and PyAudio. Real-time audio processing with intuitive hand gesture controls.",
    features: [
      "Real-time PyAudio pitch modulation",
      "Gesture controls with sensor arrays",
      "Raspberry Pi hardware integration"
    ],
    impact: [
      { value: "Real-time", label: "Processing" },
      { value: "Low-latency", label: "DSP Node" }
    ],
    tags: ["Python", "Raspberry Pi", "IoT", "PyAudio", "Gesture Recognition"]
  },
  {
    id: "fitness",
    title: "Fitness Tracking Platform",
    category: "fullstack web",
    categoryTag: "MERN STACK PLATFORM",
    image: "src/assets/images/projects/fitness.png",
    demoUrl: "public/projects/fitness-tracking.html",
    githubUrl: "https://github.com/Akash04471",
    techIcons: ["fab fa-react", "fab fa-node-js"],
    description: "Comprehensive health and fitness tracking web application built with MongoDB, Express, React, and Node.js.",
    features: [
      "Custom workout planning schedules",
      "Calorie intake tracker & log database",
      "Progress metrics & graph dashboard"
    ],
    impact: [
      { value: "JWT", label: "Session Auth" },
      { value: "Full CRUD", label: "MERN Architecture" }
    ],
    tags: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT Auth"]
  },
  {
    id: "esports",
    title: "Esports Management System",
    category: "web academic",
    categoryTag: "DATABASE CRUD APPLICATION",
    image: "src/assets/images/projects/esports_mgmt.png",
    demoUrl: "#",
    githubUrl: "https://github.com/Akash04471",
    techIcons: ["fab fa-php", "fas fa-database"],
    description: "Player management system with full CRUD operations for esports tournaments and team administration.",
    features: [
      "Team registration & rosters",
      "Scoreboards & schedules administration",
      "Database structure schema design"
    ],
    impact: [
      { value: "MySQL", label: "Relational DB" },
      { value: "Full CRUD", label: "Admin Dashboard" }
    ],
    tags: ["PHP", "MySQL", "CSS", "CRUD"]
  },
  {
    id: "dsp",
    title: "DSP Mini Projects",
    category: "academic",
    categoryTag: "MATHEMATICAL MODELING",
    image: "src/assets/images/projects/dsp_signals.png",
    demoUrl: "public/projects/dsp-mini-project.html",
    githubUrl: "https://github.com/Akash04471",
    techIcons: ["fas fa-wave-square", "fas fa-chart-line"],
    description: "Digital signal processing implementations including modulation, sampling, and various signal operations using Octave.",
    features: [
      "Amplitude & Frequency modulation",
      "Signal sampling rate simulations",
      "Wave operations scripts"
    ],
    impact: [
      { value: "Octave", label: "Analysis" },
      { value: "10+ Scripts", label: "Simulated" }
    ],
    tags: ["MATLAB", "Octave", "Signal Processing", "Algorithms"]
  }
];
