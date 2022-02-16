import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  sender_id: number;
  @ApiProperty()
  receiver_id: number;
  @ApiProperty()
  message: string;
  @ApiProperty()
  timestamp: Date;
}