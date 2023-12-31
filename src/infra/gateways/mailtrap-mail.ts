import nodemailer, { Transporter, SendMailOptions } from 'nodemailer';
import {
  MailGateway,
  SendMailInput,
} from '@domain/emails/application/gateways/mail';

export class MailtrapMail implements MailGateway {
  private client: Transporter;

  constructor() {
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: Number(process.env.MAILTRAP_PORT),
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    this.client = transporter;
  }

  public async send({ subject, from, to, body }: SendMailInput): Promise<void> {
    const mailOptions: SendMailOptions = {
      from: {
        name: from?.name ?? process.env.FROM_EMAIL_NAME ?? 'Meu Pet Ideal',
        address:
          from?.email ??
          process.env.FROM_EMAIL_ADDRESS ??
          'naoresponda@meupetideal.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: body,
    };

    const response = await this.client.sendMail(mailOptions);

    console.log(`Message sent: ${response.messageId}`);
  }
}
