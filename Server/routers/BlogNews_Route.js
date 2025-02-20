const express = require('express')
const {addBlogNewsController, fetchBlogNewsController} = require("../controllers/BlogNews_Controller");
const { default: upload } = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.post('/add-blognews', upload.single('image'), addBlogNewsController);

router.get('/all-blognews', fetchBlogNewsController);

module.exports = router