import { Column, Model, Table } from 'sequelize-typescript';
import {json} from "sequelize";

@Table
export class User extends Model<User> {
    @Column
    username: string;

    @Column
    password: string;

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
