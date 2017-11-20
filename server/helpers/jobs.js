import axios from 'axios'
import cron from 'cron'
import { redisClient } from '../redis/redis'
import { massageSurflineData } from './helpers'

export const regions = [
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
    spots: [{ name: 'The Wedge', id: '4232', }, { name: 'HB Pier, Southside ', id: '4874', }],
  }
]

export const surflineEndpoint = id =>
  encodeURI(
    `http://api.surfline.com/v1/forecasts/${id}?resources=surf,tide,wind&days=10&getAllSpots=false&units=e&interpolate=false&showOptimal=false`
  )

export const getTimeZoneForRegion = async region => {
  const regionTimeZone = await axios
    .get(surflineEndpoint(region.id))
    .then(response => response.data.timeZoneString)
  return regionTimeZone
}

export const cacheBuoyDataJob = () =>
  new cron.CronJob({
    cronTime: '0 59 11,23 * * *',
    onTick() {
      console.log('cacheBuoyDataJob ticked')

      regions.forEach(async region => {
        const buoyId = region.buoy.buoyId
        const buoyAPI = encodeURI(`http://www.ndbc.noaa.gov/data/realtime2/${buoyId}.spec`)

        const buoyData = await axios.get(buoyAPI).then(response => response.data)
        redisClient.set(buoyId, buoyData)
        console.log(`Set Buoy Data for buoy ID: ${region.buoy.buoyId}`)
      })
    },
    start: false,
    timeZone: 'America/Los_Angeles',
    runOnInit: true,
  })

export const cacheSurflineDataJob = () =>
  new cron.CronJob({
    cronTime: '0 59 11,23 * * *',
    onTick() {
      console.log('cacheSurflineDataJob ticked')

      regions.forEach(async region => {
        const surflineRegionData = await axios
          .get(surflineEndpoint(region.id))
          .then(response => response.data)
        const massagedRegionData = JSON.stringify(massageSurflineData(surflineRegionData, false))
        await redisClient.set(region.id, massagedRegionData)
        console.log(`Set Surfline Data for: ${region.name} with ID ${region.id}`)
        region.spots.forEach(async spot => {
          const surflineSpotData = await axios
            .get(surflineEndpoint(spot.id))
            .then(response => response.data)
            .catch(e => console.log(e))
          const massagedSpotData = JSON.stringify(massageSurflineData(surflineSpotData, true))
          await redisClient.set(spot.id, massagedSpotData)
          console.log(`Set Surfline Data for: ${spot.name} with ID ${spot.id}`)
        })
      })
    },
    start: false,
    timeZone: 'America/Los_Angeles',
    runOnInit: true,
  })
