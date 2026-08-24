using System;
using System.Collections.Generic;

namespace HTSV.Models;

public partial class BuoiHoc
{
    public int Id { get; set; }

    public int CourseId { get; set; }

    public int LessonNo { get; set; }

    public string Title { get; set; } = null!;

    public string? Content { get; set; }

    public DateOnly? ScheduledDate { get; set; }

    public virtual LopHocPhan Course { get; set; } = null!;
}
