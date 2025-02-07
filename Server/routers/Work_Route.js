const express = require('express')
const {addWorkController, allTasksController, taskByIdController, completeController, deleteTaskController,
    allProjectsController
} = require("../controllers/Work_Controller");

const router = express.Router()

router.post('/add-work', addWorkController)

router.get('/all-tasks', allTasksController)

router.get('/taskId/:id', taskByIdController)

router.post('/complete-ById/:id', completeController)

router.delete('/delete-task-ById/:id', deleteTaskController)

router.get('/all-projects', allProjectsController)

module.exports = router