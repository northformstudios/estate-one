import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Info,
  Send,
  ArrowUpRight,
} from 'lucide-react';
import type { ContactFormData } from '../types';
import {
  Reveal,
  StaggerContainer,
  StaggerItem,
  TypographyReveal,
  LUXURY_EASE,
} from '../components/motion/MotionSystem';

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: 'General Acquisition Inquiry',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<ContactFormData | null>(null);

  const validate = () => {
    const errs: Partial<Record<keyof ContactFormData, string>> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Valid email is required';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Contact number is required';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please provide an inquiry message';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmittedData({ ...formData });
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 overflow-hidden">
      {/* ── Page Header ── */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Reveal direction="up" delay={0.05}>
          <div className="section-label justify-center mb-2">Private Client Advisory</div>
        </Reveal>
        <TypographyReveal
          as="h1"
          delay={0.12}
          className="font-heading font-extrabold text-[36px] sm:text-[48px] text-[#111318] tracking-tight text-center"
        >
          Connect with the Private Office
        </TypographyReveal>
        <Reveal direction="up" delay={0.3}>
          <p className="text-[#737780] text-sm sm:text-base leading-relaxed">
            Whether inquiring about private acquisitions, off-market estates, or discreet asset divestment, our senior partners are at your service.
          </p>
        </Reveal>
      </div>

      {/* ── Main Grid: Form & Channels ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Side (7 cols): The Contact Form */}
        <Reveal direction="left" delay={0.15} className="lg:col-span-7">
          <div
            className="bg-white rounded-3xl p-7 sm:p-10 transition-shadow duration-300 hover:shadow-md"
            style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
          >
            <AnimatePresence mode="wait">
              {isSubmitted && submittedData ? (
                /* Confirmation State */
                <motion.div
                  key="confirmation"
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
                      Inquiry Dispatched
                    </span>
                    <h3 className="font-heading font-bold text-2xl text-[#111318]">
                      Thank you, {submittedData.name}
                    </h3>
                    <p className="text-sm text-[#737780] max-w-md mx-auto leading-relaxed">
                      A Senior Partner from our {formData.subject.includes('Abuja') ? 'Abuja' : 'Lagos'} Private Office will contact you within two hours.
                    </p>
                  </div>

                  <div
                    className="rounded-2xl p-5 space-y-2.5 text-xs text-[#737780]"
                    style={{ background: '#F5F5F7' }}
                  >
                    <div className="flex justify-between">
                      <span>Subject:</span>
                      <span className="font-semibold text-[#111318]">{submittedData.subject}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Email:</span>
                      <span className="font-semibold text-[#111318]">{submittedData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Telephone:</span>
                      <span className="font-semibold text-[#111318]">{submittedData.phone}</span>
                    </div>
                  </div>

                  <div
                    className="p-4 rounded-2xl text-xs text-[#737780] space-y-1.5"
                    style={{ background: '#F5F5F7', border: '1px solid var(--border)' }}
                  >
                    <div className="flex items-center gap-1.5 font-semibold text-[#111318]">
                      <Info className="w-4 h-4 text-[#8EA9FF]" />
                      <span>Demonstration Notice:</span>
                    </div>
                    <p className="leading-relaxed">
                      This inquiry has been logged in simulation mode. In production, this form connects to transactional email (Resend / SendGrid) and CRM workflows.
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        subject: 'General Acquisition Inquiry',
                        message: '',
                      });
                    }}
                    className="w-full py-3.5 rounded-full border text-xs font-semibold text-[#111318] transition-colors hover:bg-neutral-50 cursor-pointer"
                    style={{ borderColor: 'rgba(17,19,24,0.14)' }}
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  noValidate
                >
                  <div>
                    <h3 className="font-heading font-bold text-xl text-[#111318]">
                      Send a Confidential Message
                    </h3>
                    <p className="text-xs text-[#737780] mt-1">
                      All communications are protected under our strict privacy charter.
                    </p>
                  </div>

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#111318]">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Alistair Adeleke"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`field ${errors.name ? 'error' : ''}`}
                      />
                      {errors.name && (
                        <p className="text-[11px] text-rose-500 font-medium">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#111318]">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="+234 803 000 0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`field ${errors.phone ? 'error' : ''}`}
                      />
                      {errors.phone && (
                        <p className="text-[11px] text-rose-500 font-medium">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Email & Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#111318]">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="name@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`field ${errors.email ? 'error' : ''}`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-rose-500 font-medium">{errors.email}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#111318]">
                        Inquiry Nature
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="field cursor-pointer font-medium"
                      >
                        <option value="General Acquisition Inquiry">Prime Property Acquisition</option>
                        <option value="Off-Market Private Portfolio">Request Off-Market Access</option>
                        <option value="Listing & Asset Divestment">Listing a Prime Property</option>
                        <option value="Executive Rental Services">Executive Corporate Lease</option>
                        <option value="Abuja Diplomatic Inquiry">Abuja Diplomatic Reservation</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#111318]">
                      Message & Specific Parameters <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Outline your preferred locations, budget parameters, architectural style, or timing..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`field resize-none ${errors.message ? 'error' : ''}`}
                    />
                    {errors.message && (
                      <p className="text-[11px] text-rose-500 font-medium">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit CTA */}
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="btn-primary w-full py-4 text-xs font-bold tracking-wide cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-[#8EA9FF]" />
                    <span>Transmit Confidential Message</span>
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        {/* Right Side (5 cols): Office Details, Direct lines, Hours */}
        <div className="lg:col-span-5">
          <StaggerContainer staggerDelay={0.12} initialDelay={0.2} className="space-y-6">
            {/* Lagos Office */}
            <StaggerItem>
              <motion.div
                whileHover={{ y: -3, transition: { duration: 0.25 } }}
                className="bg-white rounded-3xl p-6 sm:p-8 space-y-4 transition-shadow duration-300 hover:shadow-md"
                style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-[#8EA9FF] font-bold bg-[#111318] px-2.5 py-0.5 rounded-full">
                    Headquarters
                  </span>
                  <span className="text-xs text-[#737780] font-mono">Lagos HQ</span>
                </div>

                <h3 className="font-heading font-bold text-xl text-[#111318]">
                  Ikoyi Private Office
                </h3>

                <div className="space-y-3 text-xs text-[#737780]">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#111318] shrink-0 mt-0.5" />
                    <span>14 Alexander Road, Ikoyi, Lagos, Nigeria</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#111318] shrink-0" />
                    <a href="tel:+2348035550192" className="text-[#111318] font-semibold hover:underline">
                      +234 803 555 0192
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#111318] shrink-0" />
                    <span>Monday – Friday: 08:30 – 18:00 (WAT)</span>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>

            {/* Abuja Office */}
            <StaggerItem>
              <motion.div
                whileHover={{ y: -3, transition: { duration: 0.25 } }}
                className="bg-white rounded-3xl p-6 sm:p-8 space-y-4 transition-shadow duration-300 hover:shadow-md"
                style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-[#737780] font-bold bg-[#F5F5F7] px-2.5 py-0.5 rounded-full">
                    Diplomatic Desk
                  </span>
                  <span className="text-xs text-[#737780] font-mono">Abuja Capital</span>
                </div>

                <h3 className="font-heading font-bold text-xl text-[#111318]">
                  Maitama Private Office
                </h3>

                <div className="space-y-3 text-xs text-[#737780]">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#111318] shrink-0 mt-0.5" />
                    <span>28 Gana Street, Maitama, Abuja, Nigeria</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#111318] shrink-0" />
                    <a href="tel:+2348027770481" className="text-[#111318] font-semibold hover:underline">
                      +234 802 777 0481
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#111318] shrink-0" />
                    <span>Monday – Saturday: 09:00 – 17:30 (WAT)</span>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>

            {/* Global Direct Line */}
            <StaggerItem>
              <motion.div
                whileHover={{ y: -3, transition: { duration: 0.25 } }}
                className="bg-[#111318] text-white rounded-3xl p-6 sm:p-8 space-y-4 transition-shadow duration-300 hover:shadow-xl"
                style={{ boxShadow: 'var(--shadow-md)' }}
              >
                <div className="flex items-center gap-2 text-xs text-[#8EA9FF]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Direct Advisor Escalation</span>
                </div>
                <h4 className="font-heading font-bold text-lg text-white">
                  Private Client Concierge
                </h4>
                <p className="text-xs text-white/70 leading-relaxed">
                  For immediate assistance regarding urgent acquisition tenders, private treaty sales, or international transactions:
                </p>
                <div className="pt-1">
                  <a
                    href="mailto:privateoffice@estateone.luxury"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#8EA9FF] transition-colors group/mail"
                  >
                    <span>privateoffice@estateone.luxury</span>
                    <ArrowUpRight className="w-4 h-4 text-[#8EA9FF] transition-transform group-hover/mail:translate-x-0.5 group-hover/mail:-translate-y-0.5" />
                  </a>
                </div>
              </motion.div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </div>
  );
}
