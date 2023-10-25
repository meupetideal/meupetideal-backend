import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

import {
  StorageGateway,
  UploadInput,
  UploadOutput,
} from '@core/application/gateways/storage.gateway';
import { injectable } from 'tsyringe';

@injectable()
export class DiskStorage implements StorageGateway {
  public async upload({ body, fileName }: UploadInput): Promise<UploadOutput> {
    const uploadId = randomUUID();
    const uniqueFileName = `${uploadId}-${fileName}`;

    fs.createWriteStream(
      path.resolve(__dirname, '..', '..', '..', 'tmp', uniqueFileName),
    ).write(body);

    return {
      url: `${uniqueFileName}`,
    };
  }

  public async delete(url: string): Promise<void> {
    const filePath = path.resolve(__dirname, '..', '..', '..', 'tmp', url);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
