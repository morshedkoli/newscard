'use client';

import { BrandingConfig } from '@/types';

interface BrandingElementsProps {
  config: BrandingConfig;
  className?: string;
}

export default function BrandingElements({ config, className = "" }: BrandingElementsProps) {
  const getPositionClasses = () => {
    switch (config.logoPosition) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      default:
        return 'bottom-4 right-4';
    }
  };

  return (
    <div className={`absolute ${getPositionClasses()} ${className}`}>
      <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
        <img
          src={config.logo}
          alt="Channel Logo"
          className="h-6 w-auto mr-2"
        />
        <span className="text-sm font-bold text-gray-800">
          {config.channelName}
        </span>
      </div>
    </div>
  );
}

// Default branding configuration
export const defaultBrandingConfig: BrandingConfig = {
  logo: '/logo.png',
  channelName: 'TAKA POST',
  logoPosition: 'bottom-right'
};