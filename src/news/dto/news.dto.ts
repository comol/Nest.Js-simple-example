import {json} from "sequelize";

export class ExNewsDto {
    id: number;
    text: string;
    theme: string;
    date: string;
    userid: number;
    user: Object;
}
