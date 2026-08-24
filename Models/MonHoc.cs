using System;
using System.Collections.Generic;

namespace HTSV.Models;

public partial class MonHoc
{
    public int Id { get; set; }

    public string Code { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public int? Credits { get; set; }

    public virtual ICollection<ChuongMonHoc> ChuongMonHocs { get; set; } = new List<ChuongMonHoc>();

    public virtual ICollection<DeCuong> DeCuongs { get; set; } = new List<DeCuong>();

    public virtual ICollection<DeThi> DeThis { get; set; } = new List<DeThi>();

    public virtual ICollection<LopHocPhan> LopHocPhans { get; set; } = new List<LopHocPhan>();

    public virtual ICollection<NganHangCauHoi> NganHangCauHois { get; set; } = new List<NganHangCauHoi>();

    public virtual ICollection<TaiLieuKienThuc> TaiLieuKienThucs { get; set; } = new List<TaiLieuKienThuc>();
}
