import React, { useState } from "react";
import axios from '../api/axios'
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await axios.post('/auth/login', {
                email,
                password
            }, { withCredentials: true });
            setMessage(response.data.message); 
            setTimeout(() => {
                navigate("/home");
            }, 2000);
        } 
        catch(err){
            setMessage(err.response?.data?.message );
        } 
        finally{
            setLoading(false);
            setEmail('');
            setPassword('');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Login
                </h2>

                {message && (
                    <p className={`mb-4 text-center p-2 rounded ${
                            message.includes("successful")
                                ? "text-green-700 bg-green-100"
                                : "text-red-700 bg-red-100"
                        }`}>
                        {message}
                    </p>
                )}

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    <div className="flex justify-end">
                        <Link to='/forgot-password'
                            className="hover:underline text-red-900 cursor-pointer">
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-lg font-semibold ease-in-out duration-300 cursor-pointer 
                            ${loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"} 
                            text-white`}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                    <h2>Don't have an account? {""} 
                        <Link 
                            to="/signup" 
                            className="hover:underline text-blue-600 cursor-pointer">
                            Signup
                        </Link>
                    </h2>
                </form>
            </div>
        </div>
    );
};

export default Login;
