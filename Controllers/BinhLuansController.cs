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
    public class BinhLuansController : Controller
    {
        private readonly QuanLyHocTapContext _context;

        public BinhLuansController(QuanLyHocTapContext context)
        {
            _context = context;
        }

        // GET: BinhLuans
        public async Task<IActionResult> Index()
        {
            var quanLyHocTapContext = _context.BinhLuans.Include(b => b.AuthorUser).Include(b => b.Confession);
            return View(await quanLyHocTapContext.ToListAsync());
        }

        // GET: BinhLuans/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var binhLuan = await _context.BinhLuans
                .Include(b => b.AuthorUser)
                .Include(b => b.Confession)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (binhLuan == null)
            {
                return NotFound();
            }

            return View(binhLuan);
        }

        // GET: BinhLuans/Create
        public IActionResult Create()
        {
            ViewData["AuthorUserId"] = new SelectList(_context.NguoiDungs, "Id", "Id");
            ViewData["ConfessionId"] = new SelectList(_context.BaiConfessions, "Id", "Id");
            return View();
        }

        // POST: BinhLuans/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,ConfessionId,AuthorUserId,Content,IsAnonymous,CreatedAt")] BinhLuan binhLuan)
        {
            if (ModelState.IsValid)
            {
                _context.Add(binhLuan);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["AuthorUserId"] = new SelectList(_context.NguoiDungs, "Id", "Id", binhLuan.AuthorUserId);
            ViewData["ConfessionId"] = new SelectList(_context.BaiConfessions, "Id", "Id", binhLuan.ConfessionId);
            return View(binhLuan);
        }

        // GET: BinhLuans/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var binhLuan = await _context.BinhLuans.FindAsync(id);
            if (binhLuan == null)
            {
                return NotFound();
            }
            ViewData["AuthorUserId"] = new SelectList(_context.NguoiDungs, "Id", "Id", binhLuan.AuthorUserId);
            ViewData["ConfessionId"] = new SelectList(_context.BaiConfessions, "Id", "Id", binhLuan.ConfessionId);
            return View(binhLuan);
        }

        // POST: BinhLuans/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,ConfessionId,AuthorUserId,Content,IsAnonymous,CreatedAt")] BinhLuan binhLuan)
        {
            if (id != binhLuan.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(binhLuan);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!BinhLuanExists(binhLuan.Id))
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
            ViewData["AuthorUserId"] = new SelectList(_context.NguoiDungs, "Id", "Id", binhLuan.AuthorUserId);
            ViewData["ConfessionId"] = new SelectList(_context.BaiConfessions, "Id", "Id", binhLuan.ConfessionId);
            return View(binhLuan);
        }

        // GET: BinhLuans/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var binhLuan = await _context.BinhLuans
                .Include(b => b.AuthorUser)
                .Include(b => b.Confession)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (binhLuan == null)
            {
                return NotFound();
            }

            return View(binhLuan);
        }

        // POST: BinhLuans/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var binhLuan = await _context.BinhLuans.FindAsync(id);
            if (binhLuan != null)
            {
                _context.BinhLuans.Remove(binhLuan);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool BinhLuanExists(int id)
        {
            return _context.BinhLuans.Any(e => e.Id == id);
        }
    }
}
