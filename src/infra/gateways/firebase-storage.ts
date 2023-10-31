import { randomUUID } from 'node:crypto';
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  deleteObject,
  getStorage,
  ref,
  uploadBytes,
  FirebaseStorage as FStorage,
} from 'firebase/storage';

import {
  StorageGateway,
  UploadInput,
  UploadOutput,
} from '@core/application/gateways/storage.gateway';

export class FirebaseStorage implements StorageGateway {
  private app: FirebaseApp;

  private storage: FStorage;

  constructor() {
    const projectId = process.env.FIREBASE_PROJECT_ID;

    const firebaseConfig = {
      projectId,
      apiKey: process.env.FIREBASE_API_KEY,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID,
      authDomain: `${projectId}.firebaseapp.com`,
      storageBucket: `${projectId}.appspot.com`,
    };

    this.app = initializeApp(firebaseConfig);
    this.storage = getStorage(this.app);
  }

  public async upload({
    body,
    fileName,
    fileType,
  }: UploadInput): Promise<UploadOutput> {
    const uploadId = randomUUID();
    const uniqueFileName = `${uploadId}-${fileName}`;

    const storageRef = ref(this.storage, uniqueFileName);

    const snapshot = await uploadBytes(storageRef, body, {
      contentType: fileType,
    });

    return {
      url: snapshot.ref.fullPath,
    };
  }

  public async delete(url: string): Promise<void> {
    const storageRef = ref(this.storage, url);
    await deleteObject(storageRef);
  }
}
