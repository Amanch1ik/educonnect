import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Role, Tutor } from './types';

// Импорт компонентов
import WelcomeScreen from './components/WelcomeScreen';
import TopBar from './components/TopBar';
import BottomNav from './components/BottomNav';
import DashboardScreen from './components/DashboardScreen';
import TutorSearchScreen from './components/TutorSearchScreen';
import ProfileScreen from './components/ProfileScreen';
import ScheduleScreen from './components/ScheduleScreen';
import UserProfileScreen from './components/UserProfileScreen';

export default function App() {
  const [role, setRole] = useState<Role>(null);
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'dashboard' | 'discover' | 'schedule' | 'user_profile' | 'tutor_profile'>('welcome');
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchKey, setSearchKey] = useState(0);

  const handleRoleSelect = (selectedRole: Role) => {
    setRole(selectedRole);
    setCurrentScreen('dashboard');
  };

  const handleTutorClick = (tutor: Tutor) => {
    setSelectedTutor(tutor);
    setCurrentScreen('tutor_profile');
  };

  const handleSubjectSearch = (subject: string) => {
    setSearchQuery(subject);
    setSearchKey(k => k + 1);
    setCurrentScreen('discover');
  };

  // Экран приветствия (авторизация/выбор роли)
  if (currentScreen === 'welcome') {
    return <WelcomeScreen onSelect={handleRoleSelect} />;
  }

  // Главное приложение
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
              <DashboardScreen onSearch={() => setCurrentScreen('discover')} onSchedule={() => setCurrentScreen('schedule')} />
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
              <TutorSearchScreen key={searchKey} initialQuery={searchQuery} onTutorClick={handleTutorClick} onSubjectClick={handleSubjectSearch} />
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
              <UserProfileScreen onLogout={() => { setRole(null); setCurrentScreen('welcome'); }} />
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
              <ProfileScreen tutor={selectedTutor} onSubjectClick={handleSubjectSearch} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <BottomNav active={currentScreen} onNavigate={setCurrentScreen} />
    </div>
  );
}
