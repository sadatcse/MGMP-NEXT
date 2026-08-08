import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "../providers/AuthProvider";
import { useContext, useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "/api",
});

function UseAxiosSecure() {
  const router = useRouter();
  const { logOut } = useContext(AuthContext);

  useEffect(() => {
    // Request interceptor
    const reqInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("token");
          if (token) {
            config.headers.authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
          try {
            await logOut();
          } catch (e) {
            // Ignore logout errors
          }
          if (typeof window !== "undefined") {
            router.push("/webadmin");
          }
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on component unmount
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [logOut, router]);

  return axiosSecure;
}

export default UseAxiosSecure;
