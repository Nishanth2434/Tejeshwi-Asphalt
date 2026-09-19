import React, { useState, useEffect, useMemo } from 'react';
import { 
  getAllContent, 
  updateContent, 
  batchUpdateContent,
  resetContentKey,
  hasUndoAvailable,
  undoLastSave,
  EVENT_CONTENT_UPDATED 
} from '../../lib/contentStore';
import type { SiteContent } from '../../types/content';
import { 
  Search, 
  Save, 
  RotateCcw, 
  Check, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Layers, 
  ExternalLink,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  UploadCloud
} from 'lucide-react';
import { ImageUploadField } from '../../components/admin/ImageUploadField';
import { CarouselUploader } from '../../components/admin/CarouselUploader';
import { processImageUpload } from '../../lib/imageUtils';



const PAGE_TABS = [
  { id: 'home', label: 'Home Page' },
  { id: 'about', label: 'About Us' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'equipment', label: 'Equipment' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
  { id: 'footer', label: 'Footer' },
];

export const WebsiteContentPage: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [contentList, setContentList] = useState<SiteContent[]>([]);
  // Local edit buffer mapping key -> value
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  // Saved state feedback
  const [savedKey, setSavedKey] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load content
  const loadData = () => {
    const all = getAllContent();
    setContentList(all);
    const initialBuf: Record<string, any> = {};
    all.forEach(item => {
      initialBuf[item.key] = JSON.parse(JSON.stringify(item.value));
    });
    setFormValues(initialBuf);
  };

  useEffect(() => {
    loadData();

    const handleExternalUpdate = () => {
      loadData();
    };

    window.addEventListener(EVENT_CONTENT_UPDATED, handleExternalUpdate);
    return () => window.removeEventListener(EVENT_CONTENT_UPDATED, handleExternalUpdate);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filter content
  const filteredContent = useMemo(() => {
    return contentList.filter(item => {
      const matchesPage = selectedPage === 'all' || item.page === selectedPage;
      if (!matchesPage) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const sectionName = item.section || 'General';
      return (
        item.label.toLowerCase().includes(q) ||
        sectionName.toLowerCase().includes(q) ||
        item.key.toLowerCase().includes(q)
      );
    });
  }, [contentList, selectedPage, searchQuery]);

  // Group by section
  const sectionsGrouped = useMemo(() => {
    const groups: Record<string, SiteContent[]> = {};
    filteredContent.forEach(item => {
      const sectionName = item.section || 'General';
      if (!groups[sectionName]) {
        groups[sectionName] = [];
      }
      groups[sectionName].push(item);
    });
    return groups;
  }, [filteredContent]);

  // Handle single field change
  const handleFieldChange = (key: string, value: any) => {
    setFormValues(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Save single item (kept for internal use if needed, but we will remove the buttons)
  const handleSaveItem = (key: string, label: string) => {
    const valueToSave = formValues[key];
    const ok = updateContent(key, valueToSave);
    if (ok) {
      setSavedKey(key);
      setTimeout(() => setSavedKey(null), 2000);
      triggerToast(`Saved "${label}" successfully!`);
    }
  };

  const [isSavingAll, setIsSavingAll] = useState(false);
  const [canUndo, setCanUndo] = useState(false);

  useEffect(() => {
    setCanUndo(hasUndoAvailable());
  }, []);

  const handleSaveAll = async () => {
    setIsSavingAll(true);
    try {
      const ok = await batchUpdateContent(formValues);
      if (ok) {
        triggerToast("All changes saved successfully!");
        setCanUndo(hasUndoAvailable());
      } else {
        triggerToast("Failed to save changes.");
      }
    } catch (err) {
      triggerToast("Error saving changes.");
    } finally {
      setIsSavingAll(false);
    }
  };

  const handleUndo = async () => {
    if (!canUndo) return;
    if (window.confirm("Undo the last save? This will revert the website to exactly how it looked before you clicked Save All.")) {
      const ok = await undoLastSave();
      if (ok) {
        loadData();
        triggerToast("Reverted to previous settings.");
        setCanUndo(false);
      } else {
        triggerToast("Failed to undo.");
      }
    }
  };

  // Reset single item
  const handleResetItem = (key: string, label: string) => {
    if (window.confirm(`Reset "${label}" to original factory default?`)) {
      resetContentKey(key);
      loadData();
      triggerToast(`Reset "${label}" to defaults.`);
    }
  };

  // Repeatable block helpers
  const handleAddBlockItem = (key: string, templateObject: any) => {
    const currentArray = formValues[key] || [];
    const newArray = [...currentArray, { ...templateObject }];
    handleFieldChange(key, newArray);
  };

  const handleRemoveBlockItem = (key: string, index: number) => {
    const currentArray = formValues[key] || [];
    const newArray = currentArray.filter((_: any, i: number) => i !== index);
    handleFieldChange(key, newArray);
  };

  const handleMoveBlockItem = (key: string, index: number, direction: 'up' | 'down') => {
    const currentArray = [...(formValues[key] || [])];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentArray.length) return;

    const temp = currentArray[index];
    currentArray[index] = currentArray[targetIndex];
    currentArray[targetIndex] = temp;
    handleFieldChange(key, currentArray);
  };

  const handleBlockFieldChange = (key: string, index: number, field: string, value: any) => {
    const currentArray = [...(formValues[key] || [])];
    currentArray[index] = {
      ...currentArray[index],
      [field]: value
    };
    handleFieldChange(key, currentArray);
  };

  // List helpers
  const handleListStringChange = (key: string, index: number, value: string) => {
    const currentArray = [...(formValues[key] || [])];
    currentArray[index] = value;
    handleFieldChange(key, currentArray);
  };

  const handleAddListItem = (key: string) => {
    const currentArray = formValues[key] || [];
    handleFieldChange(key, [...currentArray, 'New Item']);
  };

  const handleRemoveListItem = (key: string, index: number) => {
    const currentArray = formValues[key] || [];
    handleFieldChange(key, currentArray.filter((_: any, i: number) => i !== index));
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Layers className="w-6 h-6 text-brand-600" />
            Website Content Editor
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Edit text, headlines, images, stats, and lists across any page on your website with instant live syncing.
          </p>
        </div>

        {/* Quick Search and Save */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search all content fields..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
            />
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {canUndo && (
              <button
                onClick={handleUndo}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold shadow-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                title="Undo last save"
              >
                <RotateCcw className="w-4 h-4" />
                Undo
              </button>
            )}
            
            <button
              onClick={handleSaveAll}
              disabled={isSavingAll}
              className="flex-1 sm:flex-none px-6 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold shadow-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {isSavingAll ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
              {isSavingAll ? 'Saving...' : 'Save All Changes'}
            </button>
          </div>
        </div>
      </div>

      {/* PAGE SELECTION PILLS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {PAGE_TABS.map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setSelectedPage(tab.id)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
              selectedPage === tab.id
                ? 'bg-slate-900 text-white shadow-sm scale-100'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SECTIONS LIST */}
      {Object.keys(sectionsGrouped).length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700">No content items found</h3>
          <p className="text-sm text-slate-500 mt-1">Try clearing your search query or choosing another page tab.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(sectionsGrouped).map(([sectionTitle, items]) => (
            <div 
              key={sectionTitle}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
            >
              {/* Section Header */}
              <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-500"></span>
                    {sectionTitle}
                  </h2>
                  <span className="text-xs text-slate-500">{items.length} editable {items.length === 1 ? 'element' : 'elements'}</span>
                </div>
              </div>

              {/* Section Content Fields */}
              <div className="p-6 space-y-8 divide-y divide-slate-100">
                {items.map((item, idx) => {
                  const currentValue = formValues[item.key] !== undefined ? formValues[item.key] : item.value;
                  const isSaved = savedKey === item.key;

                  return (
                    <div key={item.key} className={idx > 0 ? 'pt-8' : ''}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div>
                          <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                            {item.label}
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-normal">
                              {item.type}
                            </span>
                          </label>
                          <span className="text-xs text-slate-400 font-mono">{item.key}</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleResetItem(item.key, item.label)}
                            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors text-xs flex items-center gap-1"
                            title="Reset to factory default"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* FIELD CONTROLS BY TYPE */}
                      
                      {/* 1. Short Text */}
                      {item.type === 'shortText' && (
                        <div className="relative">
                          <input
                            type="text"
                            value={currentValue || ''}
                            onChange={(e) => handleFieldChange(item.key, e.target.value)}
                            className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-slate-800"
                          />
                        </div>
                      )}

                      {/* 2. Rich Text */}
                      {item.type === 'richText' && (
                        <div className="space-y-1">
                          <textarea
                            rows={4}
                            value={currentValue || ''}
                            onChange={(e) => handleFieldChange(item.key, e.target.value)}
                            className="w-full p-4 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-slate-800 resize-y"
                          />
                          <p className="text-[11px] text-slate-400">Line breaks will be preserved on the public site.</p>
                        </div>
                      )}

                      {/* 3. Image (Upload) */}
                      {item.type === 'image' && (
                        <ImageUploadField
                          value={currentValue || ''}
                          onChange={(newUrl) => handleFieldChange(item.key, newUrl)}
                          label={item.label}
                          defaultFallback={item.value}
                        />
                      )}


                      {/* 4. List / Carousel Image Uploader */}
                      {item.type === 'list' && Array.isArray(currentValue) && (
                        (item.key.includes('carousel') || item.key.includes('Images') || item.key.includes('slides')) ? (
                          <CarouselUploader
                            images={currentValue}
                            onChange={(newImages) => handleFieldChange(item.key, newImages)}
                            defaultImages={item.value}
                            label={item.label}
                            description="Upload, arrange, and manage background scrolling images in the hero section."
                          />
                        ) : (
                          <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-700">List Elements ({currentValue.length})</span>
                              <button
                                type="button"
                                onClick={() => handleAddListItem(item.key)}
                                className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700"
                              >
                                <Plus className="w-3.5 h-3.5" /> Add Element
                              </button>
                            </div>
                            
                            <div className="space-y-2">
                              {currentValue.map((listItem: string, lIdx: number) => (
                                <div key={lIdx} className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    value={listItem}
                                    onChange={(e) => handleListStringChange(item.key, lIdx, e.target.value)}
                                    className="flex-1 px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveListItem(item.key, lIdx)}
                                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-white"
                                    title="Delete item"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      )}


                      {/* 5. Repeatable Block (Cards/Testimonials/Stats/Leadership) */}
                      {item.type === 'repeatableBlock' && Array.isArray(currentValue) && (
                        <div className="space-y-4 bg-slate-50/70 p-4 sm:p-6 rounded-2xl border border-slate-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                                Repeating Items ({currentValue.length})
                              </span>
                              <p className="text-xs text-slate-500">Reorder, edit fields, or add new blocks.</p>
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                const template = currentValue[0] 
                                  ? Object.keys(currentValue[0]).reduce((acc, k) => ({ ...acc, [k]: '' }), {}) 
                                  : { title: 'New Item', desc: '' };
                                handleAddBlockItem(item.key, template);
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 text-xs font-bold rounded-lg transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              Add Block Item
                            </button>
                          </div>

                          <div className="space-y-4">
                            {currentValue.map((blockObj: any, bIdx: number) => (
                              <div 
                                key={bIdx}
                                className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm relative group"
                              >
                                {/* Header bar inside card */}
                                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                                    Item #{bIdx + 1} {blockObj.title ? `— ${blockObj.title}` : blockObj.name ? `— ${blockObj.name}` : ''}
                                  </span>

                                  <div className="flex items-center gap-1">
                                    <button
                                      type="button"
                                      disabled={bIdx === 0}
                                      onClick={() => handleMoveBlockItem(item.key, bIdx, 'up')}
                                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:pointer-events-none rounded hover:bg-slate-100"
                                      title="Move up"
                                    >
                                      <ArrowUp className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      disabled={bIdx === currentValue.length - 1}
                                      onClick={() => handleMoveBlockItem(item.key, bIdx, 'down')}
                                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:pointer-events-none rounded hover:bg-slate-100"
                                      title="Move down"
                                    >
                                      <ArrowDown className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveBlockItem(item.key, bIdx)}
                                      className="p-1 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50 ml-1"
                                      title="Remove block item"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>

                                {/* Dynamic fields inside object */}
                                <div className="grid sm:grid-cols-2 gap-3">
                                  {Object.keys(blockObj).map((fieldKey) => (
                                    <div 
                                      key={fieldKey}
                                      className={['desc', 'quote', 'body'].includes(fieldKey) ? 'sm:col-span-2' : ''}
                                    >
                                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                                        {fieldKey}
                                      </label>
                                      {['desc', 'quote', 'body'].includes(fieldKey) ? (
                                        <textarea
                                          rows={2}
                                          value={blockObj[fieldKey] || ''}
                                          onChange={(e) => handleBlockFieldChange(item.key, bIdx, fieldKey, e.target.value)}
                                          className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-brand-500 focus:outline-none"
                                        />
                                      ) : ['image', 'avatar', 'img', 'photo', 'bgimage'].includes(fieldKey.toLowerCase()) ? (
                                        <div className="space-y-1.5">
                                          <div className="flex items-center gap-2">
                                            <input
                                              type="text"
                                              value={blockObj[fieldKey] || ''}
                                              onChange={(e) => handleBlockFieldChange(item.key, bIdx, fieldKey, e.target.value)}
                                              placeholder="Image URL or upload..."
                                              className="flex-1 px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-brand-500 focus:outline-none"
                                            />
                                            <label className="cursor-pointer px-2.5 py-1.5 bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 rounded-lg text-xs font-bold flex items-center gap-1 shrink-0">
                                              <UploadCloud className="w-3.5 h-3.5" /> Upload
                                              <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={async (e) => {
                                                  if (e.target.files?.[0]) {
                                                    try {
                                                      const dataUrl = await processImageUpload(e.target.files[0]);
                                                      handleBlockFieldChange(item.key, bIdx, fieldKey, dataUrl);
                                                    } catch (err) {
                                                      console.error(err);
                                                    }
                                                  }
                                                }}
                                              />
                                            </label>
                                          </div>
                                          {blockObj[fieldKey] && (
                                            <img
                                              src={blockObj[fieldKey]}
                                              alt="Preview"
                                              className="h-12 w-20 object-cover rounded-lg border border-slate-200 shadow-sm"
                                              onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                                            />
                                          )}
                                        </div>
                                      ) : (
                                        <input
                                          type="text"
                                          value={blockObj[fieldKey] || ''}
                                          onChange={(e) => handleBlockFieldChange(item.key, bIdx, fieldKey, e.target.value)}
                                          className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-brand-500 focus:outline-none"
                                        />
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FLOATING TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

    </div>
  );
};
