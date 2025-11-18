import express from 'express'
import authRoute from './routes/auth.route'
import cors from 'cors'
import { connectRedis } from './config/redis'
import startServer from './config/startServer'

export const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/v1/auth',authRoute)

app.get('/redis', async (req,res) => {
    await connectRedis()
    res.json("redis working fine")
})
await startServer()
