export default function PlayerCard({ player, isSelected, onToggle }) {
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
          onClick={() => onToggle(player)}
          className={`w-full mt-3 py-2 rounded-lg font-medium transition ${
            isSelected
              ? "bg-red-700 hover:bg-red-800"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {isSelected ? "Remove" : "Select"}
        </button>
      </div>
    </div>
  );
}
