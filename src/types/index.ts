export type SensorData = {
  id: string;
  temperature: string;
  humidity: string;
  pressure: string;
  airQuality: string;
  created_at: string;
};

export type SensorStatus = {
  isConnected: boolean;
  lastUpdate: string | null;
  error: string | null;
};

export type HistoricalData = {
  timestamp: string;
  temperature: number;
  humidity: number;
  pressure: number;
  air_quality: number;
};
