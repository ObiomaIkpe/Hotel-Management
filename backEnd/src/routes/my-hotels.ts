import express from 'express';
import { myHotels } from '../controller/hotels';
const router  = express.Router();

// api/my-hotels
router.post("/", myHotels);