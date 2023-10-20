import { waitFor } from 'test/utils/wait-for';
import { UserBuilder } from 'test/data-builders/user.builder';
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users.repository';
import { FakeMailGateway } from 'test/gateways/fake-mail';
import { FakeMailTemplateGateway } from 'test/gateways/fake-mail-template';
import { PasswordRecoveryTokenBuilder } from 'test/data-builders/password-recovery-token.builder';
import { InMemoryPasswordRecoveryTokensRepository } from 'test/repositories/in-memory-password-recovery-tokens.repository';
import { MailService } from '../services/mail.service';
import { MailGateway } from '../gateways/mail';
import { MailTemplateGateway } from '../gateways/mail-template';
import { OnPasswordRecoveryTokenCreated } from './on-password-recovery-token-created';

describe('OnPasswordRecoveryTokenCreated', () => {
  let usersRepository: InMemoryUsersRepository;
  let passwordRecoveryTokensRepository: InMemoryPasswordRecoveryTokensRepository;
  let mailGateway: MailGateway;
  let mailTemplateGateway: MailTemplateGateway;
  let mailService: MailService;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    passwordRecoveryTokensRepository =
      new InMemoryPasswordRecoveryTokensRepository();

    mailGateway = new FakeMailGateway();
    mailTemplateGateway = new FakeMailTemplateGateway();
    mailService = new MailService(mailGateway, mailTemplateGateway);

    // eslint-disable-next-line no-new
    new OnPasswordRecoveryTokenCreated(usersRepository, mailService);
  });

  it('should send an email when an user is created', async () => {
    const spySendMailWithTemplate = vi.spyOn(mailService, 'sendWithTemplate');

    const user = UserBuilder.create().build();
    await usersRepository.insert(user);

    const passwordRecoveryToken = PasswordRecoveryTokenBuilder.create()
      .withUserId(user.id.value)
      .build();
    await passwordRecoveryTokensRepository.insert(passwordRecoveryToken);

    await waitFor(() => {
      expect(spySendMailWithTemplate).toHaveBeenCalled();
    });
  });
});
