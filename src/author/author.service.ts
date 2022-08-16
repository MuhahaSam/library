import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entity/author.entity'
import { UserService } from '@/user/user.service';

@Injectable()
export class AuthorService {
    constructor (
        @InjectRepository(Author)
        private readonly authorRepository: Repository<Author>,

        private readonly userService: UserService
    ){}

    async getAuthorByFullName(lastName: string, firstName?: string, middleName?: string): Promise<Author[]>{
        const firstNameWhereCondition: string = firstName ? 'and author.first_name like :firstName' :''
        const MidNameWhereCondition: string = middleName ? 'and author.middle_name like :middleName' :''
        return (await this.authorRepository
            .createQueryBuilder('author')
            .where(`author.last_name like :lastName ${firstNameWhereCondition} ${MidNameWhereCondition}`, {
                lastName: `%${lastName}%`,
                firstName: `%${firstName}%`,
                middleName: `%${middleName}%`,
            })
            .getMany())
    }

    async putNewAuthor(author: Author, adminId): Promise<Author>{
        this.userService.isAdmin(adminId)
        return await this.authorRepository.save(author)
    }
}
