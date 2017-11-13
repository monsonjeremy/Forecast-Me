import express from 'express'
import { controllerHandler, getSurfDataController } from '../controllers'

const router = express.Router()

/**
 * API to get data from a given buoy
 */
router.get('/GetSurf/:id', controllerHandler(getSurfDataController, req => [req.params.id]))

router.get('/GetRegions', (req, res) =>
  res.send([
    {
      name: 'Santa Cruz',
      id: '2958',
      buoy: {
        buoyId: '46012',
        buoyName: 'Monterey Bay',
      },
      spots: [
        { name: 'Steamer Lane', id: '4188', },
        { name: 'Four Mile', id: '5023', },
        { name: 'Waddell Creek', id: '5021', },
        { name: "Mitchell's Cove", id: '5028', },
        { name: '26th Ave', id: '5030', },
        { name: 'Scott Creek', id: '5022', },
        { name: 'Davenport', id: '5024', },
        { name: 'Natural Bridges', id: '5028', },
        { name: 'Cowells', id: '4189', },
        { name: 'The Harbor', id: '5031', },
        { name: 'Pleasure Point', id: '4190', },
        { name: '38th Ave', id: '4191', },
        { name: 'Capitola', id: '10763', },
        { name: 'Manresa', id: '5036', },
        { name: 'The Hook', id: '108024', }
      ],
    },
    {
      name: 'North Orange Country',
      id: '2143',
      buoy: {
        buoyId: '46221',
        buoyName: 'Santa Monica',
      },
      spots: [{ name: 'Newport', id: '1241', }, { name: 'HB', id: '3421', }],
    }
  ])
)

export default router
