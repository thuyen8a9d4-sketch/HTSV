using System;
using System.Collections.Generic;

namespace HTSV.Models;

public partial class QuyenTruyCapTaiLieu
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public int MaterialId { get; set; }

    public string GrantedVia { get; set; } = null!;

    public int? OrderId { get; set; }

    public DateTime GrantedAt { get; set; }

    public DateTime? ExpiresAt { get; set; }

    public virtual TaiLieu Material { get; set; } = null!;

    public virtual DonHang? Order { get; set; }

    public virtual NguoiDung User { get; set; } = null!;
}
