const bcrypt = require('bcrypt');
const UserModel = require('../models/UserSchema');

const addUserController = async (req, res) => {
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

const loginController = async (req, res) => {
    try {
        const { username, password } = req.body;

        if(!username || !password) {
            return res.status(400).send({ message: "Enter Username & Password"});
        }

        const user = await UserModel.findOne({username})

        if (!user) {
            return res.status(404).send({ message: "User not found"});
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).send({ message: "Your Password does't match"});
        }

        const token = await user.generateAuthToken();

        res.status(200).send({ message: "User Login sucessfully", token, user})
    } catch (error) {
        res.status(500).send({ message: "Error to Login User : Controller", error })
    }
}

module.exports = { addUserController, loginController }