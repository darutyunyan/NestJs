import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne(username, password);
        if (user && user.password === password) {
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
            access_token: this.jwtService.sign(payload),
        };
    }
}