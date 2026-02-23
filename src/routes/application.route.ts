import { Router } from 'express'
import {
  createApplication,
  fetchApplication
} from '../controllers/application.controller.js'

const router = Router()

router.route('/').get(fetchApplication).post(createApplication)

export default router
