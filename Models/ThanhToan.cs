using System;
using System.Collections.Generic;

namespace HTSV.Models;

public partial class ThanhToan
{
    public int Id { get; set; }

    public int OrderId { get; set; }

    public string Provider { get; set; } = null!;

    public string? ProviderTxnId { get; set; }

    public decimal Amount { get; set; }

    public string Status { get; set; } = null!;

    public string? RawWebhookPayload { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? ConfirmedAt { get; set; }

    public virtual DonHang Order { get; set; } = null!;
}
