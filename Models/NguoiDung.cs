using System;
using System.Collections.Generic;

namespace HTSV.Models;

public partial class NguoiDung
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public string FullName { get; set; } = null!;

    public bool IsActive { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual ICollection<BaiConfession> BaiConfessions { get; set; } = new List<BaiConfession>();

    public virtual ICollection<BaoCao> BaoCaos { get; set; } = new List<BaoCao>();

    public virtual ICollection<BinhLuan> BinhLuans { get; set; } = new List<BinhLuan>();

    public virtual ICollection<DeThi> DeThis { get; set; } = new List<DeThi>();

    public virtual ICollection<DonHang> DonHangs { get; set; } = new List<DonHang>();

    public virtual GiangVien? GiangVien { get; set; }

    public virtual ICollection<LuotLamBai> LuotLamBais { get; set; } = new List<LuotLamBai>();

    public virtual ICollection<LuotThich> LuotThiches { get; set; } = new List<LuotThich>();

    public virtual ICollection<NganHangCauHoi> NganHangCauHoiCreatedByUsers { get; set; } = new List<NganHangCauHoi>();

    public virtual ICollection<NganHangCauHoi> NganHangCauHoiReviewedByUsers { get; set; } = new List<NganHangCauHoi>();

    public virtual ICollection<NhatKyKiemDuyet> NhatKyKiemDuyets { get; set; } = new List<NhatKyKiemDuyet>();

    public virtual ICollection<QuyenTruyCapTaiLieu> QuyenTruyCapTaiLieus { get; set; } = new List<QuyenTruyCapTaiLieu>();

    public virtual SinhVien? SinhVien { get; set; }

    public virtual ICollection<TaiLieu> TaiLieus { get; set; } = new List<TaiLieu>();

    public virtual ICollection<VaiTro> Roles { get; set; } = new List<VaiTro>();
}
