import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#111318] text-[#F5F5F7] pt-20 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-flex items-center gap-3 group" aria-label="Estate One — Home">
              <div className="w-8 h-8 rounded-lg bg-white text-[#111318] flex items-center justify-center font-heading font-bold text-sm tracking-tight group-hover:scale-105 transition-transform">
                <span>E</span>
                <span className="text-[#8EA9FF] -ml-0.5">1</span>
              </div>
              <span className="font-heading font-bold text-xl tracking-tight text-white">
                Estate One
              </span>
            </Link>

            <p className="text-[#737780] text-sm leading-relaxed max-w-sm">
              Estate One is an independent luxury property advisory serving discerning private clients, family offices, and institutions across prime Lagos and Abuja enclaves.
            </p>

            <div className="pt-1 flex items-center gap-2 text-xs text-[#8EA9FF]">
              <ShieldCheck className="w-4 h-4" />
              <span>Discreet Acquisition & Advisory Services</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.14em] text-white">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-[#737780]">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/properties" className="hover:text-white transition-colors">
                  Featured Properties
                </Link>
              </li>
              <li>
                <Link to="/properties?status=For+Sale" className="hover:text-white transition-colors">
                  Prime Acquisitions
                </Link>
              </li>
              <li>
                <Link to="/properties?status=For+Rent" className="hover:text-white transition-colors">
                  Executive Leases
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About the Advisory
                </Link>
              </li>
              <li>
                <Link to="/request-viewing" className="hover:text-white transition-colors">
                  Schedule Private Viewing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Private Office
                </Link>
              </li>
            </ul>
          </div>

          {/* Prime Enclaves */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.14em] text-white">
              Prime Enclaves
            </h4>
            <ul className="space-y-2.5 text-xs text-[#737780]">
              <li>
                <Link to="/properties?location=Banana+Island%2C+Lagos" className="hover:text-white transition-colors">
                  Banana Island, Ikoyi
                </Link>
              </li>
              <li>
                <Link to="/properties?location=Ikoyi%2C+Lagos" className="hover:text-white transition-colors">
                  Old Ikoyi & Osborne
                </Link>
              </li>
              <li>
                <Link to="/properties?location=Victoria+Island%2C+Lagos" className="hover:text-white transition-colors">
                  Victoria Island Penthouses
                </Link>
              </li>
              <li>
                <Link to="/properties?location=Lekki+Phase+1%2C+Lagos" className="hover:text-white transition-colors">
                  Lekki Phase 1 Waterfront
                </Link>
              </li>
              <li>
                <Link to="/properties?location=Maitama%2C+Abuja" className="hover:text-white transition-colors">
                  Maitama Diplomatic Zone
                </Link>
              </li>
              <li>
                <Link to="/properties?location=Asokoro%2C+Abuja" className="hover:text-white transition-colors">
                  Asokoro Presidential Axis
                </Link>
              </li>
            </ul>
          </div>

          {/* Private Offices */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.14em] text-white">
              Private Offices
            </h4>
            <div className="space-y-3.5 text-xs text-[#737780] leading-relaxed">
              <div>
                <p className="text-white font-medium flex items-center gap-1.5 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#8EA9FF]" />
                  Lagos Private Office
                </p>
                <p>14 Alexander Road, Ikoyi, Lagos</p>
              </div>

              <div>
                <p className="text-white font-medium flex items-center gap-1.5 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#8EA9FF]" />
                  Abuja Private Office
                </p>
                <p>28 Gana Street, Maitama, Abuja</p>
              </div>

              <div className="pt-1 space-y-1.5">
                <a
                  href="tel:+2348003782831"
                  className="flex items-center gap-1.5 text-white hover:text-[#8EA9FF] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#8EA9FF]" />
                  +234 (0) 800 ESTATE 1
                </a>
                <a
                  href="mailto:privateoffice@estateone.luxury"
                  className="flex items-center gap-1.5 text-white hover:text-[#8EA9FF] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#8EA9FF]" />
                  privateoffice@estateone.luxury
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Legal & Demonstration Notice ── */}
        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#737780]"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="space-y-1 text-center md:text-left">
            <p>© {new Date().getFullYear()} Estate One Luxury Real Estate Advisory Ltd. All rights reserved.</p>
            <p className="text-white/40 text-[11px]">
              Demonstration Showcase: All property names, architectural imagery, descriptions, and valuations are fictional and presented strictly for agency portfolio demonstration.
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <Link to="/about" className="hover:text-white transition-colors">
              Agency Charter
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Confidentiality Policy
            </Link>
            <Link to="/about" className="text-[#8EA9FF] hover:underline flex items-center gap-1">
              <span>Agency Portfolio</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
