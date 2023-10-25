import { container } from 'tsyringe';

import { UsersService } from '@domain/accounts/application/services/users.service';
import { PasswordRecoveryTokensService } from '@domain/accounts/application/services/password-recovery-tokens.service';
import { OnUserCreated } from '@domain/emails/application/subscribers/on-user-created';
import { PrismaUsersRepository } from './database/prisma/repositories/prisma-users.repository';
import { PrismaService } from './database/prisma/prisma.service';
import { BcryptHasher } from './gateways/bcrypt-hasher';
import { JwtEncrypter } from './gateways/jwt-encrypter';
import { PrismaPasswordRecoveryTokensRepository } from './database/prisma/repositories/prisma-password-recovery-tokens.repository';
import { HandlebarsMailTemplate } from './gateways/handlebars-mail-template';
import { MailtrapMail } from './gateways/mailtrap-mail';
import { DiskStorage } from './gateways/disk-storage';

// Repositories
container.register('PrismaService', { useClass: PrismaService });
container.register('UsersRepository', { useClass: PrismaUsersRepository });
container.register('PasswordRecoveryTokensRepository', {
  useClass: PrismaPasswordRecoveryTokensRepository,
});

// Gateways
container.registerSingleton('HasherGateway', BcryptHasher);
container.registerSingleton('EncrypterGateway', JwtEncrypter);
container.registerSingleton('MailGateway', MailtrapMail);
container.registerSingleton('MailTemplateGateway', HandlebarsMailTemplate);
container.registerSingleton('StorageGateway', DiskStorage);

// Services
container.registerSingleton('UsersService', UsersService);
container.registerSingleton(
  'PasswordRecoveryTokensService',
  PasswordRecoveryTokensService,
);

// Events
container.registerSingleton('OnUserCreated', OnUserCreated);
