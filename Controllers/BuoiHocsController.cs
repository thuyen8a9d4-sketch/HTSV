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
    public class BuoiHocsController : Controller
    {
        private readonly QuanLyHocTapContext _context;

        public BuoiHocsController(QuanLyHocTapContext context)
        {
            _context = context;
        }

        // GET: BuoiHocs
        public async Task<IActionResult> Index()
        {
            var quanLyHocTapContext = _context.BuoiHocs.Include(b => b.Course);
            return View(await quanLyHocTapContext.ToListAsync());
        }

        // GET: BuoiHocs/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var buoiHoc = await _context.BuoiHocs
                .Include(b => b.Course)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (buoiHoc == null)
            {
                return NotFound();
            }

            return View(buoiHoc);
        }

        // GET: BuoiHocs/Create
        public IActionResult Create()
        {
            ViewData["CourseId"] = new SelectList(_context.LopHocPhans, "Id", "Id");
            return View();
        }

        // POST: BuoiHocs/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,CourseId,LessonNo,Title,Content,ScheduledDate")] BuoiHoc buoiHoc)
        {
            if (ModelState.IsValid)
            {
                _context.Add(buoiHoc);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["CourseId"] = new SelectList(_context.LopHocPhans, "Id", "Id", buoiHoc.CourseId);
            return View(buoiHoc);
        }

        // GET: BuoiHocs/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var buoiHoc = await _context.BuoiHocs.FindAsync(id);
            if (buoiHoc == null)
            {
                return NotFound();
            }
            ViewData["CourseId"] = new SelectList(_context.LopHocPhans, "Id", "Id", buoiHoc.CourseId);
            return View(buoiHoc);
        }

        // POST: BuoiHocs/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,CourseId,LessonNo,Title,Content,ScheduledDate")] BuoiHoc buoiHoc)
        {
            if (id != buoiHoc.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(buoiHoc);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!BuoiHocExists(buoiHoc.Id))
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
            ViewData["CourseId"] = new SelectList(_context.LopHocPhans, "Id", "Id", buoiHoc.CourseId);
            return View(buoiHoc);
        }

        // GET: BuoiHocs/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var buoiHoc = await _context.BuoiHocs
                .Include(b => b.Course)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (buoiHoc == null)
            {
                return NotFound();
            }

            return View(buoiHoc);
        }

        // POST: BuoiHocs/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var buoiHoc = await _context.BuoiHocs.FindAsync(id);
            if (buoiHoc != null)
            {
                _context.BuoiHocs.Remove(buoiHoc);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool BuoiHocExists(int id)
        {
            return _context.BuoiHocs.Any(e => e.Id == id);
        }
    }
}
