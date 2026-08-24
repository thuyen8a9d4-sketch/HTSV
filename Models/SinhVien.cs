using System;
using System.Collections.Generic;

namespace HTSV.Models;

public partial class SinhVien
{
    public int UserId { get; set; }

    public string StudentCode { get; set; } = null!;

    public string? ClassName { get; set; }

    public string? Major { get; set; }

    public int? EnrollmentYear { get; set; }

    public virtual ICollection<DangKyHocPhan> DangKyHocPhans { get; set; } = new List<DangKyHocPhan>();

    public virtual NguoiDung User { get; set; } = null!;
}
