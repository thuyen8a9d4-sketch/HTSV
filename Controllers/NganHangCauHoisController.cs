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
    public class NganHangCauHoisController : Controller
    {
        private readonly QuanLyHocTapContext _context;

        public NganHangCauHoisController(QuanLyHocTapContext context)
        {
            _context = context;
        }

        // GET: NganHangCauHois
        public async Task<IActionResult> Index()
        {
            var quanLyHocTapContext = _context.NganHangCauHois.Include(n => n.CreatedByUser).Include(n => n.ReviewedByUser).Include(n => n.SourceKnowledgeChunk).Include(n => n.Subject).Include(n => n.SubjectChapter);
            return View(await quanLyHocTapContext.ToListAsync());
        }

        // GET: NganHangCauHois/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var nganHangCauHoi = await _context.NganHangCauHois
                .Include(n => n.CreatedByUser)
                .Include(n => n.ReviewedByUser)
                .Include(n => n.SourceKnowledgeChunk)
                .Include(n => n.Subject)
                .Include(n => n.SubjectChapter)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (nganHangCauHoi == null)
            {
                return NotFound();
            }

            return View(nganHangCauHoi);
        }

        // GET: NganHangCauHois/Create
        public IActionResult Create()
        {
            ViewData["CreatedByUserId"] = new SelectList(_context.NguoiDungs, "Id", "Id");
            ViewData["ReviewedByUserId"] = new SelectList(_context.NguoiDungs, "Id", "Id");
            ViewData["SourceKnowledgeChunkId"] = new SelectList(_context.DoanKienThucs, "Id", "Id");
            ViewData["SubjectId"] = new SelectList(_context.MonHocs, "Id", "Id");
            ViewData["SubjectChapterId"] = new SelectList(_context.ChuongMonHocs, "Id", "Id");
            return View();
        }

        // POST: NganHangCauHois/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,SubjectId,SubjectChapterId,QuestionType,Difficulty,Content,Explanation,SourceKnowledgeChunkId,Status,CreatedByUserId,ReviewedByUserId,CreatedAt")] NganHangCauHoi nganHangCauHoi)
        {
            if (ModelState.IsValid)
            {
                _context.Add(nganHangCauHoi);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["CreatedByUserId"] = new SelectList(_context.NguoiDungs, "Id", "Id", nganHangCauHoi.CreatedByUserId);
            ViewData["ReviewedByUserId"] = new SelectList(_context.NguoiDungs, "Id", "Id", nganHangCauHoi.ReviewedByUserId);
            ViewData["SourceKnowledgeChunkId"] = new SelectList(_context.DoanKienThucs, "Id", "Id", nganHangCauHoi.SourceKnowledgeChunkId);
            ViewData["SubjectId"] = new SelectList(_context.MonHocs, "Id", "Id", nganHangCauHoi.SubjectId);
            ViewData["SubjectChapterId"] = new SelectList(_context.ChuongMonHocs, "Id", "Id", nganHangCauHoi.SubjectChapterId);
            return View(nganHangCauHoi);
        }

        // GET: NganHangCauHois/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var nganHangCauHoi = await _context.NganHangCauHois.FindAsync(id);
            if (nganHangCauHoi == null)
            {
                return NotFound();
            }
            ViewData["CreatedByUserId"] = new SelectList(_context.NguoiDungs, "Id", "Id", nganHangCauHoi.CreatedByUserId);
            ViewData["ReviewedByUserId"] = new SelectList(_context.NguoiDungs, "Id", "Id", nganHangCauHoi.ReviewedByUserId);
            ViewData["SourceKnowledgeChunkId"] = new SelectList(_context.DoanKienThucs, "Id", "Id", nganHangCauHoi.SourceKnowledgeChunkId);
            ViewData["SubjectId"] = new SelectList(_context.MonHocs, "Id", "Id", nganHangCauHoi.SubjectId);
            ViewData["SubjectChapterId"] = new SelectList(_context.ChuongMonHocs, "Id", "Id", nganHangCauHoi.SubjectChapterId);
            return View(nganHangCauHoi);
        }

        // POST: NganHangCauHois/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,SubjectId,SubjectChapterId,QuestionType,Difficulty,Content,Explanation,SourceKnowledgeChunkId,Status,CreatedByUserId,ReviewedByUserId,CreatedAt")] NganHangCauHoi nganHangCauHoi)
        {
            if (id != nganHangCauHoi.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(nganHangCauHoi);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!NganHangCauHoiExists(nganHangCauHoi.Id))
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
            ViewData["CreatedByUserId"] = new SelectList(_context.NguoiDungs, "Id", "Id", nganHangCauHoi.CreatedByUserId);
            ViewData["ReviewedByUserId"] = new SelectList(_context.NguoiDungs, "Id", "Id", nganHangCauHoi.ReviewedByUserId);
            ViewData["SourceKnowledgeChunkId"] = new SelectList(_context.DoanKienThucs, "Id", "Id", nganHangCauHoi.SourceKnowledgeChunkId);
            ViewData["SubjectId"] = new SelectList(_context.MonHocs, "Id", "Id", nganHangCauHoi.SubjectId);
            ViewData["SubjectChapterId"] = new SelectList(_context.ChuongMonHocs, "Id", "Id", nganHangCauHoi.SubjectChapterId);
            return View(nganHangCauHoi);
        }

        // GET: NganHangCauHois/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var nganHangCauHoi = await _context.NganHangCauHois
                .Include(n => n.CreatedByUser)
                .Include(n => n.ReviewedByUser)
                .Include(n => n.SourceKnowledgeChunk)
                .Include(n => n.Subject)
                .Include(n => n.SubjectChapter)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (nganHangCauHoi == null)
            {
                return NotFound();
            }

            return View(nganHangCauHoi);
        }

        // POST: NganHangCauHois/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var nganHangCauHoi = await _context.NganHangCauHois.FindAsync(id);
            if (nganHangCauHoi != null)
            {
                _context.NganHangCauHois.Remove(nganHangCauHoi);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool NganHangCauHoiExists(int id)
        {
            return _context.NganHangCauHois.Any(e => e.Id == id);
        }
    }
}
