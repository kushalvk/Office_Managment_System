import { Outlet } from "react-router-dom";
import Header from "./Components/Header/Header.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Sidebar from "./Components/Header/Sidebar.jsx";

function App() {
    const role = localStorage.getItem("role");

    return (
        <>
            <div className={`${role === "Manager" ? "flex" : "block"} min-h-screen w-full bg-white`}>
                {role === "Manager" ? <Sidebar /> : <Header />}
                <main className="flex-1">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </>
    );
}

export default App;