import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { Get, Query} from '@nestjs/common';
import { BookService } from './book.service';
import { GenreBookTree } from '@/interfaces/book.interface';
import { AuthorBookNameDTO, BookDTO } from './book.dto';
import { BookInfo } from '@/interfaces/book.interface';
import RoleGuard from '@/common/roles/role.decorator';
import { GetCurrentUserId } from '@/common/decorators';

@Controller('book')
export class BookController {
    constructor(
        private readonly bookService: BookService
    ){}

    @Get('genre-book-tree')
    getGenreBookTree(): Promise<GenreBookTree>{
        return this.bookService.genreBookTree()
    }

    @Get('by-name-author')
    getBookByNameAndAuthor(@Query() query: AuthorBookNameDTO): Promise<BookInfo[]>{
        return this.bookService.getBookByNameAndAuthor(query.bookName, query.authorLastName, query.authorFirstName, query.authorMiddleName)
    }

    @Put('book')
    @UseGuards(RoleGuard('admin'))
    async putNewBook(@Body() body: BookDTO, @GetCurrentUserId() adminId:number){
        return this.bookService.putNewBook(body, adminId)
    }

}
