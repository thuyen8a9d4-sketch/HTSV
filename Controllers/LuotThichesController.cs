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
    public class LuotThichesController : Controller
    {
        private readonly QuanLyHocTapContext _context;

        public LuotThichesController(QuanLyHocTapContext context)
        {
            _context = context;
        }

        // GET: LuotThiches
        public async Task<IActionResult> Index()
        {
            var quanLyHocTapContext = _context.LuotThiches.Include(l => l.Confession).Include(l => l.User);
            return View(await quanLyHocTapContext.ToListAsync());
        }

        // GET: LuotThiches/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var luotThich = await _context.LuotThiches
                .Include(l => l.Confession)
                .Include(l => l.User)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (luotThich == null)
            {
                return NotFound();
            }

            return View(luotThich);
        }

        // GET: LuotThiches/Create
        public IActionResult Create()
        {
            ViewData["ConfessionId"] = new SelectList(_context.BaiConfessions, "Id", "Id");
            ViewData["UserId"] = new SelectList(_context.NguoiDungs, "Id", "Id");
            return View();
        }

        // POST: LuotThiches/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,ConfessionId,UserId,Type,CreatedAt")] LuotThich luotThich)
        {
            if (ModelState.IsValid)
            {
                _context.Add(luotThich);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["ConfessionId"] = new SelectList(_context.BaiConfessions, "Id", "Id", luotThich.ConfessionId);
            ViewData["UserId"] = new SelectList(_context.NguoiDungs, "Id", "Id", luotThich.UserId);
            return View(luotThich);
        }

        // GET: LuotThiches/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var luotThich = await _context.LuotThiches.FindAsync(id);
            if (luotThich == null)
            {
                return NotFound();
            }
            ViewData["ConfessionId"] = new SelectList(_context.BaiConfessions, "Id", "Id", luotThich.ConfessionId);
            ViewData["UserId"] = new SelectList(_context.NguoiDungs, "Id", "Id", luotThich.UserId);
            return View(luotThich);
        }

        // POST: LuotThiches/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,ConfessionId,UserId,Type,CreatedAt")] LuotThich luotThich)
        {
            if (id != luotThich.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(luotThich);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!LuotThichExists(luotThich.Id))
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
            ViewData["ConfessionId"] = new SelectList(_context.BaiConfessions, "Id", "Id", luotThich.ConfessionId);
            ViewData["UserId"] = new SelectList(_context.NguoiDungs, "Id", "Id", luotThich.UserId);
            return View(luotThich);
        }

        // GET: LuotThiches/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var luotThich = await _context.LuotThiches
                .Include(l => l.Confession)
                .Include(l => l.User)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (luotThich == null)
            {
                return NotFound();
            }

            return View(luotThich);
        }

        // POST: LuotThiches/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var luotThich = await _context.LuotThiches.FindAsync(id);
            if (luotThich != null)
            {
                _context.LuotThiches.Remove(luotThich);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool LuotThichExists(int id)
        {
            return _context.LuotThiches.Any(e => e.Id == id);
        }
    }
}
