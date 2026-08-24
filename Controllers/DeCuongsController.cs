using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using HTSV.Models;

namespace HTSV.Controllers
{
    public class DeCuongsController : Controller
    {
        private readonly QuanLyHocTapContext _context;

        public DeCuongsController(QuanLyHocTapContext context)
        {
            _context = context;
        }

        // GET: DeCuongs
        public async Task<IActionResult> Index()
        {
            var quanLyHocTapContext = _context.DeCuongs.Include(d => d.Subject);
            return View(await quanLyHocTapContext.ToListAsync());
        }

        // GET: DeCuongs/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var deCuong = await _context.DeCuongs
                .Include(d => d.Subject)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (deCuong == null)
            {
                return NotFound();
            }

            return View(deCuong);
        }

        // GET: DeCuongs/Create
        [Authorize(Roles = "ADMIN,LECTURER")]
        public IActionResult Create()
        {
            ViewData["SubjectId"] = new SelectList(_context.MonHocs, "Id", "Id");
            return View();
        }

        // POST: DeCuongs/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "ADMIN,LECTURER")]
        public async Task<IActionResult> Create([Bind("Id,SubjectId,Title,Content,CreatedAt")] DeCuong deCuong)
        {
            if (ModelState.IsValid)
            {
                _context.Add(deCuong);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["SubjectId"] = new SelectList(_context.MonHocs, "Id", "Id", deCuong.SubjectId);
            return View(deCuong);
        }

        // GET: DeCuongs/Edit/5
        [Authorize(Roles = "ADMIN,LECTURER")]
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var deCuong = await _context.DeCuongs.FindAsync(id);
            if (deCuong == null)
            {
                return NotFound();
            }
            ViewData["SubjectId"] = new SelectList(_context.MonHocs, "Id", "Id", deCuong.SubjectId);
            return View(deCuong);
        }

        // POST: DeCuongs/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "ADMIN,LECTURER")]
        public async Task<IActionResult> Edit(int id, [Bind("Id,SubjectId,Title,Content,CreatedAt")] DeCuong deCuong)
        {
            if (id != deCuong.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(deCuong);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!DeCuongExists(deCuong.Id))
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
            ViewData["SubjectId"] = new SelectList(_context.MonHocs, "Id", "Id", deCuong.SubjectId);
            return View(deCuong);
        }

        // GET: DeCuongs/Delete/5
        [Authorize(Roles = "ADMIN,LECTURER")]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var deCuong = await _context.DeCuongs
                .Include(d => d.Subject)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (deCuong == null)
            {
                return NotFound();
            }

            return View(deCuong);
        }

        // POST: DeCuongs/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "ADMIN,LECTURER")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var deCuong = await _context.DeCuongs.FindAsync(id);
            if (deCuong != null)
            {
                _context.DeCuongs.Remove(deCuong);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool DeCuongExists(int id)
        {
            return _context.DeCuongs.Any(e => e.Id == id);
        }
    }
}
