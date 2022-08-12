import { ForbiddenException, Injectable } from '@nestjs/common';
import { Book } from './entity/book.entitiy';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GenreBookTree } from '@/interfaces/book.interface';
import { BookInfo } from '@/interfaces/book.interface';
import { BookDTO } from './book.dto';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>
    ){}

    async genreBookTree(): Promise<GenreBookTree>{
        let gerneBookTree: GenreBookTree = 
        (await this.bookRepository
        .createQueryBuilder('book')
        .innerJoinAndSelect('book.author', 'author')
        .leftJoinAndSelect('book.userBooks', 'userBooks')
        .orderBy('book.name')
        .getMany())
        .reduce((tree, book)=>{
            if(!tree[book.genre]) tree[book.genre] = []
            tree[book.genre].push({
                name: book.name,
                id: book.id,
                isBookable: !book.isBooking,
                genre: book.genre,
                author:{
                    id: book.author.id,
                    firstName: book.author.firstName,
                    lastName: book.author.lastName,
                    middleNAme: book.author.middleName
                }
            })
            return tree
        }, {})
        return  gerneBookTree
    }
    
    async getBookByNameAndGenre(bookName: string, genre: string): Promise<BookInfo[]>{
        return (await this.bookRepository
            .createQueryBuilder('book')
            .innerJoinAndSelect('book.author', 'author')
            .leftJoinAndSelect('book.userBooks', 'userBooks')
            .where("(book.name like :bookName) and (book.genre = :genre)", {
                bookName: `%${bookName}%`,
                genre: genre
            })
            .orderBy('book.name')
            .getMany()).map(book=>{
                return {
                    name: book.name,
                    id: book.id,
                    isBookable: !book.isBooking,
                    genre: book.genre,
                    author:{
                        id: book.author.id,
                        firstName: book.author.firstName,
                        lastName: book.author.middleName,
                        middleNAme: book.author.middleName,

                    }
                }
            })
    }

    async getBookByNameAndAuthor(bookName: string, authorLN: string,  authorFN?: string, authorMN?: string): Promise<BookInfo[]>{
        const FNWherCondition: string = authorFN ? 'and (author.first_name like :authorFirstName)' : ''
        const MNWherCondition: string = authorMN ? 'and (author.middle_name like :authorMiddleName)' : ''
        return (await this.bookRepository
        .createQueryBuilder('book')
        .innerJoinAndSelect('book.author', 'author')
        .leftJoinAndSelect('book.userBooks', 'userBooks')
        .where(`
            (book.name like :bookName) and
            (
                (author.last_name like :authorLastName)
                ${FNWherCondition}
                ${MNWherCondition}
            )`, 
        {
            bookName: `%${bookName}%`,
            authorLastName:  `%${authorLN}%`,
            authorFirstName: `%${authorFN}%`,
            authorMiddleNAme: `%${authorMN}%`
        })
        .getMany()).map(book=>{
            return {
                name: book.name,
                id: book.id,
                isBookable: !book.isBooking,
                genre: book.genre,
                author:{
                    id: book.author.id,
                    firstName: book.author.firstName,
                    lastName: book.author.middleName,
                    middleNAme: book.author.middleName
                }
            }
        })
    }

    async putNewBook(book: BookDTO){
        return (await this.bookRepository.save(book).catch(e=>{
            if (e.code === '23505') throw new ForbiddenException('such book is exist')
        }))
    }
}
