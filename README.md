
# Hi, I'm Kushal Vaghela! 👋

 I'm a passionate web developer with expertise in **MERN Stack** (MongoDB, Express.js, React.js, Node.js). I enjoy building scalable and user-friendly web applications that enhance productivity and efficiency.

# Office Management System

### 🏢 Introduction
The Office Management System is a comprehensive MERN stack-based web application designed to streamline office operations efficiently. This system enables managers and employees to manage tasks, projects, salaries, notifications, and reports while ensuring smooth communication and workflow.

![Logo](https://res.cloudinary.com/da0lceyy7/image/upload/v1740898602/PrimeHubBlue_ugxjsp.jpg)


### 🚀 Features Implemented

#### 🔑 Authentication
- Logine
- Signup
- Forgot Password

#### 👨‍💼 Manager Side (with Sidebar)
- **Dashboard** – Overview of office activities.

- **My Staff Page** – View, add, and delete employees.

- **Assign Work** – Assign tasks and projects to employees (AI-generated descriptions).

- **Reports Managemen** – View, approve, and delete employee-submitted reports.

- **Task Management** – View, complete, delete tasks with their status (Complete/Pending).

- **Project Management** – View, complete, delete projects with their status (Complete/Pending).

- **Group Projects** – Manage employee groups working on projects (add new groups, view details).

- **Employee Requirements** – Approve or cancel requirements submitted by employees.

- **Salary Page** – Process salary payments for employees (pay, delete).

- **Profile Management** – Manage personal details, including photo and resume.

- **Notifications** – Add and delete notifications for employees.

- **Facility Page** – Display all office facilities (add new facilities).

- **Blog & News** – Post and view office-related blogs and news.

- **FAQs Page** – Maintain office-related FAQs.

- **Static Pages** – Contact Us, About Us, Photos, Policies, Privacy Policies, Terms & Conditions.

#### 👨‍💻 Employee Side (with Header)

- **Home Page**

- **Reports Management** – View and submit reports.

- **Task Management** – View assigned tasks with their status.

- **Project Management** – View assigned projects with their status.

- **Group Projects** – View and participate in public and assigned group projects.

- **Requirement Page** – Submit and update employee requirements.

- **Profile Management** – Manage personal details, including photo and resume.

- **Notifications** – View notifications from the manager.

- **Facility Page** – View office facilities.

- **Blog & News** – View office-related blogs and news submitted by the manager.

- **FAQs Page** – View office-related FAQs submitted by the manager.

- **Static Pages** – Contact Us, About Us, Photos, Policies, Privacy Policies, Terms & Conditions.
## 📁 Project Structure

### 🖥️ Frontend (React.js)
```bash
Client/
│── src/
│   ├── components/
│   │   ├── Login/
│   │   │   ├── Login.jsx
│   │   ├── Dashboard/
│   │   ├── Reports/
│   │   ├── Tasks/
│   │   ├── ... (other pages)
│   ├── services/
│   │   ├── Auth_Service.js (Handles authentication APIs)
│   │   ├── Task_Service.js (Handles task-related APIs)
│   │   ├── ... (other API services)
```

### 🛠️ Backend (Node.js, Express, MongoDB)
```bash
Server/
│── controllers/
│── models/
│── routers/
│── middleware/
│── cloudinary/ (For uploading files)
│── index.js (Main backend entry point)
```
## 🏗️ Tech Stack

**Frontend:** React.js, Tailwind CSS

**Backend:** Node.js, Express.js, MongoDB

**Authentication:** JWT (JSON Web Token)

**Cloud Storage:** Cloudinary (For file uploads)

**AI Integration:** Applied AI(Gemini) to generate work descriptions
## 🚀 Getting Started

- **Prerequisites**
Make sure you have the following installed:

- Node.js (Latest LTS version)

- MongoDB

- Cloudinary account (For media uploads)
## Installation Steps

1. Clone the repository:
```
    git clone https://github.com/Office_Management_System.git
```

2. Navigate to the project directory:

```
    cd office_management_system
```

3. Install dependencies for frontend:
```
    cd client
    npm install
```

4. Set up environment variables (```.env``` file for frontend):

    `VITE_REACT_APP_BACKEND_BASEURL`

    `VITE_REACT_APP_RAZORPAY_KEY_ID`


5. Install dependencies for backend:
```
    cd ../server
    npm install
```

6. Set up environment variables (```.env``` file for backend):

    `MONGODB_URL`

    `JWT_SECRET`

    `FRONT_URL`

    `GEMINI_API_KEY`

    `RAZORPAY_KEY_ID`

    `RAZORPAY_KEY_SECRET`

    `CLOUDINARY_CLOUD_NAME`

    `CLOUDINARY_API_KEY`
    
    `CLOUDINARY_API_SECRET`

7. Start the frontend server:
```
    npm run dev
```

8. Start the backend server:
```
    npm start
```
## API Reference

#### Get all items

```http
  GET /items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |



## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## 📧 Contact

For any queries or support, feel free to reach out at kushalvaghela2003@gmail.com
## Authors

[@Kushal Vaghela](https://github.com/kushalvk)

## Deployed Website

[See Website](https://office-ms-two.vercel.app/)

## 🔗 Links
[![GitHub](https://img.shields.io/badge/GitHub-000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/kushalvk)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/kushal-vaghela-247b942a1/)

## Thank you!