"use client";

import React from "react";
import { motion } from "framer-motion";
import { Player } from "@/types";
import Image from "next/image";
import { IndianRupee } from "lucide-react";

interface PlayerCardProps {
  player: Player;
  amount?: number;
}

// Function to convert Google Drive link to direct URL
const getDirectImageUrl = (url: string) => {
  const match = url.match(/[-\w]{25,}/);
  return match ? `https://drive.google.com/uc?export=view&id=${match[0]}` : url;
};

export const PlayerCard: React.FC<PlayerCardProps> = ({ player, amount }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-card rounded-lg overflow-hidden shadow-lg border border-border"
    >
      <div className="relative h-96 w-full">
        <Image
          src={getDirectImageUrl(player.image)}
          alt={player.name}
          fill
          className="object-contain"
        />
        {amount && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-2">
            <div className="flex items-center justify-center gap-1 text-white">
              <IndianRupee className="w-4 h-4" />
              <span className="font-semibold">
                {(amount / 100000).toFixed(1)}L
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold truncate">{player.name}</h3>
        {player.status === "sold" && (
          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-1">
            Sold
          </span>
        )}
        {player.status === "unsold" && (
          <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mt-1">
            Unsold
          </span>
        )}
      </div>
    </motion.div>
  );
};
