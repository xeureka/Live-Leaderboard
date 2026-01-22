import client from "../config/redis";

const category = "codeforce"

export async function addUserScore(userName: string, userScore:number){
    try {
        const result = await client.zAdd(category,[
            {
                score: userScore,
                value: userName
            }
        ])

        return result
    } catch (error) {
        console.log(error)
    }
}

export async function topUsersOfCategory(max: number, min: number){
    try {
        
        const totalPlayers = await client.zCard(category)
    
        if (totalPlayers < max){
            return `There are no ${max} players in this category`
        }
        
        const topPlayers = await client.zRangeWithScores(category,min,max-1,{
            REV:true
        })
    
        return topPlayers

    } catch (error) {
        console.log(error)
    }
}

export async function onePlayerScore(username: string){
    try {
        const onePlayerScore = await client.zScore(category,username)
        return onePlayerScore
    } catch (error) {
        console.log(error)
    }
}
