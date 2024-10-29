import React from 'react';

export function CarStatus({ status, onToggle }) {
  return (
    <div className="relative">
      <svg
        viewBox="0 0 800 400"
        className="w-full h-auto"
        style={{ maxHeight: '500px' }}
      >
        {/* Car Body */}
        <path
          d="M600,250 C600,200 550,150 500,150 L300,150 C250,150 200,200 200,250 L200,300 L600,300 L600,250"
          fill="#2563eb"
          className="transition-colors duration-200 hover:fill-blue-700 cursor-pointer"
        />
        
        {/* Roof */}
        <path
          d="M500,150 L300,150 C350,100 450,100 500,150"
          fill="#1d4ed8"
          className="transition-colors duration-200 hover:fill-blue-800 cursor-pointer"
        />

        {/* Windows */}
        <path
          d="M480,140 L320,140 C350,110 450,110 480,140"
          fill="#bfdbfe"
          className="transition-colors duration-200"
        />

        {/* Wheels */}
        <circle cx="280" cy="300" r="40" fill="#1f2937" />
        <circle cx="520" cy="300" r="40" fill="#1f2937" />
        <circle cx="280" cy="300" r="25" fill="#4b5563" />
        <circle cx="520" cy="300" r="25" fill="#4b5563" />

        {/* Interactive Elements */}
        <g onClick={() => onToggle('trunk')} className="cursor-pointer">
          <rect
            x="550"
            y="200"
            width="40"
            height="80"
            fill={status.trunk ? '#ef4444' : '#22c55e'}
            className="transition-colors duration-200"
          />
          <text x="570" y="240" textAnchor="middle" fill="white" fontSize="12">
            T
          </text>
        </g>

        <g onClick={() => onToggle('frunk')} className="cursor-pointer">
          <rect
            x="210"
            y="200"
            width="40"
            height="80"
            fill={status.frunk ? '#ef4444' : '#22c55e'}
            className="transition-colors duration-200"
          />
          <text x="230" y="240" textAnchor="middle" fill="white" fontSize="12">
            F
          </text>
        </g>

        <g onClick={() => onToggle('chargingPort')} className="cursor-pointer">
          <circle
            cx="180"
            cy="250"
            r="15"
            fill={status.chargingPort ? '#ef4444' : '#22c55e'}
            className="transition-colors duration-200"
          />
          <text x="180" y="254" textAnchor="middle" fill="white" fontSize="12">
            C
          </text>
        </g>

        {/* Doors */}
        {['leftFrontDoor', 'rightFrontDoor', 'leftRearDoor', 'rightRearDoor'].map((door, index) => {
          const x = 300 + (index % 2) * 150;
          const y = 150;
          return (
            <g key={door} onClick={() => onToggle(door)} className="cursor-pointer">
              <rect
                x={x}
                y={y}
                width="20"
                height="130"
                fill={status[door] ? '#ef4444' : '#22c55e'}
                className="transition-colors duration-200"
              />
              <text
                x={x + 10}
                y={y + 65}
                textAnchor="middle"
                fill="white"
                fontSize="12"
              >
                D
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}