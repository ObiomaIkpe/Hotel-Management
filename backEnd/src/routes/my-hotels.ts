import express from 'express';
import { myHotels } from '../controller/hotels';
import verifyToken from '../middleware/authMiddleWare'
import { body } from 'express-validator';
const router  = express.Router();

// api/my-hotels
router.post("/", verifyToken,
[
    body("name").notEmpty().withMessage("Name is required!"),
    body("city").notEmpty().withMessage("City is required!"),
    body("country").notEmpty().withMessage("Country is required!"),
    body("description").notEmpty().withMessage("Description is required!"),
    body("type").notEmpty().withMessage("Hotel type is required!"),
    body("pricePerNight").notEmpty().isNumeric().withMessage("pricePerNight is required and must be a number!"),
    body("facilities").notEmpty().isArray().withMessage("Facilities are required")
  ]);


export default router;

