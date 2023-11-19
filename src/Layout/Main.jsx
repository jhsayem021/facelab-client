import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../pages/Shared/NavBar/NavBar";



const Main = () => {
    const location = useLocation();

    
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup');

    return (
        <div>
            { noHeaderFooter || <NavBar></NavBar>}
           
            <Outlet></Outlet>
            
        </div>
    );
};

export default Main;