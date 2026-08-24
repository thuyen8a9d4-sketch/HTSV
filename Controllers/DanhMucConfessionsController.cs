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
    public class DanhMucConfessionsController : Controller
    {
        private readonly QuanLyHocTapContext _context;

        public DanhMucConfessionsController(QuanLyHocTapContext context)
        {
            _context = context;
        }

        // GET: DanhMucConfessions
        public async Task<IActionResult> Index()
        {
            return View(await _context.DanhMucConfessions.ToListAsync());
        }

        // GET: DanhMucConfessions/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var danhMucConfession = await _context.DanhMucConfessions
                .FirstOrDefaultAsync(m => m.Id == id);
            if (danhMucConfession == null)
            {
                return NotFound();
            }

            return View(danhMucConfession);
        }

        // GET: DanhMucConfessions/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: DanhMucConfessions/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,Slug")] DanhMucConfession danhMucConfession)
        {
            if (ModelState.IsValid)
            {
                _context.Add(danhMucConfession);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(danhMucConfession);
        }

        // GET: DanhMucConfessions/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var danhMucConfession = await _context.DanhMucConfessions.FindAsync(id);
            if (danhMucConfession == null)
            {
                return NotFound();
            }
            return View(danhMucConfession);
        }

        // POST: DanhMucConfessions/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Slug")] DanhMucConfession danhMucConfession)
        {
            if (id != danhMucConfession.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(danhMucConfession);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!DanhMucConfessionExists(danhMucConfession.Id))
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
            return View(danhMucConfession);
        }

        // GET: DanhMucConfessions/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var danhMucConfession = await _context.DanhMucConfessions
                .FirstOrDefaultAsync(m => m.Id == id);
            if (danhMucConfession == null)
            {
                return NotFound();
            }

            return View(danhMucConfession);
        }

        // POST: DanhMucConfessions/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var danhMucConfession = await _context.DanhMucConfessions.FindAsync(id);
            if (danhMucConfession != null)
            {
                _context.DanhMucConfessions.Remove(danhMucConfession);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool DanhMucConfessionExists(int id)
        {
            return _context.DanhMucConfessions.Any(e => e.Id == id);
        }
    }
}
