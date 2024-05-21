import connectToDatabase from "./database/index.js"
import colors from "colors"
import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

import {app} from "./app.js"

connectToDatabase()
.then( () => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️  Server is running at port : ${process.env.PORT} `.bgMagenta.underline);
    })
})
.catch((error) => {
    console.log(colors.red("MongoDB connection FAILED"), error);
})

