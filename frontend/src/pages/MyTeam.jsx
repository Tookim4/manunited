import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTeam, removeFromTeam } from '../libs/apis/teamApi';

const MyTeam = () => {
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const queryClient = useQueryClient();

    const { isLoading, isError, data } = useQuery({
        queryKey: ['myTeam'],
        queryFn: getTeam,
        retry: false,
    });

    const removeMutation = useMutation({
        mutationFn: removeFromTeam,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['team'] });
            queryClient.invalidateQueries({ queryKey: ['myTeam'] });
        },
    });

    const handleCardClick = (player) => {
        setSelectedPlayer(player);
    };

    const closeModal = () => {
        setSelectedPlayer(null);
    };

    const handleRemove = (playerId) => {
        if (window.confirm('Remove this player from your team?')) {
            removeMutation.mutate(playerId);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-[#E43636] text-xl font-bold uppercase tracking-wider">Loading Your Team...</div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="text-[#E43636] text-xl font-bold uppercase tracking-wider mb-4">Error Loading Team</div>
                    <div className="text-[#F6EFD2]">Unable to load your team data. Please try again.</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            {/* Header */}
            <div className="bg-black border-b-2 border-[#2A2A2A] py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-wider">
                            My Team
                        </h1>
                        <div className="mt-6">
                            <div className="inline-block bg-[#E43636] text-white px-4 py-2 font-bold uppercase tracking-wider text-sm">
                                {data?.length || 0} Players Selected
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Team Grid */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                {data && data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {data.map((player) => (
                            <div key={player._id} className="group">
                                {/* Player Card */}
                                <div
                                    className="bg-black border-2 border-[#2A2A2A] hover:border-[#E43636] transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-3 hover:shadow-2xl hover:shadow-[#E43636]/20 group"
                                    onClick={() => handleCardClick(player)}
                                >
                                    {/* Player Image - Enhanced */}
                                    <div className="relative h-72 overflow-hidden">
                                        <img
                                            src={player.image || "/default-player.jpg"}
                                            alt={player.name}
                                            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                                            onError={(e) => {
                                                e.target.src = '/placeholder-player.png';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                                        {/* Decorative Elements */}
                                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#E43636]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                        {/* Player Info Overlay */}
                                        <div className="absolute bottom-0 left-0 right-0 p-5">
                                            <div className="bg-black/80 backdrop-blur-md p-4 rounded-lg border border-white/10">
                                                <h3 className="text-white font-black text-2xl uppercase tracking-wider mb-2">{player.name}</h3>
                                                <p className="text-[#F6EFD2] text-base uppercase tracking-wide font-bold mb-1">{player.position}</p>
                                                <p className="text-[#E2DDB4] text-sm uppercase tracking-wide">{player.nationality}</p>
                                            </div>
                                        </div>

                                        {/* Legend Badge */}
                                        <div className="absolute top-4 right-4 bg-[#E43636] text-white px-3 py-2 text-sm font-black uppercase tracking-wide shadow-xl border-2 border-white/20">
                                            Legend
                                        </div>

                                        {/* Click Indicator */}
                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
                                            <div className="bg-[#E43636] text-white px-6 py-3 rounded-full font-bold uppercase tracking-wide text-sm shadow-2xl border-2 border-white/20">
                                                View Details
                                            </div>
                                        </div>
                                    </div>

                                    {/* Enhanced Stats Section */}
                                    <div className="p-5 bg-[#1A1A1A] border-t border-[#2A2A2A]">
                                        <div className="grid grid-cols-2 gap-4 text-center">
                                            <div className="bg-gradient-to-br from-black/50 to-[#2A2A2A]/50 p-4 rounded-lg border border-[#2A2A2A] hover:border-[#E43636]/50 transition-colors duration-200">
                                                <div className="text-[#E43636] font-black text-2xl mb-1">{player.goals}</div>
                                                <div className="text-[#E2DDB4] text-xs uppercase tracking-wider font-semibold">Goals</div>
                                            </div>
                                            <div className="bg-gradient-to-br from-black/50 to-[#2A2A2A]/50 p-4 rounded-lg border border-[#2A2A2A] hover:border-[#E43636]/50 transition-colors duration-200">
                                                <div className="text-[#E43636] font-black text-2xl mb-1">{player.appearances}</div>
                                                <div className="text-[#E2DDB4] text-xs uppercase tracking-wider font-semibold">Appearances</div>
                                            </div>
                                        </div>

                                        {/* Subtle accent line */}
                                        <div className="mt-4 w-16 h-0.5 bg-[#E43636] mx-auto opacity-60"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="text-[#E43636] text-6xl mb-4">⚽</div>
                        <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">No Players in Your Team</h2>
                        <p className="text-[#F6EFD2] mb-8 max-w-md mx-auto">
                            Start building your ultimate Manchester United squad by exploring our collection of legends.
                        </p>
                        <a
                            href="/legends"
                            className="inline-block bg-[#E43636] text-white border-2 border-[#E43636] px-8 py-4 font-bold uppercase tracking-wider hover:bg-[#C53030] hover:border-[#C53030] transition-all duration-200"
                        >
                            Browse Legends
                        </a>
                    </div>
                )}
            </div>

            {/* Player Details Modal */}
            {selectedPlayer && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-[#1A1A1A] border-2 border-[#E43636] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-[#E43636]/30">
                        {/* Modal Header */}
                        <div className="relative overflow-hidden">
                            <div className="relative h-80">
                                <img
                                    src={selectedPlayer.image || "/default-player.jpg"}
                                    alt={selectedPlayer.name}
                                    className="w-full h-full object-cover object-center"
                                    onError={(e) => {
                                        e.target.src = '/placeholder-player.png';
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 bg-black/70 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#E43636] transition-all duration-200 shadow-lg z-10"
                            >
                                ✕
                            </button>

                            {/* Legend Badge */}
                            <div className="absolute top-4 left-4 bg-[#E43636] text-white px-3 py-1 text-sm font-bold uppercase tracking-wide shadow-lg">
                                Legend
                            </div>

                            {/* Player Info Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <div className="text-center">
                                    <h2 className="text-white font-black text-3xl uppercase tracking-wider mb-2 drop-shadow-lg">{selectedPlayer.name}</h2>
                                    <p className="text-[#F6EFD2] text-xl uppercase tracking-wide font-bold mb-1">{selectedPlayer.position}</p>
                                    <p className="text-[#E2DDB4] text-lg uppercase tracking-wide">{selectedPlayer.nationality}</p>
                                </div>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-6">
                            {/* Career Stats */}
                            <div>
                                <h4 className="text-[#E43636] font-bold uppercase tracking-wider mb-4 text-lg">Career Statistics</h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="bg-black/50 p-4 rounded border border-[#2A2A2A] text-center">
                                        <div className="text-3xl font-bold text-[#E43636]">{selectedPlayer.goals}</div>
                                        <div className="text-xs text-[#E2DDB4] uppercase tracking-wide">Total Goals</div>
                                    </div>
                                    <div className="bg-black/50 p-4 rounded border border-[#2A2A2A] text-center">
                                        <div className="text-3xl font-bold text-[#E43636]">{selectedPlayer.appearances}</div>
                                        <div className="text-xs text-[#E2DDB4] uppercase tracking-wide">Appearances</div>
                                    </div>
                                    <div className="bg-black/50 p-4 rounded border border-[#2A2A2A] text-center">
                                        <div className="text-3xl font-bold text-[#E43636]">{selectedPlayer.assists}</div>
                                        <div className="text-xs text-[#E2DDB4] uppercase tracking-wide">Assists</div>
                                    </div>
                                    <div className="bg-black/50 p-4 rounded border border-[#2A2A2A] text-center">
                                        <div className="text-3xl font-bold text-[#E43636]">{selectedPlayer.trophies}</div>
                                        <div className="text-xs text-[#E2DDB4] uppercase tracking-wide">Trophies</div>
                                    </div>
                                </div>
                            </div>

                            {/* Achievements */}
                            {/* <div>
                                <h4 className="text-[#E43636] font-bold uppercase tracking-wider mb-4 text-lg">Major Achievements</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-3 h-3 bg-[#E43636] rounded-full flex-shrink-0"></div>
                                        <span className="text-[#F6EFD2] text-sm">Premier League Winner (2007, 2008, 2009)</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-3 h-3 bg-[#E43636] rounded-full flex-shrink-0"></div>
                                        <span className="text-[#F6EFD2] text-sm">Champions League Winner (2008)</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-3 h-3 bg-[#E43636] rounded-full flex-shrink-0"></div>
                                        <span className="text-[#F6EFD2] text-sm">FIFA World Player of the Year (2008)</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-3 h-3 bg-[#E43636] rounded-full flex-shrink-0"></div>
                                        <span className="text-[#F6EFD2] text-sm">Ballon d'Or Winner (2008)</span>
                                    </div>
                                </div>
                            </div> */}

                            {/* Biography */}
                            <div>
                                <h4 className="text-[#E43636] font-bold uppercase tracking-wider mb-4 text-lg">Player Biography</h4>
                                <p className="text-[#F6EFD2] text-sm leading-relaxed">
                                    {selectedPlayer.bio}
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-4 pt-4 border-t border-[#2A2A2A]">
                                <button
                                    onClick={() => {
                                        handleRemove(selectedPlayer._id);
                                        closeModal();
                                    }}
                                    disabled={removeMutation.isLoading}
                                    className="flex-1 bg-transparent text-[#E43636] border-2 border-[#E43636] py-3 font-bold uppercase tracking-wider hover:bg-[#E43636] hover:text-white transition-all duration-200"
                                >
                                    {removeMutation.isLoading ? 'Removing...' : 'Remove from Team'}
                                </button>
                                <button
                                    onClick={closeModal}
                                    className="flex-1 bg-[#E43636] text-white border-2 border-[#E43636] py-3 font-bold uppercase tracking-wider hover:bg-[#C53030] hover:border-[#C53030] transition-all duration-200"
                                >
                                    Close Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyTeam;