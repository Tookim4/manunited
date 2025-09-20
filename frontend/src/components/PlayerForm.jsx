import { useState } from "react";

export default function PlayerForm ({onSubmit}) {
    const [form, setForm] = useState({
        name: '',
        nationality: '',
        position: '',
        goals: '',
        appearances: '',
        assists: '',
        bio: '',
        trophies: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image"){
            setForm({
                ...form,
                image: files[0],
            });
        } else {
            setForm({
                ...form,
                [name]: value,
            })
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("nationality", form.nationality);
        formData.append("position", form.position);
        formData.append("goals", form.goals);
        formData.append("appearances", form.appearances);
        formData.append("assists", form.assists);
        formData.append("bio", form.bio);
        formData.append("trophies", form.trophies);
        formData.append("image", form.image);

        
        onSubmit(formData);

        setForm({
            name: '',
            nationality: '',
            position: '',
            goals: '',
            appearances: '',
            assists: '',
            bio: '',
            trophies: '',
            image: null,
        });
        e.target.reset()
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-black border-2 border-[#2A2A2A] p-6 shadow-xl mb-8"
        >
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#E43636] uppercase tracking-wider mb-2">Add Legend</h2>
                <div className="w-16 h-1 bg-[#E43636]"></div>
            </div>

            <div className="space-y-4">
                {/* File Input */}
                <div>
                    <label className="block text-sm font-semibold text-[#E2DDB4] uppercase tracking-wide mb-2">
                        Player Image
                    </label>
                    <div className="relative">
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full p-3 bg-[#1A1A1A] border-2 border-[#2A2A2A] text-white file:bg-[#E43636] file:text-white file:border-0 file:px-4 file:py-2 file:font-bold file:uppercase file:tracking-wide file:mr-4 file:hover:bg-[#C53030] focus:border-[#E43636] focus:outline-none transition-all duration-200"
                            required
                        />
                    </div>
                </div>

                {/* Text Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-[#E2DDB4] uppercase tracking-wide mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Enter player name"
                            className="w-full p-3 bg-[#1A1A1A] border-2 border-[#2A2A2A] text-white placeholder-[#F6EFD2]/50 focus:border-[#E43636] focus:outline-none transition-all duration-200"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-[#E2DDB4] uppercase tracking-wide mb-2">
                            Nationality
                        </label>
                        <input
                            type="text"
                            name="nationality"
                            value={form.nationality}
                            onChange={handleChange}
                            placeholder="Enter nationality"
                            className="w-full p-3 bg-[#1A1A1A] border-2 border-[#2A2A2A] text-white placeholder-[#F6EFD2]/50 focus:border-[#E43636] focus:outline-none transition-all duration-200"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-[#E2DDB4] uppercase tracking-wide mb-2">
                            Position
                        </label>
                        <input
                            type="text"
                            name="position"
                            value={form.position}
                            onChange={handleChange}
                            placeholder="Enter position"
                            className="w-full p-3 bg-[#1A1A1A] border-2 border-[#2A2A2A] text-white placeholder-[#F6EFD2]/50 focus:border-[#E43636] focus:outline-none transition-all duration-200"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-[#E2DDB4] uppercase tracking-wide mb-2">
                            Goals
                        </label>
                        <input
                            type="number"
                            name="goals"
                            value={form.goals}
                            onChange={handleChange}
                            placeholder="Enter goals scored"
                            className="w-full p-3 bg-[#1A1A1A] border-2 border-[#2A2A2A] text-white placeholder-[#F6EFD2]/50 focus:border-[#E43636] focus:outline-none transition-all duration-200"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-[#E2DDB4] uppercase tracking-wide mb-2">
                            Appearances
                        </label>
                        <input
                            type="number"
                            name="appearances"
                            value={form.appearances}
                            onChange={handleChange}
                            placeholder="Enter appearances met"
                            className="w-full p-3 bg-[#1A1A1A] border-2 border-[#2A2A2A] text-white placeholder-[#F6EFD2]/50 focus:border-[#E43636] focus:outline-none transition-all duration-200"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-[#E2DDB4] uppercase tracking-wide mb-2">
                            Assists
                        </label>
                        <input
                            type="number"
                            name="assists"
                            value={form.assists}
                            onChange={handleChange}
                            placeholder="Enter assists here"
                            className="w-full p-3 bg-[#1A1A1A] border-2 border-[#2A2A2A] text-white placeholder-[#F6EFD2]/50 focus:border-[#E43636] focus:outline-none transition-all duration-200"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-[#E2DDB4] uppercase tracking-wide mb-2">
                            Trophies
                        </label>
                        <input
                            type="number"
                            name="trophies"
                            value={form.trophies}
                            onChange={handleChange}
                            placeholder="Enter trophies here"
                            className="w-full p-3 bg-[#1A1A1A] border-2 border-[#2A2A2A] text-white placeholder-[#F6EFD2]/50 focus:border-[#E43636] focus:outline-none transition-all duration-200"
                            required
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-[#E2DDB4] uppercase tracking-wide mb-2">
                            Bio
                        </label>
                        <textarea
                            name="bio"
                            value={form.bio}
                            onChange={handleChange}
                            placeholder="Enter player biography here..."
                            rows="4"
                            className="w-full p-3 bg-[#1A1A1A] border-2 border-[#2A2A2A] text-white placeholder-[#F6EFD2]/50 focus:border-[#E43636] focus:outline-none transition-all duration-200 resize-vertical min-h-[100px]"
                            required
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-[#E43636] text-white border-2 border-[#E43636] py-4 font-bold text-sm uppercase tracking-wider hover:bg-[#C53030] hover:border-[#C53030] hover:shadow-lg hover:shadow-[#E43636]/50 transition-all duration-200 transform hover:scale-105"
                    >
                        + Add Legend
                    </button>
                </div>
            </div>
        </form>
    );
}