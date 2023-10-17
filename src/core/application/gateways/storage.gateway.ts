export interface UploadInput {
  fileName: string;
  fileType: string;
  body: Buffer;
}

export interface UploadOutput {
  url: string;
}

export abstract class StorageGateway {
  abstract upload(input: UploadInput): Promise<UploadOutput>;
  abstract delete(url: string): Promise<void>;
}
