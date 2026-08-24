namespace HTSV.Services;

public class EmailSettings
{
    public string SmtpHost { get; set; } = "";
    public int SmtpPort { get; set; }
    public string From { get; set; } = "";
    public string Password { get; set; } = "";
    public string TenHienThi { get; set; } = "";
}
