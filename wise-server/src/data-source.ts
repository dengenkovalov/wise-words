import "reflect-metadata"
import { DataSource } from "typeorm"
import { Author } from "./entity/Author"
import { Phrase } from "./entity/Phrase"

export const appDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "password",
    database: "dzen",
    synchronize: true,
    logging: false,
    entities: [Phrase, Author],
    migrations: [],
    subscribers: [],
})
