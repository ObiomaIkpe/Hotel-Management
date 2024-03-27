import express from 'express';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import "dotenv/config";
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import myHotelRoutes from './routes/my-hotels';
import cookieParser from 'cookie-parser';
import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

mongoose.connect(process.env.MONGO_URL as string).then(() => {
    console.log("connected to databse:")
});

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-hotels", myHotelRoutes);

app.listen(7000, () => {
    console.log('server is running on port 7000')
})