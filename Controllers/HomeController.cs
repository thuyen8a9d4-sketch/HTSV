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
            SinhVienCount = await _context.SinhViens.CountAsync(),
            GiangVienCount = await _context.GiangViens.CountAsync(),
            MonHocCount = await _context.MonHocs.CountAsync(),
            LopHocPhanCount = await _context.LopHocPhans.CountAsync(),
            DeThiCount = await _context.DeThis.CountAsync(),
            TaiLieuCount = await _context.TaiLieus.CountAsync(),
        };
        return View(vm);
    }

    [AllowAnonymous]
    public IActionResult Privacy()
    {
        return View();
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
    public int SinhVienCount { get; set; }
    public int GiangVienCount { get; set; }
    public int MonHocCount { get; set; }
    public int LopHocPhanCount { get; set; }
    public int DeThiCount { get; set; }
    public int TaiLieuCount { get; set; }
}
