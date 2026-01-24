import { addUserScore, topUsersOfCategory, onePlayerScore } from '../services/redis.service';
import { verifyToken} from '../utils/JwtGenerate';
import type { Request, Response } from 'express';
import { COOKIE_NAME } from './auth.controller';

export const addScore = async (req: Request, res: Response) => {

  try {
    const token = req.cookies[COOKIE_NAME];

    if (!token){
      return res.status(401).json({nessage: "No token provided"})
    }

    const decoded = verifyToken(token);

    if (typeof decoded === 'string'){
      throw new Error("Invalid token payload")
    }

    const { userName } = decoded;
    const score = req.body.score;

    const result = await addUserScore(userName, score);
    res.status(201).json(result);

  } catch (error) {

    console.error('Error in Score adding of the user :', error);

    return res
      .status(500)
      .json({ message: 'adding a users score to the leaderboard', error: String(error) });
  }
};

export const fetchTopPlayers = async (req: Request, res: Response) => {

  try {

    const max = Number(req.query.max);
    const min = Number(req.query.min);

    if (Number.isNaN(min) || Number.isNaN(max)) {
        return res.status(400).json({ message: "Invalid min or max" });
    }

    const topPlayers = await topUsersOfCategory(max, min);

    res.json(topPlayers).status(201);

  } catch (error) {
    console.error('Error in fetching top players :', error);

    return res
      .status(500)
      .json({ message: 'error fetching the top players of the category', error: String(error) });
  }
};

export const fetchOnePlayer = async (req: Request, res: Response) => {
  try {
    const username = req.body.username;

    const result = await onePlayerScore(username);

    if (result == null) {
      res.json({ message: 'username not found in the leaderboard' });
      return;
    }

    res.json(result).status(200);
  } catch (error) {

    console.error('Error in fetching individual scores :', error);

    return res
      .status(500)
      .json({ message: 'error fetching the score of the player', error: String(error) });
  }
};
