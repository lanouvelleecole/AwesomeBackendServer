import { Constants } from "../../../../AppConstants/Constants.js";
import { GetChatGPTFunction } from "../../../../services/GetChatGPTFunction/GetChatGPTFunction.js";
import { GetChatGPTOutput } from "../../../../services/GetChatGPTOutput/GetChatGPTOutput.js";

export async function DoTheAPIWork(req) {
  const {
    model_chosen,
    functionName,
    functionLanguage,
    functionPurpose,
    functionArgs,
    functionReturnValue,
    functionUsePath,
    putFunctionFolderIn,
  } = req.body;
  const apiKey = Constants.OPENAI_API_KEY;

  // Access the values sent in the request body
  //console.log("model_chosen:", model_chosen);
  //console.log("prompt:", prompt);
  //console.log("params:", params);

  return new Promise((resolve, reject) => {
    GetChatGPTFunction({
      model_chosen,
      functionName,
      functionLanguage,
      functionPurpose,
      functionArgs,
      functionReturnValue,
      functionUsePath,
      putFunctionFolderIn,
      apiKey,
      printDebug: true,

      onSuccess: (data) => {
        resolve({ status: 202, data: data });
      },
      onError: (e) => {
        reject({ status: 401, data: e });
      },
    });

    // resolve({ status: 202, data: "Hooray !!! 🔥🔥🔥🔥🔥🔥🔥🔥" });
  });
}
