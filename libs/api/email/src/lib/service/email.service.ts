import { Injectable } from '@nestjs/common';
import { EmailParams, EmailType, EMAIL_SUBJECT } from '../types';
import * as handlebars from 'handlebars';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import * as fs from 'fs';
import * as nodemailer from 'nodemailer';
@Injectable()
export class EmailService {
  constructor(private config: ConfigService) {}
  private emailDir: string = this.config.get('EMAIL_DIR') as string;
  sendEmail<T extends keyof EmailParams>(
    to: string[] | string,
    type: EmailType,
    params: EmailParams[T] = {} as EmailParams[T],
  ): void {
    const templatePath = path.join(this.emailDir, `${type}.html`);
    const emailContent = fs.readFileSync(
      path.resolve(__dirname, templatePath),
      'utf8',
    );
    const template = handlebars.compile(emailContent);
    const subject = `DFO Scheduler: ${EMAIL_SUBJECT[type]}`;
    const html = template({ ...params, topic: EMAIL_SUBJECT[type] });
    this.send(to, subject, html);
  }

  private send(to: string[] | string, subject: string, html: string) {
    const config = {
      from: this.config.get('EMAIL_FROM'),
      to,
      subject,
      html,
    };

    let transport: nodemailer.Transporter;
    if (this.config.get('APP_ENV') === 'production') {
      transport = nodemailer.createTransport({
        service: 'Mailgun',
        auth: {
          user: this.config.get('EMAIL_USER'),
          pass: this.config.get('EMAIL_PASSWORD'),
        },
      });
    } else {
      transport = nodemailer.createTransport({
        host: this.config.get('EMAIL_HOST'),
        port: this.config.get('EMAIL_PORT'),
        auth: {
          user: this.config.get('EMAIL_USER'),
          pass: this.config.get('EMAIL_PASSWORD'),
        },
      });
    }

    transport
      .sendMail(config)
      .then()
      .catch((err) => {
        // TODO: log error
        // eslint-disable-next-line no-console
        console.log('Email result', err.message);
      });
    return;
  }
}
