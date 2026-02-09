import { memo } from 'react';

interface NewsCardProps {
  image: string;
  headline: string;
  category: string;
  date?: string;
}

export const NewsCard = memo(function NewsCard({ image, headline, category, date }: NewsCardProps) {
  return (
    <article className="group cursor-pointer">
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg mb-4">
        <img
          src={image}
          alt={headline}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="px-1">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-cricket-green text-xs font-semibold uppercase tracking-wide">
            {category}
          </span>
          {date && (
            <span className="text-gray-400 text-xs">{date}</span>
          )}
        </div>
        <h3 className="font-headline text-lg font-bold text-gray-900 leading-snug group-hover:text-cricket-green transition-colors">
          {headline}
        </h3>
      </div>
    </article>
  );
});
