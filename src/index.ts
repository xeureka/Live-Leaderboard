import express from 'express'
import { connectDB } from './config/db.connect'
import authRoute from './routes/auth.route'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())


app.use('/api/v1/auth',authRoute)

const PORT = Bun.env.PORT

connectDB();
app.listen(PORT, () => {
    console.log(`server runnin at port ${PORT}`)
})

