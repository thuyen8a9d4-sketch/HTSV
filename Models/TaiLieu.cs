using System;
using System.Collections.Generic;

namespace HTSV.Models;

public partial class TaiLieu
{
    public int Id { get; set; }

    public int CourseId { get; set; }

    public int OwnerUserId { get; set; }

    public string Type { get; set; } = null!;

    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public bool IsFree { get; set; }

    public bool IsSellable { get; set; }

    public decimal? Price { get; set; }

    public string Status { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public virtual LopHocPhan Course { get; set; } = null!;

    public virtual NguoiDung OwnerUser { get; set; } = null!;

    public virtual ICollection<PhienBanTaiLieu> PhienBanTaiLieus { get; set; } = new List<PhienBanTaiLieu>();

    public virtual ICollection<QuyenTruyCapTaiLieu> QuyenTruyCapTaiLieus { get; set; } = new List<QuyenTruyCapTaiLieu>();

    public virtual SanPham? SanPham { get; set; }

    public virtual ICollection<TaiLieuKienThuc> TaiLieuKienThucs { get; set; } = new List<TaiLieuKienThuc>();
}
