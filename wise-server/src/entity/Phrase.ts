import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Author } from "./Author";

@Entity()
export class Phrase {

    @PrimaryGeneratedColumn()
    id: number

    @Column("text")
    phrase: string

    @ManyToOne(() => Author, (author) => author.phrases)
    author: Author
}
