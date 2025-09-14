import html2canvas from 'html2canvas';

export interface DownloadOptions {
  quality: number;
  format: 'png' | 'jpeg';
  filename?: string;
  width?: number;
  height?: number;
}

export const downloadPhotoCard = async (
  element: HTMLElement,
  options: DownloadOptions = {
    quality: 0.95,
    format: 'png',
    filename: 'news-photo-card'
  }
): Promise<void> => {
  try {
    // Add downloading class to hide development elements
    element.classList.add('downloading');
    
    // Wait a bit to ensure fonts are loaded and class is applied
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Use simplified html2canvas options for better compatibility
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      foreignObjectRendering: false,
      logging: false,
      width: element.offsetWidth,
      height: element.offsetHeight,
      ignoreElements: (element: Element) => {
        return element.classList?.contains('download-hide') || false;
      },
      onclone: (clonedDoc: Document) => {
        // Remove any remaining development elements from the clone
        const devElements = clonedDoc.querySelectorAll('.download-hide');
        devElements.forEach(el => el.remove());
        
        // Fix layout for consistent download ratio
        const previewElement = clonedDoc.getElementById('photo-card-preview');
        if (previewElement) {
          // Force fixed header height for download (100px)
          const headerSection = previewElement.querySelector('[style*="124b66"]') as HTMLElement;
          if (headerSection) {
            headerSection.style.height = '100px';
          }
          
          // Force fixed image area positioning
          const imageSection = previewElement.querySelector('[style*="top:"]') as HTMLElement;
          if (imageSection) {
            imageSection.style.top = '100px';
            imageSection.style.bottom = '48px';
          }
        }
        
        // Replace any problematic CSS with inline styles
        const elements = clonedDoc.querySelectorAll('*');
        elements.forEach((el: Element) => {
          const htmlEl = el as HTMLElement;
          // Remove any CSS custom properties that might cause issues
          if (htmlEl.style) {
            // Force standard color values
            const computedStyle = getComputedStyle(htmlEl);
            if (computedStyle.backgroundColor && computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)') {
              htmlEl.style.backgroundColor = computedStyle.backgroundColor;
            }
            if (computedStyle.color) {
              htmlEl.style.color = computedStyle.color;
            }
          }
        });
      }
    } as any);

    // Remove downloading class
    element.classList.remove('downloading');

    // Convert canvas to blob with error handling
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob from canvas'));
          }
        },
        options.format === 'png' ? 'image/png' : 'image/jpeg',
        options.quality
      );
    });

    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `${options.filename || 'news-photo-card'}.${options.format}`;
    link.href = url;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    URL.revokeObjectURL(url);
  } catch (error) {
    // Make sure to remove downloading class even if error occurs
    element.classList.remove('downloading');
    
    console.error('Error generating photo card:', error);
    
    // More specific error messages
    if (error instanceof Error) {
      if (error.message.includes('tainted')) {
        throw new Error('Image loading failed. Please try uploading a different image.');
      } else if (error.message.includes('canvas')) {
        throw new Error('Canvas rendering failed. Please refresh and try again.');
      }
    }
    
    throw new Error('Failed to generate photo card. Please try again.');
  }
};

export const generatePreviewDataURL = async (
  element: HTMLElement,
  options: Partial<DownloadOptions> = {}
): Promise<string> => {
  try {
    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 1,
      useCORS: true,
      allowTaint: true,
      width: options.width,
      height: options.height,
    } as any);

    return canvas.toDataURL(
      options.format === 'jpeg' ? 'image/jpeg' : 'image/png',
      options.quality || 0.8
    );
  } catch (error) {
    console.error('Error generating preview:', error);
    throw new Error('Failed to generate preview.');
  }
};