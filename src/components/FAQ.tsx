import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqs = [
    {
        question: "🌟 What is the purpose of this platform?",
        answer: "This platform is not just for giving out solutions. It's designed to mentor you through your logic. It helps you grow by giving hints, direction, and insight into problem-solving."
    },
    {
        question: "🧠 Will this platform directly give me the solution?",
        answer: "Only as a final step. Our goal is to guide your thinking process, not spoon-feed answers. You learn better when you actively engage with the problem."
    },
    {
        question: "📋 Can I copy-paste code from here?",
        answer: "We highly discourage that. Copy-pasting won't help you understand or grow. This platform is for learning — not shortcutting."
    },
    {
        question: "🤖 How does AI help me here?",
        answer: "Think of the AI as your personal mentor — it reviews your code, gives you guidance, and helps you understand the 'why' behind each approach."
    },
    {
        question: "🎥 Is this better than watching YouTube tutorials?",
        answer: "Tutorials show you what to do. We help you *figure it out* yourself — that’s the kind of learning that sticks and builds confidence."
    }
];

export const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleIndex = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-white dark:bg-[#0f0f0f] text-black dark:text-white py-20 px-4 md:px-10 lg:px-28 transition-all duration-500">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-center tracking-tight">
                    📌 Frequently Asked Questions
                </h2>

                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-gray-300 dark:border-zinc-800 rounded-xl overflow-hidden transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            <button
                                className="w-full flex justify-between items-center text-left px-6 py-5 text-lg md:text-xl font-semibold dark:text-white text-gray-800 bg-gray-100 dark:bg-zinc-900 hover:bg-gray-200 dark:hover:bg-zinc-800 transition-all"
                                onClick={() => toggleIndex(index)}
                            >
                                <span>{faq.question}</span>
                                {openIndex === index ? (
                                    <FaChevronUp className="text-yellow-400 transition-transform duration-300 rotate-180" />
                                ) : (
                                    <FaChevronDown className="text-yellow-400 transition-transform duration-300" />
                                )}
                            </button>
                            <div
                                className={`px-6 transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-96 py-5 opacity-100' : 'max-h-0 py-0 opacity-0'
                                    }`}
                            >
                                <p className="text-lg md:text-xl font-bold leading-relaxed text-gray-800 dark:text-gray-200">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
