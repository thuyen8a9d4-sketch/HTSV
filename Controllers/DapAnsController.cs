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
    public class DapAnsController : Controller
    {
        private readonly QuanLyHocTapContext _context;

        public DapAnsController(QuanLyHocTapContext context)
        {
            _context = context;
        }

        // GET: DapAns
        public async Task<IActionResult> Index()
        {
            var quanLyHocTapContext = _context.DapAns.Include(d => d.Question);
            return View(await quanLyHocTapContext.ToListAsync());
        }

        // GET: DapAns/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var dapAn = await _context.DapAns
                .Include(d => d.Question)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (dapAn == null)
            {
                return NotFound();
            }

            return View(dapAn);
        }

        // GET: DapAns/Create
        public IActionResult Create()
        {
            ViewData["QuestionId"] = new SelectList(_context.NganHangCauHois, "Id", "Id");
            return View();
        }

        // POST: DapAns/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,QuestionId,OptionLabel,Content,IsCorrect")] DapAn dapAn)
        {
            if (ModelState.IsValid)
            {
                _context.Add(dapAn);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["QuestionId"] = new SelectList(_context.NganHangCauHois, "Id", "Id", dapAn.QuestionId);
            return View(dapAn);
        }

        // GET: DapAns/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var dapAn = await _context.DapAns.FindAsync(id);
            if (dapAn == null)
            {
                return NotFound();
            }
            ViewData["QuestionId"] = new SelectList(_context.NganHangCauHois, "Id", "Id", dapAn.QuestionId);
            return View(dapAn);
        }

        // POST: DapAns/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,QuestionId,OptionLabel,Content,IsCorrect")] DapAn dapAn)
        {
            if (id != dapAn.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(dapAn);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!DapAnExists(dapAn.Id))
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
            ViewData["QuestionId"] = new SelectList(_context.NganHangCauHois, "Id", "Id", dapAn.QuestionId);
            return View(dapAn);
        }

        // GET: DapAns/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var dapAn = await _context.DapAns
                .Include(d => d.Question)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (dapAn == null)
            {
                return NotFound();
            }

            return View(dapAn);
        }

        // POST: DapAns/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var dapAn = await _context.DapAns.FindAsync(id);
            if (dapAn != null)
            {
                _context.DapAns.Remove(dapAn);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool DapAnExists(int id)
        {
            return _context.DapAns.Any(e => e.Id == id);
        }
    }
}
