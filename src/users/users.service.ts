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

    async updateUserPermission(id: number, exUserDto: ExUserDto) {
        return User.update(
            { permission: exUserDto.permission },
            { where: { _id: id } }
        );
    }

    async getUsers(): Promise<User[]> {
        return User.findAll<User>() ;
    }

    async saveUserImage(id: number) {
        return '';
    }

    async deleteUser(id: number) {
        let user:User = await User.findByPk(id);
        await user.destroy();
    }

    async updateUser(id: number, updateUserDto: ExUserDto) {
        await User.update(
            { permission: updateUserDto.permission,
                    firstname: updateUserDto.firstName,
                    img: updateUserDto.img,
                    middleName: updateUserDto.middleName,
                    password: updateUserDto.password,
                    surName: updateUserDto.surName,
                    username: updateUserDto.username
                    },
            { where: { _id: id } }
        );
        return User.findByPk(id);
    }

    async authFromToken(createLoginDto: ExLoginDto) {
        return undefined;
    }
}
