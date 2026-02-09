import { memo } from 'react';
import { ChevronRightIcon } from '../common';

interface FeaturedNews {
  image: string;
  headline: string;
  category: string;
  link?: string;
}

export const Hero = memo(function Hero() {
  const featuredNews: FeaturedNews = {
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200&h=800&fit=crop',
    headline: 'Badger CC wins Midwest Championship Semi-Final',
    category: 'Match Report',
  };

  return (
    <section id="news" className="bg-white">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        {/* Featured News Card */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-0 bg-white rounded-lg overflow-hidden">
          {/* Featured Image */}
          <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[500px] overflow-hidden rounded-lg">
            <img
              src={featuredNews.image}
              alt={featuredNews.headline}
              className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Featured Content */}
          <div className="flex flex-col justify-center p-8 lg:p-12">
            <span className="text-cricket-green text-sm font-semibold uppercase tracking-wide mb-4">
              {featuredNews.category}
            </span>
            <h2 className="font-headline text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
              {featuredNews.headline}
            </h2>
            <a
              href="#matches"
              className="inline-flex items-center gap-2 text-cricket-green font-semibold hover:gap-3 transition-all"
            >
              Read more <ChevronRightIcon size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});
