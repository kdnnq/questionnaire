import { Body, Controller, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { Post } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto.js';
import { Public } from './decorators/public.decorator.js';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Public()
    @Post('login')
    async login(@Body() userInfo:CreateUserDto){
        const {username, password} = userInfo
        return await this.authService.singIn(username, password )
    }

    @Get('profile')
    async getProfile(@Request() req:any){
        return req.user
    }
}
