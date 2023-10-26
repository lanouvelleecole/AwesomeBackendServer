import { _delete_file_cloudEndpoint } from "./pieces/_delete_file_cloudEndpoint/_delete_file_cloudEndpoint.js";


// Create an endpoint named delete_file_cloud
// reachable via http://localhost:<apiPort>/delete_file_cloud
export function delete_file_cloudEndpoint(app, stripe) {
  app.post("/delete_file_cloud", async (req, res) => {
    try {
      // debugger;

      await _delete_file_cloudEndpoint(req, res, stripe);

      return;
    } catch (error) {
      res
        .status(400)
        .send(
          "A problem occurred while trying to use the delete_file_cloud endpoint: " +
          JSON.stringify(error, null, 2)
        );

      return;
    }
  });
}
