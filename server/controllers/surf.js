import { getSurfDataService } from '../services'

export const getSurfDataController = async buoyId => getSurfDataService(buoyId)
