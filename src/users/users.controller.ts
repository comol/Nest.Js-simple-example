import { Controller, Get, Post, Body } from '@nestjs/common';
import { ExUserDto } from './dto/ex-user.dto';
import { ExLoginDto } from './dto/ex-login.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('api')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('saveNewUser')
    async create(@Body() createUserDto: ExUserDto): Promise<User> {
        return  this.usersService.create(createUserDto);
    }

    @Post('login')
    async login(@Body() createLoginDto: ExLoginDto): Promise<User> {
        return  this.usersService.login(createLoginDto);
    }
}
