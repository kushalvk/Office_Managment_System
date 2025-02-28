const bcrypt = require('bcrypt');
const UserModel = require('../models/UserSchema');
const {uploadOnCloudinary} = require("../cloudinary/Cloudinary");

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
            return res.status(400).json({message: "Please provide all required fields"});
        }

        const existingUser = await UserModel.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: "This email is already registered"});
        }

        const hashpass = await bcrypt.hash(password, 12);

        let profilePhoto = null;
        let resume = null;

        if (req?.files?.profilePhoto) {
            const profilePhotoLocalPath = req.files.profilePhoto[0].buffer;
            profilePhoto = await uploadOnCloudinary(profilePhotoLocalPath);
        }

        if (req?.files?.resume) {
            const resumeLocalPath = req.files.resume[0].buffer;
            resume = await uploadOnCloudinary(resumeLocalPath);
        } else {
            return res.status(400).json({message: "Resume file is required"});
        }

        const newUser = await UserModel.create({
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
            profilePhoto: profilePhoto ? profilePhoto.url : null,
            resume: resume.url,
        });

        res.status(201).json({message: "User added successfully", user: newUser});

    } catch (error) {
        console.error("Error in user registration:", error);
        res.status(500).json({message: "Error registering user", error});
    }
};

const loginController = async (req, res) => {
    try {
        const {username, password} = req.body;

        if (!username || !password) {
            return res.status(400).send({message: "Enter Username & Password"});
        }

        const user = await UserModel.findOne({username})

        if (!user) {
            return res.status(404).send({message: "User not found"});
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).send({message: "Your Password does't match"});
        }

        const token = await user.generateAuthToken();

        res.status(200).send({message: "User Login sucessfully", token, user})
    } catch (error) {
        res.status(500).send({message: "Error to Login User : Controller", error})
    }
}

const forgotPasswordController = async (req, res) => {
    const {email, newPassword} = req.body;

    if (!email || !newPassword) {
        return res.status(400).send({message: "Enter Email & Password"});
    }

    const user = await UserModel.findOne({email})

    if (!user) {
        return res.status(404).send({message: "User not found"});
    }

    const isMatch = await bcrypt.compare(newPassword, user.password)

    if (isMatch) {
        return res.status(400).send({message: "This is your old password please enter a new password"});
    }

    const hashpass = await bcrypt.hash(newPassword, 12);

    UserModel.findOneAndUpdate({email}, {password: hashpass})
        .then((user) => res.status(200).send({message: "Pasword Updated sucessfully"}))
        .catch((err) => res.status(500).send("Password not Updated : Controller", err))
}

const loggedUser = async (req, res) => {

    if (!req.user) {
        return res.status(404).send({message: "Token not found"});
    }

    UserModel.findOne({username: req.user.username})
        .then((user) => res.status(200).send({user}))
        .catch(() => res.status(500).send({message: "User not found"}))
}

const updateProfile = async (req, res) => {
    const {id} = req.params;
    const form = req.body;

    let profilePhoto = null;
    let resume = null;

    if (req?.files?.profilePhoto) {
        const profilePhotoLocalPath = req.files.profilePhoto[0].buffer;
        profilePhoto = await uploadOnCloudinary(profilePhotoLocalPath);
    }

    if (req?.files?.resume) {
        const resumeLocalPath = req.files.resume[0].buffer;
        resume = await uploadOnCloudinary(resumeLocalPath);
    }

    let updateData = {...form};

    if (profilePhoto) updateData.profilePhoto = profilePhoto.url;
    if (resume) updateData.resume = resume.url;

    try {
        await UserModel.findByIdAndUpdate(id, updateData);
        res.status(200).send({message: "User updated successfully"});
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).send({message: "Failed to update profile"});
    }
};

const allStaff = async (req, res) => {
    try {
        await UserModel.find()
            .then((employees) => res.status(200).send({employees}))
            .catch((err) => res.json(err))
    } catch (e) {
        res.status(500).send({message: "Error to fetch staff"});
    }
}

const deleteStaffByIdController = async (req, res) => {
    try {
        const id = req.params.id;

        await UserModel.findByIdAndDelete(id)
            .then(() => res.status(200).send({message: "Worker deleted successfully"}))
            .catch((err) => res.json(err))
    } catch (e) {
        res.status(500).send({message: "Error to delete Employee"});
    }
}

const getUserByIdController = async (req, res) => {
    try {
        const id = req.params.id;

        await UserModel.findById(id)
            .then((user) => res.status(200).send(user))
            .catch((err) => res.json(err))
    } catch (e) {
        res.status(500).send({message: "Error to View Employee"});
    }
}

const newlyAddedUserController = async (req, res) => {
    try {
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

        const users = await UserModel.find({createdAt: {$gte: twentyFourHoursAgo}});

        res.status(200).json({users});
    } catch (e) {
        res.status(500).json({message: "Error fetching users", error: e.message});
    }
};

module.exports = {
    addUserController,
    loginController,
    forgotPasswordController,
    loggedUser,
    updateProfile,
    allStaff,
    deleteStaffByIdController,
    getUserByIdController,
    newlyAddedUserController
};