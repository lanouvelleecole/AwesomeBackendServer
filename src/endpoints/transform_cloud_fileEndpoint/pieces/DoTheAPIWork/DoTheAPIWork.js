import { getNPMFolderRoot } from "../../../../../getNPMFolderRoot.js";
import { EditChatGPTArt } from "../../../../services/EditChatGPTArt/EditChatGPTArt.js";
import path from "path";
import { GetFolderForClientData } from "../../../../services/GetFolderForClientData/GetFolderForClientData.js";
import { DeleteClientFile } from "./DeleteClientFile.js";
import { TransformCloudFile } from "../../../../services/TransformCloudFile/TransformCloudFile.js";
import { Constants } from "../../../../AppConstants/Constants.js";

export async function DoTheAPIWork(req) {

  // debugger;

  const { publicId, transformations, deliveryType, assetType, version, fileExtension } = req.body;

  const apiKey = Constants.cloudinary_api_key;
  const cloudName = Constants.cloudinary_cloud_name;



  return new Promise((resolve, reject) => {
    // debugger;

    TransformCloudFile({
      publicId,
      transformations,
      deliveryType,
      assetType,
      version,
      fileExtension,
      apiKey,
      cloudName,
      onSuccess: (data) => {

        resolve({ status: 202, data: data });
      },
      onError: (e) => {

        reject({ status: 401, data: e });
      },
    });

  });

}
