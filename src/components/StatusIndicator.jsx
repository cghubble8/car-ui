import React from 'react';

export function StatusIndicator({ label, isOpen, onClick }) {
  return (
    <div
      className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={onClick}
    >
      <span className="font-medium text-gray-700">{label}</span>
      <span
        className={`px-2 py-1 rounded-full text-sm font-medium ${
          isOpen
            ? 'bg-red-100 text-red-600'
            : 'bg-green-100 text-green-600'
        }`}
      >
        {isOpen ? 'Open' : 'Closed'}
      </span>
    </div>
  );
}