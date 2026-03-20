'use client';

import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Carousel from '@/components/Carousel/Carousel';
import { Animal } from '@/types/animal';

export default function Home() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnimals() {
      try {
        const listRes = await fetch('/api/animals');
        const { animals: names } = await listRes.json();
        const first10 = names.slice(0, 10);
        const results = await Promise.allSettled(
          first10.map((name: string) =>
            fetch(`/api/animals?name=${encodeURIComponent(name)}`).then((r) => r.json())
          )
        );
        const loaded: Animal[] = results
          .filter(
            (r): r is PromiseFulfilledResult<{ animal: Animal }> =>
              r.status === 'fulfilled' && r.value?.animal != null
          )
          .map((r) => r.value.animal);
        setAnimals(loaded);
      } catch (err) {
        console.error('Failed to load animals:', err);
      } finally {
        setLoading(false);
      }
    }
    loadAnimals();
  }, []);

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
        overflow: 'hidden',
        p: 2,
        pb: 3,
      }}
    >
      <Typography
        variant="h1"
        textAlign="center"
        color="primary.main"
        sx={{ fontSize: '1.5rem', mb: 1, fontWeight: 800 }}
      >
        🐾 Animal Cards
      </Typography>
      <Box sx={{
        flex: 1,
        minHeight: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}>
        {/* Portrait aspect ratio wrapper — baseball card ~5:7 */}
        <Box sx={{
          width: '100%',
          maxWidth: 420,
          aspectRatio: '5 / 7',
          maxHeight: '100%',
        }}>
          <Carousel animals={animals} loading={loading} />
        </Box>
      </Box>
    </Box>
  );
}