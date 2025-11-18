import { type IGameScore } from "../models/game.model";
import Games from "../models/game.model";
import client from '../config/redis'

client.connect()

// submitted score stored in the db and redis 
export async function submitScore(userId: string,scoreData: Partial<IGameScore>){
    const gameScore = await Games.create({
        userId,
        ...scoreData
    }) 
    await client.zAdd(
        `leaderboard:${scoreData.gameType}`,
        [
            {
                score: scoreData.score!,
                value: `${userId}:${gameScore._id}`
            }
        ]
    );
    return gameScore
}

// Get users score using paginationi
export async function getUserScores(userId: string, page: number, limit: number){
    return Games.find({userId})
                .sort({score: -1})
                .skip((page - 1) * limit)
                .limit(limit);
}

// Get users list from the redis leaderboard
export async function getLeaderboard(gameType: string, limit: number = 100) {
  return client.zRange(
    `leaderboard:${gameType}`,
    0,
    limit - 1,
    {
      REV: true,
    }
  );
};
