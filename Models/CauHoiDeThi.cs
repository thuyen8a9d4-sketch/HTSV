using System;
using System.Collections.Generic;

namespace HTSV.Models;

public partial class CauHoiDeThi
{
    public int Id { get; set; }

    public int ExamId { get; set; }

    public int QuestionId { get; set; }

    public int OrderNo { get; set; }

    public virtual ICollection<CauTraLoi> CauTraLois { get; set; } = new List<CauTraLoi>();

    public virtual DeThi Exam { get; set; } = null!;

    public virtual NganHangCauHoi Question { get; set; } = null!;
}
