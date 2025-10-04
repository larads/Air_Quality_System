import { api } from '.'
import type { SensorData } from '../types'
import { AxiosError } from 'axios'

export async function fetchSensorData(): Promise<SensorData[]> {
  try {
    const response = await api.get<SensorData[]>('/sensorBME680')
    if (response.status !== 200) {
      throw new Error(`API retornou status ${response.status}`)
    }

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(
        `❌ [fetchSensorData] Erro HTTP ${error.response?.status}:`,
        error.response?.data
      )
    }
    throw error
  }
}

export async function getLatestSensorData(): Promise<SensorData | null> {
  try {
    const data = await fetchSensorData()
    return data.length > 0 ? data[0] : null
  } catch (error) {
    console.error('❌ Erro ao buscar último dado do sensor:', error)
    throw error
  }
}

export async function getSensorDataByTimeRange(
  startDate: string,
  endDate: string
): Promise<SensorData[]> {
  try {
    const queryParams = new URLSearchParams()
    queryParams.set('startDate', startDate)
    queryParams.set('endDate', endDate)

    const response = await api.get<SensorData[]>(
      `/sensorBME680?${queryParams.toString()}`
    )

    return response.data
  } catch (error) {
    console.error('❌ Erro ao buscar dados do sensor por período:', error)
    throw error
  }
}