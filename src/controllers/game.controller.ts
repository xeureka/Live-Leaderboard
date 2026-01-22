import { addUserScore, topUsersOfCategory,onePlayerScore } from "../services/redis.service";
import client from "../config/redis";
import { verifyToken } from "../utils/JwtGenerate";
import type { Request, Response} from "express";
import { COOKIE_NAME } from "./auth.controller";

export const addScore = async(req: Request,res: Response) => {
    try {
        // let token = req.cookies[COOKIE_NAME]
        // if (!token){
        //     res.json({message: "Invalid token or empty token"})
        //     return
        // }
        // const user = verifyToken(token)

        const { score,username } = req.body;

        // await client.connect()-

        const result = await addUserScore(username,score);
        res.status(201).json(result)

    } catch (error) {
        console.error("Error in Score adding of the user :", error);
        return res.status(500).json({ message: "adding a users score to the leaderboard", error: String(error) });
    }
}


// fetch the leaderboard for top players of the category


// export async function topUsersOfCategory(category: string, max: number, min: string){

export const fetchTopPlayers = async(req: Request,res: Response) => {
    try {
        
        const max = 5 ; // Number(req.params.max);
        const min = 0 // Number(req.params.min);

        // if (!Number.isInteger(max) || !Number.isInteger(min) || min < 0 || max <= 0) {
        //     return res.status(400).json({
        //         message: "min and max must be valid integers"
        //     });
        // }

        const topPlayers = await topUsersOfCategory(max,min);

        res.json(topPlayers).status(201)

    } catch (error) {
        console.error("Error in fetching top players :", error);
        return res.status(500).json({ message: "error fetching the top players of the category", error: String(error) });
    }
}

export const fetchOnePlayer = async(req: Request, res: Response) => {
    try {
        // export async function onePlayerScore(username: string){
        const username = req.body.username;

        const result = await onePlayerScore(username)

        if(result == null){
            res.json({message: "username not found in the leaderboard"})
            return
        }

        res.json(result).status(200)
        
    } catch (error) {
        console.error("Error in fetching individual scores :", error);
        return res.status(500).json({ message: "error fetching the score of the player", error: String(error) });
    }
}
