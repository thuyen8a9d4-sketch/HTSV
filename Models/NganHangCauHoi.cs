using System;
using System.Collections.Generic;

namespace HTSV.Models;

public partial class NganHangCauHoi
{
    public int Id { get; set; }

    public int SubjectId { get; set; }

    public int? SubjectChapterId { get; set; }

    public string QuestionType { get; set; } = null!;

    public string Difficulty { get; set; } = null!;

    public string Content { get; set; } = null!;

    public string? Explanation { get; set; }

    public int? SourceKnowledgeChunkId { get; set; }

    public string Status { get; set; } = null!;

    public int? CreatedByUserId { get; set; }

    public int? ReviewedByUserId { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual ICollection<CauHoiDeThi> CauHoiDeThis { get; set; } = new List<CauHoiDeThi>();

    public virtual NguoiDung? CreatedByUser { get; set; }

    public virtual DapAn? DapAn { get; set; }

    public virtual NguoiDung? ReviewedByUser { get; set; }

    public virtual DoanKienThuc? SourceKnowledgeChunk { get; set; }

    public virtual MonHoc Subject { get; set; } = null!;

    public virtual ChuongMonHoc? SubjectChapter { get; set; }
}
