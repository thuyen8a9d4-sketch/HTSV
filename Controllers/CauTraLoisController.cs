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
    public class CauTraLoisController : Controller
    {
        private readonly QuanLyHocTapContext _context;

        public CauTraLoisController(QuanLyHocTapContext context)
        {
            _context = context;
        }

        // GET: CauTraLois
        public async Task<IActionResult> Index()
        {
            var quanLyHocTapContext = _context.CauTraLois.Include(c => c.Attempt).Include(c => c.ExamQuestion).Include(c => c.SelectedOption);
            return View(await quanLyHocTapContext.ToListAsync());
        }

        // GET: CauTraLois/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var cauTraLoi = await _context.CauTraLois
                .Include(c => c.Attempt)
                .Include(c => c.ExamQuestion)
                .Include(c => c.SelectedOption)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (cauTraLoi == null)
            {
                return NotFound();
            }

            return View(cauTraLoi);
        }

        // GET: CauTraLois/Create
        public IActionResult Create()
        {
            ViewData["AttemptId"] = new SelectList(_context.LuotLamBais, "Id", "Id");
            ViewData["ExamQuestionId"] = new SelectList(_context.CauHoiDeThis, "Id", "Id");
            ViewData["SelectedOptionId"] = new SelectList(_context.DapAns, "Id", "Id");
            return View();
        }

        // POST: CauTraLois/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,AttemptId,ExamQuestionId,SelectedOptionId,IsCorrect,AnsweredAt")] CauTraLoi cauTraLoi)
        {
            if (ModelState.IsValid)
            {
                _context.Add(cauTraLoi);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["AttemptId"] = new SelectList(_context.LuotLamBais, "Id", "Id", cauTraLoi.AttemptId);
            ViewData["ExamQuestionId"] = new SelectList(_context.CauHoiDeThis, "Id", "Id", cauTraLoi.ExamQuestionId);
            ViewData["SelectedOptionId"] = new SelectList(_context.DapAns, "Id", "Id", cauTraLoi.SelectedOptionId);
            return View(cauTraLoi);
        }

        // GET: CauTraLois/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var cauTraLoi = await _context.CauTraLois.FindAsync(id);
            if (cauTraLoi == null)
            {
                return NotFound();
            }
            ViewData["AttemptId"] = new SelectList(_context.LuotLamBais, "Id", "Id", cauTraLoi.AttemptId);
            ViewData["ExamQuestionId"] = new SelectList(_context.CauHoiDeThis, "Id", "Id", cauTraLoi.ExamQuestionId);
            ViewData["SelectedOptionId"] = new SelectList(_context.DapAns, "Id", "Id", cauTraLoi.SelectedOptionId);
            return View(cauTraLoi);
        }

        // POST: CauTraLois/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,AttemptId,ExamQuestionId,SelectedOptionId,IsCorrect,AnsweredAt")] CauTraLoi cauTraLoi)
        {
            if (id != cauTraLoi.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(cauTraLoi);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CauTraLoiExists(cauTraLoi.Id))
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
            ViewData["AttemptId"] = new SelectList(_context.LuotLamBais, "Id", "Id", cauTraLoi.AttemptId);
            ViewData["ExamQuestionId"] = new SelectList(_context.CauHoiDeThis, "Id", "Id", cauTraLoi.ExamQuestionId);
            ViewData["SelectedOptionId"] = new SelectList(_context.DapAns, "Id", "Id", cauTraLoi.SelectedOptionId);
            return View(cauTraLoi);
        }

        // GET: CauTraLois/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var cauTraLoi = await _context.CauTraLois
                .Include(c => c.Attempt)
                .Include(c => c.ExamQuestion)
                .Include(c => c.SelectedOption)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (cauTraLoi == null)
            {
                return NotFound();
            }

            return View(cauTraLoi);
        }

        // POST: CauTraLois/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var cauTraLoi = await _context.CauTraLois.FindAsync(id);
            if (cauTraLoi != null)
            {
                _context.CauTraLois.Remove(cauTraLoi);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool CauTraLoiExists(int id)
        {
            return _context.CauTraLois.Any(e => e.Id == id);
        }
    }
}
