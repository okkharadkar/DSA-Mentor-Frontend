import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useProblem } from '../Context/ProblemContext';

const SolveProblems = () => {
    const [problems, setProblems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();
    const { setSelectedTitle } = useProblem();

    useEffect(() => {
        // Detect dark mode using document
        setDarkMode(document.documentElement.classList.contains('dark'));

        const fetchProblems = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error("No token found.");
                    return;
                }

                const res = await axios.get('https://dsa-mentor-backend.onrender.com/api/getPs', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.data && Array.isArray(res.data.evaluation)) {
                    setProblems(res.data.evaluation);
                } else {
                    console.error("Unexpected response format:", res.data);
                }
            } catch (err) {
                console.error("Error fetching problems:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProblems();
    }, []);

    const bgColor = darkMode ? 'bg-[#0f172a]' : 'bg-[#f9fcfe]';
    const cardBg = darkMode ? 'bg-[#1e293b]' : 'bg-white';
    const textColor = darkMode ? 'text-white' : 'text-gray-900';
    const descColor = darkMode ? 'text-gray-300' : 'text-gray-700';
    const shadow = darkMode ? 'shadow-lg' : 'shadow-md';

    return (
        <div className={`min-h-screen ${bgColor} p-10 transition-colors duration-300`}>
            <h1 className={`text-4xl font-bold mb-6 text-center ${textColor}`}>
                🧠 Solve Problems
            </h1>

            {loading ? (
                <div className="text-center text-lg mt-20 text-gray-400">⏳ Loading problems...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {problems.map((ps) => (
                        <div
                            key={ps._id}
                            className={`${cardBg} ${shadow} rounded-2xl p-6 border border-gray-300 dark:border-gray-700 transition-transform transform hover:scale-[1.03] hover:shadow-2xl duration-300 cursor-pointer`}
                            onClick={() => {
                                setSelectedTitle(ps.title);
                                navigate("/evaluate");
                            }}
                        >
                            <h2 className={`text-xl font-semibold mb-2 truncate ${textColor}`}>
                                {ps.title}
                            </h2>
                            <p className={`line-clamp-3 mb-4 ${descColor}`}>
                                {ps.description}
                            </p>
                            <div className="w-full px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-center font-medium rounded-xl">
                                🚀 Start Solving
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SolveProblems;
