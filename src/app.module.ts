import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { UserBookModule } from './user-book/user.book.module';
import { DbModule } from './db/db.module';
import { AccTokGuard } from './common/guards';
import { APP_GUARD } from '@nestjs/core';
import { AuthorController } from './author/author.controller';
import { AuthorService } from './author/author.service';
import { AuthorModule } from './author/author.module';

@Module({
  imports: [
    UserModule,
    BookModule,
    UserBookModule,
    DbModule,
    AuthorModule
  ],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: AccTokGuard,
  }],
})
export class AppModule {}
