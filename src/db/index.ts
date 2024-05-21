import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = "backendtutorial"

let cached = { conn: null, promise: null };

const connectToDatabase = async () => {
    try {
        if (cached.conn) return cached.conn;
        // console.log(MONGODB_URI)

        if (!MONGODB_URI) throw new Error('MONGODB_URI is missing');

        cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
            dbName: DB_NAME,
            bufferCommands: false,
        })


        cached.conn = await cached.promise;

        console.log(`🚀 MongoDB connected: ${cached.conn.connection.host}`.cyan.underline);
        return cached.conn;
        
    } catch (error) {
        console.log(colors.red("MongoDB connection FAILED"), error);
        process.exit(1);
    }
}

export default connectToDatabase