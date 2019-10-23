import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from '../database/database.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule, PassportModule, JwtModule.register({
    secret: '123',
    signOptions: { expiresIn: '60s' },
  })],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
