import express from 'express'
import { register, login, refresh } from '../controllers/auth.controller.js'
import ensureAuth from '../middleware/ensureAuth.js'

const router = express.Router()

router.route('/register').post(register)
router.route('/login').post(ensureAuth, login)
router.route('/refresh').post(refresh)

export default router
