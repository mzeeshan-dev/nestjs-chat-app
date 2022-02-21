import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import * as path from 'path';
import { FirebaseStorageService } from 'src/common/services/firebaseStorage.service';
import { User } from '../../models/user/user.model';
import { UserDTO } from './dto/User.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
    private firebaseStorageService: FirebaseStorageService,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.findAll<User>();
  }

  findOneById(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  create(userData: UserDTO): Promise<User> {
    const email = userData.email;
    const alreadyCreated = this.usersRepository.findOne({ where: { email } });

    if (alreadyCreated) {
      return this.usersRepository.create();
    } else {
      throw new Error('User already exists');
    }
  }

  async update(id: number, updatedUserData: UserDTO): Promise<User> {
    await this.usersRepository.update(updatedUserData, {
      where: {
        id,
      },
    });
    const user = this.findOneById(id);
    return user;
  }

  async updatePassword(id: number, password: string): Promise<User> {
    await this.usersRepository.update(
      {
        password,
      },
      {
        where: {
          id,
        },
      },
    );
    const user = this.findOneById(id);
    return user;
  }

  async destroy(id: number): Promise<User> {
    const user = await this.findOneById(id);
    await this.usersRepository.destroy({
      where: {
        id,
      },
    });
    return user;
  }

  // Auth Methods

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }

  async uploadUserProfile(id: number, file: Express.Multer.File) {
    const user = await this.findOneById(id);
    const isLocalPath = path.basename(user.image_path).includes('user-image');
    const isFirebasePath = user.image_path.split('/').includes('profile');

    try {
      if (file.size <= 5000000 && user) {
        if (isLocalPath) {
          user.image_path = null;
          this.uploadImageHelper(file, id, user);
        } else if (isFirebasePath) {
          await this.firebaseStorageService.deleteFile(user.image_path);
          await this.uploadImageHelper(file, id, user);
        } else {
          this.uploadImageHelper(file, id, user);
        }
      } else {
        console.log('File cannot be uploaded');
      }
    } catch (error) {
      throw new ForbiddenException({
        status: 400,
        message: 'Error uploading profile image',
        error,
      });
    }
  }

  // ==================== Helper Methods  ====================

  async uploadImageHelper(
    file: Express.Multer.File,
    user_id: number,
    user: User,
  ) {
    const fileResponse = await this.firebaseStorageService.uploadFile(
      file,
      user_id,
    );
    user.image_path = fileResponse.metadata.fullPath;
    user.save();
  }
}
