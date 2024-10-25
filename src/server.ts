import express  from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import { corsConfig } from "./config/cors";
import { connectDB } from "./config/db";
import ProjectRoutes from "./routes/projectRoutes"
dotenv.config()

connectDB()
const app = express()
app.use(cors(corsConfig))

//agregando lectura en la consola de json
app.use(express.json())

//Routes
app.use('/api/projects',ProjectRoutes)

export default app;
