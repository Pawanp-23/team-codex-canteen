import React from 'react';
import { FloatingFoodHero, FloatingFoodItem } from '@/components/ui/hero-section-7';

interface FloatingFoodHeroDemoProps {
  onLaunchTerminal?: () => void;
  onWatchDemo?: () => void;
}

export default function FloatingFoodHeroDemo({
  onLaunchTerminal,
  onWatchDemo,
}: FloatingFoodHeroDemoProps) {
  const curatedFoodItems: FloatingFoodItem[] = [
    {
      id: 'burger-card',
      src: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
      alt: 'Artisan Gourmet Cheeseburger',
      title: 'Truffle Smash Burger',
      tag: '🔥 8m Prep • Kitchen KDS',
      price: '₹ 380',
      positionClass: 'top-6 left-3 sm:left-6 md:top-10 md:left-10 lg:left-16',
      parallaxSpeed: -85,
      sizeClass: 'w-36 sm:w-44 md:w-52 lg:w-56',
      floatDelay: 0,
    },
    {
      id: 'dimsum-card',
      src: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=600&auto=format&fit=crop&q=80',
      alt: 'Steaming Bamboo Bao Dim Sum',
      title: 'Crystal Prawn Dumplings',
      tag: '⭐ 4.9 Rating • 1.2k Orders',
      price: '₹ 320',
      positionClass: 'top-6 right-3 sm:right-6 md:top-10 md:right-10 lg:right-16',
      parallaxSpeed: -120,
      sizeClass: 'w-36 sm:w-44 md:w-52 lg:w-56',
      floatDelay: 0.5,
    },
    {
      id: 'pizza-card',
      src: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
      alt: 'Wood-Fired Neapolitan Pizza',
      title: 'Smoked Bufala Pizza',
      tag: '⚡ Table 04 • Paid via UPI',
      price: '₹ 520',
      positionClass: 'bottom-6 right-3 sm:right-6 md:bottom-10 md:right-10 lg:right-16',
      parallaxSpeed: 70,
      sizeClass: 'w-36 sm:w-44 md:w-52 lg:w-56',
      floatDelay: 1,
    },
    {
      id: 'salad-card',
      src: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
      alt: 'Crisp Garden Harvest Bowl',
      title: 'Avocado Crunch Salad',
      tag: '🌱 Inventory Auto-Deducted',
      price: '₹ 290',
      positionClass: 'bottom-6 left-3 sm:left-6 md:bottom-10 md:left-10 lg:left-16',
      parallaxSpeed: 100,
      sizeClass: 'w-36 sm:w-44 md:w-52 lg:w-56',
      floatDelay: 1.5,
    },
  ];

  return (
    <div className="w-full">
      <FloatingFoodHero
        title="Better Food Operations for Growing Kitchens"
        highlightedWord="Better Food"
        description="Powering Indian restaurants, cafes, and multi-outlet cloud kitchens with lightning-fast cloud POS billing, automatic ingredient depletion, and seamless kitchen dispatch."
        items={curatedFoodItems}
        primaryCtaText="Launch POS Terminal"
        onPrimaryCta={onLaunchTerminal}
        secondaryCtaText="Watch Live Demo"
        onSecondaryCta={onWatchDemo}
      />
    </div>
  );
}
