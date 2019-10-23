import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.inteface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepositry } from './user.repository';
import { Users } from './user.entity';
import * as config from 'config';

const jwtConfig = config.get('jwt')

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepositry)
        private userRepositry: UserRepositry,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || jwtConfig.secret,
        })
    }

    async validate(payload: JwtPayload): Promise<Users> {
        const {username} = payload;
        const user = await this.userRepositry.findOne({ username });

        if (!user) { 
            throw new UnauthorizedException();
        }

        return user;
    }
}