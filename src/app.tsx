import { 
  Thermometer, 
  Droplets, 
  Gauge,
  Wind,
} from 'lucide-react';
import { SensorCard } from './components/SensorCard';
import { TemperatureChart, HumidityChart, PressureChart, GasChart } from './components/Charts';

export default function App() {

  // Valores fixos simulados até implementar dados reais do Arduino
  const currentData = {
    temperature: 24.5,
    humidity: 65.2,
    pressure: 1013.25,
    gasResistance: 18.7
  };

  const historicalData = [
    { timestamp: new Date().toISOString(), temperature: 24.5, humidity: 65.2, pressure: 1013.25, gasResistance: 18.7 },
    { timestamp: new Date(Date.now() - 300000).toISOString(), temperature: 24.2, humidity: 64.8, pressure: 1013.30, gasResistance: 19.1 },
    { timestamp: new Date(Date.now() - 600000).toISOString(), temperature: 23.9, humidity: 64.5, pressure: 1013.35, gasResistance: 19.5 }
  ];

  const getAirQualityLevel = (gasResistance: number) => {
    if (gasResistance > 25) return { level: 'excellent', color: 'text-green-600', description: 'Excelente' };
    if (gasResistance > 20) return { level: 'good', color: 'text-blue-600', description: 'Boa' };
    if (gasResistance > 15) return { level: 'moderate', color: 'text-yellow-600', description: 'Moderada' };
    if (gasResistance > 10) return { level: 'poor', color: 'text-orange-600', description: 'Ruim' };
    return { level: 'hazardous', color: 'text-red-600', description: 'Perigosa' };
  };

  const airQuality = getAirQualityLevel(currentData.gasResistance);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-800 to-zinc-900">
      {/* Header */}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <SensorCard
            title="Temperatura"
            value={currentData.temperature}
            unit="°C"
            icon={Thermometer}
            color="bg-red-500"
            status={currentData.temperature > 35 ? 'danger' : currentData.temperature > 30 ? 'warning' : 'normal'}
          />
          
          <SensorCard
            title="Umidade"
            value={currentData.humidity}
            unit="%"
            icon={Droplets}
            color="bg-blue-500"
            status={currentData.humidity > 80 ? 'danger' : currentData.humidity > 70 ? 'warning' : 'normal'}
          />
          
          <SensorCard
            title="Pressão"
            value={currentData.pressure}
            unit="hPa"
            icon={Gauge}
            color="bg-green-500"
            status="normal"
          />
          
          <SensorCard
            title="Qualidade do Ar"
            value={currentData.gasResistance}
            unit="kΩ"
            icon={Wind}
            color="bg-orange-500"
            status={airQuality.level === 'hazardous' ? 'danger' : airQuality.level === 'poor' ? 'warning' : 'normal'}
          />
        </div>

        {/* Air Quality Indicator */}
        <div className="bg-zinc-800 rounded-xl p-6 shadow-lg mb-8 border border-zinc-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Qualidade do Ar Atual</h3>
              <p className={`text-2xl font-bold ${airQuality.color}`}>
                {airQuality.description}
              </p>
              <p className="text-sm text-zinc-300">
                Resistência do gás: {currentData.gasResistance.toFixed(1)} kΩ
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-zinc-400">Última atualização</p>
              <p className="text-lg font-medium text-white">
                {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TemperatureChart data={historicalData} />
          <HumidityChart data={historicalData} />
          <PressureChart data={historicalData} />
          <GasChart data={historicalData} />
        </div>

      </main>
    </div>
  );
}