import { FC } from 'react';
import { Clock, Video, MapPin, CheckCircle2 } from 'lucide-react';
import { Lesson } from '../types';

// карточка занятия - используется на дашборде и в расписании
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

export default LessonCard;
