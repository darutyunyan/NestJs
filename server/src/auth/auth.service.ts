import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user/user.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne(username);
        const isMatch = (user != null) ?
            await bcrypt.compare(password, user.password) :
            false;
        if (isMatch) {
            return {
                userId: user._id,
                userName: user.username
            };
        }
        return null;
    }

    async login(user: any) {
        const payload = {
            userId: user.userId,
            username: user.userName
        };
        
        return {
            liveTime: this.configService.get('JWT_EXPIRATION_TIME'),
            token: this.jwtService.sign(payload)
        };
    }
}