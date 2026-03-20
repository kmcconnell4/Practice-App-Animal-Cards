'use client';

import { useState } from 'react';
import { Box, Typography, Chip, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Animal } from '@/types/animal';
import { useAppContext } from '@/context/AppContext';
import Image from 'next/image';

interface AnimalCardProps {
  animal: Animal;
  onFlip?: (flipped: boolean) => void;
}

export default function AnimalCard({ animal, onFlip }: AnimalCardProps) {
  const [flipped, setFlipped] = useState(false);
  const { state, dispatch } = useAppContext();
  const isFavorite = state.favorites.includes(animal.id);

  const handleFlip = () => {
    const next = !flipped;
    setFlipped(next);
    onFlip?.(next);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent card flip
    dispatch({ type: 'TOGGLE_FAVORITE', payload: animal.id });
  };

  const funFacts = animal.funFacts ?? [];
  const description = animal.description ?? '';

  return (
    <Box
      onClick={handleFlip}
      role="button"
      tabIndex={0}
      aria-label={`${animal.name} card. Click to ${flipped ? 'see image' : 'learn more'}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleFlip(); }}
      sx={{
        width: '100%', height: '100%', perspective: '1000px', cursor: 'pointer', outline: 'none',
        '&:focus-visible': { outline: '3px solid', outlineColor: 'primary.main', borderRadius: 3 },
      }}
    >
      <Box sx={{
        position: 'relative', width: '100%', height: '100%',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.5s ease',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}>
        {/* FRONT */}
        <Box sx={{
          position: 'absolute', width: '100%', height: '100%',
          backfaceVisibility: 'hidden', borderRadius: 4, overflow: 'hidden',
          bgcolor: 'background.paper', boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
          display: 'flex', flexDirection: 'column',
        }}>
          <Box sx={{ position: 'relative', width: '100%', flex: 1, minHeight: 0 }}>
            {animal.imageUrl ? (
              <Image src={animal.imageUrl} alt={animal.name} fill style={{ objectFit: 'cover' }} sizes="(max-width: 600px) 100vw, 500px" priority />
            ) : (
              <Box sx={{ width: '100%', height: '100%', bgcolor: 'secondary.light', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography sx={{ fontSize: '5rem' }}>🐾</Typography>
              </Box>
            )}
          </Box>
          <Box sx={{ p: 2, bgcolor: 'background.paper', textAlign: 'center' }}>
            <Typography variant="h2" color="text.primary">{animal.name}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>Tap to learn more!</Typography>
          </Box>
        </Box>

        {/* Heart button — inside flip container but outside overflow:hidden front face.
            backfaceVisibility:hidden makes it disappear automatically when flipped.
            Inset 20px from corner to clear the 16px border radius. */}
        <IconButton
          onClick={handleFavorite}
          aria-label={isFavorite ? `Remove ${animal.name} from favorites` : `Add ${animal.name} to favorites`}
          sx={{
            position: 'absolute',
            top: 20,
            right: 20,
            zIndex: 2,
            backfaceVisibility: 'hidden',
            bgcolor: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(4px)',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.95)' },
            minWidth: 48,
            minHeight: 48,
          }}
        >
          {isFavorite
            ? <FavoriteIcon sx={{ color: 'error.main', fontSize: 28 }} />
            : <FavoriteBorderIcon sx={{ color: 'text.secondary', fontSize: 28 }} />}
        </IconButton>

        {/* BACK */}
        <Box sx={{
          position: 'absolute', width: '100%', height: '100%',
          backfaceVisibility: 'hidden', transform: 'rotateY(180deg)',
          borderRadius: 4, overflow: 'auto', bgcolor: 'background.paper',
          boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
          display: 'flex', flexDirection: 'column', p: 3, gap: 2,
        }}>
          <Typography variant="h2" color="primary.main" textAlign="center">{animal.name}</Typography>
          {animal.habitat && (
            <Chip label={`🌍 ${animal.habitat}`} color="secondary" size="small" sx={{ alignSelf: 'center' }} />
          )}
          <Typography variant="body1" color="text.primary">
            {description.slice(0, 300)}{description.length > 300 ? '…' : ''}
          </Typography>
          {funFacts.length > 0 && (
            <Box>
              <Typography variant="h3" color="text.primary" sx={{ mb: 1 }}>Fun Facts 🌟</Typography>
              {funFacts.map((fact, i) => (
                <Typography key={i} variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>• {fact}</Typography>
              ))}
            </Box>
          )}
          <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 'auto' }}>Tap to go back</Typography>
        </Box>
      </Box>
    </Box>
  );
}
