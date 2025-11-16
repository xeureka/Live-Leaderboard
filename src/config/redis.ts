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

/** Sorted Set
 * 
 * members are by default sorted from smallest to greatest score
 * 
 * for users with the same score by default they will gonna be sorted based on their names lexographic order
 * 
 * redis guarantees that softed sets is always sorted
 * there is no additional sorting required for the client
 * 
 * That saves CPU ccles in the client and also reduces the code complexity
 * 
 * their complexity is also on logarithmic time
 * 
 * they are ideas chocie of implenting real time, low latency leaderboard, priotry queue, and econday indexes
 * 
 * 
 * the operations include :- add,remove, increment and retrive members
 * their operations start with the letter 'Z'
 * 
 * 
 * ZADD <key> <score> <member>
 * 
 * Increment/decrement player steps
 * 
 */

