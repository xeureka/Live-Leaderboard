import jwt, { type JwtPayload } from 'jsonwebtoken'

export interface AuthTokenPayload extends jwt.JwtPayload{
    Email: string;
    userName: string;
    UserId: string;
}

export function signToken(email: string,username: string, userId: string): string{
    const token = jwt.sign({Email: email,userName: username,UserId: userId}, Bun.env.JWT_SECRET!)
    return token
}

export function verifyToken(token: string): AuthTokenPayload {
    const verified = jwt.verify(token,Bun.env.JWT_SECRET!)
    return verified as AuthTokenPayload
}
