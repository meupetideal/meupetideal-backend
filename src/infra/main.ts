import 'reflect-metadata';
import { ServerFactory } from './http/server';

import './module';

async function bootstrap() {
  const app = await ServerFactory.create();

  const port = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3333;

  await app.listen(port);
}
bootstrap();
