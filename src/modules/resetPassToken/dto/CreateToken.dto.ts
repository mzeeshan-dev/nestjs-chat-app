import { ApiProperty } from '@nestjs/swagger';

export class CreateTokenDTO {
  @ApiProperty()
  email: string;
  @ApiProperty()
  token: string;
}
