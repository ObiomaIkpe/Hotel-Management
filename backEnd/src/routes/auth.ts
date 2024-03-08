import express,{Request, Response} from 'express';
import {check} from "express-validator";
import {login, sendToken} from '../controller/auth';
import verifyToken from '../middleware/authMiddleWare';
const router = express.Router();

router.post("/login", [
        check("email", "Email is required").isEmail(),
        check("password", "Password with 6 or more characters required").isLength({
    min: 6,
  }) 
], login);

router.get("/validate-token", verifyToken, sendToken);

  export default router;