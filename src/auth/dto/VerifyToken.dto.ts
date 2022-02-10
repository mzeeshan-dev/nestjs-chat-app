import { ApiProperty } from '@nestjs/swagger';

export class VerifyTokenDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  token: string;
}
