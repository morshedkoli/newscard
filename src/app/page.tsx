'use client';

import { useState, useRef } from 'react';
import ImageUpload from '@/components/ImageUpload';
import TitleInput from '@/components/TitleInput';
import PhotoCardPreview from '@/components/PhotoCardPreview';
import DownloadButton from '@/components/DownloadButton';
import PinAuth from '@/components/PinAuth';
import { defaultBrandingConfig } from '@/components/BrandingElements';
import { downloadPhotoCard } from '@/utils/downloadUtils';
import { PhotoCardData, CardDimensions } from '@/types';

const defaultDimensions: CardDimensions = {
  width: 1200,
  height: 630,
  aspectRatio: '1.91/1'
};

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [photoCardData, setPhotoCardData] = useState<PhotoCardData>({
    image: null,
    imageUrl: null,
    headline: ''
  });

  const previewRef = useRef<HTMLDivElement>(null);

  const handleImageChange = (data: Partial<PhotoCardData>) => {
    setPhotoCardData(prev => ({ ...prev, ...data }));
  };

  const handleHeadlineChange = (headline: string) => {
    setPhotoCardData(prev => ({ ...prev, headline }));
  };

  const handleDownload = async () => {
    if (!previewRef.current) {
      throw new Error('Preview not available');
    }

    await downloadPhotoCard(previewRef.current, {
      quality: 0.95,
      format: 'png',
      filename: `news-card-${Date.now()}`,
      width: defaultDimensions.width,
      height: defaultDimensions.height
    });
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const isReady = Boolean(photoCardData.imageUrl && photoCardData.headline.trim());

  // Show PIN authentication if not authenticated
  if (!isAuthenticated) {
    return <PinAuth onSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="text-center flex-1">
              <h1 className="text-3xl font-bold text-gray-900">
                News Photo Card Dashboard
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Create professional news photo cards with branded elements
              </p>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="ml-4 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              title="Logout"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Create Your Photo Card
              </h2>
              
              <div className="space-y-6">
                {/* Step 1: Upload Image */}
                <div>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mr-3">
                      <span className="text-sm font-bold text-blue-600">1</span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-800">Upload Image</h3>
                  </div>
                  <ImageUpload
                    onImageChange={handleImageChange}
                    currentImage={photoCardData.imageUrl}
                  />
                </div>

                {/* Step 2: Add Headline */}
                <div>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mr-3">
                      <span className="text-sm font-bold text-blue-600">2</span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-800">Add Headline</h3>
                  </div>
                  <TitleInput
                    value={photoCardData.headline}
                    onChange={handleHeadlineChange}
                    placeholder="Enter your news headline in Bengali or English..."
                    maxLength={120}
                  />
                </div>

                {/* Step 3: Download */}
                <div>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mr-3">
                      <span className="text-sm font-bold text-blue-600">3</span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-800">Download</h3>
                  </div>
                  <DownloadButton
                    onDownload={handleDownload}
                    isReady={isReady}
                  />
                </div>
              </div>
            </div>

            {/* Branding Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">Branding Information</h4>
              <div className="text-sm text-blue-700 space-y-1">
                <p><span className="font-medium">Channel:</span> {defaultBrandingConfig.channelName}</p>
                <p><span className="font-medium">Logo Position:</span> {defaultBrandingConfig.logoPosition}</p>
                <p><span className="font-medium">Output Size:</span> {defaultDimensions.width} × {defaultDimensions.height}px</p>
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-8">
            <PhotoCardPreview
              ref={previewRef}
              data={photoCardData}
              branding={defaultBrandingConfig}
              dimensions={defaultDimensions}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>News Photo Card Dashboard - Create professional branded news cards</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
