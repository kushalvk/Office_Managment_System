import './App.css'
import {Outlet} from "react-router-dom";
import Header from "./Components/Header/Header.jsx";
import Footer from "./Components/Footer/Footer.jsx";

function App() {

    return (
        <>
            <div className='h-full w-full block bg-white'>
                <Header/>
                <main>
                    <Outlet/>
                </main>
                <Footer/>
            </div>
        </>
    )
}

export default App
