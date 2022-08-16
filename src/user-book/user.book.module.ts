import { Module } from '@nestjs/common';
import { UserBookService } from './user.book.service';
import { UserBookController } from './user.book.controller';
import { UserModule } from '@/user/user.module';
@Module({
    imports:[ UserModule ],
    providers:[UserBookService],
    controllers: [UserBookController]
})
export class UserBookModule {}
