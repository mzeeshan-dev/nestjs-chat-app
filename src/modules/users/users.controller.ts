import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { User } from '../../models/user/user.model';
import { UserDTO } from './dto/User.dto';
import { UsersService } from './users.service';
  
  @ApiBearerAuth('access-token')
  @ApiTags('users')
  @Controller('users')
  export class UsersController {
    constructor(private userService: UsersService) {}
  
    @Get('/')
    findAll(): Promise<User[]> {
      return this.userService.findAll();
    }

    // find one by email through body
    @Get('/byEmail')
    getByEmail(@Body() email): Promise<User> {
      return this.userService.findOneByEmail(email);
    }
  
    @Get('/:id')
    @ApiParam({ name: 'id' })
    findOneById(@Param() params): Promise<User> {
      return this.userService.findOneById(params.id);
    }
  
    @Put('update/:id')
    @ApiParam({ name: 'id' })
    update(@Param() params, @Body() updateUserDto: UserDTO): Promise<User> {
      return this.userService.update(params.id, updateUserDto);
    }
  
    @Delete('delete/:id')
    @ApiParam({ name: 'id' })
    destroy(@Param() params): Promise<User> {
      return this.userService.destroy(params.id);
    }

    /*/
     ***** upload user image
     ***** settings/upload-image
    /*/

    @Put('/upload-image/:id')
    @ApiParam({ name: 'id' })
    uploadImage(@Param() params, @Body() updateUserDto: UserDTO) {}
  }
  