'use client';

import { useState } from 'react';

interface PinAuthProps {
  onSuccess: () => void;
}

export default function PinAuth({ onSuccess }: PinAuthProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const CORRECT_PIN = '9632';

  const handlePinChange = (value: string) => {
    // Only allow digits and max 4 characters
    const digits = value.replace(/\D/g, '').slice(0, 4);
    setPin(digits);
    setError('');

    // Auto-submit when 4 digits are entered
    if (digits.length === 4) {
      setTimeout(() => validatePin(digits), 100);
    }
  };

  const validatePin = (pinToCheck: string) => {
    setIsLoading(true);
    
    setTimeout(() => {
      if (pinToCheck === CORRECT_PIN) {
        setError('');
        onSuccess();
      } else {
        setError('Incorrect PIN. Please try again.');
        setPin('');
      }
      setIsLoading(false);
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length === 4) {
      validatePin(pin);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">News Card Dashboard</h1>
          <p className="text-gray-600">Enter your 4-digit PIN to access</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PIN Code
            </label>
            <input
              type="password"
              value={pin}
              onChange={(e) => handlePinChange(e.target.value)}
              placeholder="Enter 4-digit PIN"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-2xl tracking-widest focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              maxLength={4}
              autoFocus
              disabled={isLoading}
            />
            
            {/* Visual PIN dots */}
            <div className="flex justify-center mt-4 space-x-3">
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-full border-2 transition-colors ${
                    index < pin.length
                      ? 'bg-blue-600 border-blue-600'
                      : 'border-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={pin.length !== 4 || isLoading}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              pin.length === 4 && !isLoading
                ? 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Verifying...
              </div>
            ) : (
              'Access Dashboard'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Secure access • TAKA POST News Dashboard
          </p>
        </div>
      </div>
    </div>
  );
}