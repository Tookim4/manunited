import {  useMemo } from "react";
import PlayerCard from "../components/PlayerCard";
import  usePlayers  from "../libs/usePlayers";
import { useTeam } from "../libs/useTeam";
import PlayerForm from "../components/PlayerForm";
import { useAuth } from "../libs/useAuth";

export default function Legends() {
  const {get_legends_query, create_legend_mutation} = usePlayers();
  const { data: players, isLoading, error } = get_legends_query;
  const { data: authData} = useAuth();
  const isAdmin = authData?.user?.username === 'admin';
  const {data: team} = useTeam();
  

  // Group players by position
  const grouped = useMemo(() => {
    if (!players || !Array.isArray(players)) return {};
    return players.reduce((acc, player) => {
      const pos = player.position || 'Unknown';
      if (!acc[pos]) acc[pos] = [];
      acc[pos].push(player);
      return acc;
    }, {});
  }, [players]);

  if (isLoading) return <div className="text-center text-white mt-20">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-20">Error loading players</div>;


  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <h1 className="text-4xl font-heading text-red-600 text-center mb-12">
        Manchester United Legends
      </h1>

      {isAdmin && (
        <PlayerForm onSubmit={(data) => create_legend_mutation.mutate(data)} />
      )}

      {Object.entries(grouped).map(([position, players]) => (
        <div key={position} className="mb-16">
          <h2 className="text-2xl font-heading text-red-500 mb-6">
            {position}
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {players.map((player, idx) => {
              const id = player._id ?? player.id ?? `${position}-${idx}`;
              const isSelected = team?.some((member)=> member._id === player._id);
              return (
                <PlayerCard
                  key={id}
                  player={player}
                  isSelected={isSelected}
                />
              );
          })}
          </div>
        </div>
      ))}
    </div>
  );
}
