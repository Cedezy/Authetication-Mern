import React, { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleForgot = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try{
            const response = await axios.post(
                "/auth/forgot-password",
                { email }
            );
            setMessage(response.data.message);
            navigate("/reset-password", { state: { email } });
        } 
        catch(err){
            console.log(err);
            setMessage("Error sending OTP.");
        } 
        finally{
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Forgot Password
                </h2>

                {message && (
                    <p className="mb-4 text-center p-2 rounded bg-blue-100 text-blue-700">
                        {message}
                    </p>
                )}

                <form onSubmit={handleForgot} className="flex flex-col gap-4">
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

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-lg font-semibold text-white ease-in-out duration-300 cursor-pointer 
                            ${loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`}>
                        {loading ? "Sending OTP..." : "Send OTP"}
                    </button>
                </form>

                <p className="mt-5 text-center">
                    Remember your password?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="text-blue-600 hover:underline cursor-pointer">
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
