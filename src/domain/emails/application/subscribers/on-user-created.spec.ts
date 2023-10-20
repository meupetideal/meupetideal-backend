import { waitFor } from 'test/utils/wait-for';
import { UserBuilder } from 'test/data-builders/user.builder';
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users.repository';
import { FakeMailGateway } from 'test/gateways/fake-mail';
import { FakeMailTemplateGateway } from 'test/gateways/fake-mail-template';
import { OnUserCreated } from './on-user-created';
import { MailService } from '../services/mail.service';
import { MailGateway } from '../gateways/mail';
import { MailTemplateGateway } from '../gateways/mail-template';

describe('OnUserCreated', () => {
  let usersRepository: InMemoryUsersRepository;
  let mailGateway: MailGateway;
  let mailTemplateGateway: MailTemplateGateway;
  let mailService: MailService;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();

    mailGateway = new FakeMailGateway();
    mailTemplateGateway = new FakeMailTemplateGateway();
    mailService = new MailService(mailGateway, mailTemplateGateway);

    // eslint-disable-next-line no-new
    new OnUserCreated(mailService);
  });

  it('should send an email when an user is created', async () => {
    const spySendMailWithTemplate = vi.spyOn(mailService, 'sendWithTemplate');

    const user = UserBuilder.create().build();
    await usersRepository.insert(user);

    await waitFor(() => {
      expect(spySendMailWithTemplate).toHaveBeenCalled();
    });
  });
});
