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
    public class CauHoiDeThisController : Controller
    {
        private readonly QuanLyHocTapContext _context;

        public CauHoiDeThisController(QuanLyHocTapContext context)
        {
            _context = context;
        }

        // GET: CauHoiDeThis
        public async Task<IActionResult> Index()
        {
            var quanLyHocTapContext = _context.CauHoiDeThis.Include(c => c.Exam).Include(c => c.Question);
            return View(await quanLyHocTapContext.ToListAsync());
        }

        // GET: CauHoiDeThis/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var cauHoiDeThi = await _context.CauHoiDeThis
                .Include(c => c.Exam)
                .Include(c => c.Question)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (cauHoiDeThi == null)
            {
                return NotFound();
            }

            return View(cauHoiDeThi);
        }

        // GET: CauHoiDeThis/Create
        public IActionResult Create()
        {
            ViewData["ExamId"] = new SelectList(_context.DeThis, "Id", "Id");
            ViewData["QuestionId"] = new SelectList(_context.NganHangCauHois, "Id", "Id");
            return View();
        }

        // POST: CauHoiDeThis/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,ExamId,QuestionId,OrderNo")] CauHoiDeThi cauHoiDeThi)
        {
            if (ModelState.IsValid)
            {
                _context.Add(cauHoiDeThi);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["ExamId"] = new SelectList(_context.DeThis, "Id", "Id", cauHoiDeThi.ExamId);
            ViewData["QuestionId"] = new SelectList(_context.NganHangCauHois, "Id", "Id", cauHoiDeThi.QuestionId);
            return View(cauHoiDeThi);
        }

        // GET: CauHoiDeThis/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var cauHoiDeThi = await _context.CauHoiDeThis.FindAsync(id);
            if (cauHoiDeThi == null)
            {
                return NotFound();
            }
            ViewData["ExamId"] = new SelectList(_context.DeThis, "Id", "Id", cauHoiDeThi.ExamId);
            ViewData["QuestionId"] = new SelectList(_context.NganHangCauHois, "Id", "Id", cauHoiDeThi.QuestionId);
            return View(cauHoiDeThi);
        }

        // POST: CauHoiDeThis/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,ExamId,QuestionId,OrderNo")] CauHoiDeThi cauHoiDeThi)
        {
            if (id != cauHoiDeThi.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(cauHoiDeThi);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CauHoiDeThiExists(cauHoiDeThi.Id))
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
            ViewData["ExamId"] = new SelectList(_context.DeThis, "Id", "Id", cauHoiDeThi.ExamId);
            ViewData["QuestionId"] = new SelectList(_context.NganHangCauHois, "Id", "Id", cauHoiDeThi.QuestionId);
            return View(cauHoiDeThi);
        }

        // GET: CauHoiDeThis/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var cauHoiDeThi = await _context.CauHoiDeThis
                .Include(c => c.Exam)
                .Include(c => c.Question)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (cauHoiDeThi == null)
            {
                return NotFound();
            }

            return View(cauHoiDeThi);
        }

        // POST: CauHoiDeThis/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var cauHoiDeThi = await _context.CauHoiDeThis.FindAsync(id);
            if (cauHoiDeThi != null)
            {
                _context.CauHoiDeThis.Remove(cauHoiDeThi);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool CauHoiDeThiExists(int id)
        {
            return _context.CauHoiDeThis.Any(e => e.Id == id);
        }
    }
}
