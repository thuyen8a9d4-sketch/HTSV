using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Options;

namespace HTSV.Services;

public class EmailSender
{
    private readonly EmailSettings _settings;

    public EmailSender(IOptions<EmailSettings> options)
    {
        _settings = options.Value;
    }

    public async Task SendAsync(string toEmail, string subject, string body)
    {
        using var client = new SmtpClient(_settings.SmtpHost, _settings.SmtpPort)
        {
            Credentials = new NetworkCredential(_settings.From, _settings.Password),
            EnableSsl = true,
        };
        using var message = new MailMessage
        {
            From = new MailAddress(_settings.From, _settings.TenHienThi),
            Subject = subject,
            Body = body,
            IsBodyHtml = false,
        };
        message.To.Add(toEmail);
        await client.SendMailAsync(message);
    }
}
