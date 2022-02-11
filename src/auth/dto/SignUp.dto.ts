import { ApiProperty } from '@nestjs/swagger';

export class SignUpDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  phone_number: number;
  @ApiProperty()
  password: string;
}