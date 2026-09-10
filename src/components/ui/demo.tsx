import { FloatingFoodHero } from '@/components/ui/hero-section-7'; // Adjust the import path

export default function FloatingFoodHeroDemo() {
  const heroImages = [
    {
      src: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80',
      alt: 'Artisan gourmet burger',
      className: 'w-36 sm:w-48 md:w-56 lg:w-64 top-8 left-4 sm:left-8 md:top-14 md:left-14 rounded-2xl shadow-xl animate-float border-2 border-white/80 object-cover aspect-square',
    },
    {
      src: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=400&auto=format&fit=crop&q=80',
      alt: 'Fresh steaming dim sum and dumplings',
      className: 'w-28 sm:w-36 md:w-44 top-8 right-4 sm:right-8 md:top-12 md:right-14 rounded-2xl shadow-xl animate-float border-2 border-white/80 object-cover aspect-square',
    },
    {
      src: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop&q=80',
      alt: 'Wood-fired gourmet pizza slice',
      className: 'w-32 sm:w-40 md:w-48 bottom-6 right-4 sm:right-8 md:bottom-12 md:right-16 rounded-2xl shadow-xl animate-float border-2 border-white/80 object-cover aspect-square',
    },
    {
      src: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=300&auto=format&fit=crop&q=80',
      alt: 'Fresh artisan croissant pastry',
      className: 'w-24 sm:w-32 top-1/4 left-1/4 rounded-xl shadow-lg animate-float border-2 border-white/80 object-cover aspect-square',
    },
    {
      src: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&auto=format&fit=crop&q=80',
      alt: 'Specialty pour-over coffee cup',
      className: 'w-20 sm:w-28 top-1/2 right-1/4 rounded-xl shadow-lg animate-float border-2 border-white/80 object-cover aspect-square',
    },
    {
      src: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&auto=format&fit=crop&q=80',
      alt: 'Crisp garden vegetable salad',
      className: 'w-24 sm:w-32 bottom-10 left-8 md:left-24 rounded-xl shadow-lg animate-float border-2 border-white/80 object-cover aspect-square',
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
