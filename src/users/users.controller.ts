import { Controller, Get, Post, Put, Body, Param, Delete } from '@nestjs/common';
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

    //TODO разобраться с авторизацией
    @Post('login')
    async login(@Body() createLoginDto: ExLoginDto): Promise<User> {
        return  this.usersService.login(createLoginDto);
    }

    //TODO разобраться с авторизацией
    @Post('authFromToken')
    async authFromToken(@Body() createLoginDto: ExLoginDto): Promise<User> {
        return  this.usersService.authFromToken(createLoginDto);
    }

    @Put('updateUser/:id')
    async updateUser(@Param('id') id, @Body() updateUserDto: ExUserDto): Promise<User> {
        return this.usersService.updateUser(id, updateUserDto);
    }

    @Delete('deleteUser/:id')
    async deleteUser(@Param('id') id) {
        await this.usersService.deleteUser(id);
    }

    //TODO - Сохранение иозображений как с фронта получаются изображения
    @Post('saveUserImage/:id')
    async saveUserImage(@Param('id') id): Promise<string> {
        return  this.usersService.saveUserImage(id);
    }

    @Get('getUsers')
    async getUsers(): Promise<User[]> {
        return  this.usersService.getUsers();
    }

    @Put('updateUserPermission/:id')
    async updateUserPermission(@Param('id') id, @Body() createUserDto: ExUserDto) {
        await this.usersService.updateUserPermission(id, createUserDto);
    }


}
