import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "../providers/AuthProvider";
import { useCallback, useContext, useMemo } from "react";
import Swal from "sweetalert2";
import _ from "lodash"; // Import lodash for debounce function
import { toast } from "react-toastify";

const axiosSecure = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
});

function UseAxiosSecure() {
  const router = useRouter();
  const { user, logOut } = useContext(AuthContext);

  // Debounced logout function
  const handleLogOut = useCallback(
    _.debounce(() => {
      logOut()
        .then(() => {
          toast.success("Logged Out");

          router.push("/");
        })
        .catch((error) => {
          toast.error("Logout Failed");

          console.error(error);
        });
    }, 3000), // Adjust the debounce delay as needed
    []
  );

  axiosSecure.interceptors.request.use(
    function (config) {
      config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      const status = error?.response?.status;
      if (status === 401 || status === 403) {
        handleLogOut();
        return Promise.reject(error);
      }
    }
  );

  return axiosSecure;
}

export default UseAxiosSecure;
