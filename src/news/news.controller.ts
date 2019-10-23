import { Controller, Get, Post, Put, Body, Param, Delete } from '@nestjs/common';
import { ExNewsDto } from './dto/news.dto';
import { NewsService } from './news.service';
import { News } from './news.entity';

@Controller('api')
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @Post('newNews')
    async create(@Body() createNewsDto: ExNewsDto): Promise<ExNewsDto[]> {
        return  this.newsService.create(createNewsDto);
    }

    @Put('updateNews/:id')
    async updateNews(@Param('id') id, @Body() updateNewsDto: ExNewsDto): Promise<ExNewsDto[]> {
        return this.newsService.updateNews(id, updateNewsDto);
    }

    @Delete('deleteNews/:id')
    async deleteNews(@Param('id') id): Promise<ExNewsDto[]> {
        return this.newsService.deleteNews(id);
    }

    @Get('getNews')
    async getNews(): Promise<ExNewsDto[]> {
        return  this.newsService.getNews();
    }

}
