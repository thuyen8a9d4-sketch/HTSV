using System;
using System.Collections.Generic;

namespace HTSV.Models;

public partial class VaiTro
{
    public int Id { get; set; }

    public string Code { get; set; } = null!;

    public string Name { get; set; } = null!;

    public virtual ICollection<Quyen> Permissions { get; set; } = new List<Quyen>();

    public virtual ICollection<NguoiDung> Users { get; set; } = new List<NguoiDung>();
}
