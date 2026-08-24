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
    public class QuyenTruyCapTaiLieusController : Controller
    {
        private readonly QuanLyHocTapContext _context;

        public QuyenTruyCapTaiLieusController(QuanLyHocTapContext context)
        {
            _context = context;
        }

        // GET: QuyenTruyCapTaiLieus
        public async Task<IActionResult> Index()
        {
            var quanLyHocTapContext = _context.QuyenTruyCapTaiLieus.Include(q => q.Material).Include(q => q.Order).Include(q => q.User);
            return View(await quanLyHocTapContext.ToListAsync());
        }

        // GET: QuyenTruyCapTaiLieus/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var quyenTruyCapTaiLieu = await _context.QuyenTruyCapTaiLieus
                .Include(q => q.Material)
                .Include(q => q.Order)
                .Include(q => q.User)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (quyenTruyCapTaiLieu == null)
            {
                return NotFound();
            }

            return View(quyenTruyCapTaiLieu);
        }

        // GET: QuyenTruyCapTaiLieus/Create
        public IActionResult Create()
        {
            ViewData["MaterialId"] = new SelectList(_context.TaiLieus, "Id", "Id");
            ViewData["OrderId"] = new SelectList(_context.DonHangs, "Id", "Id");
            ViewData["UserId"] = new SelectList(_context.NguoiDungs, "Id", "Id");
            return View();
        }

        // POST: QuyenTruyCapTaiLieus/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,UserId,MaterialId,GrantedVia,OrderId,GrantedAt,ExpiresAt")] QuyenTruyCapTaiLieu quyenTruyCapTaiLieu)
        {
            if (ModelState.IsValid)
            {
                _context.Add(quyenTruyCapTaiLieu);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["MaterialId"] = new SelectList(_context.TaiLieus, "Id", "Id", quyenTruyCapTaiLieu.MaterialId);
            ViewData["OrderId"] = new SelectList(_context.DonHangs, "Id", "Id", quyenTruyCapTaiLieu.OrderId);
            ViewData["UserId"] = new SelectList(_context.NguoiDungs, "Id", "Id", quyenTruyCapTaiLieu.UserId);
            return View(quyenTruyCapTaiLieu);
        }

        // GET: QuyenTruyCapTaiLieus/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var quyenTruyCapTaiLieu = await _context.QuyenTruyCapTaiLieus.FindAsync(id);
            if (quyenTruyCapTaiLieu == null)
            {
                return NotFound();
            }
            ViewData["MaterialId"] = new SelectList(_context.TaiLieus, "Id", "Id", quyenTruyCapTaiLieu.MaterialId);
            ViewData["OrderId"] = new SelectList(_context.DonHangs, "Id", "Id", quyenTruyCapTaiLieu.OrderId);
            ViewData["UserId"] = new SelectList(_context.NguoiDungs, "Id", "Id", quyenTruyCapTaiLieu.UserId);
            return View(quyenTruyCapTaiLieu);
        }

        // POST: QuyenTruyCapTaiLieus/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,UserId,MaterialId,GrantedVia,OrderId,GrantedAt,ExpiresAt")] QuyenTruyCapTaiLieu quyenTruyCapTaiLieu)
        {
            if (id != quyenTruyCapTaiLieu.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(quyenTruyCapTaiLieu);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!QuyenTruyCapTaiLieuExists(quyenTruyCapTaiLieu.Id))
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
            ViewData["MaterialId"] = new SelectList(_context.TaiLieus, "Id", "Id", quyenTruyCapTaiLieu.MaterialId);
            ViewData["OrderId"] = new SelectList(_context.DonHangs, "Id", "Id", quyenTruyCapTaiLieu.OrderId);
            ViewData["UserId"] = new SelectList(_context.NguoiDungs, "Id", "Id", quyenTruyCapTaiLieu.UserId);
            return View(quyenTruyCapTaiLieu);
        }

        // GET: QuyenTruyCapTaiLieus/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var quyenTruyCapTaiLieu = await _context.QuyenTruyCapTaiLieus
                .Include(q => q.Material)
                .Include(q => q.Order)
                .Include(q => q.User)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (quyenTruyCapTaiLieu == null)
            {
                return NotFound();
            }

            return View(quyenTruyCapTaiLieu);
        }

        // POST: QuyenTruyCapTaiLieus/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var quyenTruyCapTaiLieu = await _context.QuyenTruyCapTaiLieus.FindAsync(id);
            if (quyenTruyCapTaiLieu != null)
            {
                _context.QuyenTruyCapTaiLieus.Remove(quyenTruyCapTaiLieu);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool QuyenTruyCapTaiLieuExists(int id)
        {
            return _context.QuyenTruyCapTaiLieus.Any(e => e.Id == id);
        }
    }
}
