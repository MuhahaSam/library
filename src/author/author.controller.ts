import { Controller, Put, Get , Query, UseGuards, Body} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDTO } from './author.dto';
import { AuthorDTO } from './author.dto';
import { Author } from './entity/author.entity';
import RoleGuard from '@/common/roles/role.decorator';
import { GetCurrentUserId } from '@/common/decorators';

@Controller('author')
export class AuthorController {
    constructor(
        private readonly authorService: AuthorService
    ){}

    @Get('byfullname')
    @UseGuards(RoleGuard('admin'))
    getAuthorByFullName(@Query() query:AuthorDTO): Promise<Author[]>{
        return this.authorService.getAuthorByFullName(query.lastName, query.firstName, query.middleName)
    }

    @Put('author')
    @UseGuards(RoleGuard('admin'))
    putNewAuthor(@Body() body: CreateAuthorDTO, @GetCurrentUserId() adminId: number):Promise<Author>{
        return this.authorService.putNewAuthor(body, adminId)
    }
}
