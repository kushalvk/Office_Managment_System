const WorkModel = require('../models/WorkSchema');

const addWorkController = async (req, res) => {
    try {
        const { completionDate, description, empoyeeName, groupName, title, worktype } = req.body;

        WorkModel.create({ completionDate, description, empoyeeName, groupName, title, worktype })
            .then(() => res.status(200).send({message: "Work Added successfully"}))
            .catch((err) => res.status(500).send({message: "Fail to Add Work : Controller ", err}));
    } catch (error) {
        res.status(500).send({message: "Error to add Work : Controller ", error});
    }
}

const allTasksController = async (req, res) => {
    try {
        WorkModel.find({ worktype: "task" })
            .then((tasks) => res.status(200).send({ tasks }))
            .catch(err => res.status(500).send({message: "Fail to fetch Task : Controller ", err}));
    } catch (error) {
        res.status(500).send({ message: "Error to Fetch Tasks : Controller ", error });
    }
}

const allProjectsController = async (req, res) => {
    try {
        WorkModel.find({ worktype: "project" })
            .then((projects) => res.status(200).send({ projects }))
            .catch(err => res.status(500).send({message: "Fail to fetch Project : Controller ", err}));
    } catch (error) {
        res.status(500).send({ message: "Error to Fetch Projects : Controller ", error });
    }
}

const taskByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        WorkModel.findById( id )
            .then((tasks) => res.status(200).send({ tasks }))
            .catch(err => res.status(500).send({message: "Fail to fetch Work : Controller ", err}));
    } catch (error) {
        res.status(500).send({ message: "Error to Fetch Task : Controller ", error });
    }
}

const completeController = async (req, res) => {
    try {
        const { id } = req.params;

        WorkModel.findByIdAndUpdate(id,{ workStatus: "complete"})
            .then((tasks) => res.status(200).send({ tasks }))
            .catch(err => res.status(500).send({message: "Fail to Complete Work : Controller ", err}));
    } catch (error) {
        res.status(500).send({ message: "Error to Complete Task : Controller ", error });
    }
}

const deleteTaskController = async (req, res) => {
    try {
        const { id } = req.params;

        WorkModel.findByIdAndDelete( id )
            .then((tasks) => res.status(200).send({ tasks }))
            .catch(err => res.status(500).send({message: "Fail to Delete Work : Controller ", err}));
    } catch (error) {
        res.status(500).send({ message: "Error to Delete Task : Controller ", error });
    }
}

module.exports = {addWorkController, allTasksController, taskByIdController, completeController, deleteTaskController, allProjectsController}