import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const AdminRoute = ({ children }) => {
    // const {user , loading} = useContext(AuthProvider);
    const { user, loading } = useContext(AuthContext)
    const location = useLocation();
    // console.log(user.email)
    // console.log(import.meta.env.VITE_adminEmail)
    if (loading) {
        return <div className="flex justify-center mt-16"><span className="loading loading-bars loading-lg mt-28 text-center"></span></div>
    }
    if (user) {
        if (user?.email == import.meta.env.VITE_adminEmail) {
            return children;
        }else{
            <Navigate to="/"></Navigate>
        }
    }
    return <Navigate state={location.pathname} to='/webadmin'></Navigate>
};


export default AdminRoute;