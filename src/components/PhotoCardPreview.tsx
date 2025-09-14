'use client';

import { useRef, useEffect, forwardRef } from 'react';
import { PhotoCardData, BrandingConfig, CardDimensions } from '@/types';

interface PhotoCardPreviewProps {
  data: PhotoCardData;
  branding: BrandingConfig;
  dimensions: CardDimensions;
}

const PhotoCardPreview = forwardRef<HTMLDivElement, PhotoCardPreviewProps>(
  ({ data, branding, dimensions }, ref) => {
    const { image, imageUrl, headline } = data;

    // Calculate dynamic heights based on headline length for preview only
    const getHeaderHeight = () => {
      if (!headline) return 64; // Default height when no headline
      const charCount = headline.length;
      if (charCount <= 30) return 80;  // Short title - more space for image
      if (charCount <= 60) return 100; // Medium title
      if (charCount <= 90) return 120; // Long title
      return 140; // Very long title
    };

    // For download, use fixed proportions
    const isDownloading = false; // This will be set during download
    const headerHeight = isDownloading ? 100 : getHeaderHeight(); // Fixed 100px for download
    const bottomHeight = 48; // Fixed bottom section height

    const containerStyle = {
      width: '100%',
      maxWidth: '500px',
      aspectRatio: dimensions.aspectRatio,
      position: 'relative' as const,
    };

    return (
      <div className="w-full">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Preview</h3>
        
        <div className="bg-gray-100 rounded-lg p-4">
          <div
            ref={ref}
            style={containerStyle}
            className="mx-auto bg-white overflow-hidden shadow-lg relative"
            id="photo-card-preview"
          >
            {/* Header Section with Headline */}
            <div 
              className="absolute top-0 left-0 right-0 px-6 py-4 z-20 flex items-center justify-center" 
              style={{ 
                backgroundColor: '#124b66',
                height: `${headerHeight}px`
              }}
            >
              {headline ? (
                <h2 className="font-bold text-center bengali-text" style={{ color: '#ffffff', fontSize: '24px', lineHeight: '1.2', wordBreak: 'break-word' }}>
                  {headline}
                </h2>
              ) : (
                <div className="text-center bengali-text" style={{ color: '#bfdbfe', fontSize: '20px' }}>
                  Enter your headline above
                </div>
              )}
            </div>

            {/* Main Image Area */}
            <div 
              className="absolute left-0 right-0" 
              style={{ 
                top: `${headerHeight}px`, 
                bottom: `${bottomHeight}px` 
              }}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="News content"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)' }}>
                  <div className="text-center" style={{ color: '#6b7280' }}>
                    <div className="mb-2">
                      <svg
                        className="mx-auto h-12 w-12"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="text-sm">Upload an image to see preview</p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Section with Date and Branding */}
            <div 
              className="absolute bottom-0 left-0 right-0 px-6 py-2 z-20 flex justify-between items-center" 
              style={{ 
                backgroundColor: '#ffffff',
                height: `${bottomHeight}px`
              }}
            >
              <div style={{ color: '#4b5563', fontSize: '14px' }}>
                {new Date().toLocaleDateString('bn-BD', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <div className="flex items-center">
                <img
                  src={branding.logo}
                  alt="Channel Logo"
                  className="h-6 w-auto mr-2"
                />
              </div>
            </div>

            {/* Card dimensions watermark for development - hidden during download */}
            <div className="absolute top-2 left-2 px-2 py-1 rounded print:hidden download-hide" style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: '#ffffff', fontSize: '12px', opacity: '0.5' }}>
              {dimensions.width}×{dimensions.height}
            </div>
          </div>

          {/* Info panel */}
          <div className="mt-4 text-sm text-gray-600 space-y-1">
            <p>
              <span className="font-medium">Status:</span>{' '}
              {imageUrl && headline
                ? 'Ready to download'
                : !imageUrl && !headline
                ? 'Upload image and add headline'
                : !imageUrl
                ? 'Upload an image'
                : 'Add a headline'}
            </p>
            <p>
              <span className="font-medium">Dimensions:</span> {dimensions.width} × {dimensions.height} pixels
            </p>
            <p>
              <span className="font-medium">Aspect Ratio:</span> {dimensions.aspectRatio}
            </p>
          </div>
        </div>
      </div>
    );
  }
);

PhotoCardPreview.displayName = 'PhotoCardPreview';

export default PhotoCardPreview;