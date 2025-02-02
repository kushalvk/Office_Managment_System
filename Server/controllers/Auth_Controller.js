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

const forgotPasswordController = async (req, res) => {
    const { email, newPassword } = req.body;

    if(!email || !newPassword) {
        return res.status(400).send({ message: "Enter Email & Password"});
    }

    const user = await UserModel.findOne({email})

    if (!user) {
        return res.status(404).send({ message: "User not found"});
    }

    const isMatch = await bcrypt.compare(newPassword, user.password)

    if (isMatch) {
        return res.status(400).send({ message: "This is your old password please enter a new password"});
    }

    const hashpass = await bcrypt.hash(newPassword, 12);

    UserModel.findOneAndUpdate({email}, {password: hashpass})
        .then((user) => res.status(200).send({ message: "Pasword Updated sucessfully" }))
        .catch((err) => res.status(500).send("Password not Updated : Controller", err))
}

const loggedUser = async (req, res) => {

    if (!req.user) {
        return res.status(404).send({ message: "Token not found" });
    }

    UserModel.findOne({ username: req.user.username})
        .then((user) => res.status(200).send({ user }))
        .catch(() => res.status(500).send({ message: "User not found" }))
}

const updateProfile = async (req, res) => {
    const { id } = req.params;
    const form = req.body;

    const profilePhoto = req.files?.profilePhoto?.[0]?.filename || null;
    const resume = req.files?.resume?.[0]?.filename || null;

    let updateData = { ...form };

    if (profilePhoto) updateData.profilePhoto = profilePhoto;
    if (resume) updateData.resume = resume;

    try {
        await UserModel.findByIdAndUpdate(id, updateData);
        res.status(200).send({ message: "User updated successfully" });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).send({ message: "Failed to update profile" });
    }
};

const allStaff = async (req, res) => {
    try {
        await UserModel.find()
            .then((employees) => res.status(200).send({ employees }))
            .catch((err) => res.json(err))
    } catch (e) {
        res.status(500).send({ message: "Error to fetch staff" });
    }
}

module.exports = { addUserController, loginController, forgotPasswordController, loggedUser, updateProfile, allStaff }