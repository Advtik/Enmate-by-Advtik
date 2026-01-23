import {v2 as cloudinary} from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

export const uploadoncloud=async(LocalFilePath)=>{
    try{
        if(!LocalFilePath) return null;
        const response=await cloudinary.uploader.upload(LocalFilePath,{
            resource_type:"image"
        })

        console.log("File Uploaded Successfully",response.url);

        fs.unlinkSync(LocalFilePath);
        return response;
    }
    catch(error){
        fs.unlinkSync(LocalFilePath);
        return null;
    }
}
