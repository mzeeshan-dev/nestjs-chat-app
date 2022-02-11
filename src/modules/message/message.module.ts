import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { messageProviders } from './message.provider';
import { MessageService } from './message.service';

@Module({
  imports: [],
  controllers: [MessageController],
  providers: [MessageService, ...messageProviders],
})
export class MessageModule {}
