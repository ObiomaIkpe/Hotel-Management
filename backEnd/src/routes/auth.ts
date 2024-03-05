import express,{Request, Response} from 'express';
import {check} from "express-validator";
import {login} from '../controller/auth';
const router = express.Router();

router.post("/login", [
        check("email", "Email is required").isEmail(),
        check("password", "Password with 6 or more characters required").isLength({
    min: 6,
  }) 
], login)

  export default router;