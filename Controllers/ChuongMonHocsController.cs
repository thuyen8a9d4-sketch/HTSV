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
    public class ChuongMonHocsController : Controller
    {
        private readonly QuanLyHocTapContext _context;

        public ChuongMonHocsController(QuanLyHocTapContext context)
        {
            _context = context;
        }

        // GET: ChuongMonHocs
        public async Task<IActionResult> Index()
        {
            var quanLyHocTapContext = _context.ChuongMonHocs.Include(c => c.Subject);
            return View(await quanLyHocTapContext.ToListAsync());
        }

        // GET: ChuongMonHocs/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var chuongMonHoc = await _context.ChuongMonHocs
                .Include(c => c.Subject)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (chuongMonHoc == null)
            {
                return NotFound();
            }

            return View(chuongMonHoc);
        }

        // GET: ChuongMonHocs/Create
        public IActionResult Create()
        {
            ViewData["SubjectId"] = new SelectList(_context.MonHocs, "Id", "Id");
            return View();
        }

        // POST: ChuongMonHocs/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,SubjectId,ChapterNo,Title,WeightPercent")] ChuongMonHoc chuongMonHoc)
        {
            if (ModelState.IsValid)
            {
                _context.Add(chuongMonHoc);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["SubjectId"] = new SelectList(_context.MonHocs, "Id", "Id", chuongMonHoc.SubjectId);
            return View(chuongMonHoc);
        }

        // GET: ChuongMonHocs/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var chuongMonHoc = await _context.ChuongMonHocs.FindAsync(id);
            if (chuongMonHoc == null)
            {
                return NotFound();
            }
            ViewData["SubjectId"] = new SelectList(_context.MonHocs, "Id", "Id", chuongMonHoc.SubjectId);
            return View(chuongMonHoc);
        }

        // POST: ChuongMonHocs/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,SubjectId,ChapterNo,Title,WeightPercent")] ChuongMonHoc chuongMonHoc)
        {
            if (id != chuongMonHoc.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(chuongMonHoc);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ChuongMonHocExists(chuongMonHoc.Id))
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
            ViewData["SubjectId"] = new SelectList(_context.MonHocs, "Id", "Id", chuongMonHoc.SubjectId);
            return View(chuongMonHoc);
        }

        // GET: ChuongMonHocs/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var chuongMonHoc = await _context.ChuongMonHocs
                .Include(c => c.Subject)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (chuongMonHoc == null)
            {
                return NotFound();
            }

            return View(chuongMonHoc);
        }

        // POST: ChuongMonHocs/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var chuongMonHoc = await _context.ChuongMonHocs.FindAsync(id);
            if (chuongMonHoc != null)
            {
                _context.ChuongMonHocs.Remove(chuongMonHoc);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ChuongMonHocExists(int id)
        {
            return _context.ChuongMonHocs.Any(e => e.Id == id);
        }
    }
}
