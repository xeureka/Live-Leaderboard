
// get the jwt token
// verify it and set req.ser = {id: decoded.userId}


// authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImVydWVrYXRla2xlMTIjZ21hIiwiaWF0IjoxNzYzNDUzMzEzfQ.pSqdSJHC2MasVVzfnX_SS4gIDNgugAhf9WumweCfmRc; Path=/; HttpOnly
import { verifyToken } from "../utils/JwtGenerate";
import express from "express";


async function auth(req:express.Request,res: express.Response, next:express.NextFunction){
    try {
        const token = 
    } catch (error) {
        
    }
}

export default auth
