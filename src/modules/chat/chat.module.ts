import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ChatService],
})
export class ChatModule {}
