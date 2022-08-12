import {
    IsOptional, 
    IsString,
    IsInt
} from 'class-validator';

export class AuthorBookNameDTO {

    @IsString()
    bookName: string

    @IsString()
    authorLastName: string

    @IsOptional()
    @IsString()
    authorFirstName?: string

    @IsOptional()
    @IsString()
    authorMiddleName?: string

}

export class BookIdDTO {
    @IsInt()
    bookId: number
}

export class BookDTO {

    @IsString()
    genre: string;

    @IsString()
    name: string;
  
    @IsInt()
    authorId: number;
  
    @IsInt()
    isbn: number;
  }