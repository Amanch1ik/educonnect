import { FC } from 'react';
import { Star, BadgeCheck, School, Bookmark } from 'lucide-react';
import { Tutor } from '../types';

interface TutorCardProps {
  tutor: Tutor;
  onClick: () => void;
  onSubjectClick?: (subject: string) => void;
}

// карточка репетитора в результатах поиска
const TutorCard: FC<TutorCardProps> = ({ tutor, onClick, onSubjectClick }) => {
  return (
    <article className="group bg-surface-container-lowest rounded-2xl p-6 shadow-ambient hover:shadow-xl transition-all duration-300 border border-outline-variant/30 flex flex-col relative overflow-hidden h-full">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-secondary-container" />
      
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img src={tutor.avatar} alt={tutor.name} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm" />
            {tutor.verified && <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
              <BadgeCheck className="w-5 h-5 text-primary" fill="#cfe5ff" />
            </div>}
          </div>
          <div>
            <h3 className="text-xl font-bold text-on-surface">{tutor.name}</h3>
            <p className="text-sm text-on-surface-variant flex items-center gap-1">
              <School className="w-3.5 h-3.5" /> {tutor.title}
            </p>
          </div>
        </div>
        <button className="text-outline hover:text-primary transition-colors">
          <Bookmark className="w-6 h-6" />
        </button>
      </div>

      <div className="mb-6 flex-grow">
        <div className="flex items-center gap-1.5 mb-3">
          <Star className="w-5 h-5 text-orange-400 fill-orange-400" />
          <span className="font-bold text-on-surface">{tutor.rating}</span>
          <span className="text-sm text-outline">({tutor.reviewsCount} отзывов)</span>
        </div>
        <p className="text-on-surface-variant line-clamp-2 mb-4 leading-relaxed">{tutor.bio}</p>
        <div className="flex flex-wrap gap-2">
          {tutor.subjects.map(s => (
            <button
              key={s}
              onClick={e => { e.stopPropagation(); onSubjectClick?.(s); }}
              className="bg-secondary-container/50 text-on-secondary-container px-3 py-1 rounded-lg text-xs font-semibold hover:bg-secondary-container transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-outline-variant/30 mt-auto">
        <div>
          <span className="text-xs text-outline uppercase tracking-wider font-bold">Стоимость</span>
          <p className="text-2xl font-bold text-on-surface">{tutor.hourlyRate}<span className="text-sm font-normal text-on-surface-variant"> сом/ч</span></p>
        </div>
        <button 
          onClick={onClick}
          className="bg-primary text-on-primary hover:bg-primary/90 px-6 py-2.5 rounded-xl font-semibold transition-all group-hover:scale-105 active:scale-95 shadow-sm"
        >
          Профиль
        </button>
      </div>
    </article>
  );
}

export default TutorCard;
