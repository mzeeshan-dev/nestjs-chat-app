import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get('/:offset')
  @ApiParam({ name: 'offset' })
  getLastFiveMessageWithOffset(@Param() params) {
    return this.messageService.getLastFiveMessage(Number(params.offset) || 0);
  }
}