import {v2 as cloudinary} from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.log("File Path is missing");
        }

        //     Upload the File on Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        //     file has been uploaded successfully
        console.log("File uploaded successfully on cloudinary.", response.url);

        //     remove the locally save temporary file as the upload operation got failed
        fs.unlinkSync(localFilePath);

        return response;
    } catch (error) {
        console.log(error);
        fs.unlinkSync(localFilePath);
        return null;
    }
}

export {uploadOnCloudinary};