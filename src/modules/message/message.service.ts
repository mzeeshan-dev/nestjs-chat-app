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

  async getLastFiveMessage(offset: number) {
    const { sender_id, receiver_id } = { sender_id: 1, receiver_id: 2 };

    console.log(offset);

    return await this.msgRepository.findAll({
      where: {
        sender_id,
        receiver_id,
      },
      limit: 5,
      offset,
      order: [['createdAt', 'DESC']],
    });
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
