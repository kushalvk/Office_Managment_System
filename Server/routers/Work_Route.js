const express = require('express')
const {
    addWorkController, allTasksController, taskByIdController, completeController,
    allProjectsController, employeeTasksController, employeeProjectsController, generateDescriptionController,
    deleteWorkController, complatedProjectController, updateWorkController
} = require("../controllers/Work_Controller");

const router = express.Router()

router.post('/add-work', addWorkController);

router.get('/all-tasks', allTasksController);

router.get('/taskId/:id', taskByIdController);

router.post('/complete-ById/:id', completeController);

router.delete('/delete-work-ById/:id', deleteWorkController);

router.get('/all-projects', allProjectsController);

router.get('/employee-tasks', employeeTasksController);

router.get('/employee-projects', employeeProjectsController);

router.get('/complate-projects', complatedProjectController);

router.post('/update-work/:id', updateWorkController);

router.post('/generate-description', generateDescriptionController);

module.exports = router