const WorkModel = require('../models/WorkSchema');
const GroupModel = require('../models/GroupSchema');
const {GoogleGenerativeAI} = require("@google/generative-ai");

const addWorkController = async (req, res) => {
    try {
        const {completionDate, description, empoyeeName, groupName, title, worktype} = req.body;

        WorkModel.create({completionDate, description, empoyeeName, groupName, title, worktype})
            .then(() => res.status(200).send({message: "Work Added successfully"}))
            .catch((err) => res.status(500).send({message: "Fail to Add Work : Controller ", err}));
    } catch (error) {
        res.status(500).send({message: "Error to add Work : Controller ", error});
    }
}

const allTasksController = async (req, res) => {
    try {
        WorkModel.find({worktype: "task"})
            .then((tasks) => res.status(200).send({tasks}))
            .catch(err => res.status(500).send({message: "Fail to fetch Task : Controller ", err}));
    } catch (error) {
        res.status(500).send({message: "Error to Fetch Tasks : Controller ", error});
    }
}

const allProjectsController = async (req, res) => {
    try {
        WorkModel.find({worktype: "project"})
            .then((projects) => res.status(200).send({projects}))
            .catch(err => res.status(500).send({message: "Fail to fetch Project : Controller ", err}));
    } catch (error) {
        res.status(500).send({message: "Error to Fetch Projects : Controller ", error});
    }
}

const taskByIdController = async (req, res) => {
    try {
        const {id} = req.params;

        WorkModel.findById(id)
            .then((tasks) => res.status(200).send({tasks}))
            .catch(err => res.status(500).send({message: "Fail to fetch Work : Controller ", err}));
    } catch (error) {
        res.status(500).send({message: "Error to Fetch Task : Controller ", error});
    }
}

const completeController = async (req, res) => {
    try {
        const {id} = req.params;

        WorkModel.findByIdAndUpdate(id, {workStatus: "complete"})
            .then((tasks) => res.status(200).send({tasks}))
            .catch(err => res.status(500).send({message: "Fail to Complete Work : Controller ", err}));
    } catch (error) {
        res.status(500).send({message: "Error to Complete Task : Controller ", error});
    }
}

const deleteWorkController = async (req, res) => {
    try {
        const {id} = req.params;

        WorkModel.findByIdAndDelete(id)
            .then((tasks) => res.status(200).send({tasks}))
            .catch(err => res.status(500).send({message: "Fail to Delete Work : Controller ", err}));
    } catch (error) {
        res.status(500).send({message: "Error to Delete Task : Controller ", error});
    }
}

const employeeProjectsController = async (req, res) => {
    try {
        const {username} = req.query;
        const groups = await GroupModel.find({members: username}).select("groupName");
        const groupNames = groups.map(group => group.groupName);

        const projects = await WorkModel.find({
            worktype: "project",
            $or: [
                {groupName: {$in: groupNames}},
                {empoyeeName: {$in: [username]}}
            ]
        });

        res.status(200).send({projects});
    } catch (error) {
        res.status(500).send({message: "Error to Fetch Tasks : Controller ", error});
    }
}

const employeeTasksController = async (req, res) => {
    try {
        const {username} = req.query;

        const tasks = await WorkModel.find({
            worktype: "task",
            empoyeeName: {$in: [username]}
        });

        res.status(200).send({tasks});
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).send({message: "Error fetching tasks", error});
    }
};

const complatedProjectController = async (req, res) => {
    try {

        const projects = await WorkModel.find({
            worktype: "project",
            workStatus: "complete"
        });

        res.status(200).send({projects});
    } catch (error) {
        console.error("Error fetching project:", error);
        res.status(500).send({message: "Error fetching project", error});
    }
};

const updateWorkController = async (req, res) => {
    try {
        const {id} = req.params;
        const {title, description, completionDate} = req.body;

        await WorkModel.findByIdAndUpdate(id, {title, description, completionDate});
        res.status(200).send({ message: "Work updated successfully" });
    } catch (error) {
        console.error("Error fetching project:", error);
        res.status(500).send({message: "Error fetching project", error});
    }
};

const generateDescriptionController = async (req, res) => {
    const {title} = req.body;
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({model: "gemini-2.0-flash"});
    const prompt = `Generate a short and clear task description for: "${title}"`;

    if (!title) {
        return res.status(400).json({error: "Title is required!"});
    }

    try {
        const result = await model.generateContent(prompt);
        const generatedText = result.response.text() || "No description generated.";

        res.json({description: generatedText});
    } catch (error) {
        console.error("Error generating description:", error?.response?.data || error.message);
        res.status(500).json({error: "Failed to generate description. Try again later."});
    }
};

module.exports = {
    addWorkController,
    allTasksController,
    taskByIdController,
    completeController,
    deleteWorkController,
    allProjectsController,
    employeeTasksController,
    employeeProjectsController,
    complatedProjectController,
    updateWorkController,
    generateDescriptionController
}