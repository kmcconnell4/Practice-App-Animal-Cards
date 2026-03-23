'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, Button, ButtonGroup } from '@mui/material';
import Carousel from '@/components/Carousel/Carousel';
import { Animal } from '@/types/animal';

export default function Home() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  // Placeholder handlers for sort/shuffle actions
  const handleSortHabitat = () => {
    setAnimals((prev) => {
      // Group animals by habitat (alphabetically, unknowns last)
      return [...prev].sort((a, b) => {
        const ha = a.habitat?.toLowerCase() || 'zzz';
        const hb = b.habitat?.toLowerCase() || 'zzz';
        if (ha < hb) return -1;
        if (ha > hb) return 1;
        return a.name.localeCompare(b.name);
      });
    });
  };
  const handleSortConservation = () => {
    // Define a custom order for conservation statuses
    const statusOrder = [
      'Least Concern',
      'Near Threatened',
      'Vulnerable',
      'Endangered',
      'Critically Endangered',
      'Extinct in the Wild',
      'Extinct',
      'Unknown',
    ];
    const getStatusRank = (status: string) => {
      const idx = statusOrder.findIndex(
        (s) => s.toLowerCase() === (status?.toLowerCase() || '')
      );
      return idx === -1 ? statusOrder.length : idx;
    };
    setAnimals((prev) => {
      return [...prev].sort((a, b) => {
        const ra = getStatusRank(a.conservationStatus);
        const rb = getStatusRank(b.conservationStatus);
        if (ra !== rb) return ra - rb;
        return a.name.localeCompare(b.name);
      });
    });
  };
  const handleShuffle = () => {
    // Fisher-Yates shuffle
    setAnimals((prev) => {
      const arr = [...prev];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    });
  };

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
      {/* Sort/Shuffle Controls */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <ButtonGroup variant="outlined" aria-label="Sort and shuffle controls">
          <Button onClick={handleSortHabitat} aria-label="Sort by habitat">Sort by Habitat</Button>
          <Button onClick={handleSortConservation} aria-label="Sort by conservation status">Sort by Conservation</Button>
          <Button onClick={handleShuffle} aria-label="Shuffle cards">Shuffle</Button>
        </ButtonGroup>
      </Box>
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