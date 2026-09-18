import React, { useEffect, useState } from 'react';
import { Mail, Loader2, Calendar, MapPin, Briefcase, Phone, AlertCircle, RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { format } from 'date-fns';

type Inquiry = {
  id: string;
  created_at: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  location: string;
  project_type: string;
  project_size: string;
  message: string;
  status: string;
};

export const Inbox = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchInquiries = async () => {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInquiries(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const markAsRead = async (id: string) => {
    const inquiry = inquiries.find(i => i.id === id);
    if (inquiry?.status !== 'read') {
      await supabase.from('inquiries').update({ status: 'read' }).eq('id', id);
      setInquiries(inquiries.map(i => i.id === id ? { ...i, status: 'read' } : i));
    }
  };

  const handleSelect = (id: string) => {
    setSelectedId(id);
    markAsRead(id);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-brand-600">
        <Loader2 className="w-8 h-8 animate-spin mb-4" />
        <p>Loading messages...</p>
      </div>
    );
  }

  const selectedInquiry = inquiries.find(i => i.id === selectedId);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-950 flex items-center gap-2">
          <Mail className="w-6 h-6 text-brand-500" />
          Client Inbox
        </h1>
        <button 
          onClick={() => { setRefreshing(true); fetchInquiries(); }}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-brand-200 rounded-lg text-brand-600 hover:bg-brand-50 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-brand-200 overflow-hidden grid lg:grid-cols-3 min-h-[600px]">
        {/* Sidebar */}
        <div className="border-r border-brand-200 bg-brand-50/30 overflow-y-auto max-h-[800px]">
          {inquiries.length === 0 ? (
            <div className="p-8 text-center text-brand-500">
              <Mail className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>No messages yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-brand-100">
              {inquiries.map((inq) => (
                <button
                  key={inq.id}
                  onClick={() => handleSelect(inq.id)}
                  className={`w-full text-left p-4 transition-colors hover:bg-brand-50 ${
                    selectedId === inq.id ? 'bg-white border-l-4 border-l-brand-500' : 'border-l-4 border-l-transparent'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`font-semibold truncate ${inq.status === 'unread' ? 'text-brand-950 font-bold' : 'text-brand-700'}`}>
                      {inq.name}
                    </h3>
                    <span className="text-xs text-brand-400 whitespace-nowrap ml-2">
                      {format(new Date(inq.created_at), 'MMM d')}
                    </span>
                  </div>
                  <p className="text-sm text-brand-600 truncate">{inq.project_type}</p>
                  {inq.status === 'unread' && (
                    <span className="inline-block mt-2 px-2 py-0.5 bg-brand-500 text-white text-[10px] font-bold uppercase rounded-full tracking-wider">
                      New
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detail View */}
        <div className="lg:col-span-2 bg-white flex flex-col">
          {selectedInquiry ? (
            <div className="p-6 md:p-8 overflow-y-auto">
              <div className="border-b border-brand-100 pb-6 mb-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-brand-950 mb-1">{selectedInquiry.name}</h2>
                    <p className="text-brand-500 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <a href={`mailto:${selectedInquiry.email}`} className="hover:underline">{selectedInquiry.email}</a>
                    </p>
                  </div>
                  <div className="text-right text-brand-400 text-sm flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(selectedInquiry.created_at), 'PPp')}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mt-6">
                  {selectedInquiry.phone && (
                    <div className="flex items-center gap-3 text-brand-700">
                      <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center text-brand-600"><Phone className="w-4 h-4" /></div>
                      <div><span className="block text-xs font-semibold text-brand-400 uppercase tracking-wider">Phone</span> {selectedInquiry.phone}</div>
                    </div>
                  )}
                  {selectedInquiry.company && (
                    <div className="flex items-center gap-3 text-brand-700">
                      <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center text-brand-600"><Briefcase className="w-4 h-4" /></div>
                      <div><span className="block text-xs font-semibold text-brand-400 uppercase tracking-wider">Company</span> {selectedInquiry.company}</div>
                    </div>
                  )}
                  {selectedInquiry.location && (
                    <div className="flex items-center gap-3 text-brand-700">
                      <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center text-brand-600"><MapPin className="w-4 h-4" /></div>
                      <div><span className="block text-xs font-semibold text-brand-400 uppercase tracking-wider">Location</span> {selectedInquiry.location}</div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-brand-50/50 p-6 rounded-xl border border-brand-100 mb-6">
                <h4 className="text-sm font-bold text-brand-950 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-500"></span> Project Details
                </h4>
                <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                  <div>
                    <span className="block text-brand-500 mb-1">Type</span>
                    <strong className="text-brand-950">{selectedInquiry.project_type || 'N/A'}</strong>
                  </div>
                  <div>
                    <span className="block text-brand-500 mb-1">Estimated Size</span>
                    <strong className="text-brand-950">{selectedInquiry.project_size || 'N/A'}</strong>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-brand-950 mb-3">Message</h4>
                <div className="bg-white border border-brand-200 p-6 rounded-xl shadow-sm">
                  <p className="text-brand-700 whitespace-pre-line leading-relaxed">
                    {selectedInquiry.message || <span className="italic text-brand-400">No message provided.</span>}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-brand-400 p-8 text-center">
              <Mail className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-lg">Select a message from the list to read it.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
