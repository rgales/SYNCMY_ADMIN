import React from 'react';
import { CheckCircle, XCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

export function Toast({ message, type, onClose }: ToastProps) {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
  };

  const colors = {
    success: 'bg-green-50 text-green-800',
    error: 'bg-red-50 text-red-800',
    info: 'bg-blue-50 text-blue-800',
  };

  const Icon = icons[type];

  return (
    <div className={`fixed bottom-4 right-4 rounded-lg p-4 ${colors[type]} shadow-lg`}>
      <div className="flex items-center">
        <Icon className="h-5 w-5 mr-2" />
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-gray-400 hover:text-gray-500"
        >
          <XCircle className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}