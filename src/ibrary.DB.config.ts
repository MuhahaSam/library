import { DataSourceOptions } from "typeorm";
import { User } from 'src/user/entity/user.entity';
import { Book } from 'src/book/entity/book.entitiy';
import { UserBook } from '@/user-book/entity/user.book.entity';
import { Author } from "./author/entity/author.entity";
import settings from '@/settings';
export const libDataSourceOtions : DataSourceOptions = {
    host: settings.DB.host,
    type: 'postgres',
    port: settings.DB.port,
    username: settings.DB.username,
    password: settings.DB.password,
    database: settings.DB.database,
    synchronize: false,
    logging: false,
    entities:[
        User,
        Book,
        UserBook,
        Author
    ]
}