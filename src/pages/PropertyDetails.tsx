import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Bed,
  Bath,
  Maximize2,
  Share2,
  Heart,
  CalendarCheck,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  ArrowLeft,
  ArrowUpRight,
  ShieldCheck,
  Car,
  Images,
} from 'lucide-react';
import { PROPERTIES } from '../data/properties';
import ImageGalleryModal from '../components/ImageGalleryModal';
import PropertyCard from '../components/PropertyCard';
import {
  Reveal,
  StaggerContainer,
  StaggerItem,
  LUXURY_EASE_GENTLE,
} from '../components/motion/MotionSystem';

export default function PropertyDetails() {
  const { slug } = useParams<{ slug: string }>();
  const shouldReduceMotion = useReducedMotion();

  // Find property by slug or id
  const property = PROPERTIES.find((p) => p.slug === slug || p.id === slug);

  // Gallery Modal state
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Favorite & Share state
  const [isSaved, setIsSaved] = useState(() => {
    if (!property) return false;
    try {
      return localStorage.getItem(`saved_prop_${property.id}`) === 'true';
    } catch {
      return false;
    }
  });
  const [copiedShare, setCopiedShare] = useState(false);

  // If not found
  if (!property) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <h2 className="font-heading font-extrabold text-3xl text-[#111318]">
          Residence Not Found
        </h2>
        <p className="text-[#737780] text-sm">
          The requested luxury property listing may have been acquired or relocated.
        </p>
        <Link
          to="/properties"
          className="btn-primary text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Catalogue</span>
        </Link>
      </div>
    );
  }

  const toggleFavorite = () => {
    const next = !isSaved;
    setIsSaved(next);
    try {
      localStorage.setItem(`saved_prop_${property.id}`, String(next));
    } catch {/* storage unavailable */}
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const openGalleryAt = (idx: number) => {
    setActiveImageIndex(idx);
    setGalleryOpen(true);
  };

  // Similar properties (same city or same type, excluding current)
  const similarProperties = PROPERTIES.filter(
    (p) => p.id !== property.id && (p.city === property.city || p.type === property.type)
  ).slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24 pb-24">
      {/* ── 1. Top Breadcrumbs & Action Bar ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <div
          className="flex flex-wrap items-center justify-between gap-4 pb-6"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#737780] hover:text-[#111318] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Properties</span>
            <span className="text-neutral-300">/</span>
            <span className="text-[#111318]">{property.location}</span>
          </Link>

          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={handleShare}
              className="py-2 px-3.5 rounded-full bg-white text-xs font-medium text-[#111318] flex items-center gap-1.5 transition-all hover:bg-neutral-100 cursor-pointer shadow-xs"
              style={{ border: '1px solid var(--border)' }}
              aria-label="Share property link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedShare ? 'Link Copied!' : 'Share'}</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={toggleFavorite}
              className="py-2 px-3.5 rounded-full bg-white text-xs font-medium text-[#111318] flex items-center gap-1.5 transition-all hover:bg-neutral-100 cursor-pointer shadow-xs"
              style={{ border: '1px solid var(--border)' }}
              aria-label={isSaved ? 'Remove from saved' : 'Save property'}
            >
              <Heart
                className={`w-3.5 h-3.5 ${
                  isSaved ? 'fill-rose-500 text-rose-500' : 'text-[#111318]'
                }`}
              />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* ── 2. Large Property Image Gallery (Architectural Mask) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-3 sm:space-y-4">
          {/* Main Hero Photo (Clickable) */}
          <div
            onClick={() => openGalleryAt(0)}
            className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-lg bg-neutral-900"
            style={{ aspectRatio: '16/9', maxHeight: 600 }}
          >
            <motion.img
              src={property.heroImage}
              alt={property.title}
              initial={shouldReduceMotion ? { scale: 1 } : { scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: LUXURY_EASE_GENTLE }}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102 will-change-transform"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

            {/* Bottom Floating Bar */}
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex items-end justify-between text-white">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#8EA9FF] font-semibold">
                  {property.type} • {property.status}
                </span>
                <p className="text-sm sm:text-base font-semibold max-w-lg hidden sm:block leading-snug">
                  {property.gallery[0]?.caption || property.tagline}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={(e) => {
                  e.stopPropagation();
                  openGalleryAt(0);
                }}
                className="py-2.5 px-4 rounded-full text-xs font-semibold flex items-center gap-2 transition-all shadow-md hover:bg-white hover:text-[#111318] cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.22)', backdropFilter: 'blur(12px)', color: 'white' }}
              >
                <Images className="w-4 h-4" />
                <span>View All {property.gallery.length} Photographs</span>
              </motion.button>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {property.gallery.slice(1, 5).map((img, idx) => (
              <motion.div
                key={idx}
                whileHover={shouldReduceMotion ? {} : { y: -3 }}
                onClick={() => openGalleryAt(idx + 1)}
                className="group relative rounded-2xl overflow-hidden aspect-[16/10] bg-neutral-900 cursor-pointer shadow-2xs hover:shadow-md transition-all"
              >
                <img
                  src={img.url}
                  alt={img.caption}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 will-change-transform"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                <span className="absolute bottom-2 left-2 right-2 text-[10px] text-white/90 line-clamp-1 bg-black/55 backdrop-blur-xs px-2 py-0.5 rounded-md">
                  {img.caption}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Main Specifications & Details Grid ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column (8 cols): Narrative, Features, Specs */}
          <div className="lg:col-span-8 space-y-12">
            {/* Header info */}
            <Reveal direction="up">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#737780] mb-2.5">
                  <MapPin className="w-3.5 h-3.5 text-[#8EA9FF]" />
                  <span>{property.location}</span>
                  <span>•</span>
                  <span>{property.neighborhood}</span>
                </div>

                <h1 className="font-heading font-extrabold text-[32px] sm:text-[46px] text-[#111318] tracking-tight leading-[1.08]">
                  {property.title}
                </h1>

                <p className="text-[#737780] text-base sm:text-lg font-normal mt-2.5 leading-relaxed">
                  {property.tagline}
                </p>

                {/* Price Banner */}
                <div
                  className="mt-6 p-6 rounded-3xl bg-white flex flex-wrap items-center justify-between gap-4"
                  style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#737780] font-bold block">
                      Demonstration Valuation
                    </span>
                    <div className="font-heading font-extrabold text-[32px] sm:text-[40px] text-[#111318] leading-tight">
                      {property.priceDisplay}
                    </div>
                    <span className="text-[11px] text-[#737780] font-medium">
                      Portfolio Exhibition Valuation • Clean Title Verified
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        to={`/request-viewing?property=${property.slug}`}
                        className="btn-primary text-xs"
                      >
                        <CalendarCheck className="w-4 h-4 text-[#8EA9FF]" />
                        <span>Request a Viewing</span>
                      </Link>
                    </motion.div>
                  </div>
                </div>

                {/* Quick Specs Bar with Staggered Entrance */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mt-6">
                  <div className="p-4 rounded-2xl bg-white" style={{ border: '1px solid var(--border)' }}>
                    <div className="flex items-center gap-1.5 text-xs text-[#737780] mb-1">
                      <Bed className="w-4 h-4 text-[#111318]" />
                      <span>Bedrooms</span>
                    </div>
                    <div className="font-heading font-bold text-base sm:text-lg text-[#111318]">
                      {property.bedrooms} En-Suite
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white" style={{ border: '1px solid var(--border)' }}>
                    <div className="flex items-center gap-1.5 text-xs text-[#737780] mb-1">
                      <Bath className="w-4 h-4 text-[#111318]" />
                      <span>Bathrooms</span>
                    </div>
                    <div className="font-heading font-bold text-base sm:text-lg text-[#111318]">
                      {property.bathrooms} Full Baths
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white" style={{ border: '1px solid var(--border)' }}>
                    <div className="flex items-center gap-1.5 text-xs text-[#737780] mb-1">
                      <Maximize2 className="w-4 h-4 text-[#111318]" />
                      <span>Internal Living</span>
                    </div>
                    <div className="font-heading font-bold text-base sm:text-lg text-[#111318]">
                      {property.areaSqM.toLocaleString()} m²
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white" style={{ border: '1px solid var(--border)' }}>
                    <div className="flex items-center gap-1.5 text-xs text-[#737780] mb-1">
                      <Car className="w-4 h-4 text-[#111318]" />
                      <span>Vehicular Bays</span>
                    </div>
                    <div className="font-heading font-bold text-base sm:text-lg text-[#111318]">
                      {property.parkingSpaces} Bays
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Description Narrative */}
            <Reveal direction="up">
              <div className="space-y-4 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
                <div className="section-label mb-2">Architectural Monograph</div>
                <h2 className="font-heading font-bold text-[24px] sm:text-[28px] text-[#111318]">
                  Design & Spatial Overview
                </h2>
                <div className="space-y-4 text-[15px] text-[#737780] leading-relaxed">
                  {property.description.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Features & Amenities Grid (Staggered) */}
            <div className="space-y-5 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
              <Reveal direction="up">
                <div>
                  <div className="section-label mb-2">Curated Appointments</div>
                  <h2 className="font-heading font-bold text-[24px] sm:text-[28px] text-[#111318]">
                    Distinguishing Features & Amenities
                  </h2>
                </div>
              </Reveal>

              <StaggerContainer staggerDelay={0.05} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.features.map((feature, idx) => (
                  <StaggerItem key={idx}>
                    <div
                      className="flex items-start gap-3 p-4 rounded-2xl bg-white text-xs font-semibold text-[#111318] h-full"
                      style={{ border: '1px solid var(--border)' }}
                    >
                      <CheckCircle className="w-4 h-4 text-[#8EA9FF] shrink-0 mt-0.5" />
                      <span className="leading-snug">{feature}</span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            {/* Technical Specifications Table */}
            <Reveal direction="up">
              <div className="space-y-5 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
                <div className="section-label mb-2">Due Diligence Matrix</div>
                <h2 className="font-heading font-bold text-[24px] sm:text-[28px] text-[#111318]">
                  Property Specifications
                </h2>
                <div
                  className="bg-white rounded-3xl overflow-hidden divide-y divide-[#111318]/6 shadow-2xs"
                  style={{ border: '1px solid var(--border)' }}
                >
                  {property.specifications.map((spec, idx) => (
                    <div
                      key={idx}
                      className="px-6 py-4 flex items-center justify-between text-xs sm:text-sm"
                    >
                      <span className="text-[#737780] font-medium">{spec.label}</span>
                      <span className="text-[#111318] font-semibold text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column (4 cols): Sticky Agent Card & Direct Viewing CTA */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 space-y-6">
              {/* Agent Advisory Card */}
              <Reveal direction="fade" delay={0.2}>
                <div
                  className="bg-white rounded-3xl p-6 sm:p-8 space-y-6"
                  style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={property.agent.avatar}
                      alt={property.agent.name}
                      className="w-16 h-16 rounded-2xl object-cover shadow-2xs"
                    />
                    <div>
                      <h3 className="font-heading font-bold text-lg text-[#111318]">
                        {property.agent.name}
                      </h3>
                      <p className="text-xs text-[#737780] leading-snug">
                        {property.agent.role}
                      </p>
                      <span className="inline-block mt-1 text-[10px] text-[#8EA9FF] font-semibold bg-[#111318] px-2.5 py-0.5 rounded-full">
                        Estate One Senior Partner
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#737780] leading-relaxed italic pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                    "{property.agent.experience}"
                  </p>

                  {/* Direct Action Buttons with Micro-interactions */}
                  <div className="space-y-2.5">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        to={`/request-viewing?property=${property.slug}`}
                        className="btn-primary w-full text-xs"
                      >
                        <CalendarCheck className="w-4 h-4 text-[#8EA9FF]" />
                        <span>Request Private Viewing</span>
                      </Link>
                    </motion.div>

                    <motion.a
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      href={`tel:${property.agent.phone}`}
                      className="w-full py-3 px-4 rounded-full border text-[#111318] text-xs font-semibold flex items-center justify-center gap-2 transition-all hover:bg-neutral-50 cursor-pointer"
                      style={{ borderColor: 'rgba(17,19,24,0.14)' }}
                    >
                      <Phone className="w-3.5 h-3.5 text-[#737780]" />
                      <span>Call Agent ({property.agent.phone})</span>
                    </motion.a>

                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        to={`/contact?subject=Inquiry for ${encodeURIComponent(property.title)}`}
                        className="w-full py-3 px-4 rounded-full text-[#111318] text-xs font-semibold flex items-center justify-center gap-2 transition-all hover:bg-neutral-200"
                        style={{ background: '#F5F5F7' }}
                      >
                        <Mail className="w-3.5 h-3.5 text-[#737780]" />
                        <span>Send Written Inquiry</span>
                      </Link>
                    </motion.div>
                  </div>

                  <div className="text-[11px] text-[#737780] pt-2 flex items-center gap-1.5 justify-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#8EA9FF]" />
                    <span>Confidential representation guaranteed</span>
                  </div>
                </div>
              </Reveal>

              {/* Due Diligence Guarantee Box */}
              <Reveal direction="up" delay={0.3}>
                <div
                  className="bg-[#111318] text-white rounded-3xl p-6 sm:p-7 space-y-3"
                  style={{ boxShadow: 'var(--shadow-md)' }}
                >
                  <span className="text-[10px] uppercase tracking-widest text-[#8EA9FF] font-semibold block">
                    Estate One Title Guarantee
                  </span>
                  <h4 className="font-heading font-bold text-base text-white">
                    Pre-screened & Validated Title
                  </h4>
                  <p className="text-xs text-white/70 leading-relaxed">
                    All legal titles, survey plans, and building approvals for this listing have been independently audited by our in-house conveyancing solicitors.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Similar Properties Section ── */}
      {similarProperties.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12" style={{ borderTop: '1px solid var(--border)' }}>
          <Reveal direction="up">
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="section-label mb-2">Curated Recommendations</div>
                <h2 className="font-heading font-extrabold text-[26px] sm:text-[32px] text-[#111318] tracking-tight">
                  Similar Prime Residences
                </h2>
              </div>
              <Link
                to="/properties"
                className="text-xs font-semibold text-[#111318] hover:underline flex items-center gap-1"
              >
                <span>Explore all</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Reveal>

          <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProperties.map((p) => (
              <StaggerItem key={p.id}>
                <PropertyCard property={p} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      )}

      {/* ── 5. Working Lightbox Modal ── */}
      <ImageGalleryModal
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        images={property.gallery}
        currentIndex={activeImageIndex}
        onSelectIndex={setActiveImageIndex}
        propertyTitle={property.title}
      />
    </div>
  );
}
