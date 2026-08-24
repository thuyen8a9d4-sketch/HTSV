using System;
using System.Collections.Generic;

namespace HTSV.Models;

public partial class NhatKyKiemDuyet
{
    public int Id { get; set; }

    public int ConfessionId { get; set; }

    public int ModeratorUserId { get; set; }

    public string Action { get; set; } = null!;

    public string? OldStatus { get; set; }

    public string? NewStatus { get; set; }

    public string? Note { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual BaiConfession Confession { get; set; } = null!;

    public virtual NguoiDung ModeratorUser { get; set; } = null!;
}
