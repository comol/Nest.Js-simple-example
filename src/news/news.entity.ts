import { Column, Model, Table } from 'sequelize-typescript';
import {json} from "sequelize";

@Table
export class News extends Model<News> {

    @Column
    text: string;

    @Column
    theme: string;

    @Column
    date: string;

    @Column
    user: number;

}
