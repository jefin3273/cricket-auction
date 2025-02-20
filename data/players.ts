import { Player, Team } from '@/types';

export const initialPlayers: Player[] = [
  {
    id: '1',
    name: 'Player 1',
    image: 'https://images.unsplash.com/photo-1546525848-3ce03ca516f6?w=800&auto=format&fit=crop',
    basePrice: 100000,
    status: 'available'
  },
  {
    id: '2',
    name: 'Player 2',
    image: 'https://images.unsplash.com/photo-1521575107034-e0fa0b594529?w=800&auto=format&fit=crop',
    basePrice: 150000,
    status: 'available'
  },
  {
    id: '3',
    name: 'Player 3',
    image: 'https://images.unsplash.com/photo-1602810318382-7f67b1dddf47?w=800&auto=format&fit=crop',
    basePrice: 200000,
    status: 'available'
  },
  {
    id: '4',
    name: 'Player 4',
    image: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=800&auto=format&fit=crop',
    basePrice: 120000,
    status: 'available'
  },
  {
    id: '5',
    name: 'Player 5',
    image: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=800&auto=format&fit=crop',
    basePrice: 180000,
    status: 'available'
  }
];

export const teams: Team[] = [
  {
    id: '1',
    name: 'Team Alpha',
    captain: {
      id: '1',
      name: 'Captain 1',
      image: 'https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?w=800&auto=format&fit=crop'
    },
    purse: 10000000, // 1 Crore
    players: []
  },
  {
    id: '2',
    name: 'Team Beta',
    captain: {
      id: '2',
      name: 'Captain 2',
      image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=800&auto=format&fit=crop'
    },
    purse: 10000000, // 1 Crore
    players: []
  },
  {
    id: '3',
    name: 'Team Gamma',
    captain: {
      id: '3',
      name: 'Captain 3',
      image: 'https://images.unsplash.com/photo-1572631382906-180e9d6bad17?w=800&auto=format&fit=crop'
    },
    purse: 10000000, // 1 Crore
    players: []
  },
  {
    id: '4',
    name: 'Team Delta',
    captain: {
      id: '4',
      name: 'Captain 4',
      image: 'https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?w=800&auto=format&fit=crop'
    },
    purse: 10000000, // 1 Crore
    players: []
  }
];
