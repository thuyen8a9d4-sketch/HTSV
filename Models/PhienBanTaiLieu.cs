using System;
using System.Collections.Generic;

namespace HTSV.Models;

public partial class PhienBanTaiLieu
{
    public int Id { get; set; }

    public int MaterialId { get; set; }

    public int VersionNo { get; set; }

    public string FilePath { get; set; } = null!;

    public long? FileSize { get; set; }

    public string? MimeType { get; set; }

    public int? PageCount { get; set; }

    public DateTime UploadedAt { get; set; }

    public virtual TaiLieu Material { get; set; } = null!;
}
