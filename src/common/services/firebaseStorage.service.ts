import { ForbiddenException, Injectable } from '@nestjs/common';
import { deleteObject, getStorage, ref, uploadBytes } from 'firebase/storage';
import { FirebaseService } from './firebase.service';

@Injectable()
export class FirebaseStorageService extends FirebaseService {
  storage = getStorage();

  constructor() {
    super();
    console.log('Parent Constructor has been called');
  }

  public uploadFile(file: Express.Multer.File, user_id: number) {
    const storageRef = ref(
      this.storage,
      FirebaseStorageService.fileNameGenerator(file, user_id),
    );
    const fileMetadata = {
      name: file.originalname,
      contentType: file.mimetype,
    };
    return uploadBytes(storageRef, file.buffer, fileMetadata);
  }

  public async deleteFile(filePath: string) {
    console.log('In deleteFile');

    const desertRef = ref(this.storage, filePath);
    await deleteObject(desertRef)
      .then(() => {
        return {
          message: 'File deleted successfully',
        };
      })
      .catch((error) => {
        throw new ForbiddenException({
          status: 400,
          message: 'Error deleting file',
          error,
        });
      });
  }

  static fileNameGenerator(file: Express.Multer.File, user_id: number) {
    const randomName = Math.random().toString(15).substring(2, 15);
    return `${file.fieldname}/${user_id}-${randomName}.${
      file.mimetype.split('/')[1]
    }`;
  }
}
