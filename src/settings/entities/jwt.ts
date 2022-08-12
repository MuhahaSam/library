import { IsBoolean, IsInt, IsOptional, IsString, IsUrl } from 'class-validator';

export class JwtSecretKey {
    @IsString()
    access: string

    @IsString()
    refresh: string

}