import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import axios from 'axios'
import { useAuth } from "@/Context/AuthContext";


interface LoginModal {
    onClose: () => void;
    onLoginSuccess: (user: { name: string; email: string }) => void;
    onOpenSignup: () => void;
}

export const Login = ({ onClose, onLoginSuccess, onOpenSignup }: LoginModal) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setUser } = useAuth();
    const handler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://dsa-mentor-backend.onrender.com/api/auth/signin', {
                email,
                password,
            });

            const { token, user } = res.data; // make sure your API returns this

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);
            toast.success("Login Successful!");
            onLoginSuccess(user);
            navigate("/Dashboard");
            onClose();
        } catch (error: any) {
            const status = error.response?.status;
            const message = error.response?.data?.message;

            if (status === 401) {
                toast.error(message || "Invalid email or password.");
            } else {
                toast.error(message || "Something went wrong. Please try again later.");
            }
        }
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = "auto";
        }

    }, [])
    return (
        <div className=" fixed inset-0 flex items-center justify-center bg-black/90 z-50">
            <Card className=" w-[500px] bg-[#121212] text-white rounded-2xl shadow-2xl p-8 relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 text-gray-400 hover:text-white text-2xl transition"
                >
                    ✖
                </button>

                {/* Header */}
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-5xl font-bold tracking-wide">DM</CardTitle>
                    <CardDescription className="text-2xl text-white font-semibold">
                        Welcome to DSA-Mentor
                    </CardDescription>
                    <CardDescription className="text-gray-400">
                        Sign in to continue
                    </CardDescription>
                </CardHeader>

                <CardContent className="mt-6">
                    {/* Google Button */}
                    <Button
                        variant="ghost"
                        className="flex items-center justify-center gap-3 bg-white text-black border border-gray-300 hover:bg-gray-100 transition font-semibold text-base py-3 rounded-lg w-full shadow-sm"
                    >
                        <img
                            src="https://www.citypng.com/public/uploads/preview/google-logo-icon-gsuite-hd-701751694791470gzbayltphh.png"
                            alt="Google Logo"
                            className="h-5 w-5"
                        />
                        Sign in with Google
                    </Button>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-grow border-t border-gray-600" />
                        <span className="mx-4 text-gray-400 text-sm">OR</span>
                        <div className="flex-grow border-t border-gray-600" />
                    </div>

                    {/* Form */}
                    <form className="space-y-7">
                        {/* Email */}
                        <div>
                            <Label htmlFor="email" className="text-sm mb-1 block">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className="bg-[#1e1e1e] border border-gray-700 text-white placeholder-gray-500 px-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <Label htmlFor="password" className="text-sm mb-1 block">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                className="bg-[#1e1e1e] border border-gray-700 text-white placeholder-gray-500 px-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <a
                                href="#"
                                className="absolute right-2 py-6 top-10 text-xs text-orange-500 hover:underline"
                            >
                                Forgot Password?
                            </a>
                        </div>

                        {/* Login Button */}
                        <Button onClick={handler} className=" w-full bg-orange-500 hover:bg-orange-600 transition font-bold text-white py-6 rounded-lg text-lg">
                            Login
                        </Button>
                    </form>
                </CardContent>

                {/* Footer */}
                <CardFooter className="flex justify-center mt-4">
                    <p className="text-gray-400 text-sm">
                        Don’t have an account?{" "}
                        <button
                            className="text-orange-500 hover:underline font-semibold "
                            onClick={() => {
                                onClose();           // close login
                                onOpenSignup();      // open signup
                            }}
                        >
                            Register
                        </button>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};
