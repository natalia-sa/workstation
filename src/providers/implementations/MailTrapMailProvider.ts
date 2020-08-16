import { IMailProvider, IMessage } from '../IMailProvider'
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

export class MailProvider implements IMailProvider {
    private transporter: Mail;
    constructor () {
      this.transporter = nodemailer.createTransport({
        host: process.env.MAIL_SMTP_HOST,
        port: Number(process.env.MAIL_SMTP_PORT),
        auth: {
          user: process.env.MAIL_SMTP_USERNAME,
          pass: process.env.MAIL_SMTP_PASSWORD
        }
      })
    }

    async sendMail (message: IMessage): Promise<void> {
      await this.transporter.sendMail({
        to: {
          name: message.to.name,
          address: message.to.email
        },
        from: {
          name: message.from.name,
          address: message.from.email
        },
        subject: message.subject,
        html: message.body
      })
    }
}