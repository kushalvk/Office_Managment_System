const bcrypt = require('bcrypt');
const UserModel = require('../models/UserSchema');

const addUser = async (req, res) => {
    try {
        const {
            fullName,
            email,
            address,
            dob,
            gender,
            mobNo,
            qualification,
            username,
            password,
            workLocation,
            department,
            role,
        } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please provide all Fields" })
        }

        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ messgae: "This email allready ragistared" })
        }

        const hashpass = await bcrypt.hash(password, 12);

        const profilePhoto = req.files["profilePhoto"] ? req.files["profilePhoto"][0].filename : null;
        const resume = req.files["resume"] ? req.files["resume"][0].filename : null;

        UserModel.create({
            fullName,
            email,
            address,
            dob,
            gender,
            mobNo,
            qualification,
            username,
            password: hashpass,
            workLocation,
            department,
            role,
            profilePhoto,
            resume
        })
            .then((user) => res.json({ message: "User Added Sucessfully", user }))
            .catch((err) => res.json(err))

    } catch (error) {
        res.status(500).send({ message: "Error to ragistered User : Controller", error })
    }
}

module.exports = { addUser }