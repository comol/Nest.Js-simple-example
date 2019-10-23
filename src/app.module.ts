import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { NewsModule } from './news/news.module';
import { DatabaseModule } from './database/database.module';
import { MulterModule } from '@nestjs/platform-express';
import { EventsModule } from './events/events.module';


@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'dist'),
  }), UsersModule, NewsModule, DatabaseModule,
    MulterModule.register({
      dest: './dist/assets/img',
    }),
    EventsModule]
})
export class AppModule {}
