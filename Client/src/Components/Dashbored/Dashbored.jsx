import React, {useEffect, useState} from "react";
import {
    FaUsers,
    FaClipboardList,
    FaTasks,
    FaUserPlus,
    FaFileAlt,
    FaExclamationCircle,
    FaProjectDiagram
} from "react-icons/fa";
import {allStaff, newAddedUsers} from "../../Services/AuthService.js";
import {allReports, newlyReports, pendingApprovalReports} from "../../Services/ReportService.js";
import {fetchallTasks, fetchComplatedProject} from "../../Services/WorkService.js";
import { formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";

function AdminDashboard() {
    const username = localStorage.getItem("username");
    const [users, setUsers] = useState([]);
    const [reports, setReports] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);
    const [newUsers, setNewUsers] = useState([]);
    const [newReports, setNewReports] = useState([]);
    const [pendingApprovReports, setPendingApprovReports] = useState([]);

    useEffect(() => {
        const Users = async () => {
            try {
                const response = await allStaff();
                setUsers(response.employees);
            } catch (e) {
                console.log(e.message);
                toast.error(e.message);
            }
        }
        const reports = async () => {
            try {
                const response = await allReports();
                setReports(response.reports);
            } catch (e) {
                console.log(e.message);
                toast.error(e.message);
            }
        }
        const task = async () => {
            try {
                const response = await fetchallTasks();
                setTasks(response.tasks);
            } catch (e) {
                console.log(e.message);
                toast.error(e.message);
            }
        }
        const project = async () => {
            try {
                const response = await fetchComplatedProject();
                setProjects(response.projects);
            } catch (e) {
                console.log(e.message);
                toast.error(e.message);
            }
        }
        const newUsers = async () => {
            try {
                const response = await newAddedUsers();
                setNewUsers(response.users);
            } catch (e) {
                console.log(e.message);
                toast.error(e.message);
            }
        }
        const newreports = async () => {
            try {
                const response = await newlyReports();
                setNewReports(response);
            } catch (e) {
                console.log(e.message);
                toast.error(e.message);
            }
        }
        const pendingApprovereports = async () => {
            try {
                const response = await pendingApprovalReports();
                setPendingApprovReports(response);
            } catch (e) {
                console.log(e.message);
                toast.error(e.message);
            }
        }

        pendingApprovereports();
        newreports();
        newUsers();
        project();
        task();
        reports();
        Users();
    }, [])

    return (
        <div className="flex h-full bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen p-6">
            <div className="flex-1">
                {/* Header */}
                <div className="flex justify-between items-center mb-8 p-6 bg-white rounded-xl shadow-md">
                    <h1 className="text-3xl font-bold text-gray-800">Welcome, Manager {username && username}</h1>
                </div>

                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <DashboardCard title="Total Users" value={users ? users.length : 0}
                                   icon={<FaUsers className="text-blue-600"/>}
                                   bg="bg-blue-100"/>
                    <DashboardCard title="Total Reports" value={reports ? reports.length : 0}
                                   icon={<FaClipboardList className="text-green-600"/>} bg="bg-green-100"/>
                    <DashboardCard title="Total Tasks" value={tasks ? tasks.length : 0}
                                   icon={<FaTasks className="text-orange-600"/>}
                                   bg="bg-orange-100"/>
                    <DashboardCard title="Successful Projects" value={projects ? projects.length : 0}
                                   icon={<FaProjectDiagram className="text-purple-600"/>} bg="bg-purple-100"/>
                </div>

                {/* Recent Activity */}
                <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>
                    {newReports?.map((report, idx) => (
                        <ActivityItem
                            key={idx}
                            text={`User ${report.submitedBy} added a new report named ${report.title}`}
                            time={`${formatDistanceToNow(new Date(report.createdAt))} ago`}
                        />
                    ))}
                    {newUsers?.map((user, idx) => (
                        <ActivityItem
                            key={idx}
                            text={`New user registered: ${user.username}`}
                            time={`${formatDistanceToNow(new Date(user.createdAt))} ago`}
                        />
                    ))}
                    {!(newUsers && newReports) && (<div className={"flex justify-center font-bold"}>No Recent Activity</div>)}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <DashboardCard title="New Users" value={newUsers ? newUsers.length : 0}
                                   icon={<FaUserPlus className="text-indigo-600"/>}
                                   bg="bg-indigo-100"/>
                    <DashboardCard title="New Reports" value={newReports ? newReports.length : 0}
                                   icon={<FaFileAlt className="text-green-600"/>}
                                   bg="bg-green-100"/>
                    <DashboardCard title="Pending Approvals"
                                   value={pendingApprovReports ? pendingApprovReports.length : 0}
                                   icon={<FaExclamationCircle className="text-red-600"/>} bg="bg-red-100"/>
                </div>
            </div>
        </div>
    );
}

// eslint-disable-next-line react/prop-types
function DashboardCard({title, value, icon, bg}) {
    return (
        <div
            className={`${bg} p-6 rounded-xl shadow-lg flex items-center justify-between transition-transform transform hover:scale-105`}>
            <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">{title}</h3>
                <p className="text-4xl font-bold text-gray-900">{value}</p>
            </div>
            <div className="text-5xl opacity-50">{icon}</div>
        </div>
    );
}

// eslint-disable-next-line react/prop-types
function ActivityItem({text, time}) {
    return (
        <div className="flex justify-between items-center p-3 border-b last:border-none">
            <p className="text-gray-600">{text}</p>
            <span className="text-gray-500 text-sm">{time}</span>
        </div>
    );
}

export default AdminDashboard;
