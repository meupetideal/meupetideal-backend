import fastify, { FastifyInstance } from 'fastify';
import fastifyMultipart from '@fastify/multipart';
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

export class FastifyServer implements AppServer {
  private _server: FastifyInstance;

  private constructor() {
    this._server = fastify();
  }

  static create(): FastifyServer {
    return new FastifyServer();
  }

  public async listen(port: number): Promise<void> {
    await this.registerHandlers();
    await this.registerRoutes();

    try {
      await this._server.listen({ port });
      console.log(`Server running on port ${port}`);
    } catch (error) {
      this._server.log.error(error);
      process.exit(1);
    }
  }

  private async registerHandlers(): Promise<void> {
    this._server.register(fastifyMultipart);
  }

  private async registerRoutes(): Promise<void> {
    await this.publicRoutes();
    await this.privateRoutes();
  }

  private async publicRoutes(): Promise<void> {
    const registerUserController = new FastifyRegisterUserController();
    this._server.post('/accounts', registerUserController.handle);

    const authenticateUserController = new FastifyAuthenticateUserController();
    this._server.post('/accounts/auth', authenticateUserController.handle);

    const recoverPasswordWithEmailController =
      new FastifyRecoverPasswordWithEmailController();
    this._server.post(
      '/accounts/forgot-password',
      recoverPasswordWithEmailController.handle,
    );

    const resetPasswordWithTokenController =
      new FastifyResetPasswordWithTokenController();
    this._server.post(
      '/accounts/reset-password',
      resetPasswordWithTokenController.handle,
    );
  }

  private async privateRoutes(): Promise<void> {
    this._server.register((instance, _, done) => {
      instance.addHook('preHandler', fastifyVerifyAuthorization);

      const showProfileController = new FastifyShowProfileController();
      instance.get('/profile', showProfileController.handle);

      const updateProfileController = new FastifyUpdateProfileController();
      instance.put('/profile', updateProfileController.handle);

      const updateUserAvatarController =
        new FastifyUpdateUserAvatarController();
      instance.patch('/profile/avatar', updateUserAvatarController.handle);

      const resetPasswordWithCurrentPasswordController =
        new FastifyResetPasswordWithCurrentPasswordController();
      instance.patch(
        '/profile/password',
        resetPasswordWithCurrentPasswordController.handle,
      );

      done();
    });
  }

  get server(): FastifyInstance {
    return this._server;
  }
}
