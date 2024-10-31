import express  from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import { corsConfig } from "./config/cors";
import { connectDB } from "./config/db";
import ProjectRoutes from "./routes/projectRoutes"
dotenv.config()

connectDB()
const app = express()
app.use(cors(corsConfig))

app.use(morgan('dev'))
//agregando lectura en la consola de json
app.use(express.json())

//Routes
app.use('/api/projects',ProjectRoutes)

export default app;
