const FAQModel = require("../models/FAQSchema");

const addFAQController = async (req, res) => {
    try {
        const { question, answer } = req.body;

        await FAQModel.create({ question, answer })
            .then(() => res.status(200).send({ message: "FAQ Added successfully" }))
            .catch(err => res.status(500).send({ message: "Fail to Add FAQ : Controller ", err}));
    } catch (error) {
        res.status(500).send({ message: "Error to Add FAQ : Controller ", error })
    }
}

const fetchAllFaq = async (req, res) => {
    try {
        await FAQModel.find()
            .then((faq) => res.status(200).send(faq))
            .catch(err => res.status(500).send({ message: "Fail to Fetch FAQ : Controller ", err}));
    } catch (error) {
        res.status(500).send({ message: "Error to Fetch FAQ : Controller ", error })
    }
}

module.exports = {addFAQController, fetchAllFaq}