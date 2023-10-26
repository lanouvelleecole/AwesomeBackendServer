import cloudinary from "cloudinary";

export function InitCloudinary({ cloud_name, api_key, api_secret }) {
    cloudinary.v2.config({
        cloud_name,
        api_key,
        api_secret,
        secure: true
    });
}

