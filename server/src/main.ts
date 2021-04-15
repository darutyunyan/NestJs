import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

const start = async () => {
    try {
        const PORT = process.env.PORT || 5000;
        const app = await NestFactory.create(AppModule);

        // Cors.
        app.enableCors();

        app.useGlobalPipes(new ValidationPipe());
        
        // Helmet;
        app.use(helmet());

        await app.listen(PORT);
    } catch (e) {
        console.log(e)
    }
}

start();
