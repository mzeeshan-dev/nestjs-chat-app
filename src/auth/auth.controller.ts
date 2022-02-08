import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorator/public.decorator';
import { AuthService } from './auth.service';
import { ForgetPassDTO } from './dto/forgetPass.dto';
import { ResetPassDTO } from './dto/resetPass.dto';
import { SignInDTO } from './dto/SignIn.dto';
import { SignUpDTO } from './dto/SignUp.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiBearerAuth('access-token')
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('signin')
  async signIn(@Body() signInDTO: SignInDTO, @Request() req) {
    console.log('in the controller');
    
    return this.authService.logInUser(req.user);
  }

  @Public()
  @Post('signup')
  signUpUser(@Body() createUserData: SignUpDTO) {
    return this.authService.signUpUser(createUserData);
  }

  @ApiBearerAuth('access-token')
  @Post('forgot-password')
  async createPasswordToken(@Body() forgetPasswordData: ForgetPassDTO) {
    return this.authService.forgotPassword(forgetPasswordData);
  }

  @ApiBearerAuth('access-token')
  @Post('reset-password')
  async resetPassword(@Body() resetPasswordData: ResetPassDTO) {
    return this.authService.resetPassword(resetPasswordData);
  }
}