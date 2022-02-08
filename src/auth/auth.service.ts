import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePassword, passwordHashing } from 'src/common/utils/bcrypt';
import { User } from 'src/models/user/user.model';
import { MailService } from 'src/modules/mailer/mail.servcie';
import { ResetPassTokenService } from 'src/modules/resetPassToken/resetPassToken.service';
import { UsersService } from 'src/modules/users/users.service';
import { ForgetPassDTO } from './dto/forgetPass.dto';
import { ResetPassDTO } from './dto/resetPass.dto';
import { SignUpDTO } from './dto/SignUp.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
    private userService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
    private resetPassTokenService: ResetPassTokenService,
  ) {}

  async validateUser(
    incomingEmail: string,
    incomingPassword: string,
  ): Promise<any> {
    const user = await this.userService.findOneByEmail(incomingEmail);

    if (user) {
      // validate password
      const matched = await comparePassword(incomingPassword, user.password);
      if (matched) {
        const { password, ...rest } = user['dataValues'];
        return rest;
      }
    } else {
      throw new BadRequestException('User does not exist');
    }
    return null;
  }

  async logInUser(user: any) {
    const payload = {
      username: user.username,
      sub: user.id,
    };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUpUser(createUserData: SignUpDTO): Promise<User> {
    const { email, password } = createUserData;

    const alreadyCreated = await this.usersRepository.findOne({
      where: { email },
    });

    if (alreadyCreated) {
      console.log('User already exists');
    } else {
      return await this.usersRepository.create({
        ...createUserData,
        password: await passwordHashing(password),
      });
    }
  }

  async forgotPassword(forgetPasswordData: ForgetPassDTO) {
    const { email } = forgetPasswordData;
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new BadRequestException('User does not exist');
    } else {
      const token = Math.random().toString(36).substring(2, 15);
      await this.resetPassTokenService.createPasswordToken({ passwordData: token, email });
      await this.mailService.sendMail(email, token);
    }
  }

  async resetPassword(resetPasswordData: ResetPassDTO) {
    const { token, password, password_confirm } = resetPasswordData;
    const resetPasswordToken = await this.resetPassTokenService.findOneByToken(token);
    if (resetPasswordToken) {
      if (password !== password_confirm) {
        throw new BadRequestException('Passwords do not match');
      } else {
        const user = await this.userService.findOneByEmail(
          resetPasswordToken.email,
        );

        if (user) {
          const hashedPassword = await passwordHashing(password);
          this.userService.updatePassword(user.id, hashedPassword);
          await this.resetPassTokenService.deletePasswordToken(token);
        } else {
          throw new BadRequestException('User does not exist');
        }
      }
    } else {
      throw new BadRequestException('Invalid Token OR Token Has Been Expired');
    }
    return {
      message: 'Password updated successfully',
    };
  }
}
