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
import { Book } from "@/book/entity/book.entitiy";

@Index("aithor_pkey", ["id"], { unique: true })
@Index("uniq_author", ["firstName", "lastName", "middleName"], { unique: true })
@Entity('author', {schema: 'public'})
export class Author {
    @PrimaryGeneratedColumn({ type: "integer", name: "id" })
    id?: number;

    @Column("text", { name: "first_name", nullable: false })
    firstName: string;
  
    @Column("text", { name: "last_name", nullable: false })
    lastName: string;

    @Column("text", { name: "middle_name", nullable: true })
    middleName?: string;

    @OneToMany(() => Book, (book) => book.author)
    books?: Book[];
   
}