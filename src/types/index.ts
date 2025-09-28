export type SensorData = {
  temperature: number;
  humidity: number;
  pressure: number;
  gasResistance: number;
  timestamp: string;
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
  gasResistance: number;
};
