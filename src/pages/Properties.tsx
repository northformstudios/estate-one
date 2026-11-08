import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  X,
  RotateCcw,
  Info,
  ArrowRight,
} from 'lucide-react';
import { PROPERTIES } from '../data/properties';
import PropertyCard from '../components/PropertyCard';
import {
  Reveal,
  StaggerContainer,
  StaggerItem,
  LUXURY_EASE,
} from '../components/motion/MotionSystem';

export default function Properties() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Initialize filters from URL parameters or defaults
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [locationFilter, setLocationFilter] = useState(searchParams.get('location') || 'All');
  const [typeFilter, setTypeFilter] = useState(searchParams.get('type') || 'All');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'All');
  const [bedroomFilter, setBedroomFilter] = useState(searchParams.get('beds') || 'All');
  const [maxPrice, setMaxPrice] = useState<number>(() => {
    const val = searchParams.get('maxPrice');
    return val ? parseInt(val, 10) : 6000000000;
  });
  const [sortBy, setSortBy] = useState<string>(searchParams.get('sort') || 'featured');

  // Synchronize when searchParams change externally (e.g. navigation links)
  useEffect(() => {
    const loc = searchParams.get('location');
    if (loc) setLocationFilter(loc);
    const typ = searchParams.get('type');
    if (typ) setTypeFilter(typ);
    const stat = searchParams.get('status');
    if (stat) setStatusFilter(stat);
  }, [searchParams]);

  // Extract unique locations from data
  const locationsList = useMemo(() => {
    const set = new Set(PROPERTIES.map((p) => p.location));
    return ['All', ...Array.from(set)];
  }, []);

  // Extract unique types from data
  const typesList = useMemo(() => {
    const set = new Set(PROPERTIES.map((p) => p.type));
    return ['All', ...Array.from(set)];
  }, []);

  // Filter & Sort Logic
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((property) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = property.title.toLowerCase().includes(q);
        const matchesLoc = property.location.toLowerCase().includes(q);
        const matchesNeigh = property.neighborhood.toLowerCase().includes(q);
        const matchesTag = property.tagline.toLowerCase().includes(q);
        if (!matchesTitle && !matchesLoc && !matchesNeigh && !matchesTag) {
          return false;
        }
      }

      // 2. Location
      if (locationFilter !== 'All' && property.location !== locationFilter) {
        return false;
      }

      // 3. Type
      if (typeFilter !== 'All' && property.type !== typeFilter) {
        return false;
      }

      // 4. Status
      if (statusFilter !== 'All' && property.status !== statusFilter) {
        return false;
      }

      // 5. Bedrooms
      if (bedroomFilter !== 'All') {
        const minBeds = parseInt(bedroomFilter.replace('+', ''), 10);
        if (property.bedrooms < minBeds) {
          return false;
        }
      }

      // 6. Price
      if (property.price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'beds-desc') return b.bedrooms - a.bedrooms;
      if (sortBy === 'newest') return b.yearBuilt - a.yearBuilt;
      // Default: featured first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [
    searchQuery,
    locationFilter,
    typeFilter,
    statusFilter,
    bedroomFilter,
    maxPrice,
    sortBy,
  ]);

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setLocationFilter('All');
    setTypeFilter('All');
    setStatusFilter('All');
    setBedroomFilter('All');
    setMaxPrice(6000000000);
    setSortBy('featured');
    setSearchParams({});
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    locationFilter !== 'All' ||
    typeFilter !== 'All' ||
    statusFilter !== 'All' ||
    bedroomFilter !== 'All' ||
    maxPrice < 6000000000;

  const formatPriceDisplay = (val: number) => {
    if (val >= 1000000000) {
      return `₦${(val / 1000000000).toFixed(1)}B`;
    }
    return `₦${(val / 1000000).toFixed(0)}M`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* ── Page Header with Calm Entrance ── */}
      <Reveal direction="up">
        <div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b"
          style={{ borderColor: 'var(--border)' }}
        >
          <div>
            <div className="section-label mb-3">Prime Architectural Catalogue</div>
            <h1 className="font-heading font-extrabold text-[36px] sm:text-[48px] text-[#111318] tracking-tight">
              Curated Properties
            </h1>
            <p className="text-[15px] text-[#737780] mt-2 max-w-xl leading-relaxed">
              Explore exclusive estates, architectural villas, and skyline penthouses situated in premier enclaves of Lagos and Abuja.
            </p>
          </div>

          {/* Demo Disclaimer Note */}
          <div
            className="p-4 rounded-2xl max-w-sm text-xs text-[#737780] flex items-start gap-3 bg-white"
            style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-xs)' }}
          >
            <Info className="w-4 h-4 text-[#8EA9FF] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-[#111318] font-semibold">Demonstration Portfolio:</strong> All valuations, specifications, and listings are fictional portfolio samples for exhibition.
            </p>
          </div>
        </div>
      </Reveal>

      {/* ── Search & Controls Bar ── */}
      <Reveal direction="up" delay={0.15}>
        <div
          className="bg-white rounded-3xl p-5 sm:p-6 space-y-4"
          style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
        >
          <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
            {/* Live Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#A0A4AD] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by neighborhood, residence name, architectural feature..."
                className="w-full pl-11 pr-10 py-3 rounded-2xl text-[13px] text-[#111318] placeholder-[#A0A4AD] focus:outline-none transition-all"
                style={{ background: '#F5F5F7', border: '1px solid transparent' }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#737780] hover:text-[#111318] p-1 cursor-pointer"
                  aria-label="Clear search query"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Dropdowns & Sort */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5">
              {/* Status (Sale/Rent) */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="py-3 px-4 rounded-2xl text-[12px] font-semibold text-[#111318] cursor-pointer focus:outline-none"
                style={{ background: '#F5F5F7' }}
                aria-label="Filter by acquisition status"
              >
                <option value="All">All Statuses</option>
                <option value="For Sale">For Sale</option>
                <option value="For Rent">For Rent</option>
              </select>

              {/* Location */}
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="py-3 px-4 rounded-2xl text-[12px] font-semibold text-[#111318] cursor-pointer max-w-[170px] truncate focus:outline-none"
                style={{ background: '#F5F5F7' }}
                aria-label="Filter by location enclave"
              >
                <option value="All">All Locations</option>
                {locationsList.filter((l) => l !== 'All').map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-1.5 py-3 px-4 rounded-2xl" style={{ background: '#F5F5F7' }}>
                <ArrowUpDown className="w-3.5 h-3.5 text-[#737780]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-[12px] font-semibold text-[#111318] focus:outline-none cursor-pointer"
                  aria-label="Sort listings"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="beds-desc">Most Bedrooms</option>
                  <option value="newest">Year: Newest</option>
                </select>
              </div>

              {/* Mobile Filter Toggle */}
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="lg:hidden py-3 px-4 rounded-2xl bg-[#111318] text-white text-[12px] font-semibold flex items-center gap-1.5 ml-auto cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#8EA9FF]" />
                <span>Filters {hasActiveFilters && '•'}</span>
              </motion.button>
            </div>
          </div>

          {/* Desktop Expandable Filter Row */}
          <div
            className="hidden lg:flex items-center justify-between pt-3 text-xs text-[#737780]"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <div className="flex items-center gap-6">
              {/* Property Types */}
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-[#111318] mr-1">Type:</span>
                {typesList.map((t) => (
                  <motion.button
                    key={t}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setTypeFilter(t)}
                    className={`chip ${typeFilter === t ? 'chip-active' : 'chip-inactive'}`}
                  >
                    {t}
                  </motion.button>
                ))}
              </div>

              {/* Bedrooms Chips */}
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-[#111318] mr-1">Beds:</span>
                {['All', '4+', '5+', '6+'].map((b) => (
                  <motion.button
                    key={b}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setBedroomFilter(b)}
                    className={`chip ${bedroomFilter === b ? 'chip-active' : 'chip-inactive'}`}
                  >
                    {b}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Reset Filters */}
            {hasActiveFilters && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleResetFilters}
                className="text-[#111318] hover:text-rose-600 font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </motion.button>
            )}
          </div>
        </div>
      </Reveal>

      {/* Mobile Filters Accordion with Smooth Reveal */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.3, ease: LUXURY_EASE }}
            className="lg:hidden bg-white rounded-3xl p-6 space-y-6 overflow-hidden"
            style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}
          >
            <div className="flex items-center justify-between pb-3" style={{ borderBottom: '1px solid var(--border)' }}>
              <h3 className="font-heading font-bold text-base text-[#111318]">
                Advanced Filters
              </h3>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-1.5 text-[#737780] hover:text-[#111318] cursor-pointer"
                aria-label="Close filters drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Types */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#737780]">
                Property Typology
              </label>
              <div className="flex flex-wrap gap-1.5">
                {typesList.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    className={`chip ${typeFilter === t ? 'chip-active' : 'chip-inactive'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Bedrooms */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#737780]">
                Bedrooms
              </label>
              <div className="flex gap-2">
                {['All', '3+', '4+', '5+', '6+'].map((b) => (
                  <button
                    key={b}
                    onClick={() => setBedroomFilter(b)}
                    className={`flex-1 py-2 rounded-xl text-xs font-medium text-center cursor-pointer ${
                      bedroomFilter === b
                        ? 'bg-[#111318] text-white font-semibold'
                        : 'bg-[#F5F5F7] text-[#737780]'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-[10px] uppercase tracking-wider text-[#737780]">Max Valuation</span>
                <span className="text-[#111318]">{formatPriceDisplay(maxPrice)}</span>
              </div>
              <input
                type="range"
                min="50000000"
                max="6000000000"
                step="50000000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                aria-label="Filter maximum price"
              />
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleResetFilters}
                className="flex-1 py-3 rounded-2xl border text-xs font-semibold text-[#111318] cursor-pointer"
                style={{ borderColor: 'rgba(17,19,24,0.14)' }}
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="flex-1 py-3 rounded-2xl bg-[#111318] text-white text-xs font-semibold cursor-pointer"
              >
                Show Results
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Results Count ── */}
      <div className="flex items-center justify-between text-xs text-[#737780]">
        <div>
          Showing <span className="font-semibold text-[#111318]">{filteredProperties.length}</span> of {PROPERTIES.length} verified residences
        </div>

        {hasActiveFilters && (
          <button
            onClick={handleResetFilters}
            className="text-[11px] font-semibold text-[#8EA9FF] hover:underline cursor-pointer"
          >
            Clear Active Filters
          </button>
        )}
      </div>

      {/* ── Properties Grid with Staggered Visual Flow ── */}
      {filteredProperties.length > 0 ? (
        <StaggerContainer
          key={`${locationFilter}-${typeFilter}-${statusFilter}-${bedroomFilter}-${maxPrice}-${sortBy}`}
          staggerDelay={0.06}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          {filteredProperties.map((property) => (
            <StaggerItem key={property.id}>
              <PropertyCard property={property} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        /* Empty State */
        <Reveal direction="fade">
          <div
            className="bg-white rounded-3xl p-12 sm:p-20 text-center space-y-4 max-w-2xl mx-auto"
            style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-xs)' }}
          >
            <div className="w-14 h-14 rounded-full bg-[#F5F5F7] flex items-center justify-center mx-auto text-[#737780]">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-2xl text-[#111318]">
              No residences match your criteria
            </h3>
            <p className="text-sm text-[#737780] max-w-md mx-auto leading-relaxed">
              Try adjusting your search keywords, price limits, or location filter. We also maintain private off-market listings not listed publicly.
            </p>
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleResetFilters}
                className="btn-primary text-xs"
              >
                Clear All Filters
              </button>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full text-xs font-semibold text-[#111318] hover:bg-neutral-200 transition-colors"
                style={{ background: '#F5F5F7' }}
              >
                <span>Inquire for Off-Market Residences</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#8EA9FF]" />
              </Link>
            </div>
          </div>
        </Reveal>
      )}
    </div>
  );
}
