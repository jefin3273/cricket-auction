"use client";

import { useState } from "react";
import { SpinningWheel } from "@/components/SpinningWheel";
import { TeamCard } from "@/components/TeamCard";
import { PlayerCard } from "@/components/PlayerCard";
import { initialPlayers, teams as initialTeams } from "@/data/players";
import { Player, Team } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { IndianRupee } from "lucide-react";

export default function Home() {
  const [players, setPlayers] = useState(initialPlayers);
  const [teams, setTeams] = useState(initialTeams);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [unsoldPlayers, setUnsoldPlayers] = useState<Player[]>([]);

  const handleSpinComplete = (player: Player) => {
    setSelectedPlayer(player);
  };

  const handlePlayerSold = (teamId: string, amount: number) => {
    if (!selectedPlayer) return;

    setTeams(
      teams.map((team) => {
        if (team.id === teamId) {
          return {
            ...team,
            purse: team.purse - amount,
            players: [
              ...team.players,
              {
                ...selectedPlayer,
                soldTo: teamId,
                soldAmount: amount,
                status: "sold",
              },
            ],
          };
        }
        return team;
      })
    );

    setPlayers(players.filter((p) => p.id !== selectedPlayer.id));
    setSelectedPlayer(null);
  };

  const handlePlayerUnsold = () => {
    if (!selectedPlayer) return;

    setUnsoldPlayers([
      ...unsoldPlayers,
      { ...selectedPlayer, status: "unsold" },
    ]);
    setPlayers(players.filter((p) => p.id !== selectedPlayer.id));
    setSelectedPlayer(null);
  };

  const addUnsoldPlayerBack = (player: Player) => {
    setPlayers([...players, { ...player, status: "available" }]);
    setUnsoldPlayers(unsoldPlayers.filter((p) => p.id !== player.id));
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-[1800px] mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent text-transparent bg-clip-text">
            RCT Auction 2025
          </h1>
          <p className="text-muted-foreground">
            {players.length} Players Available • {teams.length} Teams • Total
            Purse: ₹{teams.reduce((acc, team) => acc + team.purse, 0) / 100000}L
          </p>
        </motion.div>

        <div className="grid grid-cols-12 gap-8">
          {/* Left sidebar - Teams */}
          <div className="col-span-3 space-y-6">
            {teams.slice(0, 4).map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>

          {/* Center - Wheel and selected player */}
          <div className="col-span-6 space-y-8">
            <SpinningWheel
              players={players}
              onSpinComplete={handleSpinComplete}
            />

            <AnimatePresence mode="wait">
              {selectedPlayer && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="bg-card rounded-xl shadow-lg p-8 border border-border/50">
                    <h2 className="text-2xl font-bold mb-6">Selected Player</h2>
                    <div className="grid grid-cols-2 gap-8">
                      <PlayerCard player={selectedPlayer} />

                      <div className="space-y-6">
                        <div className="space-y-4">
                          <label className="block text-sm font-medium text-muted-foreground">
                            Select Team
                          </label>
                          <select
                            className="w-full px-4 py-3 rounded-lg border border-border bg-card/50 focus:ring-2 focus:ring-primary/20"
                            onChange={(e) => {
                              const amount = prompt("Enter amount in lakhs:");
                              if (amount) {
                                handlePlayerSold(
                                  e.target.value,
                                  parseFloat(amount) * 100000
                                );
                              }
                            }}
                          >
                            <option value="">Choose a team</option>
                            {teams.map((team) => (
                              <option key={team.id} value={team.id}>
                                {team.name} (₹{(team.purse / 100000).toFixed(1)}
                                L)
                              </option>
                            ))}
                          </select>

                          <button
                            onClick={handlePlayerUnsold}
                            className="w-full px-4 py-3 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
                          >
                            Mark as Unsold
                          </button>
                        </div>

                        <div className="p-4 bg-muted rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            Base Price: ₹
                            {(selectedPlayer.basePrice / 100000).toFixed(1)}L
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Unsold players */}
            {unsoldPlayers.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="bg-card rounded-xl shadow-lg p-8 border border-border/50">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold">Unsold Players</h3>
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">
                      {unsoldPlayers.length} Players
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    {unsoldPlayers.map((player) => (
                      <div key={player.id} className="relative">
                        <PlayerCard player={player} />
                        <button
                          onClick={() => addUnsoldPlayerBack(player)}
                          className="absolute top-2 right-2 bg-primary text-primary-foreground p-2 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
                        >
                          Add Back
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right sidebar - Teams */}
          <div className="col-span-3 space-y-6">
            {teams.slice(4).map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
