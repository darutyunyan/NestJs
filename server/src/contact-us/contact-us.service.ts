import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';
import { SendShortEmailDto } from './dto/send-short-email.dto';
import { SentMessageInfo } from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ContactUsService {

    constructor(
        private mailerService: MailerService,
        private configService: ConfigService) { }

    async sendEmail(dto: SendEmailDto): Promise<SentMessageInfo> {
        return await this.mailerService
            .sendMail({
                to: this.configService.get('MAIL_TO'),
                from: this.configService.get('MAIL_FROM'),
                subject: this.configService.get('MAIL_SUBJECT'),
                html: `
                <p>Имя: ${dto.name}
                <br>Почта: ${dto.email}
                <br>Телефон: ${dto.phone}
                <br>Позиции продуктов: ${dto.productPosition}</p>`,
            });
    }

    async sendShortEmail(dto: SendShortEmailDto) {
        return await this.mailerService
            .sendMail({
                to: this.configService.get('MAIL_TO'),
                from: this.configService.get('MAIL_FROM'),
                subject: this.configService.get('MAIL_SHORT_SUBJECT'),
                html: `
            <p>Имя: ${dto.name}
            <br>Телефон: ${dto.phone}
            <br>Дополнительная информация: ${dto.message}</p>`,
            });
    }
}