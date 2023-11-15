/*import sharp from "sharp";

export async function GetPhotoDimensions(filePath) {
  try {
    const metadata = await sharp(filePath).metadata();
    const imgWidth = metadata.width;
    const imgHeight = metadata.height;
    return { imgWidth, imgHeight };
  } catch (error) {
    throw new Error("Failed to retrieve photo dimensions");
  }
}
*/