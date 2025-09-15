import { useState } from "react";
import PlayerCard from "../components/PlayerCard";
import { getPlayers } from "../libs/apis/legendApi";
import { useQuery } from "@tanstack/react-query";

export default function Legends() {
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const {isLoading, error, data: players} = useQuery({
    queryKey: ['players'],
    queryFn: getPlayers,
  });

  if (isLoading) return <div className="text-center text-white mt-20">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-20">Error loading players</div>;

  // const togglePlayer = (player) => {
  //   if (selectedPlayers.find((p) => p.id === player.id)) {
  //     setSelectedPlayers(selectedPlayers.filter((p) => p.id !== player.id));
  //   } else {
  //     setSelectedPlayers([...selectedPlayers, player]);
  //   }
  // };

  // Group players by position
  const grouped = players?.reduce((acc, player) => {
    if (!acc[player.position]) acc[player.position] = [];
    acc[player.position].push(player);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <h1 className="text-4xl font-heading text-red-600 text-center mb-12">
        Manchester United Legends
      </h1>

      {Object.entries(grouped).map(([position, players]) => (
        <div key={position} className="mb-16">
          <h2 className="text-2xl font-heading text-red-500 mb-6">
            {position}s
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {players.map((player) => (
              <PlayerCard
                key={player._id}
                player={player}
                // isSelected={!!selectedPlayers.find((p) => p.id === player.id)}
                // onToggle={togglePlayer}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
