import { FaLinkedin, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';

export const Footer = () => {
    return (
        <footer className="bg-black text-white dark:bg-black dark:text-white py-10">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h2 className="text-3xl mb-4 font-bold">Stay Connected</h2>
                <p className="text-xl mb-6">Follow us on social media for updates and insights!</p>
                <div className="flex justify-center space-x-8">
                    {/* LinkedIn */}
                    <a
                        href="https://www.linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center p-2 hover:bg-gray-800 hover:text-white transition-all duration-300"
                    >
                        <FaLinkedin className="w-6 h-6" />
                    </a>

                    {/* Twitter */}
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center p-2 hover:bg-gray-800 hover:text-white transition-all duration-300"
                    >
                        <FaTwitter className="w-6 h-6" />
                    </a>

                    {/* Instagram */}
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center p-2 hover:bg-gray-800 hover:text-white transition-all duration-300"
                    >
                        <FaInstagram className="w-6 h-6" />
                    </a>

                    {/* Email */}
                    <a
                        href="mailto:your-email@example.com"
                        className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center p-2 hover:bg-gray-800 hover:text-white transition-all duration-300"
                    >
                        <FaEnvelope className="w-6 h-6" />
                    </a>
                </div>

                <p className="mt-6 text-lg">© 2025 DSA-Mentor | All Rights Reserved</p>
            </div>
        </footer>
    );
};
