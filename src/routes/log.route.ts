import { Router } from 'express'
import {
  fetchLogs,
  fetchStats,
  fetchTopErrors,
  fetchTrends
} from '../controllers/log.controller.js'
const router = Router()

router.route('/').get(fetchLogs)
router.route('/stats').get(fetchStats)
router.route('/top-errors').get(fetchTopErrors)
router.route('/trends').get(fetchTrends)

export default router
