
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BusinessException } from './business.exception';
import { MongoError } from 'mongodb';
@Catch(HttpException, MongoError)
export class HttpExceptionFilter implements ExceptionFilter {

    constructor(private configService: ConfigService) { }

    catch(exception: HttpException | MongoError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        // Status code.
        let status: number;
        if (exception instanceof BusinessException ||
            exception instanceof MongoError) {
            status = Number(this.configService.get<number>('BUSINESS_ERROR'));
        }

        if (exception instanceof HttpException) {
            status = exception.getStatus();
        }

        // Error message.
        const message: string = exception instanceof BusinessException ?
            exception.message :
            this.configService.get('INTERNAL_SERVER_ERROR');

        response
            .status(status)
            .json({
                status: status,
                message: message
            });
    }
}