/**
 * Utility to process, resize, and compress user-uploaded images to optimized base64 Data URLs.
 * This ensures uploaded images fit smoothly into browser storage without hitting quotas.
 */
export const processImageUpload = (
  file: File,
  maxWidth = 1600,
  maxHeight = 1200,
  quality = 0.85
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Selected file is not an image.'));
      return;
    }

    // For SVGs, read as text/dataURL directly without canvas rasterization
    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onerror = (err) => reject(err);
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to load image for processing.'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate proportional scale
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          // Fallback to raw data URL if canvas context unavailable
          resolve(e.target?.result as string);
          return;
        }

        // Draw and compress to JPEG or WebP
        ctx.drawImage(img, 0, 0, width, height);

        try {
          const mime = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
          const compressedDataUrl = canvas.toDataURL(mime, quality);
          resolve(compressedDataUrl);
        } catch {
          resolve(e.target?.result as string);
        }
      };

      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
};
