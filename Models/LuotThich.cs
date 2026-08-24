using System;
using System.Collections.Generic;

namespace HTSV.Models;

public partial class LuotThich
{
    public int Id { get; set; }

    public int ConfessionId { get; set; }

    public int UserId { get; set; }

    public string Type { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public virtual BaiConfession Confession { get; set; } = null!;

    public virtual NguoiDung User { get; set; } = null!;
}
