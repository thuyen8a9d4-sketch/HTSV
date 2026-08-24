using System;
using System.Collections.Generic;

namespace HTSV.Models;

public partial class DangKyHocPhan
{
    public int Id { get; set; }

    public int StudentUserId { get; set; }

    public int CourseId { get; set; }

    public DateTime EnrolledAt { get; set; }

    public virtual LopHocPhan Course { get; set; } = null!;

    public virtual SinhVien StudentUser { get; set; } = null!;
}
