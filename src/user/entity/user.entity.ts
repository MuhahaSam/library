import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    OneToMany,
    Unique,
    Index
  } from "typeorm";
import { PermissionTypeEnum } from "src/interfaces/user.interfaces";
import { UserBook } from "@/user-book/entity/user.book.entity";

@Index("unique_email", ["email"], { unique: true })
@Index("user_pkey", ["id"], { unique: true })
@Entity('user', {schema: 'public'})
// @Unique("unique_passport_number", ["passport_series", "passport_number"])
export class User {
    @PrimaryGeneratedColumn({ type: "integer", name: "id" })
    id?: number;
  
    @Column("text", { name: "first_name", nullable: false })
    firstName: string;
  
    @Column("text", { name: "last_name", nullable: false })
    lastName: string;

    @Column("text", { name: "middle_name", nullable: true })
    middleName: string;

    @Column("text", { name: "email", nullable: false, unique: true })
    email: string;

    @Column("text", { name: "password", nullable: false })
    password: string;

    @Column("integer", { name: "passport_series", nullable: false })
    passportSeries: number;

    @Column("integer", { name: "passport_number", nullable: false })
    passportNumber: number;

    @Column({
      type:"enum",
      enum: PermissionTypeEnum,
      name:"permission", 
      nullable:false
    })
    permission: 'admin' | 'user';

    @Column("text", { name: "refresh_token", nullable: false })
    refreshToken?: string;

    @OneToMany(() => UserBook, (userBook) => userBook.user)
    userBooks?: UserBook[];

    @OneToMany(() => UserBook, (userBook) => userBook.admin)
    userBooksAdmin?: UserBook[];

    @Column("timestamp with time zone", { name: "deleted_at", nullable: true })
    deletedAt?: Date;
}