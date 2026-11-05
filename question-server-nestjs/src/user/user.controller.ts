import { Controller, HttpException, HttpStatus, Post, Body, Get, Redirect } from '@nestjs/common';
import { UserService } from './user.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { Public } from '../auth/decorators/public.decorator.js';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Public()
    @Post('register')
    async register(@Body() userDto: CreateUserDto){
        try{
            return await this.userService.create(userDto)
        }catch(err:any){
            throw new HttpException(err,HttpStatus.BAD_REQUEST)
        }
    }

    @Get('info')
    @Redirect('/api/auth/profile',302)//状态码 get -301永久 - 302 临时
    async info(){
        return
    }

    @Public()
    @Post('login')
    @Redirect('/api/auth/login', 307)//状态码 post -308永久 - 307 临时
    async login(){
        return
    }
}
