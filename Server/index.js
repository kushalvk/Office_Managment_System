const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouters = require('./routers/Auth_Route');
require("dotenv").config();

const app = express();
const corsOptions = {
    origin: [process.env.FRONT_URL],
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

app.get("/", (red,res) => {
    res.json(" Hello from Prime Hub Server ! ")
})

app.listen(3001, () => {
    console.log("Prime Hub Server is runing on port number : 3001");
})