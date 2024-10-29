import React from 'react';

export function TemperatureSlider({ value, onChange }) {
  const percentage = ((value - 61) / (82 - 61)) * 100; // Adjusted for Fahrenheit range
  const isHot = value > 73; // Hot threshold in Fahrenheit

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative h-64 flex items-center">
        <div className="relative h-full w-16">
          {/* Background bar */}
          <div className="absolute inset-0 bg-gray-200 rounded-full" />
          
          {/* Temperature fill */}
          <div 
            className={`absolute bottom-0 left-0 right-0 rounded-full transition-all duration-150 ${
              isHot ? 'bg-red-500' : 'bg-blue-500'
            }`}
            style={{ height: `${percentage}%` }}
          />
          
          {/* Temperature display */}
          <div 
            className="absolute left-0 right-0 flex items-center justify-center text-white font-medium transition-all duration-150"
            style={{ bottom: `${percentage}%`, transform: 'translateY(50%)' }}
          >
            <div className={`rounded-full w-12 h-12 flex items-center justify-center shadow-lg ${
              isHot ? 'bg-red-600' : 'bg-blue-600'
            }`}>
              {value}°
            </div>
          </div>
          
          {/* Slider input */}
          <input
            type="range"
            min="61" // Adjusted minimum for Fahrenheit
            max="82" // Adjusted maximum for Fahrenheit
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer appearance-none [transform:rotate(270deg)]"
            style={{ transformOrigin: 'center' }}
          />
        </div>
        
        {/* Temperature scale without the default temperature */}
        <div className="absolute right-full mr-2 h-full flex flex-col justify-between text-sm text-gray-500">
          <span>82°F</span>
          <span>61°F</span>
        </div>
      </div>
      
      {/* Fahrenheit display */}
      <div className={`font-medium ${isHot ? 'text-red-500' : 'text-gray-500'}`}>
        {value}°F
      </div>
    </div>
  );
}