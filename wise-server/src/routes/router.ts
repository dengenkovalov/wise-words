import * as express from "express"
import { postController } from "../controllers/post-controller"

const router = express.Router()

router.get('/', postController.getAll)
router.get('/post/:id', postController.getOne)
router.post('/add-post', postController.create)
router.put('/edit-post', postController.edit)
router.delete('/post/:id', postController.delete)

module.exports = router

