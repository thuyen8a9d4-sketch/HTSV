using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using HTSV.Models;

namespace HTSV.Controllers
{
    public class DangKyHocPhansController : Controller
    {
        private readonly QuanLyHocTapContext _context;

        public DangKyHocPhansController(QuanLyHocTapContext context)
        {
            _context = context;
        }

        // GET: DangKyHocPhans
        public async Task<IActionResult> Index()
        {
            var quanLyHocTapContext = _context.DangKyHocPhans.Include(d => d.Course).Include(d => d.StudentUser);
            return View(await quanLyHocTapContext.ToListAsync());
        }

        // GET: DangKyHocPhans/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var dangKyHocPhan = await _context.DangKyHocPhans
                .Include(d => d.Course)
                .Include(d => d.StudentUser)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (dangKyHocPhan == null)
            {
                return NotFound();
            }

            return View(dangKyHocPhan);
        }

        // GET: DangKyHocPhans/Create
        public IActionResult Create()
        {
            ViewData["CourseId"] = new SelectList(_context.LopHocPhans, "Id", "Id");
            ViewData["StudentUserId"] = new SelectList(_context.SinhViens, "UserId", "UserId");
            return View();
        }

        // POST: DangKyHocPhans/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,StudentUserId,CourseId,EnrolledAt")] DangKyHocPhan dangKyHocPhan)
        {
            if (ModelState.IsValid)
            {
                _context.Add(dangKyHocPhan);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["CourseId"] = new SelectList(_context.LopHocPhans, "Id", "Id", dangKyHocPhan.CourseId);
            ViewData["StudentUserId"] = new SelectList(_context.SinhViens, "UserId", "UserId", dangKyHocPhan.StudentUserId);
            return View(dangKyHocPhan);
        }

        // GET: DangKyHocPhans/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var dangKyHocPhan = await _context.DangKyHocPhans.FindAsync(id);
            if (dangKyHocPhan == null)
            {
                return NotFound();
            }
            ViewData["CourseId"] = new SelectList(_context.LopHocPhans, "Id", "Id", dangKyHocPhan.CourseId);
            ViewData["StudentUserId"] = new SelectList(_context.SinhViens, "UserId", "UserId", dangKyHocPhan.StudentUserId);
            return View(dangKyHocPhan);
        }

        // POST: DangKyHocPhans/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,StudentUserId,CourseId,EnrolledAt")] DangKyHocPhan dangKyHocPhan)
        {
            if (id != dangKyHocPhan.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(dangKyHocPhan);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!DangKyHocPhanExists(dangKyHocPhan.Id))
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
            ViewData["CourseId"] = new SelectList(_context.LopHocPhans, "Id", "Id", dangKyHocPhan.CourseId);
            ViewData["StudentUserId"] = new SelectList(_context.SinhViens, "UserId", "UserId", dangKyHocPhan.StudentUserId);
            return View(dangKyHocPhan);
        }

        // GET: DangKyHocPhans/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var dangKyHocPhan = await _context.DangKyHocPhans
                .Include(d => d.Course)
                .Include(d => d.StudentUser)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (dangKyHocPhan == null)
            {
                return NotFound();
            }

            return View(dangKyHocPhan);
        }

        // POST: DangKyHocPhans/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var dangKyHocPhan = await _context.DangKyHocPhans.FindAsync(id);
            if (dangKyHocPhan != null)
            {
                _context.DangKyHocPhans.Remove(dangKyHocPhan);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool DangKyHocPhanExists(int id)
        {
            return _context.DangKyHocPhans.Any(e => e.Id == id);
        }
    }
}
