import { 
  Thermometer, 
  Droplets, 
  Gauge,
  Wind,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';
import { SensorCard } from './components/SensorCard';
import { TemperatureChart, HumidityChart, PressureChart, GasChart } from './components/Charts';
import { useSensorData } from './hooks/useSensorData';

export default function App() {
  const { data: sensorData, loading, error, refetch } = useSensorData();

  const sortedData = [...sensorData].sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  const currentData = sortedData.length > 0 ? sortedData[0] : null;
  const historicalData = sortedData.map(item => ({
    timestamp: item.created_at,
    temperature: parseFloat(item.temperature),
    humidity: parseFloat(item.humidity),
    pressure: parseFloat(item.pressure),
    air_quality: parseFloat(item.airQuality)
  }));

  const getAirQualityLevel = (airQuality: number) => {
    if (airQuality < 50) return { level: 'excellent', color: 'text-green-600', description: 'Excelente' };
    if (airQuality < 100) return { level: 'good', color: 'text-blue-600', description: 'Boa' };
    if (airQuality < 150) return { level: 'moderate', color: 'text-yellow-600', description: 'Moderada' };
    if (airQuality < 200) return { level: 'poor', color: 'text-orange-600', description: 'Ruim' };
    return { level: 'hazardous', color: 'text-red-600', description: 'Perigosa' };
  };

  const airQuality = currentData ? getAirQualityLevel(parseFloat(currentData.airQuality)) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-800 to-zinc-900">
      <header className="bg-zinc-800 shadow-lg border-b border-zinc-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <img 
                  src="/poluicao-do-ar.png" 
                  alt="Ícone de Poluição do Ar" 
                  className="h-8 w-8"
                />
                <h1 className="text-2xl font-bold text-white">Sistema de Qualidade do Ar</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && !currentData ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-3">
              <RefreshCw className="h-6 w-6 animate-spin text-blue-400" />
              <span className="text-lg text-white">Carregando dados do sensor...</span>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Erro ao carregar dados</h3>
              <p className="text-zinc-400 mb-4">{error}</p>
              <button
                onClick={refetch}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        ) : currentData ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <SensorCard
                title="Temperatura"
                value={parseFloat(currentData.temperature)}
                unit="°C"
                icon={Thermometer}
                color="bg-red-500"
                status={parseFloat(currentData.temperature) > 35 ? 'danger' : parseFloat(currentData.temperature) > 30 ? 'warning' : 'normal'}
              />
              
              <SensorCard
                title="Umidade"
                value={parseFloat(currentData.humidity)}
                unit="%"
                icon={Droplets}
                color="bg-blue-500"
                status={parseFloat(currentData.humidity) > 80 ? 'danger' : parseFloat(currentData.humidity) > 70 ? 'warning' : 'normal'}
              />
              
              <SensorCard
                title="Pressão"
                value={parseFloat(currentData.pressure)}
                unit="hPa"
                icon={Gauge}
                color="bg-green-500"
                status="normal"
              />
              
              <SensorCard
                title="Qualidade do Ar"
                value={parseFloat(currentData.airQuality)}
                unit="ppm"
                icon={Wind}
                color="bg-orange-500"
                status={airQuality?.level === 'hazardous' ? 'danger' : airQuality?.level === 'poor' ? 'warning' : 'normal'}
              />
            </div>

            <div className="bg-zinc-800 rounded-xl p-6 shadow-lg mb-8 border border-zinc-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">Qualidade do Ar Atual</h3>
                  <p className={`text-2xl font-bold ${airQuality?.color || 'text-zinc-400'}`}>
                    {airQuality?.description || 'N/A'}
                  </p>
                  <p className="text-sm text-zinc-300">
                    Qualidade do ar: {parseFloat(currentData.airQuality).toFixed(1)} ppm
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-zinc-400">Última atualização</p>
                  <p className="text-lg font-medium text-white">
                    {new Date(currentData.created_at).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TemperatureChart data={historicalData} />
              <HumidityChart data={historicalData} />
              <PressureChart data={historicalData} />
              <GasChart data={historicalData} />
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Nenhum dado disponível</h3>
              <p className="text-zinc-400 mb-4">Não há dados do sensor para exibir</p>
              <button
                onClick={refetch}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}