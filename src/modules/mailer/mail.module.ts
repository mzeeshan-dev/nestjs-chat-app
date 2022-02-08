import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.servcie';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mailtrap.io',
        port: 587,
        ignoreTLS: true,
        secure: false,
        auth: {
          user: 'eefd3bbb134a31',
          pass: '878b3689f5c8d2',
        },
      },

      defaults: {
        from: '"No Reply" <no-reply@localhost>',
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
