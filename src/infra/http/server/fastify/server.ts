import fastify, { FastifyInstance } from 'fastify';
import fastifyMultipart from '@fastify/multipart';
import { AppError } from '@core/application/errors/app.error';
import { EntityValidationError } from '@core/enterprise/errors/validation.error';
import { AppServer } from '..';
import { FastifyRegisterUserController } from './controllers/fastify-register-user.controller';
import { FastifyAuthenticateUserController } from './controllers/fastify-authenticate-user.controller';
import { FastifyRecoverPasswordWithEmailController } from './controllers/fastify-recover-password-with-email.controller';

import { fastifyVerifyAuthorization } from './middlewares/fastify-verify-authorization.middleware';
import { FastifyResetPasswordWithTokenController } from './controllers/fastify-reset-password-with-token.controller';
import { FastifyShowProfileController } from './controllers/fastify-show-profile.controller';
import { FastifyUpdateProfileController } from './controllers/fastify-update-user.controller';
import { FastifyUpdateUserAvatarController } from './controllers/fastify-update-user-avatar.controller';
import { FastifyResetPasswordWithCurrentPasswordController } from './controllers/fastify-reset-password-with-current-password.controller';
import { FastifyRegisterAnimalForAdoptionController } from './controllers/fastify-register-animal-for-adoption.controller';
import { FastifyShowAnimalDetailsController } from './controllers/fastify-show-animal-details.controller';
import { FastifyMarkAnimalAsAdoptedController } from './controllers/fastify-mark-animal-as-adopted.controller';
import { FastifyUpdateAnimalDetailsController } from './controllers/fastify-update-animal-details.controller';
import { FastifyFetchOwnerAnimalsController } from './controllers/fastify-fetch-owner-animals.controller';
import { FastifyFetchAvailableAnimalsController } from './controllers/fastify-fetch-available-animals.controller';
import { FastifyReportIrregularAnimalController } from './controllers/fastify-report-irregular-animal.controller';
import { FastifyDemonstrateInterestInAnimalController } from './controllers/fastify-demonstrate-interest-in-animal.controller';
import { FastifyFetchInterestsFromUserController } from './controllers/fastify-fetch-interests-from-user.controller';
import { FastifyFetchInterestsInAnimalController } from './controllers/fastify-fetch-interests-in-animal.controller';
import { FastifyFetchNotificationsController } from './controllers/fastify-fetch-notifications.controller';
import { FastifyOptionsListController } from './controllers/fastify-options-list.controller';

export class FastifyServer implements AppServer {
  private _server: FastifyInstance;

  private constructor() {
    this._server = fastify({
      logger: false,
    });
  }

  static create(): FastifyServer {
    return new FastifyServer();
  }

  public async listen(port: number): Promise<void> {
    await this.registerHandlers();
    await this.registerRoutes();

    this._server.get('/health-check', async (_, reply) =>
      reply.status(200).send(),
    );

    try {
      const host = '0.0.0.0';
      await this._server.listen({
        host,
        port,
      });
      console.log(`Server running on port ${port}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  private async registerHandlers(): Promise<void> {
    this._server.register(fastifyMultipart);

    this._server.setErrorHandler((error, _, reply) => {
      if (error instanceof AppError) {
        const validationErrors =
          error instanceof EntityValidationError ? error.error : null;

        return reply.status(error.statusCode).send({
          ...error.format(),
          validationErrors,
        });
      }

      if (error.constructor.name === 'FastifyError') {
        return reply.status(error.statusCode ?? 500).send({
          type: error.code,
          message: error.message,
          code: error.statusCode,
          statusCode: error.statusCode,
          timestamp: new Date(),
        });
      }

      if (process.env.NODE_ENV === 'development') {
        console.log(error);
      }

      return reply.status(500).send({
        type: 'InternalServerError',
        message: 'Internal Server Error',
        sentryErrorId: null,
      });
    });
  }

  private async registerRoutes(): Promise<void> {
    await this.publicRoutes();
    await this.privateRoutes();
  }

  private async publicRoutes(): Promise<void> {
    const controllers = [
      {
        controller: new FastifyRegisterUserController(),
        method: 'post',
        path: '/accounts',
      },
      {
        controller: new FastifyAuthenticateUserController(),
        method: 'post',
        path: '/accounts/auth',
      },
      {
        controller: new FastifyRecoverPasswordWithEmailController(),
        method: 'post',
        path: '/accounts/forgot-password',
      },
      {
        controller: new FastifyResetPasswordWithTokenController(),
        method: 'post',
        path: '/accounts/reset-password',
      },
      {
        controller: new FastifyFetchAvailableAnimalsController(),
        method: 'get',
        path: '/animals',
      },
      {
        controller: new FastifyOptionsListController(),
        method: 'get',
        path: '/options',
      },
    ];

    controllers.forEach(({ controller, method, path }) => {
      this._server[method](path, controller.handle);
    });
  }

  private async privateRoutes(): Promise<void> {
    this._server.register((instance, _, done) => {
      instance.addHook('preHandler', fastifyVerifyAuthorization);

      const controllers = [
        {
          controller: new FastifyShowProfileController(),
          method: 'get',
          path: '/profile',
        },
        {
          controller: new FastifyUpdateProfileController(),
          method: 'put',
          path: '/profile',
        },
        {
          controller: new FastifyUpdateUserAvatarController(),
          method: 'patch',
          path: '/profile/avatar',
        },
        {
          controller: new FastifyResetPasswordWithCurrentPasswordController(),
          method: 'patch',
          path: '/profile/password',
        },
        {
          controller: new FastifyFetchOwnerAnimalsController(),
          method: 'get',
          path: '/profile/animals',
        },
        {
          controller: new FastifyFetchInterestsFromUserController(),
          method: 'get',
          path: '/profile/interests',
        },
        {
          controller: new FastifyRegisterAnimalForAdoptionController(),
          method: 'post',
          path: '/animals',
        },
        {
          controller: new FastifyShowAnimalDetailsController(),
          method: 'get',
          path: '/animals/:animalId',
        },
        {
          controller: new FastifyUpdateAnimalDetailsController(),
          method: 'put',
          path: '/animals/:animalId',
        },
        {
          controller: new FastifyMarkAnimalAsAdoptedController(),
          method: 'patch',
          path: '/animals/:animalId/adopt',
        },
        {
          controller: new FastifyReportIrregularAnimalController(),
          method: 'post',
          path: '/animals/:animalId/report',
        },
        {
          controller: new FastifyFetchInterestsInAnimalController(),
          method: 'patch',
          path: '/animals/:animalId/interests',
        },
        {
          controller: new FastifyDemonstrateInterestInAnimalController(),
          method: 'post',
          path: '/animals/:animalId/demonstrate-interest',
        },
        {
          controller: new FastifyFetchNotificationsController(),
          method: 'get',
          path: '/notifications',
        },
      ];

      controllers.forEach(({ controller, method, path }) => {
        instance[method](path, controller.handle);
      });

      done();
    });
  }

  get server(): FastifyInstance {
    return this._server;
  }
}
