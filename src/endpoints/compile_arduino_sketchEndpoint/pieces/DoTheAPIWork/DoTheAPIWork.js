import { getNPMFolderRoot } from "../../../../../getNPMFolderRoot.js";
import { EditChatGPTArt } from "../../../../services/EditChatGPTArt/EditChatGPTArt.js";
import path from "path";
import { GetFolderForClientData } from "../../../../services/GetFolderForClientData/GetFolderForClientData.js";
import { DeleteClientFile } from "./DeleteClientFile.js";
import { Constants } from "../../../../AppConstants/Constants.js";
import { CompileArduinoSketch } from "../../../../services/CompileArduinoSketch/CompileArduinoSketch.js";
import { GetUniqueID } from "../../../../services/GetUniqueID/GetUniqueID.js";

export async function DoTheAPIWork(req) {


  const { code_string } = req.body;

  const sketchName = GetUniqueID(7);

  return new Promise((resolve, reject) => {


    CompileArduinoSketch({
      code_string,
      sketchName,
      inputsFolder: "/home/arduino/inputs",
      outputsFolder: "/home/arduino/outputs",
      onSuccess: (data) => {


        resolve({ status: 202, data: data });
      },
      onError: (e) => {


        reject({ status: 401, data: e });
      },
    });

  });
}
