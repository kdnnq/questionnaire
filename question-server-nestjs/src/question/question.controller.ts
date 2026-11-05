import { Body, Controller, Get, HttpException, HttpStatus, Patch,  Post,  Query, Param, Delete, Request } from '@nestjs/common';
import { QuestionDto } from './dto/question.dto.js';
import { QuestionService } from './question.service.js';
import { Public } from '../auth/decorators/public.decorator.js';

@Controller('question')
export class QuestionController {
    constructor(
        private readonly questionService: QuestionService,
    ){}
    @Get('test')
    getTest(): string{
        throw new HttpException('获取数据失败', HttpStatus.BAD_REQUEST)
    }

    @Post()
    create(@Request() req: any){
        const {username} = req.user;
        return this.questionService.create(username)
    }

    @Get()
    async findAll(
        @Query('keyword') keyword: string,
        @Query('page') page: number,
        @Query('pageSize') pageSize: number,
        @Query('isDeleted') isDeleted: boolean = false,
        @Query('isStar') isStar: boolean | undefined = undefined,
        @Request() req: any,
    ){
        const {username} = req.user;
        const list = await this.questionService.findAllList({
            keyword,
            page,
            pageSize,
            isDeleted, 
            isStar, 
            author: username
        })
        const count = await this.questionService.countAll({
            keyword,
            isDeleted, 
            isStar, 
            author: username
        })
        return {
            list,
            total: count,
        }
    }

    @Public()
    @Get(':id')
    findOne(@Param('id') id: string){
        return this.questionService.findOne(id)
    }

    //更新
    @Patch(':id')
    updataOne(@Param('id') id: string, @Body() questionDto: QuestionDto, @Request() req:any){
        const {username} = req.user
        return this.questionService.update(id, questionDto, username)
    }
    //删除一个
    @Delete(':id')
    deleteOne(@Param('id') id: string, @Request() req:any){
        const {username} = req.user
        return this.questionService.delete(id,username)
    }
    //删除多个
    @Delete()
    deleteMany(@Body() body: any, @Request() req:any){
        const {username} = req.user
        const {ids = []} = body
        return this.questionService.deleteMany(ids,username)
    }

    //复制
    @Post('duplicate/:id')
    duplicate(@Param('id') id: string, @Request() req:any){
        const {username} = req.user
        return this.questionService.duplicate(id,username)
    }
}
