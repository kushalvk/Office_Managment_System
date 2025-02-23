const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouters = require('./routers/Auth_Route');
const GroupRouters = require('./routers/Group_Route');
const WorkRouters = require('./routers/Work_Route');
const ReportRouters = require('./routers/Report_Route');
const RequrmentRouters = require('./routers/Requrment_Route');
const NotificationRouters = require('./routers/Notification_Route');
const SalaryRouters = require('./routers/Salary_Route');
const FacilitiesRouters = require('./routers/Facilities_Router');
const FAQRouters = require('./routers/FAQ_Route');
const BlogNewsRouters = require('./routers/BlogNews_Route');
require("dotenv").config();

const app = express();
const corsOptions = {
    origin: ["https://office-ms-two.vercel.app"],
    methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Auth-Token', 'Origin'],
    optionsSuccessStatus: 200
  };
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("uplodes"))

if (mongoose.connect(process.env.MONGODB_URL)) {
    console.log("Prime_Hub Database connected");
} else {
    console.log("Database not connected");
}

app.use(authRouters);

app.use(GroupRouters);

app.use(WorkRouters);

app.use(ReportRouters);

app.use(RequrmentRouters);

app.use(NotificationRouters);

app.use(SalaryRouters);

app.use(FacilitiesRouters);

app.use(FAQRouters);

app.use(BlogNewsRouters);

app.get("/", (red,res) => {
    res.json(" Hello from Prime Hub Server ! ")
})

app.listen(3001, () => {
    console.log("Prime Hub Server is runing on port number : 3001");
})