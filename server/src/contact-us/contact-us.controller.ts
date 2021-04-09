import { Body, Controller, Post } from '@nestjs/common';
import { ContactUsService } from './contact-us.service';
import { SendEmailDto } from './dto/send-email.dto';
import { SendShortEmailDto } from './dto/send-short-email.dto';

@Controller('/contactUs')
export class ContactUsController {
    constructor(private contactUsService: ContactUsService) { }

    @Post('/sendEmail')
    sendEmail(@Body() dto: SendEmailDto) {
        return this.contactUsService.sendEmail(dto);
    }

    @Post('/sendShortEmail')
    sendShortEmail(@Body() dto: SendShortEmailDto) {
        return this.contactUsService.sendShortEmail(dto);
    }
}
