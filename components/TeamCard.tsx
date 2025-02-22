"use client";

import React from "react";
import { motion } from "framer-motion";
import { Team } from "@/types";
import { PlayerCard } from "./PlayerCard";
import { Users, Wallet } from "lucide-react";
import Image from "next/image";

interface TeamCardProps {
  team: Team;
}

export const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-card rounded-xl p-6 shadow-lg border border-border"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-xl font-bold">{team.name}</h2>
          </div>
          <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full">
            <Wallet className="w-4 h-4 text-primary" />
            <span className="font-semibold text-sm">
              ₹{(team.purse / 100000).toFixed(1)}L
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-40 h-40 rounded-full overflow-hidden">
            <Image
              src={team.captain.image}
              alt={team.captain.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Captain</p>
            <p className="font-medium">{team.captain.name}</p>
          </div>
        </div>

        {team.players.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 mt-4">
            {team.players.map((player) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <PlayerCard player={player} amount={player.soldAmount} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No players acquired yet
          </div>
        )}
      </div>
    </motion.div>
  );
};
