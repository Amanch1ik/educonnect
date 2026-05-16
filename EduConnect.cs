using System;
using System.Collections.Generic;
using System.Linq;

namespace EduConnect.App 
{
    // --- МОДЕЛИ ДАННЫХ ---

    /// <summary>
    /// Представляет пользователя системы (Роль: Студент или Учитель)
    /// </summary>
    public record User(string Id, string Name, string Email, string Role);

    /// <summary>
    /// Модель репетитора с использованием современных record в C#
    /// </summary>
    public record Tutor(
        string Id, 
        string Name, 
        string Title, 
        double Rating, 
        decimal HourlyRate,
        List<string> Subjects,
        bool IsVerified = false
    );

    /// <summary>
    /// Модель запланированного урока
    /// </summary>
    public record Lesson(
        string Id,
        DateTime StartTime,
        TimeSpan Duration,
        string Subject,
        string TutorName,
        LessonStatus Status = LessonStatus.Pending
    );

    public enum LessonStatus { Pending, Confirmed, Completed, Cancelled }

    // --- СЕРВИСЫ (БИЗНЕС-ЛОГИКА) ---

    public interface ITutorService
    {
        IEnumerable<Tutor> SearchTutors(string query);
        bool BookLesson(User student, Tutor tutor, DateTime time);
    }

    public class EduConnectService : ITutorService
    {
        private readonly List<Tutor> _tutors = new()
        {
            new("1", "Айгуль Асанова", "Ph.D. Математика", 4.9, 45.00m, new() { "Математика", "Алгебра" }, true),
            new("2", "Азамат Исаев", "M.A. Лингвистика", 4.7, 35.00m, new() { "Английский", "Литература" }, true),
            new("3", "Каныкей Маматова", "B.S. Химия", 5.0, 55.00m, new() { "Химия", "Биология" })
        };

        private readonly List<Lesson> _schedule = new();

        public IEnumerable<Tutor> SearchTutors(string query)
        {
            if (string.IsNullOrWhiteSpace(query)) return _tutors;

            return _tutors.Where(t => 
                t.Name.Contains(query, StringComparison.OrdinalIgnoreCase) || 
                t.Subjects.Any(s => s.Contains(query, StringComparison.OrdinalIgnoreCase))
            );
        }

        public bool BookLesson(User student, Tutor tutor, DateTime time)
        {
            // Логика проверки доступности
            var lesson = new Lesson(
                Guid.NewGuid().ToString(),
                time,
                TimeSpan.FromMinutes(45),
                tutor.Subjects.First(),
                tutor.Name
            );

            _schedule.Add(lesson);
            Console.WriteLine($"[EduConnect] Успешно: Студент {student.Name} забронировал урок с {tutor.Name} на {time:f}");
            return true;
        }

        public void DisplayDashboard(User user)
        {
            Console.WriteLine("========================================");
            Console.WriteLine($"   EDUCONNECT DASHBOARD - {user.Name.ToUpper()}");
            Console.WriteLine("========================================");
            Console.WriteLine($"Роль: {user.Role}");
            Console.WriteLine($"Ближайших занятий: {_schedule.Count(l => l.StartTime > DateTime.Now)}");
            Console.WriteLine("----------------------------------------");
        }
    }

    // --- ТОЧКА ВХОДА (Демонстрация) ---

    public class Program
    {
        public static void Main()
        {
            var app = new EduConnectService();
            var currentUser = new User("std_01", "Аман", "aman@edu.kg", "Студент");

            // 1. Отображение дашборда
            app.DisplayDashboard(currentUser);

            // 2. Поиск репетитора
            Console.WriteLine(">> Поиск репетиторов по запросу 'Химия'...");
            var results = app.SearchTutors("Химия");

            foreach (var t in results)
            {
                string verifiedIcon = t.IsVerified ? "[✔]" : "[ ]";
                Console.WriteLine($"{verifiedIcon} {t.Name} - {t.Title} ({t.HourlyRate}$/ч)");
            }

            // 3. Бронирование
            Console.WriteLine("\n>> Бронирование пробного урока...");
            var targetTutor = results.FirstOrDefault();
            if (targetTutor != null)
            {
                app.BookLesson(currentUser, targetTutor, DateTime.Now.AddDays(2).AddHours(4));
            }

            Console.WriteLine("\nПриложение EduConnect на C# готово к расширению!");
        }
    }
}
