'use client';

import { useState } from 'react';

interface DownloadButtonProps {
  onDownload: () => Promise<void>;
  disabled?: boolean;
  isReady?: boolean;
}

export default function DownloadButton({ onDownload, disabled = false, isReady = false }: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    if (disabled || isDownloading) return;
    
    setIsDownloading(true);
    setError(null);
    
    try {
      await onDownload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Download failed');
    } finally {
      setIsDownloading(false);
    }
  };

  const buttonClass = `
    w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2
    ${disabled || !isReady
      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
      : isDownloading
      ? 'bg-blue-400 text-white cursor-wait'
      : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-lg hover:shadow-xl'
    }
  `;

  return (
    <div className="w-full">
      <button
        onClick={handleDownload}
        disabled={disabled || !isReady || isDownloading}
        className={buttonClass}
      >
        {isDownloading ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Generating...</span>
          </>
        ) : (
          <>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>Download Photo Card</span>
          </>
        )}
      </button>

      {!isReady && !disabled && (
        <p className="text-sm text-amber-600 mt-2 text-center">
          Upload an image and add a headline to enable download
        </p>
      )}

      {error && (
        <div className="mt-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
          {error}
        </div>
      )}
    </div>
  );
}