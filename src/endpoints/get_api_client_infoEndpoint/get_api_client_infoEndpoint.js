import { _get_api_client_infoEndpoint } from "./pieces/_get_api_client_infoEndpoint/_get_api_client_infoEndpoint.js";

// Uncomment this if you want to upload a file 
//import { SetupMulter } from "./pieces/SetupMulter/SetupMulter.js";

// Set up Multer storage using diskStorage
// Uncomment this if you want to upload a file 
//const upload = SetupMulter();

// Create an endpoint named get_api_client_info
// reachable via http://localhost:<apiPort>/get_api_client_info
export function get_api_client_infoEndpoint(app, stripe) {
  // Uncomment this, and rename photo to the file's FormData's name,
  // if you want to upload a file 
  app.post("/get_api_client_info", /*upload.single("photo"),*/ async (req, res) => {
    try {
      await _get_api_client_infoEndpoint(req, res, stripe);

      return;
    } catch (error) {
      res
        .status(400)
        .send(
          "A problem occurred while trying to use the get_api_client_info endpoint: " +
          JSON.stringify(error, null, 2)
        );

      return;
    }
  });
}
