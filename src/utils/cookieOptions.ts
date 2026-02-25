import { env } from "../config/env.js"

type optionType = {
    httpOnly: boolean,
    secure: boolean,
    sameSite: boolean | "strict" | "lax" | "none" | undefined,
    maxAge: number
}

const cookieOptions: optionType = {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: env.NODE_ENV === 'production' ? 'strict' : 'lax',
    maxAge: 24 * 60 * 60 * 1000
}

export default cookieOptions