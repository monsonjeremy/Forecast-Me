import { getBuoyDataService } from '../services'

export const getBuoyDataController = async buoyId => getBuoyDataService(buoyId)
