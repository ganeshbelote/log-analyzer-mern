import prisma from '../config/prisma.js'
import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/apiError.js'
import ApiResponse from '../utils/apiResponse.js'
import { hashPassword } from '../utils/bcrypt.js'
import { generateToken } from '../utils/jwt.js'
import { env } from '../config/env.js'

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!email || !password) {
    throw new ApiError(400, '[WARN] : missing fields')
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/

  if (!emailRegex.test(email)) {
    throw new ApiError(400, '[WARN] : invalid email address')
  }

  if (!passwordRegex.test(password)) {
    throw new ApiError(
      400,
      '[WARN] : password must be at least 6 characters and contain uppercase, lowercase, number and special character'
    )
  }

  const user = await prisma.user.findUnique({ where: { email: email } })

  if (user) {
    throw new ApiError(409, '[WARN] : user already exist with this credentials')
  }

  const hashedPassword = await hashPassword(password)

  const createdUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword
    }
  })

  const token = generateToken({
    userId: createdUser.userId,
    email: createdUser.email
  })

  res.cookie('accessToken', token, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: env.NODE_ENV === 'production' ? 'strict' : 'lax',
    maxAge: 24 * 60 * 60 * 1000
  })

  return res.status(201).json(
    new ApiResponse(201, '[SUCCESS] : user created successfully', {
      ok: true,
      name: createdUser.name,
      email: createdUser.email
    })
  )
})

const login = asyncHandler(async () => {})

const refresh = asyncHandler(async () => {})

export { register, login, refresh }
