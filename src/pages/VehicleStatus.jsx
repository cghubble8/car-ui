import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CarStatus } from '../components/CarStatus';
import { StatusIndicator } from '../components/StatusIndicator';
import { TirePressure } from '../components/TirePressure';

export function VehicleStatus() {
  const [status, setStatus] = useState({
    trunk: false,
    frunk: false,
    chargingPort: false,
    leftFrontDoor: false,
    rightFrontDoor: false,
    leftRearDoor: false,
    rightRearDoor: false,
  });

  const [tirePressure] = useState({
    frontLeft: 32,
    frontRight: 32,
    rearLeft: 32,
    rearRight: 31,
  });

  const toggleStatus = (key) => {
    setStatus(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-800">Vehicle Status</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Map
              </Link>
              <Link
                to="/settings"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Settings
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CarStatus status={status} onToggle={toggleStatus} />
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-4">Quick Status</h2>
                <div className="space-y-3">
                  <StatusIndicator
                    label="Trunk"
                    isOpen={status.trunk}
                    onClick={() => toggleStatus('trunk')}
                  />
                  <StatusIndicator
                    label="Frunk"
                    isOpen={status.frunk}
                    onClick={() => toggleStatus('frunk')}
                  />
                  <StatusIndicator
                    label="Charging Port"
                    isOpen={status.chargingPort}
                    onClick={() => toggleStatus('chargingPort')}
                  />
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-4">Tire Pressure (PSI)</h2>
                <TirePressure pressures={tirePressure} />
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-4">Battery Status</h2>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                        Charging
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-green-600">
                        82%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                    <div
                      style={{ width: "82%" }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600">
                    Range: 242 miles
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}