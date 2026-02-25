import { Request, Response, NextFunction } from "express"
import { verifyToken } from "../utils/jwt.js";
import prisma from '../config/prisma.js'
import ApiError from "../utils/apiError.js";

const ensureAuth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken

    if (!token) {
        throw new ApiError(401, 'token not found')
    }

    const { userId, email } = verifyToken(token)

    const user = await prisma.user.findUnique({ where: { userId: userId } })

    if (!user) {
        throw new ApiError(401, "user not found")
    }

    req.userId = userId;

    next()
}

export default ensureAuth