import { User } from './user.entity';
import { ExUserDto } from './dto/ex-user.dto';
import {ExNewsDto} from "../news/dto/news.dto";
import {News} from "../news/news.entity";
import {UploadedFile} from "@nestjs/common";

export class UsersService {


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
        exuser.access_token = "123";
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
        return UsersService.transformuser(user);
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

        exLoginDto.access_token = "123";

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

    async authFromToken(createLoginDto: ExUserDto) {
        return undefined;
    }
}
