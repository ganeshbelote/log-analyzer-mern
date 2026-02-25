import prisma from '../config/prisma.js'
import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/apiError.js'
import ApiResponse from '../utils/apiResponse.js'
import { comparePassword, hashPassword } from '../utils/bcrypt.js'
import { generateToken } from '../utils/jwt.js'
import cookieOptions from '../utils/cookieOptions.js'

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!email || !password) {
    throw new ApiError(400, 'missing fields')
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/

  if (!emailRegex.test(email)) {
    throw new ApiError(400, 'invalid email address')
  }

  if (!passwordRegex.test(password)) {
    throw new ApiError(
      400,
      'password must be at least 6 characters and contain uppercase, lowercase, number and special character'
    )
  }

  const user = await prisma.user.findUnique({ where: { email: email } })

  if (user) {
    throw new ApiError(409, 'user already exist with this credentials')
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

  res.cookie('accessToken', token, cookieOptions)

  return res.status(201).json(
    new ApiResponse(201, 'user created successfully', {
      ok: true,
      userId: createdUser.userId,
      name: createdUser.name,
      email: createdUser.email
    })
  )
})

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, 'missing fields')
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(email)) {
    throw new ApiError(400, 'invalid email address')
  }

  const user = await prisma.user.findUnique({ where: { email: email } });

  if (!user) {
    throw new ApiError(401, "user not found");
  }

  const decodedPassword = await comparePassword(password, user.password);

  if (!decodedPassword) {
    throw new ApiError(401, "invalid credentials");
  }

  const token = generateToken({ userId: user.userId, email: user.email });

  res.cookie("accessToken", token, cookieOptions);

  return res.status(200).json(new ApiResponse(200, "user logged in successfully", {
    ok: true,
    userId: user.userId,
    email: user.email
  }))
})

const refresh = asyncHandler(async () => { })

export { register, login, refresh }
