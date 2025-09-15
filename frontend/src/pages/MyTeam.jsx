import {useQuery} from '@tanstack/react-query'
import {getTeam} from '../libs/apis/teamApi'    

const MyTeam = () => {
    const {isLoading, isError, data} = useQuery({
        queryKey: ['myTeam'],
        queryFn: getTeam,
        retry: false,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading team data.</div>;
    }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Team</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map((player) => (
          <div key={player._id} className="bg-black text-white p-4 rounded-xl shadow-lg">
            <img
              src={player.image || "/default-player.jpg"}
              alt={player.name}
              className="rounded-lg mb-2"
            />
            <h2 className="text-lg font-bold text-red-500">{player.name}</h2>
            <p>{player.position}</p>
            <p>{player.nationality}</p>
            <p>Goals: {player.totalGoals}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyTeam