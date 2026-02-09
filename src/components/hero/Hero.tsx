import { memo } from 'react';

interface FeaturedNews {
  image: string;
  headline: string;
}

export const Hero = memo(function Hero() {
  const featuredNews: FeaturedNews = {
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200&h=800&fit=crop',
    headline: '312-200: Badger CC wins at Borough Oval',
  };

  return (
    <section id="news" className="bg-white">
      <div className="max-w-[1400px] mx-auto px-6 py-10">
        {/* Featured News Card */}
        <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-0 items-center">
          {/* Featured Image */}
          <div className="relative aspect-[16/10] lg:aspect-[16/11] overflow-hidden rounded-xl">
            <img
              src={featuredNews.image}
              alt={featuredNews.headline}
              className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
            />
          </div>

          {/* Featured Content */}
          <div className="flex flex-col justify-center px-6 py-10 lg:px-14 lg:py-0">
            <h2 className="text-[28px] lg:text-[34px] font-normal text-blue-700 leading-tight cursor-pointer hover:text-blue-800 transition-colors tracking-tight">
              {featuredNews.headline}
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
});
