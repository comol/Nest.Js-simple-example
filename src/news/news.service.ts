import { News } from './news.entity';
import { ExNewsDto } from './dto/news.dto';
import { User } from '../users/user.entity';


export class NewsService {


    static async  getAllNews(): Promise<ExNewsDto[]>
{
    let nw:News[] = await News.findAll();
    let nwdto:ExNewsDto[] = new Array();
    for (let i:number = 0; i < nw.length; i++)
    {
        let nwdtoitem = new ExNewsDto();
        nwdtoitem.theme = nw[i].theme;
        nwdtoitem.date = nw[i].date;
        nwdtoitem.text = nw[i].text;
        nwdtoitem.id   = nw[i].id;
        let usr:User = await User.findByPk(nw[i].user);

        // Если новость без пользователя
        try {
            // @ts-ignore
            nwdtoitem.user = usr.dataValues;
        }
        catch (e) {
            nwdtoitem.user = 0;
        }

        nwdto.push(nwdtoitem);
    }
    return nwdto;
}

    async create(exNewsDto: ExNewsDto): Promise<ExNewsDto[]> {
        const news = new News();
        news.text = exNewsDto.text;
        news.date = exNewsDto.date;
        news.user = exNewsDto.userid;
        news.theme = exNewsDto.theme;
        await news.save();

        return NewsService.getAllNews();
    }


    async getNews(): Promise<ExNewsDto[]> {
        return NewsService.getAllNews();
    }

    async deleteNews(id: number): Promise<ExNewsDto[]> {
        let news:News = await News.findByPk(id);
        await news.destroy();
        return NewsService.getAllNews();
    }

    async updateNews(id: number, updateNewsDto: ExNewsDto): Promise<ExNewsDto[]> {
        await News.update(
            { text: updateNewsDto.text,
                    date: updateNewsDto.date,
                    user: updateNewsDto.userid,
                    theme: updateNewsDto.theme
                    },
            { where: { _id: id } }
        );
        return NewsService.getAllNews();
    }

}
