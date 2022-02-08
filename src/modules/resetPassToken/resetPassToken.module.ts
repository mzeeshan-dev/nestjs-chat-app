import { Module } from '@nestjs/common';
import { resetPassTokenProviders } from './resetPassToken.providers';
import { ResetPassTokenService } from './resetPassToken.service';

@Module({
  imports: [],
  providers: [...resetPassTokenProviders, ResetPassTokenService],
  exports: [...resetPassTokenProviders, ResetPassTokenService],
})
export class resetPassTokenModule {}