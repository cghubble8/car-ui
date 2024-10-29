import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { StatusIndicator } from '../components/StatusIndicator';
import { TirePressure } from '../components/TirePressure';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function RoutingMachine({ destination }) {
  const map = useMap();

  React.useEffect(() => {
    if (!destination) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(32.2288, 110.9488), // Starting point (UA)
        L.latLng(destination.lat, destination.lng)
      ],
      routeWhileDragging: true,
      lineOptions: {
        styles: [{ color: '#6366f1', weight: 4 }]
      },
      show: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, destination]);

  return null;
}

export function Home() {
  const position = [37.7749, -122.4194]; // San Francisco coordinates
  const [destination, setDestination] = useState(null);
  const [searchInput, setSearchInput] = useState('');
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

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchInput)}`
      );
      const data = await response.json();
      
      if (data.length > 0) {
        setDestination({
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon)
        });
      }
    } catch (error) {
      console.error('Error searching for location:', error);
    }
  };

  return (
    <div className="min-h-screen">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-800">Car Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
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

      <div className="p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left side - Car Status */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-lg p-4">
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
                <StatusIndicator
                  label="Left Front Door"
                  isOpen={status.leftFrontDoor}
                  onClick={() => toggleStatus('leftFrontDoor')}
                />
                <StatusIndicator
                  label="Right Front Door"
                  isOpen={status.rightFrontDoor}
                  onClick={() => toggleStatus('rightFrontDoor')}
                />
                <StatusIndicator
                  label="Left Rear Door"
                  isOpen={status.leftRearDoor}
                  onClick={() => toggleStatus('leftRearDoor')}
                />
                <StatusIndicator
                  label="Right Rear Door"
                  isOpen={status.rightRearDoor}
                  onClick={() => toggleStatus('rightRearDoor')}
                />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Tire Pressure (PSI)</h2>
              <TirePressure pressures={tirePressure} />
            </div>

            <div className="bg-white rounded-lg shadow-lg p-4">
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

          {/* Right side - Map */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Enter destination..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ height: "calc(100vh - 180px)" }}>
              <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                  <Popup>Your car is here</Popup>
                </Marker>
                {destination && (
                  <Marker position={[destination.lat, destination.lng]}>
                    <Popup>Destination</Popup>
                  </Marker>
                )}
                {destination && <RoutingMachine destination={destination} />}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}