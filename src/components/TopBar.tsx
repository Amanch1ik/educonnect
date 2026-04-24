import { BookOpen, Bell, ArrowLeft } from 'lucide-react';

interface TopBarProps {
  currentScreen: string;
  onBack: () => void;
}

// верхняя панель навигации
function TopBar({ currentScreen, onBack }: TopBarProps) {
  return (
    <header className="sticky top-0 z-40 w-full glass h-16 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {currentScreen === 'tutor_profile' && (
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

export default TopBar;
