using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HTSV.Models;

namespace HTSV.Controllers;

// Public-facing portal: Forum (Confession) + Library (TaiLieu).
// Viewing is open to everyone; posting/commenting/liking/buying requires login (any role) -
// enforced manually below rather than via [Authorize], since this controller opts out of the
// site-wide Admin/Lecturer-only default policy (see Program.cs) with [AllowAnonymous].
[AllowAnonymous]
public class PortalController : Controller
{
    private readonly QuanLyHocTapContext _context;

    public PortalController(QuanLyHocTapContext context)
    {
        _context = context;
    }

    private bool IsLoggedIn => User.Identity != null && User.Identity.IsAuthenticated;

    private int CurrentUserId => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    private IActionResult RequireLogin()
    {
        return RedirectToAction("Login", "Account", new { returnUrl = Request.Path + Request.QueryString });
    }

    public IActionResult Index()
    {
        return View();
    }

    public async Task<IActionResult> Forum()
    {
        var posts = await _context.BaiConfessions
            .Include(b => b.AuthorUser)
            .Include(b => b.Category)
            .Include(b => b.LuotThiches)
            .Include(b => b.BinhLuans)
            .Where(b => b.Status == "approved")
            .OrderByDescending(b => b.CreatedAt)
            .ToListAsync();
        return View(posts);
    }

    public async Task<IActionResult> ForumDetails(int id)
    {
        var post = await _context.BaiConfessions
            .Include(b => b.AuthorUser)
            .Include(b => b.Category)
            .Include(b => b.LuotThiches)
            .Include(b => b.BinhLuans).ThenInclude(c => c.AuthorUser)
            .FirstOrDefaultAsync(b => b.Id == id && b.Status == "approved");
        if (post == null)
        {
            return NotFound();
        }
        return View(post);
    }

