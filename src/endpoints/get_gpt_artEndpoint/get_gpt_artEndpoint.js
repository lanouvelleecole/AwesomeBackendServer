import { _get_gpt_artEndpoint } from "./pieces/_get_gpt_artEndpoint/_get_gpt_artEndpoint.js";

// crée un endpoint nommé get_gpt_art
// reachable via http://localhost:<apiPort>/get_gpt_art
export function get_gpt_artEndpoint(app, stripe) {
  app.post("/get_gpt_art", async (req, res) => {
    try {
      // debugger;

      await _get_gpt_artEndpoint(req, res, stripe);

      return;
    } catch (error) {
      res
        .status(400)
        .send(
          "A problem occurred while trying to use the get_gpt_art endpoint: " +
          JSON.stringify(error, null, 2)
        );

      return;
    }
  });
}
