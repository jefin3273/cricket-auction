'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/types';
import Image from 'next/image';

interface SpinningWheelProps {
  players: Player[];
  onSpinComplete: (player: Player) => void;
}

export const SpinningWheel: React.FC<SpinningWheelProps> = ({ players, onSpinComplete }) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);

  const spinWheel = () => {
    if (isSpinning || players.length === 0) return;

    setIsSpinning(true);
    const randomPlayer = players[Math.floor(Math.random() * players.length)];
    const extraSpins = 5;
    const segmentAngle = 360 / players.length;
    const playerIndex = players.findIndex(p => p.id === randomPlayer.id);
    const targetRotation = rotation + (360 * extraSpins) + (segmentAngle * playerIndex);

    setRotation(targetRotation);

    setTimeout(() => {
      setIsSpinning(false);
      onSpinComplete(randomPlayer);
    }, 5000);
  };

  const segmentAngle = 360 / players.length;

  return (
    <div className="relative w-[800px] h-[800px] mx-auto">
      {/* Outer glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-accent blur-xl opacity-20" />
      
      {/* Wheel container */}
      <div className="relative w-full h-full bg-[#1a1f35] rounded-full shadow-2xl p-8">
        <motion.div
          ref={wheelRef}
          className="relative w-full h-full rounded-full overflow-hidden"
          animate={{ rotate: rotation }}
          transition={{ 
            duration: 5,
            type: "spring",
            damping: 20,
            ease: "easeOut"
          }}
        >
          {/* Wheel segments */}
          {players.map((player, index) => {
            const angle = (360 / players.length) * index;
            const hue = (360 / players.length) * index;
            
            return (
              <div
                key={player.id}
                className="absolute w-full h-full origin-center wheel-segment"
                style={{
                  transform: `rotate(${angle}deg)`,
                }}
              >
                <div
                  className="absolute w-1/2 h-full right-0 wheel-gradient"
                  style={{
                    opacity: index % 2 ? 0.9 : 0.7,
                  }}
                >
                  <div className="absolute left-0 top-[48%] w-full text-center transform -rotate-90">
                    <span className="text-white text-sm font-medium px-2 py-1 rounded-full bg-black/30 backdrop-blur-sm">
                      {player.name}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Center circle */}
          <div className="absolute inset-[35%] rounded-full bg-[#0c1322] shadow-inner flex items-center justify-center">
            <div className="text-6xl font-bold text-white">{players.length}</div>
          </div>
        </motion.div>

        {/* Pointer */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-16 z-20">
          <div className="w-full h-full bg-white shadow-lg transform rotate-45" />
        </div>

        {/* Spin button */}
        <button
          onClick={spinWheel}
          disabled={isSpinning || players.length === 0}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10
                     bg-gradient-to-r from-primary via-secondary to-accent
                     text-white px-12 py-6 rounded-full font-bold text-2xl
                     hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-200 shadow-lg"
        >
          {isSpinning ? 'SPINNING...' : 'SPIN'}
        </button>
      </div>
    </div>
  );
};