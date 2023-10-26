import { getNPMFolderRoot } from "../../../../../getNPMFolderRoot.js";
import { EditChatGPTArt } from "../../../../services/EditChatGPTArt/EditChatGPTArt.js";
import path from "path";
import { GetFolderForClientData } from "../../../../services/GetFolderForClientData/GetFolderForClientData.js";
import { DeleteClientFile } from "./DeleteClientFile.js";
import { Constants } from "../../../../AppConstants/Constants.js";
import { CreateArduinoSketch } from "../../../../services/CreateArduinoSketch/CreateArduinoSketch.js";


export async function DoTheAPIWork(req) {
  //debugger;

  const { model_chosen, programDescription } = req.body;

  const apiKey = Constants.OPENAI_API_KEY;

  /*
  
  const paramsObj = params ? JSON.parse(params) : {};
  const apiKey = Constants.OPENAI_API_KEY;

  // Specify the destination subfolder where we store the files of this client
  const uploadPath = GetFolderForClientData(req);

  const photoFileInfo = req.file;

  const filePath = "/" + path.join(
    getNPMFolderRoot(),
    uploadPath,
    photoFileInfo.originalname
  );

  */

  return new Promise((resolve, reject) => {
    //debugger;



    CreateArduinoSketch({
      model_chosen,
      programDescription,
      apiKey,
      onSuccess: (data) => {
        resolve({ status: 202, data: data });
      },
      onError: (e) => {
        reject({ status: 401, data: e });
      },
    });

  });
}
