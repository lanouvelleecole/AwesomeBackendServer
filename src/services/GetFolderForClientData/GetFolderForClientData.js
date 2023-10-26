export function GetFolderForClientData(req) {
  const { apiKey } = req.query;

  const uploadPath = `./uploads/files/${apiKey || "trashcan"}`; // Specify the destination subfolder
  return uploadPath;
}

export function GetClientAPIKey(req) {
  const { apiKey } = req.query;

  return apiKey || null;
}
