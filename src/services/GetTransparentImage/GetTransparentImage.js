import path from "path";
import fs from "fs";
import { createCanvas } from "canvas";
import { getPathWithForwardSlashes } from "../GetPathWithForwardSlashes/getPathWithForwardSlashes.js";
import { getNPMFolderRoot } from "../../../getNPMFolderRoot.js";

export async function GetTransparentImage(width, height, pathFromServerRoot) {
  try {
    const canvas = createCanvas(width, height);
    const context = canvas.getContext("2d");

    // Set the background to transparent
    context.clearRect(0, 0, width, height);

    // Create a buffer to store the image data
    const buffer = canvas.toBuffer("image/png");

    const fullPathFromServerRoot = getPathWithForwardSlashes(
      path.join(getNPMFolderRoot(), pathFromServerRoot)
    );

    // Write the buffer to the specified path
    fs.writeFileSync(fullPathFromServerRoot, buffer);

    // Return the full path of the created image
    return fullPathFromServerRoot;
  } catch (error) {
    return;
  }
}
