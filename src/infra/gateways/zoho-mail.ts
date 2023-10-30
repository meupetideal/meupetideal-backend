import {
  MailGateway,
  SendMailInput,
} from '@domain/emails/application/gateways/mail';
import nodemailer, { SendMailOptions, Transporter } from 'nodemailer';
import { injectable } from 'tsyringe';

@injectable()
export class ZohoMail implements MailGateway {
  private client: Transporter;

  constructor() {
    const transporter = nodemailer.createTransport({
      host: process.env.ZOHO_HOST,
      port: Number(process.env.ZOHO_PORT),
      auth: {
        user: process.env.ZOHO_USER,
        pass: process.env.ZOHO_PASS,
      },
      secure: true,
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
