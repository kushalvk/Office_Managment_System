import React, { useEffect, useState } from "react";
import {
    FaUsers,
    FaClipboardList,
    FaTasks,
    FaUserPlus,
    FaFileAlt,
    FaExclamationCircle,
    FaProjectDiagram,
} from "react-icons/fa";
import { allStaff, newAddedUsers } from "../../Services/AuthService.js";
import { allReports, newlyReports, pendingApprovalReports } from "../../Services/ReportService.js";
import { fetchallTasks, fetchComplatedProject } from "../../Services/WorkService.js";
import { formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";
import {pastAttendanceData} from "../../Services/Attendance.js";

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
        const fetchData = async () => {
            try {
                const [usersRes, reportsRes, tasksRes, projectsRes, newUsersRes, newReportsRes, pendingReportsRes] =
                    await Promise.all([
                        allStaff(),
                        allReports(),
                        fetchallTasks(),
                        fetchComplatedProject(),
                        newAddedUsers(),
                        newlyReports(),
                        pendingApprovalReports(),
                    ]);
                setUsers(usersRes.employees);
                setReports(reportsRes.reports);
                setTasks(tasksRes.tasks);
                setProjects(projectsRes.projects);
                setNewUsers(newUsersRes.users);
                setNewReports(newReportsRes);
                setPendingApprovReports(pendingReportsRes);
            } catch (e) {
                console.log(e.message);
                toast.error(e.message);
            }
        };
        fetchData();

        const oldAtendances = async () => {
            try {
                await pastAttendanceData();
            } catch (e) {
                console.log(e)
            }
        }
        oldAtendances();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">

            <div className="max-w-6xl mx-auto mb-8">
                <div className="bg-white p-6 rounded-xl shadow-lg flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-800 animate-fade-in">
                        Welcome, Manager {username || "Guest"}
                    </h1>
                </div>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <DashboardCard
                    title="Total Users"
                    value={users?.length || 0}
                    icon={<FaUsers className="text-blue-600" />}
                    gradient="from-blue-100 to-blue-200"
                />
                <DashboardCard
                    title="Total Reports"
                    value={reports?.length || 0}
                    icon={<FaClipboardList className="text-green-600" />}
                    gradient="from-green-100 to-green-200"
                />
                <DashboardCard
                    title="Total Tasks"
                    value={tasks?.length || 0}
                    icon={<FaTasks className="text-orange-600" />}
                    gradient="from-orange-100 to-orange-200"
                />
                <DashboardCard
                    title="Successful Projects"
                    value={projects?.length || 0}
                    icon={<FaProjectDiagram className="text-purple-600" />}
                    gradient="from-purple-100 to-purple-200"
                />
            </div>

            <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-lg mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>
                {newReports?.length > 0 || newUsers?.length > 0 ? (
                    <div className="space-y-3">
                        {newReports?.map((report, idx) => (
                            <ActivityItem
                                key={idx}
                                text={`User ${report.submitedBy} added a new report: ${report.title}`}
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
                    </div>
                ) : (
                    <div className="flex justify-center text-gray-500 font-semibold py-4">
                        No Recent Activity
                    </div>
                )}
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <DashboardCard
                    title="New Users"
                    value={newUsers?.length || 0}
                    icon={<FaUserPlus className="text-indigo-600" />}
                    gradient="from-indigo-100 to-indigo-200"
                />
                <DashboardCard
                    title="New Reports"
                    value={newReports?.length || 0}
                    icon={<FaFileAlt className="text-green-600" />}
                    gradient="from-green-100 to-green-200"
                />
                <DashboardCard
                    title="Pending Approvals"
                    value={pendingApprovReports?.length || 0}
                    icon={<FaExclamationCircle className="text-red-600" />}
                    gradient="from-red-100 to-red-200"
                />
            </div>
        </div>
    );
}

// eslint-disable-next-line react/prop-types
function DashboardCard({ title, value, icon, gradient }) {
    return (
        <div
            className={`bg-gradient-to-br ${gradient} p-6 rounded-xl shadow-md flex items-center justify-between transition-transform duration-300 hover:scale-105 hover:shadow-lg`}
        >
            <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-1">{title}</h3>
                <p className="text-3xl font-bold text-gray-900">{value}</p>
            </div>
            <div className="text-4xl opacity-70">{icon}</div>
        </div>
    );
}

// eslint-disable-next-line react/prop-types
function ActivityItem({ text, time }) {
    return (
        <div className="flex justify-between items-center p-3 border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors">
            <p className="text-gray-600 text-sm">{text}</p>
            <span className="text-gray-500 text-xs">{time}</span>
        </div>
    );
}

export default AdminDashboard;