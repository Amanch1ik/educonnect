import { BookOpen, School, UserRound } from 'lucide-react';
import { motion } from 'motion/react';
import { Role } from '../types';

interface WelcomeScreenProps {
  onSelect: (role: Role) => void;
}

// экран выбора роли при первом входе
export default function WelcomeScreen({ onSelect }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-6 bg-surface-bright">
      {/* фон с градиентом */}
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
