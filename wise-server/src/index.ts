import { appDataSource } from "./data-source"
import * as express from "express"
const router = require("./routes/router")

appDataSource.initialize()
    .then(() => { console.log("Connected to DB...") })
    .catch((error) => {
        console.log(error)
    })

const PORT = 3000

const app = express()

app.use(express.json())
app.use(router)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
