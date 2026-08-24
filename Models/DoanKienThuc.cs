using System;
using System.Collections.Generic;

namespace HTSV.Models;

public partial class DoanKienThuc
{
    public int Id { get; set; }

    public int KnowledgeDocumentId { get; set; }

    public int? SubjectChapterId { get; set; }

    public int ChunkIndex { get; set; }

    public string Content { get; set; } = null!;

    public byte[]? Embedding { get; set; }

    public string? SourceRef { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual TaiLieuKienThuc KnowledgeDocument { get; set; } = null!;

    public virtual ICollection<NganHangCauHoi> NganHangCauHois { get; set; } = new List<NganHangCauHoi>();

    public virtual ChuongMonHoc? SubjectChapter { get; set; }
}
