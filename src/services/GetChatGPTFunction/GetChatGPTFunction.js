import { OnGPTFunctionReqSuccess } from "./pieces/OnGPTFunctionReqSuccess/OnGPTFunctionReqSuccess.js";
import { GetChatGPTOutput } from "../GetChatGPTOutput/GetChatGPTOutput.js";
import { GetCodeFromChatGPTOutput } from "./GetCodeFromChatGPTOutput.js";
import path from "path";
import { GetRelativePath } from "../GetRelativePath/GetRelativePath.js";
import { printChatGPTFunctionData } from "./printChatGPTFunctionData.js";
import { getChatGPTFunctionPrompt } from "./getChatGPTFunctionPrompt.js";

async function GetChatGPTFunction({
  model_chosen = "text-davinci-003",
  functionName,
  functionLanguage,
  functionPurpose,
  functionArgs,
  functionReturnValue,
  apiKey,
  onSuccess,
  onError,
  printDebug = false,
}) {
  try {
    // Promise nous permet de pouvoir retourner les données
    // de manière asynchrone.

    const chatGPTOutput = await GetChatGPTOutput({
      /*onSuccess: (cavi) => {
        console.log(`Ca va !!!: ${cavi}`);
      },
      onError: (e) => {
        console.log(`Ca pue`);
      },*/
      model_chosen,
      prompt: getChatGPTFunctionPrompt({
        functionName,
        functionLanguage,
        functionPurpose,
        functionArgs,
        functionReturnValue,
      }),

      apiKey,
    });

    if (chatGPTOutput) {
      return OnGPTFunctionReqSuccess({
        chatGPTOutput,
        onSuccess,
      });
    } else {
      onError
        ? onError(
            "Ooops... The function generation failed, amigo... Try again soldier !"
          )
        : 42;

      return null;
    }
  } catch (error) {
    onError ? onError(JSON.stringify(error, null, 2)) : 42;

    return null;
  }
}

export { GetChatGPTFunction };
