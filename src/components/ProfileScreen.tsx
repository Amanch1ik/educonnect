import { useState } from 'react';
import { Star, BadgeCheck, UserRound, BookOpen, School, Building2, Calendar, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { Tutor } from '../types';

interface ProfileScreenProps {
  tutor: Tutor;
  onSubjectClick?: (subject: string) => void;
}

const MONTHS = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
const SELECTABLE_DAYS = [3, 5, 8];
const TIME_SLOTS = ['10:00', '13:30', '15:00', '16:30'];
const BASE_MONTH = 9; // October
const BASE_YEAR = 2026;

export default function ProfileScreen({ tutor, onSubjectClick }: ProfileScreenProps) {
  const [selectedSlot, setSelectedSlot] = useState(2);
  const [monthOffset, setMonthOffset] = useState(0);
  const [selectedDay, setSelectedDay] = useState(5);
  const [booked, setBooked] = useState(false);

  const totalMonths = BASE_MONTH + monthOffset;
  const monthIdx = ((totalMonths % 12) + 12) % 12;
  const year = BASE_YEAR + Math.floor(totalMonths / 12);
  const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();

  const handleBook = () => {
    setBooked(true);
    setTimeout(() => setBooked(false), 3000);
  };

  return (
    <div className="pb-32">
      <div className="h-64 bg-gradient-to-b from-primary-fixed to-surface-bright relative" />
      <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-10 flex flex-col items-center">

        <div className="text-center mb-10">
          <div className="relative mb-6">
            <img
              src={tutor.avatar}
              alt={tutor.name}
              className="w-48 h-48 rounded-[3rem] border-[6px] border-white object-cover shadow-2xl"
            />
            <div className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg">
              <BadgeCheck className="w-8 h-8 text-primary" fill="#cfe5ff" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-on-background mb-2">{tutor.name}</h2>
          <p className="text-xl text-on-surface-variant mb-4">{tutor.title}</p>
          <div className="flex items-center justify-center gap-3">
            <span className="bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-full font-bold flex items-center gap-1.5 shadow-sm">
              <BadgeCheck className="w-4 h-4" /> Проверено
            </span>
            <span className="flex items-center gap-1.5 bg-white text-orange-400 px-4 py-1.5 rounded-full shadow-sm">
              <Star className="w-5 h-5 fill-orange-400" />
              <span className="text-on-surface font-bold">4.9</span>
              <span className="text-on-surface-variant text-sm font-normal">(124)</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full">
          <div className="md:col-span-8 space-y-6">
            <section className="glass rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <UserRound className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-bold">Обо мне</h3>
              </div>
              <p className="text-lg text-on-surface-variant leading-relaxed">{tutor.bio}</p>
            </section>

            <section className="glass rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-bold">Предметы</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {tutor.subjects.map(s => (
                  <button
                    key={s}
                    onClick={() => onSubjectClick?.(s)}
                    className="bg-primary/5 text-primary border border-primary/20 px-6 py-2 rounded-2xl font-bold hover:bg-primary/10 active:scale-95 transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </section>

            <section className="glass rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <School className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-bold">Образование</h3>
              </div>
              <div className="space-y-6">
                {tutor.education.map((edu, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-surface-container flex flex-shrink-0 items-center justify-center">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">{edu.degree}</h4>
                      <p className="text-on-surface-variant">{edu.institution} • {edu.years}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="md:col-span-4 lg:col-span-4">
            <div className="glass rounded-3xl p-8 sticky top-24">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold">Доступность</h3>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <button onClick={() => setMonthOffset(o => o - 1)} className="p-2 rounded-full hover:bg-surface-container"><ChevronLeft className="w-5 h-5" /></button>
                <span className="font-bold">{MONTHS[monthIdx]} {year}</span>
                <button onClick={() => setMonthOffset(o => o + 1)} className="p-2 rounded-full hover:bg-surface-container"><ChevronRight className="w-5 h-5" /></button>
              </div>

              <div className="grid grid-cols-7 text-center mb-4">
                {['В', 'П', 'В', 'С', 'Ч', 'П', 'С'].map((d, i) => (
                  <span key={i} className="text-xs font-bold text-outline">{d}</span>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 text-center mb-8">
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const isSelected = day === selectedDay;
                  const isSelectable = SELECTABLE_DAYS.includes(day);
                  return (
                    <button
                      key={i}
                      onClick={() => isSelectable && setSelectedDay(day)}
                      className={`aspect-square flex items-center justify-center rounded-xl text-sm font-bold transition-all ${
                        isSelected
                          ? 'bg-primary text-white shadow-md'
                          : isSelectable
                          ? 'bg-primary-container/20 text-primary hover:bg-primary-container/30'
                          : 'text-outline cursor-not-allowed opacity-40'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-sm text-on-surface-variant">Свободные слоты на {selectedDay} {MONTHS[monthIdx].slice(0, 3).toLowerCase()}</h4>
                <div className="grid grid-cols-2 gap-3">
                  {TIME_SLOTS.map((time, i) => (
                    <button
                      key={time}
                      onClick={() => setSelectedSlot(i)}
                      className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all ${
                        i === selectedSlot
                          ? 'bg-primary/5 border-primary text-primary shadow-sm'
                          : 'border-outline-variant hover:border-primary text-on-surface'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full glass border-t border-outline-variant/30 p-6 z-50 flex justify-center">
        <div className="w-full max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Ставка за занятие</p>
            <p className="text-3xl font-bold"><span className="text-primary">${tutor.hourlyRate}</span> <span className="text-lg font-normal text-on-surface-variant">/ час</span></p>
          </div>
          <button
            onClick={handleBook}
            disabled={booked}
            className={`w-full sm:w-auto rounded-2xl py-4 px-12 text-lg font-bold shadow-lg transition-all flex items-center justify-center gap-3 ${
              booked
                ? 'bg-green-500 text-white cursor-default'
                : 'bg-primary text-on-primary hover:shadow-primary/20 hover:scale-[1.02] active:scale-95'
            }`}
          >
            {booked ? '✓ Урок забронирован!' : 'Забронировать урок'}
            {!booked && <ArrowLeft className="w-6 h-6 rotate-180" />}
          </button>
        </div>
      </div>
    </div>
  );
}
