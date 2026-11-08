import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import DemoDisclaimerBanner from './components/DemoDisclaimerBanner';
import ScrollToTop from './components/ScrollToTop';
import { LUXURY_EASE } from './components/motion/MotionSystem';

// Pages
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import RequestViewing from './pages/RequestViewing';

function AnimatedPageRoutes() {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  const pageVariants = shouldReduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.15 } },
        exit: { opacity: 0, transition: { duration: 0.1 } },
      }
    : {
        initial: { opacity: 0, y: 12 },
        animate: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.45,
            ease: LUXURY_EASE,
          },
        },
        exit: {
          opacity: 0,
          y: -8,
          transition: {
            duration: 0.25,
            ease: [0.32, 0, 0.67, 0] as const,
          },
        },
      };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="flex-grow flex flex-col"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:slug" element={<PropertyDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/request-viewing" element={<RequestViewing />} />
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-[#F5F5F7] text-[#111318]">
        {/* Demonstration Disclaimer Notice Banner */}
        <DemoDisclaimerBanner />

        {/* Global Navigation Header */}
        <Header />

        {/* Page Main Content with Smooth Page Transitions */}
        <main className="flex-grow flex flex-col">
          <AnimatedPageRoutes />
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </Router>
  );
}
