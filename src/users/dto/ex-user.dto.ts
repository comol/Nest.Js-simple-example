import {json} from "sequelize";

export class ExUserDto {
    readonly username: string;
    readonly password: number;
    readonly firstName: string;
    readonly surName: string;
    readonly middleName: string;
    readonly img: string;
    readonly permission: Object;
}
