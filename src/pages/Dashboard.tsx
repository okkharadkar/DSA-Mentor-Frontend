import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PerformanceChart = ({ stats }: { stats: any }) => {
    const data = {
        labels: ['Attempted', 'Solved', 'Attempts', 'Hints Used'],
        datasets: [
            {
                label: 'Performance Stats',
                data: [
                    stats.totalProblemsAttempted,
                    stats.totalSolved,
                    stats.totalAttempts,
                    stats.hintsUsedCount,
                ],
                backgroundColor: ['#4caf50', '#2196f3', '#ff9800', '#f44336'],
                borderRadius: 8,
            },
        ],
    };

    return <Bar data={data} />;
};

const Dashboard = () => {
    const [userData, setUserData] = useState<any>(null);
    const [problemDetails, setProblemDetails] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');

                // ✅ Fetch user profile
                const profileResponse = await axios.get('https://dsa-mentor-backend.onrender.com/api/auth/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const user = profileResponse.data.user;
                setUserData(user);

                // ✅ Fetch problems from /api/getPs (use evaluation key)
                const psResponse = await axios.get('https://dsa-mentor-backend.onrender.com/api/getPs', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const allProblems = psResponse.data.evaluation;

                // ✅ Match attempted problem IDs with problem metadata
                const enrichedProblems = user.problemsAttempted.map((attempt: any) => {
                    const matched = allProblems.find((p: any) => p._id === attempt.problemId);
                    return {
                        ...attempt,
                        title: matched?.title || `Problem ${attempt.problemId}`,
                        statement: matched?.description || 'Description not found',
                        status: matched?.status || attempt.status || 'Unknown',
                        attempts: matched?.attempts ?? attempt.attempts,
                    };
                });

                setProblemDetails(enrichedProblems);
            } catch (error) {
                console.error('Error loading dashboard:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="text-white p-8">Loading...</div>;
    if (!userData) return <div className="text-red-500 p-8">Failed to load user data.</div>;

    return (
        <div className="bg-[#0d0d0d] text-white min-h-screen p-8 font-sans">
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-green-400">DSA-Mentor Dashboard</h1>
            </header>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#1c1c1c] p-6 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-semibold text-white mb-2">Welcome, {userData.name}</h2>
                    <p className="text-gray-400">📧 Email: {userData.email}</p>
                    <p className="text-gray-400">🧠 Learning Score: {userData.performanceStats.learningScore}</p>
                    <div className="mt-4 space-y-2 text-sm text-gray-300">
                        <p>Total Problems Attempted: {userData.performanceStats.totalProblemsAttempted}</p>
                        <p>Total Solved: {userData.performanceStats.totalSolved}</p>
                        <p>Total Attempts: {userData.performanceStats.totalAttempts}</p>
                        <p>Hints Used: {userData.performanceStats.hintsUsedCount}</p>
                    </div>
                </div>

                <div className="bg-[#1c1c1c] p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">📊 Performance Chart</h3>
                    <PerformanceChart stats={userData.performanceStats} />
                </div>
            </section>

            <section className="bg-[#1c1c1c] p-6 rounded-xl shadow-lg mb-10">
                <h3 className="text-xl font-semibold mb-4">📝 Attempted Problem Statements</h3>
                <ul className="space-y-6">
                    {problemDetails.map((problem, index) => (
                        <li key={index} className="bg-[#2c2c2c] p-4 rounded-lg hover:shadow-xl transition-all duration-300">
                            <h4 className="text-lg font-bold text-green-300">{problem.title}</h4>
                            <p className="text-gray-300 text-sm mt-1 italic">{problem.statement}</p>
                            <div className="mt-2 text-sm text-gray-400">
                                <p>Attempts: {problem.attempts}</p>
                                <p>Hints Used: {problem.hintused ?? 0}</p>
                                <p>Status: <span className={problem.status === 'Solved' ? 'text-green-400' : 'text-yellow-400'}>{problem.status}</span></p>
                                <p>Last Attempt: {problem.lastAttemptDate ? new Date(problem.lastAttemptDate).toLocaleDateString() : 'N/A'}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default Dashboard;
