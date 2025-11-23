import React, { useState } from "react";
import axios from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
    const [message, setMessage] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        province: "",
        city: "",
        barangay: "",
        street: "",
        phone: "",
        birthdate: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        try{
            const response = await axios.post("/auth/signup", form, { 
                withCredentials: true 
            });
            console.log("Signup response:", response);
            setMessage(response.data.message);
            setOtpSent(true);
        } 
        catch(err){
            setMessage(err.response?.data?.message);
        }
        finally{
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post("/auth/verify-otp", { 
                email: form.email, signupOtp: otp 
            });
            setMessage(res.data.message);
            setOtpSent(false);
            navigate("/login");
           
        } 
        catch(err){
            setMessage(err.response?.data?.message);
        }
    };

    const handleResendOtp = async () => {
        const emailToUse = form.email; 
        if(!emailToUse){
            return setMessage("Missing email. Go back and try again.");
        } 
        setResendLoading(true);
        setMessage("");

        try{
            const response = await axios.post("/auth/resend-otp", { 
                email: emailToUse 
            });
            setMessage(response.data.message);
        } 
        catch(err){
            setMessage(err.response?.data?.message);
        } 
        finally{
            setResendLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
            <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-2xl">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    {otpSent ? "Verify OTP" : "Sign Up"}
                </h2>

                {!otpSent ? (
                    <form onSubmit={handleSignup} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.keys(form).map((field) => (
                            <div key={field}>
                                <label className="block text-gray-700 mb-1 capitalize">{field}</label>
                                <input
                                    type={field === "password" ? "password" : field === "birthdate" ? "date" : "text"}
                                    name={field}
                                    value={form[field]}
                                    onChange={handleChange}
                                    placeholder={`Enter ${field}`}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                                    required
                                />
                            </div>
                        ))}

                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 ease-in-out duration-300 cursor-pointer">
                                {loading ? "Sign up..." : "Signup"}
                            </button>
                        </div>
                        <h2>Already have an account? {""} 
                             <Link 
                                to="/login" 
                                className="hover:underline text-blue-600 cursor-pointer">
                                Login
                            </Link>
                        </h2>
                    </form>
                ) : (
                    <div>
                        <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
                            {message && (
                                <p className="text-center mt-4 text-red-500 font-medium">
                                    {message}
                                </p>
                            )}
                            <div>
                                <label className="block text-gray-700 mb-1">Enter OTP</label>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter OTP sent to your email"
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                                    required
                                />
                            </div>
                            <button type="submit"
                                className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 ease-in-out duration-300 cursor-pointer">
                                {loading ? "Verifying..." : "Verify OTP"}
                            </button>
                        </form>
                        <p className="mt-4 text-center text-sm text-gray-600">
                            Didn't receive the OTP?{" "}
                            <span
                                onClick={resendLoading ? null : handleResendOtp}
                                className={`text-blue-600 hover:underline cursor-pointer ${
                                    resendLoading ? "text-gray-400 cursor-not-allowed" : ""
                                }`}>
                                {resendLoading ? "Resending..." : "Resend OTP"}
                            </span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Signup;
