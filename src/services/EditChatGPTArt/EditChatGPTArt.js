/*import { Configuration, OpenAIApi } from "openai";
import fs from "fs";
import { GetUniqueID } from "../GetUniqueID/GetUniqueID.js";
import { GetClientAPIKey } from "../GetFolderForClientData/GetFolderForClientData.js";
import { GetTransparentImage } from "../GetTransparentImage/GetTransparentImage.js";
import { MaskPhotoPieces } from "../MaskPhotoPieces/MaskPhotoPieces.js";
import { GetPhotoDimensions } from "../GetPhotoDimensions/GetPhotoDimensions.js";
import { DeletePhotoGarbage } from "./pieces/DeletePhotoGarbage.js";
*/
// Use the fs module here

async function EditChatGPTArt({
  filePath,
  req,
  model_chosen = "dall-e-2",
  prompt,
  onSuccess,
  onError,
  apiKey,
  params,
  print = true,
}) {
  /*
  try {
    let image_url;

    if (model_chosen == "dall-e-2") {
      image_url = await EditArtUsingDallE({
        apiKey,
        prompt,
        params,
        filePath,
        req,
      });
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
  }*/
}

async function EditArtUsingDallE({ apiKey, prompt, params, filePath, req }) {
  /*let transparentPhotoPath, defaultTransparentPhotoPath, cheesePhotoPath;

  try {
    const configuration = new Configuration({
      apiKey: apiKey,
    });
    const openai = new OpenAIApi(configuration);

    // Example usage
    const fileDims = await GetPhotoDimensions(filePath);
    const width = fileDims.imgWidth;
    const height = fileDims.imgHeight;
    const imgMaskHoles = params.imgMaskHoles;
    const defaultImagePathFromServerRoot = `./uploads/images/${GetClientAPIKey(
      req
    )}/default_mask_${GetUniqueID()}.png`;

    const defaultTransparentPhotoPath = await GetTransparentImage(
      width,
      height,
      defaultImagePathFromServerRoot
    );
    const cheesePhotoPathFromServerRoot = `./uploads/images/${GetClientAPIKey(
      req
    )}/cheese_mask_${GetUniqueID()}.png`;
    cheesePhotoPath = await MaskPhotoPieces(
      filePath,
      imgMaskHoles,
      cheesePhotoPathFromServerRoot
    );

    transparentPhotoPath = cheesePhotoPath ?? defaultTransparentPhotoPath;

    if (!transparentPhotoPath) {
      return;
    }

    const fileStream = fs.createReadStream(filePath);

    const transparentPhotoMaskStream =
      fs.createReadStream(transparentPhotoPath);

    const response = await openai.createImageEdit(
      fileStream,
      prompt,
      transparentPhotoMaskStream,
      1,
      `${width}x${height}`
    );
    const image_url = response.data.data[0].url;

    //const folder_to_be_deleted = path.dirname(defaultTransparentPhotoPath);

    DeletePhotoGarbage(defaultTransparentPhotoPath, cheesePhotoPath);

    return image_url;
  } catch (error) {
    DeletePhotoGarbage(defaultTransparentPhotoPath, cheesePhotoPath);

    return;
  }
  */
}

export { EditChatGPTArt };
