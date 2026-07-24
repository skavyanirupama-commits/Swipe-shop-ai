export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  matchScore: number;
  aiReason: string;
  category: string;
  tags: string[];
  imageUrl: string;
  rating: number;
  reviewsCount: number;
  pastelAccent: 'lavender' | 'pink' | 'mint' | 'sky' | 'peach';
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'CloudRunner Horizon Retro Sneakers',
    brand: 'AURA STUDIO',
    price: 148,
    originalPrice: 195,
    discount: 24,
    matchScore: 98,
    aiReason: 'Matched because you prefer retro silhouettes and soft pastel accent colorways.',
    category: 'Footwear',
    tags: ['Pastel', 'Retro', 'Sustainable', 'Comfort'],
    imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop',
    rating: 4.9,
    reviewsCount: 320,
    pastelAccent: 'lavender',
  },
  {
    id: 'prod-2',
    name: 'Minimalist Noise-Canceling Headphones',
    brand: 'NORDIC AUDIO',
    price: 280,
    originalPrice: 350,
    discount: 20,
    matchScore: 95,
    aiReason: 'High AI aesthetic match based on your recent preference for clean matte electronics.',
    category: 'Tech & Lifestyle',
    tags: ['Minimal', 'Hi-Fi', 'Matte Finish'],
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
    rating: 4.8,
    reviewsCount: 512,
    pastelAccent: 'pink',
  },
  {
    id: 'prod-3',
    name: 'Cozy Oversized Lavender Knit Cardigan',
    brand: 'LOOM & THREAD',
    price: 89,
    originalPrice: 120,
    discount: 25,
    matchScore: 97,
    aiReason: 'Learned from your 5 consecutive likes on oversized pastel knitwear.',
    category: 'Apparel',
    tags: ['Cozy', 'Organic Cotton', 'Pastel'],
    imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1000&auto=format&fit=crop',
    rating: 4.95,
    reviewsCount: 184,
    pastelAccent: 'mint',
  },
  {
    id: 'prod-4',
    name: 'Glassmorphic Smart Ambient Light Bar',
    brand: 'LUMINA DESIGN',
    price: 115,
    originalPrice: 140,
    discount: 18,
    matchScore: 92,
    aiReason: 'Matches your home workspace mood aesthetic.',
    category: 'Home Tech',
    tags: ['Smart Home', 'Ambient RGB', 'Glassware'],
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1000&auto=format&fit=crop',
    rating: 4.7,
    reviewsCount: 94,
    pastelAccent: 'sky',
  },
  {
    id: 'prod-5',
    name: 'Pebble Leather Daily Tote Bag',
    brand: 'MAISON CLAIRE',
    price: 175,
    originalPrice: 220,
    discount: 20,
    matchScore: 94,
    aiReason: 'Predicted high utility + style match based on your saved bags.',
    category: 'Accessories',
    tags: ['Genuine Leather', 'Minimalist', 'Daily Essential'],
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop',
    rating: 4.88,
    reviewsCount: 240,
    pastelAccent: 'peach',
  },
];
