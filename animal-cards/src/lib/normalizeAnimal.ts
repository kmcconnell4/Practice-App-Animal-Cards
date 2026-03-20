import { Animal } from '@/types/animal';

interface ApiNinjasAnimal {
  name: string;
  taxonomy?: { scientific_name?: string; [key: string]: unknown };
  characteristics?: { habitat?: string; [key: string]: unknown };
  locations?: string[];
  [key: string]: unknown;
}

interface Override {
  funFacts: string[];
  conservationStatus: string;
}

const overrides: Record<string, Override> = {
  lion: { funFacts: ["Lions live in groups called prides!", "A lion's roar can be heard 8km away.", "Lion cubs are born with spots."], conservationStatus: "Vulnerable" },
  'african bush elephant': { funFacts: ["Elephants are the largest land animals!", "Elephants can recognize themselves in mirrors.", "Baby elephants can stand within 20 minutes of birth."], conservationStatus: "Endangered" },
  'giraffe': { funFacts: ["Giraffes are the tallest animals in the world!", "A giraffe's tongue is 45cm long!", "Giraffes only need 5-30 minutes of sleep per day."], conservationStatus: "Vulnerable" },
  'emperor penguin': { funFacts: ["Penguins are birds that cannot fly!", "Emperor penguins dive deeper than any other bird.", "Penguins huddle together to stay warm."], conservationStatus: "Least Concern" },
  'bottlenose dolphin': { funFacts: ["Dolphins sleep with one eye open!", "Dolphins call each other by name using whistles.", "A group of dolphins is called a pod."], conservationStatus: "Least Concern" },
  'western gorilla': { funFacts: ["Gorillas can learn sign language!", "Gorillas build a new nest every night.", "Gorilla DNA is 98% the same as humans."], conservationStatus: "Critically Endangered" },
  cheetah: { funFacts: ["Cheetahs can run 112 km/h!", "Cheetahs purr like house cats.", "A cheetah's spots help it hide in tall grass."], conservationStatus: "Vulnerable" },

  tiger: { funFacts: ["No two tigers have the same stripe pattern!", "Tigers are excellent swimmers.", "A tiger's roar can be heard 3km away."], conservationStatus: "Endangered" },
  koala: { funFacts: ["Koalas sleep up to 22 hours a day!", "Koalas have fingerprints almost identical to humans.", "Baby koalas are called joeys."], conservationStatus: "Vulnerable" },
};

export function normalizeAnimal(
  raw: ApiNinjasAnimal,
  description: string,
  imageUrl: string,
  wikipediaUrl: string,
  binomialName?: string
): Animal {
  const key = raw.name?.toLowerCase() ?? '';
  const override = overrides[key] ?? {};
  return {
    id: key.replace(/\s+/g, '-'),
    name: raw.name ?? 'Unknown',
    binomialName: binomialName || raw.taxonomy?.scientific_name || '',
    habitat: raw.characteristics?.habitat ?? '',
    range: Array.isArray(raw.locations) ? raw.locations.join(', ') : '',
    description: description || 'No description available.',
    imageUrl: imageUrl || '',
    funFacts: override.funFacts ?? [],
    conservationStatus: override.conservationStatus ?? 'Unknown',
    wikipediaUrl,
  };
}
