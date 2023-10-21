import { Router } from 'express';

export class Routes {
  public router: Router;

  private constructor() {
    this.router = Router();

    this.registerRoutes();
  }

  static create(): Routes {
    return new Routes();
  }

  private registerRoutes(): void {
    this.router.get('/', (request, response) =>
      response.json({ message: 'Hello World' }),
    );
  }
}
