import React from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {

  const username = localStorage.getItem("username");

  return (
    <div className="flex h-full bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Welcome, Manager {username && username} </h1>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Card 1 - Users */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">Total Users</h3>
            <p className="text-4xl font-bold text-blue-600">1,234</p>
          </div>

          {/* Card 2 - Reports */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">Total Reports</h3>
            <p className="text-4xl font-bold text-green-600">56</p>
          </div>

          {/* Card 3 - Active Tasks */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">Active Tasks</h3>
            <p className="text-4xl font-bold text-orange-600">12</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-gray-600">User John Doe added a new report</p>
              <span className="text-gray-500 text-sm">10 mins ago</span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-600">Report 2024-01-01 approved by Admin</p>
              <span className="text-gray-500 text-sm">1 hour ago</span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-600">New user registered: Jane Smith</p>
              <span className="text-gray-500 text-sm">2 hours ago</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">New Users</h3>
            <p className="text-2xl font-bold text-indigo-600">50</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">New Reports</h3>
            <p className="text-2xl font-bold text-green-600">5</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">Pending Approvals</h3>
            <p className="text-2xl font-bold text-red-600">3</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
