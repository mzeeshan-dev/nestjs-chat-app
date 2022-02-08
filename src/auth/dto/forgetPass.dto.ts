import { ApiProperty } from '@nestjs/swagger';

export class ForgetPassDTO {
  @ApiProperty()
  email: string;
}
