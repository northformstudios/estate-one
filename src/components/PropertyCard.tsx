import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Bed, Bath, Maximize2, ArrowUpRight, Heart, MapPin } from 'lucide-react';
import type { Property } from '../types';
import { LUXURY_EASE } from './motion/MotionSystem';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const [isSaved, setIsSaved] = useState(() => {
    try {
      return localStorage.getItem(`saved_prop_${property.id}`) === 'true';
    } catch {
      return false;
    }
  });

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const next = !isSaved;
    setIsSaved(next);
    try {
      localStorage.setItem(`saved_prop_${property.id}`, String(next));
    } catch {/* storage unavailable */}
  };

  return (
    <motion.article
      whileHover={shouldReduceMotion ? {} : { y: -6, transition: { duration: 0.35, ease: LUXURY_EASE } }}
      className="group bg-white rounded-3xl overflow-hidden border flex flex-col will-change-transform"
      style={{
        borderColor: 'rgba(17,19,24,0.07)',
        boxShadow: '0 2px 12px rgba(17,19,24,0.04)',
      }}
    >
      {/* ── Image with Subtle Mask & Smooth Zoom ── */}
      <div className="relative overflow-hidden bg-neutral-900" style={{ aspectRatio: '4/3' }}>
        <motion.img
          src={property.heroImage}
          alt={`${property.title} — ${property.location}`}
          loading="lazy"
          decoding="async"
          whileHover={shouldReduceMotion ? {} : { scale: 1.06, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] } }}
          className="w-full h-full object-cover will-change-transform"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />

        {/* Top Badges & Interactive Save */}
        <div className="absolute top-4 inset-x-4 flex items-start justify-between">
          <span
            className={`self-start text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full ${
              property.status === 'For Sale' ? 'badge-sale' : 'badge-rent'
            }`}
          >
            {property.status}
          </span>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.85 }}
            onClick={toggleFavorite}
            aria-label={isSaved ? 'Remove from saved properties' : 'Save this property'}
            className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer shadow-xs"
            style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)' }}
          >
            <motion.div
              animate={isSaved ? { scale: [1, 1.25, 1] } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Heart
                className={`w-4 h-4 transition-colors duration-200 ${
                  isSaved ? 'fill-rose-500 text-rose-500' : 'text-[#111318]'
                }`}
              />
            </motion.div>
          </motion.button>
        </div>

        {/* Bottom price on image */}
        <div className="absolute bottom-4 inset-x-4 flex items-end justify-between">
          <div>
            <div
              className="font-heading font-bold text-white text-lg leading-tight"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}
            >
              {property.priceDisplay}
            </div>
            <div className="text-[10px] text-white/75 font-medium mt-0.5">Demo Valuation</div>
          </div>
          <span
            className="text-[10px] font-semibold text-white/90 px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(17,19,24,0.6)', backdropFilter: 'blur(12px)' }}
          >
            {property.type}
          </span>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-5 flex flex-col flex-1">
        {/* Location */}
        <div className="flex items-center gap-1.5 mb-2">
          <MapPin className="w-3.5 h-3.5 text-[#8EA9FF] shrink-0" strokeWidth={2.2} />
          <span className="text-xs text-[#737780] font-medium truncate">{property.location}</span>
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-[#111318] text-[15px] leading-tight tracking-tight mb-3 line-clamp-2 flex-shrink-0">
          <Link
            to={`/properties/${property.slug}`}
            className="hover:text-[#6B8FFF] transition-colors"
          >
            {property.title}
          </Link>
        </h3>

        {/* Specs */}
        <div
          className="flex items-center gap-4 py-3 mb-4 text-xs text-[#737780] font-medium flex-shrink-0"
          style={{
            borderTop: '1px solid rgba(17,19,24,0.07)',
            borderBottom: '1px solid rgba(17,19,24,0.07)',
          }}
        >
          <span className="flex items-center gap-1.5">
            <Bed className="w-3.5 h-3.5" strokeWidth={2} />
            {property.bedrooms} Beds
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="w-3.5 h-3.5" strokeWidth={2} />
            {property.bathrooms} Baths
          </span>
          <span className="flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5" strokeWidth={2} />
            {property.areaSqM.toLocaleString()} m²
          </span>
        </div>

        {/* Actions */}
        <div className="mt-auto flex items-center gap-2.5">
          <motion.div className="flex-1" whileTap={{ scale: 0.98 }}>
            <Link
              to={`/properties/${property.slug}`}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-center transition-all duration-200 flex items-center justify-center gap-1.5 group/btn cursor-pointer bg-[#F5F5F7] text-[#111318] hover:bg-[#111318] hover:text-white"
            >
              <span>View Details</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </Link>
          </motion.div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/request-viewing?property=${property.slug}`)}
            className="py-2.5 px-4 rounded-xl text-xs font-medium border transition-all duration-200 hover:bg-[#111318] hover:text-white hover:border-[#111318] cursor-pointer"
            style={{ borderColor: 'rgba(17,19,24,0.14)', color: '#111318' }}
            title={`Book a viewing for ${property.title}`}
          >
            Viewing
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
