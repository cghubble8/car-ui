import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SettingsCard } from '../components/SettingsCard';
import { ToggleSwitch } from '../components/ToggleSwitch';
import { SidebarButton } from '../components/SidebarButton';
import { DualSliders } from '../components/DualSliders';

export function Settings() {
  const [activeSection, setActiveSection] = useState('controls');
  const [autoLock, setAutoLock] = useState(true);
  const [climatePrecondition, setClimatePrecondition] = useState(true);
  const [temperature, setTemperature] = useState(22);
  const [fanSpeed, setFanSpeed] = useState(3);
  const [ecoMode, setEcoMode] = useState(false);
  const [offRoadAssist, setOffRoadAssist] = useState(true);
  const [parkingChime, setParkingChime] = useState(true);
  const [autoHighBeam, setAutoHighBeam] = useState(true);

  const renderSection = () => {
    switch (activeSection) {
      case 'controls':
        return (
          <SettingsCard title="Controls">
            <div className="space-y-4">
              <ToggleSwitch
                label="Auto Lock on Walk Away"
                checked={autoLock}
                onChange={() => setAutoLock(!autoLock)}
              />
              <ToggleSwitch
                label="Auto Fold Mirrors"
                checked={offRoadAssist}
                onChange={() => setOffRoadAssist(!offRoadAssist)}
              />
              <ToggleSwitch
                label="Eco Mode"
                checked={ecoMode}
                onChange={() => setEcoMode(!ecoMode)}
              />
              <ToggleSwitch
                label="Parking Sensor Chime"
                checked={parkingChime}
                onChange={() => setParkingChime(!parkingChime)}
              />
            </div>
          </SettingsCard>
        );

      case 'climate':
        return (
          <SettingsCard title="Climate">
            <div className="space-y-6">
              <ToggleSwitch
                label="Climate Preconditioning"
                checked={climatePrecondition}
                onChange={() => setClimatePrecondition(!climatePrecondition)}
              />
              <div className="py-8">
                <DualSliders
                  temperature={temperature}
                  onTemperatureChange={setTemperature}
                  fanSpeed={fanSpeed}
                  onFanSpeedChange={setFanSpeed}
                />
              </div>
            </div>
          </SettingsCard>
        );

      case 'driving':
        return (
          <SettingsCard title="Driving">
            <div className="space-y-4">
              <ToggleSwitch
                label="Off Road Assist"
                checked={offRoadAssist}
                onChange={() => setOffRoadAssist(!offRoadAssist)}
              />
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Regenerative Braking</span>
                <select className="bg-gray-100 rounded px-3 py-2">
                  <option>Standard</option>
                  <option>Low</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Acceleration</span>
                <select className="bg-gray-100 rounded px-3 py-2">
                  <option>Standard</option>
                  <option>Chill</option>
                  <option>Sport</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Steering Mode</span>
                <select className="bg-gray-100 rounded px-3 py-2">
                  <option>Standard</option>
                  <option>Comfort</option>
                  <option>Sport</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Stopping Mode</span>
                <select className="bg-gray-100 rounded px-3 py-2">
                  <option>Roll</option>
                  <option>Creep</option>
                  <option>Hold</option>
                </select>
              </div>
            </div>
          </SettingsCard>
        );

      case 'vehicle':
        return (
          <SettingsCard title="Vehicle Info">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Model</span>
                <span className="text-gray-500">Model S</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Software Version</span>
                <span className="text-gray-500">2024.5.1</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">VIN</span>
                <span className="text-gray-500">5YJ3E1EA8JF000001</span>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors w-full">
                Check for Updates
              </button>
            </div>
          </SettingsCard>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-64 bg-white shadow-lg p-6 space-y-4 fixed h-screen">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Navigation</h2>
          <Link
            to="/"
            className="text-blue-500 hover:text-blue-600 transition-colors"
          >
            🏠 Home
          </Link>
        </div>
        <SidebarButton
          label="Controls"
          icon="🔒"
          onClick={() => setActiveSection('controls')}
          active={activeSection === 'controls'}
        />
        <SidebarButton
          label="Climate"
          icon="🌡️"
          onClick={() => setActiveSection('climate')}
          active={activeSection === 'climate'}
        />
        <SidebarButton
          label="Driving"
          icon="🚗"
          onClick={() => setActiveSection('driving')}
          active={activeSection === 'driving'}
        />
        <SidebarButton
          label="Vehicle Info"
          icon="ℹ️"
          onClick={() => setActiveSection('vehicle')}
          active={activeSection === 'vehicle'}
        />
      </div>

      <div className="ml-64 flex-1">
        <div className="max-w-2xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-8">Car Settings</h1>
          {renderSection()}
        </div>
      </div>
    </div>
  );
}