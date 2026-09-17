import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

const NavLink = ({ 
  to, 
  children, 
  isActive 
}: { 
  to: string; 
  children: React.ReactNode; 
  isActive: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link 
      to={to}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative px-3.5 xl:px-5 py-2 text-[13px] xl:text-[14px] font-medium tracking-[0.05em] transition-all duration-500 inline-block uppercase whitespace-nowrap",
        isActive ? "text-brand-950" : "text-brand-600 hover:text-brand-950"
      )}
    >
      <motion.span 
        className="relative z-10 inline-block"
        animate={{ y: isHovered ? -2 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
      
      {/* Active Indicator */}
      {isActive && (
        <motion.div 
          layoutId="active-nav-indicator-editorial" 
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent-500 rounded-full" 
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}

      {/* Hover Thin Arc */}
      <motion.svg 
        className="absolute -bottom-1.5 left-0 w-full h-[6px] overflow-visible pointer-events-none text-brand-400"
        preserveAspectRatio="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered && !isActive ? 1 : 0 }}
        viewBox="0 0 100 6"
      >
        <motion.path 
          d="M 10 6 Q 50 0 90 6"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isHovered && !isActive ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.svg>
    </Link>
  );
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  const servicesLinks = [
    { name: 'Road Construction', path: '/services/road-construction' },
    { name: 'Asphalt Paving', path: '/services/asphalt-paving' },
    { name: 'Road Maintenance', path: '/services/road-maintenance' },
    { name: 'Infrastructure Development', path: '/services/infrastructure' }
  ];

  return (
    <motion.header
      className="fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none transition-all duration-700 ease-[0.16,1,0.3,1]"
      initial={{ paddingTop: 0 }}
      animate={{ paddingTop: isScrolled ? 16 : 24 }}
    >
      <nav 
        className={cn(
          "pointer-events-auto flex items-center justify-between gap-4 xl:gap-8 transition-all duration-700 ease-[0.16,1,0.3,1] mx-auto overflow-visible",
          isScrolled 
            ? "w-[96%] md:w-[95%] xl:w-[94%] max-w-7xl bg-[#FDFBF7]/95 backdrop-blur-xl shadow-[0_12px_40px_rgb(0,0,0,0.08)] border border-brand-950/10 rounded-[16px] md:rounded-[20px] px-4 sm:px-6 md:px-8 py-2 md:py-2.5" 
            : "w-full md:w-[96%] max-w-7xl bg-transparent border-transparent rounded-none md:rounded-[16px] px-4 sm:px-6 md:px-8 py-2 md:py-3.5"
        )}
      >
        
        {/* Logo Lockup - Architectural Editorial Style */}
        <Link to="/" className="flex items-center group relative shrink-0 z-20">
          {!logoError ? (
            <div className="flex items-center gap-3 md:gap-4">
              <img 
                src="/gsp-logo.png" 
                alt="GSP Constructions Logo" 
                className={cn(
                  "w-auto transition-all duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105",
                  isScrolled ? "h-7 md:h-9" : "h-8 md:h-11"
                )} 
                onError={() => setLogoError(true)}
              />
              
              <div className={cn(
                "w-[1px] bg-brand-950/15 hidden sm:block transition-all duration-700",
                isScrolled ? "h-6" : "h-8"
              )}></div>
              
              <div className="flex flex-col items-start justify-center transition-transform duration-500 group-hover:scale-[1.01] origin-left">
                <span className="font-bold text-[14px] md:text-[18px] tracking-[0.2em] md:tracking-[0.25em] text-brand-950 leading-none mb-1 transition-colors duration-300">
                  TEJ<span className="text-accent-500">A</span>SHWI
                </span>
                <span className="text-[6px] md:text-[8px] font-semibold tracking-[0.15em] md:tracking-[0.2em] text-brand-500 uppercase">
                  Asphalt & Constructions
                </span>
              </div>
            </div>
          ) : (
            <span className="font-bold text-xl tracking-widest transition-colors text-brand-950">
              TEJASHWI<span className="text-accent-500 ml-1">Constructions</span>
            </span>
          )}
        </Link>

        {/* Center: Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-center shrink-0 gap-0.5 xl:gap-1.5">
          <NavLink to="/about" isActive={isActive('/about')}>About</NavLink>

          {/* Services Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className={cn(
              "relative flex items-center gap-1.5 px-3.5 xl:px-5 py-2 text-[13px] xl:text-[14px] font-medium tracking-[0.05em] uppercase transition-all duration-500 group whitespace-nowrap",
              isActive('/services') || servicesOpen ? "text-brand-950" : "text-brand-600 hover:text-brand-950"
            )}>
              <motion.span 
                className="relative z-10 flex items-center gap-1"
                animate={{ y: servicesOpen ? -2 : 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                Services
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-500", servicesOpen && "rotate-180")} />
              </motion.span>
              
              {isActive('/services') && !servicesOpen && (
                <motion.div 
                  layoutId="active-nav-indicator-editorial" 
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent-500 rounded-full" 
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
            
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.97 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 w-[300px] bg-[#FDFBF7]/95 backdrop-blur-xl rounded-[12px] shadow-[0_20px_40px_rgb(0,0,0,0.1)] border border-brand-950/5 overflow-hidden p-3"
                >
                  <div className="flex flex-col gap-1">
                    {servicesLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        className="group/link relative flex items-center px-4 py-3 rounded-lg overflow-hidden transition-all duration-300 hover:bg-brand-50"
                      >
                        <div className="absolute left-0 w-[2px] h-[60%] top-1/2 -translate-y-1/2 bg-accent-500 scale-y-0 origin-center group-hover/link:scale-y-100 transition-transform duration-400 ease-[0.16,1,0.3,1] rounded-r-full" />
                        <span className="text-[13px] font-medium tracking-wide text-brand-700 group-hover/link:text-brand-950 transition-colors z-10 group-hover/link:translate-x-2 transform duration-400 ease-[0.16,1,0.3,1]">
                          {link.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavLink to="/projects" isActive={isActive('/projects')}>Projects</NavLink>
          <NavLink to="/equipment" isActive={isActive('/equipment')}>Equipment</NavLink>
          <NavLink to="/gallery" isActive={isActive('/gallery')}>Gallery</NavLink>
        </div>

        {/* Right: CTA Area */}
        <div className="hidden lg:flex items-center justify-end shrink-0 z-20">
          <Link to="/contact">
            <button className={cn(
              "group relative overflow-hidden bg-brand-950 text-[#FDFBF7] font-semibold text-[12px] xl:text-[13px] tracking-widest uppercase transition-all duration-500 hover:shadow-[0_8px_20px_rgb(3,7,18,0.15)]",
              isScrolled ? "rounded-[12px] px-5 xl:px-7 py-2.5" : "rounded-[14px] px-6 xl:px-8 py-3"
            )}>
              <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-white whitespace-nowrap">
                Get a Quote
              </span>
              <div className="absolute inset-0 z-0 h-full w-full bg-accent-500 translate-y-[101%] transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:translate-y-0" />
            </button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center lg:hidden z-50">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-xl bg-brand-950/5 text-brand-950 focus:outline-none transition-colors hover:bg-brand-950/10"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation (Slide Down) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#FDFBF7] z-40 lg:hidden overflow-y-auto pt-28"
          >
            <div className="px-6 pb-12 flex flex-col space-y-6">
              <Link to="/about" className="text-3xl font-bold tracking-tight text-brand-950 hover:text-accent-500 transition-colors">
                About
              </Link>
              
              <div className="space-y-4">
                <button 
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="flex items-center justify-between w-full text-3xl font-bold tracking-tight text-brand-950"
                >
                  Services
                  <ChevronDown className={cn("h-8 w-8 transition-transform duration-300", servicesOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-6 flex flex-col space-y-4 overflow-hidden"
                    >
                      {servicesLinks.map(link => (
                        <Link key={link.name} to={link.path} className="text-xl font-medium text-brand-700 hover:text-accent-500">
                          {link.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/projects" className="text-3xl font-bold tracking-tight text-brand-950 hover:text-accent-500 transition-colors">
                Projects
              </Link>
              <Link to="/equipment" className="text-3xl font-bold tracking-tight text-brand-950 hover:text-accent-500 transition-colors">
                Equipment
              </Link>
              <Link to="/gallery" className="text-3xl font-bold tracking-tight text-brand-950 hover:text-accent-500 transition-colors">
                Gallery
              </Link>

              <div className="pt-10 mt-6 border-t border-brand-950/10 flex flex-col gap-4">
                <Link to="/contact">
                  <button className="w-full text-lg py-5 rounded-[16px] font-bold tracking-wider uppercase bg-brand-950 text-white shadow-xl shadow-brand-950/20 active:scale-95 transition-all">
                    Get a Quote
                  </button>
                </Link>
                <a href="tel:+15551234567" className="flex items-center justify-center gap-2 text-brand-700 py-4 font-medium hover:text-brand-950 transition-colors">
                  <Phone className="h-5 w-5" /> Call Us Today
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};


