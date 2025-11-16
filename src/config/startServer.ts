import client,{connectRedis} from "./redis";
import { connectDB } from "./db.connect";
import { app } from "..";

const PORT = Bun.env.PORT

async function startServer(){
    try {
        await connectDB()
        await connectRedis()
        app.listen(PORT,() => {
            console.log(`server running on port ${PORT}`)
        })
    } catch (error) {
        console.log("Failed to conenct to redis, ",error)
        process.exit(1)
    }

}

export default startServer;
