import { Inject, Injectable } from '@nestjs/common';
import { ResetPassToken } from 'src/models/auth/resetPassToken.model';

@Injectable()
export class ResetPassTokenService {
  constructor(
    @Inject('PASSWORD_REPOSITORY')
    private resetPassRepository: typeof ResetPassToken,
  ) {}

  async createPasswordToken(data) {
    return await this.resetPassRepository.create(data);
  }

  async findOneByToken(token: any): Promise<ResetPassToken> {
    return await this.resetPassRepository.findOne(token);
  }

  async findOneByEmailAndToken(
    email: string,
    token: string,
  ): Promise<ResetPassToken> {
    return await this.resetPassRepository.findOne({
      where: {
        email,
        token,
      },
    });
  }

  async deletePasswordToken(token: string): Promise<ResetPassToken> {
    const password = await this.findOneByToken(token);
    await this.resetPassRepository.destroy({
      where: {
        token,
      },
    });
    return password;
  }
}
