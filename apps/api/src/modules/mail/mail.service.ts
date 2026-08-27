import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly transporter: nodemailer.Transporter;
  private readonly from: string;
  private readonly displayName: string;

  constructor(private readonly config: ConfigService) {
    this.from = this.config.getOrThrow<string>('MAIL_FROM');
    this.displayName = this.config.get<string>('MAIL_DISPLAY_NAME') ?? 'HTSV';
    this.transporter = nodemailer.createTransport({
      host: this.config.getOrThrow<string>('MAIL_HOST'),
      port: this.config.get<number>('MAIL_PORT') ?? 587,
      secure: false,
      auth: {
        user: this.from,
        pass: this.config.get<string>('MAIL_PASSWORD'),
      },
    });
  }

  async send(to: string, subject: string, text: string) {
    await this.transporter.sendMail({
      from: `"${this.displayName}" <${this.from}>`,
      to,
      subject,
      text,
    });
  }
}
