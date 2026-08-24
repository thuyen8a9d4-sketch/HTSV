using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using HTSV.Models;

namespace HTSV.Controllers
{
    [Authorize(Roles = "ADMIN")]
    public class NguoiDungsController : Controller
    {
        private readonly QuanLyHocTapContext _context;

        public NguoiDungsController(QuanLyHocTapContext context)
        {
            _context = context;
        }

        // GET: NguoiDungs
        public async Task<IActionResult> Index()
        {
            return View(await _context.NguoiDungs.ToListAsync());
        }

        // GET: NguoiDungs/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var nguoiDung = await _context.NguoiDungs
                .FirstOrDefaultAsync(m => m.Id == id);
            if (nguoiDung == null)
            {
                return NotFound();
            }

            return View(nguoiDung);
        }

        private static readonly Regex PasswordPolicy = new(@"^[A-Z](?=.*[0-9])(?=.*[!@#$%^&*(),.?"":{}|<>_-]).{7,}$");

        // GET: NguoiDungs/Create
        public async Task<IActionResult> Create()
        {
            var adminRoleId = await _context.VaiTros.Where(r => r.Code == "ADMIN").Select(r => r.Id).FirstOrDefaultAsync();
            ViewData["RoleId"] = new SelectList(_context.VaiTros, "Id", "Name", adminRoleId);
            return View();
        }

        // POST: NguoiDungs/Create
        // Password is entered as plain text and hashed here - PasswordHash is never bound
        // directly from the form (an account created with a raw, unhashed value could never
        // log in). Role is set here too, since Roles is a collection, not a bindable scalar.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Username,Email,FullName")] NguoiDung nguoiDung, string password, int roleId)
        {
            if (await _context.NguoiDungs.AnyAsync(u => u.Username == nguoiDung.Username))
            {
                ModelState.AddModelError(nameof(NguoiDung.Username), "Tên đăng nhập đã tồn tại.");
            }
            if (await _context.NguoiDungs.AnyAsync(u => u.Email == nguoiDung.Email))
            {
                ModelState.AddModelError(nameof(NguoiDung.Email), "Email đã được sử dụng.");
            }
            if (string.IsNullOrEmpty(password) || !PasswordPolicy.IsMatch(password))
            {
                ModelState.AddModelError(string.Empty, "Mật khẩu phải từ 8 ký tự, bắt đầu bằng chữ in hoa, có ít nhất 1 chữ số và 1 ký tự đặc biệt.");
            }

            ModelState.Remove(nameof(NguoiDung.PasswordHash));
            if (ModelState.IsValid)
            {
                nguoiDung.PasswordHash = new PasswordHasher<NguoiDung>().HashPassword(nguoiDung, password);
                nguoiDung.IsActive = true;
                nguoiDung.CreatedAt = DateTime.Now;

                var role = await _context.VaiTros.FindAsync(roleId);
                if (role != null)
                {
                    nguoiDung.Roles.Add(role);
                }

                _context.Add(nguoiDung);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["RoleId"] = new SelectList(_context.VaiTros, "Id", "Name", roleId);
            return View(nguoiDung);
        }

        // GET: NguoiDungs/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var nguoiDung = await _context.NguoiDungs.Include(u => u.Roles).FirstOrDefaultAsync(u => u.Id == id);
            if (nguoiDung == null)
            {
                return NotFound();
            }
            ViewData["RoleId"] = new SelectList(_context.VaiTros, "Id", "Name", nguoiDung.Roles.Select(r => r.Id).FirstOrDefault());
            return View(nguoiDung);
        }

        // POST: NguoiDungs/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Username,Email,PasswordHash,FullName,IsActive,CreatedAt,UpdatedAt")] NguoiDung nguoiDung, int roleId)
        {
            if (id != nguoiDung.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    var existing = await _context.NguoiDungs.Include(u => u.Roles).FirstOrDefaultAsync(u => u.Id == id);
                    if (existing == null)
                    {
                        return NotFound();
                    }

                    existing.Username = nguoiDung.Username;
                    existing.Email = nguoiDung.Email;
                    existing.PasswordHash = nguoiDung.PasswordHash;
                    existing.FullName = nguoiDung.FullName;
                    existing.IsActive = nguoiDung.IsActive;
                    existing.CreatedAt = nguoiDung.CreatedAt;
                    existing.UpdatedAt = nguoiDung.UpdatedAt;

                    var newRole = await _context.VaiTros.FindAsync(roleId);
                    if (newRole != null)
                    {
                        existing.Roles.Clear();
                        existing.Roles.Add(newRole);
                    }

                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!NguoiDungExists(nguoiDung.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["RoleId"] = new SelectList(_context.VaiTros, "Id", "Name", roleId);
            return View(nguoiDung);
        }

        // GET: NguoiDungs/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var nguoiDung = await _context.NguoiDungs
                .FirstOrDefaultAsync(m => m.Id == id);
            if (nguoiDung == null)
            {
                return NotFound();
            }

            return View(nguoiDung);
        }

        // POST: NguoiDungs/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var nguoiDung = await _context.NguoiDungs.FindAsync(id);
            if (nguoiDung != null)
            {
                _context.NguoiDungs.Remove(nguoiDung);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool NguoiDungExists(int id)
        {
            return _context.NguoiDungs.Any(e => e.Id == id);
        }
    }
}
