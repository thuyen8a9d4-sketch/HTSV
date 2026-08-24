using System;
using System.Collections.Generic;

namespace HTSV.Models;

public partial class DeCuong
{
    public int Id { get; set; }

    public int SubjectId { get; set; }

    public string Title { get; set; } = null!;

    public string? Content { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual MonHoc Subject { get; set; } = null!;
}
