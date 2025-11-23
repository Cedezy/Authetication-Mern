import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";

const ResetPassword = () => {
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const { state } = useLocation();
    const navigate = useNavigate();
    const email = state?.email;

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if(!email){
            return setMessage("Missing email. Go back and try again.");
        } 

        if(password !== confirmPassword){
            return setMessage("Passwords do not match");
        } 

        setLoading(true);

        try{
            const response = await axios.post("/auth/reset-password", {
                email,
                resetOtp: otp,
                newPassword: password,
            });

            setMessage(response.data.message);

            if(response.data.success){
                setTimeout(() => navigate("/login"), 1500);
            }
        } 
        catch(err){
            setMessage(err.response?.data?.message);
        } 
        finally{
            setLoading(false);
        }
    };

     const handleResendOtp = async () => {
        if(!email){
            return setMessage("Missing email. Go back and try again.");
        } 

        setResendLoading(true);
        setMessage("");
        try{
            const response = await axios.post("/auth/resend-otp", { email });
            setMessage(response.data.message);
        } 
        catch(err){
            setMessage(err.response?.data?.message);
        } 
        finally {
            setResendLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>

                {message && (
                    <p className="mb-4 text-center text-red-500">{message}</p>
                )}

                <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
                    <label>OTP</label>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                        className="w-full p-3 border rounded"
                        required
                    />

                    <label>New Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter new password"
                        className="w-full p-3 border rounded"
                        required
                    />

                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        className="w-full p-3 border rounded"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-lg font-semibold text-white ease-in-out duration-300 cursor-pointer ${
                            loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                        }`}>
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Didn't receive the OTP?{" "}
                    <span
                        onClick={handleResendOtp}
                        className={`text-blue-600 hover:underline cursor-pointer ${
                            resendLoading ? "text-gray-400 cursor-not-allowed" : ""
                        }`}>
                        {resendLoading ? "Resending..." : "Resend OTP"}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default ResetPassword;
