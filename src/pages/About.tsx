import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Award,
  Building,
  CheckCircle,
  ArrowUpRight,
  MapPin,
  CalendarCheck,
} from 'lucide-react';
import { DEMO_AGENTS } from '../data/properties';
import {
  Reveal,
  StaggerContainer,
  StaggerItem,
  TypographyReveal,
  LUXURY_EASE,
} from '../components/motion/MotionSystem';

export default function About() {
  const partners = Object.values(DEMO_AGENTS);

  const enclaves = [
    {
      name: 'Banana Island, Lagos',
      desc: 'Nigeria’s most exclusive gated peninsula with private deep-water lagoon berths, helipads, and hyper-secure perimeter access.',
      tag: 'Waterfront Mansions & Penthouses',
    },
    {
      name: 'Old Ikoyi, Lagos',
      desc: 'Historic leafy avenues, expansive colonial grounds, diplomatic residences, and elite social clubs including Ikoyi Club 1938.',
      tag: 'Sprawling Private Estates',
    },
    {
      name: 'Victoria Island, Lagos',
      desc: 'The corporate financial heartbeat of West Africa, boasting high-rise oceanfront sky penthouses and luxury hospitality.',
      tag: 'Skyline Penthouses & Duplexes',
    },
    {
      name: 'Maitama, Abuja',
      desc: 'The apex of Nigeria’s federal capital: home to foreign embassies, ministerial compounds, and high-security residences.',
      tag: 'Diplomatic Enclaves',
    },
    {
      name: 'Asokoro, Abuja',
      desc: 'Elevated scenic enclave framing the presidential axis with monumental private fortresses overlooking rolling rock formations.',
      tag: 'Sovereign Palaces',
    },
    {
      name: 'Lekki Phase 1, Lagos',
      desc: 'Vibrant modern hub favored by tech pioneers and international entrepreneurs with cutting-edge tropical architecture.',
      tag: 'Contemporary Architectural Duplexes',
    },
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-24 overflow-hidden">
      {/* ── 1. Hero Section ── */}
      <section className="pt-8 sm:pt-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Reveal direction="up" delay={0.05}>
            <div className="section-label justify-center mb-2">The Private Office</div>
          </Reveal>

          <TypographyReveal
            as="h1"
            delay={0.12}
            className="font-heading font-extrabold text-[38px] sm:text-[60px] text-[#111318] tracking-tight leading-[1.06] text-center"
          >
            Redefining luxury real estate as living art.
          </TypographyReveal>

          <Reveal direction="up" delay={0.3}>
            <p className="text-[#737780] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Estate One was established to offer private clients, family offices, and ambassadors an elevated, confidential approach to prime property acquisition across Lagos and Abuja.
            </p>
          </Reveal>
        </div>

        {/* Hero Visual Banner */}
        <Reveal direction="mask" delay={0.25} className="mt-12 sm:mt-16">
          <div
            className="rounded-3xl overflow-hidden relative shadow-xl group"
            style={{ aspectRatio: '21/9', minHeight: 320, background: '#111318' }}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
              alt="Estate One Architectural Heritage"
              className="w-full h-full object-cover opacity-85"
              fetchPriority="high"
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.8, ease: LUXURY_EASE }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-white pointer-events-none">
              <div className="max-w-md">
                <span className="text-[10px] uppercase tracking-widest text-[#8EA9FF] font-semibold block mb-1">
                  Our Manifesto
                </span>
                <p className="font-heading font-bold text-lg sm:text-2xl text-white">
                  "We do not sell square meters. We curate exceptional architectural heritage."
                </p>
              </div>
              <div className="text-xs text-white/60 font-mono">
                Boutique Private Office Model
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── 2. The Story & Standards ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <Reveal direction="left" delay={0.1} className="lg:col-span-6 space-y-6">
            <div className="section-label">Founded on Rigor</div>

            <h2 className="font-heading font-extrabold text-[30px] sm:text-[40px] text-[#111318] tracking-tight leading-tight">
              An antidote to generic real estate marketing.
            </h2>

            <div className="space-y-4 text-[15px] text-[#737780] leading-relaxed">
              <p>
                In an era crowded with generic listings and fragmented agencies, Estate One was founded to restore discretion, aesthetic discernment, and institutional diligence to the Nigerian luxury real estate sector.
              </p>
              <p>
                We operate as a private client office rather than a mass brokerage. Each property in our portfolio undergoes exhaustive vetting—from deed validation at the land registry to structural and environmental acoustic audits. If a residence fails to meet our design or legal thresholds, we do not represent it.
              </p>
              <p>
                Whether securing a waterfront sanctuary on Banana Island or negotiating an off-market diplomatic compound in Maitama, our clients benefit from unimpeachable market intelligence and complete anonymity.
              </p>
            </div>
          </Reveal>

          <StaggerContainer className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4" staggerDelay={0.09}>
            <StaggerItem>
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="p-6 rounded-3xl bg-white space-y-3 h-full transition-shadow duration-300 hover:shadow-md"
                style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-xs)' }}
              >
                <div className="w-10 h-10 rounded-2xl bg-[#F5F5F7] flex items-center justify-center">
                  <Award className="w-5 h-5 text-[#111318]" />
                </div>
                <h3 className="font-heading font-bold text-base text-[#111318]">
                  Architectural Integrity
                </h3>
                <p className="text-xs text-[#737780] leading-relaxed">
                  Prioritizing clean proportions, sustainable materials, and natural light over superficial embellishment.
                </p>
              </motion.div>
            </StaggerItem>

            <StaggerItem>
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="p-6 rounded-3xl bg-white space-y-3 h-full transition-shadow duration-300 hover:shadow-md"
                style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-xs)' }}
              >
                <div className="w-10 h-10 rounded-2xl bg-[#F5F5F7] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-[#8EA9FF]" />
                </div>
                <h3 className="font-heading font-bold text-base text-[#111318]">
                  Confidential Representation
                </h3>
                <p className="text-xs text-[#737780] leading-relaxed">
                  Guaranteed privacy with strict non-disclosure protections for both buyers and sellers.
                </p>
              </motion.div>
            </StaggerItem>

            <StaggerItem>
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="p-6 rounded-3xl bg-white space-y-3 h-full transition-shadow duration-300 hover:shadow-md"
                style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-xs)' }}
              >
                <div className="w-10 h-10 rounded-2xl bg-[#F5F5F7] flex items-center justify-center">
                  <Building className="w-5 h-5 text-[#111318]" />
                </div>
                <h3 className="font-heading font-bold text-base text-[#111318]">
                  Prime Enclave Focus
                </h3>
                <p className="text-xs text-[#737780] leading-relaxed">
                  Hyper-focused on Nigeria's 6 most valuable postal codes in Lagos and Abuja.
                </p>
              </motion.div>
            </StaggerItem>

            <StaggerItem>
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="p-6 rounded-3xl bg-white space-y-3 h-full transition-shadow duration-300 hover:shadow-md"
                style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-xs)' }}
              >
                <div className="w-10 h-10 rounded-2xl bg-[#F5F5F7] flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-[#111318]" />
                </div>
                <h3 className="font-heading font-bold text-base text-[#111318]">
                  Clean Title Assurance
                </h3>
                <p className="text-xs text-[#737780] leading-relaxed">
                  Zero title ambiguity. Every listing holds authentic Governor's Consent or FCDA C of O.
                </p>
              </motion.div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* ── 3. Senior Advisory Partners ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up" className="text-center max-w-2xl mx-auto mb-14">
          <div className="section-label justify-center mb-3">Leadership & Advisory</div>
          <h2 className="font-heading font-extrabold text-[32px] sm:text-[40px] text-[#111318] tracking-tight">
            Senior Partners
          </h2>
          <p className="text-[#737780] text-[15px] mt-2">
            Decades of combined transactional expertise across West Africa and international financial capitals.
          </p>
        </Reveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.12}>
          {partners.map((partner, idx) => (
            <StaggerItem key={idx}>
              <motion.div
                whileHover={{ y: -6, transition: { duration: 0.35, ease: LUXURY_EASE } }}
                className="group bg-white rounded-3xl overflow-hidden p-6 space-y-5 transition-shadow duration-300 hover:shadow-xl h-full flex flex-col justify-between"
                style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="space-y-5">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-neutral-100">
                    <img
                      src={partner.avatar}
                      alt={partner.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#8EA9FF] font-semibold bg-[#111318] px-2.5 py-0.5 rounded-full">
                      Partner
                    </span>
                    <h3 className="font-heading font-bold text-xl text-[#111318] mt-2.5">
                      {partner.name}
                    </h3>
                    <p className="text-xs text-[#737780] font-medium">{partner.role}</p>
                    <p className="text-xs text-[#737780] mt-3 leading-relaxed">
                      {partner.experience}
                    </p>
                  </div>
                </div>

                <div
                  className="pt-4 flex items-center justify-between text-xs"
                  style={{ borderTop: '1px solid var(--border)' }}
                >
                  <a
                    href={`tel:${partner.phone}`}
                    className="text-[#111318] font-semibold hover:text-[#8EA9FF] transition-colors"
                  >
                    {partner.phone}
                  </a>
                  <Link
                    to="/request-viewing"
                    className="text-[#8EA9FF] hover:underline flex items-center gap-1 font-medium group/link"
                  >
                    <span>Book Consult</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </Link>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ── 4. Prime Enclaves Spotlight ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up" className="text-center max-w-2xl mx-auto mb-14">
          <div className="section-label justify-center mb-3">Geographic Focus</div>
          <h2 className="font-heading font-extrabold text-[32px] sm:text-[40px] text-[#111318] tracking-tight">
            Our Prime Territories
          </h2>
          <p className="text-[#737780] text-[15px] mt-2">
            Unrivaled advisory focus restricted to the most secure, prestigious neighborhoods in Nigeria.
          </p>
        </Reveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
          {enclaves.map((enc, idx) => (
            <StaggerItem key={idx}>
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="p-6 rounded-3xl bg-white space-y-3 h-full flex flex-col justify-between transition-shadow duration-300 hover:shadow-md"
                style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-xs)' }}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-[#8EA9FF] bg-[#111318] px-2.5 py-0.5 rounded-full">
                      {enc.tag}
                    </span>
                    <MapPin className="w-4 h-4 text-[#737780]" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#111318]">
                    {enc.name}
                  </h3>
                  <p className="text-xs text-[#737780] leading-relaxed">
                    {enc.desc}
                  </p>
                </div>
                <div className="pt-2">
                  <Link
                    to={`/properties?location=${encodeURIComponent(enc.name)}`}
                    className="text-xs font-semibold text-[#111318] hover:text-[#8EA9FF] inline-flex items-center gap-1 transition-colors link-animated"
                  >
                    <span>View enclave listings</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ── 5. Call To Action ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="mask" duration={0.9}>
          <div
            className="rounded-3xl text-white p-8 sm:p-16 text-center max-w-4xl mx-auto space-y-6 shadow-2xl"
            style={{ background: '#0C0D10' }}
          >
            <div className="section-label justify-center" style={{ color: '#8EA9FF' }}>
              Begin the Journey
            </div>
            <h2 className="font-heading font-extrabold text-[32px] sm:text-[46px] text-white tracking-tight leading-tight">
              Acquire or Divest with Absolute Discretion.
            </h2>
            <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Contact our Private Client Office to discuss private mandates, off-market opportunities, or portfolio acquisitions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                to="/request-viewing"
                className="btn-primary text-xs"
                style={{ background: 'white', color: '#111318' }}
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Request a Viewing</span>
              </Link>
              <Link
                to="/contact"
                className="btn-secondary text-xs"
              >
                <span>Contact Private Office</span>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
