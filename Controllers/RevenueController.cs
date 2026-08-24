using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HTSV.Models;

namespace HTSV.Controllers;

[Authorize(Roles = "ADMIN")]
public class RevenueController : Controller
{
    private readonly QuanLyHocTapContext _context;

    public RevenueController(QuanLyHocTapContext context)
    {
        _context = context;
    }

    public async Task<IActionResult> Index()
    {
        var orders = await _context.DonHangs
            .Include(o => o.User)
            .Include(o => o.ThanhToans)
            .Include(o => o.QuyenTruyCapTaiLieus).ThenInclude(g => g.Material)
            .OrderByDescending(o => o.CreatedAt)
            .ToListAsync();

        var now = DateTime.Now;
        var vm = new RevenueViewModel
        {
            Orders = orders,
            TotalRevenue = orders.Where(o => o.Status == "paid").Sum(o => o.TotalAmount),
            TotalOrders = orders.Count,
            PaidOrders = orders.Count(o => o.Status == "paid"),
            RevenueThisMonth = orders
                .Where(o => o.Status == "paid" && o.PaidAt.HasValue && o.PaidAt.Value.Month == now.Month && o.PaidAt.Value.Year == now.Year)
                .Sum(o => o.TotalAmount),
        };
        return View(vm);
    }
}

public class RevenueViewModel
{
    public List<DonHang> Orders { get; set; } = new();
    public decimal TotalRevenue { get; set; }
    public int TotalOrders { get; set; }
    public int PaidOrders { get; set; }
    public decimal RevenueThisMonth { get; set; }
}
