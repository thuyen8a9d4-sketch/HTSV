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
    public class LuotLamBaisController : Controller
    {
        private readonly QuanLyHocTapContext _context;

        public LuotLamBaisController(QuanLyHocTapContext context)
        {
            _context = context;
        }

        // GET: LuotLamBais
        public async Task<IActionResult> Index()
        {
            var quanLyHocTapContext = _context.LuotLamBais.Include(l => l.Exam).Include(l => l.StudentUser);
            return View(await quanLyHocTapContext.ToListAsync());
        }

        // GET: LuotLamBais/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var luotLamBai = await _context.LuotLamBais
                .Include(l => l.Exam)
                .Include(l => l.StudentUser)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (luotLamBai == null)
            {
                return NotFound();
            }

            return View(luotLamBai);
        }

        // GET: LuotLamBais/Create
        public IActionResult Create()
        {
            ViewData["ExamId"] = new SelectList(_context.DeThis, "Id", "Id");
            ViewData["StudentUserId"] = new SelectList(_context.NguoiDungs, "Id", "Id");
            return View();
        }

        // POST: LuotLamBais/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,ExamId,StudentUserId,StartedAt,SubmittedAt,Score,CorrectCount,WrongCount,Status")] LuotLamBai luotLamBai)
        {
            if (ModelState.IsValid)
            {
                _context.Add(luotLamBai);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["ExamId"] = new SelectList(_context.DeThis, "Id", "Id", luotLamBai.ExamId);
            ViewData["StudentUserId"] = new SelectList(_context.NguoiDungs, "Id", "Id", luotLamBai.StudentUserId);
            return View(luotLamBai);
        }

        // GET: LuotLamBais/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var luotLamBai = await _context.LuotLamBais.FindAsync(id);
            if (luotLamBai == null)
            {
                return NotFound();
            }
            ViewData["ExamId"] = new SelectList(_context.DeThis, "Id", "Id", luotLamBai.ExamId);
            ViewData["StudentUserId"] = new SelectList(_context.NguoiDungs, "Id", "Id", luotLamBai.StudentUserId);
            return View(luotLamBai);
        }

        // POST: LuotLamBais/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,ExamId,StudentUserId,StartedAt,SubmittedAt,Score,CorrectCount,WrongCount,Status")] LuotLamBai luotLamBai)
        {
            if (id != luotLamBai.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(luotLamBai);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!LuotLamBaiExists(luotLamBai.Id))
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
            ViewData["ExamId"] = new SelectList(_context.DeThis, "Id", "Id", luotLamBai.ExamId);
            ViewData["StudentUserId"] = new SelectList(_context.NguoiDungs, "Id", "Id", luotLamBai.StudentUserId);
            return View(luotLamBai);
        }

        // GET: LuotLamBais/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var luotLamBai = await _context.LuotLamBais
                .Include(l => l.Exam)
                .Include(l => l.StudentUser)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (luotLamBai == null)
            {
                return NotFound();
            }

            return View(luotLamBai);
        }

        // POST: LuotLamBais/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var luotLamBai = await _context.LuotLamBais.FindAsync(id);
            if (luotLamBai != null)
            {
                _context.LuotLamBais.Remove(luotLamBai);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool LuotLamBaiExists(int id)
        {
            return _context.LuotLamBais.Any(e => e.Id == id);
        }
    }
}
