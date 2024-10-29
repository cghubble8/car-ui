import React from 'react';

export function TirePressure({ pressures }) {
  const { frontLeft, frontRight, rearLeft, rearRight } = pressures;

  const getTirePressureStatus = (pressure) => {
    if (pressure < 30) return 'text-red-600 bg-red-100';
    if (pressure < 31) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="text-center">
        <div className={`rounded-full px-3 py-2 font-medium ${getTirePressureStatus(frontLeft)}`}>
          {frontLeft} PSI
        </div>
        <div className="text-sm text-gray-500 mt-1">Front Left</div>
      </div>
      <div className="text-center">
        <div className={`rounded-full px-3 py-2 font-medium ${getTirePressureStatus(frontRight)}`}>
          {frontRight} PSI
        </div>
        <div className="text-sm text-gray-500 mt-1">Front Right</div>
      </div>
      <div className="text-center">
        <div className={`rounded-full px-3 py-2 font-medium ${getTirePressureStatus(rearLeft)}`}>
          {rearLeft} PSI
        </div>
        <div className="text-sm text-gray-500 mt-1">Rear Left</div>
      </div>
      <div className="text-center">
        <div className={`rounded-full px-3 py-2 font-medium ${getTirePressureStatus(rearRight)}`}>
          {rearRight} PSI
        </div>
        <div className="text-sm text-gray-500 mt-1">Rear Right</div>
      </div>
    </div>
  );
}