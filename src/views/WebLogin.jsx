import React, { useContext, useState } from "react";
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Swal from 'sweetalert2';
import { FiLock, FiMail } from 'react-icons/fi';
import withReactContent from 'sweetalert2-react-content';
import { AuthContext } from './../providers/AuthProvider';

const WebLogin = () => {
    const { signIn, signInWithGoogle } = useContext(AuthContext);
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const pathname = usePathname();
    const MySwal = withReactContent(Swal);
    console.log('pathname in the login page', pathname);

    const handleLogin = (e) => {
        e.preventDefault();

        signIn(email, password)
            .then((result) => {
                MySwal.fire({
                    icon: 'success',
                    title: 'Login successful!',
                    showConfirmButton: false,
                    timer: 1500
                });
                e.target.reset();
                router.push(pathname.state?.from || "/dashboard");
                
            })
            .catch((error) => {
                MySwal.fire({
                    icon: 'error',
                    title: 'Login failed',
                    text: 'Please check your Email or Password.',
                });
                console.error(error);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-500 to-yellow-600">
            <div className="flex flex-col items-center justify-center bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-4xl font-bold mb-4 text-gray-700">Login Now!</h1>
                <form onSubmit={handleLogin} className="w-full">
                    <div className="mb-4">
                        <label className="flex items-center text-gray-600">
                            <FiMail className="mr-2" />
                            <span>Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="flex items-center text-gray-600">
                            <FiLock className="mr-2" />
                            <span>Password</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="text-right mt-1">
                            <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">Forgot password?</Link>
                        </div>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300">Login</button>
                </form>
   
     
            </div>
        </div>
    );
};

export default WebLogin;
