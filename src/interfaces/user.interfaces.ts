export enum PermissionTypeEnum {
    'user',
    'admin'
  }

export interface Tokens {
  access: string
  refresh: string
}
export type Perms = 'admin' | 'user'
export interface JwtPayload {
  id: number
  email: string
  permission: Perms
  token?:string
}

export interface Auth {
  email: string
  password: string
}