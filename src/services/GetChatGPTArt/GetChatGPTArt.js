import I18n from "i18n-js";

import { Configuration, OpenAIApi } from "openai";
import { Constants } from "../../AppConstants/Constants.js";
import { GetPromptTokensLength } from "../GetPromptTokensLength/GetPromptTokensLength.js";

async function GetChatGPTArt({
  model_chosen = "dall-e-2",
  prompt,
  onSuccess,
  onError,
  apiKey,
  params,
  print = true,
}) {
  try {
    let image_url;

    if (model_chosen == "dall-e-2") {
      image_url = await GetArtFromDallE(apiKey, prompt, params);
    }

    if (image_url) {
      onSuccess ? onSuccess(image_url) : 42;

      return image_url;
    } else {
      throw new Error(`GPT Art Request failed`);
    }
  } catch (error) {
    if (error.response) {
      onError != null ? onError(error.response.data) : 42;
    } else {
      onError != null ? onError(error.message) : 42;
    }

    return null;
  }
}

async function GetArtFromDallE(apiKey, prompt, params) {
  const configuration = new Configuration({
    apiKey: apiKey,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createImage({
    prompt,
    n: 1,
    size: `${params.imgWidth}x${params.imgHeight}`,
  });
  const image_url = response?.data?.data[0]?.url;
  return image_url;
}

export { GetChatGPTArt };
