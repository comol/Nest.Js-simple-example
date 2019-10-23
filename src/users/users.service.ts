import { User } from './user.entity';
import { ExUserDto } from './dto/ex-user.dto';
import {ExNewsDto} from "../news/dto/news.dto";
import {News} from "../news/news.entity";
import {UploadedFile} from "@nestjs/common";
import {JwtPayload} from "./jwt-payload.inteface";
import {JwtService} from "@nestjs/jwt";
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {

    constructor(
        private readonly jwtService: JwtService){}

    static transformuser(usr:User): ExUserDto
    {
        let exuser:ExUserDto = new ExUserDto();
        exuser.firstName = usr.firstName;
        exuser.img = usr.img;
        exuser.middleName = usr.middleName;
        exuser.password = usr.password;
        exuser.surName = usr.surName;
        exuser.username = usr.username;
        exuser.id = usr.id;
        exuser.permission = JSON.parse(usr.permission);
        exuser.permissionId = usr.id;
        exuser.access_token = "";
        return exuser;
    }

    static async  getAllUsers(): Promise<ExUserDto[]>
    {
        let usrs:User[] = await User.findAll();
        let usdto:ExUserDto[] = new Array();
        for (let i:number = 0; i < usrs.length; i++)
        {
            let exusrdto = UsersService.transformuser(usrs[i]);
            usdto.push(exusrdto);
        }
        return usdto;
    }
    async create(exUserDto: ExUserDto): Promise<ExUserDto> {
        const user = new User();
        user.firstName = exUserDto.firstName;
        user.img = exUserDto.img;
        user.middleName = exUserDto.middleName;
        user.password = exUserDto.password;
        user.surName = exUserDto.surName;
        user.username = exUserDto.username;
        //Сохраняем в строку и по умолчанию полные права
        user.permission = '{"chat":{"C":true,"R":true,"U":true,"D":true},"news":{"C":true,"R":true,"U":true,"D":true},"setting":{"C":true,"R":true,"U":true,"D":true}}';
        await user.save();
        let euser:ExUserDto = UsersService.transformuser(user);

        let username:string = user.username;
        const payload: JwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload);
        euser.access_token = accessToken;

        return euser;
    }

    async login(exLoginDto: ExUserDto): Promise<any> {

        //Так делать конечно не очень правильно, но фронт передаёт информацию
        let usr: User = await User.findOne({where:{username: exLoginDto.username, password: exLoginDto.password}});

        if (usr == null)
        {
            return null;
        }

        // На всякий случай т.к. линт не распознал тип
        try {
            // Не видит наследуемое свойство
            // @ts-ignore
            Object.assign(exLoginDto, usr.dataValues);
        }
        catch (e) {

        }

        let username:string = usr.username;
        const payload: JwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload);
        exLoginDto.access_token = accessToken;

        // Permission храним в string. Преобразуем в объект при чтении
        exLoginDto.permission = JSON.parse(exLoginDto.permission.toString());
        return exLoginDto;
    }

    async updateUserPermission(id: number, exUserDto: ExUserDto):Promise<ExUserDto> {
        let user:User = await User.findByPk(id);
        user.permission = JSON.stringify(exUserDto.permission);
        user.save();
        return UsersService.transformuser(user);
    }

    async getUsers(): Promise<ExUserDto[]> {
        return UsersService.getAllUsers();
    }

    async saveUserImage(id: number, @UploadedFile() file) {

        return file.name;
    }

    async deleteUser(id: number) {
        let user:User = await User.findByPk(id);
        await user.destroy();
    }

    async updateUser(id: number, updateUserDto: ExUserDto):Promise<ExUserDto> {

        let user:User = await User.findByPk(id);
        if(updateUserDto.firstName != null){user.firstName = updateUserDto.firstName}
        if(updateUserDto.middleName != null){user.middleName = updateUserDto.middleName}
        if(updateUserDto.password != null){user.password = updateUserDto.password}
        if(updateUserDto.surName != null){user.surName = updateUserDto.surName}
        await user.save();
        return UsersService.transformuser(user);
    }

    async authFromToken(createLoginDto: ExUserDto):Promise<ExUserDto> {

        let id:number = createLoginDto.id;
        let user:User = await User.findByPk(id);
        let username:string = user.username;
        const payload: JwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload);
        createLoginDto.access_token = accessToken;
        return createLoginDto;

    }
}
