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
    public class DeThisController : Controller
    {
        private readonly QuanLyHocTapContext _context;

        public DeThisController(QuanLyHocTapContext context)
        {
            _context = context;
        }

        // GET: DeThis
        public async Task<IActionResult> Index()
        {
            var quanLyHocTapContext = _context.DeThis.Include(d => d.CreatedByUser).Include(d => d.Subject);
            return View(await quanLyHocTapContext.ToListAsync());
        }

        // GET: DeThis/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var deThi = await _context.DeThis
                .Include(d => d.CreatedByUser)
                .Include(d => d.Subject)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (deThi == null)
            {
                return NotFound();
            }

            return View(deThi);
        }

        // GET: DeThis/Create
        public IActionResult Create()
        {
            ViewData["CreatedByUserId"] = new SelectList(_context.NguoiDungs, "Id", "Id");
            ViewData["SubjectId"] = new SelectList(_context.MonHocs, "Id", "Id");
            return View();
        }

        // POST: DeThis/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,CreatedByUserId,SubjectId,ScopeType,ScopeConfig,TotalQuestions,DurationMinutes,TheoryCount,ApplicationCount,PracticalCount,CreatedAt")] DeThi deThi)
        {
            if (ModelState.IsValid)
            {
                _context.Add(deThi);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["CreatedByUserId"] = new SelectList(_context.NguoiDungs, "Id", "Id", deThi.CreatedByUserId);
            ViewData["SubjectId"] = new SelectList(_context.MonHocs, "Id", "Id", deThi.SubjectId);
            return View(deThi);
        }

        // GET: DeThis/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var deThi = await _context.DeThis.FindAsync(id);
            if (deThi == null)
            {
                return NotFound();
            }
            ViewData["CreatedByUserId"] = new SelectList(_context.NguoiDungs, "Id", "Id", deThi.CreatedByUserId);
            ViewData["SubjectId"] = new SelectList(_context.MonHocs, "Id", "Id", deThi.SubjectId);
            return View(deThi);
        }

        // POST: DeThis/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,CreatedByUserId,SubjectId,ScopeType,ScopeConfig,TotalQuestions,DurationMinutes,TheoryCount,ApplicationCount,PracticalCount,CreatedAt")] DeThi deThi)
        {
            if (id != deThi.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(deThi);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!DeThiExists(deThi.Id))
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
            ViewData["CreatedByUserId"] = new SelectList(_context.NguoiDungs, "Id", "Id", deThi.CreatedByUserId);
            ViewData["SubjectId"] = new SelectList(_context.MonHocs, "Id", "Id", deThi.SubjectId);
            return View(deThi);
        }

        // GET: DeThis/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var deThi = await _context.DeThis
                .Include(d => d.CreatedByUser)
                .Include(d => d.Subject)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (deThi == null)
            {
                return NotFound();
            }

            return View(deThi);
        }

        // POST: DeThis/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var deThi = await _context.DeThis.FindAsync(id);
            if (deThi != null)
            {
                _context.DeThis.Remove(deThi);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool DeThiExists(int id)
        {
            return _context.DeThis.Any(e => e.Id == id);
        }
    }
}
