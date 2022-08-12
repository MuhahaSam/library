import { IsBoolean, IsInt, IsOptional, IsString, IsUrl } from 'class-validator';

export class Db {
    @IsUrl({
        require_tld: false,
    })
    public host: string;

    @IsInt()
    public port: number;

    @IsString()
    public username: string;

    @IsString()
    public password: string;

    @IsString()
    public database: string;
}