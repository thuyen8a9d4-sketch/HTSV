using System;
using System.Collections.Generic;

namespace HTSV.Models;

public partial class LopHocPhan
{
    public int Id { get; set; }

    public int SubjectId { get; set; }

    public int LecturerId { get; set; }

    public string CourseCode { get; set; } = null!;

    public string? Semester { get; set; }

    public int? Year { get; set; }

    public virtual ICollection<BuoiHoc> BuoiHocs { get; set; } = new List<BuoiHoc>();

    public virtual ICollection<DangKyHocPhan> DangKyHocPhans { get; set; } = new List<DangKyHocPhan>();

    public virtual GiangVien Lecturer { get; set; } = null!;

    public virtual MonHoc Subject { get; set; } = null!;

    public virtual ICollection<TaiLieu> TaiLieus { get; set; } = new List<TaiLieu>();
}
