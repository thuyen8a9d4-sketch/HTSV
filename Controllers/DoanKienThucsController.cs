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
    public class DoanKienThucsController : Controller
    {
        private readonly QuanLyHocTapContext _context;

        public DoanKienThucsController(QuanLyHocTapContext context)
        {
            _context = context;
        }

        // GET: DoanKienThucs
        public async Task<IActionResult> Index()
        {
            var quanLyHocTapContext = _context.DoanKienThucs.Include(d => d.KnowledgeDocument).Include(d => d.SubjectChapter);
            return View(await quanLyHocTapContext.ToListAsync());
        }

        // GET: DoanKienThucs/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var doanKienThuc = await _context.DoanKienThucs
                .Include(d => d.KnowledgeDocument)
                .Include(d => d.SubjectChapter)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (doanKienThuc == null)
            {
                return NotFound();
            }

            return View(doanKienThuc);
        }

        // GET: DoanKienThucs/Create
        public IActionResult Create()
        {
            ViewData["KnowledgeDocumentId"] = new SelectList(_context.TaiLieuKienThucs, "Id", "Id");
            ViewData["SubjectChapterId"] = new SelectList(_context.ChuongMonHocs, "Id", "Id");
            return View();
        }

        // POST: DoanKienThucs/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,KnowledgeDocumentId,SubjectChapterId,ChunkIndex,Content,Embedding,SourceRef,CreatedAt")] DoanKienThuc doanKienThuc)
        {
            if (ModelState.IsValid)
            {
                _context.Add(doanKienThuc);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["KnowledgeDocumentId"] = new SelectList(_context.TaiLieuKienThucs, "Id", "Id", doanKienThuc.KnowledgeDocumentId);
            ViewData["SubjectChapterId"] = new SelectList(_context.ChuongMonHocs, "Id", "Id", doanKienThuc.SubjectChapterId);
            return View(doanKienThuc);
        }

        // GET: DoanKienThucs/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var doanKienThuc = await _context.DoanKienThucs.FindAsync(id);
            if (doanKienThuc == null)
            {
                return NotFound();
            }
            ViewData["KnowledgeDocumentId"] = new SelectList(_context.TaiLieuKienThucs, "Id", "Id", doanKienThuc.KnowledgeDocumentId);
            ViewData["SubjectChapterId"] = new SelectList(_context.ChuongMonHocs, "Id", "Id", doanKienThuc.SubjectChapterId);
            return View(doanKienThuc);
        }

        // POST: DoanKienThucs/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,KnowledgeDocumentId,SubjectChapterId,ChunkIndex,Content,Embedding,SourceRef,CreatedAt")] DoanKienThuc doanKienThuc)
        {
            if (id != doanKienThuc.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(doanKienThuc);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!DoanKienThucExists(doanKienThuc.Id))
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
            ViewData["KnowledgeDocumentId"] = new SelectList(_context.TaiLieuKienThucs, "Id", "Id", doanKienThuc.KnowledgeDocumentId);
            ViewData["SubjectChapterId"] = new SelectList(_context.ChuongMonHocs, "Id", "Id", doanKienThuc.SubjectChapterId);
            return View(doanKienThuc);
        }

        // GET: DoanKienThucs/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var doanKienThuc = await _context.DoanKienThucs
                .Include(d => d.KnowledgeDocument)
                .Include(d => d.SubjectChapter)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (doanKienThuc == null)
            {
                return NotFound();
            }

            return View(doanKienThuc);
        }

        // POST: DoanKienThucs/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var doanKienThuc = await _context.DoanKienThucs.FindAsync(id);
            if (doanKienThuc != null)
            {
                _context.DoanKienThucs.Remove(doanKienThuc);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool DoanKienThucExists(int id)
        {
            return _context.DoanKienThucs.Any(e => e.Id == id);
        }
    }
}
