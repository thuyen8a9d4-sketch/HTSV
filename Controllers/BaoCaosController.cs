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
    public class BaoCaosController : Controller
    {
        private readonly QuanLyHocTapContext _context;

        public BaoCaosController(QuanLyHocTapContext context)
        {
            _context = context;
        }

        // GET: BaoCaos
        public async Task<IActionResult> Index()
        {
            var quanLyHocTapContext = _context.BaoCaos.Include(b => b.Comment).Include(b => b.Confession).Include(b => b.ReporterUser);
            return View(await quanLyHocTapContext.ToListAsync());
        }

        // GET: BaoCaos/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var baoCao = await _context.BaoCaos
                .Include(b => b.Comment)
                .Include(b => b.Confession)
                .Include(b => b.ReporterUser)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (baoCao == null)
            {
                return NotFound();
            }

            return View(baoCao);
        }

        // GET: BaoCaos/Create
        public IActionResult Create()
        {
            ViewData["CommentId"] = new SelectList(_context.BinhLuans, "Id", "Id");
            ViewData["ConfessionId"] = new SelectList(_context.BaiConfessions, "Id", "Id");
            ViewData["ReporterUserId"] = new SelectList(_context.NguoiDungs, "Id", "Id");
            return View();
        }

        // POST: BaoCaos/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,ConfessionId,CommentId,ReporterUserId,Reason,Status,CreatedAt")] BaoCao baoCao)
        {
            ModelState.Remove(nameof(BaoCao.Comment));
            ModelState.Remove(nameof(BaoCao.Confession));
            ModelState.Remove(nameof(BaoCao.ReporterUser));
            if (ModelState.IsValid)
            {
                _context.Add(baoCao);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["CommentId"] = new SelectList(_context.BinhLuans, "Id", "Id", baoCao.CommentId);
            ViewData["ConfessionId"] = new SelectList(_context.BaiConfessions, "Id", "Id", baoCao.ConfessionId);
            ViewData["ReporterUserId"] = new SelectList(_context.NguoiDungs, "Id", "Id", baoCao.ReporterUserId);
            return View(baoCao);
        }

        // GET: BaoCaos/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var baoCao = await _context.BaoCaos.FindAsync(id);
            if (baoCao == null)
            {
                return NotFound();
            }
            ViewData["CommentId"] = new SelectList(_context.BinhLuans, "Id", "Id", baoCao.CommentId);
            ViewData["ConfessionId"] = new SelectList(_context.BaiConfessions, "Id", "Id", baoCao.ConfessionId);
            ViewData["ReporterUserId"] = new SelectList(_context.NguoiDungs, "Id", "Id", baoCao.ReporterUserId);
            return View(baoCao);
        }

        // POST: BaoCaos/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,ConfessionId,CommentId,ReporterUserId,Reason,Status,CreatedAt")] BaoCao baoCao)
        {
            if (id != baoCao.Id)
            {
                return NotFound();
            }

            ModelState.Remove(nameof(BaoCao.Comment));
            ModelState.Remove(nameof(BaoCao.Confession));
            ModelState.Remove(nameof(BaoCao.ReporterUser));
            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(baoCao);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!BaoCaoExists(baoCao.Id))
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
            ViewData["CommentId"] = new SelectList(_context.BinhLuans, "Id", "Id", baoCao.CommentId);
            ViewData["ConfessionId"] = new SelectList(_context.BaiConfessions, "Id", "Id", baoCao.ConfessionId);
            ViewData["ReporterUserId"] = new SelectList(_context.NguoiDungs, "Id", "Id", baoCao.ReporterUserId);
            return View(baoCao);
        }

        // GET: BaoCaos/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var baoCao = await _context.BaoCaos
                .Include(b => b.Comment)
                .Include(b => b.Confession)
                .Include(b => b.ReporterUser)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (baoCao == null)
            {
                return NotFound();
            }

            return View(baoCao);
        }

        // POST: BaoCaos/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var baoCao = await _context.BaoCaos.FindAsync(id);
            if (baoCao != null)
            {
                _context.BaoCaos.Remove(baoCao);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool BaoCaoExists(int id)
        {
            return _context.BaoCaos.Any(e => e.Id == id);
        }
    }
}
