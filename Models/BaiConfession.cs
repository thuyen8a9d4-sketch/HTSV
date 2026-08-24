using System;
using System.Collections.Generic;

namespace HTSV.Models;

public partial class BaiConfession
{
    public int Id { get; set; }

    public int AuthorUserId { get; set; }

    public int? CategoryId { get; set; }

    public string Content { get; set; } = null!;

    public bool IsAnonymous { get; set; }

    public string Status { get; set; } = null!;

    public string? RejectReason { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? ApprovedAt { get; set; }

    public int? ApprovedByUserId { get; set; }

    public virtual NguoiDung AuthorUser { get; set; } = null!;

    public virtual ICollection<BaoCao> BaoCaos { get; set; } = new List<BaoCao>();

    public virtual ICollection<BinhLuan> BinhLuans { get; set; } = new List<BinhLuan>();

    public virtual DanhMucConfession? Category { get; set; }

    public virtual ICollection<LuotThich> LuotThiches { get; set; } = new List<LuotThich>();

    public virtual ICollection<NhatKyKiemDuyet> NhatKyKiemDuyets { get; set; } = new List<NhatKyKiemDuyet>();
}
