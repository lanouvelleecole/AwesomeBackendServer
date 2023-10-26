import { getNPMFolderRoot } from "../../../../../getNPMFolderRoot.js";
import { EditChatGPTArt } from "../../../../services/EditChatGPTArt/EditChatGPTArt.js";
import path from "path";
import { GetFolderForClientData } from "../../../../services/GetFolderForClientData/GetFolderForClientData.js";
import { DeleteClientFile } from "./DeleteClientFile.js";
import { Constants } from "../../../../AppConstants/Constants.js";
import { UploadFileToCloudinary } from "../../../../services/UploadFileToCloudinary/UploadFileToCloudinary.js";

export async function DoTheAPIWork(req) {
  const { resourceType } = req.body;
  // debugger;

  //const paramsObj = params ? JSON.parse(params) : {};
  const apiKey = Constants.cloudinary_api_key;
  const cloudName = Constants.cloudinary_cloud_name;
  const uploadPreset = Constants.cloudinary_upload_preset;
  const apiSecret = Constants.cloudinary_api_secret;

  // the client file path
  const uploadPath = GetFolderForClientData(req);
  const fileInfo = req.file;
  // ubuntu makes distinction btwin /path and path
  const filePath = "/" + path.join(
    getNPMFolderRoot(),
    uploadPath,
    fileInfo.originalname
  );

  return new Promise((resolve, reject) => {
    UploadFileToCloudinary({
      filePath,
      uploadPreset,
      resourceType,
      onSuccess: (data) => {
        // debugger;

        DeleteClientFile(filePath);

        resolve({ status: 202, data: data });
      },
      onError: (e) => {
        // debugger;

        DeleteClientFile(filePath);

        reject({ status: 401, data: e });
      },
    });

    //resolve({ status: 202, data: "Requête réussie ! 🔥🌟🎇🎆✨🌠" });
  });
}
