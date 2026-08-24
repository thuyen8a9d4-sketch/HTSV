using System;
using System.Collections.Generic;

namespace HTSV.Models;

public partial class BinhLuan
{
    public int Id { get; set; }

    public int ConfessionId { get; set; }

    public int AuthorUserId { get; set; }

    public string Content { get; set; } = null!;

    public bool IsAnonymous { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual NguoiDung AuthorUser { get; set; } = null!;

    public virtual ICollection<BaoCao> BaoCaos { get; set; } = new List<BaoCao>();

    public virtual BaiConfession Confession { get; set; } = null!;
}
