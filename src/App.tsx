/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FC } from 'react';
import { 
  BookOpen, 
  School, 
  UserRound, 
  Search, 
  Calendar, 
  Bell, 
  ArrowLeft, 
  Star, 
  BadgeCheck, 
  ChevronLeft, 
  ChevronRight,
  Bookmark,
  Building2,
  Video,
  MapPin,
  Clock,
  CheckCircle2,
  Home,
  MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Role, Tutor, Lesson, TUTORS, SCHEDULE } from './types';

export default function App() {
  const [role, setRole] = useState<Role>(null);
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'dashboard' | 'discover' | 'schedule' | 'user_profile' | 'tutor_profile'>('welcome');
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);

  const handleRoleSelect = (selectedRole: Role) => {
    setRole(selectedRole);
    setCurrentScreen('dashboard');
  };

  const handleTutorClick = (tutor: Tutor) => {
    setSelectedTutor(tutor);
    setCurrentScreen('tutor_profile');
  };

  if (currentScreen === 'welcome') {
    return <WelcomeScreen onSelect={handleRoleSelect} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface-bright">
      <TopBar 
        currentScreen={currentScreen} 
        onBack={() => setCurrentScreen(currentScreen === 'tutor_profile' ? 'discover' : 'dashboard')} 
      />
      
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {currentScreen === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="h-full overflow-y-auto no-scrollbar pb-24 md:pb-8"
            >
              <DashboardScreen onSearch={() => setCurrentScreen('discover')} />
            </motion.div>
          )}
          {currentScreen === 'discover' && (
            <motion.div
              key="discover"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full overflow-y-auto no-scrollbar pb-24 md:pb-8"
            >
              <TutorSearchScreen onTutorClick={handleTutorClick} />
            </motion.div>
          )}
          {currentScreen === 'schedule' && (
            <motion.div
              key="schedule"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full overflow-y-auto no-scrollbar pb-24 md:pb-8"
            >
              <ScheduleScreen />
            </motion.div>
          )}
          {currentScreen === 'user_profile' && (
            <motion.div
              key="user_profile"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="h-full overflow-y-auto no-scrollbar pb-24 md:pb-8"
            >
              <UserProfileScreen />
            </motion.div>
          )}
          {currentScreen === 'tutor_profile' && selectedTutor && (
            <motion.div
              key="tutor_profile"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="h-full overflow-y-auto no-scrollbar pb-32"
            >
              <ProfileScreen tutor={selectedTutor} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <BottomNav active={currentScreen} onNavigate={setCurrentScreen} />
    </div>
  );
}

function DashboardScreen({ onSearch }: { onSearch: () => void }) {
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
          <button className="text-primary font-bold hover:underline">Все занятия</button>
        </div>
        <LessonCard lesson={nextLesson} />
      </section>

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

function UserProfileScreen() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      <div className="flex flex-col items-center py-6">
        <div className="relative mb-4">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7b5P7N3ckGlyznj-Nd3QThDUWvlVtgqrbOhVrDn77fVtqFdaJ-88Rg8ABxZ_ezWBKRE3zvsO3M2i7WkBU9ZzelUpr80CfTOw0qThWK6xXniQXQi-pgYjwx60eM7eWewrZyUX31M1ZySOoO6MN3Mekoe8iE0DUVGNiPlxJnJ0Pp904bsIEvhnv-u_KnfjsnSDJlTctE6c-0EjmjCT7aDwrrRfyiJqMXfpNsVRbkDWTXKFyZT3id6ifTQP8vuRrMpc6o8K41iD7pd4" 
            alt="User" 
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
          />
          <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg border-2 border-white">
            <Video className="w-4 h-4" /> {/* Edit Icon mock */}
          </button>
        </div>
        <h2 className="text-2xl font-bold">Аман Итбеков</h2>
        <p className="text-on-surface-variant">Студент • ID: 294810</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold px-2">Персональные данные</h3>
        <div className="glass rounded-3xl overflow-hidden">
          {[
            { label: 'Электронная почта', value: 'amanchik@gmail.com' },
            { label: 'Номер телефона', value: '+996 700 123 456' },
            { label: 'Язык интерфейса', value: 'Русский' },
            { label: 'Часовой пояс', value: 'GMT+6 (Бишкек)' }
          ].map((item, i) => (
            <div key={i} className={`p-5 flex justify-between items-center ${i !== 3 ? 'border-b border-outline-variant/30' : ''}`}>
              <span className="text-on-surface-variant font-medium">{item.label}</span>
              <span className="font-bold">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold px-2">Безопасность и уведомления</h3>
        <div className="glass rounded-3xl overflow-hidden">
           <div className="p-5 flex justify-between items-center border-b border-outline-variant/30">
            <span className="text-on-surface-variant font-medium">Push-уведомления</span>
            <div className="w-12 h-6 bg-secondary rounded-full relative">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow" />
            </div>
          </div>
          <div className="p-5 flex justify-between items-center text-red-500 font-bold">
            Выйти из аккаунта
          </div>
        </div>
      </div>
    </div>
  );
}

function TopBar({ currentScreen, onBack }: { currentScreen: string; onBack: () => void }) {
  return (
    <header className="sticky top-0 z-40 w-full glass h-16 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {currentScreen === 'profile' && (
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-surface-container transition-colors">
            <ArrowLeft className="w-6 h-6 text-primary" />
          </button>
        )}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-on-primary" fill="currentColor" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-primary">EduConnect</h1>
        </div>
      </div>
      <button className="p-2 rounded-full hover:bg-surface-container transition-colors relative">
        <Bell className="w-6 h-6 text-primary" />
        <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full border-2 border-white"></span>
      </button>
    </header>
  );
}

