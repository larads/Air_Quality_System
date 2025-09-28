import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface SensorCardProps {
  title: string;
  value: number;
  unit: string;
  icon: LucideIcon;
  color: string;
  trend?: 'up' | 'down' | 'stable';
  status?: 'normal' | 'warning' | 'danger';
}

export const SensorCard: React.FC<SensorCardProps> = ({
  title,
  value,
  unit,
  icon: Icon,
  color,
  trend,
  status = 'normal'
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'warning': return 'border-yellow-400 bg-yellow-900/20';
      case 'danger': return 'border-red-400 bg-red-900/20';
      default: return 'border-zinc-600 bg-zinc-800';
    }
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    switch (trend) {
      case 'up': return '↗';
      case 'down': return '↘';
      case 'stable': return '→';
      default: return null;
    }
  };

  return (
    <div className={`rounded-xl border-2 p-6 shadow-lg transition-all duration-300 hover:shadow-xl ${getStatusColor()}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-lg ${color}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        {trend && (
          <span className="text-2xl text-zinc-400">{getTrendIcon()}</span>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-white">
            {value.toFixed(1)}
          </span>
          <span className="text-lg text-zinc-300">{unit}</span>
        </div>
        
        <div className="text-sm text-zinc-400">
          Última atualização: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};
