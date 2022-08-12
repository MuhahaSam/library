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
import { UserBook } from "@/user-book/entity/user.book.entity";
import { Author } from "@/author/entity/author.entity";

@Index("book_pkey", ["id"], { unique: true })
@Index("book_isbn_key", ["isbn"], { unique: true })
@Entity('book', {schema: 'public'})
export class Book {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "genre", nullable: false })
  genre: string;

  @Column("text", { name: "name", nullable: false })
  name: string;

  @Column("int", { name: "author_id", nullable: false })
  authorId: number;

  @Column("bool", { name: "isbooking", nullable: false, default: false })
  isBooking: boolean;

  @Column("int", { name: "isbn", nullable: false, unique: true })
  isbn: number;

  @ManyToOne(() => Author, (author) => author.books, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "author_id", referencedColumnName: "id" }])
  author: Author;

  @OneToMany(() => UserBook, (userBook) => userBook.book)
  userBooks: UserBook[];
}