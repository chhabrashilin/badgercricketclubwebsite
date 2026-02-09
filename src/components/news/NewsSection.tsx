import { memo } from 'react';
import { NewsCard } from './NewsCard';
import { ChevronRightIcon } from '../common';

const newsItems = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&h=400&fit=crop',
    headline: 'Season Preview: What to Expect in 2026',
    category: 'Preview',
    date: 'Feb 8',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=600&h=400&fit=crop',
    headline: 'Training Camp: New Season Preparations Underway',
    category: 'Training',
    date: 'Feb 7',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1593766788306-28561086694e?w=600&h=400&fit=crop',
    headline: "Player Profile: Captain's Road to Leadership",
    category: 'Interview',
    date: 'Feb 5',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&h=400&fit=crop',
    headline: 'Community Day: Youth Cricket Program Launch',
    category: 'Community',
    date: 'Feb 3',
  },
];

export const NewsSection = memo(function NewsSection() {
  return (
    <section className="bg-gray-50 py-14">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-[22px] font-semibold text-gray-900">Latest News</h2>
          <a
            href="#news"
            className="flex items-center gap-1 text-blue-600 font-medium text-[15px] hover:gap-2 transition-all"
          >
            See all news <ChevronRightIcon size={18} />
          </a>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newsItems.map((item) => (
            <NewsCard
              key={item.id}
              image={item.image}
              headline={item.headline}
              category={item.category}
              date={item.date}
            />
          ))}
        </div>
      </div>
    </section>
  );
});
