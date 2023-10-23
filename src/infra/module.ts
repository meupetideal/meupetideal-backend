import { container } from 'tsyringe';

import { UsersService } from '@domain/accounts/application/services/users.service';
import { RegisterUserUseCase } from '@domain/accounts/application/use-cases/register-user.use-case';
import { PrismaUsersRepository } from './database/prisma/repositories/prisma-users.repository';
import { PrismaService } from './database/prisma/prisma.service';
import { BcryptHasher } from './gateways/bcrypt-hasher';

// Repositories
container.register('PrismaService', { useClass: PrismaService });
container.register('UsersRepository', { useClass: PrismaUsersRepository });

// Gateways
container.registerSingleton('HasherGateway', BcryptHasher);

// Use Cases
container.registerSingleton('UsersService', UsersService);
container.registerSingleton('RegisterUserUseCase', RegisterUserUseCase);
