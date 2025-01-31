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
import AddNotification from './Components/Notification/Add_Notification.jsx';
import Show_All_Groups from './Components/Group/Show_Groups.jsx';
import Show_All_Task from './Components/Task/Show_All_Task.jsx';
import AddTask from './Components/Add_Work/Add_Work.jsx';
import All_Staff from './Components/All_Staff/All_Staff.jsx';
import ShowAllReports from './Components/Report/Show_all_report.jsx';
import SubmitReport from './Components/Report/Submit_report.jsx';
import AllProjects from './Components/Project/Show_All_Projects.jsx';
import AllRequirements from './Components/Requrment/All_Requirment.jsx';
import AddRequirement from './Components/Requrment/Submit_Requrment.jsx';
import SalaryPage from './Components/Sallary/Sallary.jsx';
import UserProfile from './Components/Profile/Profile.jsx';
import Facilities from './Components/Facilities/Facilities.jsx';
import BlogNews from './Components/Blog_News/Blog_News.jsx';
import AddBlogNews from './Components/Blog_News/Add_Blog_News.jsx';
import AboutUs from './Components/About_Us/About_Us.jsx';
import ContactUs from './Components/Contact_Us/Contact_Us.jsx';
import AdminDashboard from './Components/Dashbored/Dashbored.jsx';
import Photos from "./Components/Photos/Photos.jsx";
import Policies from "./Components/Polices/Policies.jsx";
import Privacy_Policies from "./Components/Privacy_Policies/Privacy_Policies.jsx";
import Terms_Condition from "./Components/Terms_Condition/Terms_Condition.jsx";
import View_Task from "./Components/Task/View_Task.jsx";
import GroupDetails from "./Components/Group/Group_Details.jsx";
import ForgotPassword from './Components/Login/Forgate_Password.jsx';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/adduser' element={<Add_User/>}/>
            <Route path='/add-group' element={<Add_Group/>}/>
            <Route path='/notification' element={<Notification/>}/>
            <Route path='/add-notification' element={<AddNotification/>}/>
            <Route path='/show-group' element={<Show_All_Groups/>}/>
            <Route path='/show-all-tasks' element={<Show_All_Task/>}/>
            <Route path='/add-work' element={<AddTask/>}/>
            <Route path='/all-staff' element={<All_Staff/>}/>
            <Route path='/all-reports' element={<ShowAllReports/>}/>
            <Route path='/submit-report' element={<SubmitReport/>}/>
            <Route path='/Show-all-project' element={<AllProjects/>}/>
            <Route path='/Show-requirment' element={<AllRequirements/>}/>
            <Route path='/submit-requrment' element={<AddRequirement/>}/>
            <Route path='/sallary' element={<SalaryPage/>}/>
            <Route path='/profile' element={<UserProfile/>}/>
            <Route path='/facilities' element={<Facilities/>}/>
            <Route path='/blognews' element={<BlogNews/>}/>
            <Route path='/addblognews' element={<AddBlogNews/>}/>
            <Route path='/aboutus' element={<AboutUs/>}/>
            <Route path='/contactus' element={<ContactUs/>}/>
            <Route path='/admindashbored' element={<AdminDashboard/>}/>
            <Route path='/photos' element={<Photos/>}/>
            <Route path='/polices' element={<Policies/>}/>
            <Route path='/privacy-polices' element={<Privacy_Policies/>}/>
            <Route path='/terms-condition' element={<Terms_Condition/>}/>
            <Route path='/view-details/:id' element={<View_Task/>}/>
            <Route path="/group-details/:id" element={<GroupDetails />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>
    )
)

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
