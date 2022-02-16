import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { MessageModule } from '../message/message.module';
import { UsersModule } from '../users/users.module';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [AuthModule, UsersModule, MessageModule],
  controllers: [],
  providers: [ChatGateway],
})
export class ChatModule {}
