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
    public class BaiConfessionsController : Controller
    {
        private readonly QuanLyHocTapContext _context;

        public BaiConfessionsController(QuanLyHocTapContext context)
        {
            _context = context;
        }

        // GET: BaiConfessions
        public async Task<IActionResult> Index()
        {
            var quanLyHocTapContext = _context.BaiConfessions.Include(b => b.AuthorUser).Include(b => b.Category);
            return View(await quanLyHocTapContext.ToListAsync());
        }

        // GET: BaiConfessions/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var baiConfession = await _context.BaiConfessions
                .Include(b => b.AuthorUser)
                .Include(b => b.Category)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (baiConfession == null)
            {
                return NotFound();
            }

            return View(baiConfession);
        }

        // GET: BaiConfessions/Create
        public IActionResult Create()
        {
            ViewData["AuthorUserId"] = new SelectList(_context.NguoiDungs, "Id", "Id");
            ViewData["CategoryId"] = new SelectList(_context.DanhMucConfessions, "Id", "Id");
            return View();
        }

        // POST: BaiConfessions/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,AuthorUserId,CategoryId,Content,IsAnonymous,Status,RejectReason,CreatedAt,ApprovedAt,ApprovedByUserId")] BaiConfession baiConfession)
        {
            if (ModelState.IsValid)
            {
                _context.Add(baiConfession);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["AuthorUserId"] = new SelectList(_context.NguoiDungs, "Id", "Id", baiConfession.AuthorUserId);
            ViewData["CategoryId"] = new SelectList(_context.DanhMucConfessions, "Id", "Id", baiConfession.CategoryId);
            return View(baiConfession);
        }

        // GET: BaiConfessions/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var baiConfession = await _context.BaiConfessions.FindAsync(id);
            if (baiConfession == null)
            {
                return NotFound();
            }
            ViewData["AuthorUserId"] = new SelectList(_context.NguoiDungs, "Id", "Id", baiConfession.AuthorUserId);
            ViewData["CategoryId"] = new SelectList(_context.DanhMucConfessions, "Id", "Id", baiConfession.CategoryId);
            return View(baiConfession);
        }

        // POST: BaiConfessions/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,AuthorUserId,CategoryId,Content,IsAnonymous,Status,RejectReason,CreatedAt,ApprovedAt,ApprovedByUserId")] BaiConfession baiConfession)
        {
            if (id != baiConfession.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(baiConfession);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!BaiConfessionExists(baiConfession.Id))
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
            ViewData["AuthorUserId"] = new SelectList(_context.NguoiDungs, "Id", "Id", baiConfession.AuthorUserId);
            ViewData["CategoryId"] = new SelectList(_context.DanhMucConfessions, "Id", "Id", baiConfession.CategoryId);
            return View(baiConfession);
        }

        // GET: BaiConfessions/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var baiConfession = await _context.BaiConfessions
                .Include(b => b.AuthorUser)
                .Include(b => b.Category)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (baiConfession == null)
            {
                return NotFound();
            }

            return View(baiConfession);
        }

        // POST: BaiConfessions/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var baiConfession = await _context.BaiConfessions.FindAsync(id);
            if (baiConfession != null)
            {
                _context.BaiConfessions.Remove(baiConfession);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool BaiConfessionExists(int id)
        {
            return _context.BaiConfessions.Any(e => e.Id == id);
        }
    }
}
