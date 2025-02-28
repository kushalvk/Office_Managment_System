const BlogNewsModel = require("../models/BlogNewsSchema");
const {uploadOnCloudinary} = require("../cloudinary/Cloudinary");

const addBlogNewsController = async (req, res) => {
    try {
        const { title, description } = req.body;

        const imageLocalPath = req?.file?.buffer;
        const image = await uploadOnCloudinary(imageLocalPath);

        await BlogNewsModel.create({ title, description, image: image.url})
            .then(() => res.status(200).json({ message: 'Blog News Successfully created!' }))
            .catch(err => res.status(500).json({ message: err.message }));
    } catch (e) {
        res.status(500).send({message: 'Error adding blog news! : Controller ', e});
    }
}

const fetchBlogNewsController = async (req, res) => {
    try {
        await BlogNewsModel.find()
            .then((blogNews) => res.status(200).json(blogNews))
            .catch(err => res.status(500).json({ message: err.message }));
    } catch (e) {
        res.status(500).send({message: 'Error to fetch blog news! : Controller ', e});
    }
}

module.exports = { addBlogNewsController, fetchBlogNewsController}