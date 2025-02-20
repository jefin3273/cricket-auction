export interface Player {
  id: string;
  name: string;
  image: string;
  basePrice: number;
  status: 'available' | 'sold' | 'unsold';
  soldTo?: string;
  soldAmount?: number;
}

export interface Captain {
  id: string;
  name: string;
  image: string;
}

export interface Team {
  id: string;
  name: string;
  captain: Captain;
  purse: number;
  players: Player[];
}

export interface WheelSegment {
  id: string;
  name: string;
  image: string;
}