import { appDataSource } from "../data-source";
import { Phrase } from "../entity/Phrase";
import { Request, Response } from "express"
import {Author} from "../entity/Author";

class PostController {

    async getAll(req: Request, res: Response) {
        const phrases = await appDataSource.getRepository(Phrase).find({
            relations: { author: true },
        })

        return res.json(phrases)
    }

    async getOne(req: Request, res: Response) {
        const phrases = await appDataSource.getRepository(Phrase).findOne({
            relations: { author: true },
            where: { id: req.params.id },
        })

        return res.send(phrases)
    }

    async create(req: Request, res: Response) {
        const newPhrase = new Phrase()
        newPhrase.phrase = req.body.phrase

        const isAuthor = await appDataSource.getRepository(Author).findOneBy({
            fullname: req.body.fullname,
        })

        if (isAuthor === null) {
            const newAuthor = new Author()
            newAuthor.fullname = req.body.fullname
            await appDataSource.getRepository(Author).save(newAuthor)
            newPhrase.author = newAuthor
        } else {
            newPhrase.author = isAuthor
        }

        await appDataSource.getRepository(Phrase).save(newPhrase)

        return res.json(newPhrase)
    }

    async edit(req: Request, res: Response) {
        const editedPhrase = await appDataSource.getRepository(Phrase).findOne({
            relations: { author: true },
            where: { id: req.body.id },
        })
        editedPhrase.phrase = req.body.phrase

        if (editedPhrase.author.fullname !== req.body.fullname) {
            const isAuthor = await appDataSource.getRepository(Author).findOneBy({
                fullname: req.body.fullname,
            })

            if (isAuthor === null) {
                const newAuthor = new Author()
                newAuthor.fullname = req.body.fullname
                await appDataSource.getRepository(Author).save(newAuthor)
                editedPhrase.author = newAuthor
            } else {
                editedPhrase.author = isAuthor
            }
        }

        await appDataSource.getRepository(Phrase).save(editedPhrase)

        return res.send(editedPhrase)
    }

    async delete(req: Request, res: Response) {
        const phrase = await appDataSource.getRepository(Phrase).delete(req.body.id)

        return res.send(phrase)
    }

}

export const postController = new PostController()