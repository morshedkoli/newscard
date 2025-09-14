'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import { PhotoCardData } from '@/types';

interface ImageUploadProps {
  onImageChange: (data: Partial<PhotoCardData>) => void;
  currentImage: string | null;
}

export default function ImageUpload({ onImageChange, currentImage }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      setError('Please upload a JPG or PNG image file.');
      return false;
    }

    if (file.size > maxSize) {
      setError('File size must be less than 10MB.');
      return false;
    }

    setError(null);
    return true;
  };

  const handleFile = useCallback((file: File) => {
    if (validateFile(file)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        onImageChange({
          image: file,
          imageUrl: imageUrl
        });
      };
      reader.readAsDataURL(file);
    }
  }, [onImageChange]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragActive(true);
    }
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Upload Image
      </label>
      
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
          dragActive
            ? 'border-blue-400 bg-blue-50'
            : currentImage
            ? 'border-green-400 bg-green-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        {currentImage ? (
          <div className="space-y-2">
            <div className="relative w-32 h-20 mx-auto rounded overflow-hidden">
              <Image
                src={currentImage}
                alt="Uploaded preview"
                width={128}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-green-600 font-medium">Image uploaded successfully!</p>
            <p className="text-xs text-gray-500">Click or drag to replace</p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <svg
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-blue-600 hover:text-blue-500">
                  Click to upload
                </span>{' '}
                or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG or JPG up to 10MB</p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
          {error}
        </div>
      )}
    </div>
  );
}