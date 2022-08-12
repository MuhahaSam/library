import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { libDataSourceOtions } from 'src/ibrary.DB.config';
import { User } from 'src/user/entity/user.entity';
import { Book } from 'src/book/entity/book.entitiy';
import { UserBook } from '@/user-book/entity/user.book.entity';
import { LIB } from '@/consts';
import { Author } from '@/author/entity/author.entity';
@Global()
@Module({
    imports:[
        TypeOrmModule.forRoot(libDataSourceOtions),
        TypeOrmModule.forFeature([
            User,
            Book,
            UserBook,
            Author
        ])
    ],
    exports:[TypeOrmModule]
})
export class DbModule {}

