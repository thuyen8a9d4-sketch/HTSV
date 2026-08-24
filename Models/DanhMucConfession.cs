using System;
using System.Collections.Generic;

namespace HTSV.Models;

public partial class DanhMucConfession
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Slug { get; set; } = null!;

    public virtual ICollection<BaiConfession> BaiConfessions { get; set; } = new List<BaiConfession>();
}
