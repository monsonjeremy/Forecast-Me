import express from 'express'
import { controllerHandler, getBuoyDataController } from '../controllers'

const router = express.Router()

/**
 * API to get data from a given buoy
 */
router.get('/GetData/:buoyId', controllerHandler(getBuoyDataController, req => [req.params.buoyId]))

export default router
