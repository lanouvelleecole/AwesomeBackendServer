import { _myAPIEndpoint } from "./pieces/_myAPIEndpoint/_myAPIEndpoint.js";

// crée un endpoint nommé myAPI
// reachable via http://localhost:<apiPort>/myAPI
export function myAPIEndpoint(app) {
  app.get("/myAPI", async (req, res) => {
    try {
      await _myAPIEndpoint(req, res);

      return;
    } catch (error) {
      res
        .status(400)
        .send(
          "A problem occurred while trying to use the myAPI endpoint: " +
          JSON.stringify(error, null, 2)
        );

      return;
    }
  });
}
