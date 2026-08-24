using System;

namespace HTSV.Models;

public partial class MaXacThuc
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public string Code { get; set; } = null!;

    public DateTime ExpiresAt { get; set; }

    public bool IsUsed { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual NguoiDung User { get; set; } = null!;
}
