const GroupModel = require('../models/GroupSchema');

const addGroupController = async (req, res) => {
    try {
        const form = req.body;

        await GroupModel.create({ ...form })
            .then(() => res.status(200).send({ message: "Group Added successfully" }))
            .catch(err => res.status(500).send({ message: "Fail to Add Group : Controller ", err}));
    } catch (error) {
        res.status(500).send({ message: "Error to Add Group : Controller ", error })
    }
}

const allGroupController = async (req, res) => {
    try {
        await GroupModel.find()
            .then((groups) => res.status(200).send({ message: "Group fetch successfully ", groups }))
            .catch(err => res.status(500).send({ message: "Fail to fetch groups : Controller ", err}));
    } catch (error) {
        res.status(500).send({ message: "Error to fetch All Groups : Controller", error });
    }
}

const fetchGroupByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        await GroupModel.findById( id )
            .then((group) => res.status(200).send({ message: "Group found successfully ", group }))
            .catch(error => res.status(500).send({ message: "group not found : Controller", error}));
    } catch (error) {
        res.status(500).send({ message: "Error to fetch All Groups : Controller", error });
    }
}

const deleteGroupById = async (req, res) => {
    try {
        const { id } = req.params;

        await GroupModel.findByIdAndDelete( id )
            .then(() => res.status(200).send({ message: "Group deleted successfully " }))
            .catch(err => res.status(500).send({ message: "Fail to delete Group : Controller ", err}));
    } catch (err) {
        res.status(500).send({message: "Error to Delete Group : Controller ", err});
    }
}

const updateGroupById = async (req, res) => {
    try {
        const { id } = req.params;
        const { groupName, description, groupType, groupStatus } = req.body;

        await GroupModel.findByIdAndUpdate( id , { groupName, description, groupType, groupStatus })
            .then(() => res.status(200).send({ message: "Group updated successfully " }))
            .catch(err => res.status(500).send({ message: "Fail to update Group : Controller ", err}));
    } catch (err) {
        res.status(500).send({message: "Error to update Group : Controller ", err});
    }
}

module.exports = { addGroupController, allGroupController, fetchGroupByIdController, deleteGroupById, updateGroupById };