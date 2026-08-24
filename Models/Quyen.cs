using System;
using System.Collections.Generic;

namespace HTSV.Models;

public partial class Quyen
{
    public int Id { get; set; }

    public string Code { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public virtual ICollection<VaiTro> Roles { get; set; } = new List<VaiTro>();
}
