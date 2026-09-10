import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  X,
  Package,
  ChefHat,
  Truck,
  CheckCircle2,
  Flame,
  ArrowRight,
  Sparkles,
  Layers,
  Thermometer,
  Clock,
  MapPin,
  QrCode,
  ShieldCheck,
  Zap,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  Sliders,
  Utensils,
  Gauge,
  Radio,
} from 'lucide-react';

interface KitchenPackagingVideoModalProps {
  onClose: () => void;
  onLaunchLiveHub?: () => void;
  onOpenBookDemo?: () => void;
}

export type SceneKey =
  | 'resources'
  | 'cooking'
  | 'sealing'
  | 'labeling'
  | 'dispatch'
  | 'transit'
  | 'delivery';

interface SceneConfig {
  id: SceneKey;
  label: string;
  durationSeconds: number;
  phaseTitle: string;
  subtitle: string;
  badge: string;
  accentColor: string;
}

const SCENES: SceneConfig[] = [
  {
    id: 'resources',
    label: '1. Resource BOM',
    durationSeconds: 12,
    phaseTitle: 'Order Ingestion & Automated Ingredient Metering',
    subtitle: 'KDS receives Order #PB-8942. Cloud BOM auto-dispenses precise ingredients from temperature-controlled hoppers.',
    badge: 'Raw Stock Depletion',
    accentColor: 'text-amber-500',
  },
  {
    id: 'cooking',
    label: '2. Robotic Cooking',
    durationSeconds: 12,
    phaseTitle: 'Precision Induction & Thermal Assembly',
    subtitle: 'Robotic arm transfers the meal bowl into the rapid-induction chamber (82°C optimal serve temperature).',
    badge: 'Smart Assembly',
    accentColor: 'text-orange-500',
  },
  {
    id: 'sealing',
    label: '3. Tamper-Proof Seal',
    durationSeconds: 14,
    phaseTitle: 'Automated Heat Sealing & Clamshell Capping',
    subtitle: 'Airtight hermetic sealing press applies high-barrier film and holographic tamper-evident security strip.',
    badge: 'Robotic Packaging',
    accentColor: 'text-emerald-500',
  },
  {
    id: 'labeling',
    label: '4. Dynamic Labeling',
    durationSeconds: 10,
    phaseTitle: 'Instant Thermal GST & UPI QR Invoicing',
    subtitle: 'High-speed robotic applicator prints and attaches the customer invoice label with live UPI QR and HSN details.',
    badge: 'Cloud Sync & Barcode',
    accentColor: 'text-blue-500',
  },
  {
    id: 'dispatch',
    label: '5. Dispatch Bay',
    durationSeconds: 12,
    phaseTitle: 'Automated Insulated Bagging & Courier Handover',
    subtitle: 'Conveyor deposits the hot meal into a thermal courier bag. Smart pickup locker opens on rider QR scan.',
    badge: 'Smart Logistics',
    accentColor: 'text-purple-500',
  },
  {
    id: 'transit',
    label: '6. GPS Courier Route',
    durationSeconds: 12,
    phaseTitle: 'Express Road Transit & Food Thermal Retention',
    subtitle: 'Delivery partner in transit with heated backpack. GPS tracking broadcasts real-time ETA to customer phone.',
    badge: 'Live Transit',
    accentColor: 'text-cyan-500',
  },
  {
    id: 'delivery',
    label: '7. Customer Doorstep',
    durationSeconds: 12,
    phaseTitle: 'Steaming Hot Doorstep Delivery & Unboxing',
    subtitle: 'Customer unseals the intact holographic safety strip. Fresh meal delivered in 17 minutes flat with 0 human contact.',
    badge: 'Delivered Fresh',
    accentColor: 'text-emerald-400',
  },
];

const TOTAL_DURATION = SCENES.reduce((acc, s) => acc + s.durationSeconds, 0);

