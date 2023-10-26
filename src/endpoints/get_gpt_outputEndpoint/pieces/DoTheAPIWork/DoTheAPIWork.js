import { Constants } from "../../../../AppConstants/Constants.js";
import { GetChatGPTOutput } from "../../../../services/GetChatGPTOutput/GetChatGPTOutput.js";

export async function DoTheAPIWork(req) {
  const { model_chosen, prompt, params } = req.body;
  const apiKey = Constants.OPENAI_API_KEY;

  // Access the values sent in the request body
  //console.log("model_chosen:", model_chosen);
  //console.log("prompt:", prompt);
  //console.log("params:", params);

  return new Promise((resolve, reject) => {
    GetChatGPTOutput({
      model_chosen,
      prompt,
      apiKey,
      params,
      onSuccess: (data) => {
        resolve({ status: 202, data: data });
      },
      onError: (e) => {
        reject({ status: 401, data: e });
      },
    });
  });
}
