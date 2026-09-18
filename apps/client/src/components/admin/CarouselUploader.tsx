import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  Trash2, 
  ArrowLeft, 
  ArrowRight, 
  Image as ImageIcon, 
  Plus, 
  RotateCcw,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Eye,
  Link as LinkIcon
} from 'lucide-react';
import { processImageUpload } from '../../lib/imageUtils';

interface CarouselUploaderProps {
  images: string[];
  onChange: (newImages: string[]) => void;
  defaultImages?: string[];
  label?: string;
  description?: string;
}

export const CarouselUploader: React.FC<CarouselUploaderProps> = ({
  images,
  onChange,
  defaultImages = [],
  label = 'Hero Background Scrolling Images',
  description = 'Upload and manage the background images that cycle in the hero section.'
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [replaceIndex, setReplaceIndex] = useState<number | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [manualUrl, setManualUrl] = useState('');
  const addFileInputRef = useRef<HTMLInputElement | null>(null);
  const replaceFileInputRef = useRef<HTMLInputElement | null>(null);

  const safeImages = Array.isArray(images) ? images : [];

  // Handle adding new image(s)
  const handleAddNewFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setErrorMessage(null);
    setIsProcessing(true);

    try {
      const newUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('image/')) {
          const dataUrl = await processImageUpload(file);
          newUrls.push(dataUrl);
        }
      }

      if (newUrls.length > 0) {
        onChange([...safeImages, ...newUrls]);
      } else {
        setErrorMessage('Please select valid image files (PNG, JPG, WebP, SVG).');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to process image upload.');
    } finally {
      setIsProcessing(false);
      if (addFileInputRef.current) addFileInputRef.current.value = '';
    }
  };

  // Handle replacing existing image
  const handleReplaceFile = async (files: FileList | null) => {
    if (!files || files.length === 0 || replaceIndex === null) return;
    setErrorMessage(null);
    setIsProcessing(true);

    try {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const dataUrl = await processImageUpload(file);
        const updated = [...safeImages];
        updated[replaceIndex] = dataUrl;
        onChange(updated);
      } else {
        setErrorMessage('Please select a valid image file.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to replace image.');
    } finally {
      setIsProcessing(false);
      setReplaceIndex(null);
      if (replaceFileInputRef.current) replaceFileInputRef.current.value = '';
    }
  };

  // Reorder
  const handleMove = (index: number, direction: 'left' | 'right') => {
    const targetIdx = direction === 'left' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= safeImages.length) return;

    const updated = [...safeImages];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    onChange(updated);
  };

  // Remove
  const handleRemove = (index: number) => {
    if (safeImages.length <= 1) {
      alert('The hero section requires at least 1 background image.');
      return;
    }
    const updated = safeImages.filter((_, i) => i !== index);
    onChange(updated);
  };

  // Add manual URL
  const handleAddManualUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualUrl.trim()) {
      onChange([...safeImages, manualUrl.trim()]);
      setManualUrl('');
      setShowUrlInput(false);
    }
  };

  // Reset to default
  const handleResetToDefault = () => {
    if (defaultImages.length > 0 && window.confirm('Reset hero background images to original factory slides?')) {
      onChange([...defaultImages]);
    }
  };

  return (
    <div className="space-y-4 bg-slate-50/70 p-4 sm:p-6 rounded-2xl border border-slate-200">
      
      {/* Hidden file inputs */}
      <input
        ref={addFileInputRef}
        type="file"
        multiple
        accept="image/png, image/jpeg, image/webp, image/svg+xml"
        className="hidden"
        onChange={(e) => handleAddNewFiles(e.target.files)}
      />

      <input
        ref={replaceFileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp, image/svg+xml"
        className="hidden"
        onChange={(e) => handleReplaceFile(e.target.files)}
      />

      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-200/80">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              {label} ({safeImages.length})
            </span>
          </div>
          {description && (
            <span className="text-[11px] text-slate-400 font-medium">
              {description}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {defaultImages.length > 0 && (
            <button
              type="button"
              onClick={handleResetToDefault}
              className="px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors flex items-center gap-1 shadow-sm"
              title="Reset background slides to factory defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          )}

          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors flex items-center gap-1 shadow-sm"
          >
            <LinkIcon className="w-3.5 h-3.5" />
            {showUrlInput ? 'Hide URL' : 'Paste URL'}
          </button>

          <button
            type="button"
            onClick={() => addFileInputRef.current?.click()}
            disabled={isProcessing}
            className="px-3.5 py-1.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-800 rounded-lg transition-all flex items-center gap-1.5 shadow-sm"
          >
            {isProcessing ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <UploadCloud className="w-3.5 h-3.5" />
            )}
            Upload Image
          </button>
        </div>
      </div>

      {/* Manual URL Form (optional) */}
      {showUrlInput && (
        <form onSubmit={handleAddManualUrl} className="flex gap-2 p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
          <input
            type="text"
            placeholder="https://images.unsplash.com/... (or local asset path)"
            value={manualUrl}
            onChange={(e) => setManualUrl(e.target.value)}
            className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <button
            type="submit"
            className="px-3 py-1.5 text-xs font-bold text-white bg-slate-800 hover:bg-slate-900 rounded-lg"
          >
            Add Image
          </button>
        </form>
      )}

      {/* Error alert */}
      {errorMessage && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Slides Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {safeImages.map((imgUrl, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col group hover:shadow-md transition-all"
          >
            {/* Image Preview Thumbnail */}
            <div className="relative aspect-video bg-slate-100 overflow-hidden">
              <img
                src={imgUrl}
                alt={`Hero Slide ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              
              <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black px-2 py-0.5 rounded shadow">
                Slide #{idx + 1}
              </div>

              {/* Hover Quick-Upload Overlay */}
              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setReplaceIndex(idx);
                    replaceFileInputRef.current?.click();
                  }}
                  className="px-3 py-1.5 bg-white text-slate-900 text-xs font-bold rounded-lg shadow-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5"
                >
                  <UploadCloud className="w-3.5 h-3.5 text-brand-600" /> Replace Image
                </button>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="p-3 bg-white flex items-center justify-between border-t border-slate-100">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => handleMove(idx, 'left')}
                  className="p-1.5 text-slate-400 hover:text-slate-700 disabled:opacity-20 rounded border border-slate-200 hover:bg-slate-50"
                  title="Move earlier"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  disabled={idx === safeImages.length - 1}
                  onClick={() => handleMove(idx, 'right')}
                  className="p-1.5 text-slate-400 hover:text-slate-700 disabled:opacity-20 rounded border border-slate-200 hover:bg-slate-50"
                  title="Move later"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setReplaceIndex(idx);
                    replaceFileInputRef.current?.click();
                  }}
                  className="px-2 py-1 text-xs font-semibold text-brand-600 hover:text-brand-700 hover:bg-brand-50 rounded transition-colors flex items-center gap-1"
                  title="Upload replacement photo"
                >
                  <UploadCloud className="w-3.5 h-3.5" /> Upload
                </button>

                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded border border-slate-200 hover:bg-rose-50 transition-colors"
                  title="Delete slide"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Upload New Slide Dropzone Card */}
        <div
          onClick={() => addFileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleAddNewFiles(e.dataTransfer.files);
          }}
          className="cursor-pointer border-2 border-dashed border-slate-300 hover:border-brand-500 bg-white/70 hover:bg-brand-50/50 rounded-xl p-6 min-h-[160px] flex flex-col items-center justify-center text-center transition-all group"
        >
          <div className="w-12 h-12 rounded-full bg-brand-50 group-hover:bg-brand-100 text-brand-600 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform shadow-sm">
            <UploadCloud className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-slate-800 block">
            Upload Background Slide
          </span>
          <span className="text-[11px] text-slate-400 block mt-0.5">
            Click or drag & drop image here
          </span>
        </div>
      </div>

    </div>
  );
};
