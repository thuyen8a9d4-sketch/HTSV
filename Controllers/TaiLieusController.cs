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
    public class TaiLieusController : Controller
    {
        private readonly QuanLyHocTapContext _context;

        public TaiLieusController(QuanLyHocTapContext context)
        {
            _context = context;
        }

        // GET: TaiLieus
        public async Task<IActionResult> Index()
        {
            var quanLyHocTapContext = _context.TaiLieus.Include(t => t.Course).Include(t => t.OwnerUser);
            return View(await quanLyHocTapContext.ToListAsync());
        }

        // GET: TaiLieus/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var taiLieu = await _context.TaiLieus
                .Include(t => t.Course)
                .Include(t => t.OwnerUser)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (taiLieu == null)
            {
                return NotFound();
            }

            return View(taiLieu);
        }

        // GET: TaiLieus/Create
        [Authorize(Roles = "ADMIN,LECTURER")]
        public IActionResult Create()
        {
            ViewData["CourseId"] = new SelectList(_context.LopHocPhans, "Id", "Id");
            ViewData["OwnerUserId"] = new SelectList(_context.NguoiDungs, "Id", "Id");
            return View();
        }

        // POST: TaiLieus/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "ADMIN,LECTURER")]
        public async Task<IActionResult> Create([Bind("Id,CourseId,OwnerUserId,Type,Title,Description,IsFree,IsSellable,Price,Status,CreatedAt")] TaiLieu taiLieu)
        {
            if (ModelState.IsValid)
            {
                _context.Add(taiLieu);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["CourseId"] = new SelectList(_context.LopHocPhans, "Id", "Id", taiLieu.CourseId);
            ViewData["OwnerUserId"] = new SelectList(_context.NguoiDungs, "Id", "Id", taiLieu.OwnerUserId);
            return View(taiLieu);
        }

        // GET: TaiLieus/Edit/5
        [Authorize(Roles = "ADMIN,LECTURER")]
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var taiLieu = await _context.TaiLieus.FindAsync(id);
            if (taiLieu == null)
            {
                return NotFound();
            }
            ViewData["CourseId"] = new SelectList(_context.LopHocPhans, "Id", "Id", taiLieu.CourseId);
            ViewData["OwnerUserId"] = new SelectList(_context.NguoiDungs, "Id", "Id", taiLieu.OwnerUserId);
            return View(taiLieu);
        }

        // POST: TaiLieus/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "ADMIN,LECTURER")]
        public async Task<IActionResult> Edit(int id, [Bind("Id,CourseId,OwnerUserId,Type,Title,Description,IsFree,IsSellable,Price,Status,CreatedAt")] TaiLieu taiLieu)
        {
            if (id != taiLieu.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(taiLieu);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!TaiLieuExists(taiLieu.Id))
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
            ViewData["CourseId"] = new SelectList(_context.LopHocPhans, "Id", "Id", taiLieu.CourseId);
            ViewData["OwnerUserId"] = new SelectList(_context.NguoiDungs, "Id", "Id", taiLieu.OwnerUserId);
            return View(taiLieu);
        }

        // GET: TaiLieus/Delete/5
        [Authorize(Roles = "ADMIN,LECTURER")]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var taiLieu = await _context.TaiLieus
                .Include(t => t.Course)
                .Include(t => t.OwnerUser)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (taiLieu == null)
            {
                return NotFound();
            }

            return View(taiLieu);
        }

        // POST: TaiLieus/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "ADMIN,LECTURER")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var taiLieu = await _context.TaiLieus.FindAsync(id);
            if (taiLieu != null)
            {
                _context.TaiLieus.Remove(taiLieu);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool TaiLieuExists(int id)
        {
            return _context.TaiLieus.Any(e => e.Id == id);
        }
    }
}
