import { useState, useEffect } from 'react';
import { fetchSensorData, getLatestSensorData } from '../services/sensorBME680';
import type { SensorData } from '../types';

export const useSensorData = () => {
  const [data, setData] = useState<SensorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const sensorData = await fetchSensorData();
      setData(sensorData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const fetchLatestData = async () => {
    try {
      const latestData = await getLatestSensorData();
      if (latestData) {
        setData(prev => [latestData, ...prev.slice(0, 99)]); 
      }
    } catch (err) {
      console.error('❌ [useSensorData] Erro ao buscar último dado:', err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchLatestData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    fetchLatest: fetchLatestData
  };
};
