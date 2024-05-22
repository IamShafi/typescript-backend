import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// Enable parsing of JSON data in the request body
app.use(express.json({limit: "16kb"}))
// Enable parsing of URL-encoded data in the request body
app.use(express.urlencoded({extended: true, limit: "16kb"}))
// Serve static files from the "public" directory
app.use(express.static("public"))
// Parse cookies from incoming requests
app.use(cookieParser())

//routes import
import userRouter from "./routes/user.route.js"

//routes declarations

//_______________________________ User _______________________________
app.use("/api/v1/user", userRouter)

//_______________________________ products _______________________________


//_______________________________ transactions _______________________________
// app.use("/api/v1/transactions", transactionsRouter)

//_______________________________ sales _______________________________
// app.use("/api/v1/sales", salesRouter)

export { app }