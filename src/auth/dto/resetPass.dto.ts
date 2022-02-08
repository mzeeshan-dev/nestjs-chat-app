import { ApiProperty } from "@nestjs/swagger";

export class ResetPassDTO {
    @ApiProperty()
    token: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    password_confirm: string;
}