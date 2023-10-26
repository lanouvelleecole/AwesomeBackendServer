import { _upload_file_cloudEndpoint } from "./pieces/_upload_file_cloudEndpoint/_upload_file_cloudEndpoint.js";

import { SetupMulter } from "./pieces/SetupMulter/SetupMulter.js";

// Set up Multer storage using diskStorage
const upload = SetupMulter();

// Create an endpoint named upload_file_cloud
// reachable via http://localhost:<apiPort>/upload_file_cloud
export function upload_file_cloudEndpoint(app, stripe) {
  app.post(
    "/upload_file_cloud",
    upload.single("cloud_file"),
    async (req, res) => {
      try {
        // debugger;

        await _upload_file_cloudEndpoint(req, res, stripe);

        return;
      } catch (error) {
        // debugger;

        res
          .status(400)
          .send(
            "A problem occurred while trying to use the upload_file_cloud endpoint: " +
            JSON.stringify(error, null, 2)
          );

        return;
      }
    }
  );
}
