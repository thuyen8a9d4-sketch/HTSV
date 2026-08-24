using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using HTSV.Models;

namespace HTSV.Controllers
{
    public class TaiLieusController : Controller
    {
        private readonly QuanLyHocTapContext _context;

        public TaiLieusController(QuanLyHocTapContext context)
        {
            _context = context;
        }

        // GET: TaiLieus
        public async Task<IActionResult> Index()
        {
            var quanLyHocTapContext = _context.TaiLieus.Include(t => t.Course).Include(t => t.OwnerUser);
            return View(await quanLyHocTapContext.ToListAsync());
        }

        // GET: TaiLieus/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var taiLieu = await _context.TaiLieus
                .Include(t => t.Course)
                .Include(t => t.OwnerUser)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (taiLieu == null)
            {
                return NotFound();
            }

            return View(taiLieu);
        }

        // GET: TaiLieus/Create
        [Authorize(Roles = "ADMIN,LECTURER")]
        public IActionResult Create()
        {
            ViewData["OwnerUserId"] = new SelectList(_context.NguoiDungs, "Id", "Username");
            return View();
        }

        // POST: TaiLieus/Create
        // CourseId is not exposed in the form (the app no longer manages courses) - it's
        // silently assigned to a default course record to satisfy the database's foreign key.
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "ADMIN,LECTURER")]
        public async Task<IActionResult> Create([Bind("Id,OwnerUserId,Type,Title,Description,IsFree,IsSellable,Price,Status,CreatedAt")] TaiLieu taiLieu)
        {
            taiLieu.CourseId = await GetDefaultCourseIdAsync();
            // Course/OwnerUser are EF navigation properties, not posted by the form (only the
            // *Id scalars are) - remove them so their implicit "required" validation doesn't
            // block submission of an otherwise-valid model.
            ModelState.Remove(nameof(TaiLieu.Course));
            ModelState.Remove(nameof(TaiLieu.OwnerUser));
            if (ModelState.IsValid)
            {
                _context.Add(taiLieu);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["OwnerUserId"] = new SelectList(_context.NguoiDungs, "Id", "Username", taiLieu.OwnerUserId);
            return View(taiLieu);
        }

        // GET: TaiLieus/Edit/5
        [Authorize(Roles = "ADMIN,LECTURER")]
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var taiLieu = await _context.TaiLieus.FindAsync(id);
            if (taiLieu == null)
            {
                return NotFound();
            }
            ViewData["OwnerUserId"] = new SelectList(_context.NguoiDungs, "Id", "Username", taiLieu.OwnerUserId);
            return View(taiLieu);
        }

        // POST: TaiLieus/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "ADMIN,LECTURER")]
        public async Task<IActionResult> Edit(int id, [Bind("Id,OwnerUserId,Type,Title,Description,IsFree,IsSellable,Price,Status,CreatedAt")] TaiLieu taiLieu)
        {
            if (id != taiLieu.Id)
            {
                return NotFound();
            }

            ModelState.Remove(nameof(TaiLieu.Course));
            ModelState.Remove(nameof(TaiLieu.OwnerUser));
            if (ModelState.IsValid)
            {
                try
                {
                    var existing = await _context.TaiLieus.FindAsync(id);
                    if (existing == null)
                    {
                        return NotFound();
                    }
                    taiLieu.CourseId = existing.CourseId;
                    _context.Entry(existing).CurrentValues.SetValues(taiLieu);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!TaiLieuExists(taiLieu.Id))
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
            ViewData["OwnerUserId"] = new SelectList(_context.NguoiDungs, "Id", "Username", taiLieu.OwnerUserId);
            return View(taiLieu);
        }

        // GET: TaiLieus/Delete/5
        [Authorize(Roles = "ADMIN,LECTURER")]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var taiLieu = await _context.TaiLieus
                .Include(t => t.Course)
                .Include(t => t.OwnerUser)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (taiLieu == null)
            {
                return NotFound();
            }

            return View(taiLieu);
        }

        // POST: TaiLieus/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "ADMIN,LECTURER")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var taiLieu = await _context.TaiLieus.FindAsync(id);
            if (taiLieu != null)
            {
                _context.TaiLieus.Remove(taiLieu);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool TaiLieuExists(int id)
        {
            return _context.TaiLieus.Any(e => e.Id == id);
        }

        private async Task<int> GetDefaultCourseIdAsync()
        {
            var id = await _context.LopHocPhans.Select(c => c.Id).FirstOrDefaultAsync();
            if (id == 0)
            {
                throw new InvalidOperationException("Không tìm thấy bản ghi LopHocPhan mặc định để gán cho sách.");
            }
            return id;
        }
    }
}
