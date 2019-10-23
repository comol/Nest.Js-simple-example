import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from "typeorm";
import * as bycrypt from 'bcrypt';

@Entity()
@Unique(['username'])
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    type: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    // @OneToMany(type => Task, task => task.user, { eager: true })
    // tasks: Task[];

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bycrypt.hash(password, this.salt)
        return hash === this.password;
    }
}