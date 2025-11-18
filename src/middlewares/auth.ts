import { verifyToken } from "../utils/JwtGenerate";
import {type Response, type Request, type NextFunction} from "express";
import { COOKIE_NAME } from "../controllers/auth.controller";

async function auth(req: Request, res: Response, next:NextFunction){

    const token = req.cookies[COOKIE_NAME]

    if (!token){
        return res.status(401).json({message: "No token found!"})
    }

    const payload = verifyToken(token)
    req.user = {id: payload.UserId}

    next()
}

export default auth
