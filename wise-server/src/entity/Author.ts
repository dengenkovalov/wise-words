import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Phrase } from "./Phrase";

@Entity()
export class Author {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 50,
    })
    fullname: string

    @OneToMany(() => Phrase, (phrase) => phrase.author)
    phrases: Phrase[]
}
