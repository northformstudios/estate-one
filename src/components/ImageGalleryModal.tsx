import { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  url: string;
  caption: string;
}

interface ImageGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: GalleryImage[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  propertyTitle: string;
}

export default function ImageGalleryModal({
  isOpen,
  onClose,
  images,
  currentIndex,
  onSelectIndex,
  propertyTitle,
}: ImageGalleryModalProps) {
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onSelectIndex((currentIndex + 1) % images.length);
      if (e.key === 'ArrowLeft') onSelectIndex((currentIndex - 1 + images.length) % images.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, currentIndex, images.length, onClose, onSelectIndex]);

  // Scroll active thumbnail into view
  useEffect(() => {
    if (!isOpen || !thumbnailContainerRef.current) return;
    const activeThumb = thumbnailContainerRef.current.children[currentIndex] as HTMLElement;
    if (activeThumb) {
      activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [isOpen, currentIndex]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex] || images[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectIndex((currentIndex - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectIndex((currentIndex + 1) % images.length);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${propertyTitle} gallery`}
      className="fixed inset-0 z-50 flex flex-col justify-between p-4 sm:p-6 anim-fade-in"
      style={{
        background: 'rgba(12, 13, 16, 0.96)',
        backdropFilter: 'blur(28px)',
      }}
      onClick={onClose}
    >
      {/* ── Top Header Bar ── */}
      <div
        className="flex items-center justify-between text-white/90 pb-4 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.10)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <span className="text-[10px] uppercase tracking-[0.16em] text-[#8EA9FF] font-semibold block mb-0.5">
            Estate One Private Portfolio
          </span>
          <h4 className="text-sm font-semibold truncate max-w-xs sm:max-w-md text-white">
            {propertyTitle}
          </h4>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-white/60 tabular-nums">
            {currentIndex + 1} / {images.length}
          </span>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-105"
            style={{ background: 'rgba(255,255,255,0.12)' }}
            aria-label="Close photograph gallery"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ── Main Viewport ── */}
      <div
        className="relative flex-1 flex items-center justify-center my-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-6 z-10 w-12 h-12 rounded-full text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          style={{ background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(12px)' }}
          aria-label="Previous photograph"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Current Photograph */}
        <div className="max-w-5xl max-h-[72vh] w-full flex flex-col items-center justify-center px-4">
          <img
            key={currentImage.url}
            src={currentImage.url}
            alt={currentImage.caption || `Photograph ${currentIndex + 1}`}
            className="max-h-[65vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl anim-fade-in"
          />
          {currentImage.caption && (
            <p className="mt-4 text-xs sm:text-sm text-white/80 text-center font-medium max-w-xl leading-relaxed">
              {currentImage.caption}
            </p>
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-6 z-10 w-12 h-12 rounded-full text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          style={{ background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(12px)' }}
          aria-label="Next photograph"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* ── Bottom Thumbnail Strip ── */}
      <div
        ref={thumbnailContainerRef}
        className="pt-3 border-t overflow-x-auto flex items-center justify-center gap-2.5 pb-1"
        style={{ borderColor: 'rgba(255,255,255,0.10)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => onSelectIndex(idx)}
            className={`relative rounded-xl overflow-hidden shrink-0 transition-all duration-200 ${
              idx === currentIndex
                ? 'ring-2 ring-[#8EA9FF] scale-105 opacity-100'
                : 'opacity-40 hover:opacity-80'
            }`}
            aria-label={`View photograph ${idx + 1}`}
          >
            <img
              src={img.url}
              alt=""
              className="w-16 h-12 sm:w-20 sm:h-14 object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
