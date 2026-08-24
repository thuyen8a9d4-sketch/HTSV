using System;
using System.Collections.Generic;

namespace HTSV.Models;

public partial class DonHang
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public string Status { get; set; } = null!;

    public decimal TotalAmount { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? PaidAt { get; set; }

    public virtual ICollection<ChiTietDonHang> ChiTietDonHangs { get; set; } = new List<ChiTietDonHang>();

    public virtual ICollection<QuyenTruyCapTaiLieu> QuyenTruyCapTaiLieus { get; set; } = new List<QuyenTruyCapTaiLieu>();

    public virtual ICollection<ThanhToan> ThanhToans { get; set; } = new List<ThanhToan>();

    public virtual NguoiDung User { get; set; } = null!;
}
