import { Search, ChevronLeft } from 'lucide-react';
import TutorCard from './TutorCard';
import { Tutor } from '../types';
import { TUTORS } from '../data/mockData';

interface TutorSearchScreenProps {
  onTutorClick: (tutor: Tutor) => void;
}

export default function TutorSearchScreen({ onTutorClick }: TutorSearchScreenProps) {
  // TODO: добавить реальную фильтрацию по предметам
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
          />
          <button className="bg-primary text-on-primary rounded-xl px-8 py-3 font-semibold hover:bg-primary/90 transition-colors">Найти</button>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-1.5 text-on-surface-variant px-3 py-1.5 font-medium border-r border-outline-variant mr-2">
            <Search className="w-4 h-4" /> Фильтры
          </div>
          {['Предмет', 'Цена', 'Рейтинг', 'Доступность'].map(filter => (
            <button key={filter} className="flex items-center gap-1 bg-surface-container-lowest border border-outline-variant rounded-full px-4 py-2 hover:bg-surface-container transition-colors shadow-sm">
              {filter} <ChevronLeft className="w-4 h-4 rotate-270" />
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {TUTORS.map(tutor => (
          <TutorCard key={tutor.id} tutor={tutor} onClick={() => onTutorClick(tutor)} />
        ))}
      </div>
    </div>
  );
}
