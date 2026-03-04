import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = (): React.JSX.Element => {
    return (
        <>
            <Navbar />
            <Outlet />  
        </>
    )
}

export default Layout;