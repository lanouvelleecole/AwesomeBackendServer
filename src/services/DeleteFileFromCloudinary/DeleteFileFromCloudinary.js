import cloudinary from "cloudinary";
import { RunIfPossible } from "../RunIfPossible/RunIfPossible.js";

async function DeleteFileFromCloudinary({
  publicId,
  resourceType,
  onSuccess,
  onError,
}) {
  try {
    // debugger;

    const response = await cloudinary.v2.uploader.destroy(publicId, {
      resource_type: resourceType,
      invalidate: true,
    });

    RunIfPossible({ func: onSuccess, args: response });

    return response;
  } catch (error) {
    RunIfPossible({ func: onError, args: error });

    return;
  }
}



export { DeleteFileFromCloudinary };
