using System;
using System.Collections.Generic;

namespace HTSV.Models;

public partial class GiangVien
{
    public int UserId { get; set; }

    public string LecturerCode { get; set; } = null!;

    public string? Department { get; set; }

    public string? Title { get; set; }

    public virtual ICollection<LopHocPhan> LopHocPhans { get; set; } = new List<LopHocPhan>();

    public virtual NguoiDung User { get; set; } = null!;
}