    [HttpGet]
    public IActionResult ForumCreate()
    {
        if (!IsLoggedIn)
        {
            return RequireLogin();
        }
        return View();
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> ForumCreate(string content, bool isAnonymous)
    {
        if (!IsLoggedIn)
        {
            return RequireLogin();
        }
        if (string.IsNullOrWhiteSpace(content))
        {
            ModelState.AddModelError(string.Empty, "Nội dung không được để trống.");
            return View();
        }

        _context.BaiConfessions.Add(new BaiConfession
        {
            AuthorUserId = CurrentUserId,
            Content = content,
            IsAnonymous = isAnonymous,
            Status = "pending",
            CreatedAt = DateTime.Now,
        });
        await _context.SaveChangesAsync();
        TempData["Message"] = "Bài viết đã được gửi và đang chờ duyệt.";
        return RedirectToAction(nameof(Forum));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Comment(int confessionId, string content)
    {
        if (!IsLoggedIn)
        {
            return RequireLogin();
        }
        if (!string.IsNullOrWhiteSpace(content))
        {
            _context.BinhLuans.Add(new BinhLuan
            {
                ConfessionId = confessionId,
                AuthorUserId = CurrentUserId,
                Content = content,
                IsAnonymous = false,
                CreatedAt = DateTime.Now,
            });
            await _context.SaveChangesAsync();
        }
        return RedirectToAction(nameof(ForumDetails), new { id = confessionId });
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Like(int confessionId)
    {
        if (!IsLoggedIn)
        {
            return RequireLogin();
        }
        var existing = await _context.LuotThiches
            .FirstOrDefaultAsync(l => l.ConfessionId == confessionId && l.UserId == CurrentUserId);
        if (existing == null)
        {
            _context.LuotThiches.Add(new LuotThich
            {
                ConfessionId = confessionId,
                UserId = CurrentUserId,
                Type = "like",
                CreatedAt = DateTime.Now,
            });
        }
        else
        {
            _context.LuotThiches.Remove(existing);
        }
        await _context.SaveChangesAsync();
        return RedirectToAction(nameof(ForumDetails), new { id = confessionId });
    }

    public async Task<IActionResult> Library(string? q)
    {
        var query = _context.TaiLieus.Where(t => t.Status == "published").AsQueryable();
        if (!string.IsNullOrWhiteSpace(q))
        {
            query = query.Where(t => t.Title.Contains(q));
        }
        var docs = await query.OrderByDescending(t => t.CreatedAt).ToListAsync();
        ViewData["Query"] = q;
        return View(docs);
    }

    public async Task<IActionResult> MyUploads()
    {
        if (!IsLoggedIn)
        {
            return RequireLogin();
        }
        var docs = await _context.TaiLieus
            .Where(t => t.OwnerUserId == CurrentUserId)
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync();
        return View(docs);
    }

    public async Task<IActionResult> Read(int id)
    {
        var doc = await _context.TaiLieus
            .Include(t => t.PhienBanTaiLieus)
            .FirstOrDefaultAsync(t => t.Id == id);
        if (doc == null)
        {
            return NotFound();
        }

        var isOwner = IsLoggedIn && doc.OwnerUserId == CurrentUserId;
        var isAdmin = User.IsInRole("ADMIN");
        if (doc.Status != "published" && !isOwner && !isAdmin)
        {
            return NotFound();
        }

        var hasAccess = doc.IsFree || isOwner || isAdmin;
        if (!hasAccess && IsLoggedIn)
        {
            hasAccess = await _context.QuyenTruyCapTaiLieus.AnyAsync(g =>
                g.MaterialId == id && g.UserId == CurrentUserId &&
                (g.ExpiresAt == null || g.ExpiresAt > DateTime.Now));
        }
        ViewData["HasAccess"] = hasAccess;
        return View(doc);
    }

    [HttpGet]
    public IActionResult UploadMaterial()
    {
        if (!IsLoggedIn || !(User.IsInRole("LECTURER") || User.IsInRole("ADMIN")))
        {
            return RequireLogin();
        }
        return View();
    }

    private static readonly string[] AllowedExtensions = { ".pdf", ".doc", ".docx", ".ppt", ".pptx", ".xls", ".xlsx", ".zip", ".rar" };
    private const long MaxFileSizeBytes = 20 * 1024 * 1024; // 20 MB

    [HttpPost]
    [ValidateAntiForgeryToken]
    [RequestSizeLimit(MaxFileSizeBytes)]
    public async Task<IActionResult> UploadMaterial(string title, string description, string type, IFormFile? file)
    {
        if (!IsLoggedIn || !(User.IsInRole("LECTURER") || User.IsInRole("ADMIN")))
        {
            return RequireLogin();
        }

        if (string.IsNullOrWhiteSpace(title))
        {
            ModelState.AddModelError(string.Empty, "Vui lòng nhập tiêu đề.");
        }
        if (file == null || file.Length == 0)
        {
            ModelState.AddModelError(string.Empty, "Vui lòng chọn file để tải lên.");
        }
        else
        {
            var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (!AllowedExtensions.Contains(ext))
            {
                ModelState.AddModelError(string.Empty, "Định dạng file không được hỗ trợ. Chỉ chấp nhận: " + string.Join(", ", AllowedExtensions));
            }
            else if (file.Length > MaxFileSizeBytes)
            {
                ModelState.AddModelError(string.Empty, "File vượt quá dung lượng cho phép (20 MB).");
            }
        }

        if (!ModelState.IsValid)
        {
            return View();
        }

        var courseId = await _context.LopHocPhans.Select(c => c.Id).FirstOrDefaultAsync();
        var doc = new TaiLieu
        {
            CourseId = courseId,
            OwnerUserId = CurrentUserId,
            Type = string.IsNullOrWhiteSpace(type) ? "OTHER" : type,
            Title = title,
            Description = description,
            IsFree = false,
            IsSellable = false,
            Price = null,
            Status = "pending",
            CreatedAt = DateTime.Now,
        };
        _context.TaiLieus.Add(doc);
        await _context.SaveChangesAsync();

        var uploadsDir = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
        Directory.CreateDirectory(uploadsDir);
        var savedFileName = $"{Guid.NewGuid()}{Path.GetExtension(file!.FileName)}";
        var savedPath = Path.Combine(uploadsDir, savedFileName);
        using (var stream = new FileStream(savedPath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        _context.PhienBanTaiLieus.Add(new PhienBanTaiLieu
        {
            MaterialId = doc.Id,
            VersionNo = 1,
            FilePath = $"/uploads/{savedFileName}",
            FileSize = file.Length,
            MimeType = file.ContentType,
            PageCount = null,
            UploadedAt = DateTime.Now,
        });
        await _context.SaveChangesAsync();

        TempData["Message"] = "Giáo trình đã được gửi và đang chờ Admin duyệt.";
        return RedirectToAction(nameof(MyUploads));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Buy(int id)
    {
        if (!IsLoggedIn)
        {
            return RequireLogin();
        }

        var doc = await _context.TaiLieus.FindAsync(id);
        if (doc == null || doc.Status != "published" || !doc.IsSellable || doc.Price is null)
        {
            return NotFound();
        }

        var alreadyOwned = await _context.QuyenTruyCapTaiLieus.AnyAsync(g => g.MaterialId == id && g.UserId == CurrentUserId);
        if (!alreadyOwned)
        {
            // Demo/simulated instant purchase - no real payment gateway is integrated.
            var order = new DonHang
            {
                UserId = CurrentUserId,
                Status = "paid",
                TotalAmount = doc.Price.Value,
                CreatedAt = DateTime.Now,
                PaidAt = DateTime.Now,
            };
            _context.DonHangs.Add(order);
            await _context.SaveChangesAsync();

            _context.ThanhToans.Add(new ThanhToan
            {
                OrderId = order.Id,
                Provider = "DEMO",
                Amount = doc.Price.Value,
                Status = "success",
                CreatedAt = DateTime.Now,
                ConfirmedAt = DateTime.Now,
            });
            _context.QuyenTruyCapTaiLieus.Add(new QuyenTruyCapTaiLieu
            {
                UserId = CurrentUserId,
                MaterialId = id,
                GrantedVia = "purchase",
                OrderId = order.Id,
                GrantedAt = DateTime.Now,
            });
            await _context.SaveChangesAsync();
            TempData["Message"] = "Mua tài liệu thành công.";
        }

        return RedirectToAction(nameof(Read), new { id });
    }
}
