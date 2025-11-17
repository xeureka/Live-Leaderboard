import {createClient} from '@redis/client'

const client = createClient()

client.on('error', (err:Error) => {
    console.error('Redis connection error: ',err)
})

connectRedis().catch(console.error)

export async function connectRedis(){
    if(!client.isOpen){
        await client.connect()
    }
    return client
}

export default client;

