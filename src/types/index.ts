// Типы данных приложения EduConnect

export type Role = 'student' | 'teacher' | null;

export interface Tutor {
  id: string;
  name: string;
  avatar: string;
  title: string;
  rating: number;
  reviewsCount: number;
  bio: string;
  subjects: string[];
  hourlyRate: number;
  education: {
    degree: string;
    institution: string;
    years: string;
  }[];
  verified?: boolean;
}

export interface Lesson {
  id: string;
  time: string;
  duration: string;
  subject: string;
  tutorName: string;
  tutorAvatar: string;
  status: 'confirmed' | 'pending';
  location: string;
  locationType: 'online' | 'physical';
}
