import { createCanvas, loadImage } from "canvas";
import fs from "fs";
import { getNPMFolderRoot } from "../../../getNPMFolderRoot.js";
import { getPathWithForwardSlashes } from "../GetPathWithForwardSlashes/getPathWithForwardSlashes.js";
import path from "path";

export async function MaskPhotoPieces(
  photoPath,
  pieces,
  cheesePhotoPathFromServerRoot
) {
  try {
    if (!pieces) {
      return;
    }

    // Load the original photo
    const photo = await loadImage(photoPath);

    // Create a canvas with the same dimensions as the photo
    const canvas = createCanvas(photo.width, photo.height);
    const context = canvas.getContext("2d");

    // Draw the original photo on the canvas
    context.drawImage(photo, 0, 0);

    // Create transparent holes as described by the pieces array
    for (const piece of pieces) {
      const { xOffset, yOffset, holeWidth, holeHeight } = piece;

      // Set the transparent region using the provided coordinates and dimensions
      context.clearRect(xOffset, yOffset, holeWidth, holeHeight);
    }

    // Save the modified image to the specified path
    const buffer = canvas.toBuffer("image/png");
    const cheesePhotoPath = getPathWithForwardSlashes(
      path.join(getNPMFolderRoot(), cheesePhotoPathFromServerRoot)
    );
    fs.writeFileSync(cheesePhotoPath, buffer);

    return cheesePhotoPath;
  } catch (error) {
    console.error("Error masking photo pieces:", error);

    return;
  }
}
