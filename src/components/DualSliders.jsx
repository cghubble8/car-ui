import React from 'react';
import { TemperatureSlider } from './TemperatureSlider';

export function DualSliders({ temperature, onTemperatureChange, fanSpeed, onFanSpeedChange }) {
  return (
    <div className="flex flex-col space-y-6">
      <h1 className="text-xl font-bold">Temperature Control</h1>
      <div className="flex justify-between items-center gap-8">
        <div className="flex-1">
          <TemperatureSlider value={temperature} onChange={onTemperatureChange} />
        </div>
        
        <div className="flex flex-col items-center flex-1">
          <label className="text-lg font-medium mb-4">Fan Speed</label>
          <div className="relative w-full h-64 flex items-center justify-center">
            <div className="absolute inset-0 bg-gray-200 rounded-full w-16 mx-auto" />
            <div 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 rounded-full bg-blue-500 transition-all duration-150"
              style={{ height: `${(fanSpeed / 5) * 100}%` }}
            />
            <div 
              className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center text-white font-medium transition-all duration-150"
              style={{ bottom: `${(fanSpeed / 5) * 100}%`, transform: 'translateY(50%)' }}
            >
              <div className="rounded-full w-12 h-12 flex items-center justify-center shadow-lg bg-blue-600">
                {fanSpeed}
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={fanSpeed}
              onChange={(e) => onFanSpeedChange(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer appearance-none [transform:rotate(270deg)]"
              style={{ transformOrigin: 'center' }}
            />
            <div className="absolute right-full mr-2 h-full flex flex-col justify-between text-sm text-gray-500">
              <span>5</span>
              <span>1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}