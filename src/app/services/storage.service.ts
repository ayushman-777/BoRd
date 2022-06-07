import {Injectable} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  metadata = {
    contentType: 'application/pdf'
  };

  constructor(private fireStorage: AngularFireStorage) {
  }

  uploadFileAndGetMetadata(path: string, file: any): any {
    const storageRef = this.fireStorage.ref(path);
    const uploadTask = this.fireStorage.upload(path, file, this.metadata);
    return {
      downloadUrl$: storageRef.getDownloadURL(),
      uploadProgress$: uploadTask.percentageChanges()
      }
  }

  listAllDocs(path: string) {
    return this.fireStorage.ref(path).listAll();
  }

  getBook(path: string) {
    return this.fireStorage.ref(path).getDownloadURL();
  }
}
