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
import adminRouter from "./routes/admin.route.js"
import clientRouter from "./routes/client.route.js"
import leadRouter from "./routes/lead.route.js"
import productRouter from "./routes/product.route.js"

//routes declarations

//_______________________________ Admin _______________________________
app.use("/api/v1/admin", adminRouter)

//_______________________________ Lead _______________________________
app.use("/api/v1/lead", leadRouter)

//_______________________________ client _______________________________
app.use("/api/v1/client", clientRouter)

//_______________________________ product _______________________________
app.use("/api/v1/product", productRouter)

export { app }