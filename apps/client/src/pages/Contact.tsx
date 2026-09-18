import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { MapPin, Phone, Mail, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useSiteContent } from '../lib/getContent';
import ctaBg from '../assets/images/hero/cta_bg.jpg';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Dynamic Content Hooks
  const heroBadge = useSiteContent('contact.hero.badge', 'Get In Touch');
  const heroHeadline = useSiteContent('contact.hero.headline', "Let's Build Something That Lasts.");
  const infoTitle = useSiteContent('contact.info.title', 'Contact Information');
  const addressTitle = useSiteContent('contact.info.addressTitle', 'Corporate Headquarters');
  const address = useSiteContent('contact.info.address', 'Level 4, Apex Tower\nPlot 45, Infrastructure Tech Park\nMumbai, MH 400001');
  const phoneTitle = useSiteContent('contact.info.phoneTitle', 'Direct Line');
  const phone = useSiteContent('contact.info.phone', '+91 (800) 123-4567');
  const hours = useSiteContent('contact.info.hours', 'Mon-Sat: 8AM - 6PM');
  const emailTitle = useSiteContent('contact.info.emailTitle', 'Email Inquiries');
  const emails = useSiteContent<string[]>('contact.info.emails', ['projects@apexinfra.com', 'careers@apexinfra.com']);
  const mapBadge = useSiteContent('contact.map.badge', 'HQ Location Map');
  const formTitle = useSiteContent('contact.form.title', 'Request a Quote');
  const formSubtitle = useSiteContent('contact.form.subtitle', 'Fill out the details below and our estimators will get back to you promptly.');
  const submitButtonText = useSiteContent('contact.form.submitButtonText', 'Submit Quote Request');
  const privacyNotice = useSiteContent('contact.form.privacyNotice', 'By submitting this form, you agree to our privacy policy. Your information is strictly confidential.');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    location: '',
    type: 'Road Construction',
    size: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 1. Save to Supabase for the Admin Inbox
      const { supabase } = await import('../lib/supabaseClient');
      const { error } = await supabase.from('inquiries').insert([{
        name: formData.name,
        company: formData.company,
        phone: formData.phone,
        email: formData.email,
        location: formData.location,
        project_type: formData.type,
        project_size: formData.size,
        message: formData.message
      }]);

      if (error) {
        console.error('Error saving to Supabase:', error);
      }

      // 2. Send email to Gmail via Web3Forms (if access key is configured)
      const web3formsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      if (web3formsKey) {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: web3formsKey,
            subject: `New Project Inquiry from ${formData.name}`,
            from_name: 'Website Contact Form',
            ...formData
          })
        });
      }

      setIsSuccess(true);
    } catch (err) {
      console.error('Submission failed:', err);
      // Even if email fails, show success if it got this far without crashing
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      
      {/* HERO SECTION */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center bg-brand-950 overflow-hidden pt-16 lg:pt-20">
        <div className="absolute inset-0 z-0 opacity-40">
          <img src={ctaBg} alt="Contact Us" className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 bg-brand-950/70" />
        </div>
        
        <div className="container-custom relative z-10 w-full text-center max-w-4xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="mb-4">
              <span className="text-brand-400 font-bold tracking-widest uppercase text-sm">{heroBadge}</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight whitespace-pre-line">
              {heroHeadline}
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* CONTACT GRID */}
      <section className="section-padding relative z-20 -mt-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
            
            {/* LEFT COLUMN - CONTACT INFO */}
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="lg:col-span-5 space-y-8">
              
              {/* Info Cards */}
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-brand-100 space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-brand-950 mb-6">{infoTitle}</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-brand-950">{addressTitle}</h4>
                        <p className="text-brand-600 whitespace-pre-line">{address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-brand-950">{phoneTitle}</h4>
                        <p className="text-brand-600">{phone}<br/>{hours}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-brand-950">{emailTitle}</h4>
                        <p className="text-brand-600">
                          {(Array.isArray(emails) ? emails : [emails]).map((e: string, idx: number) => (
                            <span key={idx} className="block">{e}</span>
                          ))}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </motion.div>


            {/* RIGHT COLUMN - THE FORM */}
            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="lg:col-span-7 bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-brand-100">
              
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center py-20"
                  >
                    <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h2 className="text-3xl font-bold text-brand-950 mb-4">Quote Request Received!</h2>
                    <p className="text-brand-600 text-lg mb-8 max-w-md">
                      Thank you for choosing Apex. One of our lead engineers will review your project details and contact you within 24 hours.
                    </p>
                    <Button onClick={() => setIsSuccess(false)} variant="outline" className="border-brand-200 text-brand-700">
                      Submit Another Project
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-3xl font-bold text-brand-950 mb-2">{formTitle}</h2>
                      <p className="text-brand-600 mb-8">{formSubtitle}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-brand-950">Full Name *</label>
                        <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full h-12 px-4 rounded-xl border border-brand-200 bg-brand-50/50 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-brand-950">Company Name</label>
                        <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full h-12 px-4 rounded-xl border border-brand-200 bg-brand-50/50 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all" placeholder="Acme Corp" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-brand-950">Phone Number *</label>
                        <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full h-12 px-4 rounded-xl border border-brand-200 bg-brand-50/50 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all" placeholder="+1 (555) 000-0000" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-brand-950">Email Address *</label>
                        <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full h-12 px-4 rounded-xl border border-brand-200 bg-brand-50/50 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all" placeholder="john@company.com" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-brand-950">Project Location</label>
                      <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full h-12 px-4 rounded-xl border border-brand-200 bg-brand-50/50 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all" placeholder="City, State, Zip" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-brand-950">Project Type</label>
                        <select name="type" value={formData.type} onChange={handleChange} className="w-full h-12 px-4 rounded-xl border border-brand-200 bg-brand-50/50 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all text-brand-900">
                          <option>Road Construction</option>
                          <option>Asphalt Paving</option>
                          <option>Road Maintenance</option>
                          <option>Infrastructure</option>
                          <option>Resurfacing</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-brand-950">Approximate Size</label>
                        <input type="text" name="size" value={formData.size} onChange={handleChange} className="w-full h-12 px-4 rounded-xl border border-brand-200 bg-brand-50/50 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all" placeholder="e.g. 5 miles, 20,000 sq ft" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-brand-950">Project Details / Message</label>
                      <textarea name="message" value={formData.message} onChange={handleChange} rows={5} className="w-full p-4 rounded-xl border border-brand-200 bg-brand-50/50 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all resize-none" placeholder="Describe your project requirements..."></textarea>
                    </div>

                    <Button type="submit" disabled={isSubmitting} size="lg" className="w-full h-14 bg-brand-500 hover:bg-brand-400 text-white text-lg rounded-xl flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <><Loader2 className="w-5 h-5 animate-spin" /> Submitting Request...</>
                      ) : (
                        <><Send className="w-5 h-5" /> {submitButtonText}</>
                      )}
                    </Button>
                    <p className="text-xs text-center text-brand-400 mt-4">
                      {privacyNotice}
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>

            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
};
