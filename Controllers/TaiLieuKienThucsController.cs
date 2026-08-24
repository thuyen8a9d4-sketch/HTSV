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
    public class TaiLieuKienThucsController : Controller
    {
        private readonly QuanLyHocTapContext _context;

        public TaiLieuKienThucsController(QuanLyHocTapContext context)
        {
            _context = context;
        }

        // GET: TaiLieuKienThucs
        public async Task<IActionResult> Index()
        {
            var quanLyHocTapContext = _context.TaiLieuKienThucs.Include(t => t.Material).Include(t => t.Subject);
            return View(await quanLyHocTapContext.ToListAsync());
        }

        // GET: TaiLieuKienThucs/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var taiLieuKienThuc = await _context.TaiLieuKienThucs
                .Include(t => t.Material)
                .Include(t => t.Subject)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (taiLieuKienThuc == null)
            {
                return NotFound();
            }

            return View(taiLieuKienThuc);
        }

        // GET: TaiLieuKienThucs/Create
        public IActionResult Create()
        {
            ViewData["MaterialId"] = new SelectList(_context.TaiLieus, "Id", "Id");
            ViewData["SubjectId"] = new SelectList(_context.MonHocs, "Id", "Id");
            return View();
        }

        // POST: TaiLieuKienThucs/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,MaterialId,SubjectId,Title,ProcessedStatus,CreatedAt")] TaiLieuKienThuc taiLieuKienThuc)
        {
            if (ModelState.IsValid)
            {
                _context.Add(taiLieuKienThuc);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["MaterialId"] = new SelectList(_context.TaiLieus, "Id", "Id", taiLieuKienThuc.MaterialId);
            ViewData["SubjectId"] = new SelectList(_context.MonHocs, "Id", "Id", taiLieuKienThuc.SubjectId);
            return View(taiLieuKienThuc);
        }

        // GET: TaiLieuKienThucs/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var taiLieuKienThuc = await _context.TaiLieuKienThucs.FindAsync(id);
            if (taiLieuKienThuc == null)
            {
                return NotFound();
            }
            ViewData["MaterialId"] = new SelectList(_context.TaiLieus, "Id", "Id", taiLieuKienThuc.MaterialId);
            ViewData["SubjectId"] = new SelectList(_context.MonHocs, "Id", "Id", taiLieuKienThuc.SubjectId);
            return View(taiLieuKienThuc);
        }

        // POST: TaiLieuKienThucs/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,MaterialId,SubjectId,Title,ProcessedStatus,CreatedAt")] TaiLieuKienThuc taiLieuKienThuc)
        {
            if (id != taiLieuKienThuc.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(taiLieuKienThuc);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!TaiLieuKienThucExists(taiLieuKienThuc.Id))
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
            ViewData["MaterialId"] = new SelectList(_context.TaiLieus, "Id", "Id", taiLieuKienThuc.MaterialId);
            ViewData["SubjectId"] = new SelectList(_context.MonHocs, "Id", "Id", taiLieuKienThuc.SubjectId);
            return View(taiLieuKienThuc);
        }

        // GET: TaiLieuKienThucs/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var taiLieuKienThuc = await _context.TaiLieuKienThucs
                .Include(t => t.Material)
                .Include(t => t.Subject)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (taiLieuKienThuc == null)
            {
                return NotFound();
            }

            return View(taiLieuKienThuc);
        }

        // POST: TaiLieuKienThucs/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var taiLieuKienThuc = await _context.TaiLieuKienThucs.FindAsync(id);
            if (taiLieuKienThuc != null)
            {
                _context.TaiLieuKienThucs.Remove(taiLieuKienThuc);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool TaiLieuKienThucExists(int id)
        {
            return _context.TaiLieuKienThucs.Any(e => e.Id == id);
        }
    }
}
