import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Home from "./Components/Home/Home.jsx";
import Login from "./Components/Login/Login.jsx";
import Add_User from './Components/Add User/Add_User.jsx';
import Add_Group from './Components/Group/AddGroup.jsx';
import Notification from './Components/Notification/Notification.jsx';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/adduser' element={<Add_User/>}/>
            <Route path='/addgroup' element={<Add_Group/>}/>
            <Route path='/notification' element={<Notification/>}/>

        </Route>
    )
)

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
