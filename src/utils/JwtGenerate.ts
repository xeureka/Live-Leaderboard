import jwt from 'jsonwebtoken'

// sign token
export function signToken(email: string,username: string, userId: string): string{
    const token = jwt.sign({Email: email,userName: username,UserId: userId}, Bun.env.JWT_SECRET!)
    return token
}

// verify token
export function verifyToken(token: string): jwt.JwtPayload | string {
    const verified = jwt.verify(token,Bun.env.JWT_SECRET!)
    return verified
}

