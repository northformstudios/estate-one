import { useState } from 'react';
import { Info, X } from 'lucide-react';

export default function DemoDisclaimerBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-[#111318] text-[#F5F5F7] text-xs font-medium py-2 px-4 transition-all duration-300 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-[#8EA9FF] animate-pulse" />
          <span className="inline-flex items-center gap-1.5 font-semibold tracking-wide uppercase text-[10px] bg-white/10 px-2 py-0.5 rounded text-white">
            <Info className="w-3 h-3 text-[#8EA9FF]" />
            Portfolio Demonstration
          </span>
          <p className="text-white/80 hidden sm:inline">
            Estate One is a premium luxury real estate portfolio showcase. All listings, imagery, and pricing are fictional demo data.
          </p>
          <p className="text-white/80 sm:hidden">
            Curated luxury portfolio showcase (Demo Data).
          </p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-white/60 hover:text-white transition-colors p-1"
          aria-label="Dismiss demo notice"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
