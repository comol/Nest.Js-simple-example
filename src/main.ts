import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Потому что на фронте JSON-ы передаются как Plain Text. А Nest.JS их не понимает! :(
  app.use(bodyParser.json({
    type: 'text/plain',
    limit: '500mb'
  }));

  await app.listen(3000);
}
bootstrap();

