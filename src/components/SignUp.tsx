import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import axios from "axios";
import { useNavigate } from "react-router-dom";
interface SignupProps {
    onClose: () => void;
    onSignupSuccess: (user: { name: string; email: string }) => void;
    onOpenLogin: () => void;
}
const API = import.meta.env.VITE_API_URL;
export const Signup = ({ onClose, onSignupSuccess, onOpenLogin }: SignupProps) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate()
    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await axios.post(`${API}/api/auth/signup`, {
                name,
                email,
                password,
            });

            const { user, token } = res.data;

            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
            navigate('/Dashboard')
            onSignupSuccess(user);
            onClose();
        } catch (err: any) {
            setError(err.response?.data?.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = "auto";
        }

    }, [])
    return (
        <div className="fixed overflow-y-auto inset-0 flex items-center justify-center bg-black/90 z-50">
            <Card className="w-[500px] bg-[#121212]  text-white rounded-2xl shadow-2xl p-8 relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-5 mt-8 right-5 text-gray-400 hover:text-white text-2xl transition"
                >
                    ✖
                </button>

                {/* Header */}
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="mt-6 text-5xl font-bold tracking-wide">DM</CardTitle>
                    <CardDescription className=" mt-4 text-2xl text-white font-semibold">
                        Create Your Account
                    </CardDescription>
                    <CardDescription className="text-gray-400">
                        Join DSA-Mentor to start your journey
                    </CardDescription>
                </CardHeader>

                <CardContent className="mt-6 space-y-6">
                    {/* Google Signup */}
                    <Button
                        variant="ghost"
                        className="flex items-center justify-center gap-3 bg-white text-black border border-gray-300 hover:bg-gray-100 transition font-semibold text-base py-3 rounded-lg w-full shadow-md"
                    >
                        <img
                            src="https://www.citypng.com/public/uploads/preview/google-logo-icon-gsuite-hd-701751694791470gzbayltphh.png"
                            alt="Google Logo"
                            className="h-5 w-5"
                        />
                        Sign up with Google
                    </Button>

                    {/* Divider */}
                    <div className="flex items-center">
                        <div className="flex-grow border-t border-gray-600" />
                        <span className="mx-4 text-gray-400 text-sm">OR</span>
                        <div className="flex-grow border-t border-gray-600" />
                    </div>

                    {/* Form */}
                    <form className="space-y-6" onSubmit={handleSignup}>
                        {/* Name */}
                        <div>
                            <Label htmlFor="name" className="text-sm mb-1 block">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="bg-[#1e1e1e] border border-gray-700 text-white placeholder-gray-500 px-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-orange-500 focus:outline-none"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <Label htmlFor="email" className="text-sm mb-1 block">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-[#1e1e1e] border border-gray-700 text-white placeholder-gray-500 px-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-orange-500 focus:outline-none"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <Label htmlFor="password" className="text-sm mb-1 block">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="bg-[#1e1e1e] border border-gray-700 text-white placeholder-gray-500 px-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-orange-500 focus:outline-none"
                            />
                        </div>

                        {/* Error Message */}
                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full bg-orange-500 hover:bg-orange-600 transition font-bold text-white py-4 rounded-lg text-base"
                            disabled={loading}
                        >
                            {loading ? "Creating Account..." : "Sign Up"}
                        </Button>
                    </form>
                </CardContent>

                {/* Footer */}
                <CardFooter className="flex justify-center">
                    <p className="text-gray-400 text-sm">
                        Already have an account?{" "}
                        <button
                            className="text-orange-500 hover:underline font-semibold"
                            onClick={() => {
                                onClose();
                                onOpenLogin();
                            }}
                        >
                            Login
                        </button>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};
