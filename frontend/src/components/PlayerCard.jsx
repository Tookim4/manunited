import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToTeam, removeFromTeam } from "../libs/apis/teamApi";
import usePlayers from "../libs/usePlayers";
import { useAuth } from "../libs/useAuth";

export default function PlayerCard({ player, isSelected }) {
  const { delete_legend_mutation } = usePlayers();
  const { data: authData } = useAuth();
  const isAdmin = authData?.user?.username === "admin";
  const queryClient = useQueryClient();

  const addmutation = useMutation({
    mutationFn: addToTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team"] });
    },
  });

  const removemutation = useMutation({
    mutationFn: removeFromTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team"] });
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
    if (window.confirm(`Are you sure?`)) {
      delete_legend_mutation.mutate(player._id);
    }
  };

  const isLoading = addmutation.isLoading || removemutation.isLoading;

  return (
    <div className="bg-black text-white overflow-hidden transition-all duration-300 border-2 border-[#2A2A2A] hover:border-[#E43636] hover:-translate-y-1">
      {/* Player Image */}
      <div className="relative group">
        <img
          src={player.image}
          alt={player.name}
          className="w-full h-52 object-cover object-center transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.src = "/placeholder-player.png";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
        <div className="absolute top-3 right-3 bg-[#E43636] text-white px-2 py-1 text-xs font-bold uppercase tracking-wide">
          Legend
        </div>
      </div>

      {/* Player Info */}
      <div className="p-5 space-y-4 bg-[#1A1A1A]">
        <div>
          <h3 className="text-xl font-bold text-[#E43636] uppercase tracking-wider mb-1">
            {player.name}
          </h3>
          <p className="text-sm text-[#F6EFD2] font-medium uppercase tracking-wide">
            {player.nationality}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center py-2 border-b border-[#2A2A2A]">
            <span className="text-xs text-[#E2DDB4] font-semibold uppercase">
              Position
            </span>
            <span className="text-sm text-white font-medium">
              {player.position}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-[#2A2A2A]">
            <span className="text-xs text-[#E2DDB4] font-semibold uppercase">
              Goals
            </span>
            <span className="text-sm text-white font-medium">
              {player.goals}
            </span>
          </div>
           <div className="flex justify-between items-center py-2 border-b border-[#2A2A2A]">
            <span className="text-xs text-[#E2DDB4] font-semibold uppercase">
              Appearances
            </span>
            <span className="text-sm text-white font-medium">
              {player.appearances}
            </span>
          </div>
        </div>

        {/* Select / Remove Button */}
        <button
          onClick={handleClick}
          disabled={isLoading}
          className={`w-full py-3 font-bold text-sm uppercase tracking-wide rounded-lg transition-all duration-300 ${
            isSelected
              ? "bg-[#2A2A2A] text-[#E2DDB4] border-2 border-[#2A2A2A] hover:bg-[#3A3A3A] hover:border-[#E2DDB4] hover:text-white"
              : "bg-[#E43636] text-white border-2 border-[#E43636] hover:bg-[#C53030] hover:border-[#C53030]"
          } ${isLoading ? "opacity-70 cursor-not-allowed animate-pulse" : ""}`}
        >
          {isLoading
            ? "Processing..."
            : isSelected
            ? "✓ In Team"
            : "+ Add to Team"}
        </button>

        {/* Admin Delete Button */}
        {isAdmin && (
          <button
            onClick={handleDelete}
            disabled={delete_legend_mutation.isLoading}
            className={`w-full bg-transparent text-[#E43636] border-2 border-[#E43636] py-2 mt-2 font-bold uppercase tracking-wide rounded-lg transition-all duration-300 ${
              delete_legend_mutation.isLoading
                ? "opacity-70 cursor-not-allowed animate-pulse"
                : "hover:bg-[#E43636] hover:text-white"
            }`}
          >
            {delete_legend_mutation.isLoading ? "Deleting..." : "Delete Player"}
          </button>
        )}
      </div>
    </div>
  );
}
