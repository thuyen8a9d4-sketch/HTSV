using System;
using System.Collections.Generic;

namespace HTSV.Models;

public partial class DapAn
{
    public int Id { get; set; }

    public int QuestionId { get; set; }

    public string OptionLabel { get; set; } = null!;

    public string Content { get; set; } = null!;

    public bool IsCorrect { get; set; }

    public virtual ICollection<CauTraLoi> CauTraLois { get; set; } = new List<CauTraLoi>();

    public virtual NganHangCauHoi Question { get; set; } = null!;
}
