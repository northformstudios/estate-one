import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarCheck,
  CheckCircle2,
  ShieldCheck,
  Building,
  Phone,
  Mail,
  User,
  Calendar as CalendarIcon,
  ArrowRight,
  Info,
  Car,
  Wine,
} from 'lucide-react';
import { PROPERTIES } from '../data/properties';
import type { ViewingFormData } from '../types';
import {
  Reveal,
  TypographyReveal,
  LUXURY_EASE,
} from '../components/motion/MotionSystem';

export default function RequestViewing() {
  const [searchParams] = useSearchParams();
  const preselectedSlug = searchParams.get('property');

  const [formData, setFormData] = useState<ViewingFormData>({
    name: '',
    email: '',
    phone: '',
    propertyId: '',
    propertyTitle: '',
    preferredDate: '',
    preferredTime: 'Afternoon (2:00 PM – 5:00 PM)',
    message: '',
    newsletterOptIn: true,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ViewingFormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<ViewingFormData | null>(null);

  // Set initial property if passed via query param
  useEffect(() => {
    if (preselectedSlug) {
      const match = PROPERTIES.find((p) => p.slug === preselectedSlug || p.id === preselectedSlug);
      if (match) {
        setFormData((prev) => ({
          ...prev,
          propertyId: match.id,
          propertyTitle: match.title,
        }));
      }
    } else if (PROPERTIES.length > 0 && !formData.propertyId) {
      setFormData((prev) => ({
        ...prev,
        propertyId: PROPERTIES[0].id,
        propertyTitle: PROPERTIES[0].title,
      }));
    }
  }, [preselectedSlug, formData.propertyId]);

  const handlePropertyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const match = PROPERTIES.find((p) => p.id === selectedId);
    setFormData((prev) => ({
      ...prev,
      propertyId: selectedId,
      propertyTitle: match ? match.title : '',
    }));
  };

  const validate = () => {
    const errs: Partial<Record<keyof ViewingFormData, string>> = {};

    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please provide a valid email';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required for viewing verification';
    }
    if (!formData.preferredDate) {
      errs.preferredDate = 'Please select a preferred viewing date';
    }
    if (!formData.propertyId) {
      errs.propertyId = 'Please select a residence from our portfolio';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Simulate luxury dispatch
    setSubmittedBooking({ ...formData });
    setIsSubmitted(true);
  };

  const selectedPropertyObj = PROPERTIES.find((p) => p.id === formData.propertyId);

  // Minimum date is tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateString = tomorrow.toISOString().split('T')[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 overflow-hidden">
      {/* ── Page Header ── */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Reveal direction="up" delay={0.05}>
          <div className="section-label justify-center mb-2">Private Representation Service</div>
        </Reveal>
        <TypographyReveal
          as="h1"
          delay={0.12}
          className="font-heading font-extrabold text-[36px] sm:text-[48px] text-[#111318] tracking-tight text-center"
        >
          Request a Private Viewing
        </TypographyReveal>
        <Reveal direction="up" delay={0.3}>
          <p className="text-[#737780] text-sm sm:text-base leading-relaxed">
            Experience our architectural residences in complete privacy. A senior partner will accompany you throughout the private walkthrough.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
        {/* Left Side: The Form */}
        <Reveal direction="left" delay={0.15} className="lg:col-span-7">
          <div
            className="bg-white rounded-3xl p-7 sm:p-10 transition-shadow duration-300 hover:shadow-md"
            style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
          >
            <AnimatePresence mode="wait">
              {isSubmitted && submittedBooking ? (
                /* Success Confirmation Screen */
                <motion.div
                  key="booking-success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, ease: LUXURY_EASE }}
                  className="space-y-6 py-6"
                >
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.4, ease: LUXURY_EASE }}
                    className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto"
                  >
                    <CheckCircle2 className="w-8 h-8" />
                  </motion.div>

                  <div className="text-center space-y-2">
                    <span className="text-[10px] uppercase tracking-widest text-[#8EA9FF] font-bold">
                      Viewing Request Registered
                    </span>
                    <h3 className="font-heading font-bold text-2xl text-[#111318]">
                      Thank you, {submittedBooking.name}
                    </h3>
                    <p className="text-sm text-[#737780] max-w-md mx-auto leading-relaxed">
                      Your viewing itinerary for <strong className="text-[#111318]">{submittedBooking.propertyTitle}</strong> has been logged in our reservation ledger.
                    </p>
                  </div>

                  {/* Booking Summary Card */}
                  <div
                    className="rounded-2xl p-5 space-y-3 text-xs text-[#737780]"
                    style={{ background: '#F5F5F7' }}
                  >
                    <div className="flex items-center justify-between pb-2" style={{ borderBottom: '1px solid var(--border)' }}>
                      <span>Selected Residence:</span>
                      <span className="font-semibold text-[#111318]">{submittedBooking.propertyTitle}</span>
                    </div>
                    <div className="flex items-center justify-between pb-2" style={{ borderBottom: '1px solid var(--border)' }}>
                      <span>Requested Date:</span>
                      <span className="font-semibold text-[#111318]">{submittedBooking.preferredDate}</span>
                    </div>
                    <div className="flex items-center justify-between pb-2" style={{ borderBottom: '1px solid var(--border)' }}>
                      <span>Preferred Window:</span>
                      <span className="font-semibold text-[#111318]">{submittedBooking.preferredTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Contact Callback:</span>
                      <span className="font-semibold text-[#111318]">{submittedBooking.phone}</span>
                    </div>
                  </div>

                  {/* Demo Mode Notice Box */}
                  <div
                    className="p-4 rounded-2xl text-xs text-[#737780] space-y-2"
                    style={{ background: '#F5F5F7', border: '1px solid var(--border)' }}
                  >
                    <div className="flex items-center gap-1.5 font-semibold text-[#111318]">
                      <Info className="w-4 h-4 text-[#8EA9FF]" />
                      <span>Demonstration Mode Note:</span>
                    </div>
                    <p className="leading-relaxed">
                      This form is currently running in simulated client presentation mode. In a live production deployment, this submission triggers transactional emails via Resend / SendGrid / NodeMailer and syncs with a CRM (HubSpot / Salesforce).
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          propertyId: PROPERTIES[0]?.id || '',
                          propertyTitle: PROPERTIES[0]?.title || '',
                          preferredDate: '',
                          preferredTime: 'Afternoon (2:00 PM – 5:00 PM)',
                          message: '',
                          newsletterOptIn: true,
                        });
                      }}
                      className="flex-1 py-3.5 px-4 rounded-full border text-xs font-semibold text-[#111318] hover:bg-neutral-50 transition-colors text-center cursor-pointer"
                      style={{ borderColor: 'rgba(17,19,24,0.14)' }}
                    >
                      Schedule Another Viewing
                    </button>
                    <Link
                      to="/properties"
                      className="btn-primary flex-1 text-xs text-center"
                    >
                      <span>Explore More Properties</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              ) : (
                /* The Interactive Viewing Form */
                <motion.form
                  key="booking-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  noValidate
                >
                  {/* Selected Property Dropdown */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#111318]">
                      Selected Property <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-[#A0A4AD] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        value={formData.propertyId}
                        onChange={handlePropertyChange}
                        className="field pl-10 cursor-pointer font-semibold"
                      >
                        {PROPERTIES.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.title} — {p.location} ({p.priceDisplay})
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.propertyId && (
                      <p className="text-[11px] text-rose-500 font-medium">{errors.propertyId}</p>
                    )}
                  </div>

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#111318]">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#A0A4AD] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="e.g. Dr. / Mr. / Ms. Adebayo"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={`field pl-10 ${errors.name ? 'error' : ''}`}
                        />
                      </div>
                      {errors.name && (
                        <p className="text-[11px] text-rose-500 font-medium">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#111318]">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#A0A4AD] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="email"
                          placeholder="client@familyoffice.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`field pl-10 ${errors.email ? 'error' : ''}`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-[11px] text-rose-500 font-medium">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone & Preferred Date Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#111318]">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-[#A0A4AD] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="tel"
                          placeholder="+234 800 000 0000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={`field pl-10 ${errors.phone ? 'error' : ''}`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-[11px] text-rose-500 font-medium">{errors.phone}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#111318]">
                        Preferred Date <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <CalendarIcon className="w-4 h-4 text-[#A0A4AD] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="date"
                          min={minDateString}
                          value={formData.preferredDate}
                          onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                          className={`field pl-10 ${errors.preferredDate ? 'error' : ''}`}
                        />
                      </div>
                      {errors.preferredDate && (
                        <p className="text-[11px] text-rose-500 font-medium">{errors.preferredDate}</p>
                      )}
                    </div>
                  </div>

                  {/* Preferred Time Window */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#111318]">
                      Preferred Time Window
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {[
                        'Morning (10:00 AM – 1:00 PM)',
                        'Afternoon (2:00 PM – 5:00 PM)',
                        'Twilight VIP (5:30 PM – 7:30 PM)',
                      ].map((slot) => (
                        <motion.button
                          type="button"
                          key={slot}
                          whileTap={{ scale: 0.97 }}
                          whileHover={{ scale: 1.01 }}
                          onClick={() => setFormData({ ...formData, preferredTime: slot })}
                          className={`py-3 px-3 rounded-2xl text-xs font-semibold text-left transition-all cursor-pointer ${
                            formData.preferredTime === slot
                              ? 'bg-[#111318] text-white shadow-sm'
                              : 'bg-[#F5F5F7] text-[#737780] hover:bg-neutral-200'
                          }`}
                        >
                          {slot}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Additional Message */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#111318]">
                      Special Requests / Advisory Parameters
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Provide any privacy requirements, specific architectural areas of interest, or security details..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="field resize-none"
                    />
                  </div>

                  {/* Discretion Checkbox */}
                  <div className="flex items-start gap-2.5 text-xs text-[#737780] pt-1">
                    <input
                      type="checkbox"
                      id="discretion"
                      defaultChecked
                      className="mt-0.5 rounded border-neutral-300 accent-[#111318] cursor-pointer"
                    />
                    <label htmlFor="discretion" className="leading-snug cursor-pointer">
                      I require non-disclosure protocol and discreet accompaniment for this property visit.
                    </label>
                  </div>

                  {/* Submit CTA */}
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="btn-primary w-full py-4 text-xs font-bold tracking-wide cursor-pointer"
                  >
                    <CalendarCheck className="w-4 h-4 text-[#8EA9FF]" />
                    <span>Confirm Viewing Request</span>
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        {/* Right Side: Selected Residence Preview & Protocol Guarantees */}
        <div className="lg:col-span-5 space-y-6">
          {/* Selected Property Quick Card */}
          {selectedPropertyObj && (
            <Reveal direction="right" delay={0.2}>
              <motion.div
                whileHover={{ y: -3, transition: { duration: 0.25 } }}
                className="group bg-white rounded-3xl p-5 space-y-4 transition-shadow duration-300 hover:shadow-md"
                style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="section-label">Viewing Target Residence</div>

                <div className="relative rounded-2xl overflow-hidden aspect-[16/10]">
                  <img
                    src={selectedPropertyObj.heroImage}
                    alt={selectedPropertyObj.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div
                    className="absolute top-3 left-3 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full"
                    style={{ background: 'rgba(17,19,24,0.85)', backdropFilter: 'blur(12px)' }}
                  >
                    {selectedPropertyObj.status}
                  </div>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-base text-[#111318]">
                    {selectedPropertyObj.title}
                  </h3>
                  <p className="text-xs text-[#737780]">{selectedPropertyObj.location}</p>
                  <div className="font-heading font-extrabold text-xl text-[#111318] mt-1.5">
                    {selectedPropertyObj.priceDisplay}
                  </div>
                </div>
              </motion.div>
            </Reveal>
          )}

          {/* Concierge Protocol Pillars */}
          <Reveal direction="up" delay={0.3}>
            <div
              className="bg-[#111318] text-white rounded-3xl p-6 sm:p-8 space-y-5 transition-shadow duration-300 hover:shadow-xl"
              style={{ boxShadow: 'var(--shadow-md)' }}
            >
              <h4 className="font-heading font-bold text-lg text-white">
                The Estate One Viewing Protocol
              </h4>

              <div className="space-y-4 text-xs text-white/80">
                <div className="flex items-start gap-3">
                  <Car className="w-4 h-4 text-[#8EA9FF] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold mb-0.5">Private Chauffeur Pickup</strong>
                    <span className="text-white/70">Complimentary executive transfer available upon client request.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#8EA9FF] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold mb-0.5">Confidentiality & NDA Policy</strong>
                    <span className="text-white/70">Exclusive private access ensuring zero paparazzi or public overlap.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Wine className="w-4 h-4 text-[#8EA9FF] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold mb-0.5">Senior Partner Accompaniment</strong>
                    <span className="text-white/70">Guided by an equity partner with comprehensive architectural dossier.</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
