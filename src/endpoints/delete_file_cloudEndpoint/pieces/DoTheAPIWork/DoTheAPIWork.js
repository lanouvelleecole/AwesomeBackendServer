import { DeleteFileFromCloudinary } from "../../../../services/DeleteFileFromCloudinary/DeleteFileFromCloudinary.js";
import { Constants } from "../../../../AppConstants/Constants.js";

export async function DoTheAPIWork(req) {
  // debugger;

  const { publicId, resourceType, params } = req.body;

  const paramsObj = params ? JSON.parse(params) : {};
  const apiKey = Constants.cloudinary_api_key;
  const cloudName = Constants.cloudinary_cloud_name;
  const cloudSecret = Constants.cloudinary_api_secret;

  const cloudinaryConfig = {
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: cloudSecret,
  };

  return new Promise((resolve, reject) => {

    DeleteFileFromCloudinary({
      publicId,
      resourceType,
      onSuccess: (data) => {
        resolve({ status: 202, data: data });
      },
      onError: (e) => {
        reject({ status: 401, data: e });
      },
    });

    //resolve({ status: 202, data: "Requête réussie ! 🔥🌟🎇🎆✨🌠" });
  });
}
