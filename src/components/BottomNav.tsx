import { Home, Search, Calendar, UserRound } from 'lucide-react';
import { motion } from 'motion/react';

interface BottomNavProps {
  active: string;
  onNavigate: (screen: string) => void;
}

/* нижнее меню навигации */
export default function BottomNav({ active, onNavigate }: BottomNavProps) {
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
