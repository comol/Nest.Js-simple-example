import { Controller, Get, Post, Put, Body, Param, Delete } from '@nestjs/common';
import { ExNewsDto } from './dto/news.dto';
import { NewsService } from './news.service';
import { News } from './news.entity';

@Controller('api')
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @Post('newNews')
    async create(@Body() createUserDto: ExNewsDto): Promise<News> {
        return  this.newsService.create(createUserDto);
    }

    @Put('updateNews/:id')
    async updateNews(@Param('id') id, @Body() updateNewsDto: ExNewsDto): Promise<News> {
        return this.newsService.updateNews(id, updateNewsDto);
    }

    @Put('deleteNews/:id')
    async deleteNews(@Param('id') id) {
        await this.newsService.deleteNews(id);
    }

    @Get('getNews')
    async getUsers(): Promise<News[]> {
        return  this.newsService.getNews();
    }

}
