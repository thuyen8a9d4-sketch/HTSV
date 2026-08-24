using System;
using System.Collections.Generic;

namespace HTSV.Models;

public partial class LuotLamBai
{
    public int Id { get; set; }

    public int ExamId { get; set; }

    public int StudentUserId { get; set; }

    public DateTime StartedAt { get; set; }

    public DateTime? SubmittedAt { get; set; }

    public decimal? Score { get; set; }

    public int? CorrectCount { get; set; }

    public int? WrongCount { get; set; }

    public string Status { get; set; } = null!;

    public virtual ICollection<CauTraLoi> CauTraLois { get; set; } = new List<CauTraLoi>();

    public virtual DeThi Exam { get; set; } = null!;

    public virtual NguoiDung StudentUser { get; set; } = null!;
}
