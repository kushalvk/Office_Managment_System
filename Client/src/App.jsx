import { Outlet } from "react-router-dom";
import Header from "./Components/Header/Header.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Sidebar from "./Components/Header/Sidebar.jsx";
import {useEffect, useState} from "react";
import {loggedUser} from "./Services/AuthService.js";
import {Toaster} from "react-hot-toast";

function App() {

    const [loggedin, setLoggedin] = useState(null);

    useEffect(() => {
        const logged = async () => {
            try {
                setLoggedin(await loggedUser());
            } catch (e) {
                console.log(e.message);
                setLoggedin(null);
            }
        }
        logged();
    }, [])

    return (
        <>
            <div className={`${loggedin?.role === "Manager" ? "flex" : "block"} min-h-screen w-full bg-white`}>
                {loggedin?.role === "Manager" ? <Sidebar /> : <Header />}
                <main className="flex-1">
                    <Toaster />
                    <Outlet />
                </main>
            </div>
            <Footer />
        </>
    );
}

export default App;