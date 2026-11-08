import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, CalendarCheck } from 'lucide-react';
import { LUXURY_EASE } from './motion/MotionSystem';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Properties', path: '/properties' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'glass-nav shadow-sm py-3'
            : 'bg-[#F5F5F7]/98 py-4'
        }`}
        style={{ borderBottom: '1px solid rgba(17,19,24,0.07)' }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-12">

            {/* ── Logo ── */}
            <Link
              to="/"
              className="group flex items-center gap-3 shrink-0"
              aria-label="Estate One — Home"
            >
              <div
                className="w-8 h-8 rounded-lg bg-[#111318] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300"
                aria-hidden="true"
              >
                <span className="font-heading font-bold text-sm text-white">E</span>
                <span className="font-heading font-bold text-sm text-[#8EA9FF] -ml-0.5">1</span>
              </div>
              <div>
                <div className="font-heading font-bold text-base text-[#111318] leading-none tracking-tight">
                  Estate One
                </div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#A0A4AD] leading-none mt-0.5">
                  Private Office
                </div>
              </div>
            </Link>

            {/* ── Desktop Navigation ── */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Primary navigation">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-[#111318] bg-white shadow-sm font-semibold'
                        : 'text-[#737780] hover:text-[#111318] hover:bg-white/70'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* ── Desktop Actions ── */}
            <div className="hidden md:flex items-center gap-2.5">
              <Link
                to="/request-viewing"
                className="text-[12px] font-medium text-[#737780] hover:text-[#111318] px-3.5 py-2 rounded-full hover:bg-white/80 transition-all flex items-center gap-1.5"
              >
                <CalendarCheck className="w-3.5 h-3.5 text-[#8EA9FF]" strokeWidth={2.2} />
                Book Viewing
              </Link>

              <Link
                to="/properties"
                className="inline-flex items-center gap-1.5 bg-[#111318] text-white text-[12px] font-semibold px-5 py-2.5 rounded-full hover:bg-black transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <span>Explore Properties</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#8EA9FF]" />
              </Link>
            </div>

            {/* ── Mobile Controls ── */}
            <div className="flex items-center md:hidden gap-2">
              <Link
                to="/properties"
                className="text-[11px] font-semibold bg-[#111318] text-white px-4 py-2 rounded-full"
              >
                Explore
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-[#111318] hover:bg-white/80 transition-colors"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen
                  ? <X className="w-5 h-5" />
                  : <Menu className="w-5 h-5" />
                }
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu Drawer ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: LUXURY_EASE }}
            className="md:hidden fixed inset-x-0 top-[65px] z-50"
            style={{
              background: 'rgba(245,245,247,0.98)',
              backdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(17,19,24,0.08)',
              boxShadow: '0 12px 40px rgba(17,19,24,0.08)',
            }}
          >
            <div className="max-w-7xl mx-auto px-5 py-5 flex flex-col gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `px-4 py-3.5 rounded-2xl text-[15px] font-medium flex items-center justify-between ${
                      isActive
                        ? 'bg-white text-[#111318] font-semibold shadow-sm'
                        : 'text-[#737780] hover:text-[#111318] hover:bg-white/60'
                    }`
                  }
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-40" />
                </NavLink>
              ))}

              <div className="pt-3 border-t border-[#111318]/8 flex flex-col gap-2.5 mt-1">
                <Link
                  to="/request-viewing"
                  className="w-full py-3.5 px-4 rounded-2xl bg-white border border-[#111318]/12 text-[#111318] text-sm font-semibold text-center flex items-center justify-center gap-2 shadow-sm"
                >
                  <CalendarCheck className="w-4 h-4 text-[#8EA9FF]" />
                  Schedule a Private Viewing
                </Link>
                <Link
                  to="/properties"
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#111318] text-white text-sm font-semibold text-center flex items-center justify-center gap-2"
                >
                  <span>Explore All Properties</span>
                  <ArrowUpRight className="w-4 h-4 text-[#8EA9FF]" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
