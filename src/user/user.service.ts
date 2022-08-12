import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/user/entity/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { 
    Tokens,
    JwtPayload,
    Auth
 } from '@/interfaces/user.interfaces';
import settings from '@/settings';
import { LIB } from '@/consts';
import { ForbiddenException } from '@nestjs/common';
import { UserDTO } from './user.dto';
import * as argon from 'argon2'
import { Perms } from '@/interfaces/user.interfaces';



@Injectable()
export class UserService {
  constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
      private readonly jwtService: JwtService
  ){}
  

  async register(user: UserDTO): Promise<Tokens>{

    user.password = await argon.hash(user.password)

    user.permission = user.adminSecretKey === settings.adminSecretKey ? 'admin' : 'user'
    delete user.adminSecretKey
    const createdUser = await this.userRepository.save(user)
    .catch(err=>{
      if (err.code === '23505') throw new ForbiddenException('Credentials incorrect')
      throw err
    })

    const tokens = await this.getJwtTokens(createdUser.id, createdUser.email, createdUser.permission);

    const hashedResfrToken = await argon.hash(tokens.refresh)
    await this.userRepository
    .update(
      { id:createdUser.id}, 
      { refreshToken: hashedResfrToken })
    return tokens
  }

  async login(auth: Auth, admin: boolean = false):Promise<Tokens>{
    const savedUser: User = await this.userRepository.findOne({where:{
      email: auth.email
    }})

    if (!savedUser) throw new ForbiddenException('Access Denied')

    if (admin && savedUser.permission !== 'admin') throw new ForbiddenException('Access Denied')
    
    const passwordMatches = await argon.verify(savedUser.password, auth.password)
    if (!passwordMatches) throw new ForbiddenException('Access Denied')
    const tokens = await this.getJwtTokens(savedUser!.id, savedUser.email, savedUser.permission)

    const hashedResfrToken: string = await argon.hash(tokens.refresh )
    await this.userRepository
    .update(
      { id:savedUser.id}, 
      { refreshToken: hashedResfrToken })
    return tokens
  }

  async logOut(id: number): Promise<boolean>{
    await this.userRepository.update(
      { id:id },
      { refreshToken: null }) 
    return true
  }

  async refreshToken(userId: number, refrToken: string){
    const savedUser: User = await this.userRepository.findOne({where:{
      id: userId
    }})

    if (!savedUser || !savedUser.refreshToken) throw new ForbiddenException('Access Denied')

    const refrTokenMatch: boolean = await argon.verify(savedUser.refreshToken, refrToken)
    if (!refrTokenMatch) throw new ForbiddenException('Access Denied')

    const tokens: Tokens = await this.getJwtTokens(savedUser.id, savedUser.email, savedUser.permission)

    await this.userRepository.update({ id:savedUser.id }, {refreshToken: await argon.hash(tokens.refresh)})
    return tokens
      
  }


  async getJwtTokens(userId: number, email: string, permission: Perms): Promise<Tokens>{
      const jwtPayload: JwtPayload = {
          id: userId,
          email: email,
          permission: permission
      }

      const [accToken, refrToken] : string[] = await Promise.all([
          this.jwtService.signAsync(jwtPayload, {
            secret: settings.jwtKeys.access,
            expiresIn: '20m',
          }),
          this.jwtService.signAsync(jwtPayload, {
            secret: settings.jwtKeys.refresh,
            expiresIn: '7d',
          }),
        ]);

      return {
          access: accToken,
          refresh: refrToken
      }
  }
}
