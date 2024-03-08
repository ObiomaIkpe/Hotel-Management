import express,{Request, Response} from 'express';
import {check} from "express-validator";
import {login, logout, sendToken} from '../controller/auth';
import verifyToken from '../middleware/authMiddleWare';
const router = express.Router();

router.post("/login", [
        check("email", "Email is required").isEmail(),
        check("password", "Password with 6 or more characters required").isLength({
    min: 6,
  }) 
], login);

router.get("/validate-token", verifyToken, sendToken);

router.post("/logout", logout)

  export default router;