import { useState } from 'react';
import { Video } from 'lucide-react';

interface UserProfileScreenProps {
  onLogout: () => void;
}

export default function UserProfileScreen({ onLogout }: UserProfileScreenProps) {
  const [notificationsOn, setNotificationsOn] = useState(true);

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
            <Video className="w-4 h-4" />
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
            <button
              onClick={() => setNotificationsOn(v => !v)}
              className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${notificationsOn ? 'bg-secondary' : 'bg-outline-variant'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${notificationsOn ? 'right-1' : 'left-1'}`} />
            </button>
          </div>
          <button
            onClick={onLogout}
            className="w-full p-5 flex justify-between items-center text-red-500 font-bold hover:bg-red-50 transition-colors"
          >
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </div>
  );
}
