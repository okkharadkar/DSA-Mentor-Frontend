import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ModeToggle } from "../components/mode-toggle";
import { useEffect, useRef, useState } from "react";
import { Login } from "../components/Login";
import { useAuth } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { Signup } from '../components/SignUp'

export const Header = () => {
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isSignupOpen, setSignupOpen] = useState(false);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const dropdownRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const openLoginModal = () => setLoginOpen(true);
    const closeLoginModal = () => setLoginOpen(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
        setDropdownOpen(false);
        toast.error("Logout Successful!");
    };

    return (
        <>
            <header className="fixed top-0 w-full z-50 border-b bg-background/85 backdrop-blur py-2">
                <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
                    {/* Logo and Title */}
                    <div className="flex items-center space-x-4">
                        <Link to="/">
                            <img
                                src="/logoo1.jpg"
                                alt="DSA-Mentor"
                                className="h-16 sm:h-20 w-auto"
                            />
                        </Link>
                        <span className="text-xl font-semibold sm:text-2xl md:text-4xl">
                            DSA-Mentor
                        </span>
                    </div>
                    {/* Nav Links - only show if user is logged in */}
                    {user && (
                        <nav className="hidden md:flex space-x-6 text-sm sm:text-base font-medium">
                            <Link to="/dashboard" className="hover:text-green-400 transition">
                                Dashboard
                            </Link>
                            <Link to="/CreateProblem" className="hover:text-green-400 transition">
                                Create Problem
                            </Link>
                            <Link to="/SolveProblem" className="hover:text-green-400 transition">
                                Solve Problem
                            </Link>
                        </nav>
                    )}
                    {/* Right Side */}
                    <div className="flex items-center space-x-4 relative">
                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setDropdownOpen((prev) => !prev)}
                                    className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none"
                                >
                                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm">
                                        {user.name[0].toUpperCase()}
                                    </div>
                                    <span className="hidden sm:block">{user.name}</span>
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded-md shadow-lg z-50">
                                        <Link
                                            to="/Dashboard"
                                            className="block px-4 py-2 hover:bg-gray-100"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Button onClick={openLoginModal} className="text-sm sm:text-base px-4 py-2">
                                Login
                            </Button>
                        )}
                        <ModeToggle />
                    </div>
                </div>
            </header>

            {isLoginOpen && <Login onClose={closeLoginModal} onLoginSuccess={setUser} onOpenSignup={() => {
                setLoginOpen(false);
                setSignupOpen(true);
            }} />}

            {isSignupOpen && (
                <Signup
                    onClose={() => setSignupOpen(false)}
                    onSignupSuccess={setUser}
                    onOpenLogin={() => {
                        setSignupOpen(false);
                        setLoginOpen(true);
                    }}
                />
            )}
        </>
    );
};
