using System;
using System.Collections.Generic;

namespace HTSV.Models;

public partial class CauTraLoi
{
    public int Id { get; set; }

    public int AttemptId { get; set; }

    public int ExamQuestionId { get; set; }

    public int? SelectedOptionId { get; set; }

    public bool? IsCorrect { get; set; }

    public DateTime? AnsweredAt { get; set; }

    public virtual LuotLamBai Attempt { get; set; } = null!;

    public virtual CauHoiDeThi ExamQuestion { get; set; } = null!;

    public virtual DapAn? SelectedOption { get; set; }
}
