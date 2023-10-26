import { GetCodeFromChatGPTOutput } from "../../GetCodeFromChatGPTOutput.js";
import { printChatGPTFunctionData } from "../../printChatGPTFunctionData.js";

/**
 *
 * args: functionFilePathFromAppRoot, usePathOrRoot
 *
 * return .....
 *
 * This function .......
 */
function OnGPTFunctionReqSuccess({ chatGPTOutput, onSuccess }) {
  if (onSuccess) {
    onSuccess(chatGPTOutput);
  }

  return chatGPTOutput;
}

export { OnGPTFunctionReqSuccess };
