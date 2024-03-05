import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import "dotenv/config";
import authRoutes from './routes/auth';
import userRoutes from './routes/users';

mongoose.connect(process.env.MONGO_URL as string)

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)

app.listen(7000, () => {
    console.log('server is running on port 7000')
})