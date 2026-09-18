import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useSiteContent, useNavItems } from '../../lib/getContent';

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
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const location = useLocation();
  const [logoError, setLogoError] = useState(false);

  // Dynamic Site Content & Nav Items
  const brandName = useSiteContent('nav.brand.name', 'TEJASHWI');
  const accentLetter = useSiteContent('nav.brand.accentLetter', 'A');
  const brandTagline = useSiteContent('nav.brand.tagline', 'Asphalt & Constructions');
  const logoSrc = useSiteContent('nav.brand.logo', '/gsp-logo.png');
  const ctaLabel = useSiteContent('nav.cta.label', 'Get a Quote');
  const ctaLink = useSiteContent('nav.cta.link', '/contact');
  const navItems = useNavItems();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdownId(null);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  const brandParts = React.useMemo(() => {
    if (!accentLetter || !brandName.includes(accentLetter)) {
      return { before: brandName, accent: '', after: '' };
    }
    const idx = brandName.indexOf(accentLetter);
    return {
      before: brandName.slice(0, idx),
      accent: accentLetter,
      after: brandName.slice(idx + accentLetter.length)
    };
  }, [brandName, accentLetter]);

  const activeNavItems = (navItems || []).filter(item => item.isActive !== false);

  return (
    <motion.header
      className="fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none transition-all duration-700 ease-[0.16,1,0.3,1]"
      initial={{ paddingTop: 0 }}
      animate={{ paddingTop: isScrolled ? 8 : 12 }}
    >
      <nav 
        className={cn(
          "pointer-events-auto flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] transition-all duration-700 ease-[0.16,1,0.3,1] mx-auto overflow-visible",
          isScrolled 
            ? "w-[96%] md:w-[95%] xl:w-[94%] max-w-7xl bg-[#FDFBF7]/95 backdrop-blur-xl shadow-[0_12px_40px_rgb(0,0,0,0.08)] border border-brand-950/10 rounded-[16px] md:rounded-[20px] px-4 sm:px-6 md:px-8 py-2 md:py-2.5" 
            : "w-full md:w-[96%] max-w-7xl bg-transparent border-transparent rounded-none md:rounded-[16px] px-4 sm:px-6 md:px-8 py-2 md:py-3.5"
        )}
      >
        
        {/* Left: Logo Lockup */}
        <div className="flex items-center justify-start min-w-0">
          <Link to="/" className="flex items-center group relative shrink-0 z-20">
            {!logoError ? (
              <div className="flex items-center gap-3 md:gap-4">
                <img 
                  src={logoSrc} 
                  alt={`${brandName} Logo`}
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
                    {brandParts.accent ? (
                      <>
                        {brandParts.before}
                        <span className="text-accent-500">{brandParts.accent}</span>
                        {brandParts.after}
                      </>
                    ) : (
                      brandName
                    )}
                  </span>
                  <span className="text-[6px] md:text-[8px] font-semibold tracking-[0.15em] md:tracking-[0.2em] text-brand-500 uppercase">
                    {brandTagline}
                  </span>
                </div>
              </div>
            ) : (
              <span className="font-bold text-xl tracking-widest transition-colors text-brand-950">
                {brandName}
              </span>
            )}
          </Link>
        </div>

        {/* Center: Desktop Navigation (Mathematically Centered) */}
        <div className="hidden lg:flex items-center justify-center gap-0.5 xl:gap-2">
          {activeNavItems.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isDropdownOpen = openDropdownId === item.id;

            if (!hasChildren) {
              return (
                <NavLink key={item.id} to={item.href} isActive={isActive(item.href)}>
                  {item.label}
                </NavLink>
              );
            }

            return (
              <div 
                key={item.id}
                className="relative"
                onMouseEnter={() => setOpenDropdownId(item.id)}
                onMouseLeave={() => setOpenDropdownId(null)}
              >
                <button className={cn(
                  "relative flex items-center gap-1.5 px-3.5 xl:px-5 py-2 text-[13px] xl:text-[14px] font-medium tracking-[0.05em] uppercase transition-all duration-500 group whitespace-nowrap",
                  isActive(item.href) || isDropdownOpen ? "text-brand-950" : "text-brand-600 hover:text-brand-950"
                )}>
                  <motion.span 
                    className="relative z-10 flex items-center gap-1"
                    animate={{ y: isDropdownOpen ? -2 : 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {item.label}
                    <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-500", isDropdownOpen && "rotate-180")} />
                  </motion.span>
                  
                  {isActive(item.href) && !isDropdownOpen && (
                    <motion.div 
                      layoutId="active-nav-indicator-editorial" 
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent-500 rounded-full" 
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
                
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.97 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 w-[300px] bg-[#FDFBF7]/95 backdrop-blur-xl rounded-[12px] shadow-[0_20px_40px_rgb(0,0,0,0.1)] border border-brand-950/5 overflow-hidden p-3"
                    >
                      <div className="flex flex-col gap-1">
                        {item.children?.filter(c => c.isActive !== false).map((child) => (
                          <Link
                            key={child.id || child.href}
                            to={child.href}
                            className="group/link relative flex items-center px-4 py-3 rounded-lg overflow-hidden transition-all duration-300 hover:bg-brand-50"
                          >
                            <div className="absolute left-0 w-[2px] h-[60%] top-1/2 -translate-y-1/2 bg-accent-500 scale-y-0 origin-center group-hover/link:scale-y-100 transition-transform duration-400 ease-[0.16,1,0.3,1] rounded-r-full" />
                            <span className="text-[13px] font-medium tracking-wide text-brand-700 group-hover/link:text-brand-950 transition-colors z-10 group-hover/link:translate-x-2 transform duration-400 ease-[0.16,1,0.3,1]">
                              {child.label}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Right: CTA Area on Desktop & Mobile Menu Toggle on Mobile */}
        <div className="flex items-center justify-end">
          <Link to={ctaLink} className="hidden lg:block">
            <button className={cn(
              "group relative overflow-hidden font-semibold text-[12px] xl:text-[13px] tracking-widest uppercase transition-all duration-500 hover:shadow-[0_8px_20px_rgb(3,7,18,0.15)]",
              isScrolled ? "rounded-[12px] px-5 xl:px-7 py-2.5" : "rounded-[14px] px-6 xl:px-8 py-3",
              location.pathname === ctaLink ? "bg-accent-500 text-white" : "bg-brand-950 text-[#FDFBF7]"
            )}>
              <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-white whitespace-nowrap">
                {ctaLabel}
              </span>
              <div className="absolute inset-0 z-0 h-full w-full bg-accent-500 translate-y-[101%] transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:translate-y-0" />
            </button>
          </Link>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center lg:hidden z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl bg-brand-950/5 text-brand-950 focus:outline-none transition-colors hover:bg-brand-950/10"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
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
              {activeNavItems.map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                const isDropdownOpen = openDropdownId === item.id;

                if (!hasChildren) {
                  return (
                    <Link 
                      key={item.id} 
                      to={item.href} 
                      className="text-3xl font-bold tracking-tight text-brand-950 hover:text-accent-500 transition-colors"
                    >
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <div key={item.id} className="space-y-4">
                    <button 
                      onClick={() => setOpenDropdownId(isDropdownOpen ? null : item.id)}
                      className="flex items-center justify-between w-full text-3xl font-bold tracking-tight text-brand-950"
                    >
                      {item.label}
                      <ChevronDown className={cn("h-8 w-8 transition-transform duration-300", isDropdownOpen && "rotate-180")} />
                    </button>
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-6 flex flex-col space-y-4 overflow-hidden"
                        >
                          {item.children?.filter(c => c.isActive !== false).map(child => (
                            <Link key={child.id || child.href} to={child.href} className="text-xl font-medium text-brand-700 hover:text-accent-500">
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <div className="pt-10 mt-6 border-t border-brand-950/10 flex flex-col gap-4">
                <Link to={ctaLink}>
                  <button className={cn(
                    "w-full text-lg py-5 rounded-[16px] font-bold tracking-wider uppercase shadow-xl shadow-brand-950/20 active:scale-95 transition-all text-white",
                    location.pathname === ctaLink ? "bg-accent-500" : "bg-brand-950"
                  )}>
                    {ctaLabel}
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};


