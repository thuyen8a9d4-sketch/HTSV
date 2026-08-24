using System;
using System.Collections.Generic;

namespace HTSV.Models;

public partial class BaoCao
{
    public int Id { get; set; }

    public int? ConfessionId { get; set; }

    public int? CommentId { get; set; }

    public int ReporterUserId { get; set; }

    public string Reason { get; set; } = null!;

    public string Status { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public virtual BinhLuan? Comment { get; set; }

    public virtual BaiConfession? Confession { get; set; }

    public virtual NguoiDung ReporterUser { get; set; } = null!;
}
