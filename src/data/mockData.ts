import { Tutor, Lesson } from '../types';

// Данные репетиторов для демонстрации
// TODO: потом заменить на запрос к API
export const TUTORS: Tutor[] = [
  {
    id: '1',
    name: 'Айгүл Асанова',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiHH6vqv2vDeRWSq57zBVJ-X1QqCxxbo3lQr2rf0Da58O0qm3hvQsbh45QglrLG0i_LSWxQefhd30H4fVJax5D6YramV_pX9l69zfvQUOZKL6YWVlMasYi5ZA8hjHyw81pWoYxucSD5eDT__dcYHbvgBelu-k4IwSvGsTUQeDoLYIUeXJgmmv5dZfj4Vujkv0Z_XnYuBokeuoHn_TVQKlyQCEsHH0KXQnFmTbS4VTDn7r9Yf6wl38CNRzeyCk-e5JNSa1mKspe0ys',
    title: 'Ph.D. Математика',
    rating: 4.9,
    reviewsCount: 124,
    bio: 'Привет! Я Айгүл, увлеченный преподаватель математики с более чем 8-летним опытом помощи студентам в раскрытии их потенциала. Я верю, что математика — это не просто запоминание формул, а развитие навыков критического решения проблем.',
    subjects: ['Математика', 'Исчисление', 'Алгебра'],
    hourlyRate: 45,
    education: [
      { degree: 'Магистр в области преподавания математики', institution: 'Стэнфордский университет', years: '2016-2018' },
      { degree: 'Бакалавр наук в области математики', institution: 'КНУ', years: '2012-2016' }
    ],
    verified: true
  },
  {
    id: '2',
    name: 'Азамат Исаев',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzbqVBQ4fFR1KlD0mPUkS7SrSeMwujeYqGIvENvssbmRvIX7PccTMNArgrMm4ouGtBXsvlUIetYQcqW3H3VsvhQ1yF_8BTjErm_XH2i7XxtAaRVekQyxMOVIcnU2-UKxSzhJSf9vd3zplIXoN5JGE1qc8tmpZLqoDwUXygDMxe9OBd6fO3zp3me7V3mwoZAVRwq8Iy1xpmXP5d1LGjkRnLnHkDe_E0ka5UTZIHXUbtjWTqbwNTIuS9HbU9DQt-MxasaRo3_8S5yDQ',
    title: 'M.A. Английская лит-ра',
    rating: 4.7,
    reviewsCount: 89,
    bio: 'Увлечен литературой и творческим письмом. Помогаю студентам улучшить структуру эссе и навыки критического мышления.',
    subjects: ['Английский', 'Литература', 'Письмо'],
    hourlyRate: 35,
    education: [
      { degree: 'Магистр английской литературы', institution: 'БГУ', years: '2014-2016' }
    ],
    verified: true
  },
  {
    id: '3',
    name: 'Каныкей Маматова',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZjuq6hOldiVQH2MAHT8tlk2HsARsOOW2R6PfkJIeyXyWHXhi9hkbDMHKWFcUT9unk8XUOlNfUejmfwUdP9OXviiyLa3yq_dqfGEvWnVHI8cEEYsFNcfP1JDNMwGNWW_tzCGCJ5dKp150zLeujaD4bMUT0eR7gQFKb1RKCxH0v1lbJS6i7OqgqM-bf0O4xx27iy7zkv6cEHQbw9-JWAP2UK6bGNJjbNvtGugkvBPJSRRIku4DhkiET_HDAKVTTmOH4oPsQkPwBitc',
    title: 'B.S. Химия',
    rating: 5.0,
    reviewsCount: 210,
    bio: 'Делаю сложные научные концепции доступными. Эксперт по химии, биологии и физике для школьников и студентов.',
    subjects: ['Химия', 'Физика', 'Биология'],
    hourlyRate: 55,
    education: [
      { degree: 'Бакалавр наук по химии', institution: 'КГТУ', years: '2015-2019' }
    ],
    verified: true
  }
];

// расписание занятий
export const SCHEDULE: Lesson[] = [
  {
    id: 's1',
    time: '10:00',
    duration: '45 мин',
    subject: 'Высшая математика',
    tutorName: 'Проф. Алмаз Бакытов',
    tutorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgfVe42ovTbpE7oExjcNDRoCnv46fk3A66VyNAH_69bl8MPh6HNjMqqRklDlz0PHAAMGLFAuiGnJvBxw9RHBre1JZQfaNDuPrqTpryJjr_6uX7zGWgPHL8P9gqf6AbPGNDJiqRq-b0k0Y3RbSRvkCX-tjoB1gZJ_ZAMrnoUDnl80HY47qFAXKCEKIpmzMwN1_smbHtfRf6LjLTQ4JxKTJ_Wuqpk-omYwgxYSEG5sGYBB32VWKGhcNkSSIRd6cYVrdN6xSKRKkhHPA',
    status: 'confirmed',
    location: 'Онлайн-комната А',
    locationType: 'online'
  },
  {
    id: 's2',
    time: '14:30',
    duration: '60 мин',
    subject: 'Физика (Механика)',
    tutorName: 'Д-р Айгүл Асанова',
    tutorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiHH6vqv2vDeRWSq57zBVJ-X1QqCxxbo3lQr2rf0Da58O0qm3hvQsbh45QglrLG0i_LSWxQefhd30H4fVJax5D6YramV_pX9l69zfvQUOZKL6YWVlMasYi5ZA8hjHyw81pWoYxucSD5eDT__dcYHbvgBelu-k4IwSvGsTUQeDoLYIUeXJgmmv5dZfj4Vujkv0Z_XnYuBokeuoHn_TVQKlyQCEsHH0KXQnFmTbS4VTDn7r9Yf6wl38CNRzeyCk-e5JNSa1mKspe0ys',
    status: 'confirmed',
    location: 'Лаборатория 304',
    locationType: 'physical'
  },
  {
    id: 's3',
    time: '09:15',
    duration: '45 мин',
    subject: 'История: Подготовка эссе',
    tutorName: 'М-р Нурбек Султанов',
    tutorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2XJR9Kcv4HEpd9hO-yIjUYYPnb-54Uu8oD-6IhnoZWQ6wUVJq3WrqxXnxnJQMTkrZHBH1VX38XkZ_Tj0qQQD0j4rDtyPyBpco6cyVvHGnCR9Tww0gMPhu7mRvHRE9ofJG01ufqkji6OgFdP3itzVwHVJahpjidipFYcU6HAb_N6PLX69HIju5L_XYu17273vkU_MDEXmpioEZqVA2d-4vR97CGTozpvA3FsahAhS2sYqlMi6SHBWw-OnY71AeDadLMLqP-emiu54',
    status: 'pending',
    location: 'Онлайн-комната B',
    locationType: 'online'
  }
];
