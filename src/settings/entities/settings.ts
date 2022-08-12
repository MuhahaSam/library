import {Type} from 'class-transformer';
import {IsBoolean, IsDefined, IsOptional, IsString, IsUrl, ValidateNested} from 'class-validator';


import { Db } from './db';
import { JwtSecretKey } from './jwt';

export class Settings {
    @IsDefined()
    @Type(() => Db)
    @ValidateNested()
    DB : Db

    @IsDefined()
    @Type(() => JwtSecretKey)
    @ValidateNested()
    jwtKeys : JwtSecretKey

    @IsDefined()
    @IsString()
    normalizedBasePath: string

    @IsDefined()
    @IsString()
    adminSecretKey: string
}