import {
    IsInt, 
    IsOptional, 
    IsString, 
    IsEmail,
    IsEnum,
    Length
} from 'class-validator';
import { PermissionTypeEnum, Perms } from '@/interfaces/user.interfaces';

export class UserDTO {
    @IsString()
    firstName: string;
  
    @IsString()
    lastName: string;

    @IsOptional()
    @IsString()
    middleName: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsInt()
    passportSeries: number;

    @IsInt()
    passportNumber: number;

    @IsOptional()
    @IsEnum(PermissionTypeEnum)
    permission: 'admin' | 'user'

    @IsOptional()
    @IsString()
    adminSecretKey?: string
}

export class AuthDTO{
    @IsEmail()
    email: string

    @IsString()
    password: string
}