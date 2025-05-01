import { useEffect, useState } from "react";
import { FAQSection } from '../components/FAQ'
const lines = [
    "🚀 Welcome to DSA-Mentor!",
    "Submit your approach. Let AI guide you. 🤖",
    "Boost your problem-solving skills with smart feedback.",
    "AI reviews your code, suggests improvements, and teaches you why. 💡",
    "Track your DSA journey and grow with confidence. 📈"
];

export default function Landing() {
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
        const currentLine = lines[lineIndex];

        if (charIndex < currentLine.length) {
            const typingTimer = setTimeout(() => {
                setDisplayText((prev) => prev + currentLine[charIndex]);
                setCharIndex((prev) => prev + 1);
            }, 65);
            return () => clearTimeout(typingTimer);
        } else {
            const pauseTimer = setTimeout(() => {
                setCharIndex(0);
                setDisplayText("");
                setLineIndex((prev) => (prev + 1) % lines.length);
            }, 1800);
            return () => clearTimeout(pauseTimer);
        }
    }, [charIndex, lineIndex]);

    return (
        <div className="w-full min-h-screen bg-white text-black dark:bg-black dark:text-white transition-all duration-700">
            {/* Hero Section */}
            <section className="min-h-screen flex flex-col justify-center items-center px-6 md:px-20 py-10 relative overflow-hidden">
                {/* Animated background bubbles */}
                <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
                    <div className="absolute w-72 h-72 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-20 top-20 left-1/2 animate-pulse"></div>
                    <div className="absolute w-72 h-72 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full blur-3xl opacity-20 top-1/2 left-1/3 animate-pulse"></div>
                    <div className="absolute w-72 h-72 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-3xl opacity-20 bottom-0 right-10 animate-pulse"></div>
                </div>

                <h1 className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg mb-6 z-10">
                    Your Personal AI Mentor for DSA
                </h1>

                <p className="text-2xl md:text-3xl h-16 font-medium z-10">
                    {displayText}
                    <span className="animate-pulse">|</span>
                </p>

                <button className="mt-10 px-8 py-4 bg-black hover:bg-gray-900 text-white font-semibold rounded-full shadow-md transition-all dark:bg-white dark:text-black dark:hover:bg-gray-200 z-10">
                    🚀 Get Started
                </button>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white text-black dark:bg-black dark:text-white">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-12">Why Choose DSA-Mentor?</h2>
                    <div className="grid md:grid-cols-3 gap-10">
                        {[
                            {
                                title: "🧠 AI-Powered Code Review",
                                desc: "Get instant insights and optimization suggestions for your submitted code.",
                            },
                            {
                                title: "📚 Learn With Your Own Code",
                                desc: "Understand concepts deeply by analyzing your real problem-solving approaches.",
                            },
                            {
                                title: "📈 Track Your Progress",
                                desc: "Visualize your DSA journey and growth over time through smart analytics.",
                            },
                            {
                                title: "👨‍💻 Personalized Feedback",
                                desc: "No more generic advice — get suggestions tailored to your coding style.",
                            },
                            {
                                title: "💬 Instant Explanations",
                                desc: "Get explanations for errors and alternatives on the spot using AI.",
                            },
                            {
                                title: "🛠️ Build Better Habits",
                                desc: "Improve code readability, naming conventions, and problem-solving mindset.",
                            },
                        ].map((feature, idx) => (
                            <div
                                key={idx}
                                className="bg-gradient-to-br from-white via-gray-100 to-gray-200 text-black dark:from-neutral-800 dark:via-neutral-900 dark:to-black dark:text-white rounded-xl p-6 shadow-lg hover:scale-105 transition-all border border-gray-200 dark:border-neutral-700"
                            >
                                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                                <p>{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <FAQSection></FAQSection>
        </div>
    );
}