// pages/Signup.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup, type SignUpRequest } from "../api/auth";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        const requestData: SignUpRequest = {
            email: email,
            password: password,
            name: name,
        };

        try {
            await signup(requestData);
            toast.success("Signup successful! Please login.");
            navigate("/login");
        }

        catch (error: any) {
            if (isAxiosError(error)) {
                // Axios stores the backend response in error.response.data
                const message = error.response?.data?.message || "Signup failed";
                toast.error(message);
            } else {
                toast.error(error.response?.data?.message || "An unexpected error occurred");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 to-orange-400">
            <form className="bg-white p-8 rounded-2xl shadow-xl w-96" onSubmit={handleSignup}>
                <h1 className="text-2xl font-bold mb-6 text-center">Create Account ✨</h1>
                <input
                    type="email"
                    className="w-full mb-4 p-3 border rounded-lg"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="w-full mb-4 p-3 border rounded-lg"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    type="text"
                    className="w-full mb-4 p-3 border rounded-lg"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />


                <button className="w-full bg-pink-600 text-white p-3 rounded-lg hover:bg-pink-700 cursor-pointer">
                    Sign Up
                </button>
                <p className="text-sm text-center mt-4">
                    Already have an account? <Link to="/login" className="text-pink-600">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;