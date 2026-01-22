import express from 'express'
import authRoute from './routes/auth.route'
import leaderboardRoute from "./routes/game.route"
import cors from 'cors'
import { connectRedis } from './config/redis'
import startServer from './config/startServer'
import { verifyToken } from './utils/JwtGenerate'

export const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/v1/auth',authRoute)
app.use('/api/v1/leaderboard',leaderboardRoute)

app.get('/redis', async (req,res) => {
    await connectRedis()
    res.json("redis working fine")
})

app.get('/verify',(req,res) => {

    let token = ""

    console.log(verifyToken(token))
    res.json(verifyToken(token))
})

await startServer()
