import { News } from './news.entity';
import { ExNewsDto } from './dto/news.dto';


export class NewsService {

    async create(exNewsDto: ExNewsDto): Promise<News> {
        const news = new News();
        news.firstName = exNewsDto.firstName;
        news.img = exNewsDto.img;
        news.middleName = exNewsDto.middleName;
        news.password = exNewsDto.password;
        news.surName = exNewsDto.surName;
        news.username = exNewsDto.username;
        return news.save();
    }


    async getNews(): Promise<News[]> {
        return News.findAll<News>() ;
    }

    async deleteNews(id: number) {
        let news:News = await News.findByPk(id);
        await news.destroy();
    }

    async updateNews(id: number, updateNewsDto: ExNewsDto) {
        await News.update(
            { permission: updateNewsDto.permission,
                    firstname: updateNewsDto.firstName,
                    img: updateNewsDto.img,
                    middleName: updateNewsDto.middleName,
                    password: updateNewsDto.password,
                    surName: updateNewsDto.surName,
                    username: updateNewsDto.username
                    },
            { where: { _id: id } }
        );
        return News.findByPk(id);
    }

}
