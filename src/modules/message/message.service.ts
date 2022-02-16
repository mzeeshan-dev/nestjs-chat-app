import { Inject, Injectable } from '@nestjs/common';
import { Message } from 'src/models/message/message.model';
import { CreateMessageDTO } from './dto/createMessage.dto';
import { DeleteMessageDTO } from './dto/deleteMessage.dto';
import { UpdateMessageDTO } from './dto/updateMessage.dto';

@Injectable()
export class MessageService {
  constructor(
    @Inject('MESSAGE_REPOSITORY')
    private msgRepository: typeof Message,
  ) {}

  async createMessage(createMessageData: CreateMessageDTO) {
    return await this.msgRepository.create({ ...createMessageData });
  }

  async getAllMessages() {
    return await this.msgRepository.findAll();
  }

  async getMessageById(id: number) {
    return await this.msgRepository.findOne({ where: { id } });
  }

  async updateMessage(updatemessageData: UpdateMessageDTO) {
    const { id } = updatemessageData;

    return await this.msgRepository.update(updatemessageData, {
      where: { id },
    });
  }

  async deleteMessage(deletemessageData: DeleteMessageDTO) {
    const { id } = deletemessageData;

    return await this.msgRepository.destroy({ where: { id } });
  }
}
