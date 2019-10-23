import {json} from "sequelize";

export class ExUserDto {
    id: number;
    username: string;
    password: string;
    firstName: string;
    surName: string;
    middleName: string;
    img: string;
    image: string;
    access_token: string;
    permission: Object;
    permissionId: string;
}
