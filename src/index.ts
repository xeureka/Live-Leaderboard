import express from 'express'
import { connectDB } from './config/db.connect'

const app = express()

app.use(express.json())

const PORT = Bun.env.PORT

connectDB();
app.listen(prompt, () => {
    console.log('server running on port ',PORT)
})

