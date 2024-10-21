import express  from "express";
import dotenv from 'dotenv'
import { connectDB } from "./config/db";
import ProjectRoutes from "./routes/projectRoutes"
dotenv.config()

connectDB()
const app = express()

//agregando lectura en la consola de json
app.use(express.json())

//Routes
app.use('/api/projects',ProjectRoutes)

export default app;
