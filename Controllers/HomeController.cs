using System.Diagnostics;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HTSV.Models;

namespace HTSV.Controllers;

public class HomeController : Controller
{
    private readonly QuanLyHocTapContext _context;

    public HomeController(QuanLyHocTapContext context)
    {
        _context = context;
    }

    // Dashboard - Admin/Lecturer only (enforced by the global default policy in Program.cs)
    public async Task<IActionResult> Index()
    {
        var vm = new DashboardViewModel
        {
            PostCount = await _context.BaiConfessions.CountAsync(),
            PendingPostCount = await _context.BaiConfessions.CountAsync(p => p.Status == "pending"),
            CommentCount = await _context.BinhLuans.CountAsync(),
            ReportCount = await _context.BaoCaos.CountAsync(),
            BookCount = await _context.TaiLieus.CountAsync(),
            AccountCount = await _context.NguoiDungs.CountAsync(),
            TotalRevenue = await _context.DonHangs.Where(o => o.Status == "paid").SumAsync(o => (decimal?)o.TotalAmount) ?? 0,
        };
        return View(vm);
    }

    [AllowAnonymous]
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}

public class DashboardViewModel
{
    public int PostCount { get; set; }
    public int PendingPostCount { get; set; }
    public int CommentCount { get; set; }
    public int ReportCount { get; set; }
    public int BookCount { get; set; }
    public int AccountCount { get; set; }
    public decimal TotalRevenue { get; set; }
}
