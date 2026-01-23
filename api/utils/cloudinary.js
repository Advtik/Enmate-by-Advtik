import {v2 as cloudinary} from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

if(process.env.NODE_ENV !== "production"){
    dotenv.config();
}

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

export const uploadoncloud=async(LocalFilePath)=>{
    try{
        if(!LocalFilePath) return null;

        const response=await cloudinary.uploader.upload(LocalFilePath,{
            resource_type:"auto"
        });

        if(fs.existsSync(LocalFilePath)){
            fs.unlinkSync(LocalFilePath);
        }

        return response;
    }
    catch(error){
        if(fs.existsSync(LocalFilePath)){
            fs.unlinkSync(LocalFilePath);
        }
        console.error("Cloudinary upload failed:",error);
        return null;
    }
};
