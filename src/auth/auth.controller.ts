import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorator/public.decorator';
import { AuthService } from './auth.service';
import { ForgetPassDTO } from './dto/ForgotPass.dto';
import { ResetPassDTO } from './dto/ResetPass.dto';
import { SignInDTO } from './dto/SignIn.dto';
import { SignUpDTO } from './dto/SignUp.dto';
import { VerifyTokenDTO } from './dto/VerifyToken.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('signin')
  async signIn(@Body() signInDTO: SignInDTO, @Request() req) {
    return this.authService.logInUser(req.user);
  }

  @Post('signup')
  signUpUser(@Body() createUserData: SignUpDTO) {
    return this.authService.signUpUser(createUserData);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgetPasswordData: ForgetPassDTO) {
    return this.authService.forgotPassword(forgetPasswordData);
  }

  @Post('verify-token')
  async verifyToken(@Body() verifyTokenData: VerifyTokenDTO) {
    return this.authService.verifyToken(verifyTokenData);
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordData: ResetPassDTO) {    
    return this.authService.resetPassword(resetPasswordData);
  }
}