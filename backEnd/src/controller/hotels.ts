import express, {Request, Response} from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import { HotelType } from '../models/hotel';
import Hotel from '../models/hotel'


export const myHotels = async (req: Request, res: Response) => {
    const storage = multer.memoryStorage();
    
    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 5 * 1024 * 1024 // 5mb
        }
    });

    upload.array("imageFiles", 6);

    try {
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel: HotelType = req.body;


        //1. upload the images to cloudinary

        const uploadPromises = imageFiles.map(async(image) => {
            //encode the image as a base 64 string
            const base64 = Buffer.from(image.buffer).toString("base64");
            let dataURI="data:" + image.mimetype + ";base64," + base64;
            const res = await cloudinary.v2.uploader.upload(dataURI);
            return res.url;
        });

        //2. if upload was successful, add the URLs to the new hotel.
        const imageUrls = await Promise.all(uploadPromises);
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId


        //3. save the new hotel in our database.
        const hotel = new Hotel(newHotel);

        //4. return a 201 status
    } catch (error) {
        console.log('error creating hotel', error);
        res.status(500).json({message: "Something went wrong!"})
    }
}