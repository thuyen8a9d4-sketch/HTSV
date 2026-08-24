using System;
using System.Collections.Generic;

namespace HTSV.Models;

public partial class DeThi
{
    public int Id { get; set; }

    public int CreatedByUserId { get; set; }

    public int SubjectId { get; set; }

    public string ScopeType { get; set; } = null!;

    public string? ScopeConfig { get; set; }

    public int TotalQuestions { get; set; }

    public int? DurationMinutes { get; set; }

    public int TheoryCount { get; set; }

    public int ApplicationCount { get; set; }

    public int PracticalCount { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual ICollection<CauHoiDeThi> CauHoiDeThis { get; set; } = new List<CauHoiDeThi>();

    public virtual NguoiDung CreatedByUser { get; set; } = null!;

    public virtual ICollection<LuotLamBai> LuotLamBais { get; set; } = new List<LuotLamBai>();

    public virtual MonHoc Subject { get; set; } = null!;
}
