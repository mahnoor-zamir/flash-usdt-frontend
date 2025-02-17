import React from 'react';
import { XIcon } from 'lucide-react';

interface AlertProps {
  message: string;
  type?: 'error' | 'success';
  onClose: () => void;
}

export const Alert = ({ message, type = 'error', onClose }: AlertProps) => {
  const getBgColor = () => {
    return type === 'error' 
      ? 'bg-red-900/20 border-red-700/50' 
      : 'bg-green-900/20 border-green-700/50';
  };

  const getIconBg = () => {
    return type === 'error' 
      ? 'bg-red-500' 
      : 'bg-green-500';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className={`p-6 bg-gray-900 rounded-lg shadow-xl border ${getBgColor()} max-w-md w-full mx-4`}>
        <div className="flex items-start justify-between">
          <div className="flex items-start">
            <div className={`p-2 rounded-full ${getIconBg()} mr-3`}>
              {type === 'error' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <div>
              <h3 className={`text-lg font-medium ${type === 'error' ? 'text-red-400' : 'text-green-400'}`}>
                {type === 'error' ? 'Error' : 'Success'}
              </h3>
              <p className="mt-2 text-white/80">
                {message}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-800 transition-colors"
          >
            <XIcon className="h-5 w-5 text-gray-400" />
          </button>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className={`px-4 py-2 text-white rounded transition-colors ${
              type === 'error' 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};