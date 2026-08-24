using System;
using System.Collections.Generic;

namespace HTSV.Models;

public partial class ChiTietDonHang
{
    public int Id { get; set; }

    public int OrderId { get; set; }

    public int ProductId { get; set; }

    public decimal UnitPrice { get; set; }

    public int Quantity { get; set; }

    public virtual DonHang Order { get; set; } = null!;

    public virtual SanPham Product { get; set; } = null!;
}
