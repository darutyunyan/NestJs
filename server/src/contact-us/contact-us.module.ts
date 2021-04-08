import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ContactUsController } from './contact-us.controller';
import { ContactUsService } from './contact-us.service';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        MailerModule.forRootAsync({
            imports: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                transport: `smtps://${config.get('MAIL_FROM')}:${config.get('MAIL_FROM_PASS')}@${config.get('MAIL_SMTP_CLIENT')}`,
                template: {
                    dir: __dirname + '/templates',
                    adapter: new PugAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
            inject: [ConfigService]
        }),
    ],
    controllers: [ContactUsController],
    providers: [ContactUsService]
})
export class ContactModule { }