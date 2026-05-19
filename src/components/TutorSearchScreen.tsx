import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import TutorCard from './TutorCard';
import { Tutor } from '../types';
import { TUTORS } from '../data/mockData';

interface TutorSearchScreenProps {
  onTutorClick: (tutor: Tutor) => void;
  initialQuery?: string;
  onSubjectClick?: (subject: string) => void;
}

const FILTERS = ['Предмет', 'Цена', 'Рейтинг', 'Доступность'];

export default function TutorSearchScreen({ onTutorClick, initialQuery = '', onSubjectClick }: TutorSearchScreenProps) {
  const [query, setQuery] = useState(initialQuery);
  const [activeQuery, setActiveQuery] = useState(initialQuery);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (f: string) => {
    setActiveFilters(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
  };

  const handleSearch = () => setActiveQuery(query);

  const filteredTutors = TUTORS.filter(t => {
    if (!activeQuery) return true;
    const q = activeQuery.toLowerCase();
    return t.name.toLowerCase().includes(q) || t.subjects.some(s => s.toLowerCase().includes(q));
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-on-background mb-8 tracking-tight">Поиск репетитора</h2>

        <div className="flex items-center bg-surface-container-lowest rounded-2xl shadow-ambient border border-outline-variant p-2 mb-6 group focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <Search className="w-6 h-6 text-outline ml-3 mr-2" />
          <input
            className="w-full bg-transparent border-none focus:ring-0 text-lg py-3 outline-none"
            placeholder="Поиск по предмету, теме или имени..."
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch} className="bg-primary text-on-primary rounded-xl px-8 py-3 font-semibold hover:bg-primary/90 transition-colors">Найти</button>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-1.5 text-on-surface-variant px-3 py-1.5 font-medium border-r border-outline-variant mr-2">
            <Search className="w-4 h-4" /> Фильтры
          </div>
          {FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => toggleFilter(filter)}
              className={`flex items-center gap-1 border rounded-full px-4 py-2 transition-colors shadow-sm font-medium text-sm ${
                activeFilters.includes(filter)
                  ? 'bg-primary text-on-primary border-primary'
                  : 'bg-surface-container-lowest border-outline-variant hover:bg-surface-container text-on-surface'
              }`}
            >
              {filter} <ChevronDown className="w-4 h-4" />
            </button>
          ))}
        </div>
      </div>

      {filteredTutors.length === 0 ? (
        <div className="text-center py-20 text-on-surface-variant">
          <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="text-xl font-medium">Репетиторы не найдены</p>
          <p className="mt-2">Попробуйте изменить запрос</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTutors.map(tutor => (
            <TutorCard key={tutor.id} tutor={tutor} onClick={() => onTutorClick(tutor)} onSubjectClick={onSubjectClick} />
          ))}
        </div>
      )}
    </div>
  );
}
