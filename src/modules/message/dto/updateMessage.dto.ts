import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDTO {
  @ApiProperty()
  sender_id: string;
  @ApiProperty()
  receiver_id: string;
  @ApiProperty()
  message: string;
  @ApiProperty()
  timestamp: Date;
}