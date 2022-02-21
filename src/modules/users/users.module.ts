import { Module } from '@nestjs/common';
import { FirebaseStorageService } from 'src/common/services/firebaseStorage.service';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders, FirebaseStorageService],
  exports: [UsersService, ...usersProviders],
})
export class UsersModule {}
