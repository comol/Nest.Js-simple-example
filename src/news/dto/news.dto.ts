import {json} from "sequelize";

export class ExNewsDto {
    readonly username: string;
    readonly password: number;
    readonly firstName: string;
    readonly surName: string;
    readonly middleName: string;
    readonly img: string;
    readonly permission: Object;
}
