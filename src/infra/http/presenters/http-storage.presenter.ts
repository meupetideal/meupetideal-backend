export class HttpStoragePresenter {
  static toHttp(fileName?: string) {
    switch (process.env.STORAGE_GATEWAY) {
      case 'firebase':
        return `https://firebasestorage.googleapis.com/v0/b/meupetideal-aed3c.appspot.com/o/${fileName}?alt=media`;
      default:
        return fileName ?? null;
    }
  }
}
