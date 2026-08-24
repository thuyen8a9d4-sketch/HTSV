using System;
using System.Collections.Generic;

namespace HTSV.Models;

public partial class SanPham
{
    public int Id { get; set; }

    public int MaterialId { get; set; }

    public string Name { get; set; } = null!;

    public decimal Price { get; set; }

    public bool IsActive { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual ICollection<ChiTietDonHang> ChiTietDonHangs { get; set; } = new List<ChiTietDonHang>();

    public virtual TaiLieu Material { get; set; } = null!;
}
