'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Chip, IconButton, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Animal } from '@/types/animal';
import { useAppContext } from '@/context/AppContext';
import Image from 'next/image';

function habitatTheme(habitat: string): { emoji: string; bg: string; color: string } {
  const h = habitat.toLowerCase();
  if (/ice|arctic|polar|snow|tundra/.test(h))     return { emoji: '❄️', bg: '#dff4ff', color: '#0369a1' };
  if (/ocean|sea|marine|harbour|bay|coral/.test(h)) return { emoji: '🌊', bg: '#cffafe', color: '#0e7490' };
  if (/rainforest|jungle|tropical forest/.test(h)) return { emoji: '🌿', bg: '#dcfce7', color: '#15803d' };
  if (/forest|woodland|eucalyptus/.test(h))        return { emoji: '🌲', bg: '#d1fae5', color: '#065f46' };
  if (/savannah|grassland|scrub|plains|open/.test(h)) return { emoji: '🌾', bg: '#fef9c3', color: '#a16207' };
  if (/desert|arid|sand/.test(h))                  return { emoji: '🏜️', bg: '#fef3c7', color: '#b45309' };
  if (/river|lake|wetland|flood|swamp/.test(h))    return { emoji: '💧', bg: '#e0f2fe', color: '#0369a1' };
  if (/mountain|highland|cliff|rock/.test(h))      return { emoji: '⛰️', bg: '#f1f5f9', color: '#475569' };
  return { emoji: '🌍', bg: '#f3e8ff', color: '#7e22ce' };
}

interface AnimalCardProps {
  animal: Animal;
  onFlip?: (flipped: boolean) => void;
  onFocus?: () => void;
  isFocused?: boolean;
}

export default function AnimalCard({ animal, onFlip, onFocus, isFocused = true }: AnimalCardProps) {
  const [flipped, setFlipped] = useState(false);
  const { state, dispatch } = useAppContext();
  const isFavorite = state.favorites.includes(animal.id);

  // Reset flip when this card loses focus
  useEffect(() => {
    if (!isFocused && flipped) {
      setFlipped(false);
      onFlip?.(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  const handleFlip = () => {
    onFocus?.();          // bring this card to center first
    const next = !flipped;
    setFlipped(next);
    onFlip?.(next);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'TOGGLE_FAVORITE', payload: animal.id });
  };

  const funFacts = animal.funFacts ?? [];
  const description = animal.description ?? '';

  // Conservation status mapping
  const statusMap: Record<string, { code: string; color: string; text: string }> = {
    'extinct': { code: 'EX', color: '#222', text: 'Extinct' },
    'extinct in the wild': { code: 'EW', color: '#222', text: 'Extinct in Wild' },
    'critically endangered': { code: 'CR', color: '#d32f2f', text: 'Critically Endangered' },
    'endangered': { code: 'EN', color: '#f57c00', text: 'Endangered' },
    'vulnerable': { code: 'VU', color: '#fbc02d', text: 'Vulnerable' },
    'near threatened': { code: 'NT', color: '#00897b', text: 'Near Threatened' },
    'conservation dependent': { code: 'CD', color: '#1976d2', text: 'Conservation Dep.' },
    'least concern': { code: 'LC', color: '#00796b', text: 'Least Concern' },
    'data deficient': { code: 'DD', color: '#757575', text: 'Data Deficient' },
    'not evaluated': { code: 'NE', color: '#bdbdbd', text: 'Not Evaluated' },
    'unknown': { code: '?', color: '#e0e0e0', text: 'Unknown' },
  };
  const statusKey = (animal.conservationStatus || '').toLowerCase().replace(/_/g, ' ');
  const status = statusMap[statusKey] || statusMap['unknown'];
  const theme = habitatTheme(animal.habitat);

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
          {/* Lower half: emoji left, name center, status right */}
          <Box sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            p: 2, bgcolor: theme.bg, minHeight: 72,
          }}>
            {/* Emoji left with tooltip */}
            <Tooltip title={animal.habitat ? `${theme.emoji} ${animal.habitat}` : 'Unknown habitat'} placement="top" arrow>
              <Box sx={{ flex: '0 0 48px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 48 }}>
                <Typography sx={{ fontSize: '2rem', lineHeight: 1 }}>{theme.emoji}</Typography>
              </Box>
            </Tooltip>
            {/* Name and binomial center */}
            <Box sx={{ flex: 1, textAlign: 'center', px: 1 }}>
              <Typography variant="h2" color="text.primary" sx={{ fontSize: '1.25rem', fontWeight: 700 }}>{animal.name}</Typography>
              {animal.binomialName ? (
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', fontSize: '1rem' }}>
                  {animal.binomialName}
                </Typography>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>Tap to learn more!</Typography>
              )}
            </Box>
            {/* Conservation status right with tooltip */}
            <Tooltip title={status.text} placement="top" arrow>
              <Box sx={{ flex: '0 0 48px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 48 }}>
                <Box sx={{
                  width: 40, height: 40, borderRadius: '50%',
                  bgcolor: status.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', textShadow: '0 1px 2px #0002' }}>{status.code}</Typography>
                </Box>
              </Box>
            </Tooltip>
          </Box>
        </Box>

        {/* Heart — inset 20px to clear rounded corners, hidden on back face */}
        <IconButton
          onClick={handleFavorite}
          aria-label={isFavorite ? `Remove ${animal.name} from favorites` : `Add ${animal.name} to favorites`}
          sx={{
            position: 'absolute', top: 20, right: 20, zIndex: 2,
            backfaceVisibility: 'hidden',
            bgcolor: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(4px)',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.95)' },
            minWidth: 48, minHeight: 48,
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
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 1 }}>
            {/* Habitat badge */}
            {animal.habitat && (() => {
              const theme = habitatTheme(animal.habitat);
              return (
                <Chip
                  label={`${theme.emoji} ${animal.habitat.charAt(0).toUpperCase() + animal.habitat.slice(1)}`}
                  size="small"
                  sx={{
                    alignSelf: 'center',
                    bgcolor: theme.bg,
                    color: theme.color,
                    fontWeight: 600,
                    border: `1px solid ${theme.color}33`,
                  }}
                />
              );
            })()}
            {/* Conservation status badge */}
              {status && (
                <Chip
                  label={status.text}
                  size="small"
                  sx={{
                    alignSelf: 'center',
                    bgcolor: status.color,
                    color: '#fff',
                    fontWeight: 600,
                    border: `1px solid #0001`,
                    textTransform: 'capitalize',
                    fontSize: '0.8125rem', // match MUI Chip default for small
                    letterSpacing: 0.1,
                  }}
                />
            )}
          </Box>
          <Typography variant="body1" color="text.primary">
            {(() => {
              const maxLen = 300;
              if (description.length <= maxLen) return description;
              const truncated = description.slice(0, maxLen);
              const lastPeriod = truncated.lastIndexOf('.') + 1;
              if (lastPeriod > 0) {
                return truncated.slice(0, lastPeriod).trim();
              } else {
                return truncated.trim();
              }
            })()}
          </Typography>
          {funFacts.length > 0 && (
            <Box>
              <Typography variant="h3" color="text.primary" sx={{ mb: 1 }}>Fun Facts 🌟</Typography>
              {funFacts.map((fact, i) => (
                <Typography key={i} variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>• {fact}</Typography>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

