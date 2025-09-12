import { useState } from "react";
import PlayerCard from "../components/PlayerCard";

// Sample data (later replace with API call)
const players = [
  {
    id: 1,
    name: "Ryan Giggs",
    nationality: "Wales",
    position: "Midfielder",
    goals: 114,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/2/23/Ryan_Giggs_2011.jpg",
  },
  {
    id: 2,
    name: "Paul Scholes",
    nationality: "England",
    position: "Midfielder",
    goals: 155,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/7/74/Paul_Scholes.jpg",
  },
  {
    id: 3,
    name: "Eric Cantona",
    nationality: "France",
    position: "Forward",
    goals: 82,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/2/24/Eric_Cantona.jpg",
  },
];

export default function Legends() {
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const togglePlayer = (player) => {
    if (selectedPlayers.find((p) => p.id === player.id)) {
      setSelectedPlayers(selectedPlayers.filter((p) => p.id !== player.id));
    } else {
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };

  // Group players by position
  const grouped = players.reduce((acc, player) => {
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
                key={player.id}
                player={player}
                isSelected={!!selectedPlayers.find((p) => p.id === player.id)}
                onToggle={togglePlayer}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
