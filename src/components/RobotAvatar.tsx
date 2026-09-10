import React from 'react';
import { motion } from 'motion/react';

export type BotEmotion = 'idle' | 'happy' | 'thinking' | 'talking' | 'waving';

interface RobotAvatarProps {
  emotion?: BotEmotion;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  isFloating?: boolean;
}

export const RobotAvatar: React.FC<RobotAvatarProps> = ({
  emotion = 'idle',
  size = 'md',
  className = '',
  isFloating = true,
}) => {
  const sizeMap = {
    sm: { width: 40, height: 44, antennaSize: 6, eyeSize: 4 },
    md: { width: 64, height: 70, antennaSize: 8, eyeSize: 6 },
    lg: { width: 96, height: 104, antennaSize: 10, eyeSize: 9 },
    xl: { width: 130, height: 142, antennaSize: 14, eyeSize: 12 },
  };

  const currentSize = sizeMap[size];

  // Floating animation variants
  const floatVariants = {
    idle: {
      y: [-2, 3, -2],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
    waving: {
      y: [-4, 2, -4],
      rotate: [-1, 2, -1],
      transition: {
        duration: 1.8,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
    thinking: {
      y: [-1, 1, -1],
      rotate: [-2, 2, -2],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
    talking: {
      y: [-3, 2, -3],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
    happy: {
      y: [-6, 2, -6],
      scale: [1, 1.05, 1],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      {/* Dynamic Animated Robot Body */}
      <motion.div
        variants={isFloating ? floatVariants : undefined}
        animate={isFloating ? emotion : undefined}
        className="relative flex flex-col items-center"
      >
        {/* Antenna with pulsing beacon */}
        <div className="relative flex flex-col items-center">
          <motion.div
            animate={
              emotion === 'thinking'
                ? {
                    scale: [1, 1.4, 1],
                    backgroundColor: ['#F97316', '#38BDF8', '#F97316'],
                    boxShadow: [
                      '0 0 10px #F97316',
                      '0 0 18px #38BDF8',
                      '0 0 10px #F97316',
                    ],
                  }
                : emotion === 'talking'
                ? {
                    scale: [1, 1.3, 1],
                    boxShadow: [
                      '0 0 8px #F97316',
                      '0 0 16px #F97316',
                      '0 0 8px #F97316',
                    ],
                  }
                : {
                    scale: [1, 1.15, 1],
                    boxShadow: [
                      '0 0 6px #F97316',
                      '0 0 12px #F97316',
                      '0 0 6px #F97316',
                    ],
                  }
            }
            transition={{
              duration: emotion === 'thinking' ? 0.6 : 1.6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="rounded-full bg-[#F97316] relative z-10"
            style={{
              width: currentSize.antennaSize,
              height: currentSize.antennaSize,
            }}
          >
            {/* Ping effect ring on antenna */}
            <span className="animate-ping absolute inset-0 rounded-full bg-orange-400 opacity-75"></span>
          </motion.div>

          {/* Metallic stem */}
          <div
            className="w-1 bg-gradient-to-b from-stone-400 to-stone-600 rounded-t-sm"
            style={{ height: size === 'sm' ? 6 : size === 'md' ? 9 : 14 }}
          />
        </div>

        {/* Head Shell Container */}
        <div className="relative">
          {/* Ear Modules (Cyan/Orange audio pulse circles) */}
          <div className="absolute top-1/2 -left-2 -translate-y-1/2 flex items-center justify-center">
            <motion.div
              animate={
                emotion === 'talking' || emotion === 'thinking'
                  ? { scale: [0.9, 1.2, 0.9] }
                  : { scale: [1, 1.05, 1] }
              }
              transition={{ duration: 0.8, repeat: Infinity }}
              className="w-2.5 h-4 sm:w-3 sm:h-5 rounded-l-md bg-stone-800 border-l border-orange-500/80 shadow-[0_0_8px_rgba(249,115,22,0.5)] flex items-center justify-center"
            >
              <span className="w-1 h-2 rounded-full bg-[#F97316] animate-pulse" />
            </motion.div>
          </div>

          <div className="absolute top-1/2 -right-2 -translate-y-1/2 flex items-center justify-center">
            <motion.div
              animate={
                emotion === 'talking' || emotion === 'thinking'
                  ? { scale: [0.9, 1.2, 0.9] }
                  : { scale: [1, 1.05, 1] }
              }
              transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
              className="w-2.5 h-4 sm:w-3 sm:h-5 rounded-r-md bg-stone-800 border-r border-orange-500/80 shadow-[0_0_8px_rgba(249,115,22,0.5)] flex items-center justify-center"
            >
              <span className="w-1 h-2 rounded-full bg-[#F97316] animate-pulse" />
            </motion.div>
          </div>

          {/* Main Metallic Curved Head */}
          <div
            className="relative rounded-2xl md:rounded-3xl bg-gradient-to-b from-[#2A2B36] via-[#1E1F2A] to-[#14151E] p-1.5 sm:p-2 border-2 border-stone-700/80 shadow-[0_8px_20px_rgba(0,0,0,0.35)] overflow-hidden"
            style={{
              width: currentSize.width,
              height: currentSize.height * 0.82,
            }}
          >
            {/* Top Gloss Highlight */}
            <div className="absolute top-0 inset-x-2 h-2.5 bg-gradient-to-b from-white/20 to-transparent rounded-t-xl pointer-events-none" />

            {/* Dark LED Visor Screen */}
            <div className="relative w-full h-full rounded-xl md:rounded-2xl bg-[#090A10] border border-stone-800 flex flex-col items-center justify-center overflow-hidden p-1 shadow-inner">
              {/* Micro CRT Scanline overlay effect */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_3px] opacity-30 pointer-events-none" />

              {/* Eyes Expression System */}
              <div className="flex items-center justify-center gap-2 sm:gap-3.5 z-10">
                {/* Left Eye */}
                {renderEye(emotion, 'left', currentSize.eyeSize)}

                {/* Right Eye */}
                {renderEye(emotion, 'right', currentSize.eyeSize)}
              </div>

              {/* Mouth / Audio Equalizer System */}
              <div className="mt-1.5 flex items-center justify-center h-2.5 z-10">
                {renderMouth(emotion, size)}
              </div>
            </div>
          </div>
        </div>

        {/* Small Floating Robotic Hands (Waving on Waving/Happy) */}
        <div className="w-full flex justify-between px-1 -mt-1 pointer-events-none">
          {/* Left Hand */}
          <motion.div
            animate={
              emotion === 'waving'
                ? {
                    rotate: [0, -35, 10, -30, 0],
                    y: [-1, -6, -2, -6, -1],
                  }
                : emotion === 'talking'
                ? { y: [0, -2, 0] }
                : { y: [0, 1, 0] }
            }
            transition={{
              duration: emotion === 'waving' ? 1.2 : 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-gradient-to-br from-stone-600 to-stone-800 border border-stone-600 shadow-sm"
          />

          {/* Right Hand */}
          <motion.div
            animate={
              emotion === 'happy'
                ? {
                    y: [-2, -7, -2],
                    rotate: [0, 20, -10, 0],
                  }
                : emotion === 'talking'
                ? { y: [-1, 1, -1] }
                : { y: [0, 1, 0] }
            }
            transition={{
              duration: emotion === 'happy' ? 0.9 : 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.1,
            }}
            className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-gradient-to-bl from-stone-600 to-stone-800 border border-stone-600 shadow-sm"
          />
        </div>
      </motion.div>

      {/* Floating Ambient Shadow Underneath */}
      {isFloating && (
        <motion.div
          animate={{
            scale: emotion === 'happy' ? [0.65, 0.9, 0.65] : [0.75, 1, 0.75],
            opacity: [0.2, 0.45, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-2 w-3/4 h-2 rounded-full bg-stone-900/40 blur-xs"
        />
      )}
    </div>
  );
};

// Helper to render eyes based on robot's emotional state
function renderEye(emotion: BotEmotion | string, side: 'left' | 'right', eyeSize: number) {
  if (emotion === 'happy' || emotion === 'waving') {
    // Cheerful happy curve eyes (^ ^)
    return (
      <motion.div
        animate={{ scaleY: [1, 0.3, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, times: [0, 0.05, 0.1] }}
        className="text-[#F97316] font-black text-xs sm:text-sm leading-none drop-shadow-[0_0_6px_rgba(249,115,22,0.8)]"
      >
        ^
      </motion.div>
    );
  }

  if (emotion === 'thinking') {
    // Rotating digital gears/scanning circles
    return (
      <motion.div
        animate={{
          rotate: side === 'left' ? 360 : -360,
          scale: [0.85, 1.15, 0.85],
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        className="rounded-full border-2 border-dashed border-[#38BDF8] shadow-[0_0_8px_#38BDF8]"
        style={{ width: eyeSize + 2, height: eyeSize + 2 }}
      />
    );
  }

  if (emotion === 'talking') {
    // Bright focused eyes with micro pupil dilation
    return (
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          boxShadow: [
            '0 0 6px #F97316',
            '0 0 12px #F97316',
            '0 0 6px #F97316',
          ],
        }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="rounded-full bg-[#F97316] flex items-center justify-center relative"
        style={{ width: eyeSize, height: eyeSize }}
      >
        <span className="w-1 h-1 rounded-full bg-white absolute top-0.5 right-0.5" />
      </motion.div>
    );
  }

  // Default 'idle' eye with realistic periodic blink
  return (
    <motion.div
      animate={{
        scaleY: [1, 1, 0.1, 1, 1],
        boxShadow: [
          '0 0 6px rgba(249,115,22,0.7)',
          '0 0 6px rgba(249,115,22,0.7)',
          '0 0 1px rgba(249,115,22,0.3)',
          '0 0 6px rgba(249,115,22,0.7)',
          '0 0 6px rgba(249,115,22,0.7)',
        ],
      }}
      transition={{
        duration: 3.6,
        repeat: Infinity,
        times: [0, 0.88, 0.92, 0.96, 1],
      }}
      className="rounded-full bg-[#F97316] flex items-center justify-center relative"
      style={{ width: eyeSize, height: eyeSize }}
    >
      <span className="w-1 h-1 rounded-full bg-white/90 absolute top-0.5 right-0.5" />
    </motion.div>
  );
}

// Helper to render mouth or digital voice waveform
function renderMouth(emotion: BotEmotion | string, size: string) {
  if (emotion === 'talking') {
    // Dynamic 3-bar speech equalizer
    return (
      <div className="flex items-center gap-0.5">
        <motion.div
          animate={{ height: ['2px', '8px', '2px'] }}
          transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-1 bg-[#F97316] rounded-full shadow-[0_0_4px_#F97316]"
        />
        <motion.div
          animate={{ height: ['3px', '11px', '3px'] }}
          transition={{
            duration: 0.35,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.1,
          }}
          className="w-1 bg-white rounded-full shadow-[0_0_5px_white]"
        />
        <motion.div
          animate={{ height: ['2px', '8px', '2px'] }}
          transition={{
            duration: 0.45,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.2,
          }}
          className="w-1 bg-[#F97316] rounded-full shadow-[0_0_4px_#F97316]"
        />
      </div>
    );
  }

  if (emotion === 'thinking') {
    // Thinking dotted line
    return (
      <div className="flex items-center gap-1">
        <motion.span
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
          className="w-1 h-1 rounded-full bg-[#38BDF8]"
        />
        <motion.span
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
          className="w-1 h-1 rounded-full bg-[#38BDF8]"
        />
        <motion.span
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
          className="w-1 h-1 rounded-full bg-[#38BDF8]"
        />
      </div>
    );
  }

  if (emotion === 'happy' || emotion === 'waving') {
    // Cute smile arc
    return (
      <div
        className="rounded-b-full border-b-2 border-[#F97316] shadow-[0_1px_4px_#F97316]"
        style={{
          width: size === 'sm' ? 8 : size === 'md' ? 12 : 16,
          height: 3,
        }}
      />
    );
  }

  // Default subtle calm smile
  return (
    <div
      className="rounded-full bg-[#F97316]/70"
      style={{
        width: size === 'sm' ? 6 : size === 'md' ? 9 : 12,
        height: 2,
      }}
    />
  );
}
