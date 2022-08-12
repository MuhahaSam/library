import { DataSourceOptions } from "typeorm";
import { User } from 'src/user/entity/user.entity';
import { Book } from 'src/book/entity/book.entitiy';
import { UserBook } from '@/user-book/entity/user.book.entity';
import { Author } from "./author/entity/author.entity";

export const libDataSourceOtions : DataSourceOptions = {
    host: 'localhost',
    type: 'postgres',
    port: 5432,
    username: 'postgres',
    password: '24041127',
    database: 'library',
    synchronize: false,
    logging: false,
    entities:[
        User,
        Book,
        UserBook,
        Author
    ]
}