const RequrmentsModel = require("../models/RequirmentSchema");

const addRequrmentController = async (req, res) => {
    try {
        const { name, reason, username, date } = req.body;

        RequrmentsModel.create({ name, reason, username, date })
            .then(() => res.status(200).send({message: "Requrment Added successfully"}))
            .catch((err) => res.status(500).send({message: "Fail to Add Requrment : Controller ", err}));
    } catch (error) {
        res.status(500).send({message: "Error to add Requrment : Controller ", error});
    }
}

const allRequrmentsController = async (req, res) => {
    try {
        RequrmentsModel.find()
            .then((requrments) => res.status(200).send(requrments))
            .catch((err) => res.status(500).send({message: "Fail to fetch Requrments : Controller ", err}));
    } catch (error) {
        res.status(500).send({message: "Error to fetch Requrments : Controller ", error});
    }
}

const updateRequrmentsController = async (req, res) => {
    try {
        const { id } = req.params;
        const { requrmentstatus } = req.body;

        RequrmentsModel.findByIdAndUpdate( id , {requrmentStatus: requrmentstatus})
            .then(() => res.status(200).send({message: "Requrment Update successfully"}))
            .catch((err) => res.status(500).send({message: "Fail to updtae Requrments : Controller ", err}));
    } catch (error) {
        res.status(500).send({message: "Error to updtae Requrments : Controller ", error});
    }
}

module.exports = {addRequrmentController, allRequrmentsController, updateRequrmentsController}