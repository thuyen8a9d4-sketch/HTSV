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
    public class PhienBanTaiLieusController : Controller
    {
        private readonly QuanLyHocTapContext _context;

        public PhienBanTaiLieusController(QuanLyHocTapContext context)
        {
            _context = context;
        }

        // GET: PhienBanTaiLieus
        public async Task<IActionResult> Index()
        {
            var quanLyHocTapContext = _context.PhienBanTaiLieus.Include(p => p.Material);
            return View(await quanLyHocTapContext.ToListAsync());
        }

        // GET: PhienBanTaiLieus/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var phienBanTaiLieu = await _context.PhienBanTaiLieus
                .Include(p => p.Material)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (phienBanTaiLieu == null)
            {
                return NotFound();
            }

            return View(phienBanTaiLieu);
        }

        // GET: PhienBanTaiLieus/Create
        public IActionResult Create()
        {
            ViewData["MaterialId"] = new SelectList(_context.TaiLieus, "Id", "Id");
            return View();
        }

        // POST: PhienBanTaiLieus/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,MaterialId,VersionNo,FilePath,FileSize,MimeType,PageCount,UploadedAt")] PhienBanTaiLieu phienBanTaiLieu)
        {
            ModelState.Remove(nameof(PhienBanTaiLieu.Material));
            if (ModelState.IsValid)
            {
                _context.Add(phienBanTaiLieu);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["MaterialId"] = new SelectList(_context.TaiLieus, "Id", "Id", phienBanTaiLieu.MaterialId);
            return View(phienBanTaiLieu);
        }

        // GET: PhienBanTaiLieus/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var phienBanTaiLieu = await _context.PhienBanTaiLieus.FindAsync(id);
            if (phienBanTaiLieu == null)
            {
                return NotFound();
            }
            ViewData["MaterialId"] = new SelectList(_context.TaiLieus, "Id", "Id", phienBanTaiLieu.MaterialId);
            return View(phienBanTaiLieu);
        }

        // POST: PhienBanTaiLieus/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,MaterialId,VersionNo,FilePath,FileSize,MimeType,PageCount,UploadedAt")] PhienBanTaiLieu phienBanTaiLieu)
        {
            if (id != phienBanTaiLieu.Id)
            {
                return NotFound();
            }

            ModelState.Remove(nameof(PhienBanTaiLieu.Material));
            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(phienBanTaiLieu);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PhienBanTaiLieuExists(phienBanTaiLieu.Id))
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
            ViewData["MaterialId"] = new SelectList(_context.TaiLieus, "Id", "Id", phienBanTaiLieu.MaterialId);
            return View(phienBanTaiLieu);
        }

        // GET: PhienBanTaiLieus/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var phienBanTaiLieu = await _context.PhienBanTaiLieus
                .Include(p => p.Material)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (phienBanTaiLieu == null)
            {
                return NotFound();
            }

            return View(phienBanTaiLieu);
        }

        // POST: PhienBanTaiLieus/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var phienBanTaiLieu = await _context.PhienBanTaiLieus.FindAsync(id);
            if (phienBanTaiLieu != null)
            {
                _context.PhienBanTaiLieus.Remove(phienBanTaiLieu);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool PhienBanTaiLieuExists(int id)
        {
            return _context.PhienBanTaiLieus.Any(e => e.Id == id);
        }
    }
}
