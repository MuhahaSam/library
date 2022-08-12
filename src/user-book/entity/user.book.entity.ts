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
import { Book } from "src/book/entity/book.entitiy";
import { User } from "src/user/entity/user.entity";

@Index("user_book_pkey", ["id"], { unique: true })
@Entity('user_book', {schema: 'public'})
export class UserBook {
    @PrimaryGeneratedColumn({ type: "integer", name: "id" })
    id?: number;

    @ManyToOne(() => User, (user) => user.userBooks, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    })
    @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
    user?: User;
  
    @Column("integer", { name: "user_id", nullable: false })
    userId: number;

    @ManyToOne(() => Book, (book) => book.userBooks, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    })
    @JoinColumn([{ name: "book_id", referencedColumnName: "id" }])
    book?: Book;

    @Column("integer", { name: "book_id", nullable: false })
    bookId: number;

    @Column("timestamp with time zone", {name:"request_date", nullable: false})
    requestDate: Date

    @Column("timestamp with time zone", { name: "issuance_date", nullable: true })
    issuanceDate?: Date;

    @Column("timestamp with time zone", { name: "reject_date", nullable: true })
    rejectDate?: Date;

    @Column("timestamp with time zone", { name: "planned_receiving_date", nullable: true })
    plannedReceivingDate?: Date;

    @Column("timestamp with time zone", { name: "real_receiving_date", nullable: true })
    realReceivingDate?: Date;

    @ManyToOne(() => User, (user) => user.userBooksAdmin, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    })
    @JoinColumn([{ name: "admin_id", referencedColumnName: "id" }])
    admin?: User;

    @Column("integer", { name: "admin_id", nullable: false })
    adminId?: number;
}