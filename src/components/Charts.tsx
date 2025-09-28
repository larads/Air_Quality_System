import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import type { HistoricalData } from '../types';

interface ChartsProps {
  data: HistoricalData[];
}

export const TemperatureChart: React.FC<ChartsProps> = ({ data }) => {
  return (
    <div className="bg-zinc-800 rounded-xl p-6 shadow-lg border border-zinc-700">
      <h3 className="text-lg font-semibold text-white mb-4">Temperatura</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={(value) => new Date(value).toLocaleTimeString()}
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8' }}
          />
          <YAxis 
            label={{ value: '°C', angle: -90, position: 'insideLeft' }} 
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8' }}
          />
          <Tooltip 
            labelFormatter={(value) => new Date(value).toLocaleString()}
            formatter={(value: number) => [`${value.toFixed(1)}°C`, 'Temperatura']}
          />
          <Line 
            type="monotone" 
            dataKey="temperature" 
            stroke="#ef4444" 
            strokeWidth={2}
            dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const HumidityChart: React.FC<ChartsProps> = ({ data }) => {
  return (
    <div className="bg-zinc-800 rounded-xl p-6 shadow-lg border border-zinc-700">
      <h3 className="text-lg font-semibold text-white mb-4">Umidade</h3>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={(value) => new Date(value).toLocaleTimeString()}
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8' }}
          />
          <YAxis 
            label={{ value: '%', angle: -90, position: 'insideLeft' }} 
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8' }}
          />
          <Tooltip 
            labelFormatter={(value) => new Date(value).toLocaleString()}
            formatter={(value: number) => [`${value.toFixed(1)}%`, 'Umidade']}
          />
          <Area 
            type="monotone" 
            dataKey="humidity" 
            stroke="#3b82f6" 
            fill="#3b82f6"
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const PressureChart: React.FC<ChartsProps> = ({ data }) => {
  return (
    <div className="bg-zinc-800 rounded-xl p-6 shadow-lg border border-zinc-700">
      <h3 className="text-lg font-semibold text-white mb-4">Pressão Barométrica</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={(value) => new Date(value).toLocaleTimeString()}
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8' }}
          />
          <YAxis 
            label={{ value: 'hPa', angle: -90, position: 'insideLeft' }} 
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8' }}
          />
          <Tooltip 
            labelFormatter={(value) => new Date(value).toLocaleString()}
            formatter={(value: number) => [`${value.toFixed(1)} hPa`, 'Pressão']}
          />
          <Line 
            type="monotone" 
            dataKey="pressure" 
            stroke="#10b981" 
            strokeWidth={2}
            dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const GasChart: React.FC<ChartsProps> = ({ data }) => {
  return (
    <div className="bg-zinc-800 rounded-xl p-6 shadow-lg border border-zinc-700">
      <h3 className="text-lg font-semibold text-white mb-4">Detecção de COV</h3>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={(value) => new Date(value).toLocaleTimeString()}
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8' }}
          />
          <YAxis 
            label={{ value: 'kΩ', angle: -90, position: 'insideLeft' }} 
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8' }}
          />
          <Tooltip 
            labelFormatter={(value) => new Date(value).toLocaleString()}
            formatter={(value: number) => [`${value.toFixed(1)} kΩ`, 'Resistência do Gás']}
          />
          <Area 
            type="monotone" 
            dataKey="gasResistance" 
            stroke="#f59e0b" 
            fill="#f59e0b"
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
