import fastify, { FastifyInstance } from 'fastify';
import { AppServer } from '..';
import { FastifyRegisterUserController } from './controllers/fastify-register-user.controller';

export class FastifyServer implements AppServer {
  private server: FastifyInstance;

  private constructor() {
    this.server = fastify();
  }

  static create(): FastifyServer {
    return new FastifyServer();
  }

  public async listen(port: number): Promise<void> {
    this.registerRoutes();

    try {
      await this.server.listen({ port });
      console.log(`Server running on port ${port}`);
    } catch (error) {
      this.server.log.error(error);
      process.exit(1);
    }
  }

  private registerRoutes(): void {
    const registerUserController = new FastifyRegisterUserController();
    this.server.post('/accounts', registerUserController.handle);
  }
}
