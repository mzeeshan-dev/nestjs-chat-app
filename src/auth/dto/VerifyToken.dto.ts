import { ApiProperty } from '@nestjs/swagger';

export class VerifyTokenDTO {
  @ApiProperty()
  email: string;
  @ApiProperty()
  token: string;
}
