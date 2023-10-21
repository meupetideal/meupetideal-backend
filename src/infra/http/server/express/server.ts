import express, {
  Express,
  Router,
  Request,
  Response,
  NextFunction,
} from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { AppServer } from '..';

export class ExpressServer implements AppServer {
  private server: Express;

  private constructor(private router: Router) {
    this.server = express();
  }

  static create(router: Router): ExpressServer {
    return new ExpressServer(router);
  }

  public async listen(port: number): Promise<void> {
    this.registerHandlers();
    this.registerErrorHandlers();

    this.server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }

  private registerHandlers(): void {
    this.server.set('trust proxy', true);
    this.server.use(express.json());
    this.server.use(
      helmet({
        crossOriginResourcePolicy: {
          policy: 'same-site',
        },
      }),
    );
    this.server.use(cors());
    this.server.use(this.router);
  }

  private registerErrorHandlers(): void {
    this.server.use(
      (error: Error, request: Request, response: Response, _: NextFunction) => {
        if (process.env.NODE_ENV === 'development') {
          console.log(error);
        }

        return response.status(500).json({
          status: 'error',
          message: 'Internal Server Error',
        });
      },
    );
  }
}
