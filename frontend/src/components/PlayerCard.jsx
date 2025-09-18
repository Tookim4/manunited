import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addToTeam, removeFromTeam} from "../libs/apis/teamApi";
import  usePlayers  from "../libs/usePlayers";
import {useAuth} from "../libs/useAuth"

export default function PlayerCard({ player, isSelected}) {
  const {delete_legend_mutation} = usePlayers();
  const { data: authData} = useAuth();
  const isAdmin = authData?.user?.username === 'admin';
  const queryClient = useQueryClient();

  const addmutation = useMutation({
    mutationFn: addToTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team'] });
    },
  });

  const removemutation = useMutation({
    mutationFn: removeFromTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team'] });
    },
  });

  const handleClick = () => {
    if (isSelected) {
      removemutation.mutate(player._id);
    } else {
      addmutation.mutate(player._id);
    }
  };

  const handleDelete = () => {
    if(window.confirm(`Are you sure`)) {
      delete_legend_mutation.mutate(player._id);
    }
  }

  const isLoading = addmutation.isLoading || removemutation.isLoading;

 

  return (
    <div className="bg-gray-900 text-white rounded-2xl overflow-hidden shadow-lg hover:shadow-red-600/40 transition duration-300">
      {/* Player Image */}
      <img
        src={player.image}
        alt={player.name}
        className="w-full h-48 object-cover"
      />

      {/* Player Info */}
      <div className="p-4 space-y-2">
        <h3 className="text-xl font-heading text-red-500">{player.name}</h3>
        <p className="text-sm text-gray-400">🇳🇴 {player.nationality}</p>
        <p className="text-sm">
          <span className="font-medium">Position:</span> {player.position}
        </p>
        <p className="text-sm">
          <span className="font-medium">Total Goals:</span> {player.goals}
        </p>

        {/* Select / Remove Button */}
        <button
          onClick={handleClick}
          disabled={isLoading}
          className={`w-full mt-3 py-2 rounded-lg font-medium transition ${
            isSelected
              ? "bg-gray-600 hover:bg-gray-700"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {isLoading
            ? "Adding..."
            : isSelected
            ? "Added to Team"
            : "Add to Team"}
        </button>
        <div>
{isAdmin && (
          <button
          onClick={handleDelete}
          disabled={delete_legend_mutation.isLoading}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 mt-3 rounded text-white w-full">
            Delete
          </button>
        )}
        </div>

        
      </div>
    </div>
  );
}
