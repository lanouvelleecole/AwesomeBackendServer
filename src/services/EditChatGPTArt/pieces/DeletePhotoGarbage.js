import fs from "fs";

export function DeletePhotoGarbage(transparentPhotoPath, cheesePhotoPath) {
  transparentPhotoPath &&
    fs.rm(transparentPhotoPath, () => {
      console.log(`file ${transparentPhotoPath} successfully deleted !!!`);
    });

  cheesePhotoPath &&
    fs.rm(cheesePhotoPath, () => {
      console.log(`file ${cheesePhotoPath} successfully deleted !!!`);
    });
}
