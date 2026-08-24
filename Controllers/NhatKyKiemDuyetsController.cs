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
    public class NhatKyKiemDuyetsController : Controller
    {
        private readonly QuanLyHocTapContext _context;

        public NhatKyKiemDuyetsController(QuanLyHocTapContext context)
        {
            _context = context;
        }

        // GET: NhatKyKiemDuyets
        public async Task<IActionResult> Index()
        {
            var quanLyHocTapContext = _context.NhatKyKiemDuyets.Include(n => n.Confession).Include(n => n.ModeratorUser);
            return View(await quanLyHocTapContext.ToListAsync());
        }

        // GET: NhatKyKiemDuyets/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var nhatKyKiemDuyet = await _context.NhatKyKiemDuyets
                .Include(n => n.Confession)
                .Include(n => n.ModeratorUser)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (nhatKyKiemDuyet == null)
            {
                return NotFound();
            }

            return View(nhatKyKiemDuyet);
        }

        // GET: NhatKyKiemDuyets/Create
        public IActionResult Create()
        {
            ViewData["ConfessionId"] = new SelectList(_context.BaiConfessions, "Id", "Id");
            ViewData["ModeratorUserId"] = new SelectList(_context.NguoiDungs, "Id", "Id");
            return View();
        }

        // POST: NhatKyKiemDuyets/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,ConfessionId,ModeratorUserId,Action,OldStatus,NewStatus,Note,CreatedAt")] NhatKyKiemDuyet nhatKyKiemDuyet)
        {
            if (ModelState.IsValid)
            {
                _context.Add(nhatKyKiemDuyet);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["ConfessionId"] = new SelectList(_context.BaiConfessions, "Id", "Id", nhatKyKiemDuyet.ConfessionId);
            ViewData["ModeratorUserId"] = new SelectList(_context.NguoiDungs, "Id", "Id", nhatKyKiemDuyet.ModeratorUserId);
            return View(nhatKyKiemDuyet);
        }

        // GET: NhatKyKiemDuyets/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var nhatKyKiemDuyet = await _context.NhatKyKiemDuyets.FindAsync(id);
            if (nhatKyKiemDuyet == null)
            {
                return NotFound();
            }
            ViewData["ConfessionId"] = new SelectList(_context.BaiConfessions, "Id", "Id", nhatKyKiemDuyet.ConfessionId);
            ViewData["ModeratorUserId"] = new SelectList(_context.NguoiDungs, "Id", "Id", nhatKyKiemDuyet.ModeratorUserId);
            return View(nhatKyKiemDuyet);
        }

        // POST: NhatKyKiemDuyets/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,ConfessionId,ModeratorUserId,Action,OldStatus,NewStatus,Note,CreatedAt")] NhatKyKiemDuyet nhatKyKiemDuyet)
        {
            if (id != nhatKyKiemDuyet.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(nhatKyKiemDuyet);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!NhatKyKiemDuyetExists(nhatKyKiemDuyet.Id))
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
            ViewData["ConfessionId"] = new SelectList(_context.BaiConfessions, "Id", "Id", nhatKyKiemDuyet.ConfessionId);
            ViewData["ModeratorUserId"] = new SelectList(_context.NguoiDungs, "Id", "Id", nhatKyKiemDuyet.ModeratorUserId);
            return View(nhatKyKiemDuyet);
        }

        // GET: NhatKyKiemDuyets/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var nhatKyKiemDuyet = await _context.NhatKyKiemDuyets
                .Include(n => n.Confession)
                .Include(n => n.ModeratorUser)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (nhatKyKiemDuyet == null)
            {
                return NotFound();
            }

            return View(nhatKyKiemDuyet);
        }

        // POST: NhatKyKiemDuyets/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var nhatKyKiemDuyet = await _context.NhatKyKiemDuyets.FindAsync(id);
            if (nhatKyKiemDuyet != null)
            {
                _context.NhatKyKiemDuyets.Remove(nhatKyKiemDuyet);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool NhatKyKiemDuyetExists(int id)
        {
            return _context.NhatKyKiemDuyets.Any(e => e.Id == id);
        }
    }
}
