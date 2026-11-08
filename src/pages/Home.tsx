import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Compass,
  CalendarCheck,
  Search,
  ArrowUpRight,
  ShieldCheck,
  Award,
  KeyRound,
  Eye,
  ArrowRight,
} from 'lucide-react';
import { PROPERTIES, CATEGORIES } from '../data/properties';
import PropertyCard from '../components/PropertyCard';
import {
  Reveal,
  StaggerContainer,
  StaggerItem,
  TypographyReveal,
  LUXURY_EASE,
  LUXURY_EASE_GENTLE,
} from '../components/motion/MotionSystem';

export default function Home() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const [locationQuery, setLocationQuery] = useState('All');
  const [propertyTypeQuery, setPropertyTypeQuery] = useState('All');
  const [statusQuery, setStatusQuery] = useState('All');

  const featuredProperties = PROPERTIES.filter((p) => p.featured).slice(0, 4);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (locationQuery !== 'All') params.set('location', locationQuery);
    if (propertyTypeQuery !== 'All') params.set('type', propertyTypeQuery);
    if (statusQuery !== 'All') params.set('status', statusQuery);
    navigate(`/properties?${params.toString()}`);
  };

  const stats = [
    { value: '₦18.4B+', label: 'Demo Portfolio Value' },
    { value: '10', label: 'Prime Residences' },
    { value: '100%', label: 'Title Verified' },
    { value: '2 Cities', label: 'Lagos & Abuja' },
  ];

  return (
    <div>
      {/* ═══════════════════════════════════════════════════════
          1. HERO
      ═══════════════════════════════════════════════════════ */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-0 max-w-7xl mx-auto">
        {/* Hero Card */}
        <div
          className="relative overflow-hidden text-white shadow-2xl"
          style={{
            borderRadius: 28,
            minHeight: 620,
            background: '#0C0D10',
          }}
        >
          {/* Background Image with Architectural De-Scale Motion */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.img
              src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2200&auto=format&fit=crop&crop=edges"
              alt="Estate One — Architectural Luxury Residence"
              className="w-full h-full object-cover will-change-transform"
              style={{ objectPosition: 'center 40%' }}
              fetchPriority="high"
              initial={shouldReduceMotion ? { scale: 1 } : { scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.6, ease: LUXURY_EASE_GENTLE }}
            />
            {/* Layered scrim for legibility */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(165deg, rgba(12,13,16,0.52) 0%, rgba(12,13,16,0.35) 40%, rgba(12,13,16,0.72) 100%)',
              }}
            />
            {/* Bottom fade for search bar integration */}
            <div
              className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(12,13,16,0.92) 0%, transparent 100%)' }}
            />
          </div>

          {/* Top Metadata Row */}
          <div className="relative z-10 flex items-center justify-between p-6 sm:p-10 lg:p-14">
            <Reveal direction="down" delay={0.1}>
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.18)',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#8EA9FF] animate-pulse" />
                <span>Private Portfolio — Lagos & Abuja</span>
              </div>
            </Reveal>

            <Reveal direction="fade" delay={0.2}>
              <span className="text-[11px] font-mono text-white/50 uppercase tracking-widest hidden sm:block">
                Demo · {new Date().getFullYear()}
              </span>
            </Reveal>
          </div>

          {/* Hero Main Copy */}
          <div className="relative z-10 px-6 sm:px-10 lg:px-14 pb-10 pt-8 sm:pt-16 lg:pt-20 max-w-4xl">
            <h1 className="font-heading font-extrabold text-[42px] sm:text-[64px] lg:text-[76px] text-white leading-[1.04] tracking-tight mb-5">
              <TypographyReveal as="span" delay={0.15}>
                Find a place that
              </TypographyReveal>
              <br />
              <em className="not-italic" style={{ color: 'rgba(255,255,255,0.85)' }}>
                <TypographyReveal as="span" delay={0.35}>
                  feels like yours.
                </TypographyReveal>
              </em>
            </h1>

            <Reveal direction="up" delay={0.45}>
              <p className="text-[16px] sm:text-[18px] text-white/75 font-normal max-w-lg leading-relaxed mb-8">
                Exceptional properties. Thoughtful spaces. A better way to find your next home.
              </p>
            </Reveal>

            {/* CTAs with tactile motion */}
            <Reveal direction="up" delay={0.55}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/properties"
                    className="btn-primary text-[13px] group w-full sm:w-auto"
                    style={{ background: 'white', color: '#111318' }}
                  >
                    <Compass className="w-4 h-4 text-[#111318] group-hover:rotate-45 transition-transform duration-500" />
                    <span>Explore Properties</span>
                    <ArrowUpRight className="w-4 h-4 text-[#111318]/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/request-viewing"
                    className="btn-secondary text-[13px] w-full sm:w-auto"
                  >
                    <CalendarCheck className="w-4 h-4 text-[#8EA9FF]" />
                    <span>Request a Viewing</span>
                  </Link>
                </motion.div>
              </div>
            </Reveal>
          </div>

          {/* Stats Bar with subtle entrance */}
          <div className="relative z-10 mx-6 sm:mx-10 lg:mx-14 mb-8 sm:mb-10">
            <Reveal direction="up" delay={0.65}>
              <div
                className="p-4 sm:p-5 rounded-2xl flex flex-wrap items-center gap-x-6 gap-y-3"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                {stats.map((stat, i) => (
                  <React.Fragment key={stat.label}>
                    <div>
                      <div className="font-heading font-bold text-white text-base">{stat.value}</div>
                      <div className="text-[11px] text-white/55">{stat.label}</div>
                    </div>
                    {i < stats.length - 1 && (
                      <div
                        className="hidden sm:block w-px h-6"
                        style={{ background: 'rgba(255,255,255,0.15)' }}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── Property Search Bar (smoothly elevated) ── */}
        <div className="relative z-20 max-w-4xl mx-auto -mt-5 sm:-mt-6 px-2 sm:px-0">
          <Reveal direction="up" delay={0.25} threshold={0.1}>
            <form
              onSubmit={handleQuickSearch}
              className="glass-search rounded-2xl sm:rounded-full p-3 sm:p-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0 shadow-xl"
            >
              {/* Location */}
              <div
                className="flex-1 px-5 py-2 sm:border-r"
                style={{ borderColor: 'rgba(17,19,24,0.08)' }}
              >
                <label className="block text-[9px] font-bold uppercase tracking-widest text-[#737780] mb-0.5">
                  Location
                </label>
                <select
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  className="w-full bg-transparent text-[13px] font-semibold text-[#111318] focus:outline-none cursor-pointer"
                  aria-label="Filter by location"
                >
                  <option value="All">All Prime Enclaves</option>
                  <option value="Banana Island, Lagos">Banana Island, Lagos</option>
                  <option value="Ikoyi, Lagos">Old Ikoyi, Lagos</option>
                  <option value="Victoria Island, Lagos">Victoria Island, Lagos</option>
                  <option value="Lekki Phase 1, Lagos">Lekki Phase 1, Lagos</option>
                  <option value="Eko Atlantic, Lagos">Eko Atlantic, Lagos</option>
                  <option value="Maitama, Abuja">Maitama, Abuja</option>
                  <option value="Asokoro, Abuja">Asokoro, Abuja</option>
                  <option value="Guzape, Abuja">Guzape, Abuja</option>
                </select>
              </div>

              {/* Type */}
              <div
                className="flex-1 px-5 py-2 sm:border-r"
                style={{ borderColor: 'rgba(17,19,24,0.08)' }}
              >
                <label className="block text-[9px] font-bold uppercase tracking-widest text-[#737780] mb-0.5">
                  Property Type
                </label>
                <select
                  value={propertyTypeQuery}
                  onChange={(e) => setPropertyTypeQuery(e.target.value)}
                  className="w-full bg-transparent text-[13px] font-semibold text-[#111318] focus:outline-none cursor-pointer"
                  aria-label="Filter by property type"
                >
                  <option value="All">All Typologies</option>
                  <option value="Villa">Villa</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Architectural Residence">Architectural Residence</option>
                  <option value="Mansion">Mansion</option>
                  <option value="Contemporary Duplex">Contemporary Duplex</option>
                </select>
              </div>

              {/* Status */}
              <div className="flex-1 px-5 py-2">
                <label className="block text-[9px] font-bold uppercase tracking-widest text-[#737780] mb-0.5">
                  Acquisition
                </label>
                <select
                  value={statusQuery}
                  onChange={(e) => setStatusQuery(e.target.value)}
                  className="w-full bg-transparent text-[13px] font-semibold text-[#111318] focus:outline-none cursor-pointer"
                  aria-label="Filter by sale or rent"
                >
                  <option value="All">For Sale & Lease</option>
                  <option value="For Sale">For Sale</option>
                  <option value="For Rent">For Rent</option>
                </select>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="shrink-0 mx-2 sm:m-1.5 py-3 px-6 rounded-xl sm:rounded-full bg-[#111318] text-white text-[13px] font-semibold flex items-center justify-center gap-2 hover:bg-black transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4 text-[#8EA9FF]" />
                <span>Search</span>
              </motion.button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2. FEATURED PROPERTIES (STAGGERED ENTRANCES)
      ═══════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28">
        <Reveal direction="up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
            <div>
              <div className="section-label mb-3">Curated Selection</div>
              <h2 className="font-heading font-extrabold text-[32px] sm:text-[40px] text-[#111318] tracking-tight">
                Featured Residences
              </h2>
            </div>

            <Link
              to="/properties"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#111318] hover:text-[#737780] transition-colors link-animated"
            >
              <span>View all {PROPERTIES.length} listings</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>

        {/* Staggered Cards */}
        <StaggerContainer staggerDelay={0.09} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredProperties.map((property) => (
            <StaggerItem key={property.id}>
              <PropertyCard property={property} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3. EDITORIAL BRAND INTRO (CURTAIN MASK & NARRATIVE)
      ═══════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28">
        <Reveal direction="mask">
          <div
            className="rounded-3xl overflow-hidden shadow-sm"
            style={{
              background: 'white',
              border: '1px solid rgba(17,19,24,0.07)',
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Left: Copy */}
              <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                <div className="section-label mb-6">The Estate One Philosophy</div>

                <h2 className="font-heading font-extrabold text-[28px] sm:text-[36px] text-[#111318] tracking-tight leading-tight mb-5">
                  Real estate conceived as living architecture.
                </h2>

                <p className="text-[15px] text-[#737780] leading-relaxed mb-8 max-w-md">
                  We believe true luxury is quiet, deliberate, and deeply personal. Estate One was established to elevate prime property acquisition across Lagos and Abuja through uncompromising curation, architectural integrity, and absolute discretion.
                </p>

                <div
                  className="grid grid-cols-2 gap-6 py-7 mb-8"
                  style={{
                    borderTop: '1px solid rgba(17,19,24,0.07)',
                    borderBottom: '1px solid rgba(17,19,24,0.07)',
                  }}
                >
                  <div>
                    <div className="font-heading font-extrabold text-[26px] text-[#111318]">₦500M+</div>
                    <p className="text-[12px] text-[#737780] mt-1 font-medium">Average Portfolio Listing</p>
                  </div>
                  <div>
                    <div className="font-heading font-extrabold text-[26px] text-[#111318]">100%</div>
                    <p className="text-[12px] text-[#737780] mt-1 font-medium">Due Diligence & Clean Title</p>
                  </div>
                </div>

                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#111318] hover:text-[#737780] transition-colors group"
                >
                  <span>Read our story & leadership</span>
                  <ArrowRight className="w-4 h-4 text-[#8EA9FF] group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>

              {/* Right: Images with subtle scale masks */}
              <div className="relative hidden lg:grid grid-cols-2 gap-3 p-8">
                <div className="rounded-2xl overflow-hidden bg-neutral-900" style={{ aspectRatio: '3/4' }}>
                  <motion.img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
                    alt="Minimalist luxury interior"
                    className="w-full h-full object-cover will-change-transform"
                    whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                    transition={{ duration: 0.7, ease: LUXURY_EASE_GENTLE }}
                    loading="lazy"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <div
                    className="rounded-2xl p-4 flex flex-col justify-center"
                    style={{ background: '#F5F5F7', flex: '0 0 auto' }}
                  >
                    <p className="text-[12px] font-bold text-[#111318] mb-1">Bespoke Craftsmanship</p>
                    <p className="text-[11px] text-[#737780] leading-relaxed">
                      Every property undergoes strict architectural and structural review before listing.
                    </p>
                  </div>

                  <div className="rounded-2xl overflow-hidden flex-1 bg-neutral-900" style={{ minHeight: 160 }}>
                    <motion.img
                      src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop"
                      alt="Luxury interior with natural light"
                      className="w-full h-full object-cover will-change-transform"
                      whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                      transition={{ duration: 0.7, ease: LUXURY_EASE_GENTLE }}
                      loading="lazy"
                    />
                  </div>

                  <div
                    className="rounded-2xl p-4 flex flex-col justify-center"
                    style={{ background: '#111318', flex: '0 0 auto' }}
                  >
                    <p className="text-[12px] font-bold text-white mb-1">Private Client Office</p>
                    <p className="text-[11px] text-white/60 leading-relaxed">
                      NDA-backed advisors for family offices & executive buyers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4. PROPERTY CATEGORIES (STAGGERED CARDS WITH ZOOM)
      ═══════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28">
        <Reveal direction="up">
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
            <div className="section-label justify-center mb-4">Architectural Typologies</div>
            <h2 className="font-heading font-extrabold text-[28px] sm:text-[36px] text-[#111318] tracking-tight">
              Explore by Category
            </h2>
            <p className="text-[15px] text-[#737780] mt-3 leading-relaxed">
              Distinctive living spaces engineered for comfort, privacy, and aesthetic clarity.
            </p>
          </div>
        </Reveal>

        <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES.map((cat, idx) => (
            <StaggerItem key={idx}>
              <motion.div
                whileHover={shouldReduceMotion ? {} : { y: -6, transition: { duration: 0.35, ease: LUXURY_EASE } }}
                className="h-full"
              >
                <Link
                  to={`/properties?type=${encodeURIComponent(cat.filterType)}`}
                  className="group relative overflow-hidden text-white block h-full rounded-3xl"
                  style={{
                    aspectRatio: '4/5',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '1.25rem',
                  }}
                >
                  {/* Background image with slow zoom on card hover */}
                  <div className="absolute inset-0 overflow-hidden bg-neutral-900">
                    <motion.img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover will-change-transform"
                      whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
                      transition={{ duration: 0.75, ease: LUXURY_EASE_GENTLE }}
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(10,10,15,0.92) 0%, rgba(10,10,15,0.3) 50%, rgba(10,10,15,0.15) 100%)',
                      }}
                    />
                  </div>

                  {/* Top */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span
                      className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)' }}
                    >
                      {cat.count}
                    </span>
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-[#111318]"
                      style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', color: 'white' }}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </motion.div>
                  </div>

                  {/* Bottom */}
                  <div className="relative z-10 space-y-1.5">
                    <h3 className="font-heading font-bold text-[18px] text-white tracking-tight leading-tight">
                      {cat.title}
                    </h3>
                    <p className="text-[12px] text-white/65 leading-relaxed line-clamp-2">
                      {cat.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ═══════════════════════════════════════════════════════
          5. WHY ESTATE ONE (STAGGERED PILLARS)
      ═══════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28">
        <Reveal direction="up">
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
            <div className="section-label justify-center mb-4">The Advisory Standard</div>
            <h2 className="font-heading font-extrabold text-[28px] sm:text-[36px] text-[#111318] tracking-tight">
              Why Estate One
            </h2>
            <p className="text-[15px] text-[#737780] mt-3 leading-relaxed">
              A boutique private advisory model focused on high-value properties and discreet representation.
            </p>
          </div>
        </Reveal>

        <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              icon: <Award className="w-5 h-5 text-[#111318]" />,
              title: 'Architectural Rigor',
              desc: 'We decline 80% of properties submitted. Only residences meeting stringent design, finish, and structural criteria are accepted into our portfolio.',
            },
            {
              icon: <ShieldCheck className="w-5 h-5 text-[#8EA9FF]" />,
              title: 'Discretion & NDA',
              desc: 'Serving diplomatic missions and family offices with complete confidentiality, off-market channels, and NDA-backed consultations.',
            },
            {
              icon: <Eye className="w-5 h-5 text-[#111318]" />,
              title: 'Enclave Specialists',
              desc: 'Hyper-local mastery of Banana Island, Ikoyi, Victoria Island, Maitama, and Asokoro — tracking zoning laws, land values, and future infrastructure.',
            },
            {
              icon: <KeyRound className="w-5 h-5 text-[#111318]" />,
              title: 'Turnkey Transition',
              desc: "From legal title verification through Governor's consent transfer and interior concierge onboarding, we manage the entire acquisition lifecycle.",
            },
          ].map((item, i) => (
            <StaggerItem key={i}>
              <motion.div
                whileHover={shouldReduceMotion ? {} : { y: -6, transition: { duration: 0.35, ease: LUXURY_EASE } }}
                className="p-7 rounded-3xl h-full will-change-transform"
                style={{
                  background: 'white',
                  border: '1px solid rgba(17,19,24,0.07)',
                  boxShadow: '0 2px 8px rgba(17,19,24,0.04)',
                }}
              >
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: '#F5F5F7' }}
                >
                  {item.icon}
                </div>
                <h3 className="font-heading font-bold text-[16px] text-[#111318] mb-2.5 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-[13px] text-[#737780] leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ═══════════════════════════════════════════════════════
          6. FULL-WIDTH CALL TO ACTION
      ═══════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-20 sm:pb-28">
        <Reveal direction="mask">
          <div
            className="relative overflow-hidden text-white shadow-2xl"
            style={{ borderRadius: 28, background: '#0C0D10' }}
          >
            {/* Background image */}
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1800&auto=format&fit=crop"
                alt=""
                className="w-full h-full object-cover"
                style={{ opacity: 0.25 }}
                aria-hidden="true"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(100deg, rgba(12,13,16,0.98) 40%, rgba(12,13,16,0.6) 100%)',
                }}
              />
            </div>

            <div className="relative z-10 p-8 sm:p-14 lg:p-20 max-w-2xl space-y-6">
              <div className="section-label" style={{ color: '#8EA9FF' }}>
                Private Representation
              </div>

              <h2 className="font-heading font-extrabold text-[32px] sm:text-[48px] text-white tracking-tight leading-tight">
                Ready to find an extraordinary residence?
              </h2>

              <p className="text-[16px] text-white/70 leading-relaxed">
                Schedule a confidential consultation or private viewing tour with our senior advisory team in Lagos or Abuja.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/request-viewing"
                    className="btn-primary text-[13px] w-full sm:w-auto"
                    style={{ background: 'white', color: '#111318' }}
                  >
                    <CalendarCheck className="w-4 h-4" />
                    <span>Schedule a Private Viewing</span>
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/contact"
                    className="btn-secondary text-[13px] w-full sm:w-auto"
                  >
                    <span>Contact Private Office</span>
                    <ArrowUpRight className="w-4 h-4 text-[#8EA9FF]" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
