import { _transform_cloud_fileEndpoint } from "./pieces/_transform_cloud_fileEndpoint/_transform_cloud_fileEndpoint.js";


// Create an endpoint named transform_cloud_file
// reachable via http://localhost:<apiPort>/transform_cloud_file
export function transform_cloud_fileEndpoint(app, stripe) {
  app.post("/transform_cloud_file", async (req, res) => {
    try {
      // debugger;

      await _transform_cloud_fileEndpoint(req, res, stripe);

      return;
    } catch (error) {
      // debugger;

      res
        .status(400)
        .send(
          "A problem occurred while trying to use the transform_cloud_file endpoint: " +
          JSON.stringify(error, null, 2)
        );

      return;
    }
  });
}
