import { FloatingFoodHero } from '@/components/ui/hero-section-7'; // Adjust the import path

export default function FloatingFoodHeroDemo() {
  const heroImages = [
    {
      src: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80',
      alt: 'A delicious cheeseburger',
      className: 'w-40 sm:w-56 md:w-64 lg:w-72 top-10 left-4 sm:left-10 md:top-20 md:left-20 animate-float',
    },
    {
      src: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=400&auto=format&fit=crop&q=80',
      alt: 'A bamboo steamer with dumplings',
      className: 'w-28 sm:w-36 md:w-48 top-10 right-4 sm:right-10 md:top-16 md:right-16 animate-float',
    },
    {
      src: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop&q=80',
      alt: 'A slice of pizza',
      className: 'w-32 sm:w-40 md:w-56 bottom-8 right-5 sm:right-10 md:bottom-16 md:right-20 animate-float',
    },
    {
      src: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=300&auto=format&fit=crop&q=80',
      alt: 'A fresh croissant pastry',
      className: 'w-16 sm:w-20 top-1/4 left-1/3 animate-float',
    },
    {
      src: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&auto=format&fit=crop&q=80',
      alt: 'Coffee cup',
      className: 'w-16 sm:w-20 top-1/2 right-1/4 animate-float',
    },
    {
      src: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&auto=format&fit=crop&q=80',
      alt: 'Fresh salad bowl',
      className: 'w-16 sm:w-20 top-3/4 left-1/4 animate-float',
    },
  ];

  return (
    <div className="w-full">
      <FloatingFoodHero
        title="Better food for more people"
        description="For over a decade, we've enabled our customers to discover new tastes, delivered right to their doorstep."
        images={heroImages}
      />
    </div>
  );
}
