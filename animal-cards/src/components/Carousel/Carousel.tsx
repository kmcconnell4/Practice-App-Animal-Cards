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

export default function Carousel({ animals, loading }: CarouselProps) {
  const { state, dispatch } = useAppContext();
  const swiperRef = useRef<SwiperType | null>(null);

  const handleSlideChange = useCallback(
    (swiper: SwiperType) => { dispatch({ type: 'SET_INDEX', payload: swiper.activeIndex }); },
    [dispatch]
  );

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.activeIndex !== state.currentIndex) {
      swiperRef.current.slideTo(state.currentIndex);
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
      <Box sx={{ width: '100%', maxWidth: 380, flex: 1, minHeight: 0, overflow: 'visible' }}>
        <Swiper
          modules={[Keyboard, A11y]}
          spaceBetween={16}
          slidesPerView={1.08}
          centeredSlides
          keyboard={{ enabled: true }}
          a11y={{ enabled: true }}
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          onSlideChange={handleSlideChange}
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
        >
          {animals.map((animal) => (
            <SwiperSlide key={animal.id} style={{ overflow: 'visible' }}>
              <Box sx={{ width: '100%', height: '100%', px: 1, pt: 1, pb: 2 }}>
                <AnimalCard animal={animal} />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
}
