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

const uploadOnCloudinary = async (fileBuffer) => {
    return new Promise((resolve, reject) => {
        if (!fileBuffer) {
            console.log("File Buffer is missing");
            return reject("File Buffer is missing");
        }

        //     Upload the File on Cloudinary
        // Upload to Cloudinary as a stream
        const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: "auto" },
            (error, result) => {
                // error to upload a file
                if (error) {
                    console.log("Cloudinary Upload Error:", error);
                    return reject(error);
                }
                //     file has been uploaded successfully
                console.log("File uploaded successfully:", result.url);
                resolve(result);
            }
        );

        //     remove the locally save temporary file as the upload operation got failed
        // Pipe the buffer to Cloudinary
        uploadStream.end(fileBuffer);
    });
}

export {uploadOnCloudinary};