import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Advertisement1 from "./components/Advertisement/Advertisement1";
const Root = () => {
    return (
        <div>
            <div className="mx-auto">
                <Navbar />
            </div>
            {/* Dynamic section */}
            <div>
                <Outlet />
            </div>
            <div>
                <Footer />
            </div>
            <Advertisement1 /> 
        </div>
    );
};

export default Root;