import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDTO {
  @ApiProperty()
  sender_id: number;
  @ApiProperty()
  receiver_id: number;
  @ApiProperty()
  message: string;
  @ApiProperty()
  timestamp: Date;
}
