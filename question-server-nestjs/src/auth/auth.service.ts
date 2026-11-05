import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ){}

    async singIn(username: string, password: string){
        const user = await this.userService.findOne(username,password)
        if(!user){
            throw new UnauthorizedException('用户名或者密码错误')
        }
        const {password: p, ...userInfo} = user.toObject()
        return {
            token: await this.jwtService.sign(userInfo),
        };
    }
}
