import { ApiProperty } from '@nestjs/swagger';

export class DeleteMessageDTO {
  @ApiProperty()
  id: number;
}
