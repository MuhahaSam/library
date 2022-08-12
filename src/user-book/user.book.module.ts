import { Module } from '@nestjs/common';
import { UserBookService } from './user.book.service';
import { UserBookController } from './user.book.controller';
@Module({
    providers:[UserBookService],
    controllers: [UserBookController]
})
export class UserBookModule {}
