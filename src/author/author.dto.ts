import {
    IsInt, 
    IsOptional, 
    IsString, 
    IsEmail,
    IsEnum,
    IsDefined
} from 'class-validator';

export class AuthorDTO {
    @IsDefined()
    @IsString()
    lastName: string

    @IsOptional()
    @IsString()
    firstName?: string

    @IsOptional()
    @IsString()
    middleName?: string
}

export class CreateAuthorDTO{
    @IsString()
    lastName: string

    @IsString()
    firstName: string

    @IsOptional()
    @IsString()
    middleName?: string

}