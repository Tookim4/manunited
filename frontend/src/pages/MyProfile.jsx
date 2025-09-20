import { useAuth } from '../libs/useAuth';
import { useQuery } from '@tanstack/react-query';
import { getTeam } from '../libs/apis/teamApi';

const MyProfile = () => {
    const { data: authData, isLoading: authLoading } = useAuth();
    const { data: teamData, isLoading: teamLoading } = useQuery({
        queryKey: ['myTeam'],
        queryFn: getTeam,
        retry: false,
    });

    const user = authData?.user;

    if (authLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-[#E43636] text-xl font-bold uppercase tracking-wider">Loading Profile...</div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="text-[#E43636] text-2xl font-bold uppercase tracking-wider mb-4">Access Denied</div>
                    <div className="text-[#F6EFD2]">Please log in to view your profile.</div>
                </div>
            </div>
        );
    }

    // Mockup data for additional user information
    const mockUserData = {
        name: "John Smith", // Mockup - user will add this to DB
        joinDate: "January 2024",
        favoritePlayer: "Cristiano Ronaldo",
        totalLogins: 47,
        achievements: ["First Team Created", "Legend Collector", "Top Contributor"]
    };

    return (
        <div className="min-h-screen bg-black">
            {/* Header Section */}
            <div className="bg-black border-b-2 border-[#2A2A2A] py-16">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-wider">
                            <span className="text-[#E43636]">My</span> Profile
                        </h1>
                        <p className="text-xl text-[#F6EFD2] max-w-2xl mx-auto">
                            Your Manchester United Legends collection dashboard
                        </p>
                    </div>
                </div>
            </div>

            {/* Profile Content */}
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-black border-2 border-[#2A2A2A] overflow-hidden">
                            {/* Profile Header */}
                            <div className="bg-gradient-to-br from-[#E43636]/20 to-[#2A2A2A] p-8 text-center">
                                <div className="w-24 h-24 bg-[#E43636] rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <span className="text-white text-3xl font-black uppercase">
                                        {user.username.charAt(0)}
                                    </span>
                                </div>
                                <h2 className="text-white text-2xl font-bold uppercase tracking-wider mb-1">
                                    {user.username}
                                </h2>
                                <p className="text-[#E2DDB4] text-lg font-medium">
                                    {mockUserData.name}
                                </p>
                                <div className="mt-4">
                                    <span className="inline-block bg-[#E43636] text-white px-3 py-1 text-xs font-bold uppercase tracking-wide">
                                        Legend Collector
                                    </span>
                                </div>
                            </div>

                            {/* Profile Stats */}
                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-[#1A1A1A] p-4 rounded border border-[#2A2A2A] text-center">
                                        <div className="text-[#E43636] font-bold text-2xl">{teamData?.length || 0}</div>
                                        <div className="text-[#E2DDB4] text-xs uppercase tracking-wide">Team Size</div>
                                    </div>
                                    <div className="bg-[#1A1A1A] p-4 rounded border border-[#2A2A2A] text-center">
                                        <div className="text-[#E43636] font-bold text-2xl">{mockUserData.totalLogins}</div>
                                        <div className="text-[#E2DDB4] text-xs uppercase tracking-wide">Total Logins</div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-[#2A2A2A]">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-[#E2DDB4] uppercase tracking-wide">Member Since</span>
                                            <span className="text-white font-medium">{mockUserData.joinDate}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-[#E2DDB4] uppercase tracking-wide">Favorite Player</span>
                                            <span className="text-white font-medium">{mockUserData.favoritePlayer}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Quick Actions */}
                        <div className="bg-[#1A1A1A] border-2 border-[#2A2A2A] p-6">
                            <h3 className="text-white font-bold uppercase tracking-wider text-xl mb-6">Quick Actions</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <a
                                    href="/legends"
                                    className="bg-transparent border-2 border-[#E43636] text-[#E43636] p-4 font-bold uppercase tracking-wide hover:bg-[#E43636] hover:text-white transition-all duration-200 text-center"
                                >
                                    Browse Legends
                                </a>
                                <a
                                    href="/myteam"
                                    className="bg-[#E43636] border-2 border-[#E43636] text-white p-4 font-bold uppercase tracking-wide hover:bg-[#C53030] hover:border-[#C53030] transition-all duration-200 text-center"
                                >
                                    View My Team
                                </a>
                            </div>
                        </div>

                        {/* Achievements */}
                        <div className="bg-[#1A1A1A] border-2 border-[#2A2A2A] p-6">
                            <h3 className="text-white font-bold uppercase tracking-wider text-xl mb-6">Achievements</h3>
                            <div className="space-y-3">
                                {mockUserData.achievements.map((achievement, index) => (
                                    <div key={index} className="flex items-center space-x-4 p-3 bg-black/50 rounded border border-[#2A2A2A]">
                                        <div className="w-8 h-8 bg-[#E43636] rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm font-bold">🏆</span>
                                        </div>
                                        <span className="text-[#F6EFD2] font-medium">{achievement}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-[#1A1A1A] border-2 border-[#2A2A2A] p-6">
                            <h3 className="text-white font-bold uppercase tracking-wider text-xl mb-6">Recent Activity</h3>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4 p-4 bg-black/30 rounded border border-[#2A2A2A]">
                                    <div className="w-10 h-10 bg-[#E43636] rounded-full flex items-center justify-center">
                                        <span className="text-white text-sm">⚽</span>
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">Added Cristiano Ronaldo to your team</p>
                                        <p className="text-[#E2DDB4] text-sm">2 days ago</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 p-4 bg-black/30 rounded border border-[#2A2A2A]">
                                    <div className="w-10 h-10 bg-[#E43636] rounded-full flex items-center justify-center">
                                        <span className="text-white text-sm">⭐</span>
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">Earned "Legend Collector" achievement</p>
                                        <p className="text-[#E2DDB4] text-sm">1 week ago</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 p-4 bg-black/30 rounded border border-[#2A2A2A]">
                                    <div className="w-10 h-10 bg-[#E43636] rounded-full flex items-center justify-center">
                                        <span className="text-white text-sm">👥</span>
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">Joined the Manchester United community</p>
                                        <p className="text-[#E2DDB4] text-sm">1 month ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Account Settings */}
                        <div className="bg-[#1A1A1A] border-2 border-[#2A2A2A] p-6">
                            <h3 className="text-white font-bold uppercase tracking-wider text-xl mb-6">Account Settings</h3>
                            <div className="space-y-4">
                                <button className="w-full bg-transparent border-2 border-[#E2DDB4] text-[#E2DDB4] py-3 font-bold uppercase tracking-wide hover:bg-[#E2DDB4] hover:text-black transition-all duration-200">
                                    Change Password
                                </button>
                                <button className="w-full bg-transparent border-2 border-[#E2DDB4] text-[#E2DDB4] py-3 font-bold uppercase tracking-wide hover:bg-[#E2DDB4] hover:text-black transition-all duration-200">
                                    Update Profile
                                </button>
                                <button className="w-full bg-[#E43636] border-2 border-[#E43636] text-white py-3 font-bold uppercase tracking-wide hover:bg-[#C53030] hover:border-[#C53030] transition-all duration-200">
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;