import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import LessonCard from './LessonCard';
import { SCHEDULE } from '../data/mockData';

const MONTHS = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
const LESSON_DAYS = [4, 13, 15, 23, 28];
const BASE_MONTH = 3; // April
const BASE_YEAR = 2026;

export default function ScheduleScreen() {
  const [selectedDay, setSelectedDay] = useState(23);
  const [monthOffset, setMonthOffset] = useState(0);

  const totalMonths = BASE_MONTH + monthOffset;
  const monthIdx = ((totalMonths % 12) + 12) % 12;
  const year = BASE_YEAR + Math.floor(totalMonths / 12);
  const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="md:flex justify-between items-end mb-10">
        <div>
          <h2 className="text-4xl font-bold text-on-surface tracking-tight mb-2">Мое расписание</h2>
          <p className="text-on-surface-variant text-lg">Управляйте своими предстоящими уроками и консультациями.</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-4">
          <div className="bg-secondary-container/30 text-on-secondary-container px-4 py-2 rounded-full font-semibold flex items-center gap-2">
            <Calendar className="w-5 h-5 text-secondary" /> Весна 2026
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="glass rounded-3xl p-6 shadow-ambient">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">{MONTHS[monthIdx]} {year}</h3>
              <div className="flex gap-2">
                <button onClick={() => setMonthOffset(o => o - 1)} className="p-2 rounded-full hover:bg-surface-container"><ChevronLeft className="w-5 h-5" /></button>
                <button onClick={() => setMonthOffset(o => o + 1)} className="p-2 rounded-full hover:bg-surface-container"><ChevronRight className="w-5 h-5" /></button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-4 text-center">
              {['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'].map(d => (
                <span key={d} className="text-xs font-bold text-outline uppercase">{d}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const isSelected = day === selectedDay;
                const hasLesson = LESSON_DAYS.includes(day);
                return (
                  <div key={i} className="aspect-square flex flex-col items-center justify-center relative">
                    <button
                      onClick={() => setSelectedDay(day)}
                      className={`w-full h-full rounded-full text-sm font-medium transition-all ${isSelected ? 'bg-primary text-white shadow-lg scale-110' : 'hover:bg-surface-container'}`}
                    >
                      {day}
                    </button>
                    {hasLesson && !isSelected && <div className="absolute bottom-1 w-1 h-1 bg-secondary rounded-full" />}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl -mr-16 -mt-16 rounded-full" />
            <h4 className="text-xl font-bold mb-4">Сводка за неделю</h4>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Всего часов</span>
                <span className="font-bold">6.5 ч</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Задания</span>
                <span className="font-bold">2</span>
              </div>
            </div>
            <button className="mt-8 w-full bg-white text-slate-900 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors">
              Статистика обучения
            </button>
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-8">
          <section>
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-2xl font-bold">Сегодня, 23 Апр</h3>
              <span className="bg-secondary-container text-on-secondary-container text-xs px-3 py-1 rounded-full font-bold">2 ЗАНЯТИЯ</span>
            </div>
            <div className="space-y-4">
              {SCHEDULE.slice(0, 2).map(lesson => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold mb-6">Завтра, 24 Апр</h3>
            <div className="space-y-4">
              <LessonCard lesson={SCHEDULE[2]} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
