import cloudinary from "cloudinary";
import { RunIfPossible } from "../RunIfPossible/RunIfPossible.js";

async function UploadFileToCloudinary({
  filePath,
  uploadPreset,
  resourceType,
  onSuccess,
  onError,
}) {
  try {
    // debugger;

    const cloud_name = cloudinary.v2.config().cloud_name;

    const response = await cloudinary.v2.uploader.upload(filePath, {
      resource_type: resourceType,
    });

    RunIfPossible({ func: onSuccess, args: response });

    return response;
  } catch (error) {
    RunIfPossible({ func: onError, args: error });

    return;
  }
}

export { UploadFileToCloudinary };
