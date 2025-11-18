import express from "express"
import Games from '../models/game.model'
import Users from "../models/user.model"
import client from "../config/redis"

interface SubmitScoreRequest extends express.Request{
    body:{
        score: number;
        gameType: 'classic' | 'arcade' | 'time-trial' | 'survival';
    }
}

// submit score for authenticated users
export async function submitScore(req:SubmitScoreRequest, res:Response): Promise<void>{
    try {
        const {score,gameType} = req.body;
        const userId = req.user?.id
    } catch (error) {
        
    }
}
