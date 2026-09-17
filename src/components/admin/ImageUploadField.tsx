import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  Image as ImageIcon, 
  Trash2, 
  RotateCcw, 
  Link as LinkIcon, 
  CheckCircle, 
  Loader2,
  AlertCircle
} from 'lucide-react';
import { processImageUpload } from '../../lib/imageUtils';

interface ImageUploadFieldProps {
  value: string;
  onChange: (newImageUrl: string) => void;
  label?: string;
  helperText?: string;
  defaultFallback?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  value,
  onChange,
  label,
  helperText,
  defaultFallback
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [manualUrl, setManualUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = async (file: File) => {
    setErrorMessage(null);
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (PNG, JPG, WEBP, SVG).');
      return;
    }

    try {
      setIsProcessing(true);
      const dataUrl = await processImageUpload(file);
      onChange(dataUrl);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to process image.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleClearImage = () => {
    if (defaultFallback) {
      onChange(defaultFallback);
    } else {
      onChange('');
    }
  };

  const handleManualUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualUrl.trim()) {
      onChange(manualUrl.trim());
      setManualUrl('');
      setShowUrlInput(false);
    }
  };

  const isBase64 = value?.startsWith('data:image/');

  return (
    <div className="space-y-3">
      {/* Hidden native file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp, image/svg+xml"
        className="hidden"
        onChange={handleInputChange}
      />

      <div className="grid sm:grid-cols-12 gap-4 items-stretch">
        
        {/* LEFT: DROP ZONE / UPLOADER */}
        <div className="sm:col-span-8 flex flex-col justify-between">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer rounded-2xl border-2 border-dashed p-6 text-center transition-all flex flex-col items-center justify-center min-h-[160px] group ${
              isDragging
                ? 'border-brand-500 bg-brand-50/70 scale-[1.01]'
                : 'border-slate-300 hover:border-brand-400 bg-slate-50/60 hover:bg-slate-50'
            }`}
          >
            {isProcessing ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
                <span className="text-xs font-semibold text-slate-700">Optimizing & uploading image...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2.5">
                <div className="w-12 h-12 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-800 block">
                    Click to browse or drop image here
                  </span>
                  <span className="text-xs text-slate-400 block mt-0.5">
                    Supports PNG, JPG, WebP, SVG (Auto-compressed)
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Action Bar under Dropzone */}
          <div className="flex flex-wrap items-center justify-between gap-2 mt-2 pt-1">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <UploadCloud className="w-3.5 h-3.5" /> Upload File
              </button>

              <button
                type="button"
                onClick={() => setShowUrlInput(!showUrlInput)}
                className="px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1"
              >
                <LinkIcon className="w-3.5 h-3.5" />
                {showUrlInput ? 'Hide URL' : 'Or paste URL'}
              </button>
            </div>

            {value && (
              <button
                type="button"
                onClick={handleClearImage}
                className="px-2.5 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1"
                title="Remove current image"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove
              </button>
            )}
          </div>

          {helperText && (
            <p className="text-[11px] text-slate-400 mt-1.5">{helperText}</p>
          )}

          {/* Optional Direct URL Input Field */}
          {showUrlInput && (
            <form onSubmit={handleManualUrlSubmit} className="mt-2 flex gap-2">
              <input
                type="text"
                placeholder="https://images.unsplash.com/..."
                value={manualUrl}
                onChange={(e) => setManualUrl(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-3 py-1.5 text-xs font-bold text-white bg-slate-800 hover:bg-slate-900 rounded-lg"
              >
                Apply URL
              </button>
            </form>
          )}

          {errorMessage && (
            <div className="flex items-center gap-1.5 text-xs text-rose-600 mt-2">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* RIGHT: PREVIEW BOX */}
        <div className="sm:col-span-4 bg-slate-100 rounded-2xl p-3 border border-slate-200 flex flex-col items-center justify-between min-h-[160px]">
          <div className="w-full flex-1 flex items-center justify-center overflow-hidden rounded-xl bg-slate-200 relative group">
            {value ? (
              <>
                <img
                  src={value}
                  alt={label || 'Uploaded preview'}
                  className="w-full h-32 object-cover rounded-xl shadow-sm group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-2.5 py-1 rounded-md bg-white text-slate-900 text-xs font-bold shadow"
                  >
                    Change Image
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center text-slate-400 gap-1 p-4 text-center">
                <ImageIcon className="w-8 h-8 opacity-40" />
                <span className="text-xs">No image selected</span>
              </div>
            )}
          </div>

          {/* Footer info tag */}
          <div className="w-full flex items-center justify-between mt-2 pt-1 border-t border-slate-200 text-[10px] text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-emerald-500" />
              {isBase64 ? 'Local Upload' : value ? 'Linked URL' : 'Empty'}
            </span>
            <span className="truncate max-w-[120px]" title={value}>
              {isBase64 ? 'Optimized Base64' : value ? value.split('/').pop() : ''}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
