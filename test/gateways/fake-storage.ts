import {
  StorageGateway,
  UploadInput,
  UploadOutput,
} from '@core/application/gateways/storage.gateway';
import { randomUUID } from 'node:crypto';

interface Upload {
  fileName: string;
  url: string;
}

export class FakeStorageGateway implements StorageGateway {
  public uploads: Upload[] = [];

  async upload({ fileName }: UploadInput): Promise<UploadOutput> {
    const uploadId = randomUUID();
    const uniqueFileName = `${uploadId}-${fileName}`;

    this.uploads.push({
      fileName,
      url: uniqueFileName,
    });

    return { url: uniqueFileName };
  }

  async delete(url: string): Promise<void> {
    const uploadIndex = this.uploads.findIndex((upload) => upload.url === url);

    if (uploadIndex === -1) {
      return;
    }

    this.uploads.splice(uploadIndex, 1);
  }
}
