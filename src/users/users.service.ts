import { User } from './user.entity';
import { ExUserDto } from './dto/ex-user.dto';
import {ExLoginDto} from "./dto/ex-login.dto";

export class UsersService {

    async create(exUserDto: ExUserDto): Promise<User> {
        const user = new User();
        user.firstName = exUserDto.firstName;
        user.img = exUserDto.img;
        user.middleName = exUserDto.middleName;
        user.password = exUserDto.password;
        user.surName = exUserDto.surName;
        user.username = exUserDto.username;
        user.permission = JSON.stringify(exUserDto.permission);
        return user.save();
    }

    async login(exLoginDto: ExLoginDto): Promise<User> {
        return  User.findOne({where:{username: exLoginDto.login, password: exLoginDto.password}});
    }

    async findAll(): Promise<User[]> {
        return User.findAll<User>();
    }
}
