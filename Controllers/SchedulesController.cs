using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HTSV.Models;

namespace HTSV.Controllers;

public class SchedulesController : Controller
{
    private readonly QuanLyHocTapContext _context;

    public SchedulesController(QuanLyHocTapContext context)
    {
        _context = context;
    }

    public async Task<IActionResult> Index(DateOnly? week)
    {
        var today = DateOnly.FromDateTime(DateTime.Today);
        var anchor = week ?? today;
        var diff = (int)anchor.DayOfWeek - (int)DayOfWeek.Monday;
        if (diff < 0) diff += 7;
        var monday = anchor.AddDays(-diff);
        var sunday = monday.AddDays(6);

        var sessions = await _context.BuoiHocs
            .Include(b => b.Course).ThenInclude(c => c.Subject)
            .Include(b => b.Course).ThenInclude(c => c.Lecturer).ThenInclude(l => l.User)
            .Where(b => b.ScheduledDate >= monday && b.ScheduledDate <= sunday)
            .OrderBy(b => b.ScheduledDate).ThenBy(b => b.LessonNo)
            .ToListAsync();

        var vm = new ScheduleViewModel
        {
            WeekStart = monday,
            WeekEnd = sunday,
            Today = today,
            Days = Enumerable.Range(0, 7)
                .Select(i => monday.AddDays(i))
                .Select(date => new ScheduleDayViewModel
                {
                    Date = date,
                    Sessions = sessions.Where(s => s.ScheduledDate == date).ToList(),
                })
                .ToList(),
        };
        return View(vm);
    }
}

public class ScheduleViewModel
{
    public DateOnly WeekStart { get; set; }
    public DateOnly WeekEnd { get; set; }
    public DateOnly Today { get; set; }
    public List<ScheduleDayViewModel> Days { get; set; } = new();
}

public class ScheduleDayViewModel
{
    public DateOnly Date { get; set; }
    public List<BuoiHoc> Sessions { get; set; } = new();
}
