import fs from "fs";
import path from "path";
import { getNPMFolderRoot } from "../../../getNPMFolderRoot.js";
import { getPathWithForwardSlashes } from "../GetPathWithForwardSlashes/getPathWithForwardSlashes.js";

const CreateFileFromRequest = ({ req, subfolderPath }) => {
  return new Promise((resolve, reject) => {
    // Ensure the subfolder exists, create it if necessary
    if (!fs.existsSync(subfolderPath)) {
      fs.mkdirSync(subfolderPath, { recursive: true });
    }

    // Create the file path
    const fileName = req.file.originalname;
    const filePath = path.join(subfolderPath, fileName);

    // Write the file using req.file.buffer
    fs.writeFile(filePath, req.file.buffer, (err) => {
      if (err) {
        reject(err);
      } else {
        const serverFolderRoot = getNPMFolderRoot();
        const outputFilePathRaw = path.join(serverFolderRoot, filePath);
        const outputFilePath = getPathWithForwardSlashes(outputFilePathRaw);

        resolve(outputFilePath);
      }
    });
  });
};

export { CreateFileFromRequest };
