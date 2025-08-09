import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET!

export function signJWT(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' })
}

export function verifyJWT<T = any>(token: string): T {
  return jwt.verify(token, SECRET) as T
}
