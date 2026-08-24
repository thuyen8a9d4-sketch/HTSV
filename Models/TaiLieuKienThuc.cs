using System;
using System.Collections.Generic;

namespace HTSV.Models;

public partial class TaiLieuKienThuc
{
    public int Id { get; set; }

    public int? MaterialId { get; set; }

    public int SubjectId { get; set; }

    public string Title { get; set; } = null!;

    public string ProcessedStatus { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public virtual ICollection<DoanKienThuc> DoanKienThucs { get; set; } = new List<DoanKienThuc>();

    public virtual TaiLieu? Material { get; set; }

    public virtual MonHoc Subject { get; set; } = null!;
}
