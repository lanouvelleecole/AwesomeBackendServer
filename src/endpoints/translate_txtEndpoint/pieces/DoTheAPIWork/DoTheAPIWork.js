import { Constants } from "../../../../AppConstants/Constants.js";
import { GetChatGPTOutput } from "../../../../services/GetChatGPTOutput/GetChatGPTOutput.js";
import { TranslateText } from "../../../../services/TranslateText/TranslateText.js";

export async function DoTheAPIWork(req) {
  const { model_chosen, text, language } = req.body;
  const apiKey = Constants.OPENAI_API_KEY;

  // Access the values sent in the request body
  //console.log("model_chosen:", model_chosen);
  //console.log("prompt:", prompt);
  //console.log("params:", params);

  return new Promise((resolve, reject) => {
    TranslateText({
      model_chosen,
      text,
      language,
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
