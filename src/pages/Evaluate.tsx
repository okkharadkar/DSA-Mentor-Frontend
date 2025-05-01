import { useState } from 'react';
import axios from 'axios';
import { useProblem } from '../Context/ProblemContext';
const API = import.meta.env.VITE_API_URL;
const Evaluate = () => {
    const { selectedTitle } = useProblem();
    const [approach, setApproach] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | {
        evaluation: string;
        attempts: number;
        hintUnlocked: boolean;
        solutionUnlocked: boolean;
        message: string;
    }>(null);

    const handleEvaluate = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');

            const res = await axios.post(
                `${API}/api/evaluatePS`,
                {
                    title: selectedTitle,
                    approach,
                    code
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                }
            );

            if (res.data.success) {
                setResult({
                    evaluation: res.data.evaluation,
                    attempts: res.data.attempts,
                    hintUnlocked: res.data.hintUnlocked,
                    solutionUnlocked: res.data.solutionUnlocked,
                    message: res.data.message,
                });
            } else {
                setResult(null);
            }
        } catch (error) {
            console.error("Evaluation Error:", error);
            setResult(null);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setApproach('');
        setCode('');
        setResult(null);
    };

    return (
        <div className="min-h-screen bg-[#0f172a] p-8 text-white">
            <h1 className="text-3xl font-bold text-center mb-8">🧠 Evaluate Your Code</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Panel */}
                <div className="w-full lg:w-1/2 bg-[#1e293b] rounded-2xl shadow-xl p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-white truncate max-w-[70%]">{selectedTitle}</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={handleEvaluate}
                                disabled={loading}
                                className="px-4 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md transition disabled:opacity-50"
                            >
                                {loading ? '⏳ Evaluating...' : '✅ Evaluate'}
                            </button>
                            <button
                                onClick={handleReset}
                                className="px-4 py-1 bg-rose-500 hover:bg-rose-600 text-white rounded-md transition"
                            >
                                ♻️ Reset
                            </button>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="text-sm font-medium text-gray-300">📝 Approach</label>
                        <textarea
                            value={approach}
                            onChange={(e) => setApproach(e.target.value)}
                            placeholder="Explain your approach..."
                            rows={4}
                            className="w-full mt-1 px-4 py-2 border border-gray-600 bg-[#0f172a] text-white rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-300">💻 Code</label>
                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Write your solution here..."
                            rows={10}
                            className="w-full mt-1 px-4 py-2 border border-gray-600 bg-[#0f172a] text-white rounded-lg resize-y font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Right Panel */}
                <div className="w-full lg:w-1/2 bg-[#1e293b] rounded-2xl shadow-xl p-6">
                    <h2 className="text-xl font-bold text-white mb-4">📊 Evaluation Result</h2>
                    {loading ? (
                        <p className="text-blue-300">⏳ Waiting for evaluation...</p>
                    ) : result ? (
                        <div className="space-y-4 text-gray-200">
                            <p><strong>📬 Message:</strong> {result.message}</p>
                            <p><strong>📝 Feedback:</strong></p>
                            <pre className="whitespace-pre-wrap bg-[#0f172a] p-3 rounded-lg border border-gray-700 overflow-auto">
                                {result.evaluation}
                            </pre>
                            <p><strong>🔁 Attempts:</strong> {result.attempts}</p>
                            <p><strong>🧩 Hint Unlocked:</strong> {result.hintUnlocked ? '✅ Yes' : '❌ No'}</p>
                            <p><strong>🔐 Solution Unlocked:</strong> {result.solutionUnlocked ? '✅ Yes' : '❌ No'}</p>
                        </div>
                    ) : (
                        <p className="text-gray-400">No evaluation yet. Submit your code to see results.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Evaluate;
