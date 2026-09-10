import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, type MotionValue } from 'motion/react';
import { cn } from '@/lib/utils';
import { Sparkles, ArrowRight, Play, Utensils, Star, Clock, CheckCircle2 } from 'lucide-react';

export interface FloatingFoodItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  tag: string;
  tagIcon?: string;
  price?: string;
  positionClass: string;
  parallaxSpeed?: number; // negative moves faster down, positive moves slower
  sizeClass?: string;
  floatDelay?: number;
}

export interface FloatingFoodHeroProps {
  eyebrow?: React.ReactNode;
  title: string;
  highlightedWord?: string;
  description: string;
  items?: FloatingFoodItem[];
  primaryCtaText?: string;
  onPrimaryCta?: () => void;
  secondaryCtaText?: string;
  onSecondaryCta?: () => void;
  className?: string;
}

export function FloatingFoodHero({
  eyebrow,
  title = "Better Food Operations for Growing Kitchens",
  highlightedWord = "Better Food",
  description = "From bustling cafes to 50+ outlet restaurant chains across India. Experience unified cloud billing, instant KDS kitchen dispatch, UPI QR, and live inventory depletion.",
  items,
  primaryCtaText = "Launch POS Terminal",
  onPrimaryCta,
  secondaryCtaText = "Watch Demo",
  onSecondaryCta,
  className,
}: FloatingFoodHeroProps) {
  const containerRef = useRef<HTMLElement>(null);

  // Parallax scroll hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.001,
  });

  // Multi-tier parallax transformations for background and text
  const yText = useTransform(smoothProgress, [0, 1], [0, 80]);
  const opacityText = useTransform(smoothProgress, [0, 0.8], [1, 0.2]);
  const scaleText = useTransform(smoothProgress, [0, 1], [1, 0.95]);

  // Ambient glows parallax
  const glowY1 = useTransform(smoothProgress, [0, 1], [0, -120]);
  const glowY2 = useTransform(smoothProgress, [0, 1], [0, 140]);

  // Default curated food items placed strictly on outer periphery with safe central clear zone
  const defaultItems: FloatingFoodItem[] = [
    {
      id: 'burger',
      src: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80',
      alt: 'Artisan Gourmet Cheeseburger',
      title: 'Truffle Smash Burger',
      tag: '🔥 8m Prep • KDS Active',
      price: '₹ 380',
      positionClass: 'top-6 left-3 sm:left-6 md:top-10 md:left-12 lg:left-16',
      parallaxSpeed: -90,
      sizeClass: 'w-36 sm:w-44 md:w-52 lg:w-56',
      floatDelay: 0,
    },
    {
      id: 'dumplings',
      src: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=500&auto=format&fit=crop&q=80',
      alt: 'Fresh Bamboo Steamer Dim Sum',
      title: 'Steamed Crystal Bao',
      tag: '⭐ 4.9 • Best Seller',
      price: '₹ 320',
      positionClass: 'top-8 right-3 sm:right-6 md:top-12 md:right-12 lg:right-16',
      parallaxSpeed: -130,
      sizeClass: 'w-36 sm:w-44 md:w-52 lg:w-56',
      floatDelay: 0.4,
    },
    {
      id: 'pizza',
      src: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=80',
      alt: 'Neapolitan Sourdough Pizza',
      title: 'Wood-Fired Margherita',
      tag: '⚡ Table 07 • Paid UPI',
      price: '₹ 540',
      positionClass: 'bottom-8 right-3 sm:right-6 md:bottom-12 md:right-14 lg:right-20',
      parallaxSpeed: 70,
      sizeClass: 'w-36 sm:w-44 md:w-52 lg:w-60',
      floatDelay: 0.8,
    },
    {
      id: 'salad',
      src: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=80',
      alt: 'Fresh Mediterranean Garden Salad',
      title: 'Quinoa Garden Bowl',
      tag: '🌱 Inventory Depleted',
      price: '₹ 290',
      positionClass: 'bottom-8 left-3 sm:left-6 md:bottom-12 md:left-14 lg:left-20',
      parallaxSpeed: 90,
      sizeClass: 'w-36 sm:w-44 md:w-52 lg:w-56',
      floatDelay: 1.2,
    },
  ];

  const activeItems = items || defaultItems;

  return (
    <section
      ref={containerRef}
      className={cn(
        'relative w-full min-h-[70vh] lg:min-h-[82vh] flex items-center justify-center overflow-hidden bg-ambient-light py-16 md:py-24 border-b border-stone-200/70',
        className
      )}
      id="floating-food-hero-section"
    >
      {/* Background Micro Dot Grid */}
      <div className="absolute inset-0 bg-dot-matrix opacity-40 pointer-events-none" />

      {/* Atmospheric Parallax Ambient Glows */}
      <motion.div
        style={{ y: glowY1 }}
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-br from-orange-400/15 via-amber-300/10 to-transparent blur-[120px] rounded-full"
      />
      <motion.div
        style={{ y: glowY2 }}
        className="pointer-events-none absolute -bottom-20 right-10 w-[450px] h-[450px] bg-gradient-to-tl from-rose-400/10 via-orange-300/10 to-transparent blur-[100px] rounded-full"
      />

      {/* Floating Orbital Food Cards with Differential Parallax (Strictly around periphery) */}
      <div className="absolute inset-0 max-w-[1440px] mx-auto pointer-events-none z-10">
        {activeItems.map((item, index) => {
          // Calculate parallax speed for each item
          const speed = item.parallaxSpeed ?? (index % 2 === 0 ? -90 : 80);
          return (
            <ParallaxFoodCard
              key={item.id || index}
              item={item}
              speed={speed}
              smoothProgress={smoothProgress}
            />
          );
        })}
      </div>

      {/* Central Hero Content - Unobstructed and Perfectly Centered */}
      <motion.div
        style={{
          y: yText,
          opacity: opacityText,
          scale: scaleText,
        }}
        className="relative z-20 container mx-auto px-4 sm:px-6 text-center max-w-3xl"
      >
        {/* Eyebrow Badge */}
        {eyebrow ? (
          eyebrow
        ) : (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-orange-200/80 shadow-xs mb-6 text-xs font-semibold text-stone-800"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F97316] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F97316]"></span>
            </span>
            <span className="text-orange-950">Next-Gen Foodservice ERP</span>
            <span className="text-stone-300">•</span>
            <span className="text-[#F97316] font-bold">Pawan Patil • Team CodeX</span>
          </motion.div>
        )}

        {/* Display Typography with Mathematical Scale & High Contrast */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-stone-900 font-display leading-[1.12] drop-shadow-xs"
        >
          {title.includes(highlightedWord) ? (
            <>
              {title.split(highlightedWord)[0]}
              <span className="relative inline-block text-[#F97316] mx-1.5">
                <span className="relative z-10">{highlightedWord}</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-orange-200/50 -z-0 rounded-sm transform -rotate-1"></span>
              </span>
              {title.split(highlightedWord)[1]}
            </>
          ) : (
            title
          )}
        </motion.h1>

        {/* Refined Body Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg md:text-xl leading-relaxed text-stone-600 font-body max-w-2xl mx-auto"
        >
          {description}
        </motion.p>

        {/* Action Button Cluster */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3.5"
        >
          {onPrimaryCta && (
            <button
              onClick={onPrimaryCta}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#F97316] text-white font-bold text-sm shadow-[0_10px_25px_-3px_rgba(249,115,22,0.4)] hover:bg-[#EA580C] hover:shadow-[0_14px_30px_-3px_rgba(249,115,22,0.5)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all pointer-events-auto"
              id="floating-hero-primary-btn"
            >
              <span>{primaryCtaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {onSecondaryCta && (
            <button
              onClick={onSecondaryCta}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/95 text-stone-800 font-bold text-sm border border-stone-200/90 shadow-sm hover:bg-stone-50 hover:border-stone-300 transform hover:-translate-y-0.5 active:translate-y-0 transition-all pointer-events-auto"
              id="floating-hero-secondary-btn"
            >
              <Play className="w-4 h-4 text-[#F97316] fill-[#F97316]/20" />
              <span>{secondaryCtaText}</span>
            </button>
          )}
        </motion.div>

        {/* Micro-Features Checklist */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs font-semibold text-stone-600"
        >
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>UPI QR & Soundbox Ready</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Recipe BOM Depletion</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Offline-First POS Cloud</span>
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

/**
 * Individual Food Card with 3D Parallax Drift & Hover Elevation
 */
interface ParallaxFoodCardProps {
  item: FloatingFoodItem;
  speed: number;
  smoothProgress: MotionValue<number>;
}

const ParallaxFoodCard: React.FC<ParallaxFoodCardProps> = ({
  item,
  speed,
  smoothProgress,
}) => {
  const y = useTransform(smoothProgress, [0, 1], [0, speed]);

  return (
    <motion.div
      style={{ y }}
      className={cn(
        'absolute pointer-events-auto transition-transform duration-300 hover:scale-105 hover:z-30',
        item.positionClass
      )}
    >
      <div
        className={cn(
          'relative rounded-2xl p-1.5 sm:p-2 bg-white/95 backdrop-blur-md shadow-[0_16px_36px_-6px_rgba(0,0,0,0.12)] border border-stone-200/90 group',
          item.sizeClass,
          item.floatDelay ? 'animate-float-reverse' : 'animate-float'
        )}
      >
        <div className="relative overflow-hidden rounded-xl aspect-square bg-stone-100">
          <img
            src={item.src}
            alt={item.alt}
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          {item.price && (
            <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-stone-900/80 text-white font-bold text-[11px] backdrop-blur-xs font-mono shadow-sm">
              {item.price}
            </span>
          )}
        </div>

        {/* Card Metadata Pill */}
        <div className="mt-2 px-1">
          <p className="text-xs font-bold text-stone-900 truncate leading-tight">
            {item.title}
          </p>
          <div className="mt-1 flex items-center justify-between">
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#F97316] bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200/60 truncate">
              {item.tag}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
