import { useState } from "react";

export default function PlayerForm ({onSubmit}) {
    const [form, setForm] = useState({
        name: '',
        nationality: '',
        position: '',
        goals: '',
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
        formData.append("image", form.image);

        
        onSubmit(formData);

        setForm({
            name: '',
            nationality: '',
            position: '',
            goals: '',
            image: null,
        });
        e.target.reset()
    };

    return (
        <form 
            onSubmit={handleSubmit}
            className="space-y-4 bg-gray-800 p-4 rounded-lg shadow-md mb-6">
            <h2>Add Legend</h2>
            <input 
                type="file"  
                name="image"
                // value={form.image}
                accept="image/*"
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
            />
            <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
            />
            <input
                type="text"
                name="nationality"
                value={form.nationality}
                onChange={handleChange}
                placeholder="Nationality"
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
            />
            <input
                type="text"
                name="position"
                value={form.position}
                onChange={handleChange}
                placeholder="Position"
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
            />
            <input
                type="text"
                name="goals"
                value={form.goals}
                onChange={handleChange}
                placeholder="Goals"
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
            />
            <button 
                type="submit"
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
            >Add Player</button>
        </form>
    );
}