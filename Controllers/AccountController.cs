using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using System.Threading.Tasks;
using HTSV.Models;
using HTSV.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HTSV.Controllers
{
    [AllowAnonymous]
    public class AccountController : Controller
    {
        private readonly QuanLyHocTapContext _context;
        private readonly EmailSender _emailSender;

        public AccountController(QuanLyHocTapContext context, EmailSender emailSender)
        {
            _context = context;
            _emailSender = emailSender;
        }

        [HttpGet]
        public IActionResult Login(string? returnUrl = null)
        {
            if (User.Identity != null && User.Identity.IsAuthenticated)
            {
                return RedirectAfterLogin(returnUrl);
            }

            ViewData["ReturnUrl"] = returnUrl;
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(string username, string password, string? returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;

            var user = await _context.NguoiDungs
                .Include(u => u.Roles)
                .FirstOrDefaultAsync(u => u.Username == username);

            if (user == null ||
                new PasswordHasher<NguoiDung>().VerifyHashedPassword(user, user.PasswordHash, password ?? string.Empty) == PasswordVerificationResult.Failed)
            {
                ModelState.AddModelError(string.Empty, "Sai tên đăng nhập hoặc mật khẩu.");
                return View();
            }

            if (!user.IsActive)
            {
                TempData["Message"] = "Tài khoản chưa được xác thực. Vui lòng nhập mã OTP đã gửi qua email.";
                return RedirectToAction(nameof(VerifyOtp), new { userId = user.Id });
            }

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim("FullName", user.FullName),
            };
            foreach (var role in user.Roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role.Code));
            }

            var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity));

            return RedirectAfterLogin(returnUrl, user.Roles.Select(r => r.Code));
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Index", "Portal");
        }

        [HttpGet]
        public IActionResult AccessDenied()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var existingByUsername = await _context.NguoiDungs.FirstOrDefaultAsync(u => u.Username == model.Username);
            var existingByEmail = await _context.NguoiDungs.FirstOrDefaultAsync(u => u.Email == model.Email);

            var pending = (existingByUsername != null && !existingByUsername.IsActive) ? existingByUsername
                : (existingByEmail != null && !existingByEmail.IsActive) ? existingByEmail
                : null;
            if (pending != null)
            {
                TempData["Message"] = "Tài khoản này đã đăng ký nhưng chưa xác thực. Vui lòng kiểm tra email hoặc bấm \"Gửi lại mã OTP\".";
                return RedirectToAction(nameof(VerifyOtp), new { userId = pending.Id });
            }
            if (existingByUsername != null)
            {
                ModelState.AddModelError(nameof(model.Username), "Tên đăng nhập đã tồn tại.");
            }
            if (existingByEmail != null)
            {
                ModelState.AddModelError(nameof(model.Email), "Email đã được sử dụng.");
            }
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var studentRole = await _context.VaiTros.FirstAsync(r => r.Code == "STUDENT");
            var user = new NguoiDung
            {
                Username = model.Username,
                Email = model.Email,
                FullName = model.FullName,
                IsActive = false,
                CreatedAt = DateTime.Now,
            };
            user.PasswordHash = new PasswordHasher<NguoiDung>().HashPassword(user, model.Password);
            user.Roles.Add(studentRole);
            _context.NguoiDungs.Add(user);
            await _context.SaveChangesAsync();

            await GenerateAndSendOtpAsync(user);

            return RedirectToAction(nameof(VerifyOtp), new { userId = user.Id });
        }

        [HttpGet]
        public IActionResult VerifyOtp(int userId)
        {
            ViewData["UserId"] = userId;
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> VerifyOtp(int userId, string code)
        {
            ViewData["UserId"] = userId;

            var otp = await _context.MaXacThucs
                .Where(o => o.UserId == userId && !o.IsUsed && o.ExpiresAt > DateTime.Now)
                .OrderByDescending(o => o.CreatedAt)
                .FirstOrDefaultAsync();

            if (otp == null || otp.Code != code)
            {
                ModelState.AddModelError(string.Empty, "Mã OTP không đúng hoặc đã hết hạn.");
                return View();
            }

            otp.IsUsed = true;
            var user = await _context.NguoiDungs.FindAsync(userId);
            user!.IsActive = true;
            await _context.SaveChangesAsync();

            TempData["Message"] = "Xác thực thành công! Bạn có thể đăng nhập.";
            return RedirectToAction(nameof(Login));
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ResendOtp(int userId)
        {
            var user = await _context.NguoiDungs.FindAsync(userId);
            if (user == null || user.IsActive)
            {
                return RedirectToAction(nameof(Login));
            }
            await GenerateAndSendOtpAsync(user);
            TempData["Message"] = "Đã gửi lại mã OTP.";
            return RedirectToAction(nameof(VerifyOtp), new { userId });
        }

        private async Task GenerateAndSendOtpAsync(NguoiDung user)
        {
            var code = Random.Shared.Next(0, 1_000_000).ToString("D6");
            _context.MaXacThucs.Add(new MaXacThuc
            {
                UserId = user.Id,
                Code = code,
                ExpiresAt = DateTime.Now.AddMinutes(10),
                IsUsed = false,
                CreatedAt = DateTime.Now,
            });
            await _context.SaveChangesAsync();

            await _emailSender.SendAsync(
                user.Email,
                "Mã xác thực HTSV",
                $"Xin chào {user.FullName},\n\nMã xác thực (OTP) của bạn là: {code}\nMã có hiệu lực trong 10 phút.\n\nHTSV");
        }

        private IActionResult RedirectAfterLogin(string? returnUrl, IEnumerable<string>? roleCodes = null)
        {
            if (!string.IsNullOrEmpty(returnUrl) && Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }

            var codes = roleCodes ?? User.FindAll(ClaimTypes.Role).Select(c => c.Value);
            if (codes.Any(c => c == "ADMIN" || c == "LECTURER"))
            {
                return RedirectToAction("Index", "Home");
            }
            return RedirectToAction("Index", "Portal");
        }
    }

    public class RegisterViewModel
    {
        [Required(ErrorMessage = "Vui lòng nhập tên đăng nhập.")]
        public string Username { get; set; } = "";

        [Required(ErrorMessage = "Vui lòng nhập họ tên.")]
        public string FullName { get; set; } = "";

        [Required(ErrorMessage = "Vui lòng nhập email.")]
        [EmailAddress(ErrorMessage = "Email không hợp lệ.")]
        public string Email { get; set; } = "";

        [Required(ErrorMessage = "Vui lòng nhập mật khẩu.")]
        [RegularExpression(@"^[A-Z](?=.*[0-9])(?=.*[!@#$%^&*(),.?"":{}|<>_-]).{7,}$",
            ErrorMessage = "Mật khẩu phải từ 8 ký tự, bắt đầu bằng chữ in hoa, có ít nhất 1 chữ số và 1 ký tự đặc biệt.")]
        public string Password { get; set; } = "";

        [Required(ErrorMessage = "Vui lòng xác nhận mật khẩu.")]
        [Compare(nameof(Password), ErrorMessage = "Mật khẩu xác nhận không khớp.")]
        public string ConfirmPassword { get; set; } = "";
    }
}