function WelcomeScreen({ onSelect }: { onSelect: (role: Role) => void }) {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-6 bg-surface-bright">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-fixed/20 via-surface to-secondary-fixed/10" />
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCm7E_Tfs7mFylK9P91uMF_trfP5ZHxcnzgf2JlmxbFhKmsav4FjoZtNIR1Am_bOCUieMXlLcdSPmYF2sz644Q_cqOedM4ALL-fr7wyF4f1UkYV0byYnMD-btnJbtQ1Nh2lqp2S4m2K0UatLDLTR88ny7ru6iI6etF_aQn_9GTRN_h4ZbTNg933LNu0J7lc1rgUDZn7vQv25KfcekAHzjWNUTAk9pZXrkJ1RWtiuLj9X7gqe0OQz_BWONR37n508VcrKFcu2ncHSCo"
          alt=""
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-[960px] glass rounded-[32px] p-8 md:p-16 flex flex-col items-center"
      >
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg transform rotate-3">
            <BookOpen className="w-7 h-7 text-on-primary" fill="currentColor" />
          </div>
          <span className="text-3xl font-bold text-primary tracking-tight">EduConnect</span>
        </div>

        <div className="text-center max-w-[600px] mb-14">
          <h1 className="text-5xl font-bold text-on-surface mb-6">Добро пожаловать</h1>
          <p className="text-xl text-on-surface-variant leading-relaxed">
            Выберите свою роль, чтобы персонализировать обучение и присоединиться к сообществу.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-[800px]">
          <button 
            onClick={() => onSelect('student')}
            className="group relative flex flex-col items-center text-center p-10 rounded-[28px] border-2 border-outline-variant bg-surface-container-lowest hover:border-primary-container hover:bg-primary-fixed/5 hover:shadow-xl transition-all duration-300"
          >
            <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <School className="w-10 h-10 text-primary group-hover:fill-primary/20" />
            </div>
            <h2 className="text-2xl font-bold text-on-surface mb-3">Я — Ученик</h2>
            <p className="text-on-surface-variant">Находите опытных репетиторов, планируйте занятия и достигайте целей.</p>
          </button>

          <button 
            onClick={() => onSelect('teacher')}
            className="group relative flex flex-col items-center text-center p-10 rounded-[28px] border-2 border-outline-variant bg-surface-container-lowest hover:border-secondary-container hover:bg-secondary-fixed/5 hover:shadow-xl transition-all duration-300"
          >
            <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <UserRound className="w-10 h-10 text-secondary group-hover:fill-secondary/20" />
            </div>
            <h2 className="text-2xl font-bold text-on-surface mb-3">Я — Репетитор</h2>
            <p className="text-on-surface-variant">Делитесь знаниями, управляйте расписанием и вдохновляйте учеников.</p>
          </button>
        </div>

        <div className="mt-16 text-center">
          <p className="text-on-surface-variant">
            Уже есть аккаунт? <button className="font-semibold text-primary hover:underline ml-1">Войти</button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function TutorSearchScreen({ onTutorClick }: { onTutorClick: (tutor: Tutor) => void }) {
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

const TutorCard: FC<{ tutor: Tutor; onClick: () => void }> = ({ tutor, onClick }) => {
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
            <span key={s} className="bg-secondary-container/50 text-on-secondary-container px-3 py-1 rounded-lg text-xs font-semibold">
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-outline-variant/30 mt-auto">
        <div>
          <span className="text-xs text-outline uppercase tracking-wider font-bold">Стоимость</span>
          <p className="text-2xl font-bold text-on-surface">${tutor.hourlyRate}<span className="text-sm font-normal text-on-surface-variant">/ч</span></p>
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

function ScheduleScreen() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="md:flex justify-between items-end mb-10">
        <div>
          <h2 className="text-4xl font-bold text-on-surface tracking-tight mb-2">Мое расписание</h2>
          <p className="text-on-surface-variant text-lg">Управляйте своими предстоящими уроками и консультациями.</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-4">
          <div className="bg-secondary-container/30 text-on-secondary-container px-4 py-2 rounded-full font-semibold flex items-center gap-2">
            <Calendar className="w-5 h-5 text-secondary" /> Осень 2023
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="glass rounded-3xl p-6 shadow-ambient">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Октябрь 2023</h3>
              <div className="flex gap-2">
                <button className="p-2 rounded-full hover:bg-surface-container"><ChevronLeft className="w-5 h-5" /></button>
                <button className="p-2 rounded-full hover:bg-surface-container"><ChevronRight className="w-5 h-5" /></button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-2 mb-4 text-center">
              {['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'].map(d => (
                <span key={d} className="text-xs font-bold text-outline uppercase">{d}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 31 }).map((_, i) => {
                const day = i + 1;
                const isSelected = day === 12;
                const hasLesson = [4, 13, 15, 22].includes(day);
                return (
                  <div key={i} className="aspect-square flex flex-col items-center justify-center relative">
                    <button className={`w-full h-full rounded-full text-sm font-medium transition-all ${isSelected ? 'bg-primary text-white shadow-lg scale-110' : 'hover:bg-surface-container'}`}>
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
              <h3 className="text-2xl font-bold">Сегодня, 12 Окт</h3>
              <span className="bg-secondary-container text-on-secondary-container text-xs px-3 py-1 rounded-full font-bold">2 ЗАНЯТИЯ</span>
            </div>
            <div className="space-y-4">
              {SCHEDULE.slice(0, 2).map(lesson => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold mb-6">Завтра, 13 Окт</h3>
            <div className="space-y-4">
              <LessonCard lesson={SCHEDULE[2]} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

const LessonCard: FC<{ lesson: Lesson }> = ({ lesson }) => {
  return (
    <div className="group glass rounded-2xl p-6 flex flex-col sm:flex-row gap-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
      <div className="sm:w-32 sm:border-r border-outline-variant/30 sm:pr-6">
        <p className="text-2xl font-bold text-primary">{lesson.time}</p>
        <p className="text-sm font-bold text-outline flex items-center gap-1 uppercase tracking-tighter">
          <Clock className="w-3.5 h-3.5" /> {lesson.duration}
        </p>
      </div>
      
      <div className="flex-1 flex flex-col sm:flex-row justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h4 className="text-xl font-bold">{lesson.subject}</h4>
            <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-full flex items-center gap-1 ${lesson.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
              {lesson.status === 'confirmed' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
              {lesson.status === 'confirmed' ? 'Подтверждено' : 'Ожидает'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <img src={lesson.tutorAvatar} alt={lesson.tutorName} className="w-6 h-6 rounded-full object-cover" />
            <span className="text-on-surface-variant font-medium">{lesson.tutorName}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-xs bg-surface-container px-2 py-1 rounded-lg text-outline flex items-center gap-1.5">
              {lesson.locationType === 'online' ? <Video className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}
              {lesson.location}
            </span>
          </div>
        </div>
        
        <div className="flex items-center mt-auto sm:mt-0">
          {lesson.status === 'confirmed' ? (
            <button className="w-full sm:w-auto bg-primary text-on-primary px-6 py-2.5 rounded-xl font-bold shadow-sm hover:scale-105 active:scale-95 transition-all">
              Войти в класс
            </button>
          ) : (
            <button className="w-full sm:w-auto bg-surface-container text-on-surface px-6 py-2.5 rounded-xl font-bold hover:bg-surface-container-high transition-colors">
              Подробнее
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ProfileScreen({ tutor }: { tutor: Tutor }) {
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
              <p className="text-lg text-on-surface-variant leading-relaxed">
                {tutor.bio}
              </p>
            </section>

            <section className="glass rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-bold">Предметы</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {tutor.subjects.map(s => (
                  <span key={s} className="bg-primary/5 text-primary border border-primary/20 px-6 py-2 rounded-2xl font-bold hover:bg-primary/10 transition-colors cursor-default">
                    {s}
                  </span>
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
                <button className="text-primary font-bold hover:underline">График</button>
              </div>

              <div className="flex items-center justify-between mb-6">
                <button className="p-2 rounded-full hover:bg-surface-container"><ChevronLeft className="w-5 h-5" /></button>
                <span className="font-bold">Октябрь 2023</span>
                <button className="p-2 rounded-full hover:bg-surface-container"><ChevronRight className="w-5 h-5" /></button>
              </div>

              <div className="grid grid-cols-7 text-center mb-4">
                {['В', 'П', 'В', 'С', 'Ч', 'П', 'С'].map(d => (
                  <span key={d} className="text-xs font-bold text-outline">{d}</span>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1 text-center mb-8">
                {Array.from({ length: 30 }).map((_, i) => {
                  const day = i + 1;
                  const isToday = day === 5;
                  const isSelectable = [3, 5, 8].includes(day);
                  return (
                    <button key={i} className={`aspect-square flex items-center justify-center rounded-xl text-sm font-bold transition-all ${isToday ? 'bg-primary text-white shadow-md' : isSelectable ? 'bg-primary-container/20 text-primary hover:bg-primary-container/30' : 'text-outline cursor-not-allowed opacity-40'}`}>
                      {day}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-sm text-on-surface-variant">Свободные слоты на 5 окт</h4>
                <div className="grid grid-cols-2 gap-3">
                  {['10:00', '13:30', '15:00', '16:30'].map((time, i) => (
                    <button key={time} className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all ${i === 2 ? 'bg-primary/5 border-primary text-primary shadow-sm' : 'border-outline-variant hover:border-primary text-on-surface'}`}>
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
          <button className="w-full sm:w-auto bg-primary text-on-primary rounded-2xl py-4 px-12 text-lg font-bold shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
            Забронировать урок
            <ArrowLeft className="w-6 h-6 rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
}

function BottomNav({ active, onNavigate }: { active: string; onNavigate: (s: any) => void }) {
  const tabs = [
    { id: 'dashboard', label: 'Главная', icon: Home },
    { id: 'discover', label: 'Поиск', icon: Search },
    { id: 'schedule', label: 'График', icon: Calendar },
    { id: 'user_profile', label: 'Профиль', icon: UserRound },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full h-20 glass border-t border-outline-variant/30 flex justify-around items-center px-4 safe-area-pb z-50">
      {tabs.map(tab => {
        const isActive = active === tab.id || (tab.id === 'discover' && active === 'tutor_profile');
        return (
          <button 
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={`flex flex-col items-center gap-1 transition-all ${isActive ? 'text-primary scale-110' : 'text-outline hover:text-primary/60'}`}
          >
            <tab.icon className={`w-6 h-6 ${isActive ? 'fill-primary/20' : ''}`} />
            <span className="text-[10px] font-bold uppercase tracking-tight">{tab.label}</span>
            {isActive && <motion.div layoutId="nav-dot" className="w-1 h-1 bg-primary rounded-full" />}
          </button>
        );
      })}
    </nav>
  );
}
