import React, { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import axios from "../api/axios";

const Home = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [logoutModal, setLogoutModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            try{
                const response = await axios.get("/auth/check", {
                    withCredentials: true
                });
                if(response.data.success){
                    setUser(response.data.user); 
                }
            } 
            catch(err){
                setUser(null, err);
            } 
            finally{
                setLoading(false);
            }
        };
        checkUser();
    }, []);

    const handleLogout = async () => {
        try{
            await axios.post("/auth/logout", {}, { 
                withCredentials: true 
            });
            setUser(null);
            navigate("/"); 
        } 
        catch(err){
            console.log("Logout failed:", err);
        }
        finally{
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-gray-600">Checking login status...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md text-center">
                {user ? (
                    <>
                        <h1 className="text-3xl font-bold mb-6 text-gray-800">
                            Welcome back, {user.firstname}!
                        </h1>
                        <p className="text-gray-600 mb-8">
                            You are logged in. Go to your dashboard to continue.
                        </p>
                        <button
                            onClick={() => setLogoutModal(true)}
                            className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                            >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <h1 className="text-3xl font-bold mb-6 text-gray-800">
                            Welcome to Our Platform
                        </h1>
                        <p className="text-gray-600 mb-8">
                            Please login or create an account to continue.
                        </p>

                        <div className="flex flex-col gap-4">
                            <Link
                                to="/login"
                                className="w-full py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition">
                                Login your account
                            </Link>

                            <Link
                                to="/signup"
                                className="w-full py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition">
                                Create an Account
                            </Link>
                        </div>
                    </>
                )}
            </div>

            {logoutModal && (
                <div className="fixed inset-0 bg-black/40 justify-center flex items-center">
                    <div className="rounded-sm bg-white p-10 w-md">
                        <div className="flex flex-col gap-6">
                            <h2 className="text-2xl text-gray-700 font-extrabold">Are you sure you want to logout?</h2>
                            <div className="flex gap-2">
                                <button onClick={() => {
                                    setLogoutModal(false)
                                    handleLogout()
                                }}
                                    className="w-full py-3 bg-red-600 text-white rounded-sm font-semibold hover:bg-red-700 cursor-pointer ease-in-out duration-300">
                                    Yes, Logout
                                </button>
                                <button onClick={() => setLogoutModal(false)}
                                    className="w-full py-3 bg-blue-600 text-white rounded-sm font-semibold hover:bg-blue-700 cursor-pointer ease-in-out duration-300">
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
