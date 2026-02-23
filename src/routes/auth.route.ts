import express from 'express'
import { register, login, refresh } from '../controllers/auth.controller.js'

const router = express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/refresh').post(refresh)

export default router
