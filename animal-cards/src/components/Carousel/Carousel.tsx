'use client';

import { useEffect, useRef, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, A11y } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useAppContext } from '@/context/AppContext';
import AnimalCard from '@/components/Card/AnimalCard';
import { Animal } from '@/types/animal';
import 'swiper/css';

interface CarouselProps {
  animals: Animal[];
  loading?: boolean;
}

// Clamp velocity → transition duration: fast fling = 150ms, slow drag = 450ms
function velocityToDuration(velocity: number): number {
  const abs = Math.abs(velocity);
  if (abs <= 0) return 450;
  const ms = Math.round(400 / (1 + abs * 3));
  return Math.min(450, Math.max(150, ms));
}

export default function Carousel({ animals, loading }: CarouselProps) {
  const { state, dispatch } = useAppContext();
  const swiperRef = useRef<SwiperType | null>(null);

  const handleSlideChange = useCallback(
    (swiper: SwiperType) => { dispatch({ type: 'SET_INDEX', payload: swiper.realIndex }); },
    [dispatch]
  );

  // Velocity-based transition speed on swipe release
  const handleTouchEnd = useCallback((swiper: SwiperType) => {
    const duration = velocityToDuration(swiper.velocity);
    swiper.params.speed = duration;
  }, []);

  // Progressive depth effect: scale + opacity + zIndex per card-step from center, capped at 3
  const handleProgress = useCallback((swiper: SwiperType) => {
    const slideWidth = swiper.slidesSizesGrid[0] ?? swiper.width;
    const gap = (swiper.params.spaceBetween as number) ?? 0;
    const step = Math.max(slideWidth + gap, slideWidth * 0.5); // prevent near-zero divisor
    swiper.slides.forEach((slide) => {
      const el = slide as HTMLElement;
      const offsetPx = el.offsetLeft + swiper.translate + swiper.width / 2 - slideWidth / 2;
      const dist = Math.min(Math.abs(offsetPx / step), 3); // 0 = active, capped at 3
      const scale   = 1 - dist * 0.15;           // 1.0 → 0.85 → 0.70 → 0.55
      const opacity  = 1 - dist * 0.35;           // 1.0 → 0.65 → 0.30 → 0
      const zIndex   = Math.round(30 - dist * 10); // 30 → 20 → 10 → 0
      el.style.transform      = `scale(${scale})`;
      el.style.opacity        = String(Math.max(0, opacity));
      el.style.zIndex         = String(zIndex);
      el.style.transition     = 'transform 0.3s ease, opacity 0.3s ease';
      el.style.transformOrigin = 'center center';
    });
  }, []);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (swiper && swiper.realIndex !== state.currentIndex) {
      swiper.slideToLoop(state.currentIndex);
    }
  }, [state.currentIndex]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column', gap: 2 }}>
        <CircularProgress color="primary" size={48} />
        <Typography variant="body1" color="text.secondary">Loading animals…</Typography>
      </Box>
    );
  }

  if (animals.length === 0) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <Typography variant="body1" color="text.secondary">No animals found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 1, flexShrink: 0 }}>
        {state.currentIndex + 1} of {animals.length}
      </Typography>
      {/* Portrait card container — baseball card ratio ~5:7, max width 380px */}
      <Box sx={{ width: '100%', maxWidth: 460, flex: 1, minHeight: 0, overflow: 'visible' }}>
        <Swiper
          loop
          modules={[Keyboard, A11y]}
          spaceBetween={-60}
          slidesPerView={1.25}
          centeredSlides
          speed={350}
          keyboard={{ enabled: true }}
          a11y={{ enabled: true }}
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          onSlideChange={handleSlideChange}
          onTouchEnd={handleTouchEnd}
          onProgress={handleProgress}
          onSetTranslate={handleProgress}
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
        >
          {animals.map((animal, index) => (
            <SwiperSlide key={animal.id} style={{ overflow: 'visible' }}>
              <Box sx={{ width: '100%', height: '100%', px: 1, pt: 1, pb: 2 }}>
                <AnimalCard
                  animal={animal}
                  isFocused={state.currentIndex === index}
                  onFocus={() => swiperRef.current?.slideToLoop(index)}
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
}
