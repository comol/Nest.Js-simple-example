import { Column, Model, Table } from 'sequelize-typescript';
import {json} from "sequelize";

@Table
export class News extends Model<News> {
    @Column
    username: string;

    @Column
    password: number;

    @Column
    firstName: string;

    @Column
    surName: string;

    @Column
    middleName: string;

    @Column
    img: string;

    @Column
    permission: string;

}
