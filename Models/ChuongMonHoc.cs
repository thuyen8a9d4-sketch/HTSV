using System;
using System.Collections.Generic;

namespace HTSV.Models;

public partial class ChuongMonHoc
{
    public int Id { get; set; }

    public int SubjectId { get; set; }

    public int ChapterNo { get; set; }

    public string Title { get; set; } = null!;

    public decimal? WeightPercent { get; set; }

    public virtual ICollection<DoanKienThuc> DoanKienThucs { get; set; } = new List<DoanKienThuc>();

    public virtual ICollection<NganHangCauHoi> NganHangCauHois { get; set; } = new List<NganHangCauHoi>();

    public virtual MonHoc Subject { get; set; } = null!;
}
