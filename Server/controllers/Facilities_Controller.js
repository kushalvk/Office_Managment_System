const FacilitiesModel = require("../models/FacilitiesSchema");
const {uploadOnCloudinary} = require("../cloudinary/Cloudinary");

const addFacilitiesController = async (req, res) => {
    try {
        const {title, description} = req.body;

        const imageLocalPath = req?.file?.buffer;
        const image = await uploadOnCloudinary(imageLocalPath);

        await FacilitiesModel.create({ title, description, image: image.url })
            .then(() => res.status(200).send({ message: "Facilities Added successfully" }))
            .catch(err => res.status(500).send({ message: "Fail to Add Facilities : Controller ", err}));
    } catch (error) {
        res.status(500).send({ message: "Error to Add Facilities : Controller ", error })
    }
}

const fetchAllFacilitiesController = async (req, res) => {
    try {
        await FacilitiesModel.find()
            .then((facilities) => res.status(200).send(facilities))
            .catch(err => res.status(500).send({ message: "Fail to Fetch Facilities : Controller ", err}));
    } catch (error) {
        res.status(500).send({ message: "Error to Fetch Facilities : Controller ", error })
    }
}

module.exports = {addFacilitiesController, fetchAllFacilitiesController}