const express = require('express')
const {
    addWorkController, allTasksController, taskByIdController, completeController,
    allProjectsController, employeeTasksController, employeeProjectsController, generateDescriptionController,
    deleteWorkController
} = require("../controllers/Work_Controller");

const router = express.Router()

router.post('/add-work', addWorkController)

router.get('/all-tasks', allTasksController)

router.get('/taskId/:id', taskByIdController)

router.post('/complete-ById/:id', completeController)

router.delete('/delete-work-ById/:id', deleteWorkController)

router.get('/all-projects', allProjectsController)

router.get('/employee-tasks', employeeTasksController)

router.get('/employee-projects', employeeProjectsController)

router.post('/generate-description', generateDescriptionController)

module.exports = router