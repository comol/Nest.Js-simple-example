import {
    Controller,
    Get,
    Post,
    Put,
    Body,
    Param,
    Delete,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { ExUserDto } from './dto/ex-user.dto';
import { UsersService } from './users.service';
import {FileInterceptor} from '@nestjs/platform-express';


@Controller('api')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Post('saveNewUser')
    async create(@Body()  createUserDto: ExUserDto): Promise<ExUserDto> {
        return await this.usersService.create(createUserDto);
    }

    @Post('login')
    async login(@Body() createLoginDto: ExUserDto): Promise<ExUserDto> {
        return  this.usersService.login(createLoginDto);
    }

    @Post('authFromToken')
    async authFromToken(@Body() createLoginDto: ExUserDto): Promise<ExUserDto> {
        return  this.usersService.authFromToken(createLoginDto);
    }

    @Put('updateUser/:id')
    async updateUser(@Param('id') id, @Body() updateUserDto: ExUserDto): Promise<ExUserDto> {
        return this.usersService.updateUser(id, updateUserDto);
    }

    @Delete('deleteUser/:id')
    async deleteUser(@Param('id') id) {
        await this.usersService.deleteUser(id);
    }

    //TODO - Сохранение иозображений как с фронта получаются изображения
    @UseInterceptors(FileInterceptor('file'))
    @Post('saveUserImage/:id')
    async saveUserImage(@UploadedFile() file, @Param('id') id): Promise<string> {

        return  this.usersService.saveUserImage(id, file);
    }

    @Get('getUsers')
    async getUsers(): Promise<ExUserDto[]> {
        return  this.usersService.getUsers();
    }

    @Put('updateUserPermission/:id')
    async updateUserPermission(@Param('id') id, @Body() createUserDto: ExUserDto):Promise<ExUserDto> {
        return this.usersService.updateUserPermission(id, createUserDto);
    }


}
