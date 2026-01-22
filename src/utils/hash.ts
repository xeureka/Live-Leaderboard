import bcrypt from 'bcrypt'

// excrypt password
export async function hashPassword(password: string): Promise<string>{
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    return hashedPassword
}

// decrypt password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean>{
    const verification = await bcrypt.compare(password,hashedPassword)
    return verification
}