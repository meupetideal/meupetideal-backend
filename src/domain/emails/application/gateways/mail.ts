interface MailContact {
  name: string;
  email: string;
}

export interface SendMailInput {
  to: MailContact;
  from?: MailContact;
  subject: string;
  body: string;
}

export abstract class MailGateway {
  abstract send(data: SendMailInput): Promise<void>;
}
