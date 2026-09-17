import React, { useState, useEffect } from 'react';
import { 
  getNavItems, 
  updateNavItems, 
  resetNavItems, 
  EVENT_NAV_UPDATED 
} from '../../lib/contentStore';
import type { NavItem } from '../../types/content';
import { 
  Menu as MenuIcon, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Edit2, 
  Check, 
  X, 
  RotateCcw, 
  ExternalLink, 
  Eye, 
  EyeOff, 
  ChevronRight, 
  CheckCircle2,
  FolderPlus
} from 'lucide-react';

export const NavigationPage: React.FC = () => {
  const [items, setItems] = useState<NavItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{ label: string; href: string; isExternal?: boolean }>({
    label: '',
    href: '',
    isExternal: false
  });
  
  // Add modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newParentId, setNewParentId] = useState<string | null>(null);
  const [newItemForm, setNewItemForm] = useState({
    label: '',
    href: '',
    isExternal: false
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadNav = () => {
    setItems(getNavItems());
  };

  useEffect(() => {
    loadNav();

    const handleUpdate = () => {
      loadNav();
    };

    window.addEventListener(EVENT_NAV_UPDATED, handleUpdate);
    return () => window.removeEventListener(EVENT_NAV_UPDATED, handleUpdate);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Reorder top-level
  const handleMoveTopLevel = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= items.length) return;

    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[targetIdx];
    newItems[targetIdx] = temp;

    // re-assign order numbers
    newItems.forEach((it, i) => {
      it.order = i + 1;
    });

    setItems(newItems);
    updateNavItems(newItems);
    triggerToast('Navigation order updated!');
  };

  // Reorder child item
  const handleMoveChild = (parentIndex: number, childIndex: number, direction: 'up' | 'down') => {
    const parent = items[parentIndex];
    if (!parent.children) return;

    const targetChildIdx = direction === 'up' ? childIndex - 1 : childIndex + 1;
    if (targetChildIdx < 0 || targetChildIdx >= parent.children.length) return;

    const newChildren = [...parent.children];
    const temp = newChildren[childIndex];
    newChildren[childIndex] = newChildren[targetChildIdx];
    newChildren[targetChildIdx] = temp;

    newChildren.forEach((c, idx) => {
      c.order = idx + 1;
    });

    const newItems = [...items];
    newItems[parentIndex] = {
      ...parent,
      children: newChildren
    };

    setItems(newItems);
    updateNavItems(newItems);
    triggerToast('Submenu order updated!');
  };

  // Toggle active status
  const handleToggleActive = (id: string) => {
    const toggleRecursive = (list: NavItem[]): NavItem[] => {
      return list.map(item => {
        if (item.id === id) {
          return { ...item, isActive: !item.isActive };
        }
        if (item.children) {
          return { ...item, children: toggleRecursive(item.children) };
        }
        return item;
      });
    };

    const newItems = toggleRecursive(items);
    setItems(newItems);
    updateNavItems(newItems);
    triggerToast('Link visibility updated!');
  };

  // Delete item
  const handleDeleteItem = (id: string, label: string) => {
    if (!window.confirm(`Delete "${label}" from website navigation?`)) return;

    const deleteRecursive = (list: NavItem[]): NavItem[] => {
      return list
        .filter(item => item.id !== id)
        .map(item => {
          if (item.children) {
            return { ...item, children: deleteRecursive(item.children) };
          }
          return item;
        });
    };

    const newItems = deleteRecursive(items);
    setItems(newItems);
    updateNavItems(newItems);
    triggerToast(`Removed "${label}"!`);
  };

  // Start editing
  const handleStartEdit = (item: NavItem) => {
    setEditingId(item.id);
    setEditForm({
      label: item.label,
      href: item.href,
      isExternal: !!item.isExternal
    });
  };

  // Save inline edit
  const handleSaveEdit = (id: string) => {
    const editRecursive = (list: NavItem[]): NavItem[] => {
      return list.map(item => {
        if (item.id === id) {
          return {
            ...item,
            label: editForm.label.trim(),
            href: editForm.href.trim(),
            isExternal: editForm.isExternal
          };
        }
        if (item.children) {
          return { ...item, children: editRecursive(item.children) };
        }
        return item;
      });
    };

    const newItems = editRecursive(items);
    setItems(newItems);
    updateNavItems(newItems);
    setEditingId(null);
    triggerToast('Saved nav item changes!');
  };

  // Add new item
  const handleAddNewItem = () => {
    if (!newItemForm.label.trim() || !newItemForm.href.trim()) {
      alert('Please fill out both link label and destination URL/path.');
      return;
    }

    const newItemId = `nav-${Date.now()}`;
    const newItem: NavItem = {
      id: newItemId,
      label: newItemForm.label.trim(),
      href: newItemForm.href.trim(),
      order: 99,
      isActive: true,
      isExternal: newItemForm.isExternal,
      parentId: newParentId || undefined
    };

    let newItems: NavItem[] = [];

    if (newParentId) {
      newItems = items.map(parent => {
        if (parent.id === newParentId) {
          const children = parent.children || [];
          return {
            ...parent,
            children: [...children, { ...newItem, order: children.length + 1 }]
          };
        }
        return parent;
      });
    } else {
      newItems = [...items, { ...newItem, order: items.length + 1 }];
    }

    setItems(newItems);
    updateNavItems(newItems);
    setShowAddModal(false);
    setNewItemForm({ label: '', href: '', isExternal: false });
    setNewParentId(null);
    triggerToast(`Added "${newItem.label}" to navigation!`);
  };

  // Reset to default
  const handleReset = () => {
    if (window.confirm('Reset all navigation items to factory defaults?')) {
      resetNavItems();
      loadNav();
      triggerToast('Navigation reset to factory defaults.');
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <MenuIcon className="w-6 h-6 text-brand-600" />
            Navigation Menu Studio
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Customize header navigation items, reorder hierarchy, add submenus, or toggle link visibility.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Menu
          </button>

          <button
            type="button"
            onClick={() => {
              setNewParentId(null);
              setShowAddModal(true);
            }}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Main Nav Link
          </button>
        </div>
      </div>

      {/* LIVE PREVIEW BAR */}
      <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 shadow-sm">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2 px-1">
          <span className="font-semibold uppercase tracking-wider text-[11px] text-brand-400">Desktop Navbar Preview</span>
          <span>Only active items appear on live site</span>
        </div>

        <div className="bg-slate-950/60 p-3 rounded-xl flex items-center gap-6 overflow-x-auto border border-slate-800">
          <div className="font-black text-white text-sm tracking-wider pr-4 border-r border-slate-800">
            TEJ<span className="text-amber-400">A</span>SHWI
          </div>

          <div className="flex items-center gap-5">
            {items.filter(i => i.isActive).map(item => (
              <div key={item.id} className="relative group flex items-center gap-1 text-xs font-semibold text-slate-300">
                <span>{item.label}</span>
                {item.children && item.children.length > 0 && (
                  <span className="text-[10px] text-slate-500">▾</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NAVIGATION TREE LIST */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Site Navigation Hierarchy ({items.length} top-level links)
          </h2>
        </div>

        <div className="p-4 sm:p-6 space-y-4">
          {items.map((item, idx) => {
            const isEditing = editingId === item.id;

            return (
              <div 
                key={item.id}
                className={`rounded-xl border transition-all ${
                  item.isActive ? 'border-slate-200 bg-white' : 'border-slate-200 bg-slate-50/60 opacity-60'
                }`}
              >
                {/* TOP-LEVEL ROW */}
                <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  
                  {/* Left info or Edit form */}
                  <div className="flex-1">
                    {isEditing ? (
                      <div className="grid sm:grid-cols-12 gap-3 items-center">
                        <div className="sm:col-span-5">
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Label</label>
                          <input
                            type="text"
                            value={editForm.label}
                            onChange={(e) => setEditForm({ ...editForm, label: e.target.value })}
                            className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
                          />
                        </div>
                        <div className="sm:col-span-5">
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">URL / Route</label>
                          <input
                            type="text"
                            value={editForm.href}
                            onChange={(e) => setEditForm({ ...editForm, href: e.target.value })}
                            className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
                          />
                        </div>
                        <div className="sm:col-span-2 flex items-center gap-1 pt-4">
                          <button
                            type="button"
                            onClick={() => handleSaveEdit(item.id)}
                            className="p-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 shadow-sm"
                            title="Save"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingId(null)}
                            className="p-1.5 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300"
                            title="Cancel"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                          {idx + 1}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{item.label}</span>
                            {item.isExternal && (
                              <span className="inline-flex items-center gap-1 text-[10px] text-slate-400">
                                <ExternalLink className="w-3 h-3" /> new tab
                              </span>
                            )}
                            {!item.isActive && (
                              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                                Hidden
                              </span>
                            )}
                          </div>
                          <span className="text-xs font-mono text-slate-500">{item.href}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions Right */}
                  <div className="flex items-center gap-2 self-end md:self-center">
                    {/* Add child button */}
                    <button
                      type="button"
                      onClick={() => {
                        setNewParentId(item.id);
                        setShowAddModal(true);
                      }}
                      className="px-2.5 py-1.5 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-lg border border-brand-200 flex items-center gap-1"
                      title="Add dropdown sublink"
                    >
                      <FolderPlus className="w-3.5 h-3.5" />
                      Add Sub-item
                    </button>

                    {/* Visibility toggle */}
                    <button
                      type="button"
                      onClick={() => handleToggleActive(item.id)}
                      className={`p-1.5 rounded-lg border text-xs transition-colors ${
                        item.isActive 
                          ? 'text-slate-600 bg-white border-slate-200 hover:bg-slate-100' 
                          : 'text-amber-600 bg-amber-50 border-amber-200 hover:bg-amber-100'
                      }`}
                      title={item.isActive ? 'Hide link' : 'Show link'}
                    >
                      {item.isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>

                    {/* Reorder buttons */}
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveTopLevel(idx, 'up')}
                      className="p-1.5 text-slate-400 hover:text-slate-700 disabled:opacity-20 rounded border border-slate-200 hover:bg-slate-50"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === items.length - 1}
                      onClick={() => handleMoveTopLevel(idx, 'down')}
                      className="p-1.5 text-slate-400 hover:text-slate-700 disabled:opacity-20 rounded border border-slate-200 hover:bg-slate-50"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>

                    {/* Edit button */}
                    <button
                      type="button"
                      onClick={() => handleStartEdit(item)}
                      className="p-1.5 text-slate-600 hover:text-brand-600 rounded border border-slate-200 hover:bg-slate-50"
                      title="Edit link details"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(item.id, item.label)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded border border-slate-200 hover:bg-rose-50"
                      title="Delete link"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* SUBMENU CHILDREN LIST */}
                {item.children && item.children.length > 0 && (
                  <div className="bg-slate-50/80 border-t border-slate-100 p-3 sm:pl-12 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Dropdown Items ({item.children.length})
                    </span>

                    {item.children.map((child, cIdx) => {
                      const isChildEditing = editingId === child.id;

                      return (
                        <div 
                          key={child.id}
                          className={`p-2.5 rounded-lg border bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                            child.isActive ? 'border-slate-200' : 'border-slate-200 opacity-60'
                          }`}
                        >
                          <div className="flex-1">
                            {isChildEditing ? (
                              <div className="grid sm:grid-cols-12 gap-2 items-center">
                                <div className="sm:col-span-5">
                                  <input
                                    type="text"
                                    value={editForm.label}
                                    onChange={(e) => setEditForm({ ...editForm, label: e.target.value })}
                                    className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded"
                                  />
                                </div>
                                <div className="sm:col-span-5">
                                  <input
                                    type="text"
                                    value={editForm.href}
                                    onChange={(e) => setEditForm({ ...editForm, href: e.target.value })}
                                    className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded"
                                  />
                                </div>
                                <div className="sm:col-span-2 flex items-center gap-1">
                                  <button
                                    type="button"
                                    onClick={() => handleSaveEdit(child.id)}
                                    className="p-1 bg-emerald-600 text-white rounded"
                                  >
                                    <Check className="w-3 h-3" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setEditingId(null)}
                                    className="p-1 bg-slate-200 text-slate-700 rounded"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                                <span className="font-semibold text-slate-800 text-xs">{child.label}</span>
                                <span className="font-mono text-[11px] text-slate-400">{child.href}</span>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-1.5 self-end sm:self-center">
                            <button
                              type="button"
                              onClick={() => handleToggleActive(child.id)}
                              className="p-1 text-slate-400 hover:text-slate-600"
                              title={child.isActive ? 'Hide sublink' : 'Show sublink'}
                            >
                              {child.isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3 text-amber-500" />}
                            </button>
                            <button
                              type="button"
                              disabled={cIdx === 0}
                              onClick={() => handleMoveChild(idx, cIdx, 'up')}
                              className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-20"
                            >
                              <ArrowUp className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              disabled={cIdx === item.children!.length - 1}
                              onClick={() => handleMoveChild(idx, cIdx, 'down')}
                              className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-20"
                            >
                              <ArrowDown className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleStartEdit(child)}
                              className="p-1 text-slate-400 hover:text-brand-600"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteItem(child.id, child.label)}
                              className="p-1 text-slate-400 hover:text-rose-600"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ADD ITEM MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              {newParentId ? 'Add Submenu Item' : 'Add Main Navigation Link'}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              {newParentId 
                ? 'This link will appear in the dropdown underneath the selected menu item.'
                : 'This link will appear directly in the top header navbar.'}
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Navigation Label *</label>
                <input
                  type="text"
                  placeholder="e.g. Careers or Case Studies"
                  value={newItemForm.label}
                  onChange={(e) => setNewItemForm({ ...newItemForm, label: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Destination URL / Route *</label>
                <input
                  type="text"
                  placeholder="/careers or https://partner.com"
                  value={newItemForm.href}
                  onChange={(e) => setNewItemForm({ ...newItemForm, href: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="externalCheckbox"
                  checked={newItemForm.isExternal}
                  onChange={(e) => setNewItemForm({ ...newItemForm, isExternal: e.target.checked })}
                  className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300"
                />
                <label htmlFor="externalCheckbox" className="text-xs text-slate-700 font-medium">
                  Open link in new browser tab (_blank)
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddNewItem}
                className="px-4 py-2 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm transition-colors"
              >
                Add Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING TOAST */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
