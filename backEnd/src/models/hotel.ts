import mongoose from "mongoose";

export type HotelType = {
    _id: string;
    userId: string;
    name: string;
    city: string,
    country: string,
    description: string;
    string: string;
    adultCount: number;
    type: string;
    childCount: number;
    facilities: string[];
    pricePerNight: number;
    starRating: number;
    imageUrls: string[];
    lastUpdated: Date;

}

const HotelSchema = new mongoose.Schema<HotelType>({
    userId: {
    type: String,
    required: true,
},
    name:{
        type: String,
    required: true,
    },
    city:{
        type: String,
    required: true,
    },
    country:{
        type: String,
    required: true,
    },
    description:{
        type: String,
    required: true,
    },
    type:{
        type: String,
    required: true,
    },
    adultCount:{
        type: Number,
    required: true,
    },
    childCount:{
        type: Number,
    required: true,
    },
    facilities: [{
        type: String,
    required: true,
    }], 
    pricePerNight:{
        type: Number,
    required: true,
    },
    starRating:{
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    imageUrls:[{
        type: String,
    required: true,
    }],
    lastUpdated:{
        type: Date,
        required: true
    }


},{timestamps: true});

const Hotel = mongoose.model<HotelType>("Hotel", HotelSchema);
export default Hotel;