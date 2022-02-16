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
          user: '4a13f331ad2295',
          pass: '542441adfedd07',
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
