import { Search, BadgeCheck } from 'lucide-react';
import LessonCard from './LessonCard';
import { SCHEDULE } from '../data/mockData';

interface DashboardScreenProps {
  onSearch: () => void;
  onSchedule: () => void;
}

// главный экран после авторизации
export default function DashboardScreen({ onSearch, onSchedule }: DashboardScreenProps) {
  const nextLesson = SCHEDULE[0];
  
  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-10">
      <section>
        <div className="flex items-center gap-4 mb-2">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7b5P7N3ckGlyznj-Nd3QThDUWvlVtgqrbOhVrDn77fVtqFdaJ-88Rg8ABxZ_ezWBKRE3zvsO3M2i7WkBU9ZzelUpr80CfTOw0qThWK6xXniQXQi-pgYjwx60eM7eWewrZyUX31M1ZySOoO6MN3Mekoe8iE0DUVGNiPlxJnJ0Pp904bsIEvhnv-u_KnfjsnSDJlTctE6c-0EjmjCT7aDwrrRfyiJqMXfpNsVRbkDWTXKFyZT3id6ifTQP8vuRrMpc6o8K41iD7pd4" 
            alt="User" 
            className="w-16 h-16 rounded-full object-cover border-2 border-primary/10"
          />
          <div>
            <h2 className="text-3xl font-bold text-on-surface">Привет, Аман! 👋</h2>
            <p className="text-on-surface-variant">Твой следующий урок начнется через 2 часа.</p>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">Твой следующий урок</h3>
          <button onClick={onSchedule} className="text-primary font-bold hover:underline">Все занятия</button>
        </div>
        <LessonCard lesson={nextLesson} />
      </section>

      {/* блоки быстрого доступа */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass p-8 rounded-3xl space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xl font-bold">Найти репетитора</h4>
            <p className="text-on-surface-variant">Более 500+ экспертов по 30+ предметам готовы помочь тебе.</p>
          </div>
          <button 
            onClick={onSearch}
            className="w-full bg-primary text-on-primary py-3 rounded-xl font-bold"
          >
            Начать поиск
          </button>
        </div>

        <div className="glass p-8 rounded-3xl space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
            <BadgeCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xl font-bold">Твой прогресс</h4>
            <p className="text-on-surface-variant">Ты прошел 8 уроков на этой неделе. Отличный результат!</p>
          </div>
          <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
            <div className="h-full bg-secondary w-4/5 rounded-full" />
          </div>
        </div>
      </section>
    </div>
  );
}
