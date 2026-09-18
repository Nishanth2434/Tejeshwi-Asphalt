import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { useSiteContent } from '../../lib/getContent';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [logoError, setLogoError] = React.useState(false);

  const brandName = useSiteContent('footer.brand.name', 'TEJASHWI');
  const brandTagline = useSiteContent('footer.brand.tagline', 'Asphalt & Constructions');
  const companySummary = useSiteContent(
    'footer.companySummary',
    'Premium asphalt and infrastructure construction services. Building the robust roads to the future with precision, durability, and world-class engineering innovation.'
  );
  const servicesTitle = useSiteContent('footer.servicesTitle', 'Our Services');
  const quickLinksTitle = useSiteContent('footer.quickLinksTitle', 'Quick Links');
  const contactTitle = useSiteContent('footer.contactTitle', 'Contact Us');
  const phone = useSiteContent('footer.phone', '+1 (555) 123-4567');
  const phone2 = useSiteContent('footer.phone2', '');
  const email = useSiteContent('footer.email', 'contact@apexinfra.com');
  const address = useSiteContent('footer.address', '123 Industrial Parkway, Suite 100, Metropolis, NY 10001');
  const copyrightTemplate = useSiteContent(
    'footer.copyrightText',
    '© {year} Tejashwi Asphalt and Constructions. All rights reserved.'
  );

  const renderedCopyright = copyrightTemplate.replace('{year}', currentYear.toString());

  return (
    <footer className="bg-brand-50 text-brand-950 pt-20 pb-8 border-t-[6px] border-brand-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Company Summary */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center inline-flex">
              {!logoError ? (
                <div className="flex items-center gap-5">
                  <img 
                    src="/gsp-logo.jpg" 
                    alt="GSP Constructions Logo" 
                    className="h-16 w-auto mix-blend-multiply contrast-125 brightness-105" 
                    onError={() => setLogoError(true)}
                  />
                  
                  <div className="h-14 w-[2px] bg-brand-200"></div>
                  
                  <div className="flex flex-col items-start justify-center">
                    <span className="font-bold text-[28px] tracking-[0.2em] text-brand-950 leading-none mb-2">
                      {brandName.slice(0, 3)}<span className="text-accent-500">{brandName.slice(3, 4) || 'A'}</span>{brandName.slice(4)}
                    </span>
                    <div className="flex items-center gap-2.5">
                      <div className="h-[1.5px] w-4 bg-accent-500/70"></div>
                      <span className="text-[11px] font-semibold tracking-[0.2em] text-brand-600 uppercase">
                        {brandTagline}
                      </span>
                      <div className="h-[1.5px] w-4 bg-accent-500/70"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <span className="font-bold text-3xl tracking-tight text-brand-950">
                  {brandName}<span className="text-accent-500 text-xl ml-1">Constructions</span>
                </span>
              )}
            </Link>
            <p className="text-brand-700 text-lg leading-relaxed max-w-sm">
              {companySummary}
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-brand-100 transition-colors">
                <svg className="w-5 h-5 text-brand-600" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.324V1.325C24 .597 23.403 0 22.675 0z"/></svg>
              </a>

              <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-brand-100 transition-colors">
                <svg className="w-5 h-5 text-brand-600" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-brand-100 transition-colors">
                <svg className="w-5 h-5 text-brand-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="text-xl font-semibold mb-6 text-brand-950 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-brand-500 rounded-full inline-block"></span>
              {servicesTitle}
            </h4>
            <ul className="space-y-4">
              {[
                { name: 'Road Construction', path: '/services/road-construction' },
                { name: 'Asphalt Paving', path: '/services/asphalt-paving' },
                { name: 'Road Maintenance', path: '/services/road-maintenance' },
                { name: 'Infrastructure Development', path: '/services/infrastructure' }
              ].map((service) => (
                <li key={service.name}>
                  <Link 
                    to={service.path}
                    className="text-brand-700 hover:text-brand-600 transition-colors flex items-center gap-2 group font-medium"
                  >
                    <ArrowRight className="h-4 w-4 text-brand-500 group-hover:translate-x-1 transition-transform" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xl font-semibold mb-6 text-brand-950 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-brand-500 rounded-full inline-block"></span>
              {quickLinksTitle}
            </h4>
            <ul className="space-y-4">
              {['About', 'Projects', 'Equipment', 'Gallery', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-brand-700 hover:text-brand-600 transition-colors flex items-center gap-2 group font-medium"
                  >
                    <ArrowRight className="h-4 w-4 text-brand-500 group-hover:translate-x-1 transition-transform" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-3">
            <h4 className="text-xl font-semibold mb-6 text-brand-950 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-brand-500 rounded-full inline-block"></span>
              {contactTitle}
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 text-brand-700 font-medium">
                <div className="bg-white shadow-sm p-3 rounded-lg text-brand-600 shrink-0">
                  <MapPin className="h-6 w-6" />
                </div>
                <div className="leading-relaxed pt-1 whitespace-pre-line">
                  <strong className="block text-brand-950 font-bold mb-1">Corporate Office</strong>
                  {address}
                </div>
              </li>
              <li className="flex items-center gap-4 text-brand-700 font-medium">
                <div className="bg-white shadow-sm p-3 rounded-lg text-brand-600 shrink-0">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <strong className="block text-brand-950 font-bold mb-0.5">Phone</strong>
                  {phone}
                  {phone2 && <><br />{phone2}</>}
                </div>
              </li>
              <li className="flex items-center gap-4 text-brand-700 font-medium">
                <div className="bg-white shadow-sm p-3 rounded-lg text-brand-600 shrink-0">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <strong className="block text-brand-950 font-bold mb-0.5">Email</strong>
                  {email}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-brand-200 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-brand-600 font-medium">
            {renderedCopyright}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-sm font-medium text-brand-600">
            <Link to="/privacy-policy" className="hover:text-brand-900 transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-brand-900 transition-colors">Terms of Service</Link>
            <Link to="/sitemap" className="hover:text-brand-900 transition-colors">Sitemap</Link>

          </div>
        </div>
      </div>
    </footer>
  );
};

