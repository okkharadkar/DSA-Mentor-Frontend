import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CreateProblem = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [constraints, setConstraints] = useState(['']);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('token');

            const payload = {
                title,
                description,
                constraints,
            };

            await axios.post('https://dsa-mentor-backend.onrender.com/api/PSsubmit', payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // setSuccess('Problem submitted successfully!');
            toast.success('Problem submitted successfully!')
            setError(null);
            setTitle('');
            setDescription('');
            setConstraints(['']);
        } catch (err) {
            console.error(err);
            // setError('Failed to submit problem.');
            toast.error('Failed to submit')
            setSuccess(null);
        }
    };

    const updateConstraint = (index: number, value: string) => {
        const updated = [...constraints];
        updated[index] = value;
        setConstraints(updated);
    };

    const addConstraint = () => setConstraints([...constraints, '']);
    const removeConstraint = (index: number) =>
        setConstraints(constraints.filter((_, i) => i !== index));

    return (
        <div className="bg-[#0d0d0d] min-h-screen text-white p-10 font-sans">
            <h2 className="text-3xl font-bold mb-6 text-green-400">📝 Create New Problem</h2>

            <div className="space-y-4 bg-[#1c1c1c] p-6 rounded-xl shadow-lg">
                <div>
                    <label className="block text-sm mb-1">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 rounded bg-[#2c2c2c] text-white border border-gray-600"
                        placeholder="e.g. Three Sum 2"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 rounded bg-[#2c2c2c] text-white border border-gray-600"
                        rows={4}
                        placeholder="Enter the problem statement..."
                    />
                </div>

                <div>
                    <label className="block text-sm mb-2">Constraints</label>
                    {constraints.map((c, i) => (
                        <div key={i} className="flex items-center space-x-2 mb-2">
                            <input
                                type="text"
                                value={c}
                                onChange={(e) => updateConstraint(i, e.target.value)}
                                className="w-full p-2 rounded bg-[#2c2c2c] text-white border border-gray-600"
                                placeholder={`Constraint ${i + 1}`}
                            />
                            {constraints.length > 1 && (
                                <button
                                    onClick={() => removeConstraint(i)}
                                    className="text-red-500 hover:text-red-400"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        onClick={addConstraint}
                        className="mt-2 px-3 py-1 text-sm rounded bg-green-600 hover:bg-green-700"
                    >
                        ➕ Add Constraint
                    </button>
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full mt-4 py-2 rounded bg-blue-600 hover:bg-blue-700 font-semibold"
                >
                    🚀 Submit Problem
                </button>

                {success && <p className="text-green-400 mt-2">{success}</p>}
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
        </div>
    );
};

export default CreateProblem;