export const KitchenPackagingVideoModal: React.FC<KitchenPackagingVideoModalProps> = ({
  onClose,
  onLaunchLiveHub,
  onOpenBookDemo,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState<'biryani' | 'burger' | 'healthy'>('biryani');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Synthesize Web Audio sound effects for robotics & conveyors
  const playSoundEffect = (type: 'conveyor' | 'seal' | 'beep' | 'steam' | 'chime') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      if (type === 'beep') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.setValueAtTime(1760, now + 0.06);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.13);
      } else if (type === 'seal') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.25);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.31);
      } else if (type === 'steam') {
        // White noise burst simulation
        const bufferSize = ctx.sampleRate * 0.3;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 1400;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start(now);
      } else if (type === 'chime') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.45);
      }
    } catch {
      // AudioContext might require user interaction first
    }
  };

  // Determine current active scene based on currentTime
  let accumulatedTime = 0;
  let currentSceneIndex = 0;
  for (let i = 0; i < SCENES.length; i++) {
    if (currentTime < accumulatedTime + SCENES[i].durationSeconds) {
      currentSceneIndex = i;
      break;
    }
    accumulatedTime += SCENES[i].durationSeconds;
    if (i === SCENES.length - 1) {
      currentSceneIndex = i;
    }
  }

  const activeScene = SCENES[currentSceneIndex];
  const sceneProgress = Math.min(
    1,
    Math.max(
      0,
      (currentTime -
        SCENES.slice(0, currentSceneIndex).reduce(
          (acc, s) => acc + s.durationSeconds,
          0
        )) /
        activeScene.durationSeconds
    )
  );

  // Main video ticker loop
  useEffect(() => {
    if (!isPlaying) return;

    const intervalMs = 50;
    const increment = (intervalMs / 1000) * playbackSpeed;

    const timer = setInterval(() => {
      setCurrentTime((prev) => {
        const next = prev + increment;
        if (next >= TOTAL_DURATION) {
          return 0; // Loop seamlessly
        }
        return next;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed]);

  // Trigger sound cues on scene entry
  const lastSceneRef = useRef(currentSceneIndex);
  useEffect(() => {
    if (lastSceneRef.current !== currentSceneIndex) {
      lastSceneRef.current = currentSceneIndex;
      if (activeScene.id === 'cooking') playSoundEffect('steam');
      if (activeScene.id === 'sealing') playSoundEffect('seal');
      if (activeScene.id === 'labeling') playSoundEffect('beep');
      if (activeScene.id === 'delivery') playSoundEffect('chime');
    }
  }, [currentSceneIndex, activeScene.id]);

  // Jump to specific scene
  const handleJumpToScene = (index: number) => {
    const targetTime = SCENES.slice(0, index).reduce(
      (acc, s) => acc + s.durationSeconds,
      0
    );
    setCurrentTime(targetTime + 0.1);
  };

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Recipe parameters for interactive resource display
  const recipeData = {
    biryani: {
      name: "Chef's Special Paneer Tikka Biryani Box",
      itemCode: 'PB-8942',
      customer: 'Rohan Sharma',
      address: 'Flat 402, Green Glen Towers, Indiranagar',
      items: [
        { name: 'Fresh Malai Paneer', initial: '4.80 kg', deduct: '200 g', remaining: '4.60 kg', color: 'bg-amber-400' },
        { name: 'Aged Basmati Rice', initial: '14.5 kg', deduct: '350 g', remaining: '14.15 kg', color: 'bg-orange-400' },
        { name: 'Desi Ghee & Spices BOM', initial: '3.20 L', deduct: '35 ml', remaining: '3.16 L', color: 'bg-emerald-400' },
        { name: 'Cornstarch Eco Box', initial: '142 pcs', deduct: '1 unit', remaining: '141 pcs', color: 'bg-cyan-400' },
      ],
      temp: '82°C',
      drink: 'Saffron Mango Lassi (Sealed 250ml)',
    },
    burger: {
      name: 'Double Gourmet Truffle Crunch Burger Meal',
      itemCode: 'PB-9014',
      customer: 'Ananya Deshmukh',
      address: 'Villa 12, Palm Meadows, Whitefield',
      items: [
        { name: 'Artisan Brioche Buns', initial: '64 pairs', deduct: '1 pair', remaining: '63 pairs', color: 'bg-amber-400' },
        { name: 'Crisp Herb Potato Patties', initial: '120 pcs', deduct: '2 pcs', remaining: '118 pcs', color: 'bg-orange-400' },
        { name: 'Signature Truffle Mayo', initial: '2.40 L', deduct: '40 ml', remaining: '2.36 L', color: 'bg-emerald-400' },
        { name: 'Insulated Foil Burger Box', initial: '88 pcs', deduct: '1 unit', remaining: '87 pcs', color: 'bg-cyan-400' },
      ],
      temp: '78°C',
      drink: 'Iced Peach Sparkling Brew (300ml)',
    },
    healthy: {
      name: 'Superfood Quinoa Mediterranean Bowl',
      itemCode: 'PB-9150',
      customer: 'Vikram Mehta',
      address: 'Tower B - 1201, Prestige Tech Cloud',
      items: [
        { name: 'Organic Sprouted Quinoa', initial: '8.00 kg', deduct: '220 g', remaining: '7.78 kg', color: 'bg-amber-400' },
        { name: 'Hass Avocado & Edamame', initial: '5.50 kg', deduct: '110 g', remaining: '5.39 kg', color: 'bg-orange-400' },
        { name: 'Cold Pressed Olive Dressing', initial: '1.80 L', deduct: '25 ml', remaining: '1.77 L', color: 'bg-emerald-400' },
        { name: 'Biodegradable Sugarcane Bowl', initial: '210 pcs', deduct: '1 unit', remaining: '209 pcs', color: 'bg-cyan-400' },
      ],
      temp: '4°C Chilled',
      drink: 'Cold-Pressed Valencia Orange Detox',
    },
  };

  const currentRecipe = recipeData[selectedRecipe];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 lg:p-6 overflow-y-auto font-sans"
    >
      <div className="relative w-full max-w-5xl bg-[#0C0D14] border border-stone-800 text-white rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col my-auto max-h-[96vh]">
        {/* TOP VIDEO HEADER BAR */}
        <div className="px-4 sm:px-6 py-3.5 bg-[#12141F] border-b border-stone-800/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#F97316]/20 border border-orange-500/40 flex items-center justify-center text-[#F97316]">
              <Package className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F97316] font-mono">
                  Live Visual Simulation
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="hidden sm:inline px-2 py-0.5 rounded text-[10px] font-bold bg-stone-800 text-stone-300">
                  4K 60FPS ERP Visualizer
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-extrabold text-white tracking-tight font-display">
                Automated Kitchen Packaging & Doorstep Dispatch Engine
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-stone-300 hover:text-white transition-colors border border-stone-800"
              title={soundEnabled ? 'Mute Sound Effects' : 'Unmute Sound Effects'}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-[#F97316]" />
              ) : (
                <VolumeX className="w-4 h-4 text-stone-500" />
              )}
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="hidden sm:flex p-2 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-stone-300 hover:text-white transition-colors border border-stone-800"
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-stone-400 hover:text-white transition-colors border border-stone-800 ml-1"
              title="Close Video"
              id="close-kitchen-video-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* RECIPE SELECTION STRIP */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#151724] border-b border-stone-800 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#F97316]" />
              Active Recipe:
            </span>
            <div className="inline-flex rounded-lg bg-stone-900 p-1 border border-stone-800">
              <button
                onClick={() => setSelectedRecipe('biryani')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  selectedRecipe === 'biryani'
                    ? 'bg-[#F97316] text-white shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Biryani Box
              </button>
              <button
                onClick={() => setSelectedRecipe('burger')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  selectedRecipe === 'burger'
                    ? 'bg-[#F97316] text-white shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Gourmet Burger
              </button>
              <button
                onClick={() => setSelectedRecipe('healthy')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  selectedRecipe === 'healthy'
                    ? 'bg-[#F97316] text-white shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Superfood Bowl
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-stone-400 font-mono">
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Automated Packaging Active
            </span>
            <span className="hidden md:inline text-stone-600">•</span>
            <span className="hidden md:inline">Order {currentRecipe.itemCode}</span>
          </div>
        </div>

        {/* PRIMARY 16:9 VIDEO / VISUAL SIMULATION CANVAS */}
        <div className="relative w-full bg-[#07080D] min-h-[340px] sm:min-h-[420px] md:min-h-[460px] flex flex-col justify-between overflow-hidden select-none">
          {/* Animated Background Mesh & Ambient Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(#F97316_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* TOP HUD OVERLAY (Scene Title, Temperature, Latency) */}
          <div className="relative z-20 p-4 sm:p-6 flex items-start justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-stone-900/90 border border-stone-700 text-stone-300 font-mono">
                  Stage 0{currentSceneIndex + 1} of 0{SCENES.length}
                </span>
                <span
                  className={`text-xs font-bold uppercase tracking-wider font-mono ${activeScene.accentColor}`}
                >
                  {activeScene.badge}
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight font-display drop-shadow-md">
                {activeScene.phaseTitle}
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mt-1 leading-relaxed drop-shadow">
                {activeScene.subtitle}
              </p>
            </div>

            {/* Live Telemetry Gauges HUD */}
            <div className="hidden sm:flex flex-col items-end gap-1.5 font-mono text-[11px] text-stone-400 bg-[#12141F]/80 p-2.5 rounded-2xl border border-stone-800/80 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <Thermometer className="w-3.5 h-3.5 text-orange-400" />
                <span>Pack Chamber:</span>
                <span className="text-white font-bold">{currentRecipe.temp}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Cycle Speed:</span>
                <span className="text-white font-bold">1.4s / unit</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>Depletion Sync:</span>
                <span className="text-emerald-400 font-bold">&lt;0.08s</span>
              </div>
            </div>
          </div>

          {/* CENTER DYNAMIC VISUAL SIMULATION THEATER */}
          <div className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-8">
            <AnimatePresence mode="wait">
              {/* SCENE 1: RESOURCE BOM & INGREDIENT DEPLETION */}
              {activeScene.id === 'resources' && (
                <motion.div
                  key="scene-resources"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.35 }}
                  className="w-full max-w-3xl flex flex-col items-center"
                >
                  {/* Visual Ingredient Dispensers with Animated Weight Drops */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full mb-6">
                    {currentRecipe.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="relative rounded-2xl bg-[#12141F] border border-stone-800 p-3 sm:p-4 flex flex-col items-center text-center shadow-lg overflow-hidden group"
                      >
                        {/* Dispenser Chamber Tank Level */}
                        <div className="relative w-full h-24 sm:h-28 rounded-xl bg-stone-900/90 border border-stone-800 flex flex-col justify-end p-1.5 overflow-hidden mb-3">
                          {/* Animated liquid / solid level */}
                          <motion.div
                            initial={{ height: '85%' }}
                            animate={{ height: ['85%', '60%'] }}
                            transition={{ duration: 6, ease: 'easeInOut' }}
                            className={`w-full rounded-lg ${item.color} opacity-80 shadow-inner`}
                          />

                          {/* Falling ingredient particles */}
                          <motion.div
                            animate={{ y: [0, 40], opacity: [0, 1, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="absolute bottom-1 inset-x-0 mx-auto w-2 h-2 rounded-full bg-white shadow-sm"
                          />

                          {/* Dispense nozzle */}
                          <div className="absolute top-1 inset-x-0 mx-auto w-8 h-2 rounded-full bg-stone-700 border border-stone-600" />
                        </div>

                        <span className="text-xs font-bold text-white line-clamp-1">
                          {item.name}
                        </span>

                        {/* Subtraction Badge */}
                        <div className="mt-1 flex items-center justify-between w-full text-[11px] font-mono">
                          <span className="text-stone-500 line-through">
                            {item.initial}
                          </span>
                          <span className="text-orange-400 font-bold">
                            -{item.deduct}
                          </span>
                        </div>

                        <div className="mt-1.5 px-2 py-0.5 rounded-full bg-stone-800/90 text-[10px] font-mono font-bold text-emerald-400 border border-stone-700">
                          Remain: {item.remaining}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* KDS Dispatch Ingestion Summary Pill */}
                  <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-[#181A28] border border-stone-700/80 text-xs font-mono shadow-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-stone-300">KDS Ingestion:</span>
                    <span className="text-white font-bold">
                      Order {currentRecipe.itemCode}
                    </span>
                    <span className="text-stone-500">|</span>
                    <span className="text-orange-400 font-bold">
                      4 Recipe Components Metered
                    </span>
                  </div>
                </motion.div>
              )}

              {/* SCENE 2: ROBOTIC INDUCTION COOKING & ASSEMBLY */}
              {activeScene.id === 'cooking' && (
                <motion.div
                  key="scene-cooking"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.35 }}
                  className="w-full max-w-2xl flex flex-col items-center"
                >
                  <div className="relative w-full h-56 sm:h-64 rounded-3xl bg-[#11131E] border border-stone-800 flex items-center justify-center p-6 overflow-hidden shadow-2xl">
                    {/* Glowing Induction Heat Coils */}
                    <div className="absolute bottom-6 w-48 sm:w-60 h-16 rounded-full bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 opacity-70 blur-xl animate-pulse" />

                    {/* Robotic Overhead Arm */}
                    <div className="absolute top-0 inset-x-0 mx-auto flex flex-col items-center">
                      <div className="w-4 h-12 bg-stone-700 border-x border-stone-600" />
                      <div className="w-12 h-4 rounded-md bg-stone-800 border border-stone-600 flex items-center justify-around px-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      </div>
                    </div>

                    {/* Steaming Gourmet Food Bowl Container */}
                    <div className="relative flex flex-col items-center">
                      {/* Animated Steam Plumes */}
                      <div className="flex gap-4 mb-2">
                        <motion.div
                          animate={{ y: [-5, -25], opacity: [0, 0.8, 0], scale: [0.8, 1.4] }}
                          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                          className="w-4 h-8 rounded-full bg-stone-200/40 blur-xs"
                        />
                        <motion.div
                          animate={{ y: [-5, -30], opacity: [0, 0.9, 0], scale: [0.9, 1.6] }}
                          transition={{ duration: 1.8, repeat: Infinity, delay: 0.3, ease: 'easeOut' }}
                          className="w-5 h-9 rounded-full bg-stone-200/50 blur-xs"
                        />
                        <motion.div
                          animate={{ y: [-5, -24], opacity: [0, 0.7, 0], scale: [0.8, 1.3] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0.6, ease: 'easeOut' }}
                          className="w-4 h-8 rounded-full bg-stone-200/40 blur-xs"
                        />
                      </div>

                      {/* Main Thermal Bowl */}
                      <div className="relative w-40 sm:w-48 h-20 sm:h-24 rounded-b-3xl bg-gradient-to-b from-[#2A2018] to-[#16120E] border-2 border-amber-500/80 shadow-[0_10px_30px_rgba(249,115,22,0.4)] flex flex-col items-center justify-center p-3">
                        <div className="w-full h-3 rounded-full bg-amber-500/20 mb-1 border border-amber-500/40 flex items-center justify-center">
                          <span className="text-[9px] font-mono font-black text-amber-300">
                            {currentRecipe.temp} READY
                          </span>
                        </div>
                        <span className="text-xs font-bold text-white text-center line-clamp-1">
                          {currentRecipe.name}
                        </span>
                      </div>
                    </div>

                    {/* Sensor Target Crosshairs */}
                    <div className="absolute right-6 top-6 flex flex-col items-end font-mono text-[10px] text-stone-400">
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <Radio className="w-3 h-3 animate-spin" />
                        Target Locked: 78°C
                      </span>
                      <span>Thermal Accuracy: 99.8%</span>
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <span className="text-xs font-mono text-stone-400">
                      Automated Induction Heat Transfer Completed • Routing to Clamshell Sealer
                    </span>
                  </div>
                </motion.div>
              )}

              {/* SCENE 3: AUTOMATED HEAT SEALING & CLAMSHELL CAPPING */}
              {activeScene.id === 'sealing' && (
                <motion.div
                  key="scene-sealing"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.35 }}
                  className="w-full max-w-3xl flex flex-col items-center"
                >
                  {/* Conveyor Belt System with Moving Rollers */}
                  <div className="relative w-full h-64 rounded-3xl bg-[#11131E] border border-stone-800 flex flex-col justify-between p-6 overflow-hidden shadow-2xl">
                    {/* Top Hydraulic Clamping Press Head */}
                    <motion.div
                      animate={{ y: [0, 28, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-64 mx-auto flex flex-col items-center"
                    >
                      <div className="w-6 h-8 bg-stone-700 border-x border-stone-600" />
                      <div className="w-56 h-10 rounded-xl bg-gradient-to-r from-stone-800 via-stone-700 to-stone-800 border-2 border-emerald-500/80 shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span className="text-[11px] font-bold text-white uppercase tracking-wider font-mono">
                          PNEUMATIC SEAL HEAD
                        </span>
                      </div>
                    </motion.div>

                    {/* Meal Box & Saffron Lassi Container on Conveyor */}
                    <div className="relative flex items-center justify-center gap-4 z-10">
                      {/* Main Sealed Gourmet Box */}
                      <div className="relative w-44 sm:w-52 h-24 rounded-2xl bg-gradient-to-b from-stone-800 to-stone-900 border-2 border-emerald-400/90 shadow-xl flex flex-col items-center justify-center p-2.5">
                        {/* Laser scanline sweep */}
                        <motion.div
                          animate={{ x: [-80, 80] }}
                          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                          className="absolute inset-y-0 w-1 bg-emerald-400 shadow-[0_0_12px_#34D399]"
                        />

                        {/* Holographic Tamper Evident Safety Seal */}
                        <div className="w-full py-1 px-2 rounded bg-emerald-500/20 border border-emerald-400/80 flex items-center justify-center gap-1 mb-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span className="text-[9px] font-black font-mono text-emerald-300 tracking-wider">
                            TAMPER-PROOF SEALED
                          </span>
                        </div>

                        <span className="text-xs font-bold text-white text-center line-clamp-1">
                          {currentRecipe.name}
                        </span>
                      </div>

                      {/* Sealed Beverage Canister */}
                      <div className="relative w-16 sm:w-20 h-24 rounded-2xl bg-stone-800/90 border border-stone-700 flex flex-col items-center justify-between p-2">
                        <div className="w-6 h-2 rounded-full bg-cyan-400/80" />
                        <span className="text-[9px] font-bold text-cyan-300 text-center leading-tight">
                          SEALED DRINK
                        </span>
                        <span className="text-[8px] font-mono text-stone-400">250ml</span>
                      </div>
                    </div>

                    {/* Mechanized Conveyor Belt Track */}
                    <div className="relative w-full h-8 bg-stone-950 rounded-xl border border-stone-800 flex items-center justify-around px-4 overflow-hidden">
                      {/* Conveyor Rollers */}
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 rounded-full border border-stone-600 bg-stone-800 flex items-center justify-center"
                        >
                          <div className="w-1.5 h-0.5 bg-stone-400" />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-xs font-mono text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Hermetic Clamshell Compression Verified: 0.00% Oxygen Leakage</span>
                  </div>
                </motion.div>
              )}

              {/* SCENE 4: THERMAL GST & UPI QR INVOICE LABELING */}
              {activeScene.id === 'labeling' && (
                <motion.div
                  key="scene-labeling"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.35 }}
                  className="w-full max-w-2xl flex flex-col items-center"
                >
                  <div className="relative w-full rounded-3xl bg-[#11131E] border border-stone-800 p-6 shadow-2xl flex flex-col sm:flex-row items-center gap-6">
                    {/* Simulated High-Density Thermal Invoice Label */}
                    <div className="w-full sm:w-72 bg-white text-stone-900 rounded-2xl p-4 shadow-xl border-2 border-stone-300 font-mono text-xs flex flex-col justify-between">
                      <div className="border-b border-dashed border-stone-400 pb-2 mb-2">
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-sm tracking-tight">
                            POSBYTZ CLOUD ERP
                          </span>
                          <span className="text-[10px] font-bold bg-stone-900 text-white px-1.5 py-0.5 rounded">
                            EXPRESS
                          </span>
                        </div>
                        <span className="text-[9px] text-stone-500 block">
                          GSTIN: 29AAAAA0000A1Z5 • FSSAI: 112203340001
                        </span>
                      </div>

                      <div className="space-y-1 mb-2 text-[11px]">
                        <div className="flex justify-between">
                          <span className="font-bold">Order ID:</span>
                          <span className="font-mono">{currentRecipe.itemCode}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-bold">Customer:</span>
                          <span>{currentRecipe.customer}</span>
                        </div>
                        <div className="text-[10px] text-stone-600 line-clamp-1">
                          {currentRecipe.address}
                        </div>
                      </div>

                      {/* Live Dynamic UPI QR Code & Barcode */}
                      <div className="pt-2 border-t border-dashed border-stone-400 flex items-center justify-between">
                        <div className="w-14 h-14 bg-stone-100 border border-stone-300 rounded flex items-center justify-center p-1">
                          <QrCode className="w-12 h-12 text-stone-800" />
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-[9px] font-bold text-emerald-700 uppercase">
                            PAID VIA UPI SOUNDBOX
                          </span>
                          <span className="text-sm font-extrabold text-stone-900">
                            ₹485.00
                          </span>
                          <span className="text-[8px] text-stone-500 font-mono">
                            CGST 2.5% + SGST 2.5%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Robotic Applicator Arm & Scanner */}
                    <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-mono font-bold mb-3 border border-blue-500/40">
                        <Zap className="w-3.5 h-3.5" />
                        Robotic Thermal Applicator
                      </div>
                      <h4 className="text-base font-bold text-white font-display mb-1">
                        High-Speed Label Affixing (0.3s)
                      </h4>
                      <p className="text-xs text-stone-400 leading-relaxed font-body">
                        Thermal printhead stamps Indian GST-compliant receipt directly onto the sealed meal container. Barcode scanner validates delivery hub coordinates.
                      </p>

                      <div className="mt-4 flex items-center gap-2 text-xs font-mono text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>FSSAI License & Temperature Barcode Validated</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SCENE 5: AUTOMATED BAGGING & DISPATCH LOCKER */}
              {activeScene.id === 'dispatch' && (
                <motion.div
                  key="scene-dispatch"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.35 }}
                  className="w-full max-w-3xl flex flex-col items-center"
                >
                  <div className="relative w-full h-64 rounded-3xl bg-[#11131E] border border-stone-800 p-6 flex items-center justify-around overflow-hidden shadow-2xl">
                    {/* Thermal Insulated CodeX Bag */}
                    <div className="relative flex flex-col items-center">
                      <div className="w-36 sm:w-44 h-44 rounded-2xl bg-gradient-to-b from-[#1E202E] to-[#12131D] border-2 border-purple-500/80 shadow-2xl flex flex-col items-center justify-between p-3">
                        <div className="w-12 h-2 rounded-full bg-purple-400/80" />
                        <div className="flex flex-col items-center">
                          <ShoppingBag className="w-8 h-8 text-purple-400 mb-1" />
                          <span className="text-xs font-bold text-white font-display">
                            THERMAL BAG
                          </span>
                          <span className="text-[10px] font-mono text-purple-300">
                            Insulated 3-Ply
                          </span>
                        </div>
                        <div className="w-full py-1 rounded bg-stone-800 text-center font-mono text-[9px] text-stone-300">
                          SEAL ID: #CX-9024
                        </div>
                      </div>
                    </div>

                    {/* Conveyor Chute to Smart Dispatch Locker */}
                    <div className="flex flex-col items-center gap-2">
                      <motion.div
                        animate={{ x: [0, 8, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="p-3 rounded-2xl bg-stone-900 border border-stone-700 text-stone-300"
                      >
                        <ArrowRight className="w-6 h-6 text-[#F97316]" />
                      </motion.div>
                      <span className="text-[10px] font-mono text-stone-400">
                        Chute Transfer
                      </span>
                    </div>

                    {/* Smart Courier Pickup Locker */}
                    <div className="w-40 sm:w-48 h-44 rounded-2xl bg-stone-900 border-2 border-stone-700 p-3 flex flex-col justify-between shadow-xl">
                      <div className="flex items-center justify-between border-b border-stone-800 pb-1.5">
                        <span className="text-[10px] font-bold text-white font-mono">
                          LOCKER BAY #04
                        </span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      </div>
                      <div className="flex flex-col items-center py-2 text-center">
                        <QrCode className="w-8 h-8 text-orange-400 mb-1" />
                        <span className="text-[10px] font-mono text-stone-300">
                          Courier Scan to Unlock
                        </span>
                      </div>
                      <div className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 text-center font-mono text-[9px] font-bold">
                        RIDER ARRIVED (DL-04-EV)
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-xs font-mono text-stone-400">
                    Rider Rahul K. authenticated via OTP QR • Bag secured in heated carrier
                  </div>
                </motion.div>
              )}

              {/* SCENE 6: GPS COURIER ROUTE IN TRANSIT */}
              {activeScene.id === 'transit' && (
                <motion.div
                  key="scene-transit"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.35 }}
                  className="w-full max-w-3xl flex flex-col items-center"
                >
                  <div className="relative w-full h-64 rounded-3xl bg-[#0B0D16] border border-stone-800 p-6 flex flex-col justify-between overflow-hidden shadow-2xl">
                    {/* Simulated GPS Dark Map Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#161928_1px,transparent_1px),linear-gradient(to_bottom,#161928_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />

                    {/* Delivery Route Path */}
                    <div className="relative z-10 flex items-center justify-between px-6 pt-6">
                      {/* Kitchen Hub Origin */}
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-2xl bg-stone-900 border-2 border-orange-500 flex items-center justify-center text-orange-400 shadow-lg">
                          <ChefHat className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-bold text-white mt-1">
                          CodeX Kitchen
                        </span>
                        <span className="text-[9px] font-mono text-stone-500">
                          Indiranagar 100ft
                        </span>
                      </div>

                      {/* Moving Scooter Courier on Route */}
                      <div className="flex-1 mx-4 relative flex items-center">
                        <div className="w-full h-1 bg-stone-800 rounded-full overflow-hidden">
                          <motion.div
                            animate={{ width: ['20%', '85%'] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            className="h-full bg-gradient-to-r from-orange-500 via-cyan-400 to-emerald-400"
                          />
                        </div>

                        {/* Pulsing Courier Icon */}
                        <motion.div
                          animate={{ x: [20, 240, 20] }}
                          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                          className="absolute -top-3.5 p-1.5 rounded-full bg-cyan-500 text-white shadow-[0_0_15px_#06B6D4]"
                        >
                          <Truck className="w-4 h-4" />
                        </motion.div>
                      </div>

                      {/* Customer Residence Destination */}
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-2xl bg-stone-900 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 shadow-lg">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-bold text-white mt-1">
                          Customer Home
                        </span>
                        <span className="text-[9px] font-mono text-stone-500">
                          Green Glen Towers
                        </span>
                      </div>
                    </div>

                    {/* Live Transit Telemetry Footer */}
                    <div className="relative z-10 flex items-center justify-between pt-4 border-t border-stone-800/80 font-mono text-xs">
                      <div className="flex items-center gap-4 text-stone-300">
                        <span>Speed: <strong className="text-white">32 km/h</strong></span>
                        <span>Distance: <strong className="text-white">1.8 km</strong></span>
                        <span>Bag Temp: <strong className="text-amber-400">76°C Warm</strong></span>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/40">
                        ETA: 6 MINS
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SCENE 7: CUSTOMER DOORSTEP UNBOXING */}
              {activeScene.id === 'delivery' && (
                <motion.div
                  key="scene-delivery"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.35 }}
                  className="w-full max-w-2xl flex flex-col items-center"
                >
                  <div className="relative w-full rounded-3xl bg-[#11131E] border border-stone-800 p-6 shadow-2xl flex flex-col sm:flex-row items-center gap-6">
                    {/* Steaming Unboxed Gourmet Meal Box */}
                    <div className="relative w-52 sm:w-60 h-44 rounded-2xl bg-gradient-to-b from-[#2A231C] to-[#15110E] border-2 border-amber-500/90 shadow-[0_0_30px_rgba(249,115,22,0.3)] flex flex-col items-center justify-center p-3">
                      {/* Fresh Steam Rising Effect */}
                      <div className="flex gap-3 mb-1">
                        <motion.div
                          animate={{ y: [-5, -28], opacity: [0, 0.9, 0] }}
                          transition={{ duration: 1.6, repeat: Infinity }}
                          className="w-3 h-8 rounded-full bg-white/40 blur-xs"
                        />
                        <motion.div
                          animate={{ y: [-5, -34], opacity: [0, 1, 0] }}
                          transition={{ duration: 1.9, repeat: Infinity, delay: 0.2 }}
                          className="w-4 h-9 rounded-full bg-white/50 blur-xs"
                        />
                        <motion.div
                          animate={{ y: [-5, -26], opacity: [0, 0.8, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                          className="w-3 h-7 rounded-full bg-white/40 blur-xs"
                        />
                      </div>

                      <span className="text-xs font-bold text-white text-center">
                        {currentRecipe.name}
                      </span>
                      <span className="text-[10px] text-amber-300 font-mono mt-0.5">
                        Delivered at 74°C Perfect Heat
                      </span>

                      <div className="mt-2 flex items-center gap-1 text-emerald-400 font-mono text-[9px] font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Security Seal Broken by Customer</span>
                      </div>
                    </div>

                    {/* Customer Smartphone Notification Screen */}
                    <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold mb-3 border border-emerald-500/40">
                        <Sparkles className="w-3.5 h-3.5" />
                        Delivery Complete (17 Mins)
                      </div>
                      <h4 className="text-lg font-bold text-white font-display mb-1">
                        Enjoy your meal, {currentRecipe.customer}!
                      </h4>
                      <p className="text-xs text-stone-300 leading-relaxed font-body mb-3">
                        Zero human touchpoints during packaging. Automated recipe depletion registered in central ERP ledger with instant GST invoice archive.
                      </p>

                      <div className="grid grid-cols-2 gap-2 w-full text-xs font-mono">
                        <div className="p-2 rounded-xl bg-stone-900 border border-stone-800">
                          <span className="text-stone-500 text-[10px] block">Total Prep & Pack:</span>
                          <strong className="text-white">3 min 12s</strong>
                        </div>
                        <div className="p-2 rounded-xl bg-stone-900 border border-stone-800">
                          <span className="text-stone-500 text-[10px] block">Transit Time:</span>
                          <strong className="text-emerald-400">14 mins</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* BOTTOM TIMELINE & CONTROLS STRIP */}
          <div className="relative z-20 px-4 sm:px-6 py-3 bg-[#11131F]/95 border-t border-stone-800 flex flex-col gap-2">
            {/* Scrubbable Video Progress Track */}
            <div
              className="relative w-full h-2 bg-stone-800/80 rounded-full overflow-hidden cursor-pointer group"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                setCurrentTime(Math.min(TOTAL_DURATION, Math.max(0, pos * TOTAL_DURATION)));
              }}
            >
              <div
                className="h-full bg-gradient-to-r from-[#F97316] via-amber-400 to-emerald-400 rounded-full transition-all duration-75"
                style={{ width: `${(currentTime / TOTAL_DURATION) * 100}%` }}
              />
            </div>

            {/* Scene Selectors Strip */}
            <div className="flex items-center justify-between gap-1 overflow-x-auto py-1 scrollbar-none">
              {SCENES.map((scene, idx) => (
                <button
                  key={scene.id}
                  onClick={() => handleJumpToScene(idx)}
                  className={`shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all flex items-center gap-1.5 ${
                    currentSceneIndex === idx
                      ? 'bg-[#F97316] text-white font-bold shadow-md'
                      : 'bg-stone-900/80 text-stone-400 hover:text-white hover:bg-stone-800'
                  }`}
                >
                  <span>{scene.label}</span>
                </button>
              ))}
            </div>

            {/* Main Playback Bar Controls */}
            <div className="flex items-center justify-between text-xs pt-1">
              <div className="flex items-center gap-3">
                {/* Play / Pause */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-8 h-8 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white flex items-center justify-center shadow-md transition-all cursor-pointer"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                </button>

                {/* Restart */}
                <button
                  onClick={() => setCurrentTime(0)}
                  className="p-1.5 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
                  title="Restart Video"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Time Display */}
                <span className="font-mono text-stone-300">
                  {formatTime(currentTime)}{' '}
                  <span className="text-stone-600">/</span> {formatTime(TOTAL_DURATION)}
                </span>
              </div>

              {/* Speed Multiplier & Interactive Live Actions */}
              <div className="flex items-center gap-2">
                <div className="inline-flex rounded-lg bg-stone-900 border border-stone-800 p-0.5 text-[10px] font-mono">
                  {[0.5, 1, 1.5, 2].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => setPlaybackSpeed(spd)}
                      className={`px-2 py-0.5 rounded ${
                        playbackSpeed === spd
                          ? 'bg-[#F97316] text-white font-bold'
                          : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>

                {onLaunchLiveHub && (
                  <button
                    onClick={() => {
                      onClose();
                      onLaunchLiveHub();
                    }}
                    className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F97316] text-white text-xs font-bold hover:bg-[#EA580C] shadow-sm transition-all"
                  >
                    <span>Test POS Billing</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM MODAL FOOTER */}
        <div className="px-4 sm:px-6 py-3.5 bg-[#0F101A] border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-400 font-body">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>
              Engineered by Pawan Patil & Team CodeX with automated KDS, UPI QR, and Indian GST.
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {onOpenBookDemo && (
              <button
                onClick={() => {
                  onClose();
                  onOpenBookDemo();
                }}
                className="px-4 py-2 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white font-semibold border border-stone-800 transition-all"
              >
                Schedule Guided Walkthrough
              </button>
            )}
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white font-bold shadow-md transition-all cursor-pointer"
            >
              Done Watching
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
